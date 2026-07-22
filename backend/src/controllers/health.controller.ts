import { Request, Response } from 'express';
import { getHealthStatus } from '../services/index';
import { HTTP_STATUS } from '../constants/index';

export const handleHealthCheck = (_req: Request, res: Response): Response => {
  const result = getHealthStatus();
  return res.status(HTTP_STATUS.OK).json(result);
};
