import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

const crudFactory = (model: keyof typeof prisma) => ({
  list: async (_req: Request, res: Response) => res.json(await (prisma[model] as any).findMany()),
  create: async (req: Request, res: Response) => res.status(201).json(await (prisma[model] as any).create({ data: req.body })),
  update: async (req: Request, res: Response) => res.json(await (prisma[model] as any).update({ where: { id: req.params.id }, data: req.body }))
});

export const adminStudents = crudFactory('student');
export const adminTeachers = crudFactory('teacher');
export const adminClasses = crudFactory('class');
export const adminFeeStructures = crudFactory('feeStructure');
export const adminBusRoutes = crudFactory('busRoute');

export const feeCollectionReport = async (_req: Request, res: Response) => {
  const report = await prisma.feePayment.groupBy({ by: ['status'], _sum: { amountPaid: true }, _count: true });
  res.json(report);
};

export const attendanceReport = async (_req: Request, res: Response) => {
  const report = await prisma.attendance.groupBy({ by: ['status'], _count: true });
  res.json(report);
};

export const assessmentReport = async (_req: Request, res: Response) => {
  const report = await prisma.studentAssessmentResult.aggregate({ _avg: { percentage: true }, _count: true });
  res.json(report);
};

export const broadcast = async (req: Request, res: Response) => {
  const parents = await prisma.user.findMany({ where: { role: 'PARENT' } });
  await prisma.notification.createMany({ data: parents.map((p) => ({ userId: p.id, title: req.body.title, body: req.body.body, type: 'BROADCAST' })) });
  res.json({ message: 'Broadcast queued', recipients: parents.length });
};
