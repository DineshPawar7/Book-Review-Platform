import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};


const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(400, 'User already exists with this email');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  user.password = undefined;

  const token = generateToken(user._id);

  res.status(201).json(
    new ApiResponse(
      201,
      { user, token },
      'User registered successfully'
    )
  );
});


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
      throw new ApiError(401, 'Invalid credentials');
  }

  const isMatch = await user.comparePassword(password);

  if (!user || !isMatch) {
    throw new ApiError(401, 'Invalid credentials'); 
  }

  user.password = undefined;

  const token = generateToken(user._id);

  res.status(200).json(
    new ApiResponse(
      200,
      { user, token },
      'User logged in successfully'
    )
  );
});

export { registerUser, loginUser };