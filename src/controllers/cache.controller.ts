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

        const result = await this.cacheService.set(key, value, ttl);
        
        if (!result.success) {
            res.status(400).json({ error: result.error });
            return;
        }

        res.status(201).json({
            message: 'Value stored successfully',
            key
        });
    }

    public async getValue(req: Request, res: Response): Promise<void> {
        const { key } = req.params;
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
    public async listall(req: Request, res: Response): Promise<void> {
        const data = await this.cacheService.all()
        res.json({
            message:  data
        });
    }

    
    public async getCacheInfo(req: Request, res: Response): Promise<void> {
        const currentSize = await this.cacheService.getCacheSize();
        const maxSize = await this.cacheService.getMaxSize();
        const entries = await this.cacheService.getall();

        res.json({
            currentSize,
            maxSize,
            available: maxSize - currentSize,
            entries
        });
    }
}