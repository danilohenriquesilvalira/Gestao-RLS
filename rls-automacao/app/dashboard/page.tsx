'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import {
  Receipt,
  FileText,
  Plus,
  DollarSign,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Settings,
  Activity,
  CheckCircle,
  Calendar,
  Zap,
  BarChart3,
  UserCircle,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  Lightbulb,
  X, // Adicionado para o botão de fechar
} from 'lucide-react';

// Componentes UI reutilizáveis
import Loading from '@/components/ui/Loading';
import Alert from '@/components/ui/Alert'; // Manter para o erro principal
import Button from '@/components/ui/Button';

interface DashboardStats {
  totalDespesas: number;
  totalDocumentos: number;
  valorTotalDespesas: number;
  despesasPendentes: number;
}

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  iconBg: string;
  bg?: string;
  change?: string;
  changePositive?: boolean;
  isCurrency?: boolean;
}

const StatsCard = ({ title, value, icon: Icon, iconBg, bg = 'bg-white', change, changePositive, isCurrency }: StatsCardProps) => {
  const formatValue = (val: number | string) => {
    if (isCurrency && typeof val === 'number') {
      return new Intl.NumberFormat('pt-PT', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(val);
    }
    return val;
  };

  const ChangeIcon = changePositive ? TrendingUp : TrendingDown;
  const changeColor = changePositive ? 'text-green-600' : 'text-red-600';
  const changeBg = changePositive ? 'bg-green-100' : 'bg-red-100';

  return (
    <div className={`relative ${bg} p-6 rounded-2xl shadow-lg border border-gray-100 transform hover:scale-102 transition-all duration-300 ease-in-out`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <h2 className="text-3xl font-bold text-gray-900 leading-tight">
            {formatValue(value)}
          </h2>
        </div>
        <div className={`p-3 rounded-full ${iconBg} flex items-center justify-center shadow-md`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      {change && (
        <div className="flex items-center text-sm">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-medium ${changeBg} ${changeColor} mr-2`}>
            <ChangeIcon className="w-4 h-4 mr-1" />
            {change}
          </span>
          <span className="text-gray-500">em relação ao mês passado</span>
        </div>
      )}
    </div>
  );
};


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
  // Novo estado para controlar a visibilidade do alerta flutuante
  const [showFloatingAlert, setShowFloatingAlert] = useState(false);

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user, isAdmin]);

  useEffect(() => {
    // Controla a visibilidade do alerta flutuante
    if (isAdmin && stats.despesasPendentes > 0) {
      setShowFloatingAlert(true);
    } else {
      setShowFloatingAlert(false);
    }
  }, [stats.despesasPendentes, isAdmin]); // Depende do número de despesas e se é admin

  const fetchStats = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError('');
      const data = await api.getDashboardStats(user);
      setStats(data);

      if (isAdmin) {
        localStorage.setItem('pendingExpensesCount', data.despesasPendentes.toString());
      } else {
        localStorage.removeItem('pendingExpensesCount');
      }
      window.dispatchEvent(new Event('storage'));

    } catch (err: any) {
      console.error('Erro ao buscar stats:', err);
      setError('Não foi possível carregar os dados. Por favor, verifique a sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading title="Carregando Dashboard" description="Preparando seus dados..." />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Alert
          type="error"
          title="Ops! Algo deu errado"
          description={error}
          action={{
            label: "Tentar Novamente",
            onClick: fetchStats
          }}
          className="max-w-md"
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Alerta Flutuante (Floating Alert) */}
      {showFloatingAlert && (
        <div className="fixed bottom-6 right-6 z-50 animate-scale-in"> {/* Posição e animação */}
          <div className="relative bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded-xl shadow-lg max-w-sm flex items-start space-x-3">
            <Lightbulb className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold text-lg leading-tight mb-1">
                {stats.despesasPendentes} {stats.despesasPendentes === 1 ? 'despesa pendente' : 'despesas pendentes'}
              </h4>
              <p className="text-sm text-yellow-700 mb-3">
                Existem despesas aguardando sua aprovação.
              </p>
              <Button
                variant="primary" // Ou 'outline' se preferir algo mais discreto aqui
                size="sm"
                onClick={() => {
                  window.location.href = '/dashboard/despesas?status=pendente';
                  setShowFloatingAlert(false); // Esconde após clicar
                }}
                className="w-full justify-center" // Ocupa a largura total
              >
                Revisar Despesas
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <button
              onClick={() => setShowFloatingAlert(false)}
              className="absolute top-2 right-2 p-1 rounded-full text-yellow-600 hover:bg-yellow-200 transition-colors"
              aria-label="Fechar alerta"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white to-primary-100/50 rounded-3xl border border-primary-200/50 shadow-xl p-8 lg:p-10 transform hover:scale-[1.005] transition-transform duration-300">
        <div className="absolute inset-0 bg-grid-primary-100/20 bg-grid-32 opacity-70"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-8 lg:mb-0">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-xl">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
                  Bem-vindo, <span className="text-primary-700">{user?.nomecompleto?.split(' ')[0]}</span>! 👋
                </h1>
                <p className="text-lg text-gray-700 mt-2">Um resumo rápido das suas atividades.</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-md">
              <span className="inline-flex items-center px-4 py-2 bg-primary-200 text-primary-800 rounded-full font-semibold shadow-sm">
                <span className="w-3 h-3 bg-primary-600 rounded-full mr-2 animate-pulse"></span>
                {isAdmin ? 'Administrador' : 'Funcionário'}
              </span>
              <span className="text-gray-600 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                {new Date().toLocaleDateString('pt-PT', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard/despesas" passHref>
              <Button className="group px-6 py-3 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                <Plus className="w-6 h-6 mr-2 group-hover:rotate-90 transition-transform duration-200" />
                Nova Despesa
              </Button>
            </Link>
            <Link href="/dashboard/documentos" passHref>
              <Button variant="secondary" className="group px-6 py-3 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                <FileText className="w-6 h-6 mr-2 text-primary-700 group-hover:scale-110 transition-transform duration-200" />
                Documentos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up delay-100">
        <StatsCard
          title="Total de Despesas"
          value={stats.totalDespesas}
          icon={Receipt}
          iconBg="bg-gradient-to-br from-blue-500 to-blue-600"
          bg="bg-blue-50/70"
          change="+12%"
          changePositive={true}
        />
        <StatsCard
          title="Valor Total"
          value={stats.valorTotalDespesas}
          icon={DollarSign}
          isCurrency={true}
          iconBg="bg-gradient-to-br from-green-500 to-green-600"
          bg="bg-green-50/70"
          change="+8%"
          changePositive={true}
        />
        <StatsCard
          title="Pendentes"
          value={stats.despesasPendentes}
          icon={Clock}
          iconBg="bg-gradient-to-br from-yellow-500 to-yellow-600"
          bg="bg-yellow-50/70"
          change="-5%"
          changePositive={false}
        />
        <StatsCard
          title="Documentos"
          value={stats.totalDocumentos}
          icon={FileText}
          iconBg="bg-gradient-to-br from-purple-500 to-purple-600"
          bg="bg-purple-50/70"
          change="+15%"
          changePositive={true}
        />
      </section>

      {/* Main Content Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 p-8 shadow-xl animate-fade-in-up delay-300">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Ações Rápidas</h3>
          </div>

          <div className="space-y-4">
            {[
              {
                title: 'Gerir Despesas',
                description: 'Visualize e acompanhe todas as suas despesas',
                href: '/dashboard/despesas',
                icon: Receipt,
                color: 'text-blue-700',
                bg: 'bg-blue-100',
                hoverBg: 'hover:bg-blue-50/50',
                borderColor: 'border-blue-200'
              },
              {
                title: 'Gerir Documentos',
                description: 'Organize todos os seus documentos importantes',
                href: '/dashboard/documentos',
                icon: FileText,
                color: 'text-purple-700',
                bg: 'bg-purple-100',
                hoverBg: 'hover:bg-purple-50/50',
                borderColor: 'border-purple-200'
              },
              {
                title: 'Configurações da Conta',
                description: 'Ajuste suas preferências e dados pessoais',
                href: '/dashboard/settings',
                icon: Settings,
                color: 'text-gray-700',
                bg: 'bg-gray-100',
                hoverBg: 'hover:bg-gray-50/50',
                borderColor: 'border-gray-200'
              }
            ].map((action, index) => (
              <Link key={index} href={action.href} passHref>
                <div className={`group flex items-center p-5 rounded-xl border ${action.borderColor} shadow-sm ${action.hoverBg} transition-all duration-250 cursor-pointer transform hover:-translate-y-1 hover:shadow-md`}>
                  <div className={`w-12 h-12 ${action.bg} rounded-full flex items-center justify-center mr-5 shadow-inner group-hover:scale-105 transition-transform duration-200`}>
                    <action.icon className={`w-6 h-6 ${action.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-gray-900 group-hover:text-primary-700 transition-colors duration-200">
                      {action.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Account Overview & Recent Activity */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 p-8 shadow-xl animate-fade-in-up delay-400">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
              <UserCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Visão Geral da Conta</h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-5 bg-primary-50/70 rounded-xl border border-primary-200/50 shadow-sm">
              <div>
                <p className="font-medium text-lg text-gray-900">Função Atual</p>
                <p className="text-sm text-gray-600 mt-1">Seu papel na organização</p>
              </div>
              <span className="px-4 py-2 bg-primary-600 text-white rounded-lg text-md font-semibold shadow-md">
                {user?.cargo || (isAdmin ? 'Administrador' : 'Funcionário')}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="text-center p-5 bg-gray-50/70 rounded-xl border border-gray-200/50 shadow-sm flex flex-col items-center justify-center">
                <CheckCircle className="w-9 h-9 text-green-600 mx-auto mb-3" />
                <p className="text-base font-semibold text-gray-900">Conta Ativa</p>
                <p className="text-sm text-gray-600 mt-1">Status verificado</p>
              </div>
              <div className="text-center p-5 bg-gray-50/70 rounded-xl border border-gray-200/50 shadow-sm flex flex-col items-center justify-center">
                <Calendar className="w-9 h-9 text-blue-600 mx-auto mb-3" />
                <p className="text-base font-semibold text-gray-900">Despesas Este Mês</p>
                <p className="text-sm text-gray-600 mt-1">{stats.totalDespesas} despesas</p>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-r from-gray-50/70 to-primary-50/50 rounded-xl border border-gray-200/50 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-lg font-semibold text-gray-900">Atividade Recente</p>
                  <p className="text-sm text-gray-600 mt-1">Suas ações mais recentes no sistema</p>
                </div>
                <BarChart3 className="w-6 h-6 text-primary-700" />
              </div>
              {/* Placeholder para lista de atividades recentes */}
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-gray-400" />Nova despesa "Almoço de Negócios" registrada.</li>
                <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-gray-400" />Documento "Fatura Dezembro" carregado.</li>
                <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-gray-400" />Login bem-sucedido.</li>
              </ul>
              <Link href="/dashboard/activity-log" passHref className="text-sm text-primary-600 hover:text-primary-700 font-medium mt-4 flex items-center group">
                Ver todo o histórico
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* System Status */}
      <section className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 p-6 shadow-xl animate-fade-in-up delay-500">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse-slow"></div>
            <span className="text-base font-semibold text-gray-800">Status do Sistema: <span className="text-green-600">Operacional</span></span>
            <span className="text-sm text-gray-500 hidden md:block">
              Última verificação: {new Date().toLocaleDateString('pt-PT')} às {new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <span>Versão: v2.1.0</span>
            <span className="text-gray-400">•</span>
            <span>Todos os serviços online</span>
          </div>
        </div>
      </section>
    </div>
  );
}