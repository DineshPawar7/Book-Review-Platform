import { ApiError } from '../utils/ApiError.js';
import logger from '../utils/logger.js';
import mongoose from 'mongoose';

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;
  error.statusCode = err.statusCode || 500; 

 
  logger.error(`${error.statusCode} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`, err.stack);


  if (err instanceof mongoose.Error.CastError) {
    const message = `Resource not found with id of ${err.value}. Invalid ${err.path}`;
    error = new ApiError(404, message);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    const message = `Duplicate field value entered: '${value}' for field '${field}'. Please use another value.`;
    error = new ApiError(400, message);
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    error = new ApiError(400, message, errors);
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors && err.errors.length > 0 ? err.errors : undefined,
    });
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message || 'Internal Server Error',
  });
};

export { errorHandler };