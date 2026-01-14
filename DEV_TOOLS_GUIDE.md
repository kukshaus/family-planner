# 🛠️ Developer Tools - Quick Guide

## 🎯 Purpose

A **built-in developer dashboard** to manage your local database with sample data!

---

## 🚀 How to Access

### Option 1: Sidebar Navigation
1. Look at the sidebar menu
2. Click **"Dev Tools"** at the bottom (with 🗄️ database icon)

### Option 2: Direct URL
```
http://localhost:3000/dev-tools
```

---

## ✨ Features

### 1. **Reinitialize Data** 🔄
- **What it does:** Clears everything and loads fresh sample data
- **Sample data includes:**
  - 4 Family Members (Sarah, Mike, Emma, Jake)
  - 5 Tasks (various priorities and statuses)
  - 4 Calendar Events
  - 4 Meal Plans
  - 8 Shopping List Items
  - 4 Photos
  - 5 Rewards
  - 3 Sleep Entries
- **Use when:** Database is empty or you want to reset to defaults

### 2. **Export Database** 💾
- Downloads all your data as a JSON file
- File name: `family-planner-backup-YYYY-MM-DD.json`
- Use for backups or sharing

### 3. **Import Database** 📥
- Restore data from a previously exported JSON file
- Replaces all current data
- Perfect for moving data between browsers

### 4. **Clear All Data** 🗑️
- Removes everything from the database
- **⚠️ Warning:** This cannot be undone!
- Use with caution

### 5. **View Collection Data** 📊
- Click any collection card to view its data
- Data is logged to browser console (F12)
- Great for debugging

---

## 📊 Database Statistics

The page shows:
- **Total Items** - Count of all items across all collections
- **Per-collection counts** - Number of items in each collection
- **Status badges** - "Has Data" (green) or "Empty" (purple)

---

## 🎨 UI Features

✅ **Gradient Header** - Beautiful purple-to-pink gradient  
✅ **Glass Cards** - Modern glassmorphism design  
✅ **Status Messages** - Feedback for every action  
✅ **Hover Effects** - Interactive collection cards  
✅ **Responsive** - Works on all screen sizes  

---

## 📦 Sample Data Details

### 👥 Family Members (4)
| Name | Role | Points | Avatar |
|------|------|--------|--------|
| Sarah | Admin | 245 | 👩 |
| Mike | Parent | 198 | 👨 |
| Emma | Child | 156 | 👧 |
| Jake | Child | 142 | 👦 |

### ✅ Tasks (5)
- Clean kitchen (Emma, medium, 20 pts)
- Grocery shopping (Sarah, high, 30 pts, in-progress)
- Walk the dog (Jake, low, 10 pts)
- Homework - Math (Emma, high, 25 pts, completed)
- Organize garage (Mike, medium, 40 pts)

### 📅 Events (4)
- Doctor Appointment (Today 10:30 AM)
- Soccer Practice (Today 4:00 PM)
- Family Dinner (Today 6:30 PM)
- Movie Night (Tomorrow 7:00 PM)

### 🍽️ Meals (4)
- Today: Breakfast (Avocado Toast, 320 cal)
- Today: Lunch (Quinoa Salad, 450 cal)
- Today: Dinner (Grilled Salmon, 520 cal)
- Tomorrow: Breakfast (Oatmeal, 280 cal)

### 🛒 Shopping List (8)
- 🥑 Avocados (2 pc) ✓
- 🐟 Salmon (150g) ✓
- 🥛 Yogurt (200g)
- 🍫 Chocolate (50g)
- 🧅 Red Onion (1/4 pc)
- 🥬 Lettuce (2 pc)
- 🍞 Bread (1 loaf)
- 🥚 Eggs (12 pc)

### 📸 Photos (4)
- Birthday Party
- Beach Day
- Park Visit
- Game Night

### 🏆 Rewards (5)
- Extra Screen Time (50 pts)
- Choose Dinner (75 pts)
- Movie Night Pick (60 pts)
- Sleep In Saturday (100 pts)
- Ice Cream Trip (80 pts)

### 😴 Sleep Entries (3)
- Emma: 10 hours (excellent quality)
- Jake: 10 hours (good quality)
- Emma: 9.5 hours (good quality)

---

## 🔧 Use Cases

### 1. **First Time Setup**
If your database is empty:
1. Go to Dev Tools
2. Click "Reinitialize Data"
3. All sample data loads instantly!

### 2. **Testing Features**
Need sample data to test with:
1. Reinitialize to get fresh data
2. Test your features
3. Clear and reinitialize when done

### 3. **Backup Before Changes**
Before making major changes:
1. Click "Export Database"
2. Save the JSON file
3. Make your changes
4. If something breaks, import the backup!

### 4. **Debugging**
To inspect data:
1. Click any collection card
2. Open browser console (F12)
3. See all data logged there

### 5. **Moving Data**
Transfer data to another browser:
1. Export on first browser
2. Email/copy the JSON file
3. Import on second browser

---

## 💡 Tips

### Tip 1: Check Console
After clicking a collection, press **F12** to see the console where data is logged.

### Tip 2: Backup Regularly
Export your database periodically, especially before testing new features.

### Tip 3: Fresh Start
If anything seems broken, just click "Reinitialize Data" for a clean slate.

### Tip 4: Browser Storage
Data is stored in `localStorage` - it persists until you clear browser data or use "Clear All Data".

### Tip 5: Development Only
This page is for development. You might want to hide it in production or add authentication.

---

## 🚨 Troubleshooting

### Problem: Database is empty
**Solution:** Click "Reinitialize Data" button

### Problem: Can't see new data
**Solution:** 
1. Click "Reinitialize Data"
2. Navigate to the feature page (e.g., Tasks)
3. Refresh if needed

### Problem: Import doesn't work
**Solution:** Make sure you're importing a valid JSON file exported from this app

### Problem: Export downloads empty file
**Solution:** Reinitialize data first, then export

---

## 🎯 Quick Actions

```
🔄 Reinitialize → Fresh sample data (40+ items)
💾 Export      → Download backup file
📥 Import      → Restore from backup
🗑️ Clear       → Delete everything
📊 View        → Log data to console
```

---

## 📱 Access Points

### Desktop
- Sidebar: "Dev Tools" menu item at the bottom
- Direct: `http://localhost:3000/dev-tools`

### Mobile
- Access via direct URL (not in mobile nav to save space)

---

## ✨ Result

With Dev Tools, you can:
✅ **See data immediately** - No empty database  
✅ **Reset anytime** - Fresh start with one click  
✅ **Backup your work** - Export/import features  
✅ **Debug easily** - View data in console  
✅ **Manage collections** - See what's in each collection  

**Your database now has visible sample data! 🎉**

---

## 🔗 Related

- **Local Database Guide:** `LOCAL_DATABASE.md`
- **Implementation Details:** `LOCAL_DB_IMPLEMENTATION.md`
- **Seed Data Source:** `lib/seedData.ts`
- **Database Core:** `lib/localDB.ts`

---

**Happy developing! 🚀**
