import type { NextApiRequest, NextApiResponse } from 'next';
import { PaymentFormFields } from '@/src/types/payment.types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const orderPayload: PaymentFormFields = req.body;

  console.log(orderPayload);

  res.status(200).send('Ok');
}
