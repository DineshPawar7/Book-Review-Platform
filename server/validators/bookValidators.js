import Joi from 'joi';
import mongoose from 'mongoose';

const objectIdValidator = (value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('"{#label}" must be a valid MongoDB ObjectId');
    }
    return value;
};

const addBookSchema = Joi.object({
  title: Joi.string().min(1).max(200).required(),
  author: Joi.string().min(1).max(100).required(),
  isbn: Joi.string().min(10).max(13).required(),
  description: Joi.string().max(2000).optional().allow(''),
  publishedDate: Joi.date().optional(),
});

const bookIdParamSchema = Joi.object({
    id: Joi.string().custom(objectIdValidator, 'MongoDB ObjectId').required()
});

const getBooksQuerySchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
});


export { addBookSchema, bookIdParamSchema, getBooksQuerySchema };