// app/components/ui/ModernPagination.tsx
'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ModernPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalItems: number;
    itemsPerPage: number;
    isMobile?: boolean;
}

export const ModernPagination = ({ 
    currentPage, 
    totalPages, 
    onPageChange, 
    totalItems, 
    itemsPerPage,
    isMobile = false 
}: ModernPaginationProps) => {
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

    if (totalPages <= 1) return null;

    return (
        <div className={`
            ${isMobile ? 'fixed bottom-0 left-0 right-0' : 'fixed bottom-0 left-0 lg:left-64 right-0'} 
            bg-white/95 backdrop-blur-sm border-t border-gray-200/50 shadow-lg z-30
        `}>
            <div className={`${isMobile ? 'p-3' : 'p-4'} max-w-7xl mx-auto`}>
                {isMobile ? (
                    // Mobile Layout
                    <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-600">
                            {startIndex}-{endIndex} de {totalItems}
                        </div>
                        
                        <div className="flex items-center space-x-1">
                            <button
                                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                                disabled={currentPage === 1}
                                className="
                                    flex items-center justify-center w-10 h-10 rounded-xl
                                    bg-gradient-to-r from-gray-50 to-gray-100 
                                    border border-gray-200 text-gray-600
                                    hover:from-primary-50 hover:to-primary-100 hover:text-primary-600
                                    disabled:opacity-40 disabled:cursor-not-allowed
                                    transition-all duration-200 shadow-sm
                                "
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            <div className="
                                px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 
                                text-white rounded-xl font-semibold text-sm shadow-lg
                                min-w-16 text-center
                            ">
                                {currentPage}/{totalPages}
                            </div>

                            <button
                                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                                disabled={currentPage >= totalPages}
                                className="
                                    flex items-center justify-center w-10 h-10 rounded-xl
                                    bg-gradient-to-r from-gray-50 to-gray-100 
                                    border border-gray-200 text-gray-600
                                    hover:from-primary-50 hover:to-primary-100 hover:text-primary-600
                                    disabled:opacity-40 disabled:cursor-not-allowed
                                    transition-all duration-200 shadow-sm
                                "
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ) : (
                    // Desktop Layout
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600 font-medium">
                            Mostrando {startIndex} a {endIndex} de {totalItems} resultados
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => onPageChange(1)}
                                disabled={currentPage === 1}
                                className="
                                    px-3 py-2 text-sm rounded-lg border border-gray-200
                                    bg-gradient-to-r from-white to-gray-50
                                    hover:from-primary-50 hover:to-primary-100 hover:text-primary-600
                                    disabled:opacity-40 disabled:cursor-not-allowed
                                    transition-all duration-200 shadow-sm font-medium
                                "
                            >
                                Primeira
                            </button>
                            
                            <button
                                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                                disabled={currentPage === 1}
                                className="
                                    flex items-center px-3 py-2 text-sm rounded-lg border border-gray-200
                                    bg-gradient-to-r from-white to-gray-50
                                    hover:from-primary-50 hover:to-primary-100 hover:text-primary-600
                                    disabled:opacity-40 disabled:cursor-not-allowed
                                    transition-all duration-200 shadow-sm
                                "
                            >
                                <ChevronLeft className="w-4 h-4 mr-1" />
                                Anterior
                            </button>

                            <div className="
                                px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 
                                text-white rounded-lg font-bold text-sm shadow-lg
                                border border-primary-300
                            ">
                                Página {currentPage} de {totalPages}
                            </div>

                            <button
                                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                                disabled={currentPage >= totalPages}
                                className="
                                    flex items-center px-3 py-2 text-sm rounded-lg border border-gray-200
                                    bg-gradient-to-r from-white to-gray-50
                                    hover:from-primary-50 hover:to-primary-100 hover:text-primary-600
                                    disabled:opacity-40 disabled:cursor-not-allowed
                                    transition-all duration-200 shadow-sm
                                "
                            >
                                Próxima
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </button>
                            
                            <button
                                onClick={() => onPageChange(totalPages)}
                                disabled={currentPage >= totalPages}
                                className="
                                    px-3 py-2 text-sm rounded-lg border border-gray-200
                                    bg-gradient-to-r from-white to-gray-50
                                    hover:from-primary-50 hover:to-primary-100 hover:text-primary-600
                                    disabled:opacity-40 disabled:cursor-not-allowed
                                    transition-all duration-200 shadow-sm font-medium
                                "
                            >
                                Última
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};