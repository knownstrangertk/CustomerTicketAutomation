import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export const createActivity = async (req: Request, res: Response) => {
  res.status(201).json(await prisma.activity.create({ data: req.body }));
};

export const listClassActivities = async (req: Request, res: Response) => {
  res.json(await prisma.activity.findMany({ where: { classId: req.params.classId } }));
};
