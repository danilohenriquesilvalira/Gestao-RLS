// components/ui/PageFooter.tsx
import React from 'react';

interface PageFooterProps {
  systemName?: string;
  className?: string;
}

export default function PageFooter({ 
  systemName = "Sistema Online",
  className = ""
}: PageFooterProps) {
  return (
    <footer className={`text-center pt-8 border-t border-gray-100 mt-12 ${className}`}>
      <p className="text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-center space-y-1.5 sm:space-y-0 sm:space-x-3">
        <span className="inline-flex items-center px-3 py-1.5 bg-green-50 rounded-full text-green-700 font-medium text-xs shadow-inner">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
          {systemName}
        </span>
        <span className="text-gray-300 hidden sm:block text-base">|</span>
        <span className="inline-flex items-center text-gray-400 text-xs">
          Última sincronização: {new Date().toLocaleDateString('pt-PT', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
          })}
        </span>
      </p>
    </footer>
  );
}