interface PricePeriod {
  fullPassPrice: number;
  group1Price: number;
  group2Price: number;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  isPromo?: boolean;
}

export const teachersWsGroups = {
  group1: ['pablo', 'diana', 'alexey', 'leandro', 'chronis', 'aliahChronis'],
  group2: ['polina', 'eva', 'levana'],
};

export const workshopsPrice: PricePeriod[] = [
  {
    fullPassPrice: 249,
    group1Price: 50,
    group2Price: 40,
    description: 'promoDescription',
    isPromo: true,
  },
  {
    fullPassPrice: 290,
    group1Price: 50,
    group2Price: 40,
    startDate: new Date('2023-03-10T00:00:00+01:00'),
    endDate: new Date('2023-05-31T23:59:59+01:00'),
  },
  {
    fullPassPrice: 340,
    group1Price: 60,
    group2Price: 50,
    startDate: new Date('2023-06-01T00:00:00+01:00'),
    endDate: new Date('2023-07-31T23:59:59+01:00'),
  },
  {
    fullPassPrice: 420,
    group1Price: 70,
    group2Price: 60,
    startDate: new Date('2023-08-01T00:00:00+01:00'),
    endDate: new Date('2023-08-16T23:59:59+01:00'),
  },
];

export const contestSoloPrice = {
  kids: {
    priceNormal: 25,
    priceDiscounted: 20,
  },
  risingStar: {
    priceNormal: 40,
    priceDiscounted: 30,
  },
  professionals: {
    priceNormal: 50,
    priceDiscounted: 40,
  },
  soloPassKids: {
    priceNormal: 80,
    priceDiscounted: 65,
  },
  soloPassRisingStar: {
    priceNormal: 130,
    priceDiscounted: 95,
  },
  soloPassProfessionals: {
    priceNormal: 160,
    priceDiscounted: 130,
  },
};

export const contestGroupPrice = 20;

export const worldShowPrice = {
  soloPriceNormal: 40,
  soloPriceDicounted: 30,
  groups: 20,
};
