import { AgeGroup } from '@/src/types';
import { FormFields } from './types';

export const getContestAgeGroupsList = (ageGroup: AgeGroup | null): AgeGroup[] => {
  if (ageGroup)
    return ageGroup === 'juniors' || ageGroup === 'seniors' ? [ageGroup, 'adults'] : [ageGroup];
  else return [];
};
