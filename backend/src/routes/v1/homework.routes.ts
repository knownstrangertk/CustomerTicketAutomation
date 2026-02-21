import { Router } from 'express';
import * as c from '../../controllers/homework.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';
import { validationMiddleware } from '../../middlewares/validation.middleware';
import { createHomeworkSchema } from '../../validators/common.validators';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();
router.use(authMiddleware);
router.post('/', roleMiddleware('TEACHER'), validationMiddleware(createHomeworkSchema), asyncHandler(c.createHomework));
router.put('/:id/submit', asyncHandler(c.submitHomework));
router.get('/class/:classId/section/:sectionId', asyncHandler(c.getHomeworkByClassSection));
export default router;
