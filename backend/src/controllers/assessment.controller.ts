import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export const createAssessment = async (req: Request, res: Response) => {
  const created = await prisma.assessment.create({ data: { ...req.body, testDate: new Date(req.body.testDate) } });
  res.status(201).json(created);
};

export const addAssessmentQuestions = async (req: Request, res: Response) => {
  const questions = req.body.questions || [];
  const created = await prisma.assessmentQuestion.createMany({ data: questions.map((q: any) => ({ ...q, assessmentId: req.params.id })) });
  res.status(201).json(created);
};

export const addAssessmentResults = async (req: Request, res: Response) => {
  const { results } = req.body;
  const tx = await prisma.$transaction(results.map((r: any) => prisma.studentAssessmentResult.create({ data: { ...r, assessmentId: req.params.id } })));
  res.status(201).json(tx);
};

export const getClassReport = async (req: Request, res: Response) => {
  const report = await prisma.studentAssessmentResult.findMany({ where: { assessmentId: req.params.id }, include: { student: true } });
  res.json(report);
};
