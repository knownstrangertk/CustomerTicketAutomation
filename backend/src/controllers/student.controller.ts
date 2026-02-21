import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export const getStudentProfile = async (req: Request, res: Response) => {
  const student = await prisma.student.findUnique({ where: { id: req.params.id }, include: { parent: true, class: true, section: true } });
  res.json(student);
};

export const getStudentAssessments = async (req: Request, res: Response) => {
  const rows = await prisma.studentAssessmentResult.findMany({ where: { studentId: req.params.id }, include: { assessment: true } });
  res.json(rows);
};

export const getStudentAssessmentDetails = async (req: Request, res: Response) => {
  const row = await prisma.studentAssessmentResult.findFirst({ where: { studentId: req.params.id, assessmentId: req.params.assessmentId }, include: { questionResults: true, assessment: true } });
  res.json(row);
};

export const getStudentAttendance = async (req: Request, res: Response) => {
  res.json(await prisma.attendance.findMany({ where: { studentId: req.params.id } }));
};

export const getStudentHomework = async (req: Request, res: Response) => {
  res.json(await prisma.homeworkSubmission.findMany({ where: { studentId: req.params.id }, include: { homework: true } }));
};

export const getStudentFees = async (req: Request, res: Response) => {
  res.json(await prisma.feePayment.findMany({ where: { studentId: req.params.id }, include: { feeStructure: true } }));
};

export const getStudentTransport = async (req: Request, res: Response) => {
  res.json(await prisma.studentTransport.findMany({ where: { studentId: req.params.id }, include: { busRoute: true, busStop: true } }));
};

export const getStudentRemarks = async (req: Request, res: Response) => {
  res.json(await prisma.studentRemark.findMany({ where: { studentId: req.params.id }, include: { teacher: true } }));
};
