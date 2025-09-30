import React, { useState } from 'react';
import { X, CreditCard, Smartphone, QrCode, MapPin, User, Mail, Phone, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import mercadoPagoService from '../services/mercadoPagoService';

const CheckoutModal = ({ isOpen, onClose }) => {
  const { items, getTotal, getTotalWithPixDiscount, getPixDiscount, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState(1); // 1: Dados, 2: Pagamento, 3: Confirmação
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState({
    shipping: {
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      zipCode: '',
      address: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: ''
    },
    payment: {
      method: 'pix',
      card: {
        number: '',
        name: '',
        expiry: '',
        cvv: '',
        installments: 1,
        identification: {
          type: 'CPF',
          number: ''
        }
      }
    }
  });
  const [paymentResult, setPaymentResult] = useState(null);

  if (!isOpen) return null;

  const handleInputChange = (section, field, value) => {
    setOrderData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleCardInputChange = (field, value) => {
    let formattedValue = value;
    
    if (field === 'number') {
      formattedValue = mercadoPagoService.formatCardNumber(value);
    } else if (field === 'expiry') {
      formattedValue = mercadoPagoService.formatExpiryDate(value);
    }
    
    setOrderData(prev => ({
      ...prev,
      payment: {
        ...prev.payment,
        card: {
          ...prev.payment.card,
          [field]: formattedValue
        }
      }
    }));
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const processPayment = async () => {
    setLoading(true);
    
    try {
      const order = {
        orderId: 'ORD_' + Date.now(),
        items: items,
        total: paymentMethod === 'pix' ? getTotalWithPixDiscount() : getTotal(),
        payer: {
          name: orderData.shipping.name,
          email: orderData.shipping.email,
          phone: orderData.shipping.phone
        },
        shipping: orderData.shipping
      };

      let result;
      
      if (paymentMethod === 'pix') {
        result = await mercadoPagoService.createPixPayment(order);
      } else if (paymentMethod === 'card') {
        result = await mercadoPagoService.processCardPayment(orderData.payment.card, order);
      } else {
        // Checkout redirect
        result = await mercadoPagoService.createPreference(order);
      }

      if (result.success) {
        setPaymentResult(result);
        setStep(3);
        
        // Limpar carrinho após pagamento bem-sucedido
        if (paymentMethod === 'card' && result.payment?.status === 'approved') {
          clearCart();
        }
      } else {
        alert('Erro no pagamento: ' + result.error);
      }
    } catch (error) {
      console.error('Erro no pagamento:', error);
      alert('Erro inesperado no pagamento');
    }
    
    setLoading(false);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Dados de Entrega</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nome completo</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={orderData.shipping.name}
              onChange={(e) => handleInputChange('shipping', 'name', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Seu nome completo"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={orderData.shipping.email}
              onChange={(e) => handleInputChange('shipping', 'email', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="seu@email.com"
              required
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="tel"
              value={orderData.shipping.phone}
              onChange={(e) => handleInputChange('shipping', 'phone', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="(11) 99999-9999"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">CEP</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={orderData.shipping.zipCode}
              onChange={(e) => handleInputChange('shipping', 'zipCode', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="00000-000"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
        <input
          type="text"
          value={orderData.shipping.address}
          onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Rua, Avenida, etc."
          required
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Número</label>
          <input
            type="text"
            value={orderData.shipping.number}
            onChange={(e) => handleInputChange('shipping', 'number', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="123"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Complemento</label>
          <input
            type="text"
            value={orderData.shipping.complement}
            onChange={(e) => handleInputChange('shipping', 'complement', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Apto, Bloco"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bairro</label>
          <input
            type="text"
            value={orderData.shipping.neighborhood}
            onChange={(e) => handleInputChange('shipping', 'neighborhood', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Centro"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
          <input
            type="text"
            value={orderData.shipping.city}
            onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="São Paulo"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Forma de Pagamento</h3>
      
      {/* Métodos de pagamento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => setPaymentMethod('pix')}
          className={`p-4 border-2 rounded-lg transition-all ${
            paymentMethod === 'pix' 
              ? 'border-purple-500 bg-purple-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center space-x-3">
            <QrCode className="w-6 h-6 text-purple-600" />
            <div className="text-left">
              <p className="font-semibold">PIX</p>
              <p className="text-sm text-green-600">5% de desconto</p>
            </div>
          </div>
        </button>
        
        <button
          onClick={() => setPaymentMethod('card')}
          className={`p-4 border-2 rounded-lg transition-all ${
            paymentMethod === 'card' 
              ? 'border-purple-500 bg-purple-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center space-x-3">
            <CreditCard className="w-6 h-6 text-purple-600" />
            <div className="text-left">
              <p className="font-semibold">Cartão</p>
              <p className="text-sm text-gray-600">Até 12x sem juros</p>
            </div>
          </div>
        </button>
      </div>

      {/* Formulário do cartão */}
      {paymentMethod === 'card' && (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Número do cartão</label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={orderData.payment.card.number}
                onChange={(e) => handleCardInputChange('number', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="0000 0000 0000 0000"
                maxLength="19"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome no cartão</label>
            <input
              type="text"
              value={orderData.payment.card.name}
              onChange={(e) => handleCardInputChange('name', e.target.value.toUpperCase())}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="NOME COMO NO CARTÃO"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Validade</label>
              <input
                type="text"
                value={orderData.payment.card.expiry}
                onChange={(e) => handleCardInputChange('expiry', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="MM/AA"
                maxLength="5"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={orderData.payment.card.cvv}
                  onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="123"
                  maxLength="4"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Parcelas</label>
            <select
              value={orderData.payment.card.installments}
              onChange={(e) => handleCardInputChange('installments', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {mercadoPagoService.getInstallments(getTotal()).map(installment => (
                <option key={installment.installments} value={installment.installments}>
                  {installment.recommended_message}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Resumo do pedido */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-3">Resumo do Pedido</h4>
        {items.map(item => (
          <div key={item.id} className="flex justify-between items-center mb-2">
            <span className="text-sm">{item.name} x{item.quantity}</span>
            <span className="text-sm font-semibold">R$ {(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Subtotal:</span>
            <span className="font-semibold">R$ {getTotal().toLocaleString()}</span>
          </div>
          {paymentMethod === 'pix' && (
            <>
              <div className="flex justify-between items-center text-green-600">
                <span>Desconto PIX (5%):</span>
                <span>-R$ {getPixDiscount().toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span>R$ {getTotalWithPixDiscount().toLocaleString()}</span>
              </div>
            </>
          )}
          {paymentMethod === 'card' && (
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span>R$ {getTotal().toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="text-center space-y-6">
      {paymentMethod === 'pix' && paymentResult?.payment && (
        <div>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <QrCode className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">PIX Gerado com Sucesso!</h3>
          <p className="text-gray-600 mb-6">Escaneie o QR Code ou copie o código PIX para finalizar o pagamento</p>
          
          <div className="bg-white p-6 rounded-lg border-2 border-dashed border-gray-300 mb-4">
            <div className="w-48 h-48 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <QrCode className="w-24 h-24 text-gray-400" />
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              Copiar Código PIX
            </Button>
          </div>
          
          <p className="text-sm text-gray-500">
            O PIX expira em 30 minutos. Após o pagamento, você receberá a confirmação por email.
          </p>
        </div>
      )}

      {paymentMethod === 'card' && paymentResult?.payment && (
        <div>
          {paymentResult.payment.status === 'approved' ? (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-600 mb-4">Pagamento Aprovado!</h3>
              <p className="text-gray-600 mb-6">Seu pedido foi confirmado e será processado em breve.</p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-red-600 mb-4">Pagamento Recusado</h3>
              <p className="text-gray-600 mb-6">Verifique os dados do cartão e tente novamente.</p>
            </>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            Finalizar Pedido
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 py-4 border-b">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= stepNumber 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step > stepNumber ? 'bg-purple-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>Dados</span>
            <span>Pagamento</span>
            <span>Confirmação</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>

        {/* Footer */}
        {step < 3 && (
          <div className="flex justify-between p-6 border-t">
            <Button
              onClick={step === 1 ? onClose : handlePreviousStep}
              className="bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              {step === 1 ? 'Cancelar' : 'Voltar'}
            </Button>
            <Button
              onClick={step === 1 ? handleNextStep : processPayment}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {loading ? 'Processando...' : (step === 1 ? 'Continuar' : 'Finalizar Pagamento')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
