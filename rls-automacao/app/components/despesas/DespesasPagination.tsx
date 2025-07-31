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
    return (
        <div className="flex items-center justify-center space-x-2">
            <button
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Anterior</span>
            </button>

            <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`w-8 h-8 rounded font-medium transition-colors text-sm ${
                            page === currentPage
                                ? 'bg-primary-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
                <span className="hidden sm:inline">Próximo</span>
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
}