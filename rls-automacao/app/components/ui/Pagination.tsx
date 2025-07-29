// components/ui/Pagination.tsx
import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  itemName?: string;
  showInfo?: boolean;
  showPageNumbers?: boolean;
  maxPageNumbers?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  itemName = 'itens',
  showInfo = true,
  showPageNumbers = true,
  maxPageNumbers = 5,
  size = 'md',
  className = ''
}: PaginationProps) {
  // Se não há itens, não mostra nada
  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Calcular quais números de página mostrar
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const halfRange = Math.floor(maxPageNumbers / 2);
    
    let startPage = Math.max(1, currentPage - halfRange);
    let endPage = Math.min(totalPages, currentPage + halfRange);

    // Ajustar para sempre mostrar maxPageNumbers quando possível
    if (endPage - startPage + 1 < maxPageNumbers) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxPageNumbers + 1);
      }
    }

    // Primeira página
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }

    // Páginas do meio
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Última página
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const sizeClasses = {
    sm: {
      button: 'px-2 py-1 text-xs',
      pageButton: 'w-6 h-6 text-xs',
      text: 'text-xs'
    },
    md: {
      button: 'px-3 py-1.5 text-sm',
      pageButton: 'w-8 h-8 text-sm',
      text: 'text-sm'
    },
    lg: {
      button: 'px-4 py-2 text-base',
      pageButton: 'w-10 h-10 text-base',
      text: 'text-base'
    }
  };

  const currentSizeClasses = sizeClasses[size];

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 ${className}`}>
      
      {/* Info sobre itens */}
      {showInfo && (
        <div className={`${currentSizeClasses.text} text-gray-600 order-2 sm:order-1`}>
          Mostrando {startItem} até {endItem} de {totalItems} {itemName}
          {totalPages > 1 && (
            <span className="hidden sm:inline"> • Página {currentPage} de {totalPages}</span>
          )}
        </div>
      )}

      {/* Controles de navegação */}
      <div className="flex items-center justify-center space-x-1 order-1 sm:order-2">
        
        {/* Primeira página */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`${currentSizeClasses.button} border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-gray-700`}
          title="Primeira página"
        >
          Primeira
        </button>

        {/* Página anterior */}
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className={`${currentSizeClasses.button} border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center text-gray-700`}
          title="Página anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Números das páginas */}
        {showPageNumbers && (
          <div className="hidden sm:flex items-center space-x-1">
            {getPageNumbers().map((page, index) => (
              page === '...' ? (
                <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                  <MoreHorizontal className="w-4 h-4" />
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => onPageChange(page as number)}
                  className={`${currentSizeClasses.pageButton} rounded-lg font-medium transition-colors ${
                    page === currentPage
                      ? 'bg-primary-500 text-white shadow-sm'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              )
            ))}
          </div>
        )}

        {/* Indicador de página atual (mobile) */}
        <div className="sm:hidden">
          <span className={`${currentSizeClasses.pageButton} bg-primary-500 text-white rounded-lg font-medium flex items-center justify-center`}>
            {currentPage}
          </span>
        </div>

        {/* Próxima página */}
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage >= totalPages}
          className={`${currentSizeClasses.button} border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center text-gray-700`}
          title="Próxima página"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Última página */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage >= totalPages}
          className={`${currentSizeClasses.button} border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-gray-700`}
          title="Última página"
        >
          Última
        </button>
      </div>
    </div>
  );
}