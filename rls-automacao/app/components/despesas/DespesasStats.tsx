import React from 'react';

interface DespesasStatsProps {
    isMobile: boolean;
    stats: {
        total: number;
        aprovadas: number;
        pendentes: number;
        valorTotal: number;
    };
    formatCurrency: (value: any) => string;
}

export default function DespesasStats({ isMobile, stats, formatCurrency }: DespesasStatsProps) {
    return (
        <div className={`flex-shrink-0 ${isMobile ? 'p-4' : 'p-3 sm:p-4'} border-b border-gray-100`}>
            <div className="grid grid-cols-4 gap-2">
                <div className="bg-white p-2 rounded border text-center">
                    <div className={`${isMobile ? 'text-lg' : 'text-base'} font-bold text-gray-900`}>
                        {stats.total}
                    </div>
                    <div className="text-xs text-gray-600">Total</div>
                </div>
                
                <div className="bg-white p-2 rounded border text-center">
                    <div className={`${isMobile ? 'text-lg' : 'text-base'} font-bold text-green-600`}>
                        {stats.aprovadas}
                    </div>
                    <div className="text-xs text-gray-600">Aprovadas</div>
                </div>
                
                <div className="bg-white p-2 rounded border text-center">
                    <div className={`${isMobile ? 'text-lg' : 'text-base'} font-bold text-yellow-600`}>
                        {stats.pendentes}
                    </div>
                    <div className="text-xs text-gray-600">Pendentes</div>
                </div>
                
                <div className="bg-white p-2 rounded border text-center">
                    <div className={`${isMobile ? 'text-sm' : 'text-base'} font-bold text-blue-600`}>
                        {isMobile ? formatCurrency(stats.valorTotal).replace('€', '€') : formatCurrency(stats.valorTotal)}
                    </div>
                    <div className="text-xs text-gray-600">Valor</div>
                </div>
            </div>
        </div>
    );
}