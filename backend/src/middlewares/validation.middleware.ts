import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export const validationMiddleware = (schema: ZodSchema) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const parsed = schema.safeParse({ body: req.body, params: req.params, query: req.query });
    if (!parsed.success) {
      return next(parsed.error);
    }
    next();
  };
