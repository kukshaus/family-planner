/**
 * Local Storage Database
 * A simple, fast local database using localStorage
 * Mimics MongoDB operations for easy migration later
 */

export type Collection = 
  | 'users'
  | 'families'
  | 'events'
  | 'tasks'
  | 'rewards'
  | 'rewardClaims'
  | 'meals'
  | 'recipes'
  | 'photos'
  | 'albums'
  | 'lists'
  | 'sleepEntries'
  | 'settings';

interface Document {
  _id: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

class LocalDB {
  private prefix = 'family_planner_';

  /**
   * Generate a unique ID
   */
  private generateId(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get collection data from localStorage
   */
  private getCollection<T extends Document>(collection: Collection): T[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(`${this.prefix}${collection}`);
    return data ? JSON.parse(data) : [];
  }

  /**
   * Save collection data to localStorage
   */
  private saveCollection<T extends Document>(collection: Collection, data: T[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(`${this.prefix}${collection}`, JSON.stringify(data));
  }

  /**
   * Find all documents in a collection
   */
  findAll<T extends Document>(collection: Collection, filter?: Partial<T>): T[] {
    let data = this.getCollection<T>(collection);

    if (filter) {
      data = data.filter((item) => {
        return Object.keys(filter).every((key) => {
          const filterValue = filter[key as keyof T];
          const itemValue = item[key as keyof T];
          return filterValue === itemValue;
        });
      });
    }

    return data;
  }

  /**
   * Find one document by ID
   */
  findById<T extends Document>(collection: Collection, id: string): T | null {
    const data = this.getCollection<T>(collection);
    return data.find((item) => item._id === id) || null;
  }

  /**
   * Find one document by filter
   */
  findOne<T extends Document>(collection: Collection, filter: Partial<T>): T | null {
    const results = this.findAll<T>(collection, filter);
    return results[0] || null;
  }

  /**
   * Insert a new document
   */
  insertOne<T extends Document>(collection: Collection, document: Omit<T, '_id' | 'createdAt' | 'updatedAt'>): T {
    const data = this.getCollection<T>(collection);
    const now = new Date().toISOString();
    
    const newDoc = {
      ...document,
      _id: this.generateId(),
      createdAt: now,
      updatedAt: now,
    } as T;

    data.push(newDoc);
    this.saveCollection(collection, data);
    
    return newDoc;
  }

  /**
   * Insert multiple documents
   */
  insertMany<T extends Document>(collection: Collection, documents: Omit<T, '_id' | 'createdAt' | 'updatedAt'>[]): T[] {
    const data = this.getCollection<T>(collection);
    const now = new Date().toISOString();
    
    const newDocs = documents.map((doc) => ({
      ...doc,
      _id: this.generateId(),
      createdAt: now,
      updatedAt: now,
    })) as T[];

    data.push(...newDocs);
    this.saveCollection(collection, data);
    
    return newDocs;
  }

  /**
   * Update a document by ID
   */
  updateById<T extends Document>(collection: Collection, id: string, updates: Partial<T>): T | null {
    const data = this.getCollection<T>(collection);
    const index = data.findIndex((item) => item._id === id);

    if (index === -1) return null;

    data[index] = {
      ...data[index],
      ...updates,
      _id: data[index]._id, // Preserve ID
      createdAt: data[index].createdAt, // Preserve creation date
      updatedAt: new Date().toISOString(),
    };

    this.saveCollection(collection, data);
    return data[index];
  }

  /**
   * Update multiple documents
   */
  updateMany<T extends Document>(collection: Collection, filter: Partial<T>, updates: Partial<T>): number {
    const data = this.getCollection<T>(collection);
    let updatedCount = 0;

    const updatedData = data.map((item) => {
      const matches = Object.keys(filter).every((key) => {
        const filterValue = filter[key as keyof T];
        const itemValue = item[key as keyof T];
        return filterValue === itemValue;
      });

      if (matches) {
        updatedCount++;
        return {
          ...item,
          ...updates,
          _id: item._id,
          createdAt: item.createdAt,
          updatedAt: new Date().toISOString(),
        };
      }

      return item;
    });

    this.saveCollection(collection, updatedData);
    return updatedCount;
  }

  /**
   * Delete a document by ID
   */
  deleteById<T extends Document>(collection: Collection, id: string): boolean {
    const data = this.getCollection<T>(collection);
    const filteredData = data.filter((item) => item._id !== id);

    if (filteredData.length === data.length) return false;

    this.saveCollection(collection, filteredData);
    return true;
  }

  /**
   * Delete multiple documents
   */
  deleteMany<T extends Document>(collection: Collection, filter: Partial<T>): number {
    const data = this.getCollection<T>(collection);
    const filteredData = data.filter((item) => {
      return !Object.keys(filter).every((key) => {
        const filterValue = filter[key as keyof T];
        const itemValue = item[key as keyof T];
        return filterValue === itemValue;
      });
    });

    const deletedCount = data.length - filteredData.length;
    this.saveCollection(collection, filteredData);
    
    return deletedCount;
  }

  /**
   * Count documents
   */
  count<T extends Document>(collection: Collection, filter?: Partial<T>): number {
    return this.findAll<T>(collection, filter).length;
  }

  /**
   * Clear a collection
   */
  clearCollection(collection: Collection): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(`${this.prefix}${collection}`);
  }

  /**
   * Clear entire database
   */
  clearDatabase(): void {
    if (typeof window === 'undefined') return;
    const collections: Collection[] = [
      'users', 'families', 'events', 'tasks', 'rewards', 'rewardClaims',
      'meals', 'recipes', 'photos', 'albums', 'lists', 'sleepEntries', 'settings'
    ];
    collections.forEach((collection) => this.clearCollection(collection));
  }

  /**
   * Export database (for backup)
   */
  exportDatabase(): Record<string, any[]> {
    if (typeof window === 'undefined') return {};
    const collections: Collection[] = [
      'users', 'families', 'events', 'tasks', 'rewards', 'rewardClaims',
      'meals', 'recipes', 'photos', 'albums', 'lists', 'sleepEntries', 'settings'
    ];
    
    const exported: Record<string, any[]> = {};
    collections.forEach((collection) => {
      exported[collection] = this.getCollection(collection);
    });
    
    return exported;
  }

  /**
   * Import database (from backup)
   */
  importDatabase(data: Record<string, any[]>): void {
    if (typeof window === 'undefined') return;
    Object.keys(data).forEach((collection) => {
      this.saveCollection(collection as Collection, data[collection]);
    });
  }
}

// Singleton instance
export const localDB = new LocalDB();
