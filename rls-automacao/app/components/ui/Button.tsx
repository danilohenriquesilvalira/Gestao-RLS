import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export default function Button({ 
  className = '', 
  variant = 'primary', 
  size = 'md', 
  loading = false,
  disabled,
  children, 
  ...props 
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md focus:ring-green-200",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900 shadow-sm hover:shadow-md focus:ring-gray-200",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow-md focus:ring-red-200",
    ghost: "hover:bg-gray-100 text-gray-700 hover:text-gray-900 focus:ring-gray-200",
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2.5 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-lg",
  };
  
  const isDisabled = disabled || loading;
  
  return (
    <button
      disabled={isDisabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
}