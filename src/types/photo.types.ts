import { File as formidableFile } from 'formidable';

export interface PhotoFormFields {
  name: string;
  file: File | null;
}

// Api routes types
export type FormFields = Omit<PhotoFormFields, 'file'>;

export interface FormData {
  fields: FormFields;
  file: formidableFile;
}
