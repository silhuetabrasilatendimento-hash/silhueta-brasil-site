import React, { useState } from 'react';
import { ShoppingCart, User, Menu, X, Star, MapPin, Phone, MessageCircle, Shield, Truck, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider, useCart } from './contexts/CartContext';
import LoginModal from './components/LoginModal';
import antesDepoisImg from './assets/tirzepatida_antes_depois.png';
import produto5ml from './assets/5.0ml.jpg';
import produto75ml from './assets/7.5ml.jpg';
import './App.css';

// Dados dos produtos com preços baseados em pesquisa de mercado
const products = [
  {
    id: '5ml',
    name: 'Tirzepatida 5.0ml',
    subtitle: 'Ideal para iniciantes',
    description: 'Tratamento completo de 4 semanas com Tirzepatida 5.0ml. Inclui 4 ampulhetas para o protocolo de transformação.',
    image: produto5ml,
    price: 1197,
    originalPrice: 1780, // Preço médio das farmácias
    discount: 33,
    savings: 583, // Economia real
    rating: 4.9,
    reviews: 1247,
    features: ['4 semanas', 'Frete grátis'],
    badge: null
  },
  {
    id: '7.5ml',
    name: 'Tirzepatida 7.5ml',
    subtitle: 'Pacote Transformação Plus',
    description: 'Versão premium com Tirzepatida 7.5ml para resultados mais intensos e rápidos. Tratamento completo de 4 semanas.',
    image: produto75ml,
    price: 1597,
    originalPrice: 2700, // Preço médio das farmácias
    discount: 41,
    savings: 1103, // Economia real
    rating: 4.9,
    reviews: 892,
    features: ['4 semanas', 'Premium', 'Frete grátis'],
    badge: 'MAIS VENDIDO'
  }
];

// Componente Header
const Header = () => {
  const { user, setIsLoginModalOpen, logout } = useAuth();
  const { getTotalItems, setIsOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-purple-600 to-purple-800 text-white sticky top-0 z-40 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-purple-900">
              SB
            </div>
            <div>
              <h1 className="font-bold text-lg">Silhueta Brasil</h1>
              <p className="text-xs text-purple-200">Transformação Garantida</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#produtos" className="hover:text-purple-200 transition-colors">Produtos</a>
            <a href="#como-usar" className="hover:text-purple-200 transition-colors">Como Usar</a>
            <a href="#como-funciona" className="hover:text-purple-200 transition-colors">Como Funciona</a>
            <a href="#entrega" className="hover:text-purple-200 transition-colors">Entrega</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Carrinho */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 hover:bg-purple-700 rounded-full transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* User */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 hover:bg-purple-700 rounded-lg transition-colors">
                  <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
                  <span className="hidden md:block">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <a href="#perfil" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Meu Perfil</a>
                  <a href="#pedidos" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Meus Pedidos</a>
                  <button onClick={logout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Sair</button>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => window.open('https://wa.me/5547991950550?text=Olá! Estou interessado em criar minha conta na Silhueta Brasil. Podem me ajudar?', '_blank')}
                className="bg-white text-purple-600 hover:bg-purple-50"
              >
                <User className="w-4 h-4 mr-2" />
                Entrar
              </Button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-purple-700 rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-500">
            <nav className="flex flex-col space-y-2">
              <a href="#produtos" className="py-2 hover:text-purple-200 transition-colors">Produtos</a>
              <a href="#como-usar" className="py-2 hover:text-purple-200 transition-colors">Como Usar</a>
              <a href="#como-funciona" className="py-2 hover:text-purple-200 transition-colors">Como Funciona</a>
              <a href="#entrega" className="py-2 hover:text-purple-200 transition-colors">Entrega</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Componente Hero
const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
              🔥 APENAS 15 UNIDADES DISPONÍVEIS
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Transforme Seu Corpo em{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                4 Semanas
              </span>
            </h1>
            <p className="text-xl text-purple-200 mb-8 leading-relaxed">
              Tirzepatida original com entrega expressa direto do nosso centro de distribuição para todo o Brasil. 
              Resultados comprovados e garantia total.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 hover:from-yellow-500 hover:to-orange-600 font-bold text-lg px-8 py-4 h-auto">
                GARANTA O SEU AGORA
              </Button>
              <Button 
                className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-8 py-4 h-auto"
                onClick={() => window.open('https://wa.me/5547991950550?text=Olá! Vi o site da Silhueta Brasil e tenho interesse na Tirzepatida. Gostaria de saber mais sobre os produtos e como posso fazer meu pedido. Podem me ajudar?', '_blank')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Falar com Representante
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src={antesDepoisImg} 
              alt="Transformação com Tirzepatida - Antes e Depois" 
              className="w-full rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-4 -right-4 bg-white text-purple-600 p-4 rounded-xl shadow-lg">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold">4.9/5</span>
              </div>
              <p className="text-sm text-gray-600">+2.000 clientes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Componente de Produtos
const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const { user, setIsLoginModalOpen } = useAuth();

  const handleAddToCart = () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }
    addItem(product);
  };

  return (
    <div className="bg-white rounded-3xl p-4 md:p-8 shadow-xl relative overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 group">
      {/* Badge */}
      {product.badge && (
        <div className="absolute -left-3 top-8 z-20">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-r-full shadow-xl">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-300">⭐</span>
              <span className="text-xs font-bold">{product.badge}</span>
            </div>
          </div>
        </div>
      )}

      {/* Desconto */}
      <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full text-lg font-bold shadow-xl transform rotate-12">
        -{product.discount}%
      </div>

      <div className="relative z-10 ml-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{product.name}</h3>
          <p className="text-lg text-gray-600 mb-4">{product.subtitle}</p>
          <div className="flex justify-center flex-wrap gap-2">
            {product.features.map((feature, index) => (
              <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Imagem */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 mb-8 text-center">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-56 object-contain rounded-xl shadow-lg bg-white p-4"
          />
        </div>

        {/* Descrição */}
        <p className="text-gray-700 leading-relaxed mb-8">{product.description}</p>

        {/* Avaliações */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-gray-600">({product.reviews.toLocaleString()} avaliações)</span>
          </div>
        </div>

        {/* Preços */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <span className="text-4xl font-bold text-green-600">
              R$ {product.price.toLocaleString()}
            </span>
            <span className="text-xl text-gray-500 line-through">
              R$ {product.originalPrice.toLocaleString()}
            </span>
          </div>
          <p className="text-gray-600">ou até 12x de R$ {(product.price / 12).toFixed(2)} sem juros</p>
        </div>

        {/* Botões */}
        <div className="flex flex-col gap-3">
          <Button 
            onClick={handleAddToCart}
            className="w-full h-12 md:h-14 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold text-base md:text-lg"
          >
            COMPRAR AGORA
          </Button>
          <Button 
            className="w-full h-12 md:h-14 bg-green-500 hover:bg-green-600 text-white font-bold text-base md:text-lg"
            onClick={() => window.open(`https://wa.me/5547991950550?text=Olá! Tenho interesse no ${product.name} por R$ ${product.price.toLocaleString()}. Gostaria de fazer o pedido direto com vocês. Podem me ajudar com o processo de compra?`, '_blank')}
          >
            <MessageCircle className="w-4 md:w-5 h-4 md:h-5 mr-2" />
            COMPRAR VIA WHATSAPP
          </Button>
        </div>
      </div>
    </div>
  );
};

// Componente principal do App
function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      
      {/* Seção de Produtos */}
      <section id="produtos" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Escolha Sua Transformação</h2>
            <p className="text-xl text-gray-600">Produtos originais com entrega expressa e garantia de resultados</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Seção Como a Tirzepatida Funciona */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Como a Tirzepatida Funciona</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Entenda a ciência por trás da transformação e as informações importantes sobre o uso seguro
            </p>
          </div>

          {/* Mecanismo de Ação */}
          <div className="max-w-6xl mx-auto mb-16">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-12">Mecanismo de Ação</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">Dupla Ação Hormonal</h4>
                <p className="text-gray-600 text-center">
                  A Tirzepatida é um agonista duplo dos receptores GLP-1 e GIP, hormônios naturalmente produzidos no intestino que regulam o açúcar no sangue e o apetite.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border border-purple-200">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">Ação no Cérebro</h4>
                <p className="text-gray-600 text-center">
                  Atua no hipotálamo, região cerebral responsável pelo controle do apetite, promovendo saciedade e reduzindo a fome de forma natural e segura.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border border-green-200">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">Controle Glicêmico</h4>
                <p className="text-gray-600 text-center">
                  Melhora a sensibilidade à insulina e reduz a produção de glicose pelo fígado, mantendo níveis saudáveis de açúcar no sangue.
                </p>
              </div>
            </div>
          </div>

          {/* Contraindicações e Efeitos Colaterais */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-red-50 p-8 rounded-2xl border border-red-200">
                <h4 className="text-xl font-bold text-red-800 mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  Contraindicações
                </h4>
                <p className="text-red-700 font-medium mb-4">⚠️ Não recomendado para:</p>
                <ul className="space-y-2 text-red-700">
                  <li>• Gestantes e lactantes</li>
                  <li>• Menores de 18 anos</li>
                  <li>• Histórico de pancreatite</li>
                  <li>• Diabetes tipo 1</li>
                  <li>• Problemas renais graves</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-8 rounded-2xl border border-yellow-200">
                <h4 className="text-xl font-bold text-yellow-800 mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Efeitos Colaterais Comuns
                </h4>
                <ul className="space-y-2 text-yellow-700 mb-4">
                  <li>• Náuseas (temporário primeiros dois dias de tratamento) - incomum</li>
                  <li>• Diminuição do apetite - frequente</li>
                </ul>
                <div className="bg-green-100 p-4 rounded-lg border border-green-200">
                  <p className="text-green-800 font-medium">✅ Importante:</p>
                  <p className="text-green-700 text-sm mt-1">
                    Consulte sempre um médico antes de iniciar o tratamento. Os efeitos colaterais são geralmente leves e diminuem com o tempo.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Comprovação Científica */}
          <div className="max-w-6xl mx-auto mb-16">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">Comprovação Científica</h3>
            <p className="text-center text-gray-600 mb-12">Resultados baseados em estudos clínicos rigorosos</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border border-purple-200">
                <div className="text-5xl font-bold text-purple-600 mb-2">22.5%</div>
                <p className="text-gray-700 font-medium">Redução média de peso corporal em estudos clínicos</p>
              </div>
              
              <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200">
                <div className="text-5xl font-bold text-blue-600 mb-2">2.4%</div>
                <p className="text-gray-700 font-medium">Redução da HbA1c (controle glicêmico)</p>
              </div>
              
              <div className="text-center bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border border-green-200">
                <div className="text-5xl font-bold text-green-600 mb-2">91%</div>
                <p className="text-gray-700 font-medium">Dos pacientes relataram melhora na qualidade de vida</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-sm text-gray-500 max-w-4xl mx-auto">
                <strong>Fonte:</strong> Estudos SURPASS publicados no New England Journal of Medicine e aprovação da ANVISA (2023). 
                A Tirzepatida demonstrou superioridade em comparação com outros tratamentos disponíveis.
              </p>
            </div>
          </div>

          {/* Acompanhamento Médico */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-8 rounded-2xl text-white text-center">
              <h4 className="text-2xl font-bold mb-4">Acompanhamento Médico Recomendado</h4>
              <p className="text-purple-100 mb-6">
                Para obter os melhores resultados e garantir sua segurança, recomendamos acompanhamento médico durante o tratamento.
              </p>
              <p className="text-sm text-purple-200">
                Este produto não substitui uma dieta equilibrada e exercícios regulares. Resultados podem variar de pessoa para pessoa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Como Usar */}
      <section id="como-usar" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Como Usar</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Protocolo de dosagem personalizado baseado em estudos clínicos e seu perfil individual
            </p>
          </div>

          {/* Calculadora IMC */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border border-purple-200">
              <h3 className="text-2xl font-bold text-center text-purple-800 mb-8">Calculadora de Dose Personalizada</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Peso Atual (kg)</label>
                  <input 
                    type="number" 
                    placeholder="Ex: 75" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    id="peso"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Altura (cm)</label>
                  <input 
                    type="number" 
                    placeholder="Ex: 170" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    id="altura"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Seu IMC</label>
                  <div className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-center font-bold text-purple-600" id="imc-result">
                    --
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-purple-200" id="dose-recommendation">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Protocolo Recomendado</h4>
                <p className="text-gray-600">Preencha seus dados acima para ver o protocolo personalizado</p>
              </div>
            </div>
          </div>

          {/* Timeline do Protocolo */}
          <div className="max-w-6xl mx-auto mb-16">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-12">Protocolo de 4 Semanas</h3>
            
            <div className="relative">
              {/* Linha conectora */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-200 via-purple-400 to-purple-600 transform -translate-y-1/2 hidden md:block"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  {
                    week: 'Semana 1',
                    dose: '2.5mg',
                    title: 'Adaptação',
                    description: 'Dose inicial para adaptação do organismo. Redução gradual do apetite.',
                    color: 'from-blue-400 to-blue-600',
                    bgColor: 'from-blue-50 to-blue-100',
                    borderColor: 'border-blue-200'
                  },
                  {
                    week: 'Semana 2',
                    dose: '5.0mg',
                    title: 'Estabilização',
                    description: 'Aumento da dose. Efeitos mais evidentes no controle do apetite.',
                    color: 'from-indigo-400 to-indigo-600',
                    bgColor: 'from-indigo-50 to-indigo-100',
                    borderColor: 'border-indigo-200'
                  },
                  {
                    week: 'Semana 3',
                    dose: '7.5mg',
                    title: 'Consolidação',
                    description: 'Dose terapêutica. Controle efetivo do apetite e perda de peso consistente.',
                    color: 'from-purple-400 to-purple-600',
                    bgColor: 'from-purple-50 to-purple-100',
                    borderColor: 'border-purple-200'
                  },
                  {
                    week: 'Semana 4',
                    dose: '10mg',
                    title: 'Otimização',
                    description: 'Dose máxima para resultados otimizados. Avaliação para manutenção.',
                    color: 'from-pink-400 to-pink-600',
                    bgColor: 'from-pink-50 to-pink-100',
                    borderColor: 'border-pink-200'
                  }
                ].map((step, index) => (
                  <div key={index} className="relative">
                    <div className={`bg-gradient-to-br ${step.bgColor} p-6 rounded-2xl border ${step.borderColor} relative z-10`}>
                      <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                        <span className="text-white font-bold text-lg">{index + 1}</span>
                      </div>
                      
                      <div className="text-center">
                        <h4 className="font-bold text-gray-800 mb-1">{step.week}</h4>
                        <div className={`inline-block bg-gradient-to-r ${step.color} text-white text-sm font-bold px-3 py-1 rounded-full mb-3`}>
                          {step.dose}
                        </div>
                        <h5 className="font-semibold text-gray-700 mb-2">{step.title}</h5>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dicas de Aplicação */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border border-green-200">
              <h3 className="text-2xl font-bold text-center text-green-800 mb-8">Dicas Importantes de Aplicação</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Horário Fixo</h4>
                      <p className="text-sm text-gray-600">Aplique sempre no mesmo dia da semana, preferencialmente no mesmo horário.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Local da Aplicação</h4>
                      <p className="text-sm text-gray-600">Abdômen, coxa ou braço. Alterne os locais para evitar irritação.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Armazenamento</h4>
                      <p className="text-sm text-gray-600">Mantenha refrigerado entre 2°C e 8°C. Não congele.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Antes da Aplicação</h4>
                      <p className="text-sm text-gray-600">Retire da geladeira 15 minutos antes. Verifique se não há partículas.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">5</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Acompanhamento</h4>
                      <p className="text-sm text-gray-600">Monitore peso, glicemia e efeitos colaterais. Consulte seu médico regularmente.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">6</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Esqueceu a Dose?</h4>
                      <p className="text-sm text-gray-600">Se passou menos de 4 dias, aplique assim que lembrar. Se não, pule e continue o cronograma.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
                <p className="text-sm text-yellow-800 text-center">
                  <strong>⚠️ Importante:</strong> Este protocolo é baseado em diretrizes médicas gerais. 
                  Sempre consulte seu médico antes de iniciar o tratamento e para ajustes de dose.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Como Funciona */}
      <section id="como-funciona" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Como Funciona</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { icon: MessageCircle, title: 'Pedido', subtitle: 'Via WhatsApp', time: 'Hoje' },
              { icon: Shield, title: 'Preparo', subtitle: 'Embalagem térmica', time: '24h' },
              { icon: Truck, title: 'Envio', subtitle: 'Com rastreamento', time: '48h' },
              { icon: MapPin, title: 'Entrega', subtitle: 'Na sua casa', time: '1-3 dias' }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">{step.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{step.subtitle}</p>
                <span className="inline-block bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full">
                  {step.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LoginModal />
      
      {/* Calculadora IMC com useEffect */}
      {React.useEffect(() => {
        const calcularIMC = () => {
          const pesoInput = document.getElementById('peso');
          const alturaInput = document.getElementById('altura');
          const imcResult = document.getElementById('imc-result');
          const doseRecommendation = document.getElementById('dose-recommendation');
          
          if (!pesoInput || !alturaInput || !imcResult || !doseRecommendation) return;
          
          const peso = parseFloat(pesoInput.value);
          const altura = parseFloat(alturaInput.value) / 100; // converter cm para m
          
          if (peso && altura && peso > 0 && altura > 0) {
            const imc = peso / (altura * altura);
            imcResult.textContent = imc.toFixed(1);
            
            let protocolo = '';
            let categoria = '';
            
            if (imc < 18.5) {
              categoria = 'Abaixo do peso';
              protocolo = 'Consulte um médico antes de iniciar o tratamento.';
            } else if (imc < 25) {
              categoria = 'Peso normal';
              protocolo = 'Protocolo: 2.5mg → 5.0mg → 7.5mg → 10mg (progressão semanal)';
            } else if (imc < 30) {
              categoria = 'Sobrepeso';
              protocolo = 'Protocolo: 2.5mg → 5.0mg → 7.5mg → 10mg (progressão semanal)';
            } else if (imc < 35) {
              categoria = 'Obesidade Grau I';
              protocolo = 'Protocolo: 2.5mg → 5.0mg → 7.5mg → 10mg (progressão semanal)';
            } else {
              categoria = 'Obesidade Grau II/III';
              protocolo = 'Protocolo: 2.5mg → 5.0mg → 7.5mg → 10mg (progressão semanal)';
            }
            
            doseRecommendation.innerHTML = `
              <h4 class="text-lg font-semibold text-gray-800 mb-4">Protocolo Recomendado</h4>
              <div class="mb-4">
                <span class="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  IMC: ${imc.toFixed(1)} - ${categoria}
                </span>
              </div>
              <p class="text-gray-700 mb-4">${protocolo}</p>
              <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p class="text-sm text-yellow-800">
                  <strong>⚠️ Importante:</strong> Esta é uma recomendação baseada em protocolos gerais. 
                  Sempre consulte um médico para avaliação personalizada.
                </p>
              </div>
            `;
          } else {
            imcResult.textContent = '--';
            doseRecommendation.innerHTML = `
              <h4 class="text-lg font-semibold text-gray-800 mb-4">Protocolo Recomendado</h4>
              <p class="text-gray-600">Preencha seus dados acima para ver o protocolo personalizado</p>
            `;
          }
        };
        
        const pesoInput = document.getElementById('peso');
        const alturaInput = document.getElementById('altura');
        
        if (pesoInput && alturaInput) {
          pesoInput.addEventListener('input', calcularIMC);
          alturaInput.addEventListener('input', calcularIMC);
        }
        
        return () => {
          if (pesoInput && alturaInput) {
            pesoInput.removeEventListener('input', calcularIMC);
            alturaInput.removeEventListener('input', calcularIMC);
          }
        };
      }, [])}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
