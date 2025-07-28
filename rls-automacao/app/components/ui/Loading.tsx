// components/ui/Loading.tsx
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Loading({ 
  title = "Carregando...", 
  description = "Aguarde um momento enquanto preparamos os seus dados.",
  size = 'md'
}: LoadingProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className="flex items-center justify-center h-full min-h-[400px]">
      <div className="flex flex-col items-center space-y-4 text-gray-700 p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 max-w-sm w-full">
        <div className="relative">
          <Loader2 className={`${sizeClasses[size]} animate-spin text-primary-500`} />
          <div className={`absolute inset-0 ${sizeClasses[size]} border-4 border-primary-200 rounded-full animate-pulse`}></div>
        </div>
        <div className="text-center">
          <p className={`${textSizes[size]} font-bold text-gray-800`}>{title}</p>
          <p className="text-sm text-gray-600 mt-1 leading-normal">{description}</p>
        </div>
      </div>
    </div>
  );
}