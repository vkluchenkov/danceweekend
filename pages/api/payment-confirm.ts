import type { NextApiRequest, NextApiResponse } from 'next';
import getT from 'next-translate/getT';

import { PaymentConfirmFields } from '@/src/types/payment.types';
import { senderEmail, senderName } from '@/src/ulis/constants';
import { sendMail } from '@/src/email/sendMail';
import { paymentConfirmEmail } from '@/src/email/paymentConfirmEmail';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let status = 200,
    msg = 'Email sent';

  const orderPayload: PaymentConfirmFields = req.body;
  const t = await getT(orderPayload.lang, 'paymentConfirm');

  const savedPassword = process.env.ADMIN_PIN;

  const { name, email, password } = orderPayload;

  if (!savedPassword || savedPassword !== password) (status = 403), (msg = 'Unauthorized');
  else {
    try {
      const emailContent = paymentConfirmEmail({ form: orderPayload, t: t }).html;

      const mailPayload = {
        senderEmail: senderEmail,
        senderName: senderName,
        recipientEmail: email.trim(),
        recipientName: name.trim(),
        recipientSubj: t('email.subj'),
        mailContent: emailContent,
      };

      sendMail(mailPayload);
    } catch (error) {
      console.log(error);
      (status = 500), (msg = 'Not sent');
    }
  }

  res.status(status).send({ message: msg });
}
