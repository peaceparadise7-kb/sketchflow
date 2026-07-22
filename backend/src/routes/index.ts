import { Router } from 'express';
import v1Router from './v1/index';

const rootRouter = Router();

// API versioning endpoint /api/v1/
rootRouter.use('/api/v1', v1Router);

export default rootRouter;
