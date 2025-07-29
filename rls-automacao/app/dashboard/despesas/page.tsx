'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { api, Despesa } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import {
    Plus,
    Receipt,
    Euro,
    FileText,
    CheckCircle,
    XCircle,
    Clock,
    Eye,
    Loader2,
    AlertCircle,
    Download,
    Image,
    DollarSign,
    Users,
    ArrowUpRight,
    ChevronLeft,
    ChevronRight,
    Search,
    X
} from 'lucide-react';

import Loading from '@/components/ui/Loading';
import Alert from '@/components/ui/Alert';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Pagination from '@/components/ui/Pagination';

type StatusDespesa = 'todas' | 'pendente' | 'aprovada' | 'rejeitada';

const safeString = (value: any): string => {
    if (value === null || value === undefined) return '';
    return String(value);
};

const safeNumber = (value: any): number => {
    if (value === null || value === undefined) return 0;
    const num = typeof value === 'number' ? value : parseFloat(String(value));
    return isNaN(num) ? 0 : num;
};

export default function DespesasPage() {
    const { user, isAdmin } = useAuth();
    const [despesas, setDespesas] = useState<Despesa[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedDespesa, setSelectedDespesa] = useState<Despesa | null>(null);
    const [statusFilter, setStatusFilter] = useState<StatusDespesa>('todas');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedFuncionario, setSelectedFuncionario] = useState<string>('');
    const [selectedMes, setSelectedMes] = useState<number>(0);
    const [selectedAno, setSelectedAno] = useState<number>(0);
    const [isMobile, setIsMobile] = useState(false);

    // Cards responsivos baseados na resolução
    const [cardsPerPage, setCardsPerPage] = useState(6);

    // Detecta mobile e ajusta layout
    useEffect(() => {
        const updateLayout = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const mobile = width <= 768;
            
            setIsMobile(mobile);
            
            if (mobile) {
                setCardsPerPage(5); // Mobile: 5 cards por página (lista vertical)
            } else if (width <= 1528 && height <= 834) {
                setCardsPerPage(6); // 2 fileiras x 3 colunas
            } else if (width > 1900) {
                setCardsPerPage(15); // 3 fileiras x 5 colunas
            } else {
                setCardsPerPage(12); // 3 fileiras x 4 colunas
            }
        };

        updateLayout();
        window.addEventListener('resize', updateLayout);
        return () => window.removeEventListener('resize', updateLayout);
    }, []);

    const [novaDespesa, setNovaDespesa] = useState({
        descricao: '',
        valor: '',
        data_despesa: '',
        categoria: 'outros' as const,
        observacoes: '',
        comprovativo: null as File | null
    });

    useEffect(() => {
        if (user) {
            fetchDespesas();
        }
    }, [user]);

    const fetchDespesas = async () => {
        try {
            setLoading(true);
            setError('');

            const response = await api.getDespesas();
            let todasDespesas = response.data || [];

            if (!isAdmin && user) {
                todasDespesas = todasDespesas.filter((d: Despesa) =>
                    d.users_permissions_user?.id === user.id
                );
            }

            todasDespesas.sort((a, b) => {
                const dateA = new Date(safeString(a.data_despesa)).getTime();
                const dateB = new Date(safeString(b.data_despesa)).getTime();
                return dateB - dateA;
            });

            setDespesas(todasDespesas);
        } catch (err: any) {
            const errorMessage = safeString(err?.message || 'Erro desconhecido');
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateDespesa = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            setError('Usuário não autenticado.');
            return;
        }

        try {
            setLoading(true);

            let comprovantivoId = null;

            if (novaDespesa.comprovativo) {
                const uploadResult = await api.uploadFile(novaDespesa.comprovativo);
                if (uploadResult && uploadResult.id) {
                    comprovantivoId = uploadResult.id;
                } else {
                    throw new Error('Erro no upload do arquivo: ID não retornado.');
                }
            }

            const despesaData = {
                descricao: safeString(novaDespesa.descricao),
                valor: safeNumber(novaDespesa.valor),
                data_despesa: safeString(novaDespesa.data_despesa),
                categoria: novaDespesa.categoria,
                observacoes: safeString(novaDespesa.observacoes),
                status: 'pendente' as const,
                users_permissions_user: user.id,
                ...(comprovantivoId && { comprovativo: comprovantivoId })
            };

            await api.createDespesa(despesaData);

            setNovaDespesa({
                descricao: '',
                valor: '',
                data_despesa: '',
                categoria: 'outros',
                observacoes: '',
                comprovativo: null
            });

            setShowCreateModal(false);
            await fetchDespesas();
        } catch (err: any) {
            const errorMessage = safeString(err?.message || 'Erro ao criar despesa');
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (despesaId: number, novoStatus: 'aprovada' | 'rejeitada', observacoes?: string) => {
        try {
            setLoading(true);
            await api.updateDespesaStatus(despesaId, novoStatus, observacoes);
            await fetchDespesas();
            setShowDetailsModal(false);
        } catch (err: any) {
            const errorMessage = safeString(err?.message || 'Erro ao alterar status');
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (value: any): string => {
        const numValue = safeNumber(value);
        return new Intl.NumberFormat('pt-PT', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(numValue);
    };

    const formatDate = (dateString: any): string => {
        const dateStr = safeString(dateString);
        if (!dateStr) return 'Data inválida';

        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return 'Data inválida';
            return date.toLocaleDateString('pt-PT', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
        } catch {
            return 'Data inválida';
        }
    };

    const getStatusIcon = (status: any) => {
        const statusStr = safeString(status);
        switch (statusStr) {
            case 'aprovada': return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'rejeitada': return <XCircle className="w-4 h-4 text-red-600" />;
            default: return <Clock className="w-4 h-4 text-yellow-600" />;
        }
    };

    const getStatusColor = (status: any): string => {
        const statusStr = safeString(status);
        switch (statusStr) {
            case 'aprovada': return 'bg-green-100 text-green-800 border-green-200';
            case 'rejeitada': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        }
    };

    const filteredDespesas = useMemo(() => {
        return despesas.filter((despesa) => {
            const despesaStatus = safeString(despesa?.status || '');
            const matchStatus = statusFilter === 'todas' || despesaStatus === statusFilter;

            const matchFuncionario = !selectedFuncionario || 
                (despesa.users_permissions_user?.nomecompleto === selectedFuncionario);

            let matchPeriodo = true;
            if (selectedMes || selectedAno) {
                const despesaDate = new Date(despesa.data_despesa);
                const despesaMes = despesaDate.getMonth() + 1;
                const despesaAno = despesaDate.getFullYear();
                
                matchPeriodo = (!selectedMes || despesaMes === selectedMes) &&
                             (!selectedAno || despesaAno === selectedAno);
            }

            return matchStatus && matchFuncionario && matchPeriodo;
        });
    }, [despesas, statusFilter, selectedFuncionario, selectedMes, selectedAno]);

    const funcionarios = [...new Set(despesas.map(d => d.users_permissions_user?.nomecompleto).filter(Boolean))];
    const anosDisponiveis = [...new Set(despesas.map(d => new Date(d.data_despesa).getFullYear()))].sort((a, b) => b - a);

    const getMesNome = (mes: number) => {
        const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 
                      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        return meses[mes - 1] || 'N/A';
    };

    // Paginação - CÁLCULOS
    const totalPages = Math.ceil(filteredDespesas.length / cardsPerPage);
    const startIndex = (currentPage - 1) * cardsPerPage;
    const paginatedDespesas = filteredDespesas.slice(startIndex, startIndex + cardsPerPage);

    const handleFilterChange = (value: StatusDespesa) => {
        setStatusFilter(value);
        setCurrentPage(1);
    };

    // Reset página quando filtros mudarem
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedFuncionario, selectedMes, selectedAno, cardsPerPage]);

    const stats = {
        total: filteredDespesas.length,
        valorTotal: filteredDespesas.reduce((acc, despesa) => acc + safeNumber(despesa.valor), 0),
        pendentes: filteredDespesas.filter(d => d.status === 'pendente').length,
        aprovadas: filteredDespesas.filter(d => d.status === 'aprovada').length
    };

    if (loading && despesas.length === 0) {
        return <Loading title="Carregando despesas..." />;
    }

    return (
        <div className={`h-full ${isMobile ? '' : 'lg:fixed lg:top-20 lg:left-0 lg:lg:left-64 lg:right-0 lg:bottom-0'} bg-white overflow-hidden`}>
            <div className="h-full flex flex-col">
                
                {/* Header */}
                <div className={`flex-shrink-0 ${isMobile ? 'p-4' : 'p-3 sm:p-4'} border-b border-gray-200`}>
                    <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'flex-col lg:flex-row lg:items-center justify-between space-y-3 lg:space-y-0'}`}>
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="p-2 bg-primary-100 rounded-lg">
                                <Receipt className={`${isMobile ? 'w-6 h-6' : 'w-5 h-5 sm:w-6 h-6'} text-primary-600`} />
                            </div>
                            <div>
                                <h1 className={`${isMobile ? 'text-xl' : 'text-lg sm:text-xl'} font-bold text-gray-900`}>Despesas</h1>
                                <p className={`${isMobile ? 'text-sm' : 'text-xs sm:text-sm'} text-gray-600`}>{stats.total} despesas • {formatCurrency(stats.valorTotal)}</p>
                            </div>
                        </div>
                        
                        <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'flex-wrap items-center gap-2'}`}>
                            <Button
                                onClick={() => setShowCreateModal(true)}
                                size={isMobile ? "md" : "sm"}
                                className="bg-primary-500 hover:bg-primary-600"
                            >
                                <Plus className="w-4 h-4 mr-1" />
                                Nova Despesa
                            </Button>

                            {/* Filtros Mobile - Vertical */}
                            {isMobile ? (
                                <div className="space-y-2">
                                    <div className="grid grid-cols-2 gap-2">
                                        <select
                                            value={selectedMes}
                                            onChange={(e) => setSelectedMes(Number(e.target.value))}
                                            className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-200"
                                        >
                                            <option value={0}>Todos os meses</option>
                                            {Array.from({length: 12}, (_, i) => (
                                                <option key={i+1} value={i+1}>
                                                    {getMesNome(i+1)}
                                                </option>
                                            ))}
                                        </select>

                                        <select
                                            value={selectedAno}
                                            onChange={(e) => setSelectedAno(Number(e.target.value))}
                                            className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-200"
                                        >
                                            <option value={0}>Todos os anos</option>
                                            {anosDisponiveis.map(ano => (
                                                <option key={ano} value={ano}>{ano}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <select
                                        value={statusFilter}
                                        onChange={(e) => handleFilterChange(e.target.value as StatusDespesa)}
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-200"
                                    >
                                        <option value="todas">Todas</option>
                                        <option value="pendente">Pendentes</option>
                                        <option value="aprovada">Aprovadas</option>
                                        <option value="rejeitada">Rejeitadas</option>
                                    </select>

                                    {isAdmin && (
                                        <select
                                            value={selectedFuncionario}
                                            onChange={(e) => setSelectedFuncionario(e.target.value)}
                                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-200"
                                        >
                                            <option value="">Todos os funcionários</option>
                                            {funcionarios.map(nome => (
                                                <option key={nome} value={nome}>{nome}</option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            ) : (
                                /* Filtros Desktop - Horizontal */
                                <div className="flex items-center space-x-2">
                                    <select
                                        value={selectedMes}
                                        onChange={(e) => setSelectedMes(Number(e.target.value))}
                                        className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-200"
                                    >
                                        <option value={0}>Todos os meses</option>
                                        {Array.from({length: 12}, (_, i) => (
                                            <option key={i+1} value={i+1}>
                                                {getMesNome(i+1)}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        value={selectedAno}
                                        onChange={(e) => setSelectedAno(Number(e.target.value))}
                                        className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-200"
                                    >
                                        <option value={0}>Todos os anos</option>
                                        {anosDisponiveis.map(ano => (
                                            <option key={ano} value={ano}>{ano}</option>
                                        ))}
                                    </select>

                                    <select
                                        value={statusFilter}
                                        onChange={(e) => handleFilterChange(e.target.value as StatusDespesa)}
                                        className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-200"
                                    >
                                        <option value="todas">Todas</option>
                                        <option value="pendente">Pendentes</option>
                                        <option value="aprovada">Aprovadas</option>
                                        <option value="rejeitada">Rejeitadas</option>
                                    </select>

                                    {isAdmin && (
                                        <select
                                            value={selectedFuncionario}
                                            onChange={(e) => setSelectedFuncionario(e.target.value)}
                                            className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-200"
                                        >
                                            <option value="">Todos os funcionários</option>
                                            {funcionarios.map(nome => (
                                                <option key={nome} value={nome}>{nome}</option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className={`flex-shrink-0 ${isMobile ? 'p-4' : 'p-3 sm:p-4'} border-b border-gray-100`}>
                    <div className="grid grid-cols-4 gap-2">
                        <div className="bg-white p-2 rounded border text-center">
                            <div className={`${isMobile ? 'text-lg' : 'text-base'} font-bold text-gray-900`}>{stats.total}</div>
                            <div className="text-xs text-gray-600">Total</div>
                        </div>
                        <div className="bg-white p-2 rounded border text-center">
                            <div className={`${isMobile ? 'text-lg' : 'text-base'} font-bold text-green-600`}>{stats.aprovadas}</div>
                            <div className="text-xs text-gray-600">Aprovadas</div>
                        </div>
                        <div className="bg-white p-2 rounded border text-center">
                            <div className={`${isMobile ? 'text-lg' : 'text-base'} font-bold text-yellow-600`}>{stats.pendentes}</div>
                            <div className="text-xs text-gray-600">Pendentes</div>
                        </div>
                        <div className="bg-white p-2 rounded border text-center">
                            <div className={`${isMobile ? 'text-sm' : 'text-base'} font-bold text-blue-600`}>{isMobile ? formatCurrency(stats.valorTotal).replace('€', '€') : formatCurrency(stats.valorTotal)}</div>
                            <div className="text-xs text-gray-600">Valor</div>
                        </div>
                    </div>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className={`flex-shrink-0 ${isMobile ? 'p-4' : 'p-3 sm:p-4'}`}>
                        <Alert
                            type="error"
                            title="Erro"
                            description={error}
                            dismissible={true}
                            onDismiss={() => setError('')}
                        />
                    </div>
                )}

                {/* Content */}
                <div className={`flex-1 min-h-0 ${isMobile ? 'p-4 pb-20' : 'p-3 sm:p-4 pb-16'}`}>
                    {filteredDespesas.length === 0 ? (
                        <div className="h-full flex items-center justify-center">
                            <div className="text-center">
                                <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhuma despesa</h3>
                                <p className="text-gray-600 mb-4">Crie sua primeira despesa</p>
                                <Button onClick={() => setShowCreateModal(true)}>
                                    Criar Despesa
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col">
                            {/* Grid responsivo */}
                            <div className="flex-1 overflow-y-auto pb-4">
                                {isMobile ? (
                                    /* Layout Mobile - Lista Vertical */
                                    <div className="space-y-3">
                                        {paginatedDespesas.map((despesa) => (
                                            <div
                                                key={despesa.id}
                                                className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow p-4 cursor-pointer"
                                                onClick={() => {
                                                    setSelectedDespesa(despesa);
                                                    setShowDetailsModal(true);
                                                }}
                                            >
                                                {/* Header Mobile */}
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex items-start space-x-3 flex-1">
                                                        <div className="p-2 bg-primary-100 rounded-lg">
                                                            <Receipt className="w-5 h-5 text-primary-600" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="text-base font-semibold text-gray-900 truncate">
                                                                {safeString(despesa.descricao)}
                                                            </h3>
                                                            <p className="text-sm text-gray-500">
                                                                {formatDate(despesa.data_despesa)}
                                                            </p>
                                                            <p className="text-xs text-gray-400 capitalize">
                                                                {safeString(despesa.categoria)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-lg font-bold text-primary-600">
                                                            {formatCurrency(despesa.valor)}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Status e Admin */}
                                                <div className="flex items-center justify-between">
                                                    <span className={`px-3 py-1 text-xs rounded-full border flex items-center ${getStatusColor(despesa.status)}`}>
                                                        {getStatusIcon(despesa.status)}
                                                        <span className="ml-1 capitalize">{safeString(despesa.status)}</span>
                                                    </span>
                                                    
                                                    {isAdmin && despesa.users_permissions_user && (
                                                        <div className="flex items-center space-x-1">
                                                            <Users className="w-4 h-4 text-gray-400" />
                                                            <span className="text-xs text-gray-600 truncate max-w-24">
                                                                {safeString(despesa.users_permissions_user.nomecompleto)}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    /* Layout Desktop - Grid */
                                    <div className={`grid gap-3 ${
                                        cardsPerPage === 6 ? 'grid-cols-3 grid-rows-2' :
                                        cardsPerPage === 12 ? 'grid-cols-4 grid-rows-3' :
                                        'grid-cols-5 grid-rows-3'
                                    }`}>
                                        {paginatedDespesas.map((despesa) => (
                                            <div
                                                key={despesa.id}
                                                className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow p-4 cursor-pointer"
                                                onClick={() => {
                                                    setSelectedDespesa(despesa);
                                                    setShowDetailsModal(true);
                                                }}
                                            >
                                                {/* Header */}
                                                <div className="flex items-center space-x-2 mb-3">
                                                    <div className="p-2 bg-primary-100 rounded-lg">
                                                        <Receipt className="w-4 h-4 text-primary-600" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                                                            {safeString(despesa.descricao)}
                                                        </h3>
                                                        <p className="text-xs text-gray-500">
                                                            {formatDate(despesa.data_despesa)}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Valor */}
                                                <div className="mb-3">
                                                    <p className="text-lg font-bold text-gray-900">
                                                        {formatCurrency(despesa.valor)}
                                                    </p>
                                                </div>

                                                {/* Categoria e Status */}
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full capitalize">
                                                        {safeString(despesa.categoria)}
                                                    </span>
                                                    <span className={`px-2 py-1 text-xs rounded-full border flex items-center ${getStatusColor(despesa.status)}`}>
                                                        {getStatusIcon(despesa.status)}
                                                        <span className="ml-1 capitalize">{safeString(despesa.status)}</span>
                                                    </span>
                                                </div>

                                                {/* Observações */}
                                                {despesa.observacoes && (
                                                    <div className="mb-3">
                                                        <p className="text-xs text-gray-600 line-clamp-2">
                                                            {safeString(despesa.observacoes)}
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Admin info */}
                                                {isAdmin && despesa.users_permissions_user && (
                                                    <div className="flex items-center space-x-1 mb-3 pt-2 border-t">
                                                        <Users className="w-3 h-3 text-gray-400" />
                                                        <span className="text-xs text-gray-600 truncate">
                                                            {safeString(despesa.users_permissions_user.nomecompleto)}
                                                        </span>
                                                    </div>
                                                )}

                                                {/* Action */}
                                                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                                    <span className="text-xs text-gray-500">Ver detalhes</span>
                                                    <ArrowUpRight className="w-4 h-4 text-gray-400" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* PAGINAÇÃO RESPONSIVA */}
                {filteredDespesas.length > 0 && (
                    <div className={`fixed bottom-0 ${isMobile ? 'left-0 right-0' : 'left-0 lg:left-64 xl:left-80 right-0 xl:right-80'} bg-white border-t border-gray-200 shadow-lg z-30`}>
                        <div className={`${isMobile ? 'p-3' : 'p-3 sm:p-4'}`}>
                            {isMobile ? (
                                /* Paginação Mobile - Compacta */
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-600">
                                        {startIndex + 1}-{Math.min(startIndex + cardsPerPage, filteredDespesas.length)} de {filteredDespesas.length}
                                    </span>
                                    
                                    <div className="flex items-center space-x-1">
                                        <button
                                            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="flex items-center px-3 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>

                                        <span className="px-3 py-2 bg-primary-500 text-white rounded-lg text-sm font-bold min-w-16 text-center">
                                            {currentPage}/{totalPages}
                                        </span>

                                        <button
                                            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                                            disabled={currentPage >= totalPages}
                                            className="flex items-center px-3 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* Paginação Desktop */
                                <div className="flex items-center justify-between text-xs sm:text-sm">
                                    <span className="text-gray-600">
                                        {startIndex + 1}-{Math.min(startIndex + cardsPerPage, filteredDespesas.length)} de {filteredDespesas.length}
                                    </span>
                                    
                                    <div className="flex items-center space-x-1 sm:space-x-2">
                                        <button
                                            onClick={() => setCurrentPage(1)}
                                            disabled={currentPage === 1}
                                            className="px-2 py-1 text-xs border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            1ª
                                        </button>
                                        
                                        <button
                                            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="flex items-center px-2 py-1 text-xs border rounded hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            <ChevronLeft className="w-3 h-3" />
                                        </button>

                                        <span className="px-3 py-1 bg-primary-500 text-white rounded text-xs font-bold">
                                            {currentPage}/{totalPages}
                                        </span>

                                        <button
                                            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                                            disabled={currentPage >= totalPages}
                                            className="flex items-center px-2 py-1 text-xs border rounded hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            <ChevronRight className="w-3 h-3" />
                                        </button>
                                        
                                        <button
                                            onClick={() => setCurrentPage(totalPages)}
                                            disabled={currentPage >= totalPages}
                                            className="px-2 py-1 text-xs border rounded hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            Últ
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal Create */}
            <Modal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                title="Nova Despesa"
                size="lg"
            >
                <form onSubmit={handleCreateDespesa} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Descrição *</label>
                        <input
                            type="text"
                            required
                            value={novaDespesa.descricao}
                            onChange={(e) => setNovaDespesa({ ...novaDespesa, descricao: e.target.value })}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                            placeholder="Ex: Combustível, Refeição..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Valor (€) *</label>
                            <input
                                type="number"
                                step="0.01"
                                required
                                value={novaDespesa.valor}
                                onChange={(e) => setNovaDespesa({ ...novaDespesa, valor: e.target.value })}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Data *</label>
                            <input
                                type="date"
                                required
                                value={novaDespesa.data_despesa}
                                onChange={(e) => setNovaDespesa({ ...novaDespesa, data_despesa: e.target.value })}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Categoria</label>
                        <select
                            value={novaDespesa.categoria}
                            onChange={(e) => setNovaDespesa({ ...novaDespesa, categoria: e.target.value as any })}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="combustivel">Combustível</option>
                            <option value="alimentacao">Alimentação</option>
                            <option value="transporte">Transporte</option>
                            <option value="hospedagem">Hospedagem</option>
                            <option value="outros">Outros</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Observações</label>
                        <textarea
                            value={novaDespesa.observacoes}
                            onChange={(e) => setNovaDespesa({ ...novaDespesa, observacoes: e.target.value })}
                            rows={3}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Comprovativo</label>
                        <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => setNovaDespesa({ ...novaDespesa, comprovativo: e.target.files?.[0] || null })}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>

                    <div className="flex space-x-4 pt-4">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setShowCreateModal(false)}
                            className="flex-1"
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" loading={loading} className="flex-1">
                            Criar
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Modal Details */}
            {showDetailsModal && selectedDespesa && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
                    <div className={`flex items-center justify-center min-h-screen ${isMobile ? 'p-4' : 'p-2 lg:p-4 lg:pl-72'}`}>
                        <div className={`bg-white rounded-lg shadow-xl ${isMobile ? 'w-full max-w-sm' : 'w-full max-w-md lg:max-w-lg'} max-h-[90vh] overflow-hidden`}>
                            {/* Header */}
                            <div className="flex items-center justify-between p-3 border-b bg-gray-50">
                                <h2 className="text-base font-semibold text-gray-900">Detalhes da Despesa</h2>
                                <button
                                    onClick={() => setShowDetailsModal(false)}
                                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                                >
                                    <X className="w-4 h-4 text-gray-500" />
                                </button>
                            </div>

                            {/* Content com altura fixa */}
                            <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>
                                <div className="p-3 space-y-3">
                                    {/* Info Principal */}
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1 mr-3">
                                            <label className="text-xs font-medium text-gray-600">DESCRIÇÃO</label>
                                            <p className="text-base font-semibold text-gray-900">{safeString(selectedDespesa.descricao)}</p>
                                        </div>
                                        <div className="text-right">
                                            <label className="text-xs font-medium text-gray-600">VALOR</label>
                                            <p className="text-lg font-bold text-primary-600">{formatCurrency(selectedDespesa.valor)}</p>
                                        </div>
                                    </div>

                                    {/* Data e Categoria */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-xs font-medium text-gray-600">DATA</label>
                                            <p className="text-sm text-gray-900">{formatDate(selectedDespesa.data_despesa)}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-gray-600">CATEGORIA</label>
                                            <p className="text-sm text-gray-900 capitalize">{safeString(selectedDespesa.categoria)}</p>
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div className="p-2 bg-gray-50 rounded">
                                        <label className="text-xs font-medium text-gray-600">STATUS</label>
                                        <div className="flex items-center space-x-2 mt-1">
                                            {getStatusIcon(selectedDespesa.status)}
                                            <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(selectedDespesa.status)}`}>
                                                {safeString(selectedDespesa.status).toUpperCase()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Observações */}
                                    {selectedDespesa.observacoes && (
                                        <div>
                                            <label className="text-xs font-medium text-gray-600">OBSERVAÇÕES</label>
                                            <p className="text-sm text-gray-900 mt-1 p-2 bg-gray-50 rounded">{safeString(selectedDespesa.observacoes)}</p>
                                        </div>
                                    )}

                                    {/* Funcionário */}
                                    {isAdmin && selectedDespesa.users_permissions_user && (
                                        <div>
                                            <label className="text-xs font-medium text-gray-600">FUNCIONÁRIO</label>
                                            <p className="text-sm text-gray-900 font-medium">{safeString(selectedDespesa.users_permissions_user.nomecompleto)}</p>
                                        </div>
                                    )}

                                    {/* Comprovativo */}
                                    {selectedDespesa.comprovativo && (
                                        <div className="pt-2 border-t">
                                            <label className="text-xs font-medium text-gray-600 mb-2 block">COMPROVATIVO</label>
                                            <div className="flex items-center space-x-2">
                                                {selectedDespesa.comprovativo.mime?.startsWith('image/') ? (
                                                    <img
                                                        src={api.getMediaUrl(selectedDespesa.comprovativo)}
                                                        alt="Comprovativo"
                                                        className="h-12 w-auto rounded border"
                                                    />
                                                ) : (
                                                    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                                                        <FileText className="w-5 h-5 text-primary-500" />
                                                        <span className="text-xs">{safeString(selectedDespesa.comprovativo.name)}</span>
                                                    </div>
                                                )}
                                                <Button
                                                    onClick={() => selectedDespesa.comprovativo && window.open(api.getMediaUrl(selectedDespesa.comprovativo), '_blank')}
                                                    variant="secondary"
                                                    size="sm"
                                                >
                                                    <Download className="w-3 h-3 mr-1" />
                                                    Ver
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Ações Admin */}
                                    {isAdmin && selectedDespesa.status === 'pendente' && (
                                        <div className="pt-2 border-t">
                                            <label className="text-xs font-medium text-gray-600 mb-2 block">AÇÕES</label>
                                            <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'space-x-2'}`}>
                                                <Button
                                                    onClick={() => handleStatusChange(selectedDespesa.id, 'aprovada')}
                                                    loading={loading}
                                                    className={`${isMobile ? 'w-full' : 'flex-1'} bg-green-600 hover:bg-green-700 text-xs py-1`}
                                                >
                                                    <CheckCircle className="w-3 h-3 mr-1" />
                                                    Aprovar
                                                </Button>
                                                <Button
                                                    onClick={() => handleStatusChange(selectedDespesa.id, 'rejeitada')}
                                                    loading={loading}
                                                    variant="danger"
                                                    className={`${isMobile ? 'w-full' : 'flex-1'} text-xs py-1`}
                                                >
                                                    <XCircle className="w-3 h-3 mr-1" />
                                                    Rejeitar
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex justify-end p-3 border-t bg-gray-50">
                                <Button variant="secondary" onClick={() => setShowDetailsModal(false)} size="sm">
                                    Fechar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}