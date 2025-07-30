import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DespesasPaginationProps {
    currentPage: number;
    totalPages: number;
    cardsPerPage: number;
    filteredCount: number;
    isMobile: boolean;
    onPageChange: (page: number) => void;
}

export default function DespesasPagination({
    currentPage,
    totalPages,
    cardsPerPage,
    filteredCount,
    isMobile,
    onPageChange
}: DespesasPaginationProps) {
    const startIndex = (currentPage - 1) * cardsPerPage;

    return (
        <div className={`fixed bottom-0 ${isMobile ? 'left-0 right-0' : 'left-0 lg:left-64 xl:left-80 right-0 xl:right-80'} bg-white border-t border-gray-200 shadow-lg z-30`}>
            <div className={`${isMobile ? 'p-3' : 'p-3 sm:p-4'}`}>
                {isMobile ? (
                    /* Paginação Mobile - Compacta */
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">
                            {startIndex + 1}-{Math.min(startIndex + cardsPerPage, filteredCount)} de {filteredCount}
                        </span>
                        
                        <div className="flex items-center space-x-1">
                            <button
                                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                                disabled={currentPage === 1}
                                className="flex items-center px-3 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            <span className="px-3 py-2 bg-primary-500 text-white rounded-lg text-sm font-bold min-w-16 text-center">
                                {currentPage}/{totalPages}
                            </span>

                            <button
                                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                                disabled={currentPage >= totalPages}
                                className="flex items-center px-3 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Paginação Desktop */
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-gray-600">
                            {startIndex + 1}-{Math.min(startIndex + cardsPerPage, filteredCount)} de {filteredCount}
                        </span>
                        
                        <div className="flex items-center space-x-1 sm:space-x-2">
                            <button
                                onClick={() => onPageChange(1)}
                                disabled={currentPage === 1}
                                className="px-2 py-1 text-xs border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                1ª
                            </button>
                            
                            <button
                                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                                disabled={currentPage === 1}
                                className="flex items-center px-2 py-1 text-xs border rounded hover:bg-gray-50 disabled:opacity-50"
                            >
                                <ChevronLeft className="w-3 h-3" />
                            </button>

                            <span className="px-3 py-1 bg-primary-500 text-white rounded text-xs font-bold">
                                {currentPage}/{totalPages}
                            </span>

                            <button
                                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                                disabled={currentPage >= totalPages}
                                className="flex items-center px-2 py-1 text-xs border rounded hover:bg-gray-50 disabled:opacity-50"
                            >
                                <ChevronRight className="w-3 h-3" />
                            </button>
                            
                            <button
                                onClick={() => onPageChange(totalPages)}
                                disabled={currentPage >= totalPages}
                                className="px-2 py-1 text-xs border rounded hover:bg-gray-50 disabled:opacity-50"
                            >
                                Últ
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}