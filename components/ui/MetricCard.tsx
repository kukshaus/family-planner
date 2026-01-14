import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export interface MetricCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
    label?: string;
  };
  comparison?: {
    current: number;
    total: number;
  };
  variant?: 'default' | 'glass';
}

export function MetricCard({
  label,
  value,
  icon,
  trend,
  comparison,
  variant = 'default',
  className,
  ...props
}: MetricCardProps) {
  const getTrendIcon = () => {
    if (!trend) return null;

    const iconClass = 'w-4 h-4';
    switch (trend.direction) {
      case 'up':
        return <TrendingUp className={iconClass} />;
      case 'down':
        return <TrendingDown className={iconClass} />;
      case 'neutral':
        return <Minus className={iconClass} />;
    }
  };

  const getTrendColor = () => {
    if (!trend) return '';

    switch (trend.direction) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-error';
      case 'neutral':
        return 'text-neutral-500';
    }
  };

  const baseClass = variant === 'glass'
    ? 'glass-default'
    : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700';

  return (
    <div
      className={cn(
        'rounded-xl p-4 sm:p-6 transition-all duration-200 hover:shadow-md',
        baseClass,
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon && (
            <div className="text-neutral-600 dark:text-neutral-400">
              {icon}
            </div>
          )}
          <span className="text-label text-neutral-600 dark:text-neutral-400">
            {label}
          </span>
        </div>
        {trend && (
          <div className={cn('flex items-center gap-1 text-sm font-medium', getTrendColor())}>
            {getTrendIcon()}
            <span>{trend.value > 0 ? '+' : ''}{trend.value}%</span>
          </div>
        )}
      </div>

      <div className="mb-2">
        <div className="text-metric text-3xl sm:text-4xl">
          {value}
        </div>
      </div>

      {comparison && (
        <div className="text-body-sm text-neutral-500 dark:text-neutral-400">
          {comparison.current}/{comparison.total} completed
        </div>
      )}

      {trend?.label && (
        <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
          {trend.label}
        </div>
      )}
    </div>
  );
}
