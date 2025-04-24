import Joi from 'joi';
import mongoose from 'mongoose';

const objectIdValidator = (value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('"{#label}" must be a valid MongoDB ObjectId');
    }
    return value;
};


const addReviewSchema = Joi.object({
  book: Joi.string().custom(objectIdValidator, 'MongoDB ObjectId').required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().max(1000).optional().allow(''),
});

const getReviewsQuerySchema = Joi.object({
    bookId: Joi.string().custom(objectIdValidator, 'MongoDB ObjectId').required()
});

export { addReviewSchema, getReviewsQuerySchema };