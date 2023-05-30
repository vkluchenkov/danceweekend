import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import path from 'path';
import { FormFields, FormData } from '@/src/types/photo.types';
import * as ftp from 'basic-ftp';
import sanitize from 'sanitize-filename';

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

    const tempPath = formData.file.filepath;
    const extName = path.extname(formData.file.originalFilename!);
    const fileName = sanitize(name!) + extName;

    // FTP
    const ftpClient = new ftp.Client();

    const ftpDir = process.env.FTP_PHOTO_DIR!;

    const ftpUploadDir = () => {
      const date = new Date().toLocaleDateString('pl');
      return '/' + date;
    };

    try {
      await ftpClient.access({
        host: process.env.FTP_HOST,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASSWORD,
        secure: false,
      });

      await ftpClient.ensureDir(ftpDir + ftpUploadDir());
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
