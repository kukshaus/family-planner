'use client';

import { useState } from 'react';
import { Moon, Sun, Plus, TrendingUp, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { formatDuration } from '@/lib/utils';

export default function SleepPage() {
  const [selectedChild, setSelectedChild] = useState('emma');
  const [selectedPeriod, setSelectedPeriod] = useState<7 | 30 | 90>(7);

  // Mock data
  const children = [
    { id: 'emma', name: 'Emma', color: '#EC4899', age: 8, avatar: '' },
    { id: 'jake', name: 'Jake', color: '#10B981', age: 6, avatar: '' },
  ];

  const sleepData = {
    emma: {
      avgBedtime: '20:30',
      avgWakeTime: '07:00',
      avgTotalSleep: 630, // minutes
      avgNapTime: 0,
      quality: 'good' as const,
      entries: [
        {
          date: new Date(2026, 0, 8),
          bedtime: new Date(2026, 0, 8, 20, 30),
          wakeTime: new Date(2026, 0, 9, 7, 0),
          totalSleep: 630,
          naps: [],
          quality: 'good' as const,
          notes: '',
        },
        {
          date: new Date(2026, 0, 7),
          bedtime: new Date(2026, 0, 7, 20, 15),
          wakeTime: new Date(2026, 0, 8, 6, 45),
          totalSleep: 630,
          naps: [],
          quality: 'excellent' as const,
          notes: 'Slept through the night',
        },
        {
          date: new Date(2026, 0, 6),
          bedtime: new Date(2026, 0, 6, 21, 0),
          wakeTime: new Date(2026, 0, 7, 7, 15),
          totalSleep: 615,
          naps: [],
          quality: 'fair' as const,
          notes: 'Woke up once',
        },
      ],
    },
    jake: {
      avgBedtime: '20:00',
      avgWakeTime: '06:45',
      avgTotalSleep: 645, // minutes
      avgNapTime: 30,
      quality: 'excellent' as const,
      entries: [],
    },
  };

  const selectedChildData = children.find((c) => c.id === selectedChild)!;
  const sleepInfo = sleepData[selectedChild as keyof typeof sleepData];

  const qualityColors = {
    poor: 'bg-error',
    fair: 'bg-warning',
    good: 'bg-success',
    excellent: 'bg-primary',
  };

  const qualityLabels = {
    poor: 'Poor',
    fair: 'Fair',
    good: 'Good',
    excellent: 'Excellent',
  };

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">
            Sleep Tracking
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor your children's sleep patterns
          </p>
        </div>
        <Button>
          <Plus className="w-5 h-5 mr-2" />
          Log Sleep
        </Button>
      </div>

      {/* Child Selector */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {children.map((child) => (
          <button
            key={child.id}
            onClick={() => setSelectedChild(child.id)}
            className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all ${
              selectedChild === child.id
                ? 'bg-gradient-ocean text-white shadow-lg scale-105'
                : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Avatar name={child.name} color={child.color} size="md" />
            <div className="text-left">
              <p className="font-semibold">{child.name}</p>
              <p className="text-sm opacity-90">{child.age} years old</p>
            </div>
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card padding="md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Moon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Bedtime</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {sleepInfo.avgBedtime}
              </p>
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center">
              <Sun className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Wake Time</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {sleepInfo.avgWakeTime}
              </p>
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Total Sleep</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {formatDuration(sleepInfo.avgTotalSleep)}
              </p>
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 ${qualityColors[sleepInfo.quality]}/10 rounded-xl flex items-center justify-center`}>
              <TrendingUp className={`w-6 h-6 ${qualityColors[sleepInfo.quality].replace('bg-', 'text-')}`} />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sleep Quality</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {qualityLabels[sleepInfo.quality]}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sleep Chart */}
        <Card className="lg:col-span-2" padding="lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Sleep Pattern</CardTitle>
                <CardDescription>Daily sleep duration over time</CardDescription>
              </div>
              <div className="flex gap-2">
                {[7, 30, 90].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period as 7 | 30 | 90)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      selectedPeriod === period
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {period}d
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Simple chart visualization */}
            <div className="space-y-2">
              {sleepInfo.entries.map((entry, index) => {
                const percentage = (entry.totalSleep / 720) * 100; // 720 = 12 hours max
                return (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-16">
                      {entry.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-8 relative">
                      <div
                        className={`${qualityColors[entry.quality]} h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold`}
                        style={{ width: `${percentage}%` }}
                      >
                        {formatDuration(entry.totalSleep)}
                      </div>
                    </div>
                    <Badge
                      variant={
                        entry.quality === 'excellent'
                          ? 'primary'
                          : entry.quality === 'good'
                          ? 'success'
                          : entry.quality === 'fair'
                          ? 'warning'
                          : 'error'
                      }
                      size="sm"
                    >
                      {qualityLabels[entry.quality]}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Entries */}
        <Card padding="lg">
          <CardHeader>
            <CardTitle>Recent Entries</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sleepInfo.entries.slice(0, 7).map((entry, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {entry.date.toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <Badge
                      variant={
                        entry.quality === 'excellent' || entry.quality === 'good'
                          ? 'success'
                          : 'warning'
                      }
                      size="sm"
                    >
                      {qualityLabels[entry.quality]}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Moon className="w-4 h-4" />
                      <span>
                        Bedtime:{' '}
                        {entry.bedtime.toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true,
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4" />
                      <span>
                        Wake:{' '}
                        {entry.wakeTime.toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true,
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Total: {formatDuration(entry.totalSleep)}</span>
                    </div>
                  </div>
                  {entry.notes && (
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 italic">
                      {entry.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card padding="lg" className="bg-gradient-forest text-white">
        <h3 className="text-xl font-heading font-bold mb-3">Sleep Recommendations</h3>
        <ul className="space-y-2 opacity-90">
          <li>• Children aged {selectedChildData.age} should get 9-11 hours of sleep per night</li>
          <li>• Maintain a consistent bedtime routine</li>
          <li>• Avoid screens 1 hour before bedtime</li>
          <li>• Keep the bedroom cool, dark, and quiet</li>
        </ul>
      </Card>
    </div>
  );
}
