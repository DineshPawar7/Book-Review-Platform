import Review from '../models/Review.js';
import Book from '../models/Book.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import mongoose from 'mongoose';



const getReviewsByBook = asyncHandler(async (req, res) => {
  const { bookId } = req.query;

   if (!bookId || !mongoose.Types.ObjectId.isValid(bookId)) {
      throw new ApiError(400, 'Valid bookId query parameter is required');
  }

  const bookExists = await Book.findById(bookId);
  if (!bookExists) {
      throw new ApiError(404, 'Book not found');
  }

  const reviews = await Review.find({ book: bookId })
                               .populate('user', 'name') 
                               .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, reviews, 'Reviews retrieved successfully'));
});


const addReview = asyncHandler(async (req, res) => {
  const { book: bookId, rating, comment } = req.body; 
  const userId = req.user._id;

   if (!bookId || !mongoose.Types.ObjectId.isValid(bookId)) {
      throw new ApiError(400, 'Valid book ID is required');
  }

  const book = await Book.findById(bookId);
  if (!book) {
    throw new ApiError(404, 'Book not found');
  }

  const existingReview = await Review.findOne({ book: bookId, user: userId });
  if (existingReview) {
    throw new ApiError(400, 'You have already reviewed this book');
  }

  const review = await Review.create({
    book: bookId,
    user: userId,
    rating,
    comment,
  });


  const populatedReview = await review.populate('user', 'name');


  res.status(201).json(new ApiResponse(201, populatedReview, 'Review submitted successfully'));
});



export { getReviewsByBook, addReview };