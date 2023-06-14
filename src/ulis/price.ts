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
        fullPassPrice: 249,
        group1Price: 50,
        group2Price: 40,
      },
      online: {
        fullPassPrice: 190,
        group1Price: 25,
        group2Price: 20,
      },
    },
    description: 'promoDescription',
  },
  {
    price: {
      live: {
        fullPassPrice: 290,
        group1Price: 50,
        group2Price: 40,
      },
      online: {
        fullPassPrice: 230,
        group1Price: 25,
        group2Price: 20,
      },
    },
    startDate: new Date('2023-04-01T00:00:00+01:00'), //Must start before current date
    endDate: new Date('2023-05-31T23:59:59+01:00'),
  },
  {
    price: {
      live: {
        fullPassPrice: 340,
        group1Price: 60,
        group2Price: 50,
      },
      online: {
        fullPassPrice: 260,
        group1Price: 30,
        group2Price: 25,
      },
    },
    startDate: new Date('2023-06-01T00:00:00+01:00'), //Must start immediately after previous
    endDate: new Date('2023-07-31T23:59:59+01:00'),
  },
  {
    price: {
      live: {
        fullPassPrice: 420,
        group1Price: 70,
        group2Price: 60,
      },
      online: {
        fullPassPrice: 320,
        group1Price: 35,
        group2Price: 30,
      },
    },
    startDate: new Date('2023-08-01T00:00:00+01:00'), //Must start immediately after previous
    endDate: new Date('2023-08-16T23:59:59+01:00'),
  },
];

export const contestSoloPrice: Record<SoloPriceCats, ContestSoloPrice> = {
  kids: {
    price: {
      live: {
        priceNormal: 25,
        priceDiscounted: 20,
      },
      online: {
        priceNormal: 15,
        priceDiscounted: 10,
      },
    },
  },
  risingStar: {
    price: {
      live: {
        priceNormal: 40,
        priceDiscounted: 30,
      },
      online: {
        priceNormal: 30,
        priceDiscounted: 20,
      },
    },
  },
  professionals: {
    price: {
      live: {
        priceNormal: 50,
        priceDiscounted: 40,
      },
      online: {
        priceNormal: 40,
        priceDiscounted: 30,
      },
    },
  },
  soloPassKids: {
    price: {
      live: {
        priceNormal: 80,
        priceDiscounted: 65,
      },
      online: {
        priceNormal: 80,
        priceDiscounted: 65,
      },
    },
  },
  soloPassRisingStar: {
    price: {
      live: {
        priceNormal: 130,
        priceDiscounted: 95,
      },
      online: {
        priceNormal: 130,
        priceDiscounted: 95,
      },
    },
  },
  soloPassProfessionals: {
    price: {
      live: {
        priceNormal: 160,
        priceDiscounted: 130,
      },
      online: {
        priceNormal: 160,
        priceDiscounted: 130,
      },
    },
  },
};

export const contestGroupPrice = {
  live: 20,
  online: 15,
};

export const worldShowPrice = {
  soloPriceNormal: 40,
  soloPriceDicounted: 30,
  groups: 20,
};
