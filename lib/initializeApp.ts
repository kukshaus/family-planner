/**
 * App Initialization
 * Initialize local database on app startup
 */

import { initializeSeedData } from './seedData';

export function initializeApp() {
  if (typeof window === 'undefined') return;

  // Initialize seed data
  initializeSeedData();

  console.log('✅ App initialized with local database');
  console.log('📦 Sample data loaded');
  console.log('🚀 All features are ready to use!');
}

// Auto-initialize
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
  } else {
    initializeApp();
  }
}
