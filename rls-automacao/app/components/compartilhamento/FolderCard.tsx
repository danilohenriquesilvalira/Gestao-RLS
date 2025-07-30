// app/components/compartilhamento/FolderCard.tsx
'use client';

import { PastaCompartilhamento } from '@/lib/pastaApi';
import { Folder, Users, Eye, ArrowUpRight } from 'lucide-react';

interface FolderCardProps {
    pasta: PastaCompartilhamento;
    isMobile: boolean;
    dropTarget: number | null;
    onSelect: (pasta: PastaCompartilhamento) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDragEnter: (pastaId: number) => void;
    onDragLeave: () => void;
    onDrop: (pasta: PastaCompartilhamento) => void;
}

export const FolderCard = ({
    pasta,
    isMobile,
    dropTarget,
    onSelect,
    onDragOver,
    onDragEnter,
    onDragLeave,
    onDrop
}: FolderCardProps) => {
    if (isMobile) {
        return (
            <div
                onClick={() => onSelect(pasta)}
                onDragOver={onDragOver}
                onDragEnter={() => onDragEnter(pasta.id)}
                onDragLeave={onDragLeave}
                onDrop={(e) => {
                    e.preventDefault();
                    onDrop(pasta);
                }}
                className={`bg-white rounded-lg border-2 transition-all p-3 cursor-pointer ${
                    dropTarget === pasta.id 
                        ? 'border-primary-500 bg-primary-50 shadow-lg' 
                        : 'border-gray-200 hover:shadow-md'
                }`}
            >
                <div className="flex items-center space-x-3">
                    <div 
                        className="p-3 rounded-xl flex-shrink-0"
                        style={{ backgroundColor: pasta.cor }}
                    >
                        <Folder className="w-5 h-5 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-sm truncate">
                            {pasta.nome}
                        </h3>
                        {pasta.descricao && (
                            <p className="text-xs text-gray-500 line-clamp-1 mt-1">
                                {pasta.descricao}
                            </p>
                        )}
                        <div className="flex items-center space-x-2 mt-2">
                            {pasta.publico ? (
                                <span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs flex items-center">
                                    <Users className="w-3 h-3 mr-1" />
                                    Público
                                </span>
                            ) : (
                                <span className="text-gray-600 bg-gray-50 px-2 py-1 rounded text-xs flex items-center">
                                    <Eye className="w-3 h-3 mr-1" />
                                    Privado
                                </span>
                            )}
                        </div>
                    </div>

                    <ArrowUpRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </div>
            </div>
        );
    }

    // Layout Desktop
    return (
        <div
            onClick={() => onSelect(pasta)}
            onDragOver={onDragOver}
            onDragEnter={() => onDragEnter(pasta.id)}
            onDragLeave={onDragLeave}
            onDrop={(e) => {
                e.preventDefault();
                onDrop(pasta);
            }}
            className={`group bg-white border-2 rounded-xl p-4 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                dropTarget === pasta.id 
                    ? 'border-primary-500 bg-primary-50 shadow-xl scale-105' 
                    : 'border-gray-200 hover:shadow-lg'
            }`}
        >
            <div className="flex items-center space-x-3 mb-3">
                <div 
                    className="p-3 rounded-xl shadow-md group-hover:shadow-lg transition-shadow"
                    style={{ backgroundColor: pasta.cor }}
                >
                    <Folder className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors text-sm">
                        {pasta.nome}
                    </h3>
                    {pasta.descricao && (
                        <p className="text-xs text-gray-500 line-clamp-1 mt-1">
                            {pasta.descricao}
                        </p>
                    )}
                </div>
            </div>
            
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    {pasta.publico ? (
                        <div className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                            <Users className="w-3 h-3 mr-1" />
                            <span className="text-xs font-medium">Público</span>
                        </div>
                    ) : (
                        <div className="flex items-center text-gray-600 bg-gray-50 px-2 py-1 rounded-lg">
                            <Eye className="w-3 h-3 mr-1" />
                            <span className="text-xs font-medium">Privado</span>
                        </div>
                    )}
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600 transition-colors" />
            </div>
        </div>
    );
};