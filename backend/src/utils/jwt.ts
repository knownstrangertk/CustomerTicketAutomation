import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export const signAccessToken = (payload: object) =>
  jwt.sign(payload, env.jwtSecret, { expiresIn: '15m' });

export const signRefreshToken = (payload: object) =>
  jwt.sign(payload, env.jwtRefreshSecret, { expiresIn: '7d' });
