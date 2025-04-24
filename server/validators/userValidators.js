import Joi from 'joi';
import mongoose from 'mongoose';

const objectIdValidator = (value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('"{#label}" must be a valid MongoDB ObjectId');
    }
    return value;
};

const userIdParamSchema = Joi.object({
    id: Joi.string().custom(objectIdValidator, 'MongoDB ObjectId').required()
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
}).min(1);

export { userIdParamSchema, updateUserSchema };