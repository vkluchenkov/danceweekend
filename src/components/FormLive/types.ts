import { AgeGroup, PricePeriod } from '@/src/types';
import { Category, Level } from '@/src/ulis/contestCategories';
import { Workshop } from '@/src/ulis/schedule';

export interface GroupContest {
  type: 'duo' | 'group';
  qty: number;
  name: string;
  price: number;
}

export type WorkshopsField = (Workshop & { selected: boolean; day: string })[];
export type SoloContestField = (Category & { selected: boolean; id: string; price: number })[];

export type WorkshopsType = 'fullPass' | 'single';

export type FullPassDiscount = 'group' | '30%' | '50%' | 'free' | 'none';

export interface FormFields {
  isSoloPass: boolean;
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
  contestAgeGroup: AgeGroup | null;
  contestLevels: Level[];
  contestLevel: Level;
  soloContest: SoloContestField;
  groupContest: GroupContest[];
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
  showConditions?: boolean;
}

export interface StepProps {
  onStepSubmit: (direction: 'next' | 'prev') => void;
}

export type WorkshopsStepProps = StepProps & {
  currentPricePeriod: PricePeriod | undefined;
  fullPassPrice: number | undefined;
  setStepTotal: (total: number) => void;
  fullPassDiscountList: FullPassDiscount[];
};

export type ContestSoloStepProps = StepProps & {
  setStepTotal: (total: number) => void;
  isEligible: boolean;
  soloPassPrice: number;
};

export type ContestGroupStepProps = StepProps & {
  isEligible: boolean;
  setStepTotal: (total: number) => void;
};
