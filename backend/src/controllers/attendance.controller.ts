import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export const markAttendance = async (req: Request, res: Response) => {
  const { entries, date, markedBy } = req.body;
  const created = await prisma.$transaction(entries.map((entry: any) =>
    prisma.attendance.create({ data: { ...entry, date: new Date(date), markedBy } })
  ));
  res.status(201).json(created);
};

export const getAttendanceByClassSectionDate = async (req: Request, res: Response) => {
  res.json(await prisma.attendance.findMany({ where: { classId: req.params.classId, sectionId: req.params.sectionId, date: new Date(req.params.date) } }));
};

export const getStudentMonthlyAttendance = async (req: Request, res: Response) => {
  const month = Number(req.query.month) || new Date().getMonth() + 1;
  const year = Number(req.query.year) || new Date().getFullYear();
  res.json(await prisma.attendance.findMany({ where: { studentId: req.params.id, date: { gte: new Date(year, month - 1, 1), lt: new Date(year, month, 1) } } }));
};
