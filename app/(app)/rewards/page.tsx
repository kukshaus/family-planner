'use client';

import { useState } from 'react';
import { Plus, Trophy, Star, Target, Gift, Trash2, X, CheckCircle } from 'lucide-react';
import { useRewards, useUsers } from '@/hooks/useLocalDB';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientBadge } from '@/components/ui/GradientBadge';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function RewardsPage() {
  const { data: rewards, loading, create, update, remove } = useRewards();
  const { data: users } = useUsers();
  const [showAddModal, setShowAddModal] = useState(false);

  const [newReward, setNewReward] = useState({
    name: '',
    description: '',
    pointsCost: 100,
    icon: '🎁',
    category: 'material',
  });

  const rewardIcons = [
    '🎁', '🎮', '🍕', '🍦', '🎬', '📱', '🎨', '⚽', '🎸', '📚',
    '🎯', '🏆', '⭐', '💎', '🎪', '🎢', '🎭', '🎤', '🎧', '🎹'
  ];

  const categories = [
    { value: 'material', label: 'Material', color: 'from-purple-500 to-pink-500' },
    { value: 'experience', label: 'Experience', color: 'from-blue-500 to-cyan-500' },
    { value: 'privilege', label: 'Privilege', color: 'from-green-500 to-emerald-500' },
    { value: 'special', label: 'Special', color: 'from-orange-500 to-red-500' },
  ];

  const handleCreate = () => {
    if (!newReward.name || !newReward.pointsCost) return;

    create({
      name: newReward.name,
      description: newReward.description,
      pointsCost: Number(newReward.pointsCost),
      icon: newReward.icon,
      category: newReward.category,
      available: true,
      familyId: 'demo_family_1',
    });

    setNewReward({
      name: '',
      description: '',
      pointsCost: 100,
      icon: '🎁',
      category: 'material',
    });
    setShowAddModal(false);
  };

  const handleClaim = (rewardId: string, rewardName: string) => {
    if (confirm(`Claim "${rewardName}"? This will deduct points from your account.`)) {
      // In a real app, you'd track claims and deduct points
      alert('Reward claimed! (In production, this would deduct points and track claims)');
    }
  };

  const handleDelete = (rewardId: string) => {
    if (confirm('Are you sure you want to delete this reward?')) {
      remove(rewardId);
    }
  };

  const groupedRewards = categories.map(cat => ({
    ...cat,
    rewards: rewards.filter(r => r.category === cat.value)
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white">
            Rewards
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {rewards.length} rewards available
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Add Reward
        </Button>
      </div>

      {/* Top Performers */}
      <GlassCard className="p-6">
        <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
          🏆 Family Points
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {users.map(user => (
            <div key={user._id} className="flex items-center gap-3">
              <div className="text-3xl">{user.avatar}</div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-white">{user.name}</div>
                <div className="text-sm text-primary-500 font-bold">{user.points} pts</div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Rewards by Category */}
      {groupedRewards.map(group => (
        group.rewards.length > 0 && (
          <div key={group.value}>
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              {group.label} Rewards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.rewards.map(reward => (
                <GlassCard key={reward._id} className="p-6 hover-lift relative group">
                  <button
                    onClick={() => handleDelete(reward._id)}
                    className="absolute top-4 right-4 p-2 opacity-0 group-hover:opacity-100 hover:bg-error-50 dark:hover:bg-error-900/20 rounded-lg transition-all text-error-500 z-10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-start gap-4">
                    <div className={cn(
                      'w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 bg-gradient-to-br',
                      group.color
                    )}>
                      {reward.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                        {reward.name}
                      </h3>
                      {reward.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {reward.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-bold text-gray-900 dark:text-white">
                            {reward.pointsCost}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            pts
                          </span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleClaim(reward._id, reward.name)}
                          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                        >
                          <Gift className="w-4 h-4 mr-1" />
                          Claim
                        </Button>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )
      ))}

      {rewards.length === 0 && (
        <GlassCard className="p-12 text-center">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No rewards yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Create rewards to motivate your family!
          </p>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="w-5 h-5 mr-2" />
            Add Reward
          </Button>
        </GlassCard>
      )}

      {/* Add Reward Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-lg animate-scale-in">
            <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              {/* Gradient Header */}
              <div className="relative h-32 bg-gradient-to-br from-purple-500 via-pink-600 to-red-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-red-500/20" />
                <button
                  onClick={() => setShowAddModal(false)}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white transition-all hover:scale-110 active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute -bottom-8 left-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl flex items-center justify-center border-4 border-white dark:border-gray-900">
                    <Trophy className="w-8 h-8 text-purple-500" strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 pt-14 max-h-[calc(90vh-8rem)] overflow-y-auto custom-scrollbar">
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                  Create Reward
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Add a new reward to motivate your family
                </p>

                <div className="space-y-6">
                  {/* Reward Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                      Reward Name <span className="text-error-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newReward.name}
                      onChange={(e) => setNewReward({ ...newReward, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 font-medium"
                      placeholder="e.g., Movie Night"
                      autoFocus
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                      Description
                    </label>
                    <textarea
                      value={newReward.description}
                      onChange={(e) => setNewReward({ ...newReward, description: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 min-h-[80px] resize-none"
                      placeholder="Describe the reward..."
                    />
                  </div>

                  {/* Points */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                      Points Required <span className="text-error-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={newReward.pointsCost}
                      onChange={(e) => setNewReward({ ...newReward, pointsCost: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 font-medium"
                      placeholder="100"
                      min="1"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                      Category
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {categories.map(cat => (
                        <button
                          key={cat.value}
                          onClick={() => setNewReward({ ...newReward, category: cat.value })}
                          className={cn(
                            'px-4 py-3 rounded-xl font-medium transition-all text-sm',
                            newReward.category === cat.value
                              ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          )}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Icon Picker */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                      Icon
                    </label>
                    <div className="grid grid-cols-10 gap-2">
                      {rewardIcons.map(icon => (
                        <button
                          key={icon}
                          onClick={() => setNewReward({ ...newReward, icon })}
                          className={cn(
                            'p-3 text-2xl rounded-xl transition-all',
                            newReward.icon === icon
                              ? 'bg-primary-500 scale-110'
                              : 'bg-gray-100 dark:bg-gray-800 hover:scale-105'
                          )}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-8 py-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">
                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleCreate}
                    disabled={!newReward.name || !newReward.pointsCost}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create Reward
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
