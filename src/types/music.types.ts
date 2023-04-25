import { File as formidableFile } from 'formidable';
import { AgeGroup } from '.';
import { Style, Level } from '../ulis/contestCategories';

export interface MusicFormFields {
  type: 'group' | 'duo' | 'solo';
  event: 'contest' | 'worldShow' | undefined;
  name?: string;
  surname?: string;
  groupName?: string;
  ageGroup?: AgeGroup;
  levels?: Level[];
  level?: Level;
  categories?: (Style & { isDuo: boolean; isGroup: boolean })[];
  category?: string;
  audioLength: number;
  file: File | null;
}

// Api routes types
export type FormFields = Omit<MusicFormFields, 'file'>;

export interface FormData {
  fields: FormFields;
  file: formidableFile;
}
