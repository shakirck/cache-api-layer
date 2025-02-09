import { CacheEntry, CacheStore } from '../types/cache.type';

export class CacheService {
    private static instance: CacheService;
    private store: CacheStore;
    private size: number;
    
    private constructor(size: number) {
        this.store = {};
        this.size = size;
    }

    public static getInstance(): CacheService {
        if (!CacheService.instance) {
            CacheService.instance = new CacheService(3); 
        }
        return CacheService.instance;
    }

    private getCurrentSize(): number {
        return Object.keys(this.store).length;
    }

    public async set(key: string, value: any, ttl?: number): Promise<{ success: boolean; error?: string }> {
        if (key in this.store) {
            this.store[key] = {
                value,
                timestamp: Date.now()
            };
            return { success: true };
        }

        if (this.getCurrentSize() >= this.size) {
            return {
                success: false,
                error: `Cache is full. Maximum size of ${this.size} reached. Remove some entries before adding new ones.`
            };
        }

        this.store[key] = {
            value,
            timestamp: Date.now()
        };

        return { success: true };
    }

    public async get(key: string): Promise<CacheEntry | null> {
        return this.store[key] || null;
    }

    public async delete(key: string): Promise<boolean> {
        if (key in this.store) {
            delete this.store[key];
            return true;
        }
        return false;
    }

    public async getall(): Promise<CacheStore> {
        return this.store;
    }

    public async has(key: string): Promise<boolean> {
        return key in this.store;
    }

    public async getCacheSize(): Promise<number> {
        return this.getCurrentSize();
    }

    public async getMaxSize(): Promise<number> {
        return this.size;
    }

    public async all(): Promise<any> {
        return this.store;
    }

    
}