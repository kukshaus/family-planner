/**
 * Seed data for local database
 * Initialize app with sample data
 */

import { localDB } from './localDB';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'parent' | 'child' | 'guest';
  familyId: string;
  avatar?: string;
  points: number;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  assignedTo: string;
  assignedToName: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  points: number;
  dueDate: string;
  dueTime?: string;
  familyId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  _id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  startTime: string;
  endTime?: string;
  location?: string;
  attendees: string[];
  color: string;
  familyId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Meal {
  _id: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  name: string;
  description?: string;
  recipe?: string;
  calories?: number;
  notes?: string;
  familyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ListItem {
  _id: string;
  listType: 'shopping' | 'todo' | 'packing';
  name: string;
  quantity?: string;
  category?: string;
  checked: boolean;
  icon?: string;
  familyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Photo {
  _id: string;
  title: string;
  description?: string;
  url: string;
  thumbnail?: string;
  albumId?: string;
  uploadedBy: string;
  tags?: string[];
  familyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Reward {
  _id: string;
  name: string;
  description?: string;
  pointsCost: number;
  icon?: string;
  available: boolean;
  familyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SleepEntry {
  _id: string;
  userId: string;
  userName: string;
  date: string;
  bedtime: string;
  wakeTime: string;
  duration: number;
  quality: 'poor' | 'fair' | 'good' | 'excellent';
  notes?: string;
  familyId: string;
  createdAt: string;
  updatedAt: string;
}

const FAMILY_ID = 'demo_family_1';
const TODAY = new Date().toISOString().split('T')[0];

export function initializeSeedData() {
  // Check if data already exists
  if (localDB.count('users') > 0) {
    console.log('Database already initialized');
    return;
  }

  console.log('Initializing seed data...');

  // Users
  const users: Omit<User, '_id' | 'createdAt' | 'updatedAt'>[] = [
    {
      name: 'Sarah',
      email: 'sarah@family.com',
      role: 'admin',
      familyId: FAMILY_ID,
      avatar: '👩',
      points: 245,
      color: '#6366F1',
    },
    {
      name: 'Mike',
      email: 'mike@family.com',
      role: 'parent',
      familyId: FAMILY_ID,
      avatar: '👨',
      points: 198,
      color: '#F59E0B',
    },
    {
      name: 'Emma',
      email: 'emma@family.com',
      role: 'child',
      familyId: FAMILY_ID,
      avatar: '👧',
      points: 156,
      color: '#EC4899',
    },
    {
      name: 'Jake',
      email: 'jake@family.com',
      role: 'child',
      familyId: FAMILY_ID,
      avatar: '👦',
      points: 142,
      color: '#10B981',
    },
  ];

  localDB.insertMany('users', users);

  // Tasks
  const tasks: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>[] = [
    {
      title: 'Clean kitchen',
      description: 'Wipe counters and load dishwasher',
      assignedTo: 'emma',
      assignedToName: 'Emma',
      priority: 'medium',
      status: 'pending',
      points: 20,
      dueDate: TODAY,
      dueTime: '14:00',
      familyId: FAMILY_ID,
      createdBy: 'sarah',
    },
    {
      title: 'Grocery shopping',
      description: 'Get items from shopping list',
      assignedTo: 'sarah',
      assignedToName: 'Sarah',
      priority: 'high',
      status: 'in-progress',
      points: 30,
      dueDate: TODAY,
      dueTime: '16:00',
      familyId: FAMILY_ID,
      createdBy: 'sarah',
    },
    {
      title: 'Walk the dog',
      assignedTo: 'jake',
      assignedToName: 'Jake',
      priority: 'low',
      status: 'pending',
      points: 10,
      dueDate: TODAY,
      dueTime: '17:00',
      familyId: FAMILY_ID,
      createdBy: 'mike',
    },
    {
      title: 'Homework - Math',
      description: 'Complete chapter 5 exercises',
      assignedTo: 'emma',
      assignedToName: 'Emma',
      priority: 'high',
      status: 'completed',
      points: 25,
      dueDate: TODAY,
      familyId: FAMILY_ID,
      createdBy: 'sarah',
    },
    {
      title: 'Organize garage',
      assignedTo: 'mike',
      assignedToName: 'Mike',
      priority: 'medium',
      status: 'pending',
      points: 40,
      dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      familyId: FAMILY_ID,
      createdBy: 'sarah',
    },
  ];

  localDB.insertMany('tasks', tasks);

  // Events
  const events: Omit<Event, '_id' | 'createdAt' | 'updatedAt'>[] = [
    {
      title: 'Doctor Appointment',
      description: 'Annual checkup for Emma',
      startDate: TODAY,
      startTime: '10:30',
      endTime: '11:30',
      location: 'City Medical Center',
      attendees: ['sarah', 'emma'],
      color: '#EF4444',
      familyId: FAMILY_ID,
      createdBy: 'sarah',
    },
    {
      title: 'Soccer Practice',
      startDate: TODAY,
      startTime: '16:00',
      endTime: '17:30',
      location: 'Community Sports Field',
      attendees: ['jake'],
      color: '#3B82F6',
      familyId: FAMILY_ID,
      createdBy: 'mike',
    },
    {
      title: 'Family Dinner',
      description: 'Weekly family meal',
      startDate: TODAY,
      startTime: '18:30',
      endTime: '20:00',
      location: 'Home',
      attendees: ['sarah', 'mike', 'emma', 'jake'],
      color: '#F59E0B',
      familyId: FAMILY_ID,
      createdBy: 'sarah',
    },
    {
      title: 'Movie Night',
      description: 'Family movie at home',
      startDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      startTime: '19:00',
      location: 'Home',
      attendees: ['sarah', 'mike', 'emma', 'jake'],
      color: '#EC4899',
      familyId: FAMILY_ID,
      createdBy: 'mike',
    },
  ];

  localDB.insertMany('events', events);

  // Meals
  const meals: Omit<Meal, '_id' | 'createdAt' | 'updatedAt'>[] = [
    {
      date: TODAY,
      mealType: 'breakfast',
      name: 'Avocado Toast with Poached Egg',
      calories: 320,
      familyId: FAMILY_ID,
    },
    {
      date: TODAY,
      mealType: 'lunch',
      name: 'Quinoa Salad with Lemon Vinaigrette',
      calories: 450,
      familyId: FAMILY_ID,
    },
    {
      date: TODAY,
      mealType: 'dinner',
      name: 'Grilled Salmon with Vegetables',
      calories: 520,
      notes: 'Kids favorite!',
      familyId: FAMILY_ID,
    },
    {
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      mealType: 'breakfast',
      name: 'Oatmeal with Berries',
      calories: 280,
      familyId: FAMILY_ID,
    },
  ];

  localDB.insertMany('meals', meals);

  // Shopping List
  const listItems: Omit<ListItem, '_id' | 'createdAt' | 'updatedAt'>[] = [
    { listType: 'shopping', name: 'Avocados', quantity: '2 pc', category: 'Produce', checked: true, icon: '🥑', familyId: FAMILY_ID },
    { listType: 'shopping', name: 'Salmon Fillets', quantity: '150g', category: 'Seafood', checked: true, icon: '🐟', familyId: FAMILY_ID },
    { listType: 'shopping', name: 'Yogurt', quantity: '200g', category: 'Dairy', checked: false, icon: '🥛', familyId: FAMILY_ID },
    { listType: 'shopping', name: 'Dark chocolate almonds', quantity: '50g', category: 'Snacks', checked: false, icon: '🍫', familyId: FAMILY_ID },
    { listType: 'shopping', name: 'Red Onion', quantity: '1/4 piece', category: 'Produce', checked: false, icon: '🧅', familyId: FAMILY_ID },
    { listType: 'shopping', name: 'Lettuce', quantity: '2 pc', category: 'Produce', checked: false, icon: '🥬', familyId: FAMILY_ID },
    { listType: 'shopping', name: 'Bread', quantity: '1 loaf', category: 'Bakery', checked: false, icon: '🍞', familyId: FAMILY_ID },
    { listType: 'shopping', name: 'Eggs', quantity: '12 pc', category: 'Dairy', checked: false, icon: '🥚', familyId: FAMILY_ID },
  ];

  localDB.insertMany('lists', listItems);

  // Photos
  const photos: Omit<Photo, '_id' | 'createdAt' | 'updatedAt'>[] = [
    {
      title: 'Birthday Party',
      url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400',
      uploadedBy: 'sarah',
      tags: ['birthday', 'celebration'],
      familyId: FAMILY_ID,
    },
    {
      title: 'Beach Day',
      url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400',
      uploadedBy: 'mike',
      tags: ['vacation', 'summer'],
      familyId: FAMILY_ID,
    },
    {
      title: 'Park Visit',
      url: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=400',
      uploadedBy: 'sarah',
      tags: ['outdoor', 'fun'],
      familyId: FAMILY_ID,
    },
    {
      title: 'Game Night',
      url: 'https://images.unsplash.com/photo-1543168256-418811576931?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1543168256-418811576931?w=400',
      uploadedBy: 'mike',
      tags: ['indoor', 'games'],
      familyId: FAMILY_ID,
    },
  ];

  localDB.insertMany('photos', photos);

  // Rewards
  const rewards: Omit<Reward, '_id' | 'createdAt' | 'updatedAt'>[] = [
    {
      name: 'Extra Screen Time',
      description: '30 minutes of extra screen time',
      pointsCost: 50,
      icon: '📱',
      available: true,
      familyId: FAMILY_ID,
    },
    {
      name: 'Choose Dinner',
      description: 'Pick what the family has for dinner',
      pointsCost: 75,
      icon: '🍕',
      available: true,
      familyId: FAMILY_ID,
    },
    {
      name: 'Movie Night Pick',
      description: 'Choose the movie for family movie night',
      pointsCost: 60,
      icon: '🎬',
      available: true,
      familyId: FAMILY_ID,
    },
    {
      name: 'Sleep In Saturday',
      description: 'Sleep in on Saturday morning',
      pointsCost: 100,
      icon: '😴',
      available: true,
      familyId: FAMILY_ID,
    },
    {
      name: 'Ice Cream Trip',
      description: 'Family trip to the ice cream shop',
      pointsCost: 80,
      icon: '🍦',
      available: true,
      familyId: FAMILY_ID,
    },
  ];

  localDB.insertMany('rewards', rewards);

  // Sleep Entries
  const sleepEntries: Omit<SleepEntry, '_id' | 'createdAt' | 'updatedAt'>[] = [
    {
      userId: 'emma',
      userName: 'Emma',
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      bedtime: '21:00',
      wakeTime: '07:00',
      duration: 10,
      quality: 'excellent',
      familyId: FAMILY_ID,
    },
    {
      userId: 'jake',
      userName: 'Jake',
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      bedtime: '21:30',
      wakeTime: '07:30',
      duration: 10,
      quality: 'good',
      familyId: FAMILY_ID,
    },
    {
      userId: 'emma',
      userName: 'Emma',
      date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
      bedtime: '21:15',
      wakeTime: '06:45',
      duration: 9.5,
      quality: 'good',
      familyId: FAMILY_ID,
    },
  ];

  localDB.insertMany('sleepEntries', sleepEntries);

  console.log('Seed data initialized successfully!');
}

// Initialize on module load (browser only)
if (typeof window !== 'undefined') {
  initializeSeedData();
}
