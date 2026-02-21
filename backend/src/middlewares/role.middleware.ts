import { NextFunction, Response } from 'express';
import { AuthRequest } from './auth.middleware';
import { ApiError } from '../utils/apiError';

export const roleMiddleware = (...roles: string[]) => (req: AuthRequest, _res: Response, next: NextFunction) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new ApiError(403, 'Forbidden'));
  }
  next();
};
