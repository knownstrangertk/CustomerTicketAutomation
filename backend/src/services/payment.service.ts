import crypto from 'crypto';
import { razorpay } from '../config/razorpay';
import { env } from '../config/env';

export const createOrder = async (amount: number, receipt: string) =>
  razorpay.orders.create({ amount: Math.round(amount * 100), currency: 'INR', receipt });

export const verifySignature = (orderId: string, paymentId: string, signature: string) => {
  const digest = crypto
    .createHmac('sha256', env.razorpayKeySecret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');
  return digest === signature;
};
