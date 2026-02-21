import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { env } from '../config/env';
import { prisma } from '../config/prisma';
import { redis } from '../config/redis';
import { login } from '../services/auth.service';
import { ApiError } from '../utils/apiError';
import { signAccessToken } from '../utils/jwt';

export const loginController = async (req: Request, res: Response) => {
  const data = await login(req.body.email, req.body.password);
  res.json(data);
};

export const refreshTokenController = async (req: Request, res: Response) => {
  const decoded = jwt.verify(req.body.refreshToken, env.jwtRefreshSecret) as any;
  const cached = await redis.get(`refresh:${decoded.id}`);
  if (!cached || cached !== req.body.refreshToken) throw new ApiError(401, 'Invalid refresh token');
  res.json({ accessToken: signAccessToken({ id: decoded.id, role: decoded.role, schoolId: decoded.schoolId }) });
};

export const forgotPasswordController = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({ where: { email: req.body.email } });
  if (!user) throw new ApiError(404, 'User not found');
  res.json({ message: 'Password reset link generated (stub)' });
};

export const changePasswordController = async (req: any, res: Response) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (!user || !(await bcrypt.compare(req.body.oldPassword, user.password))) throw new ApiError(400, 'Old password is invalid');
  await prisma.user.update({ where: { id: user.id }, data: { password: await bcrypt.hash(req.body.newPassword, 10) } });
  res.json({ message: 'Password changed successfully' });
};

export const qrLoginController = async (_req: Request, res: Response) => {
  res.json({ qrToken: `qr_${Date.now()}` });
};
