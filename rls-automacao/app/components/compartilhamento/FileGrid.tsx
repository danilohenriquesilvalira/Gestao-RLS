// app/components/compartilhamento/FileGrid.tsx
'use client';

import { ArquivoCompartilhado } from '@/lib/compartilhamentoApi';
import { PastaCompartilhamento } from '@/lib/pastaApi';
import { FileCard } from './FileCard';
import { FolderCard } from './FolderCard';
import { Folder } from 'lucide-react';

interface FileGridProps {
    items: Array<ArquivoCompartilhado | PastaCompartilhamento>;
    isRaiz: boolean;
    isMobile: boolean;
    cardsPerPage: number;
    user: any;
    isAdmin: boolean;
    dropTarget: number | null;
    categorias: any[];
    formatFileSize: (bytes: number) => string;
    
    // Handlers
    onDragStart: (arquivo: ArquivoCompartilhado) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDragEnter: (pastaId: number) => void;
    onDragLeave: () => void;
    onDropPasta: (pasta: PastaCompartilhamento) => void;
    onSelectPasta: (pasta: PastaCompartilhamento) => void;
    onToggleFavorito: (arquivo: ArquivoCompartilhado) => void;
    onDownload: (arquivo: ArquivoCompartilhado) => void;
    onToggleVisibility: (arquivo: ArquivoCompartilhado) => void;
    onDelete: (id: number) => void;
}

export const FileGrid = ({
    items,
    isRaiz,
    isMobile,
    cardsPerPage,
    user,
    isAdmin,
    dropTarget,
    categorias,
    formatFileSize,
    onDragStart,
    onDragOver,
    onDragEnter,
    onDragLeave,
    onDropPasta,
    onSelectPasta,
    onToggleFavorito,
    onDownload,
    onToggleVisibility,
    onDelete
}: FileGridProps) => {
    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <Folder className="w-16 h-16 mb-4" />
                <h3 className="text-lg font-medium mb-2">
                    {isRaiz ? 'Nenhum item encontrado' : 'Pasta vazia'}
                </h3>
                <p className="text-sm">
                    {isRaiz ? 'Crie pastas ou envie arquivos' : 'Faça upload de arquivos para esta pasta'}
                </p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto pb-4">
                {isMobile ? (
                    // Layout Mobile - Lista Vertical
                    <div className="space-y-3">
                        {items.map(item => {
                            if ('usuario' in item) {
                                // É um arquivo
                                const arquivo = item as ArquivoCompartilhado;
                                const categoria = categorias.find(c => c.value === arquivo.categoria);
                                const isOwner = arquivo.usuario.id === user?.id;

                                return (
                                    <FileCard
                                        key={`arquivo-${arquivo.id}`}
                                        arquivo={arquivo}
                                        categoria={categoria}
                                        isOwner={isOwner}
                                        isAdmin={isAdmin}
                                        isRaiz={isRaiz}
                                        isMobile={isMobile}
                                        formatFileSize={formatFileSize}
                                        onDragStart={onDragStart}
                                        onToggleFavorito={onToggleFavorito}
                                        onDownload={onDownload}
                                        onToggleVisibility={onToggleVisibility}
                                        onDelete={onDelete}
                                    />
                                );
                            } else {
                                // É uma pasta
                                const pasta = item as PastaCompartilhamento;
                                return (
                                    <FolderCard
                                        key={`pasta-${pasta.id}`}
                                        pasta={pasta}
                                        isMobile={isMobile}
                                        dropTarget={dropTarget}
                                        onSelect={onSelectPasta}
                                        onDragOver={onDragOver}
                                        onDragEnter={onDragEnter}
                                        onDragLeave={onDragLeave}
                                        onDrop={onDropPasta}
                                    />
                                );
                            }
                        })}
                    </div>
                ) : (
                    // Layout Desktop - Grid Responsivo
                    <div className={`grid gap-3 ${
                        cardsPerPage === 6 ? 'grid-cols-3 grid-rows-2' :
                        cardsPerPage === 12 ? 'grid-cols-4 grid-rows-3' :
                        'grid-cols-5 grid-rows-3'
                    }`}>
                        {items.map(item => {
                            if ('usuario' in item) {
                                // É um arquivo
                                const arquivo = item as ArquivoCompartilhado;
                                const categoria = categorias.find(c => c.value === arquivo.categoria);
                                const isOwner = arquivo.usuario.id === user?.id;

                                return (
                                    <FileCard
                                        key={`arquivo-${arquivo.id}`}
                                        arquivo={arquivo}
                                        categoria={categoria}
                                        isOwner={isOwner}
                                        isAdmin={isAdmin}
                                        isRaiz={isRaiz}
                                        isMobile={isMobile}
                                        formatFileSize={formatFileSize}
                                        onDragStart={onDragStart}
                                        onToggleFavorito={onToggleFavorito}
                                        onDownload={onDownload}
                                        onToggleVisibility={onToggleVisibility}
                                        onDelete={onDelete}
                                    />
                                );
                            } else {
                                // É uma pasta
                                const pasta = item as PastaCompartilhamento;
                                return (
                                    <FolderCard
                                        key={`pasta-${pasta.id}`}
                                        pasta={pasta}
                                        isMobile={isMobile}
                                        dropTarget={dropTarget}
                                        onSelect={onSelectPasta}
                                        onDragOver={onDragOver}
                                        onDragEnter={onDragEnter}
                                        onDragLeave={onDragLeave}
                                        onDrop={onDropPasta}
                                    />
                                );
                            }
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};