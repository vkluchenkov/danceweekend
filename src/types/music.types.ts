import { AgeGroup } from '.';
import { Level } from '../ulis/contestCategories';

export interface MusicFormFields {
  name: string;
  surname: string;
  email: string;
  file: File;
  event: 'contest' | 'gala' | 'worldShow';
}
