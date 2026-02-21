import { Router } from 'express';
import {
  changePasswordController,
  forgotPasswordController,
  loginController,
  qrLoginController,
  refreshTokenController
} from '../../controllers/auth.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validationMiddleware } from '../../middlewares/validation.middleware';
import { loginSchema, passwordSchema, refreshSchema } from '../../validators/common.validators';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();
router.post('/login', validationMiddleware(loginSchema), asyncHandler(loginController));
router.post('/refresh-token', validationMiddleware(refreshSchema), asyncHandler(refreshTokenController));
router.post('/forgot-password', asyncHandler(forgotPasswordController));
router.post('/change-password', authMiddleware, validationMiddleware(passwordSchema), asyncHandler(changePasswordController));
router.post('/qr-login', authMiddleware, asyncHandler(qrLoginController));

export default router;
