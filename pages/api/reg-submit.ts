import type { NextApiRequest, NextApiResponse } from 'next';
import { OrderPayload } from '@/src/components/FormLive/types';
import getT from 'next-translate/getT';
import { registrationUserEmail } from '@/src/email/registrationUserEmail';
import { sendMail } from '@/src/email/sendMail';
import { senderEmail, senderName } from '@/src/ulis/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const orderPayload: OrderPayload = req.body;
  const t = await getT(orderPayload.currentLang, 'registration');

  const userEmailContent = registrationUserEmail({ form: orderPayload, t: t }).html;
  const userEmailErrors = registrationUserEmail({ form: orderPayload, t: t }).errors;

  const mailPayload = {
    senderEmail: senderEmail,
    senderName: senderName,
    recipientEmail: orderPayload.email,
    recipientName: orderPayload.name,
    recipientSubj: t('email.userSubj'),
    mailContent: userEmailContent,
  };
  // console.log(userEmailErrors);
  // console.log(userEmailContent);
  sendMail(mailPayload);

  res.status(200).send('Ok');
}
