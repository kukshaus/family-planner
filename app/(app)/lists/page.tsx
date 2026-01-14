'use client';

import { useState } from 'react';
import { Plus, ShoppingCart, CheckSquare, Backpack, Trash2, X } from 'lucide-react';
import { useListItems } from '@/hooks/useLocalDB';
import { GlassCard } from '@/components/ui/GlassCard';
import { ShoppingListItem } from '@/components/ui/ShoppingListItem';
import { GradientBadge } from '@/components/ui/GradientBadge';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type ListType = 'shopping' | 'todo' | 'packing';

export default function ListsPage() {
  const [activeList, setActiveList] = useState<ListType>('shopping');
  const { data: allItems, loading, create, update, remove } = useListItems(activeList);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    category: '',
    icon: '',
  });

  const listTypes = [
    { type: 'shopping' as ListType, name: 'Shopping List', icon: ShoppingCart, color: 'blue' },
    { type: 'todo' as ListType, name: 'To-Do List', icon: CheckSquare, color: 'purple' },
    { type: 'packing' as ListType, name: 'Packing List', icon: Backpack, color: 'green' },
  ];

  const commonEmojis = {
    shopping: ['🥑', '🥛', '🍞', '🥚', '🧀', '🥩', '🐟', '🍎', '🥕', '🍅', '🥔', '🧅'],
    todo: ['📝', '💼', '🏠', '🚗', '📞', '💻', '📧', '🎯', '⭐', '🔔', '📅', '✏️'],
    packing: ['👕', '👖', '👟', '🧳', '🎒', '📱', '💊', '🪥', '🧴', '📚', '🔌', '🎧'],
  };

  const handleCreate = () => {
    if (!newItem.name) return;

    create({
      listType: activeList,
      name: newItem.name,
      quantity: newItem.quantity,
      category: newItem.category,
      icon: newItem.icon,
      checked: false,
      familyId: 'demo_family_1',
    });

    setNewItem({ name: '', quantity: '', category: '', icon: '' });
    setShowAddModal(false);
  };

  const handleToggle = (itemId: string, currentChecked: boolean) => {
    update(itemId, { checked: !currentChecked });
  };

  const handleDelete = (itemId: string) => {
    remove(itemId);
  };

  const checkedItems = allItems.filter(item => item.checked);
  const uncheckedItems = allItems.filter(item => !item.checked);

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
            Lists
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {uncheckedItems.length} items remaining, {checkedItems.length} completed
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Add Item
        </Button>
      </div>

      {/* List Type Selector */}
      <div className="flex gap-3 overflow-x-auto hide-scrollbar">
        {listTypes.map(list => {
          const Icon = list.icon;
          const isActive = activeList === list.type;
          return (
            <button
              key={list.type}
              onClick={() => setActiveList(list.type)}
              className={cn(
                'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap',
                isActive
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              )}
            >
              <Icon className="w-5 h-5" />
              {list.name}
            </button>
          );
        })}
      </div>

      {/* Items List */}
      {allItems.length > 0 ? (
        <div className="space-y-6">
          {/* Unchecked Items */}
          {uncheckedItems.length > 0 && (
            <GlassCard className="p-6">
              <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-4">
                Items ({uncheckedItems.length})
              </h3>
              <div className="space-y-2">
                {uncheckedItems.map(item => (
                  <div key={item._id} className="flex items-center gap-2">
                    <div className="flex-1">
                      <ShoppingListItem
                        name={item.name}
                        quantity={item.quantity || ''}
                        checked={item.checked}
                        icon={item.icon}
                        onToggle={() => handleToggle(item._id, item.checked)}
                      />
                    </div>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 hover:bg-error-50 dark:hover:bg-error-900/20 rounded-lg transition-colors text-error-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Checked Items */}
          {checkedItems.length > 0 && (
            <GlassCard className="p-6 opacity-75">
              <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-4">
                Completed ({checkedItems.length})
              </h3>
              <div className="space-y-2">
                {checkedItems.map(item => (
                  <div key={item._id} className="flex items-center gap-2">
                    <div className="flex-1">
                      <ShoppingListItem
                        name={item.name}
                        quantity={item.quantity || ''}
                        checked={item.checked}
                        icon={item.icon}
                        onToggle={() => handleToggle(item._id, item.checked)}
                      />
                    </div>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 hover:bg-error-50 dark:hover:bg-error-900/20 rounded-lg transition-colors text-error-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}
        </div>
      ) : (
        <GlassCard className="p-12 text-center">
          {React.createElement(listTypes.find(l => l.type === activeList)!.icon, {
            className: 'w-16 h-16 mx-auto mb-4 text-gray-400'
          })}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No items yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Add your first item to get started!
          </p>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="w-5 h-5 mr-2" />
            Add Item
          </Button>
        </GlassCard>
      )}

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-lg animate-scale-in">
            <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              {/* Gradient Header */}
              <div className="relative h-32 bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-cyan-500/20" />
                <button
                  onClick={() => setShowAddModal(false)}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white transition-all hover:scale-110 active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute -bottom-8 left-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl flex items-center justify-center border-4 border-white dark:border-gray-900">
                    {React.createElement(listTypes.find(l => l.type === activeList)!.icon, {
                      className: 'w-8 h-8 text-blue-500',
                      strokeWidth: 2.5
                    })}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 pt-14">
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                  Add Item
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Add a new item to your {listTypes.find(l => l.type === activeList)?.name.toLowerCase()}
                </p>

                <div className="space-y-6">
                  {/* Item Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                      Item Name <span className="text-error-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 font-medium"
                      placeholder="e.g., Milk"
                      autoFocus
                    />
                  </div>

                  {/* Quantity/Details */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                      {activeList === 'shopping' ? 'Quantity' : 'Details'}
                    </label>
                    <input
                      type="text"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 font-medium"
                      placeholder={activeList === 'shopping' ? 'e.g., 1L' : 'Add details...'}
                    />
                  </div>

                  {/* Category */}
                  {activeList === 'shopping' && (
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                        Category
                      </label>
                      <input
                        type="text"
                        value={newItem.category}
                        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 font-medium"
                        placeholder="e.g., Dairy"
                      />
                    </div>
                  )}

                  {/* Icon Picker */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                      Icon (optional)
                    </label>
                    <div className="grid grid-cols-6 gap-2">
                      {commonEmojis[activeList].map(emoji => (
                        <button
                          key={emoji}
                          onClick={() => setNewItem({ ...newItem, icon: emoji })}
                          className={cn(
                            'p-3 text-2xl rounded-xl transition-all',
                            newItem.icon === emoji
                              ? 'bg-primary-500 scale-110'
                              : 'bg-gray-100 dark:bg-gray-800 hover:scale-105'
                          )}
                        >
                          {emoji}
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
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleCreate}
                    disabled={!newItem.name}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Item
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
