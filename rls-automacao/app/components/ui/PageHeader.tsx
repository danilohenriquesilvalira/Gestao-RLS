// components/ui/PageHeader.tsx
import React from 'react';
import { LucideIcon } from 'lucide-react';
import Button from './Button';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  stats?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  buttonIcon?: LucideIcon;
  showButton?: boolean;
}

export default function PageHeader({
  title,
  subtitle,
  icon: Icon,
  stats,
  buttonText,
  onButtonClick,
  buttonIcon: ButtonIcon,
  showButton = true
}: PageHeaderProps) {
  return (
    <section className="flex flex-col md:flex-row md:items-end md:justify-between pb-6 border-b border-gray-100">
      <div className="mb-4 md:mb-0">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight flex items-center space-x-3">
          <Icon className="w-8 h-8 text-primary-600" />
          <span>{title.split(' ').map((word, i) => 
            i === 1 ? <span key={i} className="text-primary-600">{word}</span> : word
          ).reduce((prev, curr, i) => i === 0 ? [curr] : [...prev, ' ', curr], [])}</span>
        </h1>
        <p className="mt-2 text-base text-gray-600">{subtitle}</p>
        {stats && (
          <p className="mt-1 text-sm text-gray-500">{stats}</p>
        )}
      </div>

      {showButton && buttonText && onButtonClick && (
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 mt-4 md:mt-0">
          <Button onClick={onButtonClick} className="w-full sm:w-auto">
            {ButtonIcon && <ButtonIcon className="w-5 h-5 mr-1.5" />}
            {buttonText}
          </Button>
        </div>
      )}
    </section>
  );
}