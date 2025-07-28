// app/dashboard/page.tsx
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
  Settings,
  Activity,
  CheckCircle,
  Calendar,
  Zap,
  BarChart3,
  UserCircle,
  ChevronRight,
  Lightbulb,
  X,
} from 'lucide-react';

// Componentes UI reutilizáveis (mantidos para não quebrar o resto)
import Loading from '@/components/ui/Loading';
import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import StatsCard from '@/components/ui/StatsCard'; // Assumindo que StatsCard pode ser compactado internamente ou ter estilos muito pequenos como base.

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
  const [showFloatingAlert, setShowFloatingAlert] = useState(false);

  // ESTADO E EFEITO PARA O DEBUG DE RESOLUÇÃO
  const [resolution, setResolution] = useState('');
  const [showResolutionDebugger, setShowResolutionDebugger] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateResolution = () => {
        setResolution(`${window.innerWidth}px x ${window.innerHeight}px`);
      };
      updateResolution();
      window.addEventListener('resize', updateResolution);
      return () => {
        window.removeEventListener('resize', updateResolution);
      };
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user, isAdmin]);

  useEffect(() => {
    if (isAdmin && stats.despesasPendentes > 0) {
      setShowFloatingAlert(true);
    } else {
      setShowFloatingAlert(false);
    }
  }, [stats.despesasPendentes, isAdmin]);

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
    // CONTAINER PRINCIPAL: Base extremamente compacta.
    // O breakpoint `compactDesktop:` será a sua principal referência para a resolução de 1528px.
    // Usaremos `px-2 py-2` como padrão para telas menores e `compactDesktop:px-3 compactDesktop:py-2`
    // para a resolução de 1528px, que ainda é bem compacta.
    // Para telas muito grandes (2800px+), `customXl:` pode expandir.
    <div className="space-y-2 px-2 py-2 sm:space-y-3 sm:px-3 sm:py-2 compactDesktop:space-y-3 compactDesktop:px-3 compactDesktop:py-2 customXl:space-y-6 customXl:px-6 customXl:py-4 animate-fade-in-up">
      {/* Alerta Flutuante (Floating Alert) - Mantido compacto */}
      {showFloatingAlert && (
        <div className="fixed bottom-3 right-3 z-50 animate-scale-in">
          <div className="relative bg-yellow-100 border border-yellow-300 text-yellow-800 p-2 rounded-xl shadow-lg max-w-[200px] flex items-start space-x-1.5 text-xs compactDesktop:max-w-xs compactDesktop:p-2.5">
            <Lightbulb className="w-3.5 h-3.5 text-yellow-600 mt-0.5 flex-shrink-0 compactDesktop:w-4 compactDesktop:h-4" />
            <div className="flex-1">
              <h4 className="font-semibold text-sm leading-tight mb-0.5 compactDesktop:text-base">
                {stats.despesasPendentes} {stats.despesasPendentes === 1 ? 'despesa pendente' : 'despesas pendentes'}
              </h4>
              <p className="text-xs text-yellow-700 mb-1 compactDesktop:mb-1.5">
                Existem despesas aguardando sua aprovação.
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  window.location.href = '/dashboard/despesas?status=pendente';
                  setShowFloatingAlert(false);
                }}
                className="w-full justify-center text-xs px-2 py-0.5 compactDesktop:text-sm compactDesktop:px-3 compactDesktop:py-1"
              >
                Revisar Despesas
                <ArrowRight className="w-2.5 h-2.5 ml-1 compactDesktop:w-3 h-3" />
              </Button>
            </div>
            <button
              onClick={() => setShowFloatingAlert(false)}
              className="absolute top-1 right-1 p-0.5 rounded-full text-yellow-600 hover:bg-yellow-200 transition-colors"
              aria-label="Fechar alerta"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Hero Section - Compacta por padrão, com ajustes leves para compactDesktop */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white to-primary-100/50 rounded-lg border border-primary-200/50 shadow-md p-3 compactDesktop:p-3 customXl:p-6 transform hover:scale-[1.005] transition-transform duration-300">
        <div className="absolute inset-0 bg-grid-primary-100/20 bg-grid-32 opacity-70"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-2 lg:mb-0">
            <div className="flex items-center space-x-2 mb-1 compactDesktop:space-x-2 compactDesktop:mb-1.5 customXl:space-x-4 customXl:mb-4">
              <div className="w-8 h-8 compactDesktop:w-9 h-9 customXl:w-12 customXl:h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg">
                <Activity className="w-4 h-4 compactDesktop:w-4.5 h-4.5 customXl:w-7 customXl:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-lg compactDesktop:text-xl customXl:text-4xl font-extrabold text-gray-900 leading-tight">
                  Bem-vindo, <span className="text-primary-700">{user?.nomecompleto?.split(' ')[0]}</span>! 👋
                </h1>
                <p className="text-xs compactDesktop:text-sm customXl:text-lg text-gray-700 mt-0.5">Um resumo rápido das suas finanças.</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs compactDesktop:gap-x-2.5 customXl:text-base customXl:gap-x-4 customXl:gap-y-1">
              <span className="inline-flex items-center px-1.5 py-0.5 compactDesktop:px-2 py-0.5 customXl:px-4 customXl:py-1 bg-primary-200 text-primary-800 rounded-full font-semibold shadow-sm">
                <span className="w-1.5 h-1.5 compactDesktop:w-1.5 h-1.5 customXl:w-3 customXl:h-3 bg-primary-600 rounded-full mr-1 animate-pulse"></span>
                {isAdmin ? 'Administrador' : 'Funcionário'}
              </span>
              <span className="text-gray-600 flex items-center">
                <Calendar className="w-3 h-3 compactDesktop:w-3.5 h-3.5 customXl:w-5 customXl:h-5 mr-0.5 text-gray-500" />
                {new Date().toLocaleDateString('pt-PT', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 compactDesktop:gap-2 customXl:gap-4">
            <Link href="/dashboard/despesas/nova" passHref>
              <Button className="group px-3 py-1.5 text-sm compactDesktop:px-3.5 py-1.5 customXl:px-6 customXl:py-3 customXl:text-base font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                <Plus className="w-3.5 h-3.5 mr-1 group-hover:rotate-90 transition-transform duration-200 customXl:w-6 customXl:h-6 customXl:mr-2" />
                Nova Despesa
              </Button>
            </Link>
            <Link href="/dashboard/despesas" passHref>
              <Button variant="secondary" className="group px-3 py-1.5 text-sm compactDesktop:px-3.5 py-1.5 customXl:px-6 customXl:py-3 customXl:text-base font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                <Receipt className="w-3.5 h-3.5 mr-1 text-primary-700 group-hover:scale-110 transition-transform duration-200 customXl:w-6 customXl:h-6 customXl:mr-2" />
                Minhas Despesas
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Grid - Gap ainda mais compacto para compactDesktop */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 compactDesktop:gap-2 customXl:gap-6 animate-fade-in-up delay-100">
        <StatsCard
          title="Total de Despesas"
          value={stats.totalDespesas}
          icon={Receipt}
          iconBg="bg-gradient-to-br from-blue-500 to-blue-600"
          change="+12%"
          changePositive={true}
          // Idealmente, StatsCard teria props como `isCompact` ou `size="sm"`
          // Para esta resolução, assumimos que o StatsCard base já é bastante compacto.
          // Se ainda causar rolagem, você terá que ajustar o StatsCard.tsx internamente.
        />
        <StatsCard
          title="Valor Total"
          value={stats.valorTotalDespesas}
          icon={DollarSign}
          isCurrency={true}
          iconBg="bg-gradient-to-br from-green-500 to-green-600"
          change="+8%"
          changePositive={true}
        />
        <StatsCard
          title="Despesas Pendentes"
          value={stats.despesasPendentes}
          icon={Clock}
          iconBg="bg-gradient-to-br from-yellow-500 to-yellow-600"
          change="-5%"
          changePositive={false}
        />
        <StatsCard
          title="Total de Documentos"
          value={stats.totalDocumentos}
          icon={FileText}
          iconBg="bg-gradient-to-br from-purple-500 to-purple-600"
          change="+15%"
          changePositive={true}
        />
      </section>

      {/* Main Content Grid - **AJUSTES CRUCIAIS AQUI** */}
      {/* Reduzi o gap da grid principal para garantir que os dois painéis caibam. */}
      {/* Os paddings internos dos divs também foram reduzidos significativamente. */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-2 compactDesktop:gap-2 customXl:gap-6 flex-grow">
        {/* Quick Actions - Padding e tamanhos de fonte/ícone REDUZIDOS */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-lg border border-gray-100 p-2.5 compactDesktop:p-3 customXl:p-6 shadow-xl animate-fade-in-up delay-300">
          <div className="flex items-center space-x-1.5 mb-2 compactDesktop:space-x-2 compactDesktop:mb-3 customXl:space-x-4 customXl:mb-6">
            <div className="w-7 h-7 compactDesktop:w-8 h-8 customXl:w-11 customXl:h-11 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-lg">
              <Zap className="w-3.5 h-3.5 compactDesktop:w-4 h-4 customXl:w-6 customXl:h-6 text-white" />
            </div>
            <h3 className="text-base compactDesktop:text-lg customXl:text-2xl font-bold text-gray-900">Ações Rápidas</h3>
          </div>

          {/* Grid de Ações Rápidas - Gap e paddings dos itens REDUZIDOS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 compactDesktop:gap-2.5 customXl:gap-5">
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
              },
              {
                title: 'Relatórios Financeiros',
                description: 'Acesse análises e insights detalhados',
                href: '/dashboard/reports',
                icon: BarChart3,
                color: 'text-teal-700',
                bg: 'bg-teal-100',
                hoverBg: 'hover:bg-teal-50/50',
                borderColor: 'border-teal-200'
              }
            ].map((action, index) => (
              <Link key={index} href={action.href} passHref>
                <div className={`group flex items-center p-2 compactDesktop:p-2.5 customXl:p-4 rounded-lg border ${action.borderColor} shadow-sm ${action.hoverBg} transition-all duration-250 cursor-pointer transform hover:-translate-y-0.5 hover:shadow-md`}>
                  <div className={`w-7 h-7 compactDesktop:w-8 h-8 customXl:w-11 customXl:h-11 ${action.bg} rounded-full flex items-center justify-center mr-2 compactDesktop:mr-2.5 customXl:mr-4 shadow-inner group-hover:scale-105 transition-transform duration-200`}>
                    <action.icon className={`w-3.5 h-3.5 compactDesktop:w-4 h-4 ${action.color} customXl:w-5 customXl:h-5`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm compactDesktop:text-sm customXl:text-base text-gray-900 group-hover:text-primary-700 transition-colors duration-200">
                      {action.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-0.5 customXl:text-sm">{action.description}</p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 compactDesktop:w-4 h-4 customXl:w-5 customXl:h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Account Overview & Recent Activity - Padding e tamanhos de fonte/ícone REDUZIDOS */}
        <div className="lg:col-span-1 bg-white/80 backdrop-blur-md rounded-lg border border-gray-100 p-2.5 compactDesktop:p-3 customXl:p-6 shadow-xl animate-fade-in-up delay-400">
          <div className="flex items-center space-x-1.5 mb-2 compactDesktop:space-x-2 compactDesktop:mb-3 customXl:space-x-4 customXl:mb-6">
            <div className="w-7 h-7 compactDesktop:w-8 h-8 customXl:w-11 customXl:h-11 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-lg">
              <UserCircle className="w-3.5 h-3.5 compactDesktop:w-4 h-4 customXl:w-6 customXl:h-6 text-white" />
            </div>
            <h3 className="text-base compactDesktop:text-lg customXl:text-2xl font-bold text-gray-900">Sua Conta & Atividade</h3>
          </div>

          <div className="space-y-2 compactDesktop:space-y-2.5 customXl:space-y-4">
            <div className="p-2 compactDesktop:p-2.5 customXl:p-4 bg-primary-50/70 rounded-lg border border-primary-200/50 shadow-sm flex items-center justify-between">
              <div>
                <p className="font-medium text-sm compactDesktop:text-sm customXl:text-base text-gray-900">Função Atual</p>
                <p className="text-xs compactDesktop:text-xs customXl:text-sm text-gray-600 mt-0.5">{user?.cargo || (isAdmin ? 'Administrador' : 'Funcionário')}</p>
              </div>
              <span className="px-1.5 py-0.5 compactDesktop:px-2 py-0.5 customXl:px-4 customXl:py-1 bg-primary-600 text-white rounded-md text-xs font-semibold shadow-sm">
                {isAdmin ? 'Admin' : 'Funcionário'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 compactDesktop:gap-2.5 customXl:gap-5">
              <div className="text-center p-2 compactDesktop:p-2.5 customXl:p-4 bg-gray-50/70 rounded-lg border border-gray-200/50 shadow-sm flex flex-col items-center justify-center">
                <CheckCircle className="w-4.5 h-4.5 compactDesktop:w-5 h-5 customXl:w-8 customXl:h-8 text-green-600 mx-auto mb-0.5" />
                <p className="text-sm compactDesktop:text-sm customXl:text-base font-semibold text-gray-900">Conta Ativa</p>
              </div>
              <div className="text-center p-2 compactDesktop:p-2.5 customXl:p-4 bg-gray-50/70 rounded-lg border border-gray-200/50 shadow-sm flex flex-col items-center justify-center">
                <Calendar className="w-4.5 h-4.5 compactDesktop:w-5 h-5 customXl:w-8 customXl:h-8 text-blue-600 mx-auto mb-0.5" />
                <p className="text-sm compactDesktop:text-sm customXl:text-base font-semibold text-gray-900">Despesas Mês</p>
                <p className="text-xs text-gray-600 mt-0.5 customXl:text-sm">{stats.totalDespesas} itens</p>
              </div>
            </div>

            <div className="p-2 compactDesktop:p-2.5 customXl:p-4 bg-gradient-to-r from-gray-50/70 to-primary-50/50 rounded-lg border border-gray-200/50 shadow-sm">
              <div className="flex items-center justify-between mb-1.5 compactDesktop:mb-2 customXl:mb-3">
                <div>
                  <p className="text-sm compactDesktop:text-sm customXl:text-base font-semibold text-gray-900">Atividade Recente</p>
                  <p className="text-xs text-gray-600 mt-0.5 customXl:text-sm">Suas ações mais recentes</p>
                </div>
                <BarChart3 className="w-3.5 h-3.5 compactDesktop:w-4 h-4 customXl:w-5 customXl:h-5 text-primary-700" />
              </div>
              <ul className="space-y-0.5 compactDesktop:space-y-1 text-gray-700 text-xs customXl:text-sm">
                <li className="flex items-start"><ChevronRight className="w-2.5 h-2.5 mt-0.5 mr-0.5 text-gray-400 flex-shrink-0" />Nova despesa "Almoço de Negócios" registrada.</li>
                <li className="flex items-start"><ChevronRight className="w-2.5 h-2.5 mt-0.5 mr-0.5 text-gray-400 flex-shrink-0" />Documento "Fatura Dezembro" carregado.</li>
                <li className="flex items-start"><ChevronRight className="w-2.5 h-2.5 mt-0.5 mr-0.5 text-gray-400 flex-shrink-0" />Login bem-sucedido.</li>
              </ul>
              <Link href="/dashboard/activity-log" passHref className="text-xs compactDesktop:text-xs customXl:text-sm text-primary-600 hover:text-primary-700 font-medium mt-1 flex items-center group">
                Ver todo o histórico
                <ArrowRight className="w-2.5 h-2.5 ml-0.5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DEBUG FLUTUANTE DE RESOLUÇÃO DA TELA - Mantido compacto */}
      {showResolutionDebugger && (
        <div className="fixed bottom-2 left-2 z-[9999] bg-gray-800 text-white text-xs px-2 py-1 rounded-lg shadow-lg flex items-center space-x-1 opacity-90">
          <span>Resolução: {resolution}</span>
          <button
            onClick={() => setShowResolutionDebugger(false)}
            className="text-gray-400 hover:text-white transition-colors p-0.5 rounded-full"
            aria-label="Fechar Debugger de Resolução"
          >
            <X className="w-2 h-2" />
          </button>
        </div>
      )}
    </div>
  );
}