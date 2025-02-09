// src/app.ts

import express, { Request, Response, NextFunction } from 'express';
import { CacheController } from './controllers/cache.controller';
import { asyncHandler } from './utils/asynchangler';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './config/swagger';

const app = express();
const cacheController = new CacheController();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
  }));
  
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


app.get('/list',asyncHandler(async(req,res)=>{
    await cacheController.listall(req,res)
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