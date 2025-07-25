import React from 'react';
import { AlertCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

export default function Input({ 
  className = '',
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconClick,
  id,
  ...props 
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="h-5 w-5 text-gray-400">{leftIcon}</div>
          </div>
        )}
        
        <input
          id={inputId}
          className={`input-field ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''} ${error ? 'input-error' : ''} ${className}`}
          {...props}
        />
        
        {rightIcon && (
          <div 
            className={`absolute inset-y-0 right-0 pr-3 flex items-center ${onRightIconClick ? 'cursor-pointer' : 'pointer-events-none'}`}
            onClick={onRightIconClick}
          >
            <div className="h-5 w-5 text-gray-400 hover:text-gray-600">{rightIcon}</div>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}