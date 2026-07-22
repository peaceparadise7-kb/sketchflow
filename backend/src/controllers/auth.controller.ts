import { Request, Response } from 'express';
import { registerSchema } from '../validators/index';
import { registerUser } from '../services/index';
import { HTTP_STATUS } from '../constants/index';

export const handleRegister = async (req: Request, res: Response): Promise<Response> => {
  const validatedInput = registerSchema.parse(req.body);
  await registerUser(validatedInput);

  return res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: 'Registration successful',
  });
};
