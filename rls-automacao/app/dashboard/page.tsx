// src/app/dashboard/page.tsx - GRÁFICOS MOBILE CORRIGIDOS

'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { pontoAPI, PontoMensal } from '@/lib/pontoApi';
import { useAuth } from '@/hooks/useAuth';
import {
  Receipt, FileText, DollarSign, Clock, BarChart3,
  TrendingUp, Users, AlertCircle, X, CreditCard, CheckCircle, Briefcase, Calendar, LogIn,
  PieChart as PieChartIcon
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

import Loading from '@/components/ui/Loading';
import Alert from '@/components/ui/Alert';

interface DashboardStats {
  totalDespesas: number;
  totalDocumentos: number;
  valorTotalDespesas: number;
  despesasPendentes: number;
}

export default function DashboardPage() {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalDespesas: 0, totalDocumentos: 0,
    valorTotalDespesas: 0, despesasPendentes: 0
  });
  const [despesasMensais, setDespesasMensais] = useState<any[]>([]);
  const [statusDados, setStatusDados] = useState<any[]>([]);
  const [pontosDados, setPontosDados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  const COLORS = {
    pending: '#F59E0B', approved: '#10B981', rejected: '#EF4444',
    primaryBlue: '#3B82F6', accentGreen: '#059669', accentOrange: '#EA580C'
  };

  useEffect(() => {
    const updateLayout = () => setIsMobile(window.innerWidth <= 768);
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  useEffect(() => {
    if (user) fetchData();
  }, [user, isAdmin]);

  const fetchData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError('');

      const [statsRes, despesasRes, pontosRes] = await Promise.all([
        api.getDashboardStats(user),
        api.getDespesas(),
        pontoAPI.buscarPontos(isAdmin, user.id)
      ]);

      setStats(statsRes);

      const despesas = despesasRes.data || [];
      const pontos = pontosRes || [];

      const filteredDespesas = isAdmin ? despesas : despesas.filter(d => d.users_permissions_user?.id === user.id);
      const filteredPontos = isAdmin ? pontos : pontos.filter(p => p.funcionario.id === user.id);

      processarDespesasMensais(filteredDespesas);
      processarStatusDados(filteredDespesas);
      processarPontosDados(filteredPontos);

      if (isAdmin && statsRes.despesasPendentes > 0) {
        localStorage.setItem('pendingExpensesCount', statsRes.despesasPendentes.toString());
      } else {
        localStorage.removeItem('pendingExpensesCount');
      }
      window.dispatchEvent(new Event('storage'));

    } catch (err: any) {
      setError('Erro ao carregar dados');
      localStorage.removeItem('pendingExpensesCount');
      window.dispatchEvent(new Event('storage'));
    } finally {
      setLoading(false);
    }
  };

  const processarDespesasMensais = (despesas: any[]) => {
    const ultimosMeses = Array.from({ length: 6 }, (_, i) => {
      const data = new Date();
      data.setMonth(data.getMonth() - i);
      return {
        mes: data.toLocaleDateString('pt-PT', { month: 'short' }),
        valor: 0, quantidade: 0
      };
    }).reverse();

    despesas.forEach(despesa => {
      const data = new Date(despesa.data_despesa);
      const mesNome = data.toLocaleDateString('pt-PT', { month: 'short' });
      const item = ultimosMeses.find(m => m.mes === mesNome);
      if (item) {
        item.valor += despesa.valor;
        item.quantidade += 1;
      }
    });

    setDespesasMensais(ultimosMeses);
  };

  const processarStatusDados = (despesas: any[]) => {
    const status = { pendente: 0, aprovada: 0, rejeitada: 0 };
    despesas.forEach(d => {
      if (d.status in status) status[d.status as keyof typeof status]++;
    });

    setStatusDados([
      { name: 'Pendentes', value: status.pendente, color: COLORS.pending },
      { name: 'Aprovadas', value: status.aprovada, color: COLORS.approved },
      { name: 'Rejeitadas', value: status.rejeitada, color: COLORS.rejected }
    ]);
  };

  const processarPontosDados = (pontos: PontoMensal[]) => {
    if (isAdmin) {
      const dados = pontos.map(p => ({
        nome: p.funcionario.nomecompleto.split(' ')[0],
        horas: p.total_horas, extras: p.horas_extras
      }));
      dados.sort((a, b) => b.horas - a.horas);
      setPontosDados(dados.slice(0, 4));
    } else {
      const ultimosMeses = Array.from({ length: 6 }, (_, i) => {
        const data = new Date();
        data.setMonth(data.getMonth() - (5 - i));
        return {
          mes: data.getMonth() + 1,
          ano: data.getFullYear(),
          nome: `${data.toLocaleDateString('pt-PT', { month: 'short' })} ${data.getFullYear()}`,
          horas: 0,
          extras: 0
        };
      });

      pontos.forEach(ponto => {
        const item = ultimosMeses.find(m => m.mes === ponto.mes && m.ano === ponto.ano);
        if (item && ponto.funcionario.id === user?.id) {
          item.horas = ponto.total_horas;
          item.extras = ponto.horas_extras;
        }
      });

      setPontosDados(ultimosMeses);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency', currency: 'EUR', minimumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (dateString?: string | Date) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'N/A';
    return date.toLocaleDateString('pt-PT', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const CustomTooltip = ({ active, payload, label, unit }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-md text-xs">
          <p className="font-semibold text-gray-800 mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.name === 'Valor Gasto' ? formatCurrency(entry.value) : entry.value + (unit || '')}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) return <Loading title="Carregando Dashboard" />;

  return (
    <div className={`${isMobile ? 'min-h-screen' : 'fixed top-20 left-64 right-0'} bottom-12 bg-gray-50 overflow-hidden`}>
      <div className="h-full flex flex-col max-w-none max-h-full">

        {/* Header */}
        <div className="flex-shrink-0 bg-white border-b p-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <BarChart3 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                {isAdmin ? 'Dashboard Administrativo' : `Dashboard de ${user?.nomecompleto?.split(' ')[0]}`}
              </h1>
              <p className="text-xs text-gray-600">
                {isAdmin ? 'Visão completa de todos os dados' : 'Seu resumo financeiro e atividades'}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="flex-shrink-0 bg-gray-50 border-b p-3">
          <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
            <div className="bg-white p-3 rounded border flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Despesas</p>
                <p className="text-xl font-bold text-gray-900">{stats.totalDespesas}</p>
              </div>
              <Receipt className="w-6 h-6 text-indigo-500" />
            </div>

            <div className="bg-white p-3 rounded border flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Total</p>
                <p className="text-lg font-bold text-gray-900">{formatCurrency(stats.valorTotalDespesas)}</p>
              </div>
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>

            <div className="bg-white p-3 rounded border flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Pendentes</p>
                <p className="text-xl font-bold text-gray-900">{stats.despesasPendentes}</p>
              </div>
              <Clock className="w-6 h-6 text-yellow-500" />
            </div>

            <div className="bg-white p-3 rounded border flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Docs</p>
                <p className="text-xl font-bold text-gray-900">{stats.totalDocumentos}</p>
              </div>
              <FileText className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex-shrink-0 p-3">
            <Alert type="error" title="Erro" description={error} dismissible onDismiss={() => setError('')} />
          </div>
        )}

        {/* Gráficos - LAYOUT MOBILE CORRIGIDO */}
        <div className="flex-1 min-h-0 p-3 overflow-auto">
          {isMobile ? (
            // LAYOUT MOBILE: Stack vertical com altura fixa
            <div className="space-y-4">
              
              {/* Despesas Mensais Mobile */}
              <div className="bg-white rounded border p-3 h-64">
                <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-indigo-600" />
                  Despesas Mensais
                </h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={despesasMensais} margin={{ top: 5, right: 5, left: 5, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="mes" axisLine={false} tickLine={false} fontSize={10} height={15} />
                      <YAxis axisLine={false} tickLine={false} fontSize={10} tickFormatter={formatCurrency} width={40} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="valor"
                        stroke={COLORS.primaryBlue}
                        strokeWidth={3}
                        dot={{ fill: COLORS.primaryBlue, strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: COLORS.primaryBlue, strokeWidth: 2 }}
                        name="Valor Gasto"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Status Mobile */}
              <div className="bg-white rounded border p-3 h-64">
                <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                  <PieChartIcon className="w-4 h-4 mr-2 text-blue-600" />
                  Status das Despesas
                </h3>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusDados}
                        cx="50%"
                        cy="50%"
                        innerRadius="40%"
                        outerRadius="80%"
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                      >
                        {statusDados.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [`${value} despesa(s)`, name]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {statusDados.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center text-xs">
                      <span className="inline-block w-3 h-3 rounded-full mr-1" style={{ backgroundColor: entry.color }}></span>
                      <span className="text-gray-700">{entry.name} ({entry.value})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Horas Mobile */}
              <div className="bg-white rounded border p-3 h-64">
                <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                  <Users className="w-4 h-4 mr-2 text-green-600" />
                  {isAdmin ? 'Horas Funcionários' : 'Suas Horas'}
                </h3>
                {pontosDados.length > 0 ? (
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={pontosDados} margin={{ top: 5, right: 5, left: 5, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                        <XAxis dataKey="nome" axisLine={false} tickLine={false} fontSize={10} height={15} />
                        <YAxis axisLine={false} tickLine={false} fontSize={10} tickFormatter={(value) => `${value}h`} width={30} />
                        <Tooltip content={<CustomTooltip unit="h" />} />
                        <Bar dataKey="horas" fill={COLORS.accentGreen} name="Horas Totais" radius={[2, 2, 0, 0]} />
                        <Bar dataKey="extras" fill={COLORS.accentOrange} name="Horas Extras" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-48 flex items-center justify-center text-gray-500">
                    <p className="text-xs">Nenhum registro de ponto</p>
                  </div>
                )}
              </div>

              {/* Resumo da Conta Mobile */}
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg shadow-md border border-indigo-200 p-4">
                <h3 className="text-base font-bold text-indigo-900 mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-3 text-indigo-600" />
                  Sua Conta
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-indigo-50 rounded-md">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-indigo-800 font-medium">Status:</span>
                    </div>
                    <span className="text-sm font-semibold text-green-700">Ativa</span>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-indigo-50 rounded-md">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-indigo-800 font-medium">Função:</span>
                    </div>
                    <span className="text-sm font-semibold text-indigo-900">
                      {user?.cargo || (isAdmin ? 'Administrador' : 'Funcionário')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-indigo-50 rounded-md">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-orange-600" />
                      <span className="text-sm text-indigo-800 font-medium">Admissão:</span>
                    </div>
                    <span className="text-sm font-semibold text-indigo-900">
                      {formatDate(user?.data_admissao)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // LAYOUT DESKTOP: Grid original
            <div className="h-full grid gap-3 grid-cols-3 grid-rows-2 max-h-full">

              {/* Despesas Mensais Desktop */}
              <div className="col-span-2 bg-white rounded border p-3 flex flex-col min-h-0">
                <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 mr-2 text-indigo-600" />
                  Despesas Mensais
                </h3>
                <div className="flex-1 min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={despesasMensais} margin={{ top: 5, right: 5, left: 5, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="mes" axisLine={false} tickLine={false} fontSize={10} height={15} />
                      <YAxis axisLine={false} tickLine={false} fontSize={10} tickFormatter={formatCurrency} width={40} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="valor"
                        stroke={COLORS.primaryBlue}
                        strokeWidth={3}
                        dot={{ fill: COLORS.primaryBlue, strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: COLORS.primaryBlue, strokeWidth: 2 }}
                        name="Valor Gasto"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Status Desktop */}
              <div className="bg-white rounded border p-3 flex flex-col items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center flex-shrink-0">
                  <PieChartIcon className="w-4 h-4 mr-2 text-blue-600" />
                  Status
                </h3>
                <div className="flex-1 w-full flex justify-center items-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusDados}
                        cx="50%"
                        cy="50%"
                        innerRadius="65%"
                        outerRadius="95%"
                        paddingAngle={2}
                        dataKey="value"
                        labelLine={false}
                        stroke="none"
                      >
                        {statusDados.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [`${value} despesa(s)`, name]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 w-full flex-shrink-0 flex flex-wrap justify-around items-center gap-x-2 gap-y-1">
                  {statusDados.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center text-xs">
                      <span className="inline-block w-2.5 h-2.5 rounded-full mr-1" style={{ backgroundColor: entry.color }}></span>
                      <span className="text-gray-700 font-medium">{entry.name}</span>
                      <span className="ml-1 font-semibold text-gray-900">({entry.value})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Horas Desktop */}
              <div className="col-span-2 bg-white rounded border p-3 flex flex-col min-h-0">
                <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center flex-shrink-0">
                  <Users className="w-4 h-4 mr-2 text-green-600" />
                  {isAdmin ? 'Horas Funcionários' : 'Suas Horas'}
                </h3>
                {pontosDados.length > 0 ? (
                  <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={pontosDados} margin={{ top: 5, right: 5, left: 5, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                        <XAxis dataKey="nome" axisLine={false} tickLine={false} fontSize={10} height={15} />
                        <YAxis axisLine={false} tickLine={false} fontSize={10} tickFormatter={(value) => `${value}h`} width={30} />
                        <Tooltip content={<CustomTooltip unit="h" />} />
                        <Bar dataKey="horas" fill={COLORS.accentGreen} name="Horas Totais" radius={[2, 2, 0, 0]} />
                        <Bar dataKey="extras" fill={COLORS.accentOrange} name="Horas Extras" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-500 min-h-0">
                    <p className="text-xs">Nenhum registro de ponto</p>
                  </div>
                )}
              </div>

              {/* Resumo da Conta Desktop */}
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg shadow-md border border-indigo-200 p-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-24 h-24 bg-indigo-200 rounded-full opacity-30 -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-indigo-300 rounded-full opacity-20 translate-x-1/3 translate-y-1/3" />

                <h3 className="text-base font-bold text-indigo-900 mb-4 flex items-center z-10 relative">
                  <CreditCard className="w-5 h-5 mr-3 text-indigo-600" />
                  Sua Conta
                </h3>

                <div className="space-y-3 z-10 relative">
                  <div className="flex items-center justify-between p-2 bg-indigo-50 rounded-md">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-indigo-800 font-medium">Status:</span>
                    </div>
                    <span className="text-sm font-semibold text-green-700">Ativa</span>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-indigo-50 rounded-md">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-indigo-800 font-medium">Função:</span>
                    </div>
                    <span className="text-sm font-semibold text-indigo-900">
                      {user?.cargo || (isAdmin ? 'Administrador' : 'Funcionário')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-indigo-50 rounded-md">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-orange-600" />
                      <span className="text-sm text-indigo-800 font-medium">Data de Admissão:</span>
                    </div>
                    <span className="text-sm font-semibold text-indigo-900">
                      {formatDate(user?.data_admissao)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-indigo-50 rounded-md">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-sky-600" />
                      <span className="text-sm text-indigo-800 font-medium">Membro Desde:</span>
                    </div>
                    <span className="text-sm font-semibold text-indigo-900">
                      {formatDate(user?.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}