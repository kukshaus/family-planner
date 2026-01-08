'use client';

import { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, Coffee, Utensils, Cookie } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DAYS_OF_WEEK } from '@/lib/constants';

export default function MealsPage() {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());

  // Get dates for current week
  const getWeekDates = (startDate: Date) => {
    const dates = [];
    const start = new Date(startDate);
    start.setDate(start.getDate() - start.getDay()); // Start from Sunday

    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates(currentWeekStart);

  // Mock meals data
  const meals = {
    '2026-01-08': {
      breakfast: { name: 'Pancakes with berries', notes: '' },
      lunch: { name: 'Chicken Caesar Salad', notes: '' },
      dinner: { name: 'Spaghetti Bolognese', notes: 'Kids favorite!' },
    },
    '2026-01-09': {
      breakfast: { name: 'Oatmeal with honey', notes: '' },
      lunch: { name: 'Sandwiches', notes: '' },
      dinner: { name: 'Grilled Chicken & Vegetables', notes: '' },
    },
    '2026-01-10': {
      breakfast: { name: 'Toast & Eggs', notes: '' },
      lunch: { name: 'Leftover pasta', notes: '' },
      dinner: { name: 'Tacos', notes: 'Taco Friday!' },
    },
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeekStart);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentWeekStart(newDate);
  };

  const goToThisWeek = () => {
    setCurrentWeekStart(new Date());
  };

  const getMealForDate = (date: Date, mealType: string) => {
    const dateKey = date.toISOString().split('T')[0];
    return meals[dateKey as keyof typeof meals]?.[mealType as keyof typeof meals[keyof typeof meals]];
  };

  const mealTypes = [
    { key: 'breakfast', label: 'Breakfast', icon: Coffee, color: 'bg-gradient-dawn' },
    { key: 'lunch', label: 'Lunch', icon: Utensils, color: 'bg-gradient-ocean' },
    { key: 'dinner', label: 'Dinner', icon: Utensils, color: 'bg-gradient-sunset' },
  ];

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">
            Meal Planning
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Plan your family's meals for the week
          </p>
        </div>
        <Button>
          <Plus className="w-5 h-5 mr-2" />
          Add Meal
        </Button>
      </div>

      {/* Week Navigation */}
      <Card padding="md">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigateWeek('prev')}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="text-center">
            <h2 className="text-lg font-heading font-bold text-gray-900 dark:text-white">
              Week of {weekDates[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            </h2>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={goToThisWeek}>
              This Week
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigateWeek('next')}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Weekly Meal Grid */}
      <div className="grid grid-cols-1 gap-4">
        {weekDates.map((date, dayIndex) => {
          const isToday =
            date.toDateString() === new Date().toDateString();

          return (
            <Card key={dayIndex} padding="md" className={isToday ? 'ring-2 ring-primary' : ''}>
              <div className="space-y-4">
                {/* Day Header */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white">
                      {DAYS_OF_WEEK[date.getDay()]}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  {isToday && <Badge variant="primary">Today</Badge>}
                </div>

                {/* Meals for the day */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {mealTypes.map((mealType) => {
                    const Icon = mealType.icon;
                    const meal = getMealForDate(date, mealType.key);

                    return (
                      <div
                        key={mealType.key}
                        className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`w-8 h-8 ${mealType.color} rounded-lg flex items-center justify-center`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {mealType.label}
                          </span>
                        </div>
                        {meal ? (
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                              {meal.name}
                            </p>
                            {meal.notes && (
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {meal.notes}
                              </p>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-400 dark:text-gray-500 group-hover:text-primary">
                            + Add meal
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recipe Ideas */}
      <Card padding="lg">
        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
          Recipe Ideas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Spaghetti Bolognese', time: '30 min', difficulty: 'Easy' },
            { name: 'Chicken Stir Fry', time: '25 min', difficulty: 'Easy' },
            { name: 'Beef Tacos', time: '20 min', difficulty: 'Easy' },
            { name: 'Salmon & Veggies', time: '35 min', difficulty: 'Medium' },
          ].map((recipe, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 hover:from-primary/10 hover:to-primary/5 transition-all cursor-pointer group"
            >
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary">
                {recipe.name}
              </h4>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <span>{recipe.time}</span>
                <span>•</span>
                <Badge variant="neutral" size="sm">
                  {recipe.difficulty}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Shopping List Integration */}
      <Card padding="lg" className="bg-gradient-forest text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-heading font-bold mb-2">Need Groceries?</h3>
            <p className="opacity-90">
              Generate a shopping list from your meal plan or connect with kifli.hu
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-white/20 border-white/30 hover:bg-white/30">
              Generate List
            </Button>
            <Button variant="outline" className="bg-white/20 border-white/30 hover:bg-white/30">
              Connect kifli.hu
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
