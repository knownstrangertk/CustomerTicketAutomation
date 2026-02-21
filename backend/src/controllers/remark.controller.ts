import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export const addRemark = async (req: Request, res: Response) => {
  res.status(201).json(await prisma.studentRemark.create({ data: { ...req.body, date: new Date(req.body.date) } }));
};

export const studentRemarks = async (req: Request, res: Response) => {
  res.json(await prisma.studentRemark.findMany({ where: { studentId: req.params.id } }));
};
