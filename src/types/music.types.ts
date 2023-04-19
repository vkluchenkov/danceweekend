import { File as formidableFile } from 'formidable';
import { AgeGroup } from '.';
import { Category, Level } from '../ulis/contestCategories';

interface CommonFormFields {
  name: string;
  surname: string;
  email: string;
  file: File | null;
  event: 'contest' | 'worldShow' | undefined;
}

interface WorldShowFormFields extends CommonFormFields {
  type: 'group' | 'solo';
  groupName?: string;
}

interface ContestFormFields extends CommonFormFields {
  ageGroup: AgeGroup;
  levels: Level[];
  level: Level;
  categories: (Category & { isDuo: boolean; isGroup: boolean })[];
  category: string;
}

export type MusicFormFields = ContestFormFields | WorldShowFormFields;

// Api routes types
export type FormFields = Omit<MusicFormFields, 'file'>;

export interface FormData {
  fields: FormFields;
  file: formidableFile;
}
