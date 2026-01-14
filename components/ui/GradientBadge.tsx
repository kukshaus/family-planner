import React from 'react';
import { cn } from '@/lib/utils';

interface GradientBadgeProps {
  children: React.ReactNode;
  variant?: 'purple' | 'blue' | 'pink' | 'green' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function GradientBadge({
  children,
  variant = 'purple',
  size = 'md',
  className,
}: GradientBadgeProps) {
  const variants = {
    purple: 'from-primary-500 to-secondary-500',
    blue: 'from-blue-500 to-cyan-400',
    pink: 'from-pink-500 to-rose-400',
    green: 'from-green-500 to-emerald-400',
    orange: 'from-orange-500 to-amber-400',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold rounded-pill',
        `bg-gradient-to-r ${variants[variant]}`,
        'text-white shadow-sm',
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
