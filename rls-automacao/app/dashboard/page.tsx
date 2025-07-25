// app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { 
  Receipt, 
  FileText, 
  TrendingUp, 
  Plus,
  AlertCircle,
  Loader2
} from 'lucide-react';

interface DashboardStats {
  totalDespesas: number;
  totalDocumentos: number;
  valorTotalDespesas: number;
  despesasPendentes: number;
}

export default function DashboardPage() {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalDespesas: 0,
    totalDocumentos: 0,
    valorTotalDespesas: 0,
    despesasPendentes: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      console.log('🚀 Carregando dashboard para:', user.nomecompleto, '| Admin:', isAdmin);
      fetchStats();
    }
  }, [user, isAdmin]);

  const fetchStats = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError('');
      
      console.log('📊 Buscando estatísticas...');
      const data = await api.getDashboardStats(user);
      setStats(data);
      
    } catch (err: any) {
      setError(err.message);
      console.error('❌ Erro ao buscar stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center space-x-3 text-primary-600">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="text-lg">Carregando dados reais...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center max-w-md mx-auto">
          <AlertCircle className="w-16 h-16 text-danger-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Erro ao carregar dados</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={fetchStats}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 font-medium"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Bem-vindo, {user?.nomecompleto}!
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {isAdmin ? '👑 Administrador (Gestor)' : '👤 Funcionário'} • Dados em tempo real
          </p>
        </div>
        
        <div className="flex space-x-3 mt-4 lg:mt-0">
          <Link href="/dashboard/despesas">
            <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 font-medium flex items-center space-x-2 transition-colors">
              <Plus className="w-5 h-5" />
              <span>Nova Despesa</span>
            </button>
          </Link>
          <Link href="/dashboard/documentos">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium flex items-center space-x-2 transition-colors">
              <FileText className="w-5 h-5" />
              <span>Documentos</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Cards - DADOS REAIS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Despesas</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalDespesas}</p>
              <p className="text-xs text-green-600 mt-1">📊 Dados reais da API</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Receipt className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Valor Total</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {formatCurrency(stats.valorTotalDespesas)}
              </p>
              <p className="text-xs text-green-600 mt-1">💰 MySQL → Strapi → Frontend</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-lg">
              <TrendingUp className="w-8 h-8 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pendentes</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.despesasPendentes}</p>
              <p className="text-xs text-yellow-600 mt-1">⏳ Aguardando aprovação</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Documentos</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalDocumentos}</p>
              <p className="text-xs text-purple-600 mt-1">📄 Sistema integrado</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Ações Rápidas</h3>
          <div className="space-y-4">
            <Link href="/dashboard/despesas" className="block">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <Receipt className="w-10 h-10 text-blue-600 mr-4" />
                <div>
                  <h4 className="font-medium text-gray-900">Gestão de Despesas</h4>
                  <p className="text-sm text-gray-600">Criar e gerir despesas</p>
                </div>
              </div>
            </Link>
            
            <Link href="/dashboard/documentos" className="block">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <FileText className="w-10 h-10 text-purple-600 mr-4" />
                <div>
                  <h4 className="font-medium text-gray-900">Gestão de Documentos</h4>
                  <p className="text-sm text-gray-600">Upload e organização</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Status do Sistema</h3>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-primary-50 rounded-lg">
              <div className="w-3 h-3 bg-primary-500 rounded-full mr-4"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">✅ API funcionando</p>
                <p className="text-xs text-gray-500">Dados carregados do MySQL</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  ✅ Usuário: {isAdmin ? 'Administrador' : 'Funcionário'}
                </p>
                <p className="text-xs text-gray-500">Cargo: {user?.cargo}</p>
              </div>
            </div>

            {stats.despesasPendentes > 0 && (
              <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-4"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {stats.despesasPendentes} despesas pendentes
                  </p>
                  <p className="text-xs text-gray-500">Aguardando sua aprovação</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Debug Info */}
      <div className="bg-gray-100 rounded-xl p-4 mt-8">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>🔄 Dados atualizados automaticamente</span>
          <button 
            onClick={fetchStats}
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            Atualizar agora
          </button>
        </div>
      </div>

    </div>
  );
}