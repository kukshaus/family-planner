import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { getInitials } from '@/lib/utils';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
}

export function Avatar({ src, alt, name, size = 'md', color, className, ...props }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const bgColor = color || '#6366F1';
  const initials = name ? getInitials(name) : '?';

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full overflow-hidden font-semibold text-white',
        sizes[size],
        className
      )}
      style={{ backgroundColor: src ? undefined : bgColor }}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt || name || 'Avatar'} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  avatars: Array<{
    src?: string;
    name?: string;
    color?: string;
  }>;
  max?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function AvatarGroup({ avatars, max = 3, size = 'md', className, ...props }: AvatarGroupProps) {
  const displayAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className={cn('flex -space-x-2', className)} {...props}>
      {displayAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          src={avatar.src}
          name={avatar.name}
          color={avatar.color}
          size={size}
          className="border-2 border-white dark:border-gray-800"
        />
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            'flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600 border-2 border-white dark:border-gray-800 font-semibold text-gray-700 dark:text-gray-200',
            size === 'sm' && 'w-8 h-8 text-xs',
            size === 'md' && 'w-10 h-10 text-sm',
            size === 'lg' && 'w-12 h-12 text-base',
            size === 'xl' && 'w-16 h-16 text-lg'
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
