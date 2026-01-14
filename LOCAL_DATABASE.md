# 🗄️ Local Database System

## Overview

A fast, easy-to-use **local storage database** that mimics MongoDB operations. All CRUD operations work immediately without any backend setup!

---

## ✨ Features

✅ **Zero Setup** - Works immediately, no configuration needed  
✅ **MongoDB-like API** - Familiar operations (find, insert, update, delete)  
✅ **TypeScript Support** - Fully typed for safety  
✅ **React Hooks** - Easy integration with React components  
✅ **Auto-Initialize** - Seed data loads automatically  
✅ **Persistent** - Uses localStorage to save data  
✅ **Fast** - Instant operations, no network delays  
✅ **Easy Migration** - Ready to swap with real MongoDB later  

---

## 🚀 Quick Start

### 1. **It's Already Working!**

The database auto-initializes with sample data when your app loads. Just start using it!

### 2. **Use in Your Components**

```tsx
import { useTasks } from '@/hooks/useLocalDB';

export default function MyComponent() {
  const { data: tasks, create, update, remove } = useTasks();

  // Display tasks
  // Add new tasks
  // Update tasks  
  // Delete tasks
}
```

### 3. **That's It!**

All operations are instant and persist automatically!

---

## 📚 Available Hooks

### Task Management
```tsx
const { data, loading, create, update, remove, refresh } = useTasks();

// Create a task
create({
  title: 'Clean kitchen',
  assignedTo: 'emma',
  assignedToName: 'Emma',
  priority: 'high',
  status: 'pending',
  points: 20,
  dueDate: '2026-01-15',
  familyId: 'demo_family_1',
  createdBy: 'sarah',
});

// Update a task
update(taskId, { status: 'completed' });

// Delete a task
remove(taskId);
```

### Events/Calendar
```tsx
const { data: events, create, update, remove } = useEvents();

create({
  title: 'Doctor Appointment',
  startDate: '2026-01-15',
  startTime: '10:30',
  attendees: ['sarah', 'emma'],
  color: '#EF4444',
  familyId: 'demo_family_1',
  createdBy: 'sarah',
});
```

### Meals
```tsx
const { data: meals, create, update, remove } = useMeals();

// Get today's meals
const { data: todaysMeals } = useTodaysMeals();

// Get weekly meals
const { data: weeklyMeals } = useWeeklyMeals('2026-01-13');
```

### Shopping Lists
```tsx
const { data: items, create, update, remove } = useListItems('shopping');

create({
  listType: 'shopping',
  name: 'Milk',
  quantity: '1L',
  checked: false,
  icon: '🥛',
  familyId: 'demo_family_1',
});

// Toggle checked
update(itemId, { checked: true });
```

### Photos
```tsx
const { data: photos, create, update, remove } = usePhotos();
```

### Rewards
```tsx
const { data: rewards, create, update, remove } = useRewards();

// Claim a reward
const { claimReward } = useRewardClaim();
const result = claimReward(rewardId, userId);
```

### Sleep Tracking
```tsx
const { data: sleepEntries, create, update, remove } = useSleepEntries();
```

### Users/Family Members
```tsx
const { data: users } = useUsers();

// Leaderboard
const leaderboard = useLeaderboard();
```

---

## 🔧 Direct Database Operations

If you need more control, use the database directly:

```tsx
import { localDB } from '@/lib/localDB';

// Find all
const tasks = localDB.findAll('tasks');

// Find with filter
const userTasks = localDB.findAll('tasks', { assignedTo: 'emma' });

// Find one
const task = localDB.findById('tasks', taskId);

// Insert
const newTask = localDB.insertOne('tasks', {
  title: 'New task',
  // ... other fields
});

// Update
localDB.updateById('tasks', taskId, { status: 'completed' });

// Delete
localDB.deleteById('tasks', taskId);

// Count
const count = localDB.count('tasks', { status: 'pending' });
```

---

## 📦 Available Collections

| Collection | Description | Hook |
|------------|-------------|------|
| `users` | Family members | `useUsers()` |
| `tasks` | Task items | `useTasks()` |
| `events` | Calendar events | `useEvents()` |
| `meals` | Meal plans | `useMeals()` |
| `lists` | Shopping/todo lists | `useListItems()` |
| `photos` | Photo gallery | `usePhotos()` |
| `rewards` | Rewards catalog | `useRewards()` |
| `sleepEntries` | Sleep tracking | `useSleepEntries()` |
| `rewardClaims` | Claimed rewards | - |
| `albums` | Photo albums | - |
| `families` | Family groups | - |
| `recipes` | Recipe collection | - |
| `settings` | App settings | - |

---

## 🎯 Sample Data

The database comes pre-loaded with:

### Users (4)
- Sarah (Admin) - 245 points
- Mike (Parent) - 198 points
- Emma (Child) - 156 points
- Jake (Child) - 142 points

### Tasks (5)
- Clean kitchen (Emma, 20 pts)
- Grocery shopping (Sarah, 30 pts)
- Walk the dog (Jake, 10 pts)
- Homework - Math (Emma, 25 pts) ✓
- Organize garage (Mike, 40 pts)

### Events (4)
- Doctor Appointment (Today)
- Soccer Practice (Today)
- Family Dinner (Today)
- Movie Night (Tomorrow)

### Meals (4)
- Breakfast, lunch, dinner for today
- Breakfast for tomorrow

### Shopping List (8 items)
- Avocados, Salmon, Yogurt, Chocolate, etc.

### Photos (4)
- Birthday Party, Beach Day, Park Visit, Game Night

### Rewards (5)
- Extra Screen Time (50 pts)
- Choose Dinner (75 pts)
- Movie Night Pick (60 pts)
- Sleep In Saturday (100 pts)
- Ice Cream Trip (80 pts)

---

## 💾 Data Persistence

### localStorage
All data is automatically saved to `localStorage` with these keys:
- `family_planner_users`
- `family_planner_tasks`
- `family_planner_events`
- etc.

### Export Database
```tsx
import { localDB } from '@/lib/localDB';

const backup = localDB.exportDatabase();
console.log(backup); // Save this somewhere
```

### Import Database
```tsx
localDB.importDatabase(backup);
```

### Clear Database
```tsx
// Clear one collection
localDB.clearCollection('tasks');

// Clear everything
localDB.clearDatabase();
```

---

## 🔄 Migration to MongoDB

When ready to switch to MongoDB:

1. **Keep the same interfaces** - Already MongoDB-compatible!
2. **Replace hooks** - Update hook implementations to call API
3. **No component changes needed** - Same API, different backend

Example migration:

```tsx
// Before (Local DB)
const { data: tasks } = useTasks();

// After (MongoDB API)
const { data: tasks } = useTasks(); // Same code!
// Hook now calls: fetch('/api/tasks')
```

---

## 📝 Type Definitions

All types are defined in `/lib/seedData.ts`:

```tsx
interface Task {
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
```

---

## 🎨 Example: Complete CRUD

```tsx
'use client';

import { useTasks } from '@/hooks/useLocalDB';
import Button from '@/components/ui/Button';

export default function TaskExample() {
  const { data: tasks, create, update, remove } = useTasks();

  const handleAdd = () => {
    create({
      title: 'New Task',
      assignedTo: 'emma',
      assignedToName: 'Emma',
      priority: 'medium',
      status: 'pending',
      points: 20,
      dueDate: new Date().toISOString().split('T')[0],
      familyId: 'demo_family_1',
      createdBy: 'sarah',
    });
  };

  const handleComplete = (taskId: string) => {
    update(taskId, { status: 'completed' });
  };

  const handleDelete = (taskId: string) => {
    remove(taskId);
  };

  return (
    <div>
      <Button onClick={handleAdd}>Add Task</Button>
      
      {tasks.map(task => (
        <div key={task._id}>
          <h3>{task.title}</h3>
          <Button onClick={() => handleComplete(task._id)}>
            Complete
          </Button>
          <Button onClick={() => handleDelete(task._id)}>
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
}
```

---

## 🎯 Advanced Usage

### Custom Filters
```tsx
// Filter in hook
const { data: highPriorityTasks } = useTasks({ priority: 'high' });

// Filter manually
const pendingTasks = tasks.filter(t => t.status === 'pending');
```

### Batch Operations
```tsx
// Add multiple items
localDB.insertMany('tasks', [task1, task2, task3]);

// Update multiple
localDB.updateMany('tasks', 
  { status: 'pending' },
  { priority: 'high' }
);

// Delete multiple
localDB.deleteMany('tasks', { status: 'completed' });
```

### Complex Queries
```tsx
// Get tasks due today for specific user
const tasks = localDB.findAll('tasks', {
  assignedTo: 'emma',
  dueDate: new Date().toISOString().split('T')[0],
});

// Count items
const count = localDB.count('tasks', { status: 'completed' });
```

---

## 🚀 Performance

- ⚡ **Instant** - No network latency
- 💾 **5-10MB** - localStorage limit (plenty for demo data)
- 🔄 **Auto-save** - Every change persists immediately
- 📦 **Lightweight** - Only ~200 lines of code

---

## 🎉 Benefits

✅ **Immediate Functionality** - Everything works now!  
✅ **No Backend Required** - Perfect for demos & prototyping  
✅ **Offline First** - Works without internet  
✅ **Easy Testing** - No API mocking needed  
✅ **Real Persistence** - Data survives page reloads  
✅ **Production-Ready Structure** - MongoDB-compatible design  

---

## 📌 Notes

- Data is **per-browser** (not synced across devices)
- **localStorage limit** is ~5-10MB (enough for thousands of items)
- Use **developer tools** to view localStorage data
- **Clear browser data** will delete everything
- Ready to replace with **real MongoDB** anytime!

---

**Your app is fully functional with this local database! 🎉**

Start creating, updating, and deleting data right away!
