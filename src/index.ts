// src/app.ts

import express, { Request, Response, NextFunction } from 'express';
import { CacheController } from './controllers/cache.controller';
import { asyncHandler } from './utils/asynchangler';

const app = express();
const cacheController = new CacheController();

app.use(express.json());

const validateKey = (req: Request, res: Response, next: NextFunction): void => {
    const { key } = req.params;
    if (!key) {
        res.status(400).json({ error: 'Key is required' });
        return;
    }
    next();
};

app.post('/cache', asyncHandler(async (req: Request, res: Response) => {
    await cacheController.setValue(req, res);
}));

app.get('/cache/:key', validateKey, asyncHandler(async (req: Request, res: Response) => {
    await cacheController.getValue(req, res);
}));

app.delete('/cache/:key', validateKey, asyncHandler(async (req: Request, res: Response) => {
    await cacheController.deleteValue(req, res);
}));


app.get('/cahce-all',asyncHandler(async(req,res)=>{
    await cacheController.getall(req,res)
}))
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;