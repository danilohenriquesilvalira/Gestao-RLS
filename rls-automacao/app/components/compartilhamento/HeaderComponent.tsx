// app/components/compartilhamento/HeaderComponent.tsx
'use client';

import { Share2, Folder, Home, ChevronRight, Plus, Upload } from 'lucide-react';
import { PastaCompartilhamento } from '@/lib/pastaApi';

interface HeaderComponentProps {
    isMobile: boolean;
    showSidebar: boolean;
    setShowSidebar: (show: boolean) => void;
    pastaAtual: PastaCompartilhamento | null;
    isRaiz: boolean;
    stats: {
        total: number;
        totalSize: number;
    };
    formatFileSize: (bytes: number) => string;
    onUploadClick: () => void;
}

export const HeaderComponent = ({
    isMobile,
    showSidebar,
    setShowSidebar,
    pastaAtual,
    isRaiz,
    stats,
    formatFileSize,
    onUploadClick
}: HeaderComponentProps) => {
    return (
        <div className={`flex-shrink-0 ${isMobile ? 'p-3' : 'p-4'} border-b border-gray-200`}>
            {isMobile ? (
                // Layout Mobile Otimizado
                <div className="space-y-3">
                    {/* Linha 1: Botão sidebar + Título */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 flex-1 min-w-0">
                            {!showSidebar && (
                                <button
                                    onClick={() => setShowSidebar(true)}
                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    <Folder className="w-5 h-5" />
                                </button>
                            )}
                            
                            <div className="p-2 bg-primary-100 rounded-lg">
                                <Share2 className="w-5 h-5 text-primary-600" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <h1 className="text-lg font-bold text-gray-900 truncate">
                                    {pastaAtual ? pastaAtual.nome : 'Compartilhamento'}
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* Linha 2: Breadcrumb */}
                    {pastaAtual && (
                        <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                            <Home className="w-4 h-4 mr-1" />
                            <ChevronRight className="w-4 h-4 mx-1" />
                            <span className="truncate font-medium">{pastaAtual.nome}</span>
                        </div>
                    )}

                    {/* Linha 3: Stats + Botão */}
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            {isRaiz ? `${stats.total} itens` : `${stats.total} arquivos • ${formatFileSize(stats.totalSize)}`}
                        </p>
                        
                        <button
                            onClick={onUploadClick}
                            className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center"
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            Enviar
                        </button>
                    </div>
                </div>
            ) : (
                // Layout Desktop
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        {!showSidebar && (
                            <button
                                onClick={() => setShowSidebar(true)}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg lg:hidden"
                            >
                                <Folder className="w-5 h-5" />
                            </button>
                        )}
                        
                        <div className="p-2 bg-primary-100 rounded-lg">
                            <Share2 className="w-6 h-6 text-primary-600" />
                        </div>
                        
                        <div>
                            <div className="flex items-center space-x-2">
                                <h1 className="text-xl font-bold text-gray-900">
                                    {pastaAtual ? pastaAtual.nome : 'Compartilhamento'}
                                </h1>
                                {pastaAtual && (
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Home className="w-4 h-4 mr-1" />
                                        <ChevronRight className="w-4 h-4 mx-1" />
                                        <span>{pastaAtual.nome}</span>
                                    </div>
                                )}
                            </div>
                            <p className="text-sm text-gray-600">
                                {isRaiz ? `${stats.total} itens` : `${stats.total} arquivos • ${formatFileSize(stats.totalSize)}`}
                            </p>
                        </div>
                    </div>
                    
                    <button
                        onClick={onUploadClick}
                        className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Enviar
                    </button>
                </div>
            )}
        </div>
    );
};