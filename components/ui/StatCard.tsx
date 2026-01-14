import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  icon?: ReactNode;
  color?: 'accent' | 'blue' | 'success' | 'warning' | 'error' | 'neutral';
  variant?: 'default' | 'minimal' | 'glass';
  size?: 'sm' | 'md' | 'lg';
}

export function StatCard({
  label,
  value,
  icon,
  color = 'accent',
  variant = 'default',
  size = 'md',
  className,
  ...props
}: StatCardProps) {
  const colorClasses = {
    accent: 'text-accent',
    blue: 'text-blue',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
    neutral: 'text-neutral-700 dark:text-neutral-300',
  };

  const iconBackgroundClasses = {
    accent: 'bg-accent/10',
    blue: 'bg-blue/10',
    success: 'bg-emerald-50 dark:bg-emerald-900/20',
    warning: 'bg-amber-50 dark:bg-amber-900/20',
    error: 'bg-red-50 dark:bg-red-900/20',
    neutral: 'bg-neutral-100 dark:bg-neutral-800',
  };

  const sizeClasses = {
    sm: {
      container: 'p-3 sm:p-4',
      icon: 'w-8 h-8 p-1.5',
      iconSize: 'w-4 h-4',
      value: 'text-xl sm:text-2xl',
      label: 'text-xs',
    },
    md: {
      container: 'p-4 sm:p-6',
      icon: 'w-10 h-10 p-2',
      iconSize: 'w-5 h-5',
      value: 'text-2xl sm:text-3xl',
      label: 'text-sm',
    },
    lg: {
      container: 'p-6 sm:p-8',
      icon: 'w-12 h-12 p-2.5',
      iconSize: 'w-6 h-6',
      value: 'text-3xl sm:text-4xl',
      label: 'text-base',
    },
  };

  const variantClasses = {
    default: 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700',
    minimal: 'bg-transparent',
    glass: 'glass-default',
  };

  return (
    <div
      className={cn(
        'rounded-xl transition-all duration-200 hover:shadow-md',
        variantClasses[variant],
        sizeClasses[size].container,
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div className={cn('rounded-lg flex items-center justify-center', sizeClasses[size].icon, iconBackgroundClasses[color], colorClasses[color])}>
            <div className={sizeClasses[size].iconSize}>
              {icon}
            </div>
          </div>
        )}
        <div className="flex-1">
          <div className={cn('text-metric', sizeClasses[size].value)}>
            {value}
          </div>
          <div className={cn('text-neutral-600 dark:text-neutral-400 mt-0.5', sizeClasses[size].label)}>
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}
