import React from 'react';
import Modal from '@/components/ui/Modal';
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
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Nova Despesa"
            size="lg"
        >
            <form onSubmit={onSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Descrição *</label>
                    <input
                        type="text"
                        required
                        value={novaDespesa.descricao}
                        onChange={(e) => onChange('descricao', e.target.value)}
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
                            onChange={(e) => onChange('valor', e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Data *</label>
                        <input
                            type="date"
                            required
                            value={novaDespesa.data_despesa}
                            onChange={(e) => onChange('data_despesa', e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Categoria</label>
                    <select
                        value={novaDespesa.categoria}
                        onChange={(e) => onChange('categoria', e.target.value)}
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
                        onChange={(e) => onChange('observacoes', e.target.value)}
                        rows={3}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Comprovativo</label>
                    <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => onChange('comprovativo', e.target.files?.[0] || null)}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>

                <div className="flex space-x-4 pt-4">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
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
    );
}