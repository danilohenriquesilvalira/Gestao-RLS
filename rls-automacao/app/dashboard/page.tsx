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

// Componentes UI reutilizáveis
import Loading from '@/components/ui/Loading';
import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import StatsCard from '@/components/ui/StatsCard'; // Importação atualizada para o componente StatsCard

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
    <div className="space-y-6 animate-fade-in-up"> {/* Espaçamento geral reduzido */}
      {/* Alerta Flutuante (Floating Alert) */}
      {showFloatingAlert && (
        <div className="fixed bottom-6 right-6 z-50 animate-scale-in">
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
                variant="primary"
                size="sm"
                onClick={() => {
                  window.location.href = '/dashboard/despesas?status=pendente';
                  setShowFloatingAlert(false);
                }}
                className="w-full justify-center"
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
      <section className="relative overflow-hidden bg-gradient-to-br from-white to-primary-100/50 rounded-2xl border border-primary-200/50 shadow-md p-6 transform hover:scale-[1.005] transition-transform duration-300"> {/* Padding e border-radius ajustados */}
        <div className="absolute inset-0 bg-grid-primary-100/20 bg-grid-32 opacity-70"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-6 lg:mb-0"> {/* Margem ajustada */}
            <div className="flex items-center space-x-3 mb-3"> {/* Espaçamento ajustado */}
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900 leading-tight"> {/* Tamanho da fonte ajustado */}
                  Bem-vindo, <span className="text-primary-700">{user?.nomecompleto?.split(' ')[0]}</span>! 👋
                </h1>
                <p className="text-base text-gray-700 mt-1">Um resumo rápido das suas finanças.</p> {/* Tamanho da fonte ajustado */}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm"> {/* Espaçamento e tamanho da fonte ajustados */}
              <span className="inline-flex items-center px-3 py-1 bg-primary-200 text-primary-800 rounded-full font-semibold shadow-sm">
                <span className="w-2.5 h-2.5 bg-primary-600 rounded-full mr-1.5 animate-pulse"></span>
                {isAdmin ? 'Administrador' : 'Funcionário'}
              </span>
              <span className="text-gray-600 flex items-center">
                <Calendar className="w-4 h-4 mr-1.5 text-gray-500" /> {/* Tamanho do ícone ajustado */}
                {new Date().toLocaleDateString('pt-PT', {
                  weekday: 'short', // Abrevia o dia da semana
                  day: 'numeric',
                  month: 'short', // Abrevia o mês
                  year: 'numeric'
                })}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3"> {/* Espaçamento entre botões ajustado */}
            <Link href="/dashboard/despesas/nova" passHref>
              <Button className="group px-5 py-2.5 text-base font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"> {/* Tamanho e padding ajustados */}
                <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-200" /> {/* Tamanho do ícone ajustado */}
                Nova Despesa
              </Button>
            </Link>
            <Link href="/dashboard/despesas" passHref>
              <Button variant="secondary" className="group px-5 py-2.5 text-base font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"> {/* Tamanho e padding ajustados */}
                <Receipt className="w-5 h-5 mr-2 text-primary-700 group-hover:scale-110 transition-transform duration-200" /> {/* Tamanho do ícone ajustado */}
                Minhas Despesas
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up delay-100"> {/* Gap ajustado */}
        <StatsCard
          title="Total de Despesas"
          value={stats.totalDespesas}
          icon={Receipt}
          iconBg="bg-gradient-to-br from-blue-500 to-blue-600"
          change="+12%"
          changePositive={true}
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

      {/* Main Content Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6"> {/* Mudança para 3 colunas em lg */}
        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 p-6 shadow-xl animate-fade-in-up delay-300"> {/* Ocupa 2 colunas em lg */}
          <div className="flex items-center space-x-3 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Ações Rápidas</h3> {/* Tamanho da fonte ajustado */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> {/* Layout de grid para ações */}
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
                title: 'Relatórios Financeiros', // Nova ação focada em finanças
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
                <div className={`group flex items-center p-4 rounded-xl border ${action.borderColor} shadow-sm ${action.hoverBg} transition-all duration-250 cursor-pointer transform hover:-translate-y-1 hover:shadow-md`}> {/* Padding reduzido */}
                  <div className={`w-10 h-10 ${action.bg} rounded-full flex items-center justify-center mr-4 shadow-inner group-hover:scale-105 transition-transform duration-200`}>
                    <action.icon className={`w-5 h-5 ${action.color}`} /> {/* Tamanho do ícone ajustado */}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-base text-gray-900 group-hover:text-primary-700 transition-colors duration-200">
                      {action.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-0.5">{action.description}</p> {/* Tamanho da fonte ajustado */}
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Account Overview & Recent Activity (Combinados em um único painel lateral) */}
        <div className="lg:col-span-1 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 p-6 shadow-xl animate-fade-in-up delay-400"> {/* Ocupa 1 coluna em lg */}
          <div className="flex items-center space-x-3 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
              <UserCircle className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Sua Conta & Atividade</h3> {/* Tamanho da fonte ajustado */}
          </div>

          <div className="space-y-4"> {/* Espaçamento reduzido */}
            <div className="p-4 bg-primary-50/70 rounded-xl border border-primary-200/50 shadow-sm flex items-center justify-between"> {/* Padding reduzido */}
              <div>
                <p className="font-medium text-sm text-gray-900">Função Atual</p> {/* Tamanho da fonte ajustado */}
                <p className="text-xs text-gray-600 mt-0.5">{user?.cargo || (isAdmin ? 'Administrador' : 'Funcionário')}</p> {/* Tamanho da fonte ajustado */}
              </div>
              <span className="px-3 py-1 bg-primary-600 text-white rounded-md text-xs font-semibold shadow-sm"> {/* Padding e tamanho da fonte ajustados */}
                {isAdmin ? 'Admin' : 'Funcionário'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3"> {/* Gap reduzido */}
              <div className="text-center p-4 bg-gray-50/70 rounded-xl border border-gray-200/50 shadow-sm flex flex-col items-center justify-center"> {/* Padding reduzido */}
                <CheckCircle className="w-7 h-7 text-green-600 mx-auto mb-2" /> {/* Tamanho do ícone ajustado */}
                <p className="text-sm font-semibold text-gray-900">Conta Ativa</p>
              </div>
              <div className="text-center p-4 bg-gray-50/70 rounded-xl border border-gray-200/50 shadow-sm flex flex-col items-center justify-center"> {/* Padding reduzido */}
                <Calendar className="w-7 h-7 text-blue-600 mx-auto mb-2" /> {/* Tamanho do ícone ajustado */}
                <p className="text-sm font-semibold text-gray-900">Despesas Mês</p>
                <p className="text-xs text-gray-600 mt-0.5">{stats.totalDespesas} itens</p>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-gray-50/70 to-primary-50/50 rounded-xl border border-gray-200/50 shadow-sm"> {/* Padding reduzido */}
              <div className="flex items-center justify-between mb-3"> {/* Margem reduzida */}
                <div>
                  <p className="text-base font-semibold text-gray-900">Atividade Recente</p> {/* Tamanho da fonte ajustado */}
                  <p className="text-xs text-gray-600 mt-0.5">Suas ações mais recentes</p> {/* Tamanho da fonte ajustado */}
                </div>
                <BarChart3 className="w-5 h-5 text-primary-700" /> {/* Tamanho do ícone ajustado */}
              </div>
              <ul className="space-y-1.5 text-gray-700 text-xs"> {/* Espaçamento e tamanho da fonte ajustados */}
                <li className="flex items-start"><ChevronRight className="w-3.5 h-3.5 mt-0.5 mr-1.5 text-gray-400 flex-shrink-0" />Nova despesa "Almoço de Negócios" registrada.</li>
                <li className="flex items-start"><ChevronRight className="w-3.5 h-3.5 mt-0.5 mr-1.5 text-gray-400 flex-shrink-0" />Documento "Fatura Dezembro" carregado.</li>
                <li className="flex items-start"><ChevronRight className="w-3.5 h-3.5 mt-0.5 mr-1.5 text-gray-400 flex-shrink-0" />Login bem-sucedido.</li>
              </ul>
              <Link href="/dashboard/activity-log" passHref className="text-xs text-primary-600 hover:text-primary-700 font-medium mt-3 flex items-center group"> {/* Tamanho da fonte e margem ajustados */}
                Ver todo o histórico
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* System Status */}
      <section className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 p-5 shadow-xl animate-fade-in-up delay-500"> {/* Padding reduzido */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3"> {/* Gap reduzido */}
          <div className="flex items-center space-x-2"> {/* Espaçamento reduzido */}
            <div className="w-3.5 h-3.5 bg-green-500 rounded-full animate-pulse-slow"></div> {/* Tamanho ajustado */}
            <span className="text-sm font-semibold text-gray-800">Status do Sistema: <span className="text-green-600">Operacional</span></span> {/* Tamanho da fonte ajustado */}
            <span className="text-xs text-gray-500 hidden md:block"> {/* Tamanho da fonte ajustado */}
              Última verificação: {new Date().toLocaleDateString('pt-PT')} às {new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-600"> {/* Espaçamento e tamanho da fonte ajustados */}
            <span>Versão: v2.1.0</span>
            <span className="text-gray-400">•</span>
            <span>Todos os serviços online</span>
          </div>
        </div>
      </section>
    </div>
  );
}