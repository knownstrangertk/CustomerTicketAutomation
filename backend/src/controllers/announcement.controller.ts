import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export const createAnnouncement = async (req: Request, res: Response) => {
  res.status(201).json(await prisma.announcement.create({ data: req.body }));
};

export const listAnnouncements = async (_req: Request, res: Response) => {
  res.json(await prisma.announcement.findMany({ orderBy: { createdAt: 'desc' } }));
};
