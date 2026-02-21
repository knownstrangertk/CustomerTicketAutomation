import { Router } from 'express';
import * as c from '../../controllers/admin.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();
router.use(authMiddleware, roleMiddleware('ADMIN', 'SUPER_ADMIN'));

router.get('/students', asyncHandler(c.adminStudents.list));
router.post('/students', asyncHandler(c.adminStudents.create));
router.put('/students/:id', asyncHandler(c.adminStudents.update));

router.get('/teachers', asyncHandler(c.adminTeachers.list));
router.post('/teachers', asyncHandler(c.adminTeachers.create));
router.put('/teachers/:id', asyncHandler(c.adminTeachers.update));

router.get('/classes', asyncHandler(c.adminClasses.list));
router.post('/classes', asyncHandler(c.adminClasses.create));
router.put('/classes/:id', asyncHandler(c.adminClasses.update));

router.get('/fee-structures', asyncHandler(c.adminFeeStructures.list));
router.post('/fee-structures', asyncHandler(c.adminFeeStructures.create));
router.put('/fee-structures/:id', asyncHandler(c.adminFeeStructures.update));

router.get('/bus-routes', asyncHandler(c.adminBusRoutes.list));
router.post('/bus-routes', asyncHandler(c.adminBusRoutes.create));
router.put('/bus-routes/:id', asyncHandler(c.adminBusRoutes.update));

router.get('/reports/fee-collection', asyncHandler(c.feeCollectionReport));
router.get('/reports/attendance', asyncHandler(c.attendanceReport));
router.get('/reports/assessments', asyncHandler(c.assessmentReport));
router.post('/broadcast', asyncHandler(c.broadcast));

export default router;
