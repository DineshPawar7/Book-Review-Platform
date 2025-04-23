import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import mongoose from 'mongoose';


const getUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;

   if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, 'Invalid user ID format');
  }

  const user = await User.findById(id).select('-password');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.status(200).json(new ApiResponse(200, user, 'User profile retrieved successfully'));
});


const updateUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body; 

  if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, 'Invalid user ID format');
  }

  if (req.user.id !== id && req.user.role !== 'admin') {
    throw new ApiError(403, 'Forbidden: You can only update your own profile.');
  }

  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (name) user.name = name;

  const updatedUser = await user.save();

  updatedUser.password = undefined;

  res.status(200).json(new ApiResponse(200, updatedUser, 'User profile updated successfully'));
});



export { getUserProfile, updateUserProfile };