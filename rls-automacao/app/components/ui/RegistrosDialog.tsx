import React from 'react';
import { 
    Download, 
    Edit, 
    Trash2, 
    CheckCircle, 
    DollarSign,
    Clock,
    X,
    Calendar,
    FileText
} from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

const RegistrosDialog = ({ 
    isOpen, 
    onClose, 
    registros, 
    isAdmin, 
    onAprovar, 
    onMarcarPago, 
    onEditar, 
    onDeletar, 
    onDownloadPDF,
    getMesNome,
    getStatusColor,
    getStatusIcon 
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Histórico de Registros"
            size="lg"
        >
            <div className="max-h-[60vh] overflow-y-auto">
                {/* Header Info */}
                <div className="mb-6 p-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg border border-primary-100">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary-100 rounded-lg">
                            <FileText className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Registros Encontrados</h3>
                            <p className="text-sm text-gray-600">
                                {registros.length} registro{registros.length !== 1 ? 's' : ''} no período selecionado
                            </p>
                        </div>
                    </div>
                </div>

                {/* Lista de Registros */}
                <div className="space-y-3">
                    {registros.length > 0 ? registros.map((ponto) => (
                        <div key={ponto.id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            {/* Header do Card */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                        <Calendar className="w-4 h-4 text-gray-600" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">
                                            {getMesNome(ponto.mes)} {ponto.ano}
                                        </div>
                                        {isAdmin && (
                                            <div className="text-sm text-gray-600">
                                                {ponto.funcionario.nomecompleto}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <div className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center space-x-2 ${getStatusColor(ponto.status)}`}>
                                    {getStatusIcon(ponto.status)}
                                    <span className="capitalize">{ponto.status}</span>
                                </div>
                            </div>

                            {/* Informações */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                                <div className="text-center">
                                    <div className="text-lg font-bold text-gray-900">{ponto.dias_trabalhados}</div>
                                    <div className="text-xs text-gray-600">Dias</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg font-bold text-blue-600">{ponto.horas_normais}h</div>
                                    <div className="text-xs text-gray-600">H. Normais</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg font-bold text-orange-600">{ponto.horas_extras}h</div>
                                    <div className="text-xs text-gray-600">H. Extras</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg font-bold text-green-600">{ponto.total_horas}h</div>
                                    <div className="text-xs text-gray-600">Total</div>
                                </div>
                            </div>

                            {/* Observações */}
                            {ponto.observacoes && (
                                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <div className="text-sm text-yellow-800">
                                        <strong>Observações:</strong> {ponto.observacoes}
                                    </div>
                                </div>
                            )}

                            {/* Ações */}
                            <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200">
                                {/* Aprovar */}
                                {isAdmin && ponto.status === 'pendente' && (
                                    <Button
                                        onClick={() => onAprovar(ponto.id)}
                                        size="sm"
                                        className="bg-green-600 hover:bg-green-700 text-white"
                                    >
                                        <CheckCircle className="w-4 h-4 mr-1" />
                                        Aprovar
                                    </Button>
                                )}

                                {/* Marcar Pago */}
                                {isAdmin && ponto.status === 'aprovado' && (
                                    <Button
                                        onClick={() => onMarcarPago(ponto.id)}
                                        size="sm"
                                        className="bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        <DollarSign className="w-4 h-4 mr-1" />
                                        Marcar Pago
                                    </Button>
                                )}

                                {/* PDF */}
                                <Button
                                    onClick={() => onDownloadPDF(ponto)}
                                    variant="secondary"
                                    size="sm"
                                >
                                    <Download className="w-4 h-4 mr-1" />
                                    PDF
                                </Button>

                                {/* Editar */}
                                {(isAdmin || ponto.status === 'pendente') && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onEditar(ponto)}
                                        className="text-gray-600 hover:text-gray-800"
                                    >
                                        <Edit className="w-4 h-4 mr-1" />
                                        Editar
                                    </Button>
                                )}

                                {/* Deletar */}
                                {(isAdmin || ponto.status === 'pendente') && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onDeletar(ponto.id)}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4 mr-1" />
                                        Deletar
                                    </Button>
                                )}
                            </div>
                        </div>
                    )) : (
                        <div className="text-center text-gray-500 py-12">
                            <div className="text-6xl mb-4">📋</div>
                            <div className="text-xl font-medium mb-2">Nenhum registro encontrado</div>
                            <div className="text-sm text-gray-400">Ajuste os filtros ou crie um novo registro</div>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default RegistrosDialog;