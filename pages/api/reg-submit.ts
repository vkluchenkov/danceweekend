import type { NextApiRequest, NextApiResponse } from 'next';
import { OrderPayload } from '@/src/components/FormRegistration/types';
import getT from 'next-translate/getT';
import { registrationUserEmail } from '@/src/email/registrationUserEmail';
import { sendMail } from '@/src/email/sendMail';
import { senderEmail, senderName } from '@/src/ulis/constants';
import { registrationAdminEmail } from '@/src/email/registrationAdminEmail';
import { saveRegistrationToNotion } from '@/src/notion/saveRegistrationToNotion';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const orderPayload: OrderPayload = req.body;
  const t = await getT(orderPayload.currentLang, 'registration');
  const enT = await getT('en', 'registration');

  try {
    const userEmailContent = registrationUserEmail({ form: orderPayload, t: t }).html;
    const adminEmailContent = registrationAdminEmail({ form: orderPayload, t: t }).html;
    const userEmailErrors = registrationUserEmail({ form: orderPayload, t: t }).errors;

    const userMailPayload = {
      senderEmail: senderEmail,
      senderName: senderName,
      recipientEmail: orderPayload.email,
      recipientName: orderPayload.name,
      recipientSubj: t('email.userSubj'),
      mailContent: userEmailContent,
    };

    const adminMailPayload = {
      senderEmail: senderEmail,
      senderName: senderName,
      recipientEmail: senderEmail,
      recipientName: senderName,
      recipientSubj: t('email.adminSubj') + ' ' + orderPayload.name + ' ' + orderPayload.surname,
      mailContent: adminEmailContent,
    };
    // console.log(userEmailErrors);
    // console.log(userEmailContent);
    sendMail(userMailPayload);
    sendMail(adminMailPayload);

    await saveRegistrationToNotion({ form: orderPayload, t: enT });

    res.status(200).send('Ok');
  } catch (error) {
    res.status(500).send('Error');
  }
}
