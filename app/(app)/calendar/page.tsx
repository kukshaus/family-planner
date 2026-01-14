'use client';

import { useState } from 'react';
import { Plus, Calendar as CalendarIcon, Clock, MapPin, Users, Trash2, X } from 'lucide-react';
import { useEvents, useUsers } from '@/hooks/useLocalDB';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientBadge } from '@/components/ui/GradientBadge';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function CalendarPage() {
  const { data: events, loading, create, update, remove } = useEvents();
  const { data: users } = useUsers();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '10:00',
    location: '',
    attendees: [] as string[],
    color: '#6366F1',
  });

  const colors = [
    { name: 'Indigo', value: '#6366F1' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Orange', value: '#F59E0B' },
    { name: 'Red', value: '#EF4444' },
  ];

  const handleCreate = () => {
    if (!newEvent.title || !newEvent.startDate) return;

    create({
      title: newEvent.title,
      description: newEvent.description,
      startDate: newEvent.startDate,
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      location: newEvent.location,
      attendees: newEvent.attendees,
      color: newEvent.color,
      familyId: 'demo_family_1',
      createdBy: 'sarah',
    });

    setNewEvent({
      title: '',
      description: '',
      startDate: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '10:00',
      location: '',
      attendees: [],
      color: '#6366F1',
    });
    setShowAddModal(false);
  };

  const handleDelete = (eventId: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      remove(eventId);
    }
  };

  const toggleAttendee = (userId: string) => {
    setNewEvent({
      ...newEvent,
      attendees: newEvent.attendees.includes(userId)
        ? newEvent.attendees.filter(id => id !== userId)
        : [...newEvent.attendees, userId],
    });
  };

  const todayEvents = events.filter(e => e.startDate === selectedDate);
  const upcomingEvents = events.filter(e => e.startDate > selectedDate).slice(0, 5);

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
            Calendar
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {todayEvents.length} events today, {upcomingEvents.length} upcoming
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Add Event
        </Button>
      </div>

      {/* Date Selector */}
      <GlassCard className="p-6">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full md:w-auto px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-medium"
        />
      </GlassCard>

      {/* Today's Events */}
      {todayEvents.length > 0 && (
        <div>
          <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Events on {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </h2>
          <div className="space-y-3">
            {todayEvents.map(event => {
              const eventUsers = users.filter(u => event.attendees.includes(u._id));
              return (
                <GlassCard key={event._id} className="p-6 hover-lift">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-1 h-full rounded-full flex-shrink-0"
                      style={{ backgroundColor: event.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-2">
                        {event.title}
                      </h3>
                      {event.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {event.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{event.startTime} - {event.endTime}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                        )}
                        {eventUsers.length > 0 && (
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Users className="w-4 h-4" />
                            <span>{eventUsers.map(u => u.name).join(', ')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="flex-shrink-0 p-2 hover:bg-error-50 dark:hover:bg-error-900/20 rounded-lg transition-colors text-error-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      )}

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <div>
          <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingEvents.map(event => (
              <GlassCard key={event._id} className="p-4 hover-lift cursor-pointer">
                <div className="flex items-start gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: event.color + '20' }}
                  >
                    <CalendarIcon className="w-6 h-6" style={{ color: event.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {event.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(event.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {event.startTime}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {events.length === 0 && (
        <GlassCard className="p-12 text-center">
          <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No events yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Create your first event to get started!
          </p>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="w-5 h-5 mr-2" />
            Add Event
          </Button>
        </GlassCard>
      )}

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-lg animate-scale-in">
            <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              {/* Gradient Header */}
              <div className="relative h-32 bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-secondary-500/20" />
                <button
                  onClick={() => setShowAddModal(false)}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white transition-all hover:scale-110 active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute -bottom-8 left-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl flex items-center justify-center border-4 border-white dark:border-gray-900">
                    <CalendarIcon className="w-8 h-8 text-primary-500" strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 pt-14 max-h-[calc(90vh-8rem)] overflow-y-auto custom-scrollbar">
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                  Add New Event
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Schedule a new event for your family
                </p>

                <div className="space-y-6">
                  {/* Event Title */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                      Event Title <span className="text-error-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 font-medium"
                      placeholder="e.g., Family Dinner"
                      autoFocus
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                      Description
                    </label>
                    <textarea
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 min-h-[80px] resize-none"
                      placeholder="Add event details..."
                    />
                  </div>

                  {/* Date & Times */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-3 space-y-2">
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                        Date
                      </label>
                      <input
                        type="date"
                        value={newEvent.startDate}
                        onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                        Start
                      </label>
                      <input
                        type="time"
                        value={newEvent.startTime}
                        onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                        End
                      </label>
                      <input
                        type="time"
                        value={newEvent.endTime}
                        onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                      Location
                    </label>
                    <input
                      type="text"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 font-medium"
                      placeholder="Where will this event take place?"
                    />
                  </div>

                  {/* Color */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                      Color
                    </label>
                    <div className="flex gap-3">
                      {colors.map(color => (
                        <button
                          key={color.value}
                          onClick={() => setNewEvent({ ...newEvent, color: color.value })}
                          className={cn(
                            'w-10 h-10 rounded-xl transition-all',
                            newEvent.color === color.value
                              ? 'ring-2 ring-offset-2 ring-primary-500 scale-110'
                              : 'hover:scale-105'
                          )}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Attendees */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                      Attendees
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {users.map(user => (
                        <button
                          key={user._id}
                          onClick={() => toggleAttendee(user._id)}
                          className={cn(
                            'px-4 py-2 rounded-xl font-medium transition-all text-sm',
                            newEvent.attendees.includes(user._id)
                              ? 'bg-primary-500 text-white'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          )}
                        >
                          {user.avatar} {user.name}
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
                    className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleCreate}
                    disabled={!newEvent.title || !newEvent.startDate}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create Event
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
