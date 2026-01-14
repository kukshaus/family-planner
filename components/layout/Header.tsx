'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, ChevronDown, Settings, LogOut, User, Menu } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';

export function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock data - will be replaced with real data from auth
  const user = {
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: '',
    color: '#6366F1',
  };

  const family = {
    name: 'Johnson Family',
  };

  const notifications = [
    { id: '1', text: 'Task "Clean kitchen" completed', time: '5m ago', unread: true },
    { id: '2', text: 'New event added to calendar', time: '1h ago', unread: true },
    { id: '3', text: 'Emma earned 10 points', time: '2h ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass-elevated border-b border-neutral-200/50 dark:border-neutral-800/50 h-16">
      <div className="h-full px-4 flex items-center justify-between lg:pl-72">
        {/* Logo / Family Name */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-heading font-bold text-neutral-900 dark:text-white">
                {family.name}
              </h1>
            </div>
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <Bell className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
              )}
            </button>

            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-neutral-800 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-700 z-50">
                  <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
                    <h3 className="font-semibold text-neutral-900 dark:text-white">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto custom-scrollbar">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-neutral-100 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors ${
                          notification.unread ? 'bg-accent/5' : ''
                        }`}
                      >
                        <p className="text-sm text-neutral-900 dark:text-white">{notification.text}</p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-neutral-200 dark:border-neutral-700">
                    <Link
                      href="/notifications"
                      className="text-sm text-accent hover:text-accent-dark font-medium"
                    >
                      View all notifications
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1 sm:p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <Avatar
                src={user.avatar}
                name={user.name}
                color={user.color}
                size="md"
              />
              <ChevronDown className="hidden sm:block w-4 h-4 text-neutral-500" />
            </button>

            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-neutral-800 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-700 z-50">
                  <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
                    <p className="font-semibold text-neutral-900 dark:text-white">{user.name}</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{user.email}</p>
                  </div>
                  <div className="p-2">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm">Profile</span>
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span className="text-sm">Settings</span>
                    </Link>
                    <button
                      onClick={() => {/* Add logout logic */}}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors text-error"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
