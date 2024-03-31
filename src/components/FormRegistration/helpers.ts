import { AgeGroup } from '@/src/types';
import { FormFields, Step, yearsBeforeField, yearsValues } from './types';

export const getContestAgeGroupsList = (ageGroup: AgeGroup | null): AgeGroup[] => {
  if (ageGroup)
    return ageGroup === 'juniors' || ageGroup === 'seniors' ? [ageGroup, 'adults'] : [ageGroup];
  else return [];
};

export const liveSteps: Step[] = [
  {
    id: 'personal',
    prev: null,
    next: 'workshops',
  },
  {
    id: 'workshops',
    prev: 'personal',
    next: 'contestSolo',
  },
  {
    id: 'contestSolo',
    prev: 'workshops',
    next: 'contestGroups',
  },
  {
    id: 'contestGroups',
    prev: 'contestSolo',
    next: 'worldShow',
  },
  {
    id: 'worldShow',
    prev: 'contestGroups',
    next: 'summary',
  },
  {
    id: 'summary',
    prev: 'worldShow',
    next: null,
  },
];

export const onlineSteps: Step[] = [
  {
    id: 'personal',
    prev: null,
    next: 'workshops',
  },
  {
    id: 'workshops',
    prev: 'personal',
    next: 'summary',
  },
  {
    id: 'summary',
    prev: 'workshops',
    next: null,
  },
];

const yearsMap: yearsBeforeField = yearsValues.map((year) => {
  return {
    year,
    selected: false,
    id: year,
  };
});

export const defaultValues: Partial<FormFields> = {
  version: 'live',
  yearsBefore2: yearsMap,
  isFullPass: false,
  workshops: [],
  isSoloPass: false,
  fullPassDiscount: 'none',
  isSoloContest: false,
  soloContest: [],
  isGroupContest: false,
  groupContest: [],
  currentStep: 'personal',
  rulesAccepted: false,
};
