import { Router } from 'express';
import * as c from '../../controllers/remark.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();
router.use(authMiddleware);
router.post('/', roleMiddleware('TEACHER'), asyncHandler(c.addRemark));
router.get('/student/:id', asyncHandler(c.studentRemarks));
export default router;
