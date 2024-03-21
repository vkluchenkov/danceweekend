import type { NextApiRequest, NextApiResponse } from 'next';
import TelegramBot from 'node-telegram-bot-api';

import { PaymentFormFields } from '@/src/types/payment.types';
import { config } from '@/src/config';
import { orderPayloadSchema } from '@/src/validation/orderPayloadSchema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const orderPayload: PaymentFormFields = req.body;

  const validate = orderPayloadSchema.validate(orderPayload);

  if (validate.error) {
    res.status(400).send({ message: 'Bad request' });
    return;
  } else {
    try {
      const bot = new TelegramBot(config.telegram.botToken, { polling: false });
      const chatId = config.telegram.chatId;
      const threadId = config.telegram.threadId;

      bot.sendMessage(
        chatId,
        `New payment started from ${orderPayload.name}. 
        Email: ${orderPayload.email}.
        Amount: ${orderPayload.qty} via ${orderPayload.method}`,
        { reply_to_message_id: parseInt(threadId) }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send('Telegram Error');
    }

    res.status(200).send({ message: 'Ok' });
    return;
  }
}
