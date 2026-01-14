'use client';

import { useState } from 'react';
import { Plus, Moon, Sun, Clock, TrendingUp, Trash2, X } from 'lucide-react';
import { useSleepEntries, useUsers } from '@/hooks/useLocalDB';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientBadge } from '@/components/ui/GradientBadge';
import { ProgressRing } from '@/components/ui/ProgressRing';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function SleepPage() {
  const { data: sleepRecords, loading, create, update, remove } = useSleepEntries();
  const { data: users } = useUsers();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string>('all');

  const [newRecord, setNewRecord] = useState({
    userId: 'sarah',
    date: new Date().toISOString().split('T')[0],
    bedtime: '22:00',
    wakeTime: '07:00',
    quality: 4,
    notes: '',
  });

  const qualityLabels = [
    { value: 1, label: 'Poor', emoji: '😴', color: 'text-red-500' },
    { value: 2, label: 'Fair', emoji: '😐', color: 'text-orange-500' },
    { value: 3, label: 'Good', emoji: '🙂', color: 'text-yellow-500' },
    { value: 4, label: 'Great', emoji: '😊', color: 'text-green-500' },
    { value: 5, label: 'Excellent', emoji: '😄', color: 'text-emerald-500' },
  ];

  const calculateSleepHours = (bedtime: string, wakeTime: string) => {
    const [bedHour, bedMin] = bedtime.split(':').map(Number);
    const [wakeHour, wakeMin] = wakeTime.split(':').map(Number);
    
    let bedMinutes = bedHour * 60 + bedMin;
    let wakeMinutes = wakeHour * 60 + wakeMin;
    
    // If wake time is "earlier" than bedtime, add 24 hours
    if (wakeMinutes <= bedMinutes) {
      wakeMinutes += 24 * 60;
    }
    
    const totalMinutes = wakeMinutes - bedMinutes;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return { hours, minutes, total: totalMinutes / 60 };
  };

  const handleCreate = () => {
    if (!newRecord.userId || !newRecord.date || !newRecord.bedtime || !newRecord.wakeTime) return;

    const { total } = calculateSleepHours(newRecord.bedtime, newRecord.wakeTime);

    create({
      userId: newRecord.userId,
      date: newRecord.date,
      bedtime: newRecord.bedtime,
      wakeTime: newRecord.wakeTime,
      duration: total,
      quality: newRecord.quality,
      notes: newRecord.notes,
      familyId: 'demo_family_1',
    });

    setNewRecord({
      userId: 'sarah',
      date: new Date().toISOString().split('T')[0],
      bedtime: '22:00',
      wakeTime: '07:00',
      quality: 4,
      notes: '',
    });
    setShowAddModal(false);
  };

  const handleDelete = (recordId: string) => {
    if (confirm('Are you sure you want to delete this sleep record?')) {
      remove(recordId);
    }
  };

  const filteredRecords = selectedUser === 'all'
    ? sleepRecords
    : sleepRecords.filter(r => r.userId === selectedUser);

  // Calculate stats
  const getAverageSleep = (userId?: string) => {
    const records = userId
      ? sleepRecords.filter(r => r.userId === userId)
      : sleepRecords;
    if (records.length === 0) return 0;
    const total = records.reduce((sum, r) => sum + r.duration, 0);
    return total / records.length;
  };

  const getQualityAverage = (userId?: string) => {
    const records = userId
      ? sleepRecords.filter(r => r.userId === userId)
      : sleepRecords;
    if (records.length === 0) return 0;
    const total = records.reduce((sum, r) => sum + r.quality, 0);
    return total / records.length;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white">
            Sleep Tracking
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {filteredRecords.length} sleep records logged
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Log Sleep
        </Button>
      </div>

      {/* User Filter */}
      <div className="flex gap-3 overflow-x-auto hide-scrollbar">
        <button
          onClick={() => setSelectedUser('all')}
          className={cn(
            'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap',
            selectedUser === 'all'
              ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          )}
        >
          All Family
        </button>
        {users.map(user => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user._id)}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap',
              selectedUser === user._id
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            )}
          >
            {user.avatar} {user.name}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {selectedUser === 'all' ? (
          users.map(user => {
            const avgSleep = getAverageSleep(user._id);
            const avgQuality = getQualityAverage(user._id);
            const sleepPercentage = Math.min((avgSleep / 8) * 100, 100);
            return (
              <GlassCard key={user._id} className="p-6">
                <div className="flex items-center gap-4">
                  <ProgressRing
                    progress={sleepPercentage}
                    size="md"
                    strokeWidth={8}
                    color="indigo"
                  >
                    <span className="text-3xl">{user.avatar}</span>
                  </ProgressRing>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white mb-1">
                      {user.name}
                    </div>
                    <div className="text-2xl font-bold text-primary-500">
                      {avgSleep.toFixed(1)}h
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Avg. sleep
                    </div>
                  </div>
                </div>
              </GlassCard>
            );
          })
        ) : (
          <>
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                  <Moon className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Average Sleep
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {getAverageSleep(selectedUser).toFixed(1)}h
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Avg. Quality
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {getQualityAverage(selectedUser).toFixed(1)}/5
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Total Records
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {filteredRecords.length}
              </div>
            </GlassCard>
          </>
        )}
      </div>

      {/* Sleep Records */}
      {filteredRecords.length > 0 ? (
        <div className="space-y-3">
          {filteredRecords
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map(record => {
              const user = users.find(u => u._id === record.userId);
              const qualityInfo = qualityLabels.find(q => q.value === record.quality) || qualityLabels[2];
              return (
                <GlassCard key={record._id} className="p-6 hover-lift">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{user?.avatar || '👤'}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                            {user?.name || 'Unknown'}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(record.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDelete(record._id)}
                          className="p-2 hover:bg-error-50 dark:hover:bg-error-900/20 rounded-lg transition-colors text-error-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                            <Moon className="w-4 h-4" />
                            <span>Bedtime</span>
                          </div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {record.bedtime}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                            <Sun className="w-4 h-4" />
                            <span>Wake Time</span>
                          </div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {record.wakeTime}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                            <Clock className="w-4 h-4" />
                            <span>Duration</span>
                          </div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {record.duration.toFixed(1)}h
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                            <span>Quality</span>
                          </div>
                          <div className={cn('font-semibold text-xl', qualityInfo.color)}>
                            {qualityInfo.emoji} {qualityInfo.label}
                          </div>
                        </div>
                      </div>

                      {record.notes && (
                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 italic">
                          {record.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </GlassCard>
              );
            })}
        </div>
      ) : (
        <GlassCard className="p-12 text-center">
          <Moon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No sleep records yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Start tracking your family's sleep patterns!
          </p>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="w-5 h-5 mr-2" />
            Log Sleep
          </Button>
        </GlassCard>
      )}

      {/* Add Sleep Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-lg animate-scale-in">
            <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              {/* Gradient Header */}
              <div className="relative h-32 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-pink-500/20" />
                <button
                  onClick={() => setShowAddModal(false)}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white transition-all hover:scale-110 active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute -bottom-8 left-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl flex items-center justify-center border-4 border-white dark:border-gray-900">
                    <Moon className="w-8 h-8 text-indigo-500" strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 pt-14 max-h-[calc(90vh-8rem)] overflow-y-auto custom-scrollbar">
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                  Log Sleep
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Record a sleep session for a family member
                </p>

                <div className="space-y-6">
                  {/* User Selection */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                      Who's sleep? <span className="text-error-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {users.map(user => (
                        <button
                          key={user._id}
                          onClick={() => setNewRecord({ ...newRecord, userId: user._id })}
                          className={cn(
                            'px-4 py-3 rounded-xl font-medium transition-all text-sm flex items-center gap-2',
                            newRecord.userId === user._id
                              ? 'bg-primary-500 text-white'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          )}
                        >
                          <span className="text-xl">{user.avatar}</span>
                          {user.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                      Date
                    </label>
                    <input
                      type="date"
                      value={newRecord.date}
                      onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-medium"
                    />
                  </div>

                  {/* Times */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                        Bedtime
                      </label>
                      <input
                        type="time"
                        value={newRecord.bedtime}
                        onChange={(e) => setNewRecord({ ...newRecord, bedtime: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                        Wake Time
                      </label>
                      <input
                        type="time"
                        value={newRecord.wakeTime}
                        onChange={(e) => setNewRecord({ ...newRecord, wakeTime: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Duration Preview */}
                  <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                    <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      Total Sleep Duration
                    </div>
                    <div className="text-2xl font-bold text-primary-500">
                      {(() => {
                        const { hours, minutes } = calculateSleepHours(newRecord.bedtime, newRecord.wakeTime);
                        return `${hours}h ${minutes}m`;
                      })()}
                    </div>
                  </div>

                  {/* Sleep Quality */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                      Sleep Quality
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {qualityLabels.map(quality => (
                        <button
                          key={quality.value}
                          onClick={() => setNewRecord({ ...newRecord, quality: quality.value })}
                          className={cn(
                            'p-3 rounded-xl transition-all flex flex-col items-center gap-1',
                            newRecord.quality === quality.value
                              ? 'bg-primary-500 scale-105'
                              : 'bg-gray-100 dark:bg-gray-800 hover:scale-105'
                          )}
                        >
                          <span className="text-2xl">{quality.emoji}</span>
                          <span className={cn(
                            'text-xs font-semibold',
                            newRecord.quality === quality.value
                              ? 'text-white'
                              : 'text-gray-600 dark:text-gray-400'
                          )}>
                            {quality.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                      Notes (optional)
                    </label>
                    <textarea
                      value={newRecord.notes}
                      onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 min-h-[80px] resize-none"
                      placeholder="How was the sleep? Any issues?"
                    />
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
                    className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40"
                    onClick={handleCreate}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Log Sleep
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
