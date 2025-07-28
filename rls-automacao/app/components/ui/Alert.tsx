// components/ui/Alert.tsx
import React from 'react';
import { AlertCircle, CheckCircle, X, Bell, ArrowUpRight, LucideIcon } from 'lucide-react';

interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title: string;
  description?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: LucideIcon;
  className?: string;
}

export default function Alert({
  type = 'info',
  title,
  description,
  dismissible = false,
  onDismiss,
  action,
  icon,
  className = ''
}: AlertProps) {
  const typeStyles = {
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: 'text-blue-500',
      button: 'text-blue-700 hover:text-blue-800'
    },
    success: {
      container: 'bg-green-50 border-green-200 text-green-800',
      icon: 'text-green-500',
      button: 'text-green-700 hover:text-green-800'
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      icon: 'text-yellow-500',
      button: 'text-yellow-700 hover:text-yellow-800'
    },
    error: {
      container: 'bg-red-50 border-red-200 text-red-800',
      icon: 'text-red-500',
      button: 'text-red-700 hover:text-red-800'
    }
  };

  const getDefaultIcon = () => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertCircle;
      case 'error': return AlertCircle;
      default: return Bell;
    }
  };

  const IconComponent = icon || getDefaultIcon();
  const styles = typeStyles[type];

  return (
    <section className={`relative overflow-hidden border rounded-2xl p-6 shadow-sm animate-fade-in ${styles.container} ${className}`}>
      <div className="absolute inset-0 bg-grid-100/25 bg-grid-16"></div>
      <div className="relative flex items-start space-x-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
          type === 'warning' ? 'bg-amber-500' : 
          type === 'error' ? 'bg-red-500' :
          type === 'success' ? 'bg-green-500' : 'bg-blue-500'
        }`}>
          <IconComponent className={`w-6 h-6 text-white ${type === 'warning' ? 'animate-bounce' : ''}`} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">
            {title}
          </h3>
          {description && (
            <p className={`mb-4 ${styles.container.includes('yellow') ? 'text-amber-700' : ''}`}>
              {description}
            </p>
          )}
          {action && (
            <button 
              onClick={action.onClick}
              className={`group inline-flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg ${
                type === 'warning' ? 'bg-amber-500 hover:bg-amber-600 text-white' :
                type === 'error' ? 'bg-red-500 hover:bg-red-600 text-white' :
                type === 'success' ? 'bg-green-500 hover:bg-green-600 text-white' :
                'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              <span>{action.label}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
            </button>
          )}
        </div>
        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className={`p-1 rounded-lg transition-colors ${styles.button}`}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </section>
  );
}