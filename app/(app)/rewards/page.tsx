'use client';

import { useState } from 'react';
import { Trophy, Star, Gift, Clock, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';

export default function RewardsPage() {
  const [selectedChild, setSelectedChild] = useState('emma');

  // Mock data
  const children = [
    { id: 'emma', name: 'Emma', color: '#EC4899', points: 145, avatar: '' },
    { id: 'jake', name: 'Jake', color: '#10B981', points: 98, avatar: '' },
  ];

  const rewards = [
    {
      id: '1',
      title: '30 mins Screen Time',
      description: 'Extra screen time for games or videos',
      icon: '📱',
      points: 20,
      category: 'screen-time',
    },
    {
      id: '2',
      title: 'Choose Dinner',
      description: 'Pick what the family eats tonight',
      icon: '🍕',
      points: 35,
      category: 'privilege',
    },
    {
      id: '3',
      title: 'Ice Cream Trip',
      description: 'Visit your favorite ice cream shop',
      icon: '🍦',
      points: 50,
      category: 'treat',
    },
    {
      id: '4',
      title: 'Stay Up Late',
      description: '1 hour extra before bedtime',
      icon: '🌙',
      points: 40,
      category: 'privilege',
    },
    {
      id: '5',
      title: 'Movie Night',
      description: 'Family movie night with your choice',
      icon: '🎬',
      points: 60,
      category: 'activity',
    },
    {
      id: '6',
      title: 'Toy Store Visit',
      description: 'Pick a small toy from the store',
      icon: '🎁',
      points: 100,
      category: 'treat',
    },
  ];

  const claims = [
    {
      id: '1',
      reward: 'Ice Cream Trip',
      child: 'Emma',
      points: 50,
      status: 'pending',
      date: new Date(2026, 0, 8),
    },
    {
      id: '2',
      reward: '30 mins Screen Time',
      child: 'Jake',
      points: 20,
      status: 'approved',
      date: new Date(2026, 0, 7),
    },
    {
      id: '3',
      reward: 'Choose Dinner',
      child: 'Emma',
      points: 35,
      status: 'completed',
      date: new Date(2026, 0, 6),
    },
  ];

  const recentEarnings = [
    { task: 'Clean room', points: 15, date: 'Today', child: 'Emma' },
    { task: 'Homework completed', points: 20, date: 'Yesterday', child: 'Emma' },
    { task: 'Help with dishes', points: 10, date: 'Yesterday', child: 'Emma' },
  ];

  const selectedChildData = children.find((c) => c.id === selectedChild);

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">Rewards</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Motivate your family with points and rewards
        </p>
      </div>

      {/* Child Selector */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {children.map((child) => (
          <button
            key={child.id}
            onClick={() => setSelectedChild(child.id)}
            className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all ${
              selectedChild === child.id
                ? 'bg-gradient-sunset text-white shadow-lg scale-105'
                : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Avatar name={child.name} color={child.color} size="md" />
            <div className="text-left">
              <p className="font-semibold">{child.name}</p>
              <p className="text-sm opacity-90">{child.points} points</p>
            </div>
          </button>
        ))}
      </div>

      {/* Points Summary Card */}
      <Card className="bg-gradient-forest text-white" padding="lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 mb-2">Current Balance</p>
            <h2 className="text-5xl font-bold">{selectedChildData?.points}</h2>
            <p className="text-white/80 mt-2">points</p>
          </div>
          <div className="bg-white/20 p-6 rounded-full">
            <Trophy className="w-12 h-12" />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Rewards */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
            Available Rewards
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rewards.map((reward) => {
              const canAfford = (selectedChildData?.points || 0) >= reward.points;
              return (
                <Card key={reward.id} hover padding="md">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 bg-gradient-ocean rounded-xl flex items-center justify-center text-2xl">
                        {reward.icon}
                      </div>
                      <Badge variant={canAfford ? 'success' : 'neutral'} size="sm">
                        {reward.points} pts
                      </Badge>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {reward.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {reward.description}
                      </p>
                    </div>
                    <Button
                      fullWidth
                      size="sm"
                      variant={canAfford ? 'primary' : 'outline'}
                      disabled={!canAfford}
                    >
                      {canAfford ? 'Claim Reward' : 'Not Enough Points'}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Earnings */}
          <Card padding="md">
            <CardHeader>
              <CardTitle>Recent Earnings</CardTitle>
              <CardDescription>Points earned this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentEarnings.map((earning, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {earning.task}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{earning.date}</p>
                    </div>
                    <Badge variant="success" size="sm">
                      +{earning.points}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Claims */}
          <Card padding="md">
            <CardHeader>
              <CardTitle>Pending Claims</CardTitle>
              <CardDescription>Awaiting parent approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {claims
                  .filter((c) => c.status === 'pending')
                  .map((claim) => (
                    <div
                      key={claim.id}
                      className="p-3 bg-warning/10 border border-warning/20 rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {claim.reward}
                        </p>
                        <Badge variant="warning" size="sm">
                          {claim.points} pts
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                        {claim.child} • {claim.date.toLocaleDateString()}
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="primary" fullWidth>
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" fullWidth>
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                {claims.filter((c) => c.status === 'pending').length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                    No pending claims
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
