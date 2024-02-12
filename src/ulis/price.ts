import { PricePeriod, SoloPriceCats, ContestSoloPrice } from '@/src/types';

export const ispromoPeriod = false;
export const isOnlinePromoPeriod = false;

export const isFullPassSoldOut = false;
export const isOnlineFullPassSoldOut = false;

//Translation keys for Price page
export const teachersWsGroups = {
  group1: ['pablo', 'diana', 'leandro', 'chronis', 'aliahChronis'],
  group2: ['polina', 'eva', 'levana'],
};

export const kidsDiscount = 0.5;
export const kidsMaxAge = 11;

export const workshopsPrice: PricePeriod[] = [
  {
    isPromo: true,
    price: {
      live: {
        fullPassPrice: 299,
        // group1Price: 55,
        // group2Price: 40,
      },
      online: {
        fullPassPrice: 225,
        // group1Price: 25,
        // group2Price: 20,
      },
    },
    description: 'promoDescription',
  },
  {
    price: {
      live: {
        fullPassPrice: 350,
        // group1Price: 50,
        // group2Price: 40,
      },
      online: {
        fullPassPrice: 260,
        // group1Price: 25,
        // group2Price: 20,
      },
    },
    startDate: new Date('2024-02-01T00:00:00+01:00'), //Must start before current date
    endDate: new Date('2024-04-30T23:59:59+01:00'),
  },
  {
    price: {
      live: {
        fullPassPrice: 420,
        // group1Price: 60,
        // group2Price: 50,
      },
      online: {
        fullPassPrice: 315,
        // group1Price: 30,
        // group2Price: 25,
      },
    },
    startDate: new Date('2024-05-01T00:00:00+01:00'), //Must start immediately after previous
    endDate: new Date('2024-07-31T23:59:59+01:00'),
  },
  {
    price: {
      live: {
        fullPassPrice: 480,
        // group1Price: 70,
        // group2Price: 60,
      },
      online: {
        fullPassPrice: 360,
        // group1Price: 35,
        // group2Price: 30,
      },
    },
    startDate: new Date('2024-08-01T00:00:00+01:00'), //Must start immediately after previous
    endDate: new Date('2024-08-25T23:59:59+01:00'),
  },
];

export const contestSoloPrice: Record<SoloPriceCats, number> = {
  kids: 25,
  risingStar: 40,
  professionals: 50,
  soloPassKids: 80,
  soloPassRisingStar: 130,
  soloPassProfessionals: 160,
};

export const contestGroupPrice = 20;

export const worldShowPrice = {
  solo: 40,
  groups: 20,
};
