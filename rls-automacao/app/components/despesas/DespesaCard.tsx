import React from 'react';
import { Receipt, Users, ArrowUpRight, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Despesa } from '@/lib/api';

interface DespesaCardProps {
    despesa: Despesa;
    isMobile: boolean;
    isAdmin: boolean;
    formatDate: (date: any) => string;
    formatCurrency: (value: any) => string;
    onCardClick: (despesa: Despesa) => void;
}

export default function DespesaCard({ 
    despesa, 
    isMobile, 
    isAdmin, 
    formatDate, 
    formatCurrency, 
    onCardClick 
}: DespesaCardProps) {
    const safeString = (value: any): string => {
        if (value === null || value === undefined) return '';
        return String(value);
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

    if (isMobile) {
        return (
            <div
                className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow p-4 cursor-pointer"
                onClick={() => onCardClick(despesa)}
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
        );
    }

    return (
        <div
            className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow p-4 cursor-pointer"
            onClick={() => onCardClick(despesa)}
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
    );
}