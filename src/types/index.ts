export type Version = 'live' | 'online';
export type SupportedLangs = 'ru' | 'en';

export interface PricePeriod {
  price: {
    [version in Version]: {
      fullPassPrice: number;
      group1Price: number;
      group2Price: number;
    };
  };
  description?: string;
  startDate?: Date;
  endDate?: Date;
  isPromo?: boolean;
}

export type SoloPriceCats =
  | 'kids'
  | 'risingStar'
  | 'professionals'
  | 'soloPassKids'
  | 'soloPassRisingStar'
  | 'soloPassProfessionals';

export interface ContestSoloPrice {
  price: {
    [version in Version]: {
      priceNormal: number;
      priceDiscounted: number;
    };
  };
}

export type AgeGroup = 'baby' | 'kids' | 'juniors' | 'adults' | 'seniors';
