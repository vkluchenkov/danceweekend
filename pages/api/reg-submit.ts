import type { NextApiRequest, NextApiResponse } from 'next';
import getT from 'next-translate/getT';
import TelegramBot from 'node-telegram-bot-api';

import { OrderPayload } from '@/src/components/FormRegistration/types';
import { registrationUserEmail } from '@/src/email/registrationUserEmail';
import { sendMail } from '@/src/email/sendMail';
import { senderEmail, senderName } from '@/src/ulis/constants';
import { registrationAdminEmail } from '@/src/email/registrationAdminEmail';
import { saveRegistrationToNotion } from '@/src/notion/saveRegistrationToNotion';
import { registrationPayloadSchema } from '@/src/validation/registrationPayloadSchema';
import { config } from '@/src/config';
import { registrationOnlinePayloadSchema } from '@/src/validation/registrationOnlinePayloadSchema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const orderPayload: OrderPayload = req.body;

  const validate =
    orderPayload.version === 'live'
      ? registrationPayloadSchema.validate(orderPayload)
      : registrationOnlinePayloadSchema.validate(orderPayload);

  if (validate.error) {
    console.log(validate.error);
    res.status(400).send({ message: 'Bad request' });
    return;
  } else {
    const t = await getT(orderPayload.currentLang, 'registration');
    const enT = await getT('en', 'registration');

    try {
      const bot = new TelegramBot(config.telegram.botToken, { polling: false });
      const chatId = config.telegram.chatId;
      const threadId = config.telegram.threadId;

      const message = `
      New registration from ${orderPayload.name.trim()} ${orderPayload.surname.trim()}.
      Total: ${orderPayload.total}€.
      Check email for more details.
      `;

      bot.sendMessage(chatId, message, { reply_to_message_id: parseInt(threadId) });

      const userEmailContent = registrationUserEmail({ form: orderPayload, t: t }).html;
      const adminEmailContent = registrationAdminEmail({ form: orderPayload, t: t }).html;
      const userEmailErrors = registrationUserEmail({ form: orderPayload, t: t }).errors;

      const userMailPayload = {
        senderEmail: senderEmail,
        senderName: senderName,
        recipientEmail: orderPayload.email,
        recipientName: orderPayload.name.trim(),
        recipientSubj: t('email.userSubj'),
        mailContent: userEmailContent,
      };

      const adminMailPayload = {
        senderEmail: senderEmail,
        senderName: senderName,
        recipientEmail: senderEmail,
        recipientName: senderName,
        recipientSubj:
          t('email.adminSubj') + ' ' + orderPayload.name.trim() + ' ' + orderPayload.surname.trim(),
        mailContent: adminEmailContent,
      };

      // console.log(userEmailErrors);
      // console.log(userEmailContent);
      sendMail(userMailPayload);
      sendMail(adminMailPayload);

      await saveRegistrationToNotion({ form: orderPayload, t: enT });

      res.status(200).send('Ok');
    } catch (error) {
      console.log(error);
      res.status(500).send('Error');
    }
  }
}
