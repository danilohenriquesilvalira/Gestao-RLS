import React from 'react';
import { Plus, Receipt } from 'lucide-react';
import Button from '@/components/ui/Button';
import DespesasFilters from './DespesasFilters';
import DespesasPagination from './DespesasPagination';

type StatusDespesa = 'todas' | 'pendente' | 'aprovada' | 'rejeitada';

interface DespesasHeaderProps {
    isMobile: boolean;
    isAdmin: boolean;
    stats: {
        total: number;
        valorTotal: number;
    };
    statusFilter: StatusDespesa;
    selectedFuncionario: string;
    selectedMes: number;
    selectedAno: number;
    funcionarios: string[];
    anosDisponiveis: number[];
    currentPage: number;
    totalPages: number;
    cardsPerPage: number;
    filteredCount: number;
    formatCurrency: (value: any) => string;
    onCreateClick: () => void;
    onStatusChange: (status: StatusDespesa) => void;
    onFuncionarioChange: (funcionario: string) => void;
    onMesChange: (mes: number) => void;
    onAnoChange: (ano: number) => void;
    onPageChange: (page: number) => void;
}

export default function DespesasHeader({ 
    isMobile,
    isAdmin, 
    stats,
    statusFilter,
    selectedFuncionario,
    selectedMes,
    selectedAno,
    funcionarios,
    anosDisponiveis,
    currentPage,
    totalPages,
    cardsPerPage,
    filteredCount,
    formatCurrency, 
    onCreateClick,
    onStatusChange,
    onFuncionarioChange,
    onMesChange,
    onAnoChange,
    onPageChange
}: DespesasHeaderProps) {
    return (
        <div className={`flex-shrink-0 ${isMobile ? 'p-4' : 'p-3 sm:p-4'} border-b border-gray-200`}>
            <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'items-center justify-between'}`}>
                <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="p-2 bg-primary-100 rounded-lg">
                        <Receipt className={`${isMobile ? 'w-6 h-6' : 'w-5 h-5 sm:w-6 h-6'} text-primary-600`} />
                    </div>
                    <h1 className={`${isMobile ? 'text-xl' : 'text-lg sm:text-xl'} font-bold text-gray-900`}>Despesas</h1>
                    
                    <button
                        onClick={onCreateClick}
                        className="flex items-center justify-center w-8 h-8 bg-primary-500 hover:bg-primary-600 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                        title="Nova Despesa"
                    >
                        <Plus className="w-4 h-4 text-white" />
                    </button>
                </div>
                
                <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'items-center space-x-3'}`}>
                    {!isMobile && (
                        <DespesasFilters
                            isMobile={isMobile}
                            isAdmin={isAdmin}
                            statusFilter={statusFilter}
                            selectedFuncionario={selectedFuncionario}
                            selectedMes={selectedMes}
                            selectedAno={selectedAno}
                            funcionarios={funcionarios}
                            anosDisponiveis={anosDisponiveis}
                            onStatusChange={onStatusChange}
                            onFuncionarioChange={onFuncionarioChange}
                            onMesChange={onMesChange}
                            onAnoChange={onAnoChange}
                        />
                    )}

                    {!isMobile && totalPages > 1 && (
                        <DespesasPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            cardsPerPage={cardsPerPage}
                            filteredCount={filteredCount}
                            isMobile={isMobile}
                            onPageChange={onPageChange}
                        />
                    )}
                    
                    {isMobile && (
                        <>
                            <DespesasFilters
                                isMobile={isMobile}
                                isAdmin={isAdmin}
                                statusFilter={statusFilter}
                                selectedFuncionario={selectedFuncionario}
                                selectedMes={selectedMes}
                                selectedAno={selectedAno}
                                funcionarios={funcionarios}
                                anosDisponiveis={anosDisponiveis}
                                onStatusChange={onStatusChange}
                                onFuncionarioChange={onFuncionarioChange}
                                onMesChange={onMesChange}
                                onAnoChange={onAnoChange}
                            />

                            {totalPages > 1 && (
                                <DespesasPagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    cardsPerPage={cardsPerPage}
                                    filteredCount={filteredCount}
                                    isMobile={isMobile}
                                    onPageChange={onPageChange}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}