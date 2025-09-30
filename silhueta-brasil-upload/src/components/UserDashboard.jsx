import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, Clock, MapPin, Eye, Download, Star, User, Settings, LogOut, CreditCard, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';

const UserDashboard = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([
    {
      id: 'ORD_001',
      date: '2024-09-20',
      status: 'delivered',
      total: 1197,
      items: [
        { name: 'Tirzepatida 5.0ml', quantity: 1, price: 1197 }
      ],
      tracking: 'BR123456789',
      estimatedDelivery: '2024-09-23',
      shippingAddress: {
        street: 'Rua das Flores, 123',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567'
      }
    },
    {
      id: 'ORD_002',
      date: '2024-09-22',
      status: 'shipped',
      total: 1899,
      items: [
        { name: 'Tirzepatida 7.5ml', quantity: 1, price: 1899 }
      ],
      tracking: 'BR987654321',
      estimatedDelivery: '2024-09-25',
      shippingAddress: {
        street: 'Rua das Flores, 123',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567'
      }
    }
  ]);

  const [profile, setProfile] = useState({
    name: user?.name || 'João Silva',
    email: user?.email || 'joao@email.com',
    phone: '(11) 99999-9999',
    cpf: '123.456.789-00',
    birthDate: '1990-01-01',
    address: {
      street: 'Rua das Flores, 123',
      number: '123',
      complement: 'Apto 45',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567'
    }
  });

  if (!isOpen) return null;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'processing':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Aguardando Pagamento';
      case 'processing':
        return 'Preparando Envio';
      case 'shipped':
        return 'Em Trânsito';
      case 'delivered':
        return 'Entregue';
      default:
        return 'Status Desconhecido';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">Meus Pedidos</h3>
        <div className="flex space-x-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="all">Todos os Status</option>
            <option value="pending">Aguardando Pagamento</option>
            <option value="processing">Preparando</option>
            <option value="shipped">Em Trânsito</option>
            <option value="delivered">Entregue</option>
          </select>
        </div>
      </div>

      {orders.map((order) => (
        <div key={order.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                {getStatusIcon(order.status)}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Pedido #{order.id}</p>
              <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString('pt-BR')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Produtos</h4>
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">Quantidade: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-gray-900">R$ {item.price.toLocaleString()}</p>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">Total:</span>
                  <span className="font-bold text-lg text-purple-600">R$ {order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Entrega</h4>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                  <div className="text-sm text-gray-600">
                    <p>{order.shippingAddress.street}</p>
                    <p>{order.shippingAddress.neighborhood}, {order.shippingAddress.city} - {order.shippingAddress.state}</p>
                    <p>CEP: {order.shippingAddress.zipCode}</p>
                  </div>
                </div>
                {order.tracking && (
                  <div className="flex items-center space-x-2">
                    <Truck className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Código: {order.tracking}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Previsão: {new Date(order.estimatedDelivery).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <div className="flex space-x-3">
              {order.tracking && (
                <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm">
                  <Truck className="w-4 h-4 mr-2" />
                  Rastrear Pedido
                </Button>
              )}
              <Button className="bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm">
                <Eye className="w-4 h-4 mr-2" />
                Ver Detalhes
              </Button>
            </div>
            {order.status === 'delivered' && (
              <div className="flex space-x-2">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm">
                  <Star className="w-4 h-4 mr-2" />
                  Avaliar
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white text-sm">
                  Comprar Novamente
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Meu Perfil</h3>
      
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900">{profile.name}</h4>
            <p className="text-gray-600">{profile.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-gray-900 mb-3">Informações Pessoais</h5>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Telefone</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">CPF</label>
                <input
                  type="text"
                  value={profile.cpf}
                  onChange={(e) => setProfile({...profile, cpf: e.target.value})}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-semibold text-gray-900 mb-3">Endereço</h5>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">CEP</label>
                <input
                  type="text"
                  value={profile.address.zipCode}
                  onChange={(e) => setProfile({
                    ...profile,
                    address: {...profile.address, zipCode: e.target.value}
                  })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Endereço</label>
                <input
                  type="text"
                  value={profile.address.street}
                  onChange={(e) => setProfile({
                    ...profile,
                    address: {...profile.address, street: e.target.value}
                  })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Número</label>
                  <input
                    type="text"
                    value={profile.address.number}
                    onChange={(e) => setProfile({
                      ...profile,
                      address: {...profile.address, number: e.target.value}
                    })}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Complemento</label>
                  <input
                    type="text"
                    value={profile.address.complement}
                    onChange={(e) => setProfile({
                      ...profile,
                      address: {...profile.address, complement: e.target.value}
                    })}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bairro</label>
                <input
                  type="text"
                  value={profile.address.neighborhood}
                  onChange={(e) => setProfile({
                    ...profile,
                    address: {...profile.address, neighborhood: e.target.value}
                  })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cidade</label>
                  <input
                    type="text"
                    value={profile.address.city}
                    onChange={(e) => setProfile({
                      ...profile,
                      address: {...profile.address, city: e.target.value}
                    })}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Estado</label>
                  <select
                    value={profile.address.state}
                    onChange={(e) => setProfile({
                      ...profile,
                      address: {...profile.address, state: e.target.value}
                    })}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="SP">São Paulo</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="PR">Paraná</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="BA">Bahia</option>
                    <option value="GO">Goiás</option>
                    <option value="PE">Pernambuco</option>
                    <option value="CE">Ceará</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            Salvar Alterações
          </Button>
        </div>
      </div>
    </div>
  );

  const renderFavorites = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Produtos Favoritos</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Tirzepatida 5.0ml</h4>
            <Heart className="w-5 h-5 text-red-500 fill-current" />
          </div>
          <p className="text-gray-600 mb-4">Ideal para iniciantes</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-purple-600">R$ 1.197</span>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm">
              Comprar Agora
            </Button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Tirzepatida 7.5ml</h4>
            <Heart className="w-5 h-5 text-red-500 fill-current" />
          </div>
          <p className="text-gray-600 mb-4">Pacote Transformação Plus</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-purple-600">R$ 1.899</span>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm">
              Comprar Agora
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-50 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 bg-white border-r border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{user?.name || 'Usuário'}</h3>
                <p className="text-sm text-gray-500">Minha Conta</p>
              </div>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'orders' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Package className="w-5 h-5" />
                <span>Meus Pedidos</span>
              </button>
              
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'profile' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <User className="w-5 h-5" />
                <span>Meu Perfil</span>
              </button>
              
              <button
                onClick={() => setActiveTab('favorites')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'favorites' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Heart className="w-5 h-5" />
                <span>Favoritos</span>
              </button>
              
              <button
                onClick={() => setActiveTab('payments')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'payments' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span>Pagamentos</span>
              </button>
            </nav>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <button
                onClick={logout}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Sair</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {activeTab === 'orders' && 'Meus Pedidos'}
                {activeTab === 'profile' && 'Meu Perfil'}
                {activeTab === 'favorites' && 'Favoritos'}
                {activeTab === 'payments' && 'Pagamentos'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'orders' && renderOrders()}
              {activeTab === 'profile' && renderProfile()}
              {activeTab === 'favorites' && renderFavorites()}
              {activeTab === 'payments' && (
                <div className="text-center py-12">
                  <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Métodos de Pagamento</h3>
                  <p className="text-gray-600">Gerencie seus cartões e formas de pagamento</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
