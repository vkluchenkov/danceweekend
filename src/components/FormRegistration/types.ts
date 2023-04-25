import { AgeGroup, PricePeriod, SupportedLangs, Version } from '@/src/types';
import { Style, Level } from '@/src/ulis/contestCategories';
import { Workshop } from '@/src/ulis/schedule';

export interface GroupContest {
  type: 'duo' | 'group';
  style: string;
  qty: number;
  name: string;
  price: number;
}

export interface WorldShowGroup {
  qty: number;
  name: string;
  price: number;
}

export type WorkshopsField = (Workshop & { selected: boolean; day: string })[];
export type SoloContestField = (Style & { selected: boolean; id: string; price: number })[];

export type WorkshopsType = 'fullPass' | 'single';

export type FullPassDiscount = 'group' | '30%' | '50%' | 'free' | 'none';

export interface FormFields {
  version: Version;
  isFullPass: boolean;
  name: string;
  surname: string;
  stageName: string;
  age: number;
  email: string;
  social: string;
  country: string;
  city: string;
  tel: string;
  workshops: WorkshopsField;
  workshopsType: WorkshopsType;
  fullPassDiscount: FullPassDiscount;
  fullPassDiscountSource: string;
  fullPassGroupName: string;
  ageGroup: AgeGroup | null;
  isSoloContest: boolean;
  contestAgeGroup: AgeGroup | null;
  isSoloPass: boolean;
  contestLevels: Level[];
  contestLevel: Level;
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

export interface StepProps {
  // onStepSubmit: (direction: 'next' | 'prev') => void;
}

export type WorkshopsStepProps = StepProps & {
  currentPricePeriod: PricePeriod | undefined;
  fullPassPrice: number | undefined;
  setStepTotal: (total: number) => void;
  fullPassDiscountList: FullPassDiscount[];
  setIsNextDisabled: (state: boolean) => void;
};

export type ContestSoloStepProps = StepProps & {
  setStepTotal: (total: number) => void;
  isEligible: boolean;
  soloPassPrice: number;
  setIsNextDisabled: (state: boolean) => void;
};

export type ContestGroupStepProps = StepProps & {
  isEligible: boolean;
  setStepTotal: (total: number) => void;
  lastDirection: 'prev' | 'next' | null;
  onStepSubmit: (direction: 'next' | 'prev') => void;
};

export type WorldShowStepProps = StepProps & {
  isEligible: boolean;
  setStepTotal: (total: number) => void;
};

export type SummaryStepProps = StepProps & {
  fullPassPrice: number | undefined;
  soloPassPrice: number;
  currentPricePeriod: PricePeriod | undefined;
  total: number;
  setIsNextDisabled: (state: boolean) => void;
};

export type OrderPayload = FormFields & {
  fullPassPrice: number | undefined;
  currentPricePeriod: PricePeriod | undefined;
  currentLang: SupportedLangs;
  soloPassPrice: number;
  total: number;
};
