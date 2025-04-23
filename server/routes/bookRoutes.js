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


const router = express.Router();

router.route('/')
  .get(validate(getBooksQuerySchema, 'query'), getAllBooks)
  .post(protect, checkRole('admin'), validate(addBookSchema), addBook);

router.route('/:id')
  .get(validate(bookIdParamSchema, 'params'), getBookById);

export default router;