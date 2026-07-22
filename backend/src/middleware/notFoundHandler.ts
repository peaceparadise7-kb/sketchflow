import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { HTTP_STATUS } from '../constants/httpStatusCodes';

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction): void => {
  next(new AppError(`Route ${req.originalUrl} not found`, HTTP_STATUS.NOT_FOUND));
};
