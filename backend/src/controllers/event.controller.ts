import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export const createEvent = async (req: Request, res: Response) => {
  const event = await prisma.event.create({ data: { ...req.body, eventDate: new Date(req.body.eventDate), registrationDeadline: req.body.registrationDeadline ? new Date(req.body.registrationDeadline) : null } });
  res.status(201).json(event);
};

export const registerEvent = async (req: Request, res: Response) => {
  const registration = await prisma.eventRegistration.create({ data: { eventId: req.params.id, studentId: req.body.studentId, status: req.body.status || 'REGISTERED' } });
  res.status(201).json(registration);
};

export const upcomingEvents = async (_req: Request, res: Response) => {
  res.json(await prisma.event.findMany({ where: { eventDate: { gte: new Date() } } }));
};
