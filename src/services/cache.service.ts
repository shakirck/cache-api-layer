// src/services/cache.service.ts

import { CacheEntry, CacheStore } from '../types/cache.type';

export class CacheService {
    private static instance: CacheService;
    private store: CacheStore;

    private constructor() {
        this.store = {};
    }

    public static getInstance(): CacheService {
        if (!CacheService.instance) {
            CacheService.instance = new CacheService();
        }
        return CacheService.instance;
    }

    public async set(key: string, value: any, ttl?: number): Promise<void> {
        console.log(key , value , ttl)
        this.store[key] = {
            value,
            timestamp: Date.now()
        };

        console.log(this.store)

        // if (ttl) {
        //     setTimeout(() => {
        //         this.delete(key);
        //     }, ttl * 1000);
        // }
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
    public async getall():Promise<any> {
        return this.store
    }

    public async has(key: string): Promise<boolean> {
        return key in this.store;
    }
}