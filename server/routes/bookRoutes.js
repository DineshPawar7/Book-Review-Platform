import express from 'express';
import {
  getAllBooks,
  getBookById,
  addBook,
} from '../controllers/bookController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { checkRole } from '../middlewares/roleMiddleware.js';
import validate from '../middlewares/validateMiddleware.js';
import { addBookSchema, bookIdParamSchema, getBooksQuerySchema } from '../validators/bookValidators.js';

<<<<<<< HEAD
import Book from '../models/Book.js';

=======
>>>>>>> b551c7efd10fbfb178189831c0d4033b91215776

const router = express.Router();

router.route('/')
  .get(validate(getBooksQuerySchema, 'query'), getAllBooks)
  .post(protect, checkRole('admin'), validate(addBookSchema), addBook);

router.route('/:id')
  .get(validate(bookIdParamSchema, 'params'), getBookById);

<<<<<<< HEAD
  router.post('/:bookId/review', protect, async (req, res) => {
    const { bookId } = req.params;
    const { rating, review } = req.body;
  
    if (!rating || rating < 0 || rating > 5) {
      return res.status(400).json({ message: 'Invalid rating. It should be between 0 and 5.' });
    }
  
    try {
      const book = await Book.findById(bookId);
  
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      const newReview = {
        user: req.user._id,
        rating,
        review,
      };
  
      book.reviews.push(newReview);
  
      await book.updateAverageRating();
  
      book.reviewCount += 1;
  
      await book.save();
  
      res.status(201).json({ message: 'Review added successfully', book });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while adding review' });
    }
  });

export default router;





=======
export default router;
>>>>>>> b551c7efd10fbfb178189831c0d4033b91215776
