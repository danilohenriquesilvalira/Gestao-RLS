// components/ui/StatsCard.tsx
import React from 'react';
import { LucideIcon, TrendingUp } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  isCurrency?: boolean;
  change?: string;
  changePositive?: boolean;
  gradient?: string;
  iconBg?: string;
  bg?: string;
  onClick?: () => void;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  isCurrency = false,
  change,
  changePositive,
  gradient,
  iconBg = 'bg-primary-500',
  bg = 'bg-primary-50',
  onClick
}: StatsCardProps) {
  const formatCurrency = (val: number | string) => {
    const numValue = typeof val === 'string' ? parseFloat(val) : val;
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numValue);
  };

  const displayValue = isCurrency ? formatCurrency(value) : value;

  return (
    <div
      className={`group relative bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      {/* Background decoration */}
      <div className={`absolute top-0 right-0 w-24 h-24 ${bg} rounded-full -mr-12 -mt-12 opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
      
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <div className={`text-xs font-medium px-2 py-1 rounded-full flex items-center space-x-1 ${
            changePositive ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
          }`}>
            <TrendingUp className={`w-3 h-3 ${changePositive ? '' : 'rotate-180'}`} />
            <span>{change}</span>
          </div>
        )}
      </div>
      
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mb-2">{displayValue}</p>
        {change && <p className="text-xs text-gray-500">vs. mês anterior</p>}
      </div>
    </div>
  );
}