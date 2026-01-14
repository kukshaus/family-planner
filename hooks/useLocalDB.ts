/**
 * Custom React hooks for Local Database
 * Easy-to-use hooks for CRUD operations
 */

import { useState, useEffect, useCallback } from 'react';
import { localDB, Collection } from '@/lib/localDB';
import type { Task, Event, Meal, ListItem, Photo, Reward, SleepEntry, User } from '@/lib/seedData';

/**
 * Generic hook for any collection
 */
export function useCollection<T>(collection: Collection, filter?: Partial<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setLoading(true);
    const items = localDB.findAll<T>(collection, filter);
    setData(items);
    setLoading(false);
  }, [collection, filter]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const create = useCallback((item: Omit<T, '_id' | 'createdAt' | 'updatedAt'>) => {
    const newItem = localDB.insertOne<T>(collection, item);
    refresh();
    return newItem;
  }, [collection, refresh]);

  const update = useCallback((id: string, updates: Partial<T>) => {
    const updated = localDB.updateById<T>(collection, id, updates);
    refresh();
    return updated;
  }, [collection, refresh]);

  const remove = useCallback((id: string) => {
    const success = localDB.deleteById<T>(collection, id);
    refresh();
    return success;
  }, [collection, refresh]);

  return { data, loading, refresh, create, update, remove };
}

/**
 * Hook for Tasks
 */
export function useTasks(filter?: Partial<Task>) {
  return useCollection<Task>('tasks', filter);
}

/**
 * Hook for Events
 */
export function useEvents(filter?: Partial<Event>) {
  return useCollection<Event>('events', filter);
}

/**
 * Hook for Meals
 */
export function useMeals(filter?: Partial<Meal>) {
  return useCollection<Meal>('meals', filter);
}

/**
 * Hook for List Items
 */
export function useListItems(listType?: 'shopping' | 'todo' | 'packing') {
  const filter = listType ? { listType } : undefined;
  return useCollection<ListItem>('lists', filter as Partial<ListItem>);
}

/**
 * Hook for Photos
 */
export function usePhotos(filter?: Partial<Photo>) {
  return useCollection<Photo>('photos', filter);
}

/**
 * Hook for Rewards
 */
export function useRewards(filter?: Partial<Reward>) {
  return useCollection<Reward>('rewards', filter);
}

/**
 * Hook for Sleep Entries
 */
export function useSleepEntries(filter?: Partial<SleepEntry>) {
  return useCollection<SleepEntry>('sleepEntries', filter);
}

/**
 * Hook for Users/Family Members
 */
export function useUsers(filter?: Partial<User>) {
  return useCollection<User>('users', filter);
}

/**
 * Hook for single item by ID
 */
export function useItem<T>(collection: Collection, id: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const item = localDB.findById<T>(collection, id);
    setData(item);
    setLoading(false);
  }, [collection, id]);

  return { data, loading };
}

/**
 * Hook for task statistics
 */
export function useTaskStats() {
  const { data: tasks } = useTasks();

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    today: tasks.filter(t => t.dueDate === new Date().toISOString().split('T')[0]).length,
  };

  return stats;
}

/**
 * Hook for calendar events (filtered by date range)
 */
export function useCalendarEvents(startDate: string, endDate: string) {
  const { data: allEvents, ...rest } = useEvents();

  const events = allEvents.filter(event => {
    return event.startDate >= startDate && event.startDate <= endDate;
  });

  return { data: events, ...rest };
}

/**
 * Hook for today's meals
 */
export function useTodaysMeals() {
  const today = new Date().toISOString().split('T')[0];
  return useMeals({ date: today } as Partial<Meal>);
}

/**
 * Hook for weekly meal plan
 */
export function useWeeklyMeals(weekStartDate: string) {
  const { data: allMeals, ...rest } = useMeals();

  const startDate = new Date(weekStartDate);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 7);

  const meals = allMeals.filter(meal => {
    const mealDate = new Date(meal.date);
    return mealDate >= startDate && mealDate < endDate;
  });

  return { data: meals, ...rest };
}

/**
 * Hook for user points leaderboard
 */
export function useLeaderboard() {
  const { data: users } = useUsers();
  
  const leaderboard = [...users]
    .sort((a, b) => b.points - a.points)
    .map((user, index) => ({
      ...user,
      rank: index + 1,
    }));

  return leaderboard;
}

/**
 * Hook for managing task completion
 */
export function useTaskCompletion() {
  const { update } = useTasks();

  const completeTask = useCallback((taskId: string, userId: string) => {
    // Mark task as completed
    const task = localDB.findById<Task>('tasks', taskId);
    if (!task) return false;

    update(taskId, { status: 'completed' } as Partial<Task>);

    // Award points to user
    const user = localDB.findById<User>('users', userId);
    if (user) {
      localDB.updateById<User>('users', userId, {
        points: user.points + task.points,
      } as Partial<User>);
    }

    return true;
  }, [update]);

  return { completeTask };
}

/**
 * Hook for claiming rewards
 */
export function useRewardClaim() {
  const claimReward = useCallback((rewardId: string, userId: string) => {
    const reward = localDB.findById<Reward>('rewards', rewardId);
    const user = localDB.findById<User>('users', userId);

    if (!reward || !user) return { success: false, message: 'Reward or user not found' };

    if (user.points < reward.pointsCost) {
      return { success: false, message: 'Not enough points' };
    }

    // Deduct points
    localDB.updateById<User>('users', userId, {
      points: user.points - reward.pointsCost,
    } as Partial<User>);

    // Create reward claim record
    localDB.insertOne('rewardClaims', {
      rewardId,
      rewardName: reward.name,
      userId,
      userName: user.name,
      pointsCost: reward.pointsCost,
      claimedAt: new Date().toISOString(),
      status: 'claimed',
      familyId: user.familyId,
    });

    return { success: true, message: 'Reward claimed successfully!' };
  }, []);

  return { claimReward };
}
