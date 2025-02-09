// src/controllers/cache.controller.ts

import { Request, Response } from 'express';
import { CacheService } from '../services/cache.service';

export class CacheController {
    private cacheService: CacheService;

    constructor() {
        this.cacheService = CacheService.getInstance();
    }

    public async setValue(req: Request, res: Response): Promise<void> {
        const { key, value, ttl } = req.body;

        if (!key || value === undefined) {
            res.status(400).json({ error: 'Key and value are required' });
            return;
        }

        await this.cacheService.set(key, value, ttl);
        res.status(201).json({
            message: 'Value stored successfully',
            key
        });
    }

    public async getValue(req: Request, res: Response): Promise<void> {
        const { key } = req.params;
        console.log(key,'to find')
        console.log(await this.cacheService.getall())
        const cached = await this.cacheService.get(key);

        if (!cached) {
            res.status(404).json({ error: 'Key not found in cache' });
            return;
        }

        res.json({
            value: cached.value,
            cached_at: new Date(cached.timestamp).toISOString()
        });
    }

    public async deleteValue(req: Request, res: Response): Promise<void> {
        const { key } = req.params;
        const exists = await this.cacheService.has(key);

        if (!exists) {
            res.status(404).json({ error: 'Key not found in cache' });
            return;
        }

        await this.cacheService.delete(key);
        res.json({
            message: 'Cache entry removed successfully'
        });
    }
    public async getall(req: Request, res: Response): Promise<void> {
        const data = await this.cacheService.getall
 

        res.json({
            message: DataView
        });
    }
}