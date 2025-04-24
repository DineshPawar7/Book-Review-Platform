import Book from '../models/Book.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import mongoose from 'mongoose';



const getAllBooks = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalBooks = await Book.countDocuments();
  const books = await Book.find()
                          .skip(skip)
                          .limit(limit)
                          .sort({ createdAt: -1 });

  res.status(200).json(
    new ApiResponse(
      200,
      {
        books,
        currentPage: page,
        totalPages: Math.ceil(totalBooks / limit),
        totalBooks,
      },
      'Books retrieved successfully'
    )
  );
});


const getBookById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, 'Invalid book ID format');
  }

  const book = await Book.findById(id).populate('addedBy', 'name email');

  if (!book) {
    throw new ApiError(404, 'Book not found');
  }

  res.status(200).json(new ApiResponse(200, book, 'Book retrieved successfully'));
});


const addBook = asyncHandler(async (req, res) => {
  const { title, author, isbn, description, publishedDate } = req.body;
  const addedBy = req.user._id;

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const existingBook = await Book.findOne({ isbn });
  if (existingBook) {
      throw new ApiError(400, `Book with ISBN ${isbn} already exists.`);
  }

  const book = await Book.create({
    title,
    author,
    isbn,
    description,
    publishedDate,
    addedBy,
    image: imageUrl,
  });

  res.status(201).json(new ApiResponse(201, book, 'Book added successfully'));
});



export { getAllBooks, getBookById, addBook };