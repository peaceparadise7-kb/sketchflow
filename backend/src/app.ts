import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes/index.js';
import { notFoundHandler, errorHandler, requestIdMiddleware } from './middleware/index.js';

const app: Application = express();

// Security, request tracking and utility middleware
app.use(helmet());
app.use(cors());
app.use(requestIdMiddleware);
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/', routes);

// Error Handling Middleware Pipeline
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
