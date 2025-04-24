import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ApiError(401, 'Not authorized, no token provided'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
        return next(new ApiError(401, 'Not authorized, user not found'));
    }

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
         return next(new ApiError(401, 'Not authorized, invalid token'));
    } else if (error.name === 'TokenExpiredError') {
         return next(new ApiError(401, 'Not authorized, token expired'));
    }
    return next(new ApiError(401, 'Not authorized, token verification failed'));
  }
});


export { protect };