import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import path from 'path';
import * as ftp from 'basic-ftp';
import sanitize from 'sanitize-filename';
import getT from 'next-translate/getT';
import TelegramBot from 'node-telegram-bot-api';

import { config as appConfig } from '@/src/config';
import { FormFields, FormData } from '@/src/types/music.types';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let status = 200,
    resultBody = { status: 'ok', message: 'Files were uploaded successfully' };

  const t = await getT('en', 'music');

  const form = new formidable.IncomingForm();

  const formData = await new Promise<FormData | undefined>((resolve, reject) => {
    let file: File;

    const fields: FormFields = {
      event: 'contest',
      email: '',
      type: 'solo',
      audioLength: 0,
    };

    form.on('file', (field, formFile) => {
      file = formFile;
    });

    form.on('field', (field, value) => {
      (fields as any)[field] = value === 'undefined' ? undefined : value;
    });

    form.on('end', () => resolve({ file, fields }));
    form.on('error', (err) => reject(err));

    form.parse(req, () => {
      //
    });
  }).catch((e) => {
    console.log(e);
    status = 500;
    resultBody = {
      status: 'fail',
      message: 'Upload error',
    };
  });

  if (formData) {
    const {
      event,
      name,
      email,
      surname,
      stageName,
      type,
      groupName,
      ageGroup,
      level,
      category,
      audioLength,
    } = formData.fields;
    const tempPath = formData.file.filepath;
    const extName = path.extname(formData.file.originalFilename!);
    const fileStageName = stageName ? '(' + sanitize(stageName) + ')' : '';
    const fileName = () => {
      if (type === 'duo' || type === 'group')
        return sanitize(groupName!) + '_' + Math.round(audioLength) + 'sec' + extName;
      else
        return (
          sanitize(name!) +
          ' ' +
          sanitize(surname!) +
          ' ' +
          fileStageName +
          ' ' +
          Math.round(audioLength) +
          'sec' +
          extName
        );
    };

    // FTP
    const ftpClient = new ftp.Client();
    const ftpDir = appConfig.ftp.musicDir;

    const ftpUploadDir = () => {
      if (event === 'worldShow') {
        if (type === 'solo') return `/World Show/solo/`;
        else return `/World Show/Groups and Duos/`;
      }
      if (event === 'contest') {
        const isCategory = !!category;
        const safeCategory = sanitize(category!);

        const groupOrSolo = type === 'group' || type === 'duo' ? 'Groups and Duos/' : 'Solo/';

        return (
          '/Contest/' +
          groupOrSolo +
          ageGroup! +
          '/' +
          (level != undefined ? level + '/' : '') +
          (isCategory ? safeCategory + '/' : '')
        );
      }
      return '';
    };

    try {
      await ftpClient.access({
        host: appConfig.ftp.ftpHost,
        user: appConfig.ftp.ftpUser,
        password: appConfig.ftp.ftpPassword,
        secure: false,
      });

      // Debug
      // ftpClient.ftp.verbose = true;

      // Get full path
      const fullDirName = ftpDir + ftpUploadDir();
      // Create dir or make sure it exists
      await ftpClient.ensureDir(fullDirName);
      // Remove any file with this name if exists and ignore errors if it doesn't
      await ftpClient.remove(fileName(), true);
      // upload new file
      await ftpClient.uploadFrom(tempPath, fileName());

      // Telegram
      const bot = new TelegramBot(appConfig.telegram.botToken, { polling: false });
      const chatId = appConfig.telegram.chatId;
      const threadId = appConfig.telegram.threadId;

      const getCaption = () => {
        const form = formData.fields;

        const musicForm = [
          'email',
          'type',
          'event',
          'groupName',
          'ageGroup',
          'level',
          'category',
          'audioLength',
        ].map((i) => ({
          key: i,
          value: form[i as keyof FormFields],
        }));

        const formEntries = musicForm
          .map((i) => {
            const value = i.value as string;
            if (!i.value) return '';
            if (i.key === 'type') return `Type: ${t(`form.${value.trim()}`)}`;
            if (i.key === 'event') return `Event: ${t(`form.${value.trim()}`)}`;
            if (i.key === 'ageGroup') return `Age group: ${t(`form.ageGroups.${value.trim()}`)}`;
            if (i.key === 'level') return `Level: ${t(`form.levels.${value.trim()}`)}`;
            if (i.key === 'category') return `Style: ${value.trim()}`;
            if (i.key === 'audioLength')
              return `Audio length: ${Math.round(value as unknown as number)} sec`;
            return t(`form.${i.key}`) + ': ' + value.trim();
          })
          .join('\n')
          .replaceAll('\n\n', '\n')
          .replaceAll('\n\n', '\n')
          .replaceAll('\n\n', '\n');

        const getSubj = () => {
          if (name && surname)
            return t('email.title') + ' ' + name + ' ' + surname + ' ' + fileStageName;
          if (groupName) return t('email.title') + ' ' + groupName;
          return t('email.title');
        };

        return getSubj() + `\n` + formEntries + `\n` + 'Uploaded to: ' + ftpUploadDir();
      };

      // console.log(fileName());
      // console.log(tempPath);

      bot.sendAudio(
        chatId,
        tempPath,
        {
          caption: getCaption(),
          reply_to_message_id: parseInt(threadId),
        },
        { filename: fileName() }
      );
    } catch (error) {
      console.log(error);
      status = 500;
      resultBody = {
        status: 'fail',
        message: 'FTP Upload error',
      };
    }
  }

  res.status(status).json(resultBody);
}
