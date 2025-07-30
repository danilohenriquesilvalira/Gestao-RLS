// app/components/compartilhamento/FileCard.tsx
'use client';

import { ArquivoCompartilhado } from '@/lib/compartilhamentoApi';
import { Star, StarOff, Users, Eye, EyeOff, Download, Trash2, FileText } from 'lucide-react';

interface FileCardProps {
    arquivo: ArquivoCompartilhado;
    categoria: any;
    isOwner: boolean;
    isAdmin: boolean;
    isRaiz: boolean;
    isMobile: boolean;
    formatFileSize: (bytes: number) => string;
    onDragStart: (arquivo: ArquivoCompartilhado) => void;
    onToggleFavorito: (arquivo: ArquivoCompartilhado) => void;
    onDownload: (arquivo: ArquivoCompartilhado) => void;
    onToggleVisibility: (arquivo: ArquivoCompartilhado) => void;
    onDelete: (id: number) => void;
}

export const FileCard = ({
    arquivo,
    categoria,
    isOwner,
    isAdmin,
    isRaiz,
    isMobile,
    formatFileSize,
    onDragStart,
    onToggleFavorito,
    onDownload,
    onToggleVisibility,
    onDelete
}: FileCardProps) => {
    const IconeCategoria = categoria?.icon || FileText;

    if (isMobile) {
        return (
            <div
                draggable
                onDragStart={() => onDragStart(arquivo)}
                className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow p-3 cursor-move"
            >
                {/* Header Mobile Otimizado */}
                <div className="space-y-3">
                    {/* Linha 1: Ícone + Nome + Ações (sempre visíveis) */}
                    <div className="flex items-start space-x-3">
                        <div className={`p-2 bg-${categoria?.color}-100 rounded-lg flex-shrink-0`}>
                            <IconeCategoria className={`w-4 h-4 text-${categoria?.color}-600`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 mb-1">
                                {arquivo.nome}
                            </h3>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <span>{formatFileSize(arquivo.tamanho || 0)}</span>
                                {arquivo.versao && <span>v{arquivo.versao}</span>}
                            </div>
                            <p className="text-xs text-gray-400 capitalize mt-1">{arquivo.categoria}</p>
                            {isRaiz && (
                                <p className="text-xs text-blue-600 font-medium mt-1">📁 Sem pasta</p>
                            )}
                        </div>

                        {/* Ações sempre visíveis no mobile */}
                        <div className="flex flex-col space-y-2 flex-shrink-0">
                            <button
                                onClick={() => onToggleFavorito(arquivo)}
                                className="p-1 hover:bg-gray-100 rounded"
                            >
                                {arquivo.favorito ? (
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                ) : (
                                    <StarOff className="w-4 h-4 text-gray-400" />
                                )}
                            </button>
                            
                            <div className="flex items-center justify-center">
                                {arquivo.publico ? (
                                    <Users className="w-4 h-4 text-green-500" />
                                ) : (
                                    <Eye className="w-4 h-4 text-gray-400" />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Linha 2: Botões de ação */}
                    <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
                        <button
                            onClick={() => onDownload(arquivo)}
                            className="flex-1 bg-blue-50 text-blue-700 py-2 px-3 rounded-lg hover:bg-blue-100 font-medium text-sm flex items-center justify-center"
                        >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                        </button>
                        
                        {(isOwner || isAdmin) && (
                            <div className="flex space-x-1">
                                <button
                                    onClick={() => onToggleVisibility(arquivo)}
                                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                >
                                    {arquivo.publico ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={() => onDelete(arquivo.id)}
                                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Layout Desktop
    return (
        <div
            draggable
            onDragStart={() => onDragStart(arquivo)}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-move"
        >
            {/* Header do Card */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <div className={`p-2 rounded-lg bg-${categoria?.color}-100`}>
                        <IconeCategoria className={`w-4 h-4 text-${categoria?.color}-600`} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate text-sm">
                            {arquivo.nome}
                        </h3>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span>{formatFileSize(arquivo.tamanho || 0)}</span>
                            {arquivo.versao && <span>v{arquivo.versao}</span>}
                        </div>
                        {isRaiz && (
                            <span className="text-xs text-blue-600 font-medium">📁 Sem pasta</span>
                        )}
                    </div>
                </div>
                
                <div className="flex items-center space-x-1">
                    <button
                        onClick={() => onToggleFavorito(arquivo)}
                        className="p-1 hover:bg-gray-100 rounded"
                    >
                        {arquivo.favorito ? (
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        ) : (
                            <StarOff className="w-4 h-4 text-gray-400" />
                        )}
                    </button>
                    
                    {arquivo.publico ? (
                        <Users className="w-4 h-4 text-green-500" />
                    ) : (
                        <Eye className="w-4 h-4 text-gray-400" />
                    )}
                </div>
            </div>

            {/* Descrição */}
            {arquivo.descricao && (
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {arquivo.descricao}
                </p>
            )}

            {/* Tags */}
            {arquivo.tags && (
                <div className="flex flex-wrap gap-1 mb-3">
                    {arquivo.tags.split(',').slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {tag.trim()}
                        </span>
                    ))}
                </div>
            )}

            {/* Meta */}
            <div className="text-xs text-gray-500 mb-3 space-y-1">
                <div className="flex justify-between">
                    <span>{new Date(arquivo.createdAt).toLocaleDateString('pt-PT')}</span>
                    <span>{arquivo.downloads} downloads</span>
                </div>
                <div className="truncate">Por: {arquivo.usuario.nomecompleto}</div>
                {arquivo.visualizacoes > 0 && (
                    <div className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        <span>{arquivo.visualizacoes} visualizações</span>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex space-x-1 pt-2 border-t border-gray-100">
                <button
                    onClick={() => onDownload(arquivo)}
                    className="flex-1 bg-blue-50 text-blue-700 py-2 px-3 rounded-lg hover:bg-blue-100 font-medium text-sm flex items-center justify-center"
                >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                </button>
                
                {(isOwner || isAdmin) && (
                    <div className="flex space-x-1">
                        <button
                            onClick={() => onToggleVisibility(arquivo)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                            {arquivo.publico ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        
                        <button
                            onClick={() => onDelete(arquivo.id)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};