import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Carregar usuário do localStorage na inicialização
  useEffect(() => {
    const savedUser = localStorage.getItem('silhueta_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        localStorage.removeItem('silhueta_user');
      }
    }
    setLoading(false);
  }, []);

  // Salvar usuário no localStorage quando mudar
  useEffect(() => {
    if (user) {
      localStorage.setItem('silhueta_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('silhueta_user');
    }
  }, [user]);

  // Login com Google
  const loginWithGoogle = async () => {
    try {
      // Simulação de login com Google
      // Em produção, usar Google Identity Services
      const mockGoogleUser = {
        id: 'google_' + Date.now(),
        name: 'Usuário Google',
        email: 'usuario@gmail.com',
        picture: 'https://via.placeholder.com/100',
        provider: 'google',
        createdAt: new Date().toISOString()
      };
      
      setUser(mockGoogleUser);
      setIsLoginModalOpen(false);
      return { success: true, user: mockGoogleUser };
    } catch (error) {
      console.error('Erro no login com Google:', error);
      return { success: false, error: error.message };
    }
  };

  // Login com Apple
  const loginWithApple = async () => {
    try {
      // Simulação de login com Apple
      // Em produção, usar Apple Sign In JS
      const mockAppleUser = {
        id: 'apple_' + Date.now(),
        name: 'Usuário Apple',
        email: 'usuario@privaterelay.appleid.com',
        picture: 'https://via.placeholder.com/100',
        provider: 'apple',
        createdAt: new Date().toISOString()
      };
      
      setUser(mockAppleUser);
      setIsLoginModalOpen(false);
      return { success: true, user: mockAppleUser };
    } catch (error) {
      console.error('Erro no login com Apple:', error);
      return { success: false, error: error.message };
    }
  };

  // Login com email
  const loginWithEmail = async (email, password) => {
    try {
      // Simulação de login com email
      // Em produção, fazer chamada para API
      if (!email || !password) {
        throw new Error('Email e senha são obrigatórios');
      }

      const mockEmailUser = {
        id: 'email_' + Date.now(),
        name: email.split('@')[0],
        email: email,
        picture: 'https://via.placeholder.com/100',
        provider: 'email',
        createdAt: new Date().toISOString()
      };
      
      setUser(mockEmailUser);
      setIsLoginModalOpen(false);
      return { success: true, user: mockEmailUser };
    } catch (error) {
      console.error('Erro no login com email:', error);
      return { success: false, error: error.message };
    }
  };

  // Cadastro com email
  const registerWithEmail = async (name, email, password) => {
    try {
      // Simulação de cadastro
      // Em produção, fazer chamada para API
      if (!name || !email || !password) {
        throw new Error('Todos os campos são obrigatórios');
      }

      const newUser = {
        id: 'email_' + Date.now(),
        name: name,
        email: email,
        picture: 'https://via.placeholder.com/100',
        provider: 'email',
        createdAt: new Date().toISOString()
      };
      
      setUser(newUser);
      setIsLoginModalOpen(false);
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Erro no cadastro:', error);
      return { success: false, error: error.message };
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('silhueta_user');
    localStorage.removeItem('silhueta_cart');
  };

  // Atualizar perfil
  const updateProfile = async (updates) => {
    try {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    isLoginModalOpen,
    setIsLoginModalOpen,
    loginWithGoogle,
    loginWithApple,
    loginWithEmail,
    registerWithEmail,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
