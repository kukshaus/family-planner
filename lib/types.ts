export type UserRole = 'admin' | 'parent' | 'child' | 'guest';

export interface FamilyMember {
  userId: string;
  role: UserRole;
  nickname: string;
  avatar: string;
  color: string;
  joinedAt: Date;
}

export interface Family {
  _id: string;
  name: string;
  timezone: string;
  createdAt: Date;
  updatedAt: Date;
  members: FamilyMember[];
  settings: {
    weekStartsOn: 0 | 1;
    currency: string;
    language: string;
  };
}

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  families: string[];
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    notifications: {
      email: boolean;
      push: boolean;
      tasks: boolean;
      events: boolean;
    };
  };
}

export interface Event {
  _id: string;
  familyId: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  allDay: boolean;
  location?: string;
  attendees: string[];
  color: string;
  isPrivate: boolean;
  recurrence?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: Date;
    daysOfWeek?: number[];
  };
  reminders: {
    type: 'notification' | 'email';
    minutesBefore: number;
  }[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  _id: string;
  familyId: string;
  title: string;
  description?: string;
  assignedTo: string[];
  createdBy: string;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed' | 'archived';
  category: 'household' | 'personal' | 'shopping' | 'other';
  completedAt?: Date;
  completedBy?: string;
  recurrence?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    daysOfWeek?: number[];
  };
  rewardPoints?: number;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Reward {
  _id: string;
  familyId: string;
  title: string;
  description: string;
  icon: string;
  pointsCost: number;
  category: 'screen-time' | 'activity' | 'treat' | 'privilege' | 'custom';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RewardClaim {
  _id: string;
  familyId: string;
  rewardId: string;
  childId: string;
  pointsSpent: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  requestedAt: Date;
  approvedBy?: string;
  approvedAt?: Date;
  notes?: string;
}

export interface PointsBalance {
  _id: string;
  familyId: string;
  userId: string;
  balance: number;
  history: {
    amount: number;
    type: 'earned' | 'spent' | 'adjusted';
    reason: string;
    taskId?: string;
    rewardClaimId?: string;
    timestamp: Date;
  }[];
}

export interface Meal {
  _id: string;
  familyId: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  date: Date;
  recipe?: {
    ingredients: string[];
    instructions: string;
    prepTime: number;
    servings: number;
  };
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Album {
  _id: string;
  familyId: string;
  title: string;
  description?: string;
  coverPhotoId?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  access: {
    viewableBy: string[];
    editableBy: string[];
  };
}

export interface Photo {
  _id: string;
  familyId: string;
  albumId?: string;
  url: string;
  thumbnailUrl: string;
  caption?: string;
  takenAt: Date;
  uploadedBy: string;
  uploadedAt: Date;
  metadata: {
    width: number;
    height: number;
    fileSize: number;
    mimeType: string;
  };
  tags: string[];
}

export interface List {
  _id: string;
  familyId: string;
  title: string;
  type: 'grocery' | 'packing' | 'travel' | 'ideas' | 'custom';
  icon?: string;
  items: {
    id: string;
    text: string;
    checked: boolean;
    addedBy: string;
    addedAt: Date;
    checkedBy?: string;
    checkedAt?: Date;
    notes?: string;
  }[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  isArchived: boolean;
}

export interface SleepEntry {
  _id: string;
  familyId: string;
  childId: string;
  date: Date;
  bedtime?: Date;
  wakeTime?: Date;
  naps: {
    startTime: Date;
    endTime: Date;
    duration: number;
  }[];
  totalSleep: number;
  quality?: 'poor' | 'fair' | 'good' | 'excellent';
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
