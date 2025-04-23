import { ApiError } from '../utils/ApiError.js';

const validate = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property], {
            abortEarly: false, 
            allowUnknown: false 
        });

        if (error) {
            const validationErrors = error.details.map(detail => detail.message);
            return next(new ApiError(400, 'Validation Error', validationErrors));
        }
        next();
    };
};

export default validate;