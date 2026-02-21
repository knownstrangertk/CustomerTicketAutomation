import { Router } from 'express';
import * as c from '../../controllers/announcement.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();
router.use(authMiddleware);
router.post('/', roleMiddleware('ADMIN', 'TEACHER', 'SUPER_ADMIN'), asyncHandler(c.createAnnouncement));
router.get('/', asyncHandler(c.listAnnouncements));
export default router;
