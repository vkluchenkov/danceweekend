import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import path from 'path';
import { promises as fs } from 'fs';
import { FormFields, FormData } from '@/src/types/music.types';

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
      name: '',
      surname: '',
      email: '',
      event: 'contest',
    };

    form.on('file', (field, formFile) => {
      file = formFile;
    });

    form.on('field', (field, value) => {
      if (field != 'event') fields[field as keyof Omit<FormFields, 'event'>] = value;
      else fields.event = value as FormFields['event'];
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
    /* Create directory for uploads */
    const targetPath = path.join(process.cwd(), `/uploads/`);
    try {
      await fs.access(targetPath);
    } catch (e) {
      await fs.mkdir(targetPath);
    }

    /* Move uploaded file to directory */
    const tempPath = formData.file.filepath;
    const extName = path.extname(formData.file.originalFilename!);
    const fileName =
      formData.fields.name +
      ' ' +
      formData.fields.surname +
      ' – ' +
      formData.fields.event +
      extName;
    await fs.rename(tempPath, targetPath + fileName);
  }

  res.status(status).json(resultBody);
}
