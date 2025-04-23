import express from 'express';
import {
  getReviewsByBook,
  addReview,
} from '../controllers/reviewController.js';
import { protect } from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validateMiddleware.js';
import { addReviewSchema, getReviewsQuerySchema } from '../validators/reviewValidators.js';

const router = express.Router();

router.route('/')
  .get(validate(getReviewsQuerySchema, 'query'), getReviewsByBook)
  .post(protect, validate(addReviewSchema), addReview); 


export default router;