import { Router } from 'express';
import * as c from '../../controllers/fee.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();
router.use(authMiddleware);
router.get('/student/:id', asyncHandler(c.getStudentFees));
router.post('/pay', asyncHandler(c.initiateFeePayment));
router.post('/verify', asyncHandler(c.verifyFeePayment));
router.get('/receipt/:paymentId', asyncHandler(c.getFeeReceipt));
export default router;
