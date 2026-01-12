'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, CheckSquare, Trophy, Utensils, Image, ListChecks, Moon, Settings, Home, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Rewards', href: '/rewards', icon: Trophy },
  { name: 'Meals', href: '/meals', icon: Utensils },
  { name: 'Photos', href: '/photos', icon: Image },
  { name: 'Lists', href: '/lists', icon: ListChecks },
  { name: 'Sleep', href: '/sleep', icon: Moon },
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <aside 
      className={cn(
        'hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 dark:lg:border-gray-800 lg:bg-white dark:lg:bg-gray-900 lg:pt-20 transition-all duration-300 ease-in-out',
        isCollapsed ? 'lg:w-20' : 'lg:w-64'
      )}
    >
      {/* Toggle Button - More Visible */}
      <div className="absolute -right-3 top-28 z-50">
        <button
          onClick={onToggle}
          className={cn(
            'relative w-8 h-8 rounded-full text-white shadow-xl flex items-center justify-center transition-all duration-300',
            'bg-[#6366F1] hover:bg-[#4F46E5]',
            'hover:scale-110 hover:shadow-2xl',
            'active:scale-95',
            'focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2',
            'border-2 border-white dark:border-gray-900'
          )}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
          ) : (
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          )}
          {/* Pulse indicator */}
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#EC4899] rounded-full animate-pulse" />
        </button>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-2 custom-scrollbar overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group relative flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white shadow-md hover:from-[#4F46E5] hover:to-[#4338CA]'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
                isCollapsed && 'justify-center px-0'
              )}
              title={isCollapsed ? item.name : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span 
                className={cn(
                  'whitespace-nowrap transition-all duration-300',
                  isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
                )}
              >
                {item.name}
              </span>

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
                  {item.name}
                  <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45" />
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapsed state indicator */}
      {isCollapsed && (
        <div className="px-3 py-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex justify-center">
            <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
          </div>
        </div>
      )}
    </aside>
  );
}
