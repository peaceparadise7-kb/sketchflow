import dotenv from 'dotenv';
import { z } from 'zod';
import { AppEnvConfig } from '../types/index.js';
import { logger } from '../utils/logger.js';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number({ message: 'PORT must be a valid number' }),
  NODE_ENV: z.enum(['development', 'production', 'test'], { message: 'NODE_ENV must be development, production, or test' }),
  MONGO_URI: z.string().min(1, { message: 'MONGO_URI environment variable is required' }),
});

const validateEnv = (): AppEnvConfig => {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    logger.error('Environment validation failed:', result.error.format());
    throw new Error('Invalid environment configuration. Required environment variables missing or invalid.');
  }
  return result.data;
};

export const env: AppEnvConfig = validateEnv();
