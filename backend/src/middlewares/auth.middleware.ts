import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { ApiError } from '../utils/apiError';

export interface AuthRequest extends Request {
  user?: { id: string; role: string; schoolId: string };
}

export const authMiddleware = (req: AuthRequest, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return next(new ApiError(401, 'Unauthorized'));
  try {
    req.user = jwt.verify(token, env.jwtSecret) as AuthRequest['user'];
    next();
  } catch {
    next(new ApiError(401, 'Invalid token'));
  }
};
