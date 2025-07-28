// components/ui/SearchFilterBar.tsx
import React from 'react';
import { Search, Filter } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface SearchFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  filterOptions?: FilterOption[];
  filterLabel?: string;
  onClear?: () => void;
  showFilter?: boolean;
}

export default function SearchFilterBar({
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Buscar...",
  filterValue,
  onFilterChange,
  filterOptions = [],
  filterLabel = "Filtrar:",
  onClear,
  showFilter = true
}: SearchFilterBarProps) {
  return (
    <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        
        {/* Busca */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full text-sm"
          />
        </div>

        {/* Filtros */}
        {showFilter && (
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-600">{filterLabel}</span>
            </div>
            {filterOptions.length > 0 && (
              <select
                value={filterValue || ''}
                onChange={(e) => onFilterChange?.(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm min-w-[150px]"
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
            
            {onClear && (
              <button
                onClick={onClear}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 font-medium text-sm transition-colors"
              >
                Limpar
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}