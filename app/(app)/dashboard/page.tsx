'use client';

import { Calendar, CheckSquare, Trophy, Image, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { GlassCard } from '@/components/ui/GlassCard';
import { MetricCard } from '@/components/ui/MetricCard';
import { Badge } from '@/components/ui/Badge';
import { Avatar, AvatarGroup } from '@/components/ui/Avatar';
import { getGreeting, formatTime } from '@/lib/utils';

export default function DashboardPage() {
  const greeting = getGreeting();
  const userName = 'Sarah';

  // Mock data - will be replaced with real API data
  const stats = [
    { label: 'Tasks Today', value: 5, completed: 3, icon: CheckSquare, color: 'text-primary' },
    { label: 'Events Today', value: 3, icon: Calendar, color: 'text-secondary' },
    { label: 'Points This Week', value: 120, icon: Trophy, color: 'text-success' },
    { label: 'Recent Photos', value: 24, icon: Image, color: 'text-info' },
  ];

  const todayEvents = [
    {
      id: '1',
      title: 'Doctor Appointment',
      time: new Date(2026, 0, 8, 10, 30),
      attendees: [
        { name: 'Sarah', color: '#6366F1' },
        { name: 'Emma', color: '#EC4899' },
      ],
      color: '#EF4444',
    },
    {
      id: '2',
      title: 'Soccer Practice',
      time: new Date(2026, 0, 8, 16, 0),
      attendees: [{ name: 'Jake', color: '#10B981' }],
      color: '#3B82F6',
    },
    {
      id: '3',
      title: 'Family Dinner',
      time: new Date(2026, 0, 8, 18, 30),
      attendees: [
        { name: 'Sarah', color: '#6366F1' },
        { name: 'Mike', color: '#F59E0B' },
        { name: 'Emma', color: '#EC4899' },
        { name: 'Jake', color: '#10B981' },
      ],
      color: '#F59E0B',
    },
  ];

  const pendingTasks = [
    { id: '1', title: 'Clean kitchen', assignee: 'Emma', priority: 'medium', dueTime: '2:00 PM' },
    { id: '2', title: 'Grocery shopping', assignee: 'Sarah', priority: 'high', dueTime: '4:00 PM' },
    { id: '3', title: 'Walk the dog', assignee: 'Jake', priority: 'low', dueTime: '5:00 PM' },
  ];

  const recentPhotos = [
    { id: '1', url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400', caption: 'Birthday Party' },
    { id: '2', url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400', caption: 'Beach Day' },
    { id: '3', url: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=400', caption: 'Park Visit' },
    { id: '4', url: 'https://images.unsplash.com/photo-1543168256-418811576931?w=400', caption: 'Game Night' },
  ];

  return (
    <div className="space-y-6 animate-in">
      {/* Greeting Section */}
      <GlassCard variant="elevated" className="relative overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-blue/5 pointer-events-none" />

        <div className="relative">
          <h1 className="heading-1 text-neutral-900 dark:text-white mb-2">
            {greeting}, {userName}
          </h1>
          <p className="text-body-lg text-neutral-600 dark:text-neutral-300">
            You have {stats[0].value - stats[0].completed!} tasks and {stats[1].value} events today
          </p>
        </div>
      </GlassCard>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <MetricCard
              key={index}
              label={stat.label}
              value={stat.completed ? `${stat.completed}/${stat.value}` : stat.value}
              icon={<Icon className="w-5 h-5" />}
              comparison={stat.completed ? { current: stat.completed, total: stat.value } : undefined}
              trend={index === 2 ? { value: 24, direction: 'up', label: 'vs last week' } : undefined}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Events */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Today's Events</CardTitle>
              <Calendar className="w-5 h-5 text-neutral-400" />
            </div>
            <CardDescription>Your schedule for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  <div
                    className="w-1 h-full rounded-full flex-shrink-0 mt-1"
                    style={{ backgroundColor: event.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-neutral-900 dark:text-white">{event.title}</h4>
                      <Badge variant="neutral" size="sm">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatTime(event.time)}
                      </Badge>
                    </div>
                    <div className="mt-2">
                      <AvatarGroup avatars={event.attendees} size="sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pending Tasks</CardTitle>
              <CheckSquare className="w-5 h-5 text-neutral-400" />
            </div>
            <CardDescription>Tasks that need attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-2 border-neutral-300 text-accent focus:ring-accent cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-neutral-900 dark:text-white">{task.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">{task.assignee}</span>
                      <span className="text-neutral-300 dark:text-neutral-600">•</span>
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">{task.dueTime}</span>
                    </div>
                  </div>
                  <Badge
                    variant={
                      task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'success'
                    }
                    size="sm"
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Photos */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Memories</CardTitle>
              <CardDescription>Latest photos from your family</CardDescription>
            </div>
            <Image className="w-5 h-5 text-neutral-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recentPhotos.map((photo) => (
              <div
                key={photo.id}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-all duration-200"
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 glass-default opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <p className="text-neutral-900 dark:text-white text-sm font-semibold">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
