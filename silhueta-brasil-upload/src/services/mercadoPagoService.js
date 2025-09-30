// Serviço de integração com Mercado Pago
class MercadoPagoService {
  constructor() {
    // Em produção, usar credenciais reais do Mercado Pago
    this.publicKey = 'TEST-your-public-key'; // Substituir pela chave real
    this.accessToken = 'TEST-your-access-token'; // Substituir pelo token real
    this.baseURL = 'https://api.mercadopago.com';
  }

  // Criar preferência de pagamento
  async createPreference(orderData) {
    try {
      // Simular criação de preferência
      // Em produção, fazer chamada real para API do Mercado Pago
      const preference = {
        id: 'pref_' + Date.now(),
        init_point: `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=pref_${Date.now()}`,
        sandbox_init_point: `https://sandbox.mercadopago.com.br/checkout/v1/redirect?pref_id=pref_${Date.now()}`,
        items: orderData.items.map(item => ({
          id: item.id,
          title: item.name,
          description: item.description,
          quantity: item.quantity,
          unit_price: item.price,
          currency_id: 'BRL'
        })),
        payer: {
          name: orderData.payer.name,
          email: orderData.payer.email,
          phone: orderData.payer.phone || {}
        },
        payment_methods: {
          excluded_payment_methods: [],
          excluded_payment_types: [],
          installments: 12
        },
        shipments: {
          cost: 0,
          mode: 'not_specified'
        },
        back_urls: {
          success: `${window.location.origin}/pagamento/sucesso`,
          failure: `${window.location.origin}/pagamento/erro`,
          pending: `${window.location.origin}/pagamento/pendente`
        },
        auto_return: 'approved',
        external_reference: orderData.orderId,
        notification_url: `${window.location.origin}/api/webhooks/mercadopago`
      };

      return {
        success: true,
        preference: preference
      };
    } catch (error) {
      console.error('Erro ao criar preferência:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Criar pagamento PIX
  async createPixPayment(orderData) {
    try {
      // Simular criação de pagamento PIX
      // Em produção, usar API real do Mercado Pago
      const pixPayment = {
        id: 'pix_' + Date.now(),
        status: 'pending',
        qr_code: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', // QR Code simulado
        qr_code_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
        ticket_url: `https://www.mercadopago.com.br/payments/${Date.now()}/ticket?caller_id=123456&hash=abc123`,
        transaction_amount: orderData.total,
        description: `Pedido #${orderData.orderId}`,
        payment_method_id: 'pix',
        payer: {
          email: orderData.payer.email,
          first_name: orderData.payer.name.split(' ')[0],
          last_name: orderData.payer.name.split(' ').slice(1).join(' ')
        },
        date_of_expiration: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutos
        point_of_interaction: {
          type: 'PIX',
          transaction_data: {
            qr_code: '00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426614174000520400005303986540510.005802BR5925SILHUETA BRASIL LTDA6009SAO PAULO62070503***6304ABCD',
            qr_code_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
          }
        }
      };

      return {
        success: true,
        payment: pixPayment
      };
    } catch (error) {
      console.error('Erro ao criar pagamento PIX:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Processar pagamento com cartão
  async processCardPayment(cardData, orderData) {
    try {
      // Simular processamento de cartão
      // Em produção, usar Mercado Pago SDK
      const payment = {
        id: 'card_' + Date.now(),
        status: Math.random() > 0.1 ? 'approved' : 'rejected', // 90% aprovação
        status_detail: 'accredited',
        transaction_amount: orderData.total,
        installments: cardData.installments,
        payment_method_id: cardData.payment_method_id,
        card: {
          last_four_digits: cardData.number.slice(-4),
          first_six_digits: cardData.number.slice(0, 6)
        },
        payer: {
          email: orderData.payer.email,
          identification: {
            type: cardData.identification.type,
            number: cardData.identification.number
          }
        }
      };

      return {
        success: payment.status === 'approved',
        payment: payment
      };
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Consultar status do pagamento
  async getPaymentStatus(paymentId) {
    try {
      // Simular consulta de status
      // Em produção, fazer GET para /v1/payments/{id}
      const statuses = ['pending', 'approved', 'rejected', 'cancelled'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

      return {
        success: true,
        payment: {
          id: paymentId,
          status: randomStatus,
          status_detail: randomStatus === 'approved' ? 'accredited' : 'pending_waiting_payment',
          date_approved: randomStatus === 'approved' ? new Date().toISOString() : null
        }
      };
    } catch (error) {
      console.error('Erro ao consultar pagamento:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Calcular parcelas
  getInstallments(amount) {
    const installments = [];
    
    for (let i = 1; i <= 12; i++) {
      const installmentAmount = amount / i;
      const hasInterest = i > 1; // Sem juros até 12x para simulação
      
      installments.push({
        installments: i,
        installment_amount: installmentAmount,
        total_amount: amount,
        has_interest: hasInterest,
        interest_rate: hasInterest ? 0 : 0,
        recommended_message: i === 1 ? 'À vista' : `${i}x de R$ ${installmentAmount.toFixed(2)} sem juros`
      });
    }
    
    return installments;
  }

  // Validar cartão
  validateCard(cardNumber) {
    // Algoritmo de Luhn simplificado
    const digits = cardNumber.replace(/\D/g, '');
    
    if (digits.length < 13 || digits.length > 19) {
      return false;
    }

    let sum = 0;
    let isEven = false;

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i]);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  }

  // Identificar bandeira do cartão
  getCardBrand(cardNumber) {
    const number = cardNumber.replace(/\D/g, '');
    
    if (/^4/.test(number)) return 'visa';
    if (/^5[1-5]/.test(number)) return 'mastercard';
    if (/^3[47]/.test(number)) return 'amex';
    if (/^6(?:011|5)/.test(number)) return 'discover';
    if (/^(?:2131|1800|35\d{3})\d{11}$/.test(number)) return 'jcb';
    
    return 'unknown';
  }

  // Formatar número do cartão
  formatCardNumber(value) {
    const number = value.replace(/\D/g, '');
    const brand = this.getCardBrand(number);
    
    if (brand === 'amex') {
      return number.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');
    }
    
    return number.replace(/(\d{4})(?=\d)/g, '$1 ');
  }

  // Formatar data de expiração
  formatExpiryDate(value) {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{0,2})$/);
    
    if (match) {
      return match[2] ? `${match[1]}/${match[2]}` : match[1];
    }
    
    return cleaned;
  }

  // Gerar link de pagamento direto
  generatePaymentLink(orderData) {
    const baseUrl = 'https://www.mercadopago.com.br/checkout/v1/redirect';
    const params = new URLSearchParams({
      pref_id: `pref_${Date.now()}`,
      source: 'link'
    });
    
    return `${baseUrl}?${params.toString()}`;
  }
}

export default new MercadoPagoService();
