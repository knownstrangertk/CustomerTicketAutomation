import bcrypt from 'bcryptjs';
import { prisma } from '../config/prisma';
import { ApiError } from '../utils/apiError';
import { signAccessToken, signRefreshToken } from '../utils/jwt';
import { redis } from '../config/redis';

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(401, 'Invalid credentials');
  }
  const payload = { id: user.id, role: user.role, schoolId: user.schoolId };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);
  await redis.set(`refresh:${user.id}`, refreshToken, 'EX', 7 * 24 * 3600);
  await prisma.user.update({ where: { id: user.id }, data: { lastLogin: new Date() } });
  return { accessToken, refreshToken, user };
};
