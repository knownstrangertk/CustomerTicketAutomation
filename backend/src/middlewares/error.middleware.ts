import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/apiError';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if ((err as any).name === 'ZodError') {
    return res.status(400).json({ message: 'Validation failed', errors: (err as any).issues });
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Internal server error', detail: err.message });
};
