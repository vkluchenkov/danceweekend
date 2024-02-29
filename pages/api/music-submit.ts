import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import path from 'path';
import { promises as fs } from 'fs';
import * as ftp from 'basic-ftp';
import sanitize from 'sanitize-filename';
import getT from 'next-translate/getT';

import { config as appConfig } from '@/src/config';
import { FormFields, FormData } from '@/src/types/music.types';
import { senderEmail, senderName } from '@/src/ulis/constants';
import { sendMail } from '@/src/email/sendMail';
import { musicAdminEmail } from '@/src/email/musicAdminEmail';

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
    const { event, name, email, surname, type, groupName, ageGroup, level, category, audioLength } =
      formData.fields;
    const tempPath = formData.file.filepath;
    const extName = path.extname(formData.file.originalFilename!);
    const fileName = () => {
      if (type === 'duo' || type === 'group')
        return sanitize(groupName!) + '_' + Math.round(audioLength) + 'sec' + extName;
      else
        return (
          sanitize(name!) +
          ' ' +
          sanitize(surname!) +
          '_' +
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
        return (
          '/Contest/' +
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

      // Emails
      const getSubj = () => {
        if (name && surname) return t('email.title') + ' ' + name + ' ' + surname;
        if (groupName) return t('email.title') + ' ' + groupName;
        return t('email.title');
      };

      const adminEmailContent = musicAdminEmail({
        form: formData.fields,
        t: t,
        subj: getSubj(),
      }).html;

      const adminEmailErrors = musicAdminEmail({
        form: formData.fields,
        t: t,
        subj: getSubj(),
      }).errors;

      const adminMailPayload = {
        senderEmail: senderEmail,
        senderName: senderName,
        recipientEmail: senderEmail,
        recipientName: senderName,
        recipientSubj: getSubj(),
        mailContent: adminEmailContent,
      };

      sendMail(adminMailPayload);
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
