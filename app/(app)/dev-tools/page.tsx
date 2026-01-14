'use client';

import { useState, useEffect } from 'react';
import { Database, Trash2, Download, Upload, RefreshCw, CheckCircle } from 'lucide-react';
import { localDB } from '@/lib/localDB';
import { initializeSeedData } from '@/lib/seedData';
import { GlassCard } from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { GradientBadge } from '@/components/ui/GradientBadge';

export default function DevToolsPage() {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [message, setMessage] = useState('');

  const collections = [
    'users',
    'tasks',
    'events',
    'meals',
    'lists',
    'photos',
    'rewards',
    'sleepEntries',
    'rewardClaims',
  ];

  const loadStats = () => {
    const newStats: Record<string, number> = {};
    collections.forEach((collection) => {
      newStats[collection] = localDB.count(collection as any);
    });
    setStats(newStats);
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleReinitialize = () => {
    // Clear all data
    localDB.clearDatabase();
    
    // Reinitialize with seed data
    initializeSeedData();
    
    // Reload stats
    loadStats();
    
    setMessage('✅ Database reinitialized with sample data!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear ALL data? This cannot be undone.')) {
      localDB.clearDatabase();
      loadStats();
      setMessage('🗑️ All data cleared!');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleExport = () => {
    const data = localDB.exportDatabase();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `family-planner-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    setMessage('💾 Database exported!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target?.result as string);
            localDB.importDatabase(data);
            loadStats();
            setMessage('📥 Database imported!');
            setTimeout(() => setMessage(''), 3000);
          } catch (error) {
            setMessage('❌ Error importing database');
            setTimeout(() => setMessage(''), 3000);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleViewData = (collection: string) => {
    const data = localDB.findAll(collection as any);
    console.log(`${collection}:`, data);
    setMessage(`📊 Check console for ${collection} data`);
    setTimeout(() => setMessage(''), 3000);
  };

  const totalItems = Object.values(stats).reduce((sum, count) => sum + count, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500" />
        <div className="absolute inset-0 bg-mesh-purple opacity-30" />
        <div className="relative p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <Database className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-heading font-bold">Developer Tools</h1>
              <p className="text-white/90 mt-1">Manage your local database</p>
            </div>
          </div>
          
          {message && (
            <div className="mt-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 animate-fade-in">
              {message}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <GlassCard className="p-6">
        <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Button
            onClick={handleReinitialize}
            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reinitialize Data
          </Button>
          <Button
            onClick={handleExport}
            variant="secondary"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Database
          </Button>
          <Button
            onClick={handleImport}
            variant="secondary"
          >
            <Upload className="w-4 h-4 mr-2" />
            Import Database
          </Button>
          <Button
            onClick={handleClearAll}
            className="bg-error-500 hover:bg-error-600 text-white"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All Data
          </Button>
        </div>
      </GlassCard>

      {/* Database Stats */}
      <GlassCard className="p-6" gradient="purple">
        <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
          Database Statistics
        </h2>
        <div className="text-center mb-6">
          <div className="text-5xl font-bold font-heading bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent mb-2">
            {totalItems}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Total Items</div>
        </div>
      </GlassCard>

      {/* Collections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map((collection) => {
          const count = stats[collection] || 0;
          const hasData = count > 0;

          return (
            <GlassCard
              key={collection}
              className="p-6 hover-lift cursor-pointer"
              onClick={() => handleViewData(collection)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white capitalize">
                    {collection}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Click to view in console
                  </p>
                </div>
                {hasData && (
                  <CheckCircle className="w-5 h-5 text-success-500" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold font-heading text-gray-900 dark:text-white">
                  {count}
                </div>
                <GradientBadge
                  variant={hasData ? 'green' : 'purple'}
                  size="sm"
                >
                  {hasData ? 'Has Data' : 'Empty'}
                </GradientBadge>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Instructions */}
      <GlassCard className="p-6">
        <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
          💡 How to Use
        </h2>
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <div className="flex gap-3">
            <span className="text-2xl">🔄</span>
            <div>
              <strong>Reinitialize Data:</strong> Clear everything and load fresh sample data with 40+ items
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl">💾</span>
            <div>
              <strong>Export Database:</strong> Download all your data as a JSON file for backup
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl">📥</span>
            <div>
              <strong>Import Database:</strong> Restore data from a previously exported JSON file
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl">🗑️</span>
            <div>
              <strong>Clear All Data:</strong> Remove everything from the database (careful!)
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl">📊</span>
            <div>
              <strong>View Collection:</strong> Click any collection card to log its data to the browser console
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Sample Data Info */}
      <GlassCard className="p-6" gradient="blue">
        <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
          📦 Sample Data Included
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong className="text-gray-900 dark:text-white">👥 4 Family Members</strong>
            <ul className="mt-2 space-y-1 text-gray-700 dark:text-gray-300">
              <li>• Sarah (Admin) - 245 pts</li>
              <li>• Mike (Parent) - 198 pts</li>
              <li>• Emma (Child) - 156 pts</li>
              <li>• Jake (Child) - 142 pts</li>
            </ul>
          </div>
          <div>
            <strong className="text-gray-900 dark:text-white">✅ 5 Sample Tasks</strong>
            <ul className="mt-2 space-y-1 text-gray-700 dark:text-gray-300">
              <li>• Clean kitchen (20 pts)</li>
              <li>• Grocery shopping (30 pts)</li>
              <li>• Walk the dog (10 pts)</li>
              <li>• Homework - Math (25 pts) ✓</li>
              <li>• Organize garage (40 pts)</li>
            </ul>
          </div>
          <div>
            <strong className="text-gray-900 dark:text-white">📅 4 Calendar Events</strong>
            <ul className="mt-2 space-y-1 text-gray-700 dark:text-gray-300">
              <li>• Doctor Appointment</li>
              <li>• Soccer Practice</li>
              <li>• Family Dinner</li>
              <li>• Movie Night</li>
            </ul>
          </div>
          <div>
            <strong className="text-gray-900 dark:text-white">🍽️ 4 Meal Plans</strong>
            <ul className="mt-2 space-y-1 text-gray-700 dark:text-gray-300">
              <li>• Avocado Toast (320 cal)</li>
              <li>• Quinoa Salad (450 cal)</li>
              <li>• Grilled Salmon (520 cal)</li>
              <li>• Oatmeal (280 cal)</li>
            </ul>
          </div>
          <div>
            <strong className="text-gray-900 dark:text-white">🛒 8 Shopping Items</strong>
            <ul className="mt-2 space-y-1 text-gray-700 dark:text-gray-300">
              <li>• Avocados, Salmon, Yogurt</li>
              <li>• Chocolate, Onion, Lettuce</li>
              <li>• Bread, Eggs</li>
            </ul>
          </div>
          <div>
            <strong className="text-gray-900 dark:text-white">📸 4 Photos + 🏆 5 Rewards + 😴 3 Sleep Entries</strong>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
