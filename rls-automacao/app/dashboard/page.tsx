'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { storage } from '@/utils';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
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
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalDespesas: 0,
    totalDocumentos: 0,
    valorTotalDespesas: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const token = storage.get('token');
      if (!token) return;

      // Por enquanto dados mock - depois conectamos API real
      setTimeout(() => {
        setStats({
          totalDespesas: 15,
          totalDocumentos: 8,
          valorTotalDespesas: 2450.80
        });
        setLoading(false);
      }, 1000);

    } catch (err: any) {
      setError(err.message);
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
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2 text-green-600">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Carregando estatísticas...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Erro ao carregar dados</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={fetchStats} variant="primary">
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Visão geral das suas atividades</p>
        </div>
        
        <div className="flex space-x-3">
          <Link href="/dashboard/despesas">
            <Button variant="secondary" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Nova Despesa
            </Button>
          </Link>
          <Link href="/dashboard/documentos">
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Novo Documento
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Despesas */}
        <Card>
          <div className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Despesas</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalDespesas}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Receipt className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        {/* Valor Total */}
        <Card>
          <div className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-gray-600">Valor Total</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(stats.valorTotalDespesas)}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        {/* Total Documentos */}
        <Card>
          <div className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Documentos</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalDocumentos}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            <Link href="/dashboard/despesas" className="block">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Receipt className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900">Gestão de Despesas</h4>
                  <p className="text-sm text-gray-600">Criar e gerir despesas</p>
                </div>
              </div>
            </Link>
            
            <Link href="/dashboard/documentos" className="block">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <FileText className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900">Gestão de Documentos</h4>
                  <p className="text-sm text-gray-600">Upload e organização</p>
                </div>
              </div>
            </Link>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Sistema inicializado</p>
                <p className="text-xs text-gray-500">Há poucos minutos</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Login realizado</p>
                <p className="text-xs text-gray-500">Agora</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}