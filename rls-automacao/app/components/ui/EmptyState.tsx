// components/ui/EmptyState.tsx
import React from 'react';
import { LucideIcon } from 'lucide-react';
import Button from './Button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
  showButton?: boolean;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  buttonText,
  onButtonClick,
  showButton = true
}: EmptyStateProps) {
  return (
    <div className="col-span-full bg-white rounded-lg shadow-sm p-12 text-center border border-gray-100">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
        {description}
      </p>
      {showButton && buttonText && onButtonClick && (
        <Button onClick={onButtonClick} className="mx-auto">
          {buttonText}
        </Button>
      )}
    </div>
  );
}