import { Router } from 'express';
import * as c from '../../controllers/event.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();
router.use(authMiddleware);
router.post('/', roleMiddleware('ADMIN', 'SUPER_ADMIN'), asyncHandler(c.createEvent));
router.post('/:id/register', asyncHandler(c.registerEvent));
router.get('/upcoming', asyncHandler(c.upcomingEvents));
export default router;
