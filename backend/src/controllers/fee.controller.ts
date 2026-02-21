import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { createOrder, verifySignature } from '../services/payment.service';

export const getStudentFees = async (req: Request, res: Response) => {
  res.json(await prisma.feePayment.findMany({ where: { studentId: req.params.id }, include: { feeStructure: true } }));
};

export const initiateFeePayment = async (req: Request, res: Response) => {
  const order = await createOrder(req.body.amount, `fee_${Date.now()}`);
  res.status(201).json(order);
};

export const verifyFeePayment = async (req: Request, res: Response) => {
  const ok = verifySignature(req.body.orderId, req.body.paymentId, req.body.signature);
  if (!ok) return res.status(400).json({ message: 'Payment signature invalid' });
  const payment = await prisma.feePayment.create({ data: req.body });
  res.json(payment);
};

export const getFeeReceipt = async (req: Request, res: Response) => {
  res.json(await prisma.feePayment.findUnique({ where: { id: req.params.paymentId } }));
};
