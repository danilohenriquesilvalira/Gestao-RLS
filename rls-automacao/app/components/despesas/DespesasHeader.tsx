import React from 'react';
import { Plus, Receipt } from 'lucide-react';
import Button from '@/components/ui/Button';

interface DespesasHeaderProps {
    isMobile: boolean;
    stats: {
        total: number;
        valorTotal: number;
    };
    formatCurrency: (value: any) => string;
    onCreateClick: () => void;
}

export default function DespesasHeader({ 
    isMobile, 
    stats, 
    formatCurrency, 
    onCreateClick 
}: DespesasHeaderProps) {
    return (
        <div className={`flex-shrink-0 ${isMobile ? 'p-4' : 'p-3 sm:p-4'} border-b border-gray-200`}>
            <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'flex-col lg:flex-row lg:items-center justify-between space-y-3 lg:space-y-0'}`}>
                <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="p-2 bg-primary-100 rounded-lg">
                        <Receipt className={`${isMobile ? 'w-6 h-6' : 'w-5 h-5 sm:w-6 h-6'} text-primary-600`} />
                    </div>
                    <div>
                        <h1 className={`${isMobile ? 'text-xl' : 'text-lg sm:text-xl'} font-bold text-gray-900`}>Despesas</h1>
                        <p className={`${isMobile ? 'text-sm' : 'text-xs sm:text-sm'} text-gray-600`}>
                            {stats.total} despesas • {formatCurrency(stats.valorTotal)}
                        </p>
                    </div>
                </div>
                
                <Button
                    onClick={onCreateClick}
                    size={isMobile ? "md" : "sm"}
                    className="bg-primary-500 hover:bg-primary-600"
                >
                    <Plus className="w-4 h-4 mr-1" />
                    Nova Despesa
                </Button>
            </div>
        </div>
    );
}