'use client';

import { useState } from 'react';
import { User, Users, Bell, Shield, Palette, Globe, LogOut } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'family' | 'notifications' | 'security' | 'appearance'>('profile');

  // Mock data
  const user = {
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah@example.com',
    avatar: '',
    color: '#6366F1',
    role: 'admin',
  };

  const family = {
    name: 'Johnson Family',
    members: [
      { id: '1', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'admin', color: '#6366F1' },
      { id: '2', name: 'Mike Johnson', email: 'mike@example.com', role: 'parent', color: '#F59E0B' },
      { id: '3', name: 'Emma Johnson', email: '', role: 'child', color: '#EC4899' },
      { id: '4', name: 'Jake Johnson', email: '', role: 'child', color: '#10B981' },
    ],
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'family', label: 'Family', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your account and family preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <Card padding="md" className="lg:col-span-1 h-fit">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </Card>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <>
              <Card padding="lg">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center gap-6">
                      <Avatar
                        src={user.avatar}
                        name={`${user.firstName} ${user.lastName}`}
                        color={user.color}
                        size="xl"
                      />
                      <div>
                        <Button variant="outline" size="sm">
                          Change Photo
                        </Button>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          JPG, PNG or GIF. Max 2MB.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input label="First Name" defaultValue={user.firstName} />
                      <Input label="Last Name" defaultValue={user.lastName} />
                    </div>

                    <Input label="Email" type="email" defaultValue={user.email} />

                    <div className="flex justify-end gap-3">
                      <Button variant="outline">Cancel</Button>
                      <Button>Save Changes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Family Settings */}
          {activeTab === 'family' && (
            <>
              <Card padding="lg">
                <CardHeader>
                  <CardTitle>Family Details</CardTitle>
                  <CardDescription>Manage your family information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <Input label="Family Name" defaultValue={family.name} />

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Timezone
                      </label>
                      <select className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                        <option>Europe/Budapest</option>
                        <option>Europe/London</option>
                        <option>America/New_York</option>
                      </select>
                    </div>

                    <div className="flex justify-end gap-3">
                      <Button variant="outline">Cancel</Button>
                      <Button>Save Changes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card padding="lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Family Members</CardTitle>
                      <CardDescription>Manage who has access to your family</CardDescription>
                    </div>
                    <Button size="sm">
                      Add Member
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {family.members.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar name={member.name} color={member.color} size="md" />
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {member.name}
                            </p>
                            {member.email && (
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {member.email}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={member.role === 'admin' ? 'primary' : 'neutral'}>
                            {member.role}
                          </Badge>
                          {member.role !== 'admin' && (
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <>
              <Card padding="lg">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how you want to be notified</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      {
                        title: 'Email Notifications',
                        description: 'Receive email updates about family activities',
                        checked: true,
                      },
                      {
                        title: 'Push Notifications',
                        description: 'Get push notifications on your device',
                        checked: true,
                      },
                      {
                        title: 'Task Reminders',
                        description: 'Reminders for upcoming and overdue tasks',
                        checked: true,
                      },
                      {
                        title: 'Event Reminders',
                        description: 'Notifications for calendar events',
                        checked: true,
                      },
                      {
                        title: 'Reward Claims',
                        description: 'Notifications when children claim rewards',
                        checked: true,
                      },
                      {
                        title: 'Weekly Summary',
                        description: 'Receive a weekly family activity summary',
                        checked: false,
                      },
                    ].map((setting, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {setting.title}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {setting.description}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked={setting.checked} />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <>
              <Card padding="lg">
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your account password</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input label="Current Password" type="password" />
                    <Input label="New Password" type="password" />
                    <Input label="Confirm New Password" type="password" />

                    <div className="flex justify-end">
                      <Button>Update Password</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card padding="lg">
                <CardHeader>
                  <CardTitle>Connected Accounts</CardTitle>
                  <CardDescription>Manage your connected services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-ocean rounded-lg flex items-center justify-center">
                          <Globe className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            Google Calendar
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Connected
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Disconnect
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-forest rounded-lg flex items-center justify-center">
                          <Globe className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            kifli.hu
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Not connected
                          </p>
                        </div>
                      </div>
                      <Button variant="primary" size="sm">
                        Connect
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card padding="lg" className="border-error">
                <CardHeader>
                  <CardTitle className="text-error">Danger Zone</CardTitle>
                  <CardDescription>Irreversible actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Delete Account
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Permanently delete your account and all data
                        </p>
                      </div>
                      <Button variant="danger" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <>
              <Card padding="lg">
                <CardHeader>
                  <CardTitle>Theme</CardTitle>
                  <CardDescription>Choose your preferred color scheme</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: 'light', label: 'Light' },
                      { value: 'dark', label: 'Dark' },
                      { value: 'auto', label: 'Auto' },
                    ].map((theme) => (
                      <button
                        key={theme.value}
                        className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary transition-colors"
                      >
                        <div className="text-center">
                          <Palette className="w-8 h-8 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {theme.label}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card padding="lg">
                <CardHeader>
                  <CardTitle>Language</CardTitle>
                  <CardDescription>Select your preferred language</CardDescription>
                </CardHeader>
                <CardContent>
                  <select className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option>English</option>
                    <option>Hungarian</option>
                    <option>German</option>
                    <option>French</option>
                  </select>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
