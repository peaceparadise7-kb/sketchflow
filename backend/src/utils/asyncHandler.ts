import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AsyncController } from '../types/index.js';

export const asyncHandler = (fn: AsyncController): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
