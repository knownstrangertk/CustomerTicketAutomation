import { Router } from 'express';
import * as c from '../../controllers/student.controller';
import { asyncHandler } from '../../utils/asyncHandler';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();
router.use(authMiddleware);
router.get('/:id/profile', asyncHandler(c.getStudentProfile));
router.get('/:id/assessments', asyncHandler(c.getStudentAssessments));
router.get('/:id/assessments/:assessmentId/details', asyncHandler(c.getStudentAssessmentDetails));
router.get('/:id/attendance', asyncHandler(c.getStudentAttendance));
router.get('/:id/homework', asyncHandler(c.getStudentHomework));
router.get('/:id/fees', asyncHandler(c.getStudentFees));
router.get('/:id/transport', asyncHandler(c.getStudentTransport));
router.get('/:id/remarks', asyncHandler(c.getStudentRemarks));
export default router;
