'use client';

import { useState } from 'react';
import { Plus, Filter, Search, CheckCircle2, Circle, MoreVertical } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import Input from '@/components/ui/Input';

type TaskStatus = 'all' | 'pending' | 'in-progress' | 'completed';
type Priority = 'low' | 'medium' | 'high';

export default function TasksPage() {
  const [statusFilter, setStatusFilter] = useState<TaskStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock tasks data
  const tasks = [
    {
      id: '1',
      title: 'Clean kitchen',
      description: 'Wipe counters, do dishes, and sweep floor',
      assignedTo: { name: 'Emma', color: '#EC4899', avatar: '' },
      priority: 'medium' as Priority,
      status: 'pending',
      dueDate: new Date(2026, 0, 8, 14, 0),
      category: 'household',
      rewardPoints: 10,
    },
    {
      id: '2',
      title: 'Grocery shopping',
      description: 'Buy items from the shopping list',
      assignedTo: { name: 'Sarah', color: '#6366F1', avatar: '' },
      priority: 'high' as Priority,
      status: 'in-progress',
      dueDate: new Date(2026, 0, 8, 16, 0),
      category: 'shopping',
      rewardPoints: 15,
    },
    {
      id: '3',
      title: 'Walk the dog',
      description: 'Take Max for a 30-minute walk',
      assignedTo: { name: 'Jake', color: '#10B981', avatar: '' },
      priority: 'low' as Priority,
      status: 'pending',
      dueDate: new Date(2026, 0, 8, 17, 0),
      category: 'personal',
      rewardPoints: 5,
    },
    {
      id: '4',
      title: 'Homework - Math',
      description: 'Complete pages 45-47',
      assignedTo: { name: 'Emma', color: '#EC4899', avatar: '' },
      priority: 'high' as Priority,
      status: 'completed',
      dueDate: new Date(2026, 0, 7, 18, 0),
      category: 'personal',
      rewardPoints: 20,
    },
    {
      id: '5',
      title: 'Prepare dinner',
      description: 'Make spaghetti bolognese',
      assignedTo: { name: 'Mike', color: '#F59E0B', avatar: '' },
      priority: 'medium' as Priority,
      status: 'pending',
      dueDate: new Date(2026, 0, 8, 18, 30),
      category: 'household',
      rewardPoints: 15,
    },
  ];

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
  };

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">Tasks</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage household and personal tasks
          </p>
        </div>
        <Button>
          <Plus className="w-5 h-5 mr-2" />
          New Task
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card hover className="cursor-pointer" padding="md">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Tasks</p>
          </div>
        </Card>
        <Card hover className="cursor-pointer" padding="md">
          <div className="text-center">
            <p className="text-3xl font-bold text-warning">{stats.pending}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Pending</p>
          </div>
        </Card>
        <Card hover className="cursor-pointer" padding="md">
          <div className="text-center">
            <p className="text-3xl font-bold text-info">{stats.inProgress}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">In Progress</p>
          </div>
        </Card>
        <Card hover className="cursor-pointer" padding="md">
          <div className="text-center">
            <p className="text-3xl font-bold text-success">{stats.completed}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Completed</p>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card padding="md">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {(['all', 'pending', 'in-progress', 'completed'] as TaskStatus[]).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  statusFilter === status
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <Card key={task.id} hover padding="md">
            <div className="flex items-start gap-4">
              {/* Checkbox */}
              <button className="mt-1 flex-shrink-0">
                {task.status === 'completed' ? (
                  <CheckCircle2 className="w-6 h-6 text-success" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400 hover:text-primary transition-colors" />
                )}
              </button>

              {/* Task Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <h3
                      className={`font-semibold text-lg ${
                        task.status === 'completed'
                          ? 'line-through text-gray-500'
                          : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {task.description}
                    </p>
                  </div>
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Avatar
                      name={task.assignedTo.name}
                      color={task.assignedTo.color}
                      size="sm"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {task.assignedTo.name}
                    </span>
                  </div>

                  <Badge
                    variant={
                      task.priority === 'high'
                        ? 'error'
                        : task.priority === 'medium'
                        ? 'warning'
                        : 'success'
                    }
                    size="sm"
                  >
                    {task.priority}
                  </Badge>

                  <Badge variant="neutral" size="sm">
                    {task.category}
                  </Badge>

                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Due: {task.dueDate.toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </span>

                  {task.rewardPoints && (
                    <div className="flex items-center gap-1 text-warning">
                      <span className="text-sm font-semibold">+{task.rewardPoints} pts</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}

        {filteredTasks.length === 0 && (
          <Card padding="lg">
            <div className="text-center py-12">
              <CheckCircle2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No tasks found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchQuery
                  ? 'Try adjusting your search'
                  : 'Create a new task to get started'}
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
