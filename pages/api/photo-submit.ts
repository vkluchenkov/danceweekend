import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import path from 'path';
import * as ftp from 'basic-ftp';
import sanitize from 'sanitize-filename';

import { FormFields, FormData } from '@/src/types/photo.types';
import { config as appConfig } from '@/src/config';

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
    const { name } = formData.fields;
    const time = new Date().toLocaleTimeString('pl');

    const tempPath = formData.file.filepath;
    const extName = path.extname(formData.file.originalFilename!);
    const fileName = sanitize(name!) + ' (' + time + ')' + extName;

    // FTP
    const ftpClient = new ftp.Client();

    const ftpDir = appConfig.ftp.photoDir;

    const ftpUploadDir = () => {
      const date = new Date().toLocaleDateString('pl');
      return '/' + date;
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
      // upload new file
      await ftpClient.uploadFrom(tempPath, fileName);
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
