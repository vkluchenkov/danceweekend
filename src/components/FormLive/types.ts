import { PricePeriod } from '@/src/types';
import { Workshop } from '@/src/ulis/schedule';

export type WorkshopsField = (Workshop & { selected: boolean; day: string })[];

export type WorkshopsType = 'fullPass' | 'single';

export type FullPassDiscount = '30%' | '50%' | 'free' | 'none';

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
}

export type StepId =
  | 'personal'
  | 'workshops'
  | 'constestSolo'
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
  setWsTotal: (wsTotal: number) => void;
  fullPassDiscountList: FullPassDiscount[];
};
