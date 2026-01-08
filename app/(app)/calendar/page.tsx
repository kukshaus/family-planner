'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AvatarGroup } from '@/components/ui/Avatar';
import { formatTime } from '@/lib/utils';
import { MONTHS, DAYS_OF_WEEK } from '@/lib/constants';

type ViewMode = 'month' | 'week' | 'day';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Mock events data
  const events = [
    {
      id: '1',
      title: 'Doctor Appointment',
      date: new Date(2026, 0, 8, 10, 30),
      endDate: new Date(2026, 0, 8, 11, 30),
      color: '#EF4444',
      attendees: [
        { name: 'Sarah', color: '#6366F1' },
        { name: 'Emma', color: '#EC4899' },
      ],
    },
    {
      id: '2',
      title: 'Soccer Practice',
      date: new Date(2026, 0, 8, 16, 0),
      endDate: new Date(2026, 0, 8, 17, 30),
      color: '#3B82F6',
      attendees: [{ name: 'Jake', color: '#10B981' }],
    },
    {
      id: '3',
      title: 'Team Meeting',
      date: new Date(2026, 0, 10, 14, 0),
      endDate: new Date(2026, 0, 10, 15, 0),
      color: '#6366F1',
      attendees: [{ name: 'Sarah', color: '#6366F1' }],
    },
    {
      id: '4',
      title: 'Birthday Party',
      date: new Date(2026, 0, 15, 15, 0),
      endDate: new Date(2026, 0, 15, 18, 0),
      color: '#EC4899',
      attendees: [
        { name: 'Sarah', color: '#6366F1' },
        { name: 'Mike', color: '#F59E0B' },
        { name: 'Emma', color: '#EC4899' },
        { name: 'Jake', color: '#10B981' },
      ],
    },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty cells for days before the first of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const days = getDaysInMonth(currentDate);
  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">
            Calendar
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your family events and appointments
          </p>
        </div>
        <Button>
          <Plus className="w-5 h-5 mr-2" />
          New Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <Card className="lg:col-span-2" padding="lg">
          <div className="space-y-6">
            {/* Calendar Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => navigateMonth('prev')}>
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white min-w-[200px] text-center">
                  {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <Button variant="ghost" size="sm" onClick={() => navigateMonth('next')}>
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
              <Button variant="outline" size="sm" onClick={goToToday}>
                Today
              </Button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Day headers */}
              {DAYS_OF_WEEK.map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-semibold text-gray-600 dark:text-gray-400 py-2"
                >
                  {day.slice(0, 3)}
                </div>
              ))}

              {/* Calendar days */}
              {days.map((day, index) => {
                const dayEvents = day ? getEventsForDate(day) : [];
                const isToday =
                  day &&
                  day.getDate() === new Date().getDate() &&
                  day.getMonth() === new Date().getMonth() &&
                  day.getFullYear() === new Date().getFullYear();
                const isSelected =
                  day &&
                  selectedDate &&
                  day.getDate() === selectedDate.getDate() &&
                  day.getMonth() === selectedDate.getMonth() &&
                  day.getFullYear() === selectedDate.getFullYear();

                return (
                  <div
                    key={index}
                    onClick={() => day && setSelectedDate(day)}
                    className={`
                      min-h-24 p-2 rounded-lg transition-all duration-200 cursor-pointer
                      ${day ? 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700' : 'bg-transparent'}
                      ${isSelected ? 'ring-2 ring-primary' : ''}
                      ${isToday ? 'border-2 border-primary' : 'border border-gray-200 dark:border-gray-700'}
                    `}
                  >
                    {day && (
                      <>
                        <div
                          className={`
                            text-sm font-semibold mb-1 w-6 h-6 flex items-center justify-center rounded-full
                            ${isToday ? 'bg-primary text-white' : 'text-gray-900 dark:text-white'}
                          `}
                        >
                          {day.getDate()}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className="text-xs p-1 rounded truncate"
                              style={{
                                backgroundColor: event.color + '20',
                                color: event.color,
                              }}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 pl-1">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Event Details Sidebar */}
        <Card padding="lg">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-900 dark:text-white">
              <CalendarIcon className="w-5 h-5" />
              <h3 className="font-heading font-bold text-lg">
                {selectedDate
                  ? `${MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()}`
                  : 'Select a date'}
              </h3>
            </div>

            {selectedDateEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedDateEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 rounded-lg border-l-4 bg-gray-50 dark:bg-gray-800"
                    style={{ borderColor: event.color }}
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {event.title}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <span>{formatTime(event.date)}</span>
                      <span>-</span>
                      <span>{formatTime(event.endDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">With:</span>
                      <AvatarGroup avatars={event.attendees} size="sm" />
                    </div>
                  </div>
                ))}
              </div>
            ) : selectedDate ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No events scheduled for this day
              </p>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                Select a date to view events
              </p>
            )}

            {selectedDate && (
              <Button fullWidth variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </Button>
            )}
          </div>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card padding="lg">
        <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-4">
          Upcoming Events
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="p-4 rounded-lg border-l-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              style={{ borderColor: event.color }}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900 dark:text-white">{event.title}</h4>
                <Badge variant="neutral" size="sm">
                  {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {formatTime(event.date)} - {formatTime(event.endDate)}
              </p>
              <AvatarGroup avatars={event.attendees} size="sm" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
