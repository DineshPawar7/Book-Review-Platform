import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js';
import { errorHandler } from './middlewares/errorMiddleware.js';
import { ApiError } from './utils/ApiError.js';
import logger from './utils/logger.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectDB();

const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true 
}));

app.use(express.json({ limit: '16kb' })); 
app.use(express.urlencoded({ extended: true, limit: '16kb' }));


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('short'));
}

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.send('Book Review Platform API is running...');
});


app.use((req, res, next) => {
  next(new ApiError(404, `Not Found - ${req.originalUrl}`));
});


app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.error(err.name, err.message, err);
  server.close(() => {
    process.exit(1); 
  });
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM RECEIVED. Shutting down gracefully 👋');
  server.close(() => {
    logger.info('💥 Process terminated!');
    process.exit(0);
  });
});
