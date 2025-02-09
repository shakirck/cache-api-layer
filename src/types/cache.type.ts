export interface CacheEntry {
    value: any;
    timestamp: number;
}

export interface CacheStore {
    [key: string]: CacheEntry;
}

export interface CacheRequestBody {
    key: string;
    value: any;
    ttl?: number;
}