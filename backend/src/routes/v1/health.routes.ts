import { Router } from 'express';
import { handleHealthCheck } from '../../controllers/index.js';
import { asyncHandler } from '../../utils/index.js';

const router = Router();

// GET /api/v1/health
router.get('/', asyncHandler(handleHealthCheck));

export default router;
