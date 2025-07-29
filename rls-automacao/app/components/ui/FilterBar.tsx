// components/ui/FilterBar.tsx
import React from 'react';
import { Calendar, Users, Filter, RotateCcw } from 'lucide-react';

interface FilterOption {
  value: string | number;
  label: string;
}

interface FilterBarProps {
  // Filtros principais
  primaryFilters?: {
    label: string;
    value: string | number;
    options: FilterOption[];
    onChange: (value: string) => void;
    icon?: React.ReactNode;
  }[];
  
  // Filtros de data
  monthFilter?: {
    value: number;
    onChange: (value: number) => void;
    options?: FilterOption[];
  };
  
  yearFilter?: {
    value: number;
    onChange: (value: number) => void;
    options: FilterOption[];
  };
  
  // Filtro de usuário (para admins)
  userFilter?: {
    value: string;
    onChange: (value: string) => void;
    options: FilterOption[];
    placeholder: string;
  };
  
  // Limpar filtros
  onClearFilters?: () => void;
  
  // Customização
  className?: string;
}

export default function FilterBar({
  primaryFilters = [],
  monthFilter,
  yearFilter,
  userFilter,
  onClearFilters,
  className = ''
}: FilterBarProps) {
  
  const defaultMonthOptions: FilterOption[] = [
    { value: 0, label: 'Todos os meses' },
    { value: 1, label: 'Jan' }, { value: 2, label: 'Fev' },
    { value: 3, label: 'Mar' }, { value: 4, label: 'Abr' },
    { value: 5, label: 'Mai' }, { value: 6, label: 'Jun' },
    { value: 7, label: 'Jul' }, { value: 8, label: 'Ago' },
    { value: 9, label: 'Set' }, { value: 10, label: 'Out' },
    { value: 11, label: 'Nov' }, { value: 12, label: 'Dez' }
  ];

  const hasActiveFilters = () => {
    return (
      primaryFilters.some(filter => filter.value !== primaryFilters[0]?.options[0]?.value) ||
      (monthFilter && monthFilter.value !== 0) ||
      (yearFilter && yearFilter.value !== 0) ||
      (userFilter && userFilter.value !== '')
    );
  };

  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200/50 shadow-sm ${className}`}>
      <div className="p-3 sm:p-4">
        <div className="flex flex-wrap items-center gap-2 lg:gap-3">
          
          {/* Ícone de filtro */}
          <div className="flex items-center space-x-2 text-gray-600 border-r border-gray-200 pr-3">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">Filtros</span>
          </div>

          {/* Filtros principais */}
          {primaryFilters.map((filter, index) => (
            <div key={index} className="flex items-center space-x-2">
              {filter.icon && (
                <div className="text-gray-500">
                  {filter.icon}
                </div>
              )}
              <select
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500 bg-white hover:bg-gray-50 transition-colors min-w-[120px]"
              >
                {filter.options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {/* Filtro de mês */}
          {monthFilter && (
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <select
                value={monthFilter.value}
                onChange={(e) => monthFilter.onChange(Number(e.target.value))}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500 bg-white hover:bg-gray-50 transition-colors min-w-[110px]"
              >
                {(monthFilter.options || defaultMonthOptions).map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Filtro de ano */}
          {yearFilter && (
            <div className="flex items-center space-x-2">
              <select
                value={yearFilter.value}
                onChange={(e) => yearFilter.onChange(Number(e.target.value))}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500 bg-white hover:bg-gray-50 transition-colors min-w-[90px]"
              >
                {yearFilter.options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Filtro de usuário */}
          {userFilter && (
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-500" />
              <select
                value={userFilter.value}
                onChange={(e) => userFilter.onChange(e.target.value)}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500 bg-white hover:bg-gray-50 transition-colors min-w-[140px]"
              >
                <option value="">{userFilter.placeholder}</option>
                {userFilter.options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Botão limpar filtros */}
          {hasActiveFilters() && onClearFilters && (
            <button
              onClick={onClearFilters}
              className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors border border-gray-300"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Limpar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}