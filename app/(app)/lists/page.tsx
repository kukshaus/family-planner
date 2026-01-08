'use client';

import { useState } from 'react';
import { Plus, ShoppingCart, Luggage, Plane, Lightbulb, MoreVertical, Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import { LIST_TYPES } from '@/lib/constants';

export default function ListsPage() {
  const [newItemText, setNewItemText] = useState('');

  // Mock lists data
  const lists = [
    {
      id: '1',
      title: 'Grocery Shopping',
      type: 'grocery',
      icon: ShoppingCart,
      items: [
        { id: '1', text: 'Milk', checked: false },
        { id: '2', text: 'Bread', checked: false },
        { id: '3', text: 'Eggs', checked: true },
        { id: '4', text: 'Chicken breast', checked: false },
        { id: '5', text: 'Tomatoes', checked: false },
        { id: '6', text: 'Cheese', checked: true },
      ],
      color: 'bg-gradient-forest',
    },
    {
      id: '2',
      title: 'Weekend Trip Packing',
      type: 'packing',
      icon: Luggage,
      items: [
        { id: '1', text: 'Toothbrushes', checked: true },
        { id: '2', text: 'Clothes for 3 days', checked: false },
        { id: '3', text: 'Phone chargers', checked: false },
        { id: '4', text: 'Medications', checked: true },
        { id: '5', text: 'Snacks for car', checked: false },
      ],
      color: 'bg-gradient-ocean',
    },
    {
      id: '3',
      title: 'Summer Vacation Ideas',
      type: 'ideas',
      icon: Lightbulb,
      items: [
        { id: '1', text: 'Beach resort in Croatia', checked: false },
        { id: '2', text: 'Mountain hiking in Austria', checked: false },
        { id: '3', text: 'City tour in Prague', checked: false },
        { id: '4', text: 'Camping in national park', checked: false },
      ],
      color: 'bg-gradient-dawn',
    },
    {
      id: '4',
      title: 'Movie Night List',
      type: 'ideas',
      icon: Lightbulb,
      items: [
        { id: '1', text: 'The Lion King', checked: true },
        { id: '2', text: 'Frozen 2', checked: false },
        { id: '3', text: 'Toy Story 4', checked: false },
      ],
      color: 'bg-gradient-sunset',
    },
  ];

  const getListIcon = (type: string) => {
    const listType = LIST_TYPES.find((t) => t.value === type);
    return listType?.icon || 'list';
  };

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">Lists</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Organize groceries, packing, ideas and more
          </p>
        </div>
        <Button>
          <Plus className="w-5 h-5 mr-2" />
          New List
        </Button>
      </div>

      {/* List Templates */}
      <div>
        <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
          Quick Start Templates
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {LIST_TYPES.map((template) => (
            <Card
              key={template.value}
              hover
              padding="md"
              className="cursor-pointer text-center"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{template.label}</h3>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Active Lists */}
      <div>
        <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
          Active Lists
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {lists.map((list) => {
            const Icon = list.icon;
            const completedCount = list.items.filter((item) => item.checked).length;
            const totalCount = list.items.length;
            const progress = (completedCount / totalCount) * 100;

            return (
              <Card key={list.id} padding="none">
                {/* Header */}
                <div className={`${list.color} text-white p-6 rounded-t-card-mobile sm:rounded-t-card-desktop`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-lg">{list.title}</h3>
                        <p className="text-sm opacity-90">
                          {completedCount} of {totalCount} completed
                        </p>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-white/20 rounded">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-white rounded-full h-2 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Items */}
                <CardContent className="p-4">
                  <div className="space-y-2 mb-4">
                    {list.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                      >
                        <button
                          className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                            item.checked
                              ? 'bg-success border-success'
                              : 'border-gray-300 dark:border-gray-600 group-hover:border-primary'
                          }`}
                        >
                          {item.checked && <Check className="w-3 h-3 text-white" />}
                        </button>
                        <span
                          className={`flex-1 ${
                            item.checked
                              ? 'line-through text-gray-500 dark:text-gray-400'
                              : 'text-gray-900 dark:text-white'
                          }`}
                        >
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Add Item Input */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add new item..."
                      value={newItemText}
                      onChange={(e) => setNewItemText(e.target.value)}
                      className="flex-1"
                    />
                    <Button size="md">
                      <Plus className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Archived Lists */}
      <Card padding="lg">
        <div className="text-center py-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Archived Lists
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            View your completed and archived lists
          </p>
          <Button variant="outline">View Archive</Button>
        </div>
      </Card>
    </div>
  );
}
