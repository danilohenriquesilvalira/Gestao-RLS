// hooks/useAuth.ts
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
      const userData = await api.getCurrentUser();
      console.log('👤 Usuário logado:', userData.nomecompleto, 'Cargo:', userData.cargo);
      setUser(userData);
    } catch {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    setLoading(false);
  };

  const login = async (credentials: { identifier: string; password: string }) => {
    const response = await api.login(credentials);
    
    localStorage.setItem('token', response.jwt);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    setUser(response.user);
    return response;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // 🔥 MAPEAMENTO CORRETO: Cargo "Gestor" = Admin
  const isAdmin = user?.cargo === 'Gestor' || user?.role?.type === 'administrator';

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