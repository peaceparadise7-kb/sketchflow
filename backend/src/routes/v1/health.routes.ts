import { Router } from 'express';
import { handleHealthCheck } from '../../controllers/index';
import { asyncHandler } from '../../utils/index';

const router = Router();

// GET /api/v1/health
router.get('/', asyncHandler(handleHealthCheck));

export default router;
