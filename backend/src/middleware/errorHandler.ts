import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/AppError';
import { HTTP_STATUS } from '../constants/httpStatusCodes';
import { env } from '../config/env.config';
import { logger } from '../utils/logger';

interface MongoError {
  code?: number;
  stack?: string;
}

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  let statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message = 'Internal Server Error';
  let stack: string | undefined = undefined;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    stack = err.stack;
  } else if (err instanceof ZodError) {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = 'Validation Error: ' + err.issues.map((issue) => issue.message).join(', ');
    stack = err.stack;
  } else if (typeof err === 'object' && err !== null && ('code' in err) && (err as MongoError).code === 11000) {
    statusCode = HTTP_STATUS.CONFLICT;
    message = 'Email already registered';
    stack = (err as MongoError).stack;
  } else if (err instanceof Error) {
    message = err.message;
    stack = err.stack;
  } else if (typeof err === 'string') {
    message = err;
  }

  const requestId = req.requestId || 'unknown';
  const timestamp = new Date().toISOString();

  logger.error(`[Error] [${requestId}] ${statusCode} - ${message}`, stack);

  return res.status(statusCode).json({
    success: false,
    error: {
      message,
      statusCode,
      ...(env.NODE_ENV === 'development' && stack ? { stack } : {}),
    },
    requestId,
    timestamp,
  });
};
