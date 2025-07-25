// hooks/useAuth.ts - 
import { useState, useEffect } from 'react';
import { api, User } from '@/lib/api';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      console.log('🔐 Verificando autenticação...');
      const userData = await api.getCurrentUser();
      console.log('👤 Usuário logado:', userData.nomecompleto, 'Cargo:', userData.cargo);
      console.log('🔑 Role:', userData.role);
      setUser(userData);
    } catch (error) {
      console.error('❌ Erro na verificação de auth:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    }
    setLoading(false);
  };

  const login = async (credentials: { identifier: string; password: string }) => {
    console.log('🚀 Iniciando processo de login...');
    const response = await api.login(credentials);
    
    console.log('💾 Salvando dados do usuário...');
    localStorage.setItem('token', response.jwt);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    console.log('✅ Login realizado para:', response.user.nomecompleto);
    setUser(response.user);
    return response;
  };

  const logout = () => {
    console.log('👋 Fazendo logout...');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // 
  const isAdmin = (() => {
    if (!user) return false;
    
    // Verificar pelo cargo
    if (user.cargo === 'Gestor') {
      console.log('👑 Admin detectado pelo cargo: Gestor');
      return true;
    }
    
    // Verificar pelo role type
    if (user.role?.type === 'administrator' || user.role?.type === 'admin') {
      console.log('👑 Admin detectado pelo role:', user.role.type);
      return true;
    }
    
    // Verificar pelo username (admin padrão)
    if (user.username === 'admin') {
      console.log('👑 Admin detectado pelo username: admin');
      return true;
    }
    
    console.log('👤 Usuário comum detectado');
    return false;
  })();

  return { 
    user, 
    loading, 
    isAdmin, 
    checkAuth, 
    login, 
    logout,
    isAuthenticated: !!user 
  };
}