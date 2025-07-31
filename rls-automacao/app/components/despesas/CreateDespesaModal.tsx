import React from 'react';
import { X } from 'lucide-react';
import Button from '@/components/ui/Button';

interface CreateDespesaModalProps {
    isOpen: boolean;
    loading: boolean;
    novaDespesa: {
        descricao: string;
        valor: string;
        data_despesa: string;
        categoria: 'combustivel' | 'alimentacao' | 'transporte' | 'hospedagem' | 'outros';
        observacoes: string;
        comprovativo: File | null;
    };
    onChange: (field: string, value: any) => void;
    onSubmit: (e: React.FormEvent) => void;
    onClose: () => void;
}

export default function CreateDespesaModal({
    isOpen,
    loading,
    novaDespesa,
    onChange,
    onSubmit,
    onClose
}: CreateDespesaModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-hidden shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between p-3 border-b bg-gray-50">
                    <h2 className="text-base font-semibold text-gray-900">Nova Despesa</h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                        disabled={loading}
                    >
                        <X className="w-4 h-4 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>
                    <form onSubmit={onSubmit} className="p-3 space-y-3">
                        {/* Descrição */}
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Descrição *</label>
                            <input
                                type="text"
                                required
                                value={novaDespesa.descricao}
                                onChange={(e) => onChange('descricao', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="Ex: Combustível, Refeição..."
                            />
                        </div>

                        {/* Valor e Data */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Valor (€) *</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    required
                                    value={novaDespesa.valor}
                                    onChange={(e) => onChange('valor', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Data *</label>
                                <input
                                    type="date"
                                    required
                                    value={novaDespesa.data_despesa}
                                    onChange={(e) => onChange('data_despesa', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Categoria */}
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Categoria</label>
                            <select
                                value={novaDespesa.categoria}
                                onChange={(e) => onChange('categoria', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                                <option value="combustivel">Combustível</option>
                                <option value="alimentacao">Alimentação</option>
                                <option value="transporte">Transporte</option>
                                <option value="hospedagem">Hospedagem</option>
                                <option value="outros">Outros</option>
                            </select>
                        </div>

                        {/* Observações */}
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Observações</label>
                            <textarea
                                value={novaDespesa.observacoes}
                                onChange={(e) => onChange('observacoes', e.target.value)}
                                rows={3}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                                placeholder="Informações adicionais..."
                            />
                        </div>

                        {/* Comprovativo */}
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Comprovativo</label>
                            <input
                                type="file"
                                accept="image/*,.pdf"
                                onChange={(e) => onChange('comprovativo', e.target.files?.[0] || null)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                            />
                            {novaDespesa.comprovativo && (
                                <p className="text-xs text-gray-500 mt-1">{novaDespesa.comprovativo.name}</p>
                            )}
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="flex gap-2 p-3 border-t bg-gray-50">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                        className="flex-1 text-sm py-2"
                        disabled={loading}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        onClick={onSubmit}
                        loading={loading}
                        className="flex-1 bg-primary-500 hover:bg-primary-600 text-sm py-2"
                    >
                        Criar
                    </Button>
                </div>
            </div>
        </div>
    );
}