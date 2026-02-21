import { Router } from 'express';
import * as c from '../../controllers/activity.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();
router.use(authMiddleware);
router.post('/', roleMiddleware('TEACHER'), asyncHandler(c.createActivity));
router.get('/class/:classId', asyncHandler(c.listClassActivities));
export default router;
