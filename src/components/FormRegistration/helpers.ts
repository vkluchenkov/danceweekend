import { AgeGroup } from '@/src/types';
import { FormFields, Step, yearsBeforeField, yearsValues } from './types';
import { WordpressApi } from '@/src/api/wordpressApi';
import { DateTime } from 'luxon';

export const getContestAgeGroupsList = (ageGroup: AgeGroup | null): AgeGroup[] => {
  if (ageGroup)
    // return ageGroup === 'juniors' || ageGroup === 'seniors' ? [ageGroup, 'adults'] : [ageGroup];
    return ageGroup === 'seniors' ? [ageGroup, 'adults'] : [ageGroup];
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

export const getWsPrices = (
  settings: Awaited<ReturnType<typeof WordpressApi.getSettings>> | undefined,
  isDev: boolean
) => {
  if (settings) {
    const isPromo = (): boolean => {
      const livePromo = isDev
        ? settings.price.promoPeriodDev.isLivePromo.toLowerCase()
        : settings.price.promoPeriod.isLivePromo.toLowerCase();
      return livePromo === 'true' ? true : false;
    };

    const promoWsPrices = isDev
      ? settings.price.promoPeriodDev.singlews
      : settings.price.promoPeriod.singlews;

    const periods = Object.entries(settings.price.periods);
    const today = DateTime.now().setZone('Europe/Warsaw');

    const getCurrentWsPrice = () => {
      const periodWsPrices = periods.find((p) => {
        const startDate = DateTime.fromISO(p[1].start)
          .setZone('UTC')
          .setZone('Europe/Warsaw', { keepLocalTime: true });

        const endDate = DateTime.fromISO(p[1].end)
          .setZone('UTC')
          .setZone('Europe/Warsaw', { keepLocalTime: true });

        return startDate <= today && today <= endDate;
      })?.[1].singlews;

      return isPromo() ? promoWsPrices : periodWsPrices;
    };

    return getCurrentWsPrice();
  } else return undefined;
};
