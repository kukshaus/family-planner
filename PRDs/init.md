# Family Planner App
Product Requirements Document (Initial)

## 1. Product Overview

### 1.1 Product Name
Family Planner

### 1.2 Vision
Family Planner is a modern, privacy focused family coordination platform that brings planning, routines, motivation, and memories into one unified experience. The goal is to reduce mental load for parents and create clarity, structure, and positive habits for the entire family.

### 1.3 Problem Statement
Families currently use fragmented tools such as shared calendars, messaging apps, paper notes, photo galleries, and grocery apps. This leads to missed appointments, duplicated work, unclear responsibilities, and unnecessary stress. There is no single system that combines planning, routines, rewards, meals, sleep, and memories in a family friendly and secure way.

### 1.4 Target Users
Primary users  
- Parents with children aged 0 to 16  
- Single parents and co parents managing shared custody  
- Tech savvy families looking for structure and transparency  

Secondary users  
- Children, using a restricted and gamified interface  
- Caregivers or extended family members with limited access  

---

## 2. Goals and Success Metrics

### 2.1 Business Goals
- Build a habit forming daily use product  
- Achieve strong long term retention through emotional value  
- Enable future monetization via premium plans  

### 2.2 User Goals
- Always know what is happening today and this week  
- Reduce cognitive load around family coordination  
- Motivate children through clear goals and rewards  
- Keep family memories safely organized  

### 2.3 Success Metrics
- DAU to MAU ratio above 40 percent  
- Weekly calendar interaction rate above 80 percent  
- Average tasks completed per family per week  
- 30 day retention above 35 percent  

---

## 3. Technical Architecture

### 3.1 Frontend
- Next.js using App Router  
- TypeScript  
- Tailwind CSS  
- Server Components for data heavy views  
- Client Components for interactive modules  

### 3.2 Backend
- Node.js via Next.js API routes  
- MongoDB Atlas  
- REST endpoints and server actions  

### 3.3 Authentication
- Email and password authentication  
- Google OAuth  
- Family based access control  
- Role system including Admin Parent, Parent, Child, Guest  

### 3.4 Media Storage
- MongoDB for metadata  
- Object storage for photos  
- Image optimization via Next.js Image  

### 3.5 External Integrations
- Google Calendar, two way sync  
- kifli.hu order tracking, read only  
- Future integrations such as Apple Calendar and smart home systems  

---

## 4. Core Concepts and Data Model

### 4.1 Family
The family is the top level container for all data.

Fields  
- familyId  
- name  
- timezone  
- members  

### 4.2 User
- userId  
- email  
- role  
- avatar  
- preferences  

### 4.3 Permissions
Role based access control  
- Parents can manage all features  
- Children can view tasks, rewards, meals, and sleep  
- Guests have limited read only access  

---

## 5. Core Features

### 5.1 Calendar
The calendar is the central hub of the application.

Features  
- Daily, weekly, and monthly views  
- Color coded events per family member  
- Repeating events  
- Reminders and notifications  
- Shared and private events  

Google Calendar integration  
- OAuth based connection  
- Two way synchronization  
- Conflict resolution rules  
- Per calendar enable and disable  

---

### 5.2 Tasks
Household and personal task management.

Features  
- Assign tasks to parents or children  
- One time and recurring tasks  
- Due dates and reminders  
- Completion tracking  

Advanced  
- Task templates  
- Weekly routines  
- Mapping tasks to rewards  

---

### 5.3 Rewards
Gamified motivation system primarily for children.

Features  
- Point based reward system  
- Manual and automatic point assignment  
- Reward catalog such as screen time or activities  
- Parent approval flow  

UX considerations  
- Child friendly dashboards  
- Progress indicators  
- Visual feedback on completion  

---

### 5.4 Meals
Meal planning and food coordination.

Features  
- Weekly meal planner  
- Meals assigned per day  
- Recipes and ingredient lists  
- Allergy and preference handling  

kifli.hu integration  
- Connect account  
- Show order progress and status  
- Display delivery ETA  
- Link meals to grocery orders  

---

### 5.5 Photos
Private family photo and memory storage.

Features  
- Upload from web and mobile  
- Automatic grouping by date  
- Family albums  
- Access control per album  

Future  
- Event based grouping  
- Smart categorization  

---

### 5.6 Lists
Flexible shared lists.

Features  
- Grocery, packing, travel, and idea lists  
- Real time collaboration  
- Checkboxes and notes  
- List templates  

---

### 5.7 Sleep
Sleep tracking focused on children.

Features  
- Bedtime and wake up tracking  
- Nap tracking  
- Daily and weekly averages  
- Notes for context such as illness or travel  

Insights  
- Sleep trends  
- Visual charts  
- Basic recommendations  

---

## 6. Navigation and Page Structure

Main routes  
- /dashboard  
- /calendar  
- /tasks  
- /rewards  
- /meals  
- /photos  
- /lists  
- /sleep  
- /settings  

Layout  
- Top header with family switcher and user menu  
- Left sidebar navigation  
- Responsive mobile navigation  

---

## 7. Notifications
- Push notifications  
- Email reminders  
- In app notification center  

---

## 8. Non Functional Requirements

### Performance
- Initial page load under 2 seconds  
- Optimistic UI updates  

### Security
- Encrypted credentials  
- Secure media access  
- Role based isolation  

### Privacy
- Family scoped data  
- No third party data sharing  
- GDPR compliance  

---

## 9. Future Roadmap

Phase 2  
- Native mobile applications  
- Offline support  
- AI assisted scheduling suggestions  

Phase 3  
- Smart home integrations  
- Advanced analytics  
- Marketplace for family related services  

---

## 10. Open Questions
- Scope and stability of kifli.hu APIs  
- Offline photo upload behavior  
- Data export and backup strategy  

---

## 11. Detailed Data Structures

### 11.1 Family Schema
```typescript
interface Family {
  _id: ObjectId;
  name: string;
  timezone: string;
  createdAt: Date;
  updatedAt: Date;
  members: FamilyMember[];
  settings: {
    weekStartsOn: 0 | 1; // Sunday or Monday
    currency: string;
    language: string;
  };
}

interface FamilyMember {
  userId: ObjectId;
  role: 'admin' | 'parent' | 'child' | 'guest';
  nickname: string;
  avatar: string;
  color: string; // For color-coding in calendar
  joinedAt: Date;
}
```

### 11.2 User Schema
```typescript
interface User {
  _id: ObjectId;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  families: ObjectId[]; // References to Family documents
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    notifications: {
      email: boolean;
      push: boolean;
      tasks: boolean;
      events: boolean;
    };
  };
  googleAuth?: {
    googleId: string;
    accessToken: string;
    refreshToken: string;
  };
}
```

### 11.3 Event Schema (Calendar)
```typescript
interface Event {
  _id: ObjectId;
  familyId: ObjectId;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  allDay: boolean;
  location?: string;
  attendees: ObjectId[]; // User IDs
  color: string;
  isPrivate: boolean;
  recurrence?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: Date;
    daysOfWeek?: number[]; // 0-6 for Sun-Sat
  };
  reminders: {
    type: 'notification' | 'email';
    minutesBefore: number;
  }[];
  googleCalendarId?: string;
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
```

### 11.4 Task Schema
```typescript
interface Task {
  _id: ObjectId;
  familyId: ObjectId;
  title: string;
  description?: string;
  assignedTo: ObjectId[];
  createdBy: ObjectId;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed' | 'archived';
  category: 'household' | 'personal' | 'shopping' | 'other';
  completedAt?: Date;
  completedBy?: ObjectId;
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
```

### 11.5 Reward Schema
```typescript
interface Reward {
  _id: ObjectId;
  familyId: ObjectId;
  title: string;
  description: string;
  icon: string;
  pointsCost: number;
  category: 'screen-time' | 'activity' | 'treat' | 'privilege' | 'custom';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface RewardClaim {
  _id: ObjectId;
  familyId: ObjectId;
  rewardId: ObjectId;
  childId: ObjectId;
  pointsSpent: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  requestedAt: Date;
  approvedBy?: ObjectId;
  approvedAt?: Date;
  notes?: string;
}

interface PointsBalance {
  _id: ObjectId;
  familyId: ObjectId;
  userId: ObjectId;
  balance: number;
  history: {
    amount: number;
    type: 'earned' | 'spent' | 'adjusted';
    reason: string;
    taskId?: ObjectId;
    rewardClaimId?: ObjectId;
    timestamp: Date;
  }[];
}
```

### 11.6 Meal Schema
```typescript
interface Meal {
  _id: ObjectId;
  familyId: ObjectId;
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
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

interface KifliOrder {
  _id: ObjectId;
  familyId: ObjectId;
  orderId: string;
  status: 'pending' | 'processing' | 'delivering' | 'delivered';
  orderDate: Date;
  deliveryDate?: Date;
  estimatedDelivery?: Date;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  linkedMealIds?: ObjectId[];
}
```

### 11.7 Photo Schema
```typescript
interface Album {
  _id: ObjectId;
  familyId: ObjectId;
  title: string;
  description?: string;
  coverPhotoId?: ObjectId;
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  access: {
    viewableBy: ObjectId[];
    editableBy: ObjectId[];
  };
}

interface Photo {
  _id: ObjectId;
  familyId: ObjectId;
  albumId?: ObjectId;
  url: string;
  thumbnailUrl: string;
  caption?: string;
  takenAt: Date;
  uploadedBy: ObjectId;
  uploadedAt: Date;
  metadata: {
    width: number;
    height: number;
    fileSize: number;
    mimeType: string;
  };
  tags: ObjectId[]; // Tagged family members
}
```

### 11.8 List Schema
```typescript
interface List {
  _id: ObjectId;
  familyId: ObjectId;
  title: string;
  type: 'grocery' | 'packing' | 'travel' | 'ideas' | 'custom';
  icon?: string;
  items: {
    id: string;
    text: string;
    checked: boolean;
    addedBy: ObjectId;
    addedAt: Date;
    checkedBy?: ObjectId;
    checkedAt?: Date;
    notes?: string;
  }[];
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  isArchived: boolean;
}
```

### 11.9 Sleep Schema
```typescript
interface SleepEntry {
  _id: ObjectId;
  familyId: ObjectId;
  childId: ObjectId;
  date: Date;
  bedtime?: Date;
  wakeTime?: Date;
  naps: {
    startTime: Date;
    endTime: Date;
    duration: number; // in minutes
  }[];
  totalSleep: number; // in minutes
  quality?: 'poor' | 'fair' | 'good' | 'excellent';
  notes?: string;
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 12. UI Design Specifications

### 12.1 Modern Color Palette

Primary Colors (Vibrant & Energetic)
- Primary: #6366F1 (Indigo) - Main actions, links
- Primary Light: #818CF8
- Primary Dark: #4F46E5
- Secondary: #EC4899 (Pink) - Accents, highlights
- Secondary Light: #F472B6
- Secondary Dark: #DB2777

Functional Colors
- Success: #10B981 (Emerald)
- Warning: #F59E0B (Amber)
- Error: #EF4444 (Red)
- Info: #3B82F6 (Blue)

Neutral Colors
- Background: #FFFFFF (Light mode), #0F172A (Dark mode)
- Surface: #F8FAFC (Light mode), #1E293B (Dark mode)
- Border: #E2E8F0 (Light mode), #334155 (Dark mode)
- Text Primary: #0F172A (Light mode), #F8FAFC (Dark mode)
- Text Secondary: #64748B
- Text Muted: #94A3B8

Gradient Accents (For Headers & Cards)
- Sunset: linear-gradient(135deg, #667EEA 0%, #F093FB 100%)
- Ocean: linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)
- Forest: linear-gradient(135deg, #43E97B 0%, #38F9D7 100%)
- Dawn: linear-gradient(135deg, #FA709A 0%, #FEE140 100%)

### 12.2 Typography

Font Family
- Primary: 'Inter', sans-serif
- Headings: 'Manrope', sans-serif
- Monospace: 'JetBrains Mono', monospace

Font Sizes (Mobile First)
- xs: 0.75rem (12px)
- sm: 0.875rem (14px)
- base: 1rem (16px)
- lg: 1.125rem (18px)
- xl: 1.25rem (20px)
- 2xl: 1.5rem (24px)
- 3xl: 1.875rem (30px)
- 4xl: 2.25rem (36px)

### 12.3 Spacing & Layout

Container Widths
- Mobile: 100% (< 640px)
- Tablet: 768px (640px - 1024px)
- Desktop: 1280px (> 1024px)

Grid System
- 12 column grid
- Gap: 1rem (mobile), 1.5rem (tablet), 2rem (desktop)

Padding & Margins
- Section padding: 1rem (mobile), 2rem (tablet), 3rem (desktop)
- Card padding: 1rem (mobile), 1.5rem (tablet+)
- Element spacing: 0.5rem, 1rem, 1.5rem, 2rem

### 12.4 Component Design Guidelines

Cards
- Border radius: 12px (mobile), 16px (desktop)
- Shadow: 0 1px 3px rgba(0,0,0,0.1)
- Hover shadow: 0 4px 12px rgba(0,0,0,0.15)
- Background: White/Surface color
- Border: 1px solid border color

Buttons
- Border radius: 8px
- Height: 40px (small), 48px (medium), 56px (large)
- Padding: 12px 24px
- Hover: Darken by 10%
- Active: Scale 0.98
- Disabled: Opacity 0.5

Input Fields
- Border radius: 8px
- Height: 48px
- Padding: 12px 16px
- Border: 2px solid border color
- Focus: Border changes to primary color
- Error: Border changes to error color

Navigation
- Mobile: Bottom tab bar (fixed)
- Tablet: Side drawer (collapsible)
- Desktop: Left sidebar (always visible)
- Height: 64px (top bar), 60px (bottom bar)

### 12.5 Page Layouts

Dashboard Layout
- Hero section with greeting and quick stats
- 4-column grid (1 col mobile, 2 col tablet, 4 col desktop)
- Widgets: Today's events, pending tasks, reward progress, recent photos
- Quick actions floating button (bottom right)

Calendar Layout
- Header with view selector (day/week/month)
- Date navigation (prev/today/next)
- Main calendar grid
- Side panel for event details (desktop only)
- Add event button (bottom right)

Tasks Layout
- Filter bar (all/pending/completed)
- Sort options (due date, priority, assignee)
- Task cards in list view
- Swipe actions on mobile (complete, delete)
- Quick add input at top

Rewards Layout (Child View)
- Points balance card at top (large, colorful)
- Available rewards carousel
- My claims section
- Task completion history

Meals Layout
- Weekly calendar view
- Each day shows breakfast/lunch/dinner slots
- Tap to add/edit meal
- Recipe modal with ingredients
- Kifli.hu order status card (if connected)

Photos Layout
- Masonry grid layout
- Album selection dropdown
- Upload button (bottom right)
- Lightbox for full view
- Share & download options

Lists Layout
- List selector tabs at top
- Add item input
- List items with checkboxes
- Swipe to delete on mobile
- Templates library button

Sleep Layout
- Child selector at top
- Sleep summary cards (avg this week)
- Calendar heatmap view
- Daily entry form
- Chart showing trends (7/30/90 days)

### 12.6 Responsive Breakpoints

Mobile (320px - 639px)
- Single column layout
- Bottom navigation
- Full-width cards
- Simplified headers
- Touch-optimized (44px minimum tap target)

Tablet (640px - 1023px)
- Two column layout
- Side drawer navigation
- Card grids (2 columns)
- Enhanced spacing

Desktop (1024px+)
- Multi-column layouts
- Persistent sidebar
- Larger content areas
- Hover states
- Keyboard shortcuts

### 12.7 Animations & Interactions

Transitions
- Duration: 150ms (fast), 300ms (normal), 500ms (slow)
- Easing: ease-in-out
- Properties: opacity, transform, background-color

Microinteractions
- Button press: Scale down to 0.98
- Card hover: Lift with shadow
- Checkbox: Checkmark animation
- Toggle: Smooth slide
- Toast notifications: Slide in from top

Loading States
- Skeleton screens for content
- Spinner for actions
- Progress bars for uploads
- Optimistic UI updates

### 12.8 Accessibility

- WCAG 2.1 AA compliance
- Minimum contrast ratio 4.5:1
- Focus indicators on all interactive elements
- Keyboard navigation support
- Screen reader friendly labels
- Touch targets minimum 44x44px
- Skip to content links
- Semantic HTML

### 12.9 Icons

Icon Library: Lucide React (or Heroicons)
- Consistent stroke width (2px)
- Size variants: 16px, 20px, 24px, 32px
- Use outlined style primarily
- Filled style for active/selected states

Common Icons
- Calendar: calendar-days
- Tasks: check-square
- Rewards: trophy
- Meals: utensils
- Photos: image
- Lists: list-checks
- Sleep: moon
- Settings: settings
- Add: plus-circle
- User: user-circle

---

## 13. Mobile Optimization

### 13.1 Touch Interactions
- All tap targets minimum 44x44px
- Swipe gestures for common actions
- Pull to refresh on lists
- Long press for context menus
- Haptic feedback on actions (if available)

### 13.2 Performance
- Lazy loading for images
- Virtual scrolling for long lists
- Code splitting by route
- Prefetch critical routes
- Service worker for offline capability (future)

### 13.3 Mobile-Specific Features
- Camera integration for photos
- Location services for events
- Push notifications
- Share sheet integration
- Install as PWA option

### 13.4 Navigation Patterns
- Bottom tab bar for main sections
- Gesture-based navigation (swipe back)
- Modal sheets for forms
- Drawer for secondary navigation
- Floating action button for primary actions