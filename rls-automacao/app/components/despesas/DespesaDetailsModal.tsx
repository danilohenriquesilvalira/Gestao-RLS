import React from 'react';
import { X, CheckCircle, XCircle, Clock, Download, FileText } from 'lucide-react';
import { Despesa, api } from '@/lib/api';
import Button from '@/components/ui/Button';

interface DespesaDetailsModalProps {
    isOpen: boolean;
    despesa: Despesa | null;
    isMobile: boolean;
    isAdmin: boolean;
    loading: boolean;
    formatDate: (date: any) => string;
    formatCurrency: (value: any) => string;
    onStatusChange: (despesaId: number, status: 'aprovada' | 'rejeitada', observacoes?: string) => void;
    onClose: () => void;
}

export default function DespesaDetailsModal({
    isOpen,
    despesa,
    isMobile,
    isAdmin,
    loading,
    formatDate,
    formatCurrency,
    onStatusChange,
    onClose
}: DespesaDetailsModalProps) {
    if (!isOpen || !despesa) return null;

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

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
            <div className={`flex items-center justify-center min-h-screen ${isMobile ? 'p-4' : 'p-2 lg:p-4 lg:pl-72'}`}>
                <div className={`bg-white rounded-lg shadow-xl ${isMobile ? 'w-full max-w-sm' : 'w-full max-w-md lg:max-w-lg'} max-h-[90vh] overflow-hidden`}>
                    {/* Header */}
                    <div className="flex items-center justify-between p-3 border-b bg-gray-50">
                        <h2 className="text-base font-semibold text-gray-900">Detalhes da Despesa</h2>
                        <button
                            onClick={onClose}
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
                                    <p className="text-base font-semibold text-gray-900">{safeString(despesa.descricao)}</p>
                                </div>
                                <div className="text-right">
                                    <label className="text-xs font-medium text-gray-600">VALOR</label>
                                    <p className="text-lg font-bold text-primary-600">{formatCurrency(despesa.valor)}</p>
                                </div>
                            </div>

                            {/* Data e Categoria */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-medium text-gray-600">DATA</label>
                                    <p className="text-sm text-gray-900">{formatDate(despesa.data_despesa)}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-600">CATEGORIA</label>
                                    <p className="text-sm text-gray-900 capitalize">{safeString(despesa.categoria)}</p>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="p-2 bg-gray-50 rounded">
                                <label className="text-xs font-medium text-gray-600">STATUS</label>
                                <div className="flex items-center space-x-2 mt-1">
                                    {getStatusIcon(despesa.status)}
                                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(despesa.status)}`}>
                                        {safeString(despesa.status).toUpperCase()}
                                    </span>
                                </div>
                            </div>

                            {/* Observações */}
                            {despesa.observacoes && (
                                <div>
                                    <label className="text-xs font-medium text-gray-600">OBSERVAÇÕES</label>
                                    <p className="text-sm text-gray-900 mt-1 p-2 bg-gray-50 rounded">{safeString(despesa.observacoes)}</p>
                                </div>
                            )}

                            {/* Funcionário */}
                            {isAdmin && despesa.users_permissions_user && (
                                <div>
                                    <label className="text-xs font-medium text-gray-600">FUNCIONÁRIO</label>
                                    <p className="text-sm text-gray-900 font-medium">{safeString(despesa.users_permissions_user.nomecompleto)}</p>
                                </div>
                            )}

                            {/* Comprovativo */}
                            {despesa.comprovativo && (
                                <div className="pt-2 border-t">
                                    <label className="text-xs font-medium text-gray-600 mb-2 block">COMPROVATIVO</label>
                                    <div className="flex items-center space-x-2">
                                        {despesa.comprovativo.mime?.startsWith('image/') ? (
                                            <img
                                                src={api.getMediaUrl(despesa.comprovativo)}
                                                alt="Comprovativo"
                                                className="h-12 w-auto rounded border"
                                            />
                                        ) : (
                                            <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                                                <FileText className="w-5 h-5 text-primary-500" />
                                                <span className="text-xs">{safeString(despesa.comprovativo.name)}</span>
                                            </div>
                                        )}
                                        <Button
                                            onClick={() => despesa.comprovativo && window.open(api.getMediaUrl(despesa.comprovativo), '_blank')}
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
                            {isAdmin && despesa.status === 'pendente' && (
                                <div className="pt-2 border-t">
                                    <label className="text-xs font-medium text-gray-600 mb-2 block">AÇÕES</label>
                                    <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'space-x-2'}`}>
                                        <Button
                                            onClick={() => onStatusChange(despesa.id, 'aprovada')}
                                            loading={loading}
                                            className={`${isMobile ? 'w-full' : 'flex-1'} bg-green-600 hover:bg-green-700 text-xs py-1`}
                                        >
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                            Aprovar
                                        </Button>
                                        <Button
                                            onClick={() => onStatusChange(despesa.id, 'rejeitada')}
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
                        <Button variant="secondary" onClick={onClose} size="sm">
                            Fechar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}