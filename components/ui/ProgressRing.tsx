import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ProgressRingProps extends HTMLAttributes<HTMLDivElement> {
  progress: number; // 0-100
  size?: 'sm' | 'md' | 'lg' | 'xl';
  strokeWidth?: number;
  color?: 'accent' | 'success' | 'warning' | 'error' | 'neutral';
  showValue?: boolean;
  animated?: boolean;
  duration?: number;
}

export function ProgressRing({
  progress,
  size = 'md',
  strokeWidth,
  color = 'accent',
  showValue = false,
  animated = true,
  duration = 1000,
  className,
  ...props
}: ProgressRingProps) {
  const sizes = {
    sm: { svg: 64, radius: 28, stroke: strokeWidth || 4 },
    md: { svg: 96, radius: 42, stroke: strokeWidth || 6 },
    lg: { svg: 128, radius: 56, stroke: strokeWidth || 8 },
    xl: { svg: 160, radius: 72, stroke: strokeWidth || 10 },
  };

  const colorClasses = {
    accent: 'text-accent',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
    neutral: 'text-neutral-500',
  };

  const { svg: svgSize, radius, stroke } = sizes[size];
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={cn('inline-flex items-center justify-center relative', className)}
      {...props}
    >
      <svg
        width={svgSize}
        height={svgSize}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          stroke="currentColor"
          className="text-neutral-200 dark:text-neutral-700"
          strokeWidth={stroke}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          stroke="currentColor"
          className={colorClasses[color]}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: animated ? `stroke-dashoffset ${duration}ms ease-in-out` : 'none',
          }}
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn('text-metric', size === 'sm' ? 'text-sm' : size === 'md' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-3xl')}>
            {Math.round(progress)}%
          </span>
        </div>
      )}
    </div>
  );
}
