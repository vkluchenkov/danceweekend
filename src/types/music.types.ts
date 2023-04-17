export interface MusicFormFields {
  name: string;
  surname: string;
  email: string;
  file: File | null;
  event: 'contest' | 'gala' | 'worldShow';
}
