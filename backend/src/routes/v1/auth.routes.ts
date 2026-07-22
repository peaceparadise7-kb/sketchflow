import { Router } from 'express';
import { handleRegister } from '../../controllers/index';
import { asyncHandler } from '../../utils/index';

const router = Router();

// POST /api/v1/auth/register
router.post('/register', asyncHandler(handleRegister));

export default router;
