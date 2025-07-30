// app/components/compartilhamento/UploadModal.tsx
'use client';

import { useState } from 'react';
import { UploadData } from '@/lib/compartilhamentoApi';
import { PastaCompartilhamento } from '@/lib/pastaApi';
import { X, Upload } from 'lucide-react';

interface UploadModalProps {
    isOpen: boolean;
    selectedFile: File | null;
    pastaAtual: PastaCompartilhamento | null;
    uploading: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    uploadForm: UploadData;
    setUploadForm: (form: UploadData) => void;
    formatFileSize: (bytes: number) => string;
    categorias: Array<{value: string, label: string}>;
}

export const UploadModal = ({
    isOpen,
    selectedFile,
    pastaAtual,
    uploading,
    onClose,
    onSubmit,
    uploadForm,
    setUploadForm,
    formatFileSize,
    categorias
}: UploadModalProps) => {
    if (!isOpen || !selectedFile) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-bold">Enviar Arquivo</h3>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                    <form onSubmit={onSubmit} className="p-4 space-y-4">
                        {/* Info do Arquivo */}
                        <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-100 rounded">
                                    <Upload className="w-4 h-4 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">{selectedFile.name}</p>
                                    <p className="text-xs text-gray-600">{formatFileSize(selectedFile.size)}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Nome *</label>
                            <input
                                type="text"
                                value={uploadForm.nome}
                                onChange={(e) => setUploadForm({...uploadForm, nome: e.target.value})}
                                className="w-full p-2 border rounded-lg text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Descrição</label>
                            <textarea
                                value={uploadForm.descricao}
                                onChange={(e) => setUploadForm({...uploadForm, descricao: e.target.value})}
                                className="w-full p-2 border rounded-lg h-16 text-sm resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Categoria</label>
                            <select
                                value={uploadForm.categoria}
                                onChange={(e) => setUploadForm({...uploadForm, categoria: e.target.value})}
                                className="w-full p-2 border rounded-lg text-sm"
                            >
                                {categorias.map(cat => (
                                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Tags</label>
                            <input
                                type="text"
                                placeholder="tag1, tag2, tag3"
                                value={uploadForm.tags || ''}
                                onChange={(e) => setUploadForm({...uploadForm, tags: e.target.value})}
                                className="w-full p-2 border rounded-lg text-sm"
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="publico"
                                checked={uploadForm.publico}
                                onChange={(e) => setUploadForm({...uploadForm, publico: e.target.checked})}
                                className="mr-2"
                            />
                            <label htmlFor="publico" className="text-sm">Arquivo público</label>
                        </div>

                        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                            <p><strong>Pasta:</strong> {pastaAtual?.nome || 'Raiz'}</p>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="border-t p-4">
                    <div className="flex space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50 text-sm"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={onSubmit}
                            disabled={uploading}
                            className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 text-sm"
                        >
                            {uploading ? 'Enviando...' : 'Enviar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};