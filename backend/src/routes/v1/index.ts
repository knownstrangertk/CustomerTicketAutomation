import { Router } from 'express';
import authRoutes from './auth.routes';
import studentRoutes from './student.routes';
import assessmentRoutes from './assessment.routes';
import homeworkRoutes from './homework.routes';
import attendanceRoutes from './attendance.routes';
import feeRoutes from './fee.routes';
import eventRoutes from './event.routes';
import announcementRoutes from './announcement.routes';
import activityRoutes from './activity.routes';
import remarkRoutes from './remark.routes';
import adminRoutes from './admin.routes';

const router = Router();
router.use('/auth', authRoutes);
router.use('/students', studentRoutes);
router.use('/assessments', assessmentRoutes);
router.use('/homework', homeworkRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/fees', feeRoutes);
router.use('/events', eventRoutes);
router.use('/announcements', announcementRoutes);
router.use('/activities', activityRoutes);
router.use('/remarks', remarkRoutes);
router.use('/admin', adminRoutes);

export default router;
