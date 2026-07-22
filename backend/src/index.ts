import app from './app';
import { connectDB } from './config/db';
import { env } from './config/env.config';
import { logger } from './utils/logger';

const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    app.listen(env.PORT, () => {
      logger.info(`SketchFlow backend server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error('Database connection failed. Exiting process:', error);
    process.exit(1);
  }
};

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Promise Rejection:', reason);
  process.exit(1);
});

startServer();
