import { Router } from 'express';
import * as c from '../../controllers/assessment.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';
import { validationMiddleware } from '../../middlewares/validation.middleware';
import { createAssessmentSchema } from '../../validators/common.validators';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();
router.use(authMiddleware);
router.post('/', roleMiddleware('TEACHER', 'ADMIN'), validationMiddleware(createAssessmentSchema), asyncHandler(c.createAssessment));
router.post('/:id/questions', roleMiddleware('TEACHER', 'ADMIN'), asyncHandler(c.addAssessmentQuestions));
router.post('/:id/results', roleMiddleware('TEACHER', 'ADMIN'), asyncHandler(c.addAssessmentResults));
router.get('/:id/class-report', asyncHandler(c.getClassReport));
export default router;
