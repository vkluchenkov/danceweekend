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
      (fields as any)[field] = value;
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
    // @ts-ignore
    const { event, name, surname, type, groupName, ageGroup, level, category } = formData.fields;

    /* Create directory for uploads */
    const uploadDir = () => {
      if (event === 'worldShow') {
        if (type === 'solo') return path.join(process.cwd(), `/uploads/world_show/solo/`);
        else return path.join(process.cwd(), `/uploads/world_show/groups/`);
      }

      if (event === 'contest') {
        if (ageGroup === 'baby' || ageGroup === 'seniors')
          return path.join(process.cwd(), `/uploads/contest/${ageGroup}`);
        else
          return path.join(
            process.cwd(),
            `/uploads/contest/${ageGroup}/${level}/${category.replace('/', '_')}/`
          );
      }
      return '';
    };

    try {
      await fs.access(uploadDir());
    } catch (e) {
      await fs.mkdir(uploadDir(), { recursive: true });
    }

    /* Move uploaded file to directory */
    const tempPath = formData.file.filepath;
    const extName = path.extname(formData.file.originalFilename!);
    const fileName = () => {
      if (type === 'group' && event === 'worldShow')
        return groupName + '(' + name + '_' + surname + ')' + extName;
      return name + '_' + surname + extName;
    };
    await fs.rename(tempPath, uploadDir() + fileName());
  }

  res.status(status).json(resultBody);
}
