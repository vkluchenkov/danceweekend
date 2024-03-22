import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import path from 'path';
import sanitize from 'sanitize-filename';

import { config as siteConfig } from '@/src/config';
import { FormFields, FormData } from '@/src/types/photo.types';
import TelegramBot from 'node-telegram-bot-api';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let status = 200,
    resultBody = { status: 'ok', message: 'Files were uploaded successfully' };

  const form = new formidable.IncomingForm();

  const formData = await new Promise<FormData | undefined>((resolve, reject) => {
    let file: File;

    const fields: FormFields = {
      name: 'Unknown',
    };

    form.on('file', (field, formFile) => {
      file = formFile;
    });

    form.on('field', (field, value) => {
      (fields as any)[field] = value === 'undefined' ? undefined : value;
    });

    form.on('end', () => resolve({ file, fields }));
    form.on('error', (err) => reject(err));

    form.parse(req, () => {});
  }).catch((e) => {
    console.log(e);
    status = 500;
    resultBody = {
      status: 'fail',
      message: 'Upload error',
    };
  });

  if (formData) {
    const { name } = formData.fields;

    const tempPath = formData.file.filepath;
    const extName = path.extname(formData.file.originalFilename!);
    const telegramFileName = sanitize(name!) + extName;

    try {
      const token = siteConfig.telegram.botToken;
      const bot = new TelegramBot(token, { polling: false });
      const chatId = siteConfig.telegram.chatId;
      const threadId = siteConfig.telegram.threadId;

      bot.sendDocument(
        chatId,
        tempPath,
        { caption: `New photo from ${name}`, reply_to_message_id: parseInt(threadId) },
        { filename: telegramFileName }
      );
    } catch (error) {
      console.log(error);
      status = 500;
      resultBody = {
        status: 'fail',
        message: 'Telegram error',
      };
    }
  }

  res.status(status).json(resultBody);
}
