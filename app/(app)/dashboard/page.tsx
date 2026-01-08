'use client';

import { Calendar, CheckSquare, Trophy, Image, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
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
      <div className="bg-gradient-sunset rounded-card-desktop p-8 text-white">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
          {greeting}, {userName}! 👋
        </h1>
        <p className="text-lg opacity-90">
          You have {stats[0].value - stats[0].completed!} tasks and {stats[1].value} events today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} hover>
              <CardContent className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.color} bg-current/10`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.completed ? `${stat.completed}/${stat.value}` : stat.value}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Events */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Today's Events</CardTitle>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <CardDescription>Your schedule for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div
                    className="w-1 h-full rounded-full flex-shrink-0 mt-1"
                    style={{ backgroundColor: event.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{event.title}</h4>
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
              <CheckSquare className="w-5 h-5 text-gray-400" />
            </div>
            <CardDescription>Tasks that need attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-primary cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{task.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{task.assignee}</span>
                      <span className="text-gray-300 dark:text-gray-600">•</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{task.dueTime}</span>
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
            <Image className="w-5 h-5 text-gray-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recentPhotos.map((photo) => (
              <div
                key={photo.id}
                className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <p className="text-white text-sm font-semibold">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
