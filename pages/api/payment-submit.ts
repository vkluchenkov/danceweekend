import type { NextApiRequest, NextApiResponse } from 'next';
import getT from 'next-translate/getT';
import { PaymentFormFields } from '@/src/types/payment.types';
import { paymentAdminEmail } from '@/src/email/paymentAdminEmail';
import { senderEmail, senderName } from '@/src/ulis/constants';
import { sendMail } from '@/src/email/sendMail';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const orderPayload: PaymentFormFields = req.body;
  const t = await getT('en', 'payment');

  const adminEmailContent = paymentAdminEmail({ form: orderPayload, t: t }).html;
  const adminEmailErrors = paymentAdminEmail({ form: orderPayload, t: t }).errors;

  const adminMailPayload = {
    senderEmail: senderEmail,
    senderName: senderName,
    recipientEmail: senderEmail,
    recipientName: senderName,
    recipientSubj: t('email.title') + ' ' + orderPayload.name,
    mailContent: adminEmailContent,
  };

  sendMail(adminMailPayload);

  res.status(200).send({ message: 'Ok' });
}
