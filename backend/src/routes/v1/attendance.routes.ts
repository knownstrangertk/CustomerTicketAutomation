import { Router } from 'express';
import * as c from '../../controllers/attendance.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';
import { validationMiddleware } from '../../middlewares/validation.middleware';
import { markAttendanceSchema } from '../../validators/common.validators';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();
router.use(authMiddleware);
router.post('/mark', roleMiddleware('TEACHER'), validationMiddleware(markAttendanceSchema), asyncHandler(c.markAttendance));
router.get('/class/:classId/section/:sectionId/date/:date', asyncHandler(c.getAttendanceByClassSectionDate));
router.get('/student/:id/monthly', asyncHandler(c.getStudentMonthlyAttendance));
export default router;
