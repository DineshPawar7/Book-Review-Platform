import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
// import { checkRole } from '../middlewares/roleMiddleware.js'; // admin-only routes
import validate from '../middlewares/validateMiddleware.js';
import { userIdParamSchema, updateUserSchema } from '../validators/userValidators.js';


const router = express.Router();

router.use(protect);

router.route('/:id')
  .get(validate(userIdParamSchema, 'params'), getUserProfile)
  .put(validate(userIdParamSchema, 'params'), validate(updateUserSchema, 'body'), updateUserProfile);



export default router;