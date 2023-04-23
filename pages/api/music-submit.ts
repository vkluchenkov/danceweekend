import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import path from 'path';
import { promises as fs } from 'fs';
import { FormFields, FormData } from '@/src/types/music.types';
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
      event: 'contest',
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
    const { event, name, surname, type, groupName, ageGroup, level, category, audioLength } =
      formData.fields;

    /* Create directory for uploads */
    // const uploadDir = () => {
    //   if (event === 'worldShow') {
    //     if (type === 'solo') return path.join(process.cwd(), `/uploads/World Show/solo/`);
    //     else return path.join(process.cwd(), `/uploads/World Show/Groups and Duos/`);
    //   }

    //   if (event === 'contest') {
    //     const isCategory = !!category;
    //     const safeCategory = category!.replace('/', '_');
    //     return path.join(
    //       process.cwd(),
    //       `/uploads/Contest/`,
    //       ageGroup! + '/',
    //       level != undefined ? level + '/' : '',
    //       isCategory ? safeCategory + '/' : ''
    //     );
    //   }
    //   return '';
    // };

    // try {
    //   await fs.access(uploadDir());
    // } catch (e) {
    //   await fs.mkdir(uploadDir(), { recursive: true });
    // }

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

    /* Move uploaded file to directory */
    // await fs.rename(tempPath, uploadDir() + fileName());

    // FTP
    const ftpClient = new ftp.Client();
    // ftpClient.ftp.verbose = true;

    const ftpDir = process.env.FTP_DIR!;

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
        host: process.env.FTP_HOST,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASSWORD,
        secure: false,
      });

      await ftpClient.ensureDir(ftpDir + ftpUploadDir());
      await ftpClient.uploadFrom(tempPath, fileName());
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
