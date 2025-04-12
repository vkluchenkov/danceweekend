import { WordpressApi } from '@/src/api/wordpressApi';
import { AgeGroup, SupportedLangs, Version } from '@/src/types';
import { Style, Level } from '@/src/ulis/contestCategories';
import { Workshop } from '@/src/ulis/schedule';

export interface GroupContest {
  type: 'duo' | 'group';
  ageGroup: AgeGroup | null;
  style: string;
  styles?: Style[];
  qty: number;
  name: string;
  price: number;
}

export type WorkshopsField = (Workshop & { selected: boolean; day: string })[];

export type WorkshopsType = 'fullPass' | 'single' | '';

export interface WorldShowGroup {
  qty: number;
  name: string;
  price: number;
}

export type SoloContestField = (Style & { selected: boolean; id: string; price: number })[];

export type FullPassDiscount = 'group' | '30%' | '50%' | 'free' | 'none';

export const yearsValues = [
  '2016',
  '2017',
  '2018',
  '2019',
  '2021',
  '2022',
  '2023',
  '2024',
] as const;

export type yearsBefore = (typeof yearsValues)[number];

export type yearsBeforeField = { year: yearsBefore; selected: boolean; id: yearsBefore }[];

export interface FormFields {
  version: Version;
  settings: Awaited<ReturnType<typeof WordpressApi.getSettings>>;
  name: string;
  surname: string;
  stageName: string;
  age: number;
  // yearsBefore: string;
  beenBefore: boolean;
  yearsBefore2: yearsBeforeField;
  email: string;
  social: string;
  country: string;
  city: string;
  tel: string;
  workshops: WorkshopsField;
  workshopsType: WorkshopsType;
  wsPrices: WsPrices | undefined;
  isFullPass: boolean;
  fullPassDiscount: FullPassDiscount;
  fullPassDiscountSource: string;
  fullPassGroupName: string;
  ageGroup: AgeGroup | null;
  isSoloContest: boolean;
  contestAgeGroup: AgeGroup | null;
  isSoloPass: boolean;
  contestLevels: Level[];
  contestLevel?: Level;
  soloContest: SoloContestField;
  isGroupContest: boolean;
  groupContest: GroupContest[];
  isWorldShowSolo: boolean;
  isWorldShowGroup: boolean;
  worldShowGroup: WorldShowGroup | null;
  rulesAccepted: boolean;
  isInstallments: boolean;
  currentStep: StepId;
}

export type StepId =
  | 'personal'
  | 'workshops'
  | 'contestSolo'
  | 'contestGroups'
  | 'worldShow'
  | 'summary';

export interface Step {
  id: StepId;
  prev: StepId | null;
  next: StepId | null;
}

export interface StepProps {}

export type PersonalStepProps = StepProps & {
  setIsNextDisabled: (state: boolean) => void;
};

export type WsPrices = {
  group1: {
    names: string;
    price: number;
  };
  group2: {
    names: string;
    price: number;
  };
};

export type WorkshopsStepProps = StepProps & {
  fullPassPrice: number | undefined;
  setStepTotal: (total: number) => void;
  fullPassDiscountList: FullPassDiscount[];
  setIsNextDisabled: (state: boolean) => void;
};

export type ContestSoloStepProps = StepProps & {
  setStepTotal: (total: number) => void;
  soloPassPrice: number;
  setIsNextDisabled: (state: boolean) => void;
  isEligible: boolean;
};

export type ContestGroupStepProps = StepProps & {
  setStepTotal: (total: number) => void;
  lastDirection: 'prev' | 'next' | null;
  onStepSubmit: (direction: 'next' | 'prev') => void;
};

export type WorldShowStepProps = StepProps & {
  setStepTotal: (total: number) => void;
  isEligible: boolean;
};

export type SummaryStepProps = StepProps & {
  fullPassPrice: number | undefined;
  soloPassPrice: number;
  total: number;
  setIsNextDisabled: (state: boolean) => void;
};

export type OrderPayload = FormFields & {
  fullPassPrice: number | undefined;
  currentLang: SupportedLangs;
  soloPassPrice: number;
  total: number;
};
