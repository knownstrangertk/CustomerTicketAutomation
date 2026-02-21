import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export const createHomework = async (req: Request, res: Response) => {
  const created = await prisma.homework.create({ data: { ...req.body, dueDate: new Date(req.body.dueDate) } });
  res.status(201).json(created);
};

export const submitHomework = async (req: Request, res: Response) => {
  const updated = await prisma.homeworkSubmission.upsert({
    where: { id: `${req.params.id}_${req.body.studentId}` },
    update: { status: req.body.status || 'SUBMITTED', submittedAt: new Date(), teacherRemarks: req.body.teacherRemarks },
    create: { id: `${req.params.id}_${req.body.studentId}`, homeworkId: req.params.id, studentId: req.body.studentId, status: req.body.status || 'SUBMITTED', submittedAt: new Date(), teacherRemarks: req.body.teacherRemarks }
  });
  res.json(updated);
};

export const getHomeworkByClassSection = async (req: Request, res: Response) => {
  const rows = await prisma.homework.findMany({ where: { classId: req.params.classId, sectionId: req.params.sectionId } });
  res.json(rows);
};
