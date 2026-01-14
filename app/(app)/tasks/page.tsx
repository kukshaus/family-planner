'use client';

import { useState } from 'react';
import { Plus, CheckSquare, Clock, Trash2, Edit2, X } from 'lucide-react';
import { useTasks, useUsers } from '@/hooks/useLocalDB';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientBadge } from '@/components/ui/GradientBadge';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function TasksPage() {
  const { data: tasks, loading, create, update, remove } = useTasks();
  const { data: users } = useUsers();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState<string | null>(null);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    dueDate: new Date().toISOString().split('T')[0],
    dueTime: '',
    points: 10,
  });

  const handleCreate = () => {
    if (!newTask.title || !newTask.assignedTo) return;

    const assignedUser = users.find(u => u._id === newTask.assignedTo);
    if (!assignedUser) return;

    create({
      title: newTask.title,
      description: newTask.description,
      assignedTo: newTask.assignedTo,
      assignedToName: assignedUser.name,
      priority: newTask.priority,
      status: 'pending',
      points: newTask.points,
      dueDate: newTask.dueDate,
      dueTime: newTask.dueTime,
      familyId: 'demo_family_1',
      createdBy: 'sarah',
    });

    // Reset form
    setNewTask({
      title: '',
      description: '',
      assignedTo: '',
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0],
      dueTime: '',
      points: 10,
    });
    setShowAddModal(false);
  };

  const handleToggleStatus = (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'completed' 
      ? 'pending' 
      : currentStatus === 'pending' 
        ? 'in-progress' 
        : 'completed';

    update(taskId, { status: newStatus });
  };

  const handleDelete = (taskId: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      remove(taskId);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'pink';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'blue';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green';
      case 'in-progress': return 'blue';
      default: return 'purple';
    }
  };

  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const completedTasks = tasks.filter(t => t.status === 'completed');

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
            Tasks
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {pendingTasks.length} pending, {inProgressTasks.length} in progress
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <GlassCard className="p-6" gradient="purple">
          <div className="text-center">
            <div className="text-4xl font-bold font-heading text-gray-900 dark:text-white mb-2">
              {pendingTasks.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
          </div>
        </GlassCard>
        <GlassCard className="p-6" gradient="blue">
          <div className="text-center">
            <div className="text-4xl font-bold font-heading text-gray-900 dark:text-white mb-2">
              {inProgressTasks.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
          </div>
        </GlassCard>
        <GlassCard className="p-6" gradient="green">
          <div className="text-center">
            <div className="text-4xl font-bold font-heading text-gray-900 dark:text-white mb-2">
              {completedTasks.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
          </div>
        </GlassCard>
      </div>

      {/* Task Sections */}
      <div className="space-y-6">
        {/* Pending Tasks */}
        {pendingTasks.length > 0 && (
          <div>
            <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Pending Tasks
            </h2>
            <div className="space-y-3">
              {pendingTasks.map(task => (
                <GlassCard key={task._id} className="p-4 hover-lift">
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => handleToggleStatus(task._id, task.status)}
                      className="flex-shrink-0 w-6 h-6 rounded-md border-2 border-gray-300 dark:border-gray-600 hover:border-primary-500 transition-colors mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {task.description}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-2">
                        <GradientBadge variant={getPriorityColor(task.priority)} size="sm">
                          {task.priority}
                        </GradientBadge>
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="w-3 h-3" />
                          {task.dueDate} {task.dueTime && `at ${task.dueTime}`}
                        </div>
                        <div className="text-xs font-semibold text-warning-600 dark:text-warning-400">
                          {task.points} pts
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          → {task.assignedToName}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="flex-shrink-0 p-2 hover:bg-error-50 dark:hover:bg-error-900/20 rounded-lg transition-colors text-error-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* In Progress Tasks */}
        {inProgressTasks.length > 0 && (
          <div>
            <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              In Progress
            </h2>
            <div className="space-y-3">
              {inProgressTasks.map(task => (
                <GlassCard key={task._id} className="p-4 hover-lift" gradient="blue">
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => handleToggleStatus(task._id, task.status)}
                      className="flex-shrink-0 w-6 h-6 rounded-md border-2 border-blue-500 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 transition-colors mt-1"
                    >
                      <div className="w-3 h-3 m-auto bg-blue-500 rounded-sm" />
                    </button>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {task.description}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-2">
                        <GradientBadge variant={getPriorityColor(task.priority)} size="sm">
                          {task.priority}
                        </GradientBadge>
                        <GradientBadge variant="blue" size="sm">
                          In Progress
                        </GradientBadge>
                        <div className="text-xs font-semibold text-warning-600 dark:text-warning-400">
                          {task.points} pts
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="flex-shrink-0 p-2 hover:bg-error-50 dark:hover:bg-error-900/20 rounded-lg transition-colors text-error-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div>
            <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Completed
            </h2>
            <div className="space-y-3">
              {completedTasks.map(task => (
                <GlassCard key={task._id} className="p-4 opacity-75" gradient="green">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-md bg-success-500 flex items-center justify-center mt-1">
                      <CheckSquare className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1 line-through">
                        {task.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <GradientBadge variant="green" size="sm">
                          ✓ Completed
                        </GradientBadge>
                        <div className="text-xs font-semibold text-success-600 dark:text-success-400">
                          +{task.points} pts earned
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="flex-shrink-0 p-2 hover:bg-error-50 dark:hover:bg-error-900/20 rounded-lg transition-colors text-error-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {tasks.length === 0 && (
          <GlassCard className="p-12 text-center">
            <CheckSquare className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No tasks yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create your first task to get started!
            </p>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="w-5 h-5 mr-2" />
              Add Task
            </Button>
          </GlassCard>
        )}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <GlassCard className="w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
                Add New Task
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Task Title *
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="input-modern"
                  placeholder="Enter task title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="input-modern min-h-[80px]"
                  placeholder="Enter task description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Assign To *
                </label>
                <select
                  value={newTask.assignedTo}
                  onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                  className="input-modern"
                >
                  <option value="">Select person</option>
                  {users.map(user => (
                    <option key={user._id} value={user._id}>
                      {user.avatar} {user.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority
                  </label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                    className="input-modern"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Points
                  </label>
                  <input
                    type="number"
                    value={newTask.points}
                    onChange={(e) => setNewTask({ ...newTask, points: parseInt(e.target.value) || 0 })}
                    className="input-modern"
                    min="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="input-modern"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Due Time
                  </label>
                  <input
                    type="time"
                    value={newTask.dueTime}
                    onChange={(e) => setNewTask({ ...newTask, dueTime: e.target.value })}
                    className="input-modern"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="gradient"
                  className="flex-1"
                  onClick={handleCreate}
                  disabled={!newTask.title || !newTask.assignedTo}
                >
                  Add Task
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
