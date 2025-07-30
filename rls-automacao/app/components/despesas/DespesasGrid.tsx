import React from 'react';
import { Receipt } from 'lucide-react';
import { Despesa } from '@/lib/api';
import DespesaCard from './DespesaCard';
import Button from '@/components/ui/Button';

interface DespesasGridProps {
    despesas: Despesa[];
    filteredDespesas: Despesa[];
    isMobile: boolean;
    isAdmin: boolean;
    cardsPerPage: number;
    formatDate: (date: any) => string;
    formatCurrency: (value: any) => string;
    onCardClick: (despesa: Despesa) => void;
    onCreateClick: () => void;
}

export default function DespesasGrid({
    despesas,
    filteredDespesas,
    isMobile,
    isAdmin,
    cardsPerPage,
    formatDate,
    formatCurrency,
    onCardClick,
    onCreateClick
}: DespesasGridProps) {
    if (filteredDespesas.length === 0) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-center">
                    <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhuma despesa</h3>
                    <p className="text-gray-600 mb-4">Crie sua primeira despesa</p>
                    <Button onClick={onCreateClick}>
                        Criar Despesa
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto pb-4">
            {isMobile ? (
                /* Layout Mobile - Lista Vertical */
                <div className="space-y-3">
                    {filteredDespesas.map((despesa) => (
                        <DespesaCard
                            key={despesa.id}
                            despesa={despesa}
                            isMobile={isMobile}
                            isAdmin={isAdmin}
                            formatDate={formatDate}
                            formatCurrency={formatCurrency}
                            onCardClick={onCardClick}
                        />
                    ))}
                </div>
            ) : (
                /* Layout Desktop - Grid */
                <div className={`grid gap-3 ${
                    cardsPerPage === 6 ? 'grid-cols-3 grid-rows-2' :
                    cardsPerPage === 12 ? 'grid-cols-4 grid-rows-3' :
                    'grid-cols-5 grid-rows-3'
                }`}>
                    {filteredDespesas.map((despesa) => (
                        <DespesaCard
                            key={despesa.id}
                            despesa={despesa}
                            isMobile={isMobile}
                            isAdmin={isAdmin}
                            formatDate={formatDate}
                            formatCurrency={formatCurrency}
                            onCardClick={onCardClick}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}