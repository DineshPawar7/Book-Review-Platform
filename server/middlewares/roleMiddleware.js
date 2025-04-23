import { ApiError } from '../utils/ApiError.js';

const checkRole = (roles) => {
  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Authentication required'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ApiError(
          403, 
          `Forbidden: User role '${req.user.role}' is not authorized for this resource. Required: ${allowedRoles.join(' or ')}`
        )
      );
    }
    next(); 
  };
};

export { checkRole };