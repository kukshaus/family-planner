import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'bordered';
  blur?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function GlassCard({
  children,
  variant = 'default',
  blur = 'md',
  hover = false,
  padding = 'md',
  className,
  ...props
}: GlassCardProps) {
  const variantClasses = {
    default: 'glass-default',
    elevated: 'glass-elevated',
    bordered: 'glass-bordered',
  };

  const blurClasses = {
    sm: 'glass-blur-sm',
    md: 'glass-blur-md',
    lg: 'glass-blur-lg',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  return (
    <div
      className={cn(
        'rounded-xl glass-card transition-all duration-200',
        variantClasses[variant],
        blurClasses[blur],
        paddingClasses[padding],
        hover && 'hover:shadow-lg hover:scale-[1.01]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
