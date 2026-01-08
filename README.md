# Family Planner 👨‍👩‍👧‍👦

A modern, privacy-focused family coordination platform built with Next.js, TypeScript, and MongoDB. Organize your family life with planning, routines, motivation, and memories all in one place.

![Family Planner](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)

## ✨ Features

- **📅 Smart Calendar** - Manage family events with Google Calendar sync
- **✅ Task Management** - Assign and track household tasks with rewards
- **🏆 Gamification** - Motivate children with points and rewards system
- **🍽️ Meal Planning** - Plan weekly meals with recipe management
- **📸 Photo Gallery** - Secure family photo storage and albums
- **📝 Shared Lists** - Collaborative grocery, packing, and todo lists
- **😴 Sleep Tracking** - Monitor children's sleep patterns and quality
- **⚙️ Family Settings** - Role-based access control and preferences

## 🎨 Design Highlights

- **Modern UI** - Vibrant gradients and smooth animations designed for young parents
- **Fully Responsive** - Optimized for mobile, tablet, and desktop
- **Dark Mode** - Built-in theme switching
- **Accessible** - WCAG 2.1 AA compliant
- **PWA Ready** - Install as a native app

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd family-planner
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/family-planner
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Optional
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
KIFLI_API_KEY=your-kifli-api-key
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
family-planner/
├── app/
│   ├── (app)/              # Protected app routes
│   │   ├── dashboard/      # Dashboard page
│   │   ├── calendar/       # Calendar feature
│   │   ├── tasks/          # Task management
│   │   ├── rewards/        # Rewards system
│   │   ├── meals/          # Meal planning
│   │   ├── photos/         # Photo gallery
│   │   ├── lists/          # Shared lists
│   │   ├── sleep/          # Sleep tracking
│   │   └── settings/       # Settings page
│   ├── auth/               # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles
├── components/
│   ├── layout/             # Layout components
│   │   ├── AppLayout.tsx
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── MobileNav.tsx
│   └── ui/                 # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       ├── Avatar.tsx
│       └── Badge.tsx
├── lib/
│   ├── mongodb.ts          # MongoDB connection
│   ├── types.ts            # TypeScript types
│   ├── utils.ts            # Utility functions
│   └── constants.ts        # App constants
├── PRDs/
│   └── init.md             # Detailed PRD with specs
└── public/
    └── manifest.json       # PWA manifest
```

## 🎯 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Database**: MongoDB Atlas
- **Authentication**: NextAuth.js (Email/Password + Google OAuth)
- **Icons**: Lucide React
- **Fonts**: Inter, Manrope

## 🎨 Color Palette

The app uses a modern, vibrant color scheme:

- **Primary**: #6366F1 (Indigo) - Main actions
- **Secondary**: #EC4899 (Pink) - Accents
- **Success**: #10B981 (Emerald)
- **Warning**: #F59E0B (Amber)
- **Error**: #EF4444 (Red)
- **Gradients**: Sunset, Ocean, Forest, Dawn

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1023px
- **Desktop**: ≥ 1024px

## 🔐 Security Features

- Role-based access control (Admin, Parent, Child, Guest)
- Encrypted credentials
- Family-scoped data isolation
- GDPR compliant

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Adding New Features

1. Create route in `app/(app)/feature-name/page.tsx`
2. Add navigation item in `components/layout/Sidebar.tsx` and `MobileNav.tsx`
3. Define types in `lib/types.ts`
4. Add API routes if needed

## 📝 API Structure

MongoDB Collections:
- `users` - User accounts
- `families` - Family groups
- `events` - Calendar events
- `tasks` - Task items
- `rewards` - Reward catalog
- `rewardClaims` - Reward claims
- `meals` - Meal plans
- `photos` - Photo metadata
- `albums` - Photo albums
- `lists` - Shared lists
- `sleepEntries` - Sleep tracking data

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### MongoDB Atlas Setup

1. Create a cluster
2. Add database user
3. Whitelist IP addresses
4. Get connection string

## 📚 Documentation

For detailed specifications, data structures, and UI guidelines, see [PRDs/init.md](PRDs/init.md)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 👏 Acknowledgments

- Icons by [Lucide](https://lucide.dev)
- Images from [Unsplash](https://unsplash.com)
- Fonts from [Google Fonts](https://fonts.google.com)

---

Built with ❤️ for families everywhere
