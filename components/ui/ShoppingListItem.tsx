import React from 'react';
import { cn } from '@/lib/utils';

interface ShoppingListItemProps {
  name: string;
  quantity: string;
  checked: boolean;
  icon?: string;
  onToggle: () => void;
  className?: string;
}

export function ShoppingListItem({
  name,
  quantity,
  checked,
  icon,
  onToggle,
  className,
}: ShoppingListItemProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer',
        className
      )}
      onClick={onToggle}
    >
      <div
        className={cn(
          'flex items-center justify-center w-5 h-5 rounded-md border-2 transition-all',
          checked
            ? 'bg-success-500 border-success-500'
            : 'border-gray-300 dark:border-gray-600'
        )}
      >
        {checked && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>

      {icon && (
        <div className="text-2xl">
          {icon}
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className={cn(
          'font-medium transition-all',
          checked ? 'line-through text-gray-400 dark:text-gray-600' : 'text-gray-900 dark:text-gray-100'
        )}>
          {name}
        </p>
      </div>

      <div className={cn(
        'text-sm font-medium',
        checked ? 'text-gray-400 dark:text-gray-600' : 'text-gray-600 dark:text-gray-400'
      )}>
        {quantity}
      </div>
    </div>
  );
}
