import { File } from 'formidable';

export interface MusicFormFields {
  name: string;
  surname: string;
  email: string;
  file: File | null;
  event: 'contest' | 'gala' | 'worldShow';
}

export type FormFields = Omit<MusicFormFields, 'file'>;

export interface FormData {
  fields: FormFields;
  file: File;
}
