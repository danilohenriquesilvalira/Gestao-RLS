'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { api, Despesa } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';

import Loading from '@/components/ui/Loading';
import Alert from '@/components/ui/Alert';

// Componentes das despesas
import DespesasHeader from '@/components/despesas/DespesasHeader';
import DespesasFilters from '@/components/despesas/DespesasFilters';
import DespesasGrid from '@/components/despesas/DespesasGrid';
import DespesasPagination from '@/components/despesas/DespesasPagination';
import CreateDespesaModal from '@/components/despesas/CreateDespesaModal';
import DespesaDetailsModal from '@/components/despesas/DespesaDetailsModal';

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
    
    // Modais
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedDespesa, setSelectedDespesa] = useState<Despesa | null>(null);
    
    // Filtros
    const [statusFilter, setStatusFilter] = useState<StatusDespesa>('todas');
    const [selectedFuncionario, setSelectedFuncionario] = useState<string>('');
    const [selectedMes, setSelectedMes] = useState<number>(0);
    const [selectedAno, setSelectedAno] = useState<number>(0);
    
    // Layout
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const [cardsPerPage, setCardsPerPage] = useState(8);

    // Nova despesa
    const [novaDespesa, setNovaDespesa] = useState({
        descricao: '',
        valor: '',
        data_despesa: '',
        categoria: 'outros' as const,
        observacoes: '',
        comprovativo: null as File | null
    });

    // Detecta layout
    useEffect(() => {
        const updateLayout = () => {
            const width = window.innerWidth;
            const mobile = width <= 768;
            
            setIsMobile(mobile);
            
            if (mobile) {
                setCardsPerPage(6);
            } else if (width <= 1528) {
                setCardsPerPage(8);  // 2 fileiras x 4 colunas
            } else {
                setCardsPerPage(12); // 3 fileiras x 4 colunas
            }
        };

        updateLayout();
        window.addEventListener('resize', updateLayout);
        return () => window.removeEventListener('resize', updateLayout);
    }, []);

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

    const funcionarios = [...new Set(despesas.map(d => d.users_permissions_user?.nomecompleto).filter(Boolean))] as string[];
    const anosDisponiveis = [...new Set(despesas.map(d => new Date(d.data_despesa).getFullYear()))].sort((a, b) => b - a);

    // Paginação
    const totalPages = Math.ceil(filteredDespesas.length / cardsPerPage);
    const startIndex = (currentPage - 1) * cardsPerPage;
    const paginatedDespesas = filteredDespesas.slice(startIndex, startIndex + cardsPerPage);

    const handleFilterChange = (value: StatusDespesa) => {
        setStatusFilter(value);
        setCurrentPage(1);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedFuncionario, selectedMes, selectedAno, cardsPerPage]);

    const stats = {
        total: filteredDespesas.length,
        valorTotal: filteredDespesas.reduce((acc, despesa) => acc + safeNumber(despesa.valor), 0)
    };

    const handleNovaDespesaChange = (field: string, value: any) => {
        setNovaDespesa(prev => ({
            ...prev,
            [field]: value
        }));
    };

    if (loading && despesas.length === 0) {
        return <Loading title="Carregando despesas..." />;
    }

    return (
        <div className="h-full lg:fixed lg:top-20 lg:left-0 lg:lg:left-64 lg:right-0 lg:bottom-0 bg-white overflow-hidden">
            <div className="h-full flex flex-col">
                
                {/* Header com Filtros e Paginação */}
                <DespesasHeader
                    isMobile={isMobile}
                    isAdmin={isAdmin}
                    stats={stats}
                    statusFilter={statusFilter}
                    selectedFuncionario={selectedFuncionario}
                    selectedMes={selectedMes}
                    selectedAno={selectedAno}
                    funcionarios={funcionarios}
                    anosDisponiveis={anosDisponiveis}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    cardsPerPage={cardsPerPage}
                    filteredCount={filteredDespesas.length}
                    formatCurrency={formatCurrency}
                    onCreateClick={() => setShowCreateModal(true)}
                    onStatusChange={handleFilterChange}
                    onFuncionarioChange={setSelectedFuncionario}
                    onMesChange={setSelectedMes}
                    onAnoChange={setSelectedAno}
                    onPageChange={setCurrentPage}
                />

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

                {/* Content - Só o Grid */}
                <div className={`flex-1 min-h-0 ${isMobile ? 'p-4' : 'p-3 sm:p-4'}`}>
                    <DespesasGrid
                        despesas={despesas}
                        filteredDespesas={paginatedDespesas}
                        isMobile={isMobile}
                        isAdmin={isAdmin}
                        cardsPerPage={cardsPerPage}
                        formatDate={formatDate}
                        formatCurrency={formatCurrency}
                        onCardClick={(despesa) => {
                            setSelectedDespesa(despesa);
                            setShowDetailsModal(true);
                        }}
                        onCreateClick={() => setShowCreateModal(true)}
                    />
                </div>
            </div>

            {/* Modal Create */}
            <CreateDespesaModal
                isOpen={showCreateModal}
                loading={loading}
                novaDespesa={novaDespesa}
                onChange={handleNovaDespesaChange}
                onSubmit={handleCreateDespesa}
                onClose={() => setShowCreateModal(false)}
            />

            {/* Modal Details */}
            <DespesaDetailsModal
                isOpen={showDetailsModal}
                despesa={selectedDespesa}
                isMobile={isMobile}
                isAdmin={isAdmin}
                loading={loading}
                formatDate={formatDate}
                formatCurrency={formatCurrency}
                onStatusChange={handleStatusChange}
                onClose={() => setShowDetailsModal(false)}
            />
        </div>
    );
}