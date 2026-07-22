import { Request, Response, NextFunction } from 'express';
import './express.d.ts';

export interface AppEnvConfig {
  PORT: number;
  NODE_ENV: 'development' | 'production' | 'test';
  MONGO_URI: string;
}

export type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown> | unknown;
