import { FormProvider, useForm } from 'react-hook-form';
import { PersonalData } from './PersonalData';
import styles from '@/styles/Registration.module.css';
import textStyles from '@/styles/Text.module.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Workshops } from './Workshops';
import { schedule } from '@/src/ulis/schedule';
import useTranslation from 'next-translate/useTranslation';
import { AgeGroup, SupportedLangs } from '@/src/types';
import {
  FormFields,
  FullPassDiscount,
  SoloContestField,
  Step,
  StepId,
  WorkshopsField,
} from './types';
import { contestSoloPrice, ispromoPeriod, kidsDiscount, workshopsPrice } from '@/src/ulis/price';
import { Collapse } from '@mui/material';
import { getAgeGroup } from '@/src/ulis/getAgeGroup';
import { ContestSolo } from './ContestSolo';
import { minWsAdults, minWsKids } from '@/src/ulis/constants';
import { contestCategories, Level } from '@/src/ulis/contestCategories';
import { ContestGroups } from './ContestGroups';

const steps: Step[] = [
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
    next: null,
  },
];

const defaultValues: Partial<FormFields> = {
  isFullPass: false,
  isSoloPass: false,
  workshops: [],
  fullPassDiscount: 'none',
  soloContest: [],
};

export const FormLive: React.FC = () => {
  const { t, lang } = useTranslation('registration');
  const currentLang = lang as SupportedLangs;

  const methods = useForm<FormFields>({
    defaultValues: defaultValues,
  });
  const { handleSubmit, setValue, watch } = methods;

  const age: number | undefined = watch('age');
  const ageGroup: AgeGroup | null = watch('ageGroup');
  const contestAgeGroup: AgeGroup | null = watch('contestAgeGroup');
  const contestLevels: Level[] = watch('contestLevels');

  const [currentStep, setCurrentStep] = useState<StepId>('personal');
  const [total, setTotal] = useState(0);
  const [wstotal, setWsTotal] = useState(0);
  const [contestSoloTotal, setContestSoloTotal] = useState(0);
  const [contestGroupsTotal, setContestGroupsTotal] = useState(0);

  // Write initial age groups into form state
  useEffect(() => {
    setValue('contestAgeGroup', age ? getAgeGroup(age) : null);
    setValue('ageGroup', age ? getAgeGroup(age) : null);
  }, [age, setValue]);

  // Map workshops data into form state
  useEffect(() => {
    const res: WorkshopsField = [];
    schedule.forEach((day) => {
      day.dayEvents.forEach((event) => {
        event.type === 'workshop' &&
          res.push({ ...event, selected: false, day: day.translations[currentLang].dayTitle });
      });
    });
    setValue('workshops', res);
  }, [setValue, currentLang]);

  // Map solo contest styles into form state
  useEffect(() => {
    const res: SoloContestField = [];
    // Filter by age
    const filteredByAgeGroup = contestCategories.filter(
      (cat) => cat.ageGroup === contestAgeGroup || cat.ageGroups?.includes(contestAgeGroup!)
    );

    // Add only solo styles from with live type
    const levels: Level[] = [];

    filteredByAgeGroup.forEach((cat, index) => {
      cat.levels.forEach((level) => {
        if (level !== 'openLevel') {
          const isLevel = levels.includes(level);
          if (!isLevel) levels.push(level);
        }
      });

      cat.categories.forEach((style) => {
        style.isSolo &&
          style.types.includes('live') &&
          res.push({
            ...style,
            selected: false,
            id: style.translations.en.categoryTitle,
            price: 0,
          });
      });
    });

    setValue('soloContest', res);
    setValue('contestLevels', levels);
    setValue('contestLevel', levels[0]);
  }, [contestAgeGroup, setValue]);

  // Summarize step totals
  useEffect(() => {
    setTotal(wstotal + contestSoloTotal);
  }, [wstotal, contestSoloTotal]);

  // Handle form submit
  const onSubmit = (data: any) => console.log(data);

  // Handle steps navigation
  const hanleSteps = useCallback(
    (direction: 'next' | 'prev') => {
      const isStep = steps.find((step) => step.id === currentStep);
      if (isStep && isStep[direction]) setCurrentStep(isStep[direction]!);
    },
    [currentStep]
  );

  const isFullPass: boolean = watch('isFullPass');
  const fullPassDiscount: FullPassDiscount = watch('fullPassDiscount');
  const isWorkshops: WorkshopsField = watch('workshops');
  const selectedWorkshops = isWorkshops.filter((ws) => ws.selected);
  const contestLevel: Level = watch('contestLevel');

  const currentPricePeriod = useMemo(() => {
    const today = new Date();
    if (ispromoPeriod) return workshopsPrice.find((i) => i.isPromo);
    else return workshopsPrice.find((i) => i.startDate! <= today && today <= i.endDate!);
  }, []);

  const fullPassPrice = useMemo(() => {
    // Kids discount
    const basePrice =
      ageGroup === 'baby' || ageGroup === 'kids'
        ? currentPricePeriod && currentPricePeriod.price.live.fullPassPrice * kidsDiscount
        : currentPricePeriod?.price.live.fullPassPrice;

    // additional discounts (certificates, etc.)
    if (fullPassDiscount === '30%' && basePrice) return basePrice * 0.3;
    if (fullPassDiscount === '50%' && basePrice) return basePrice * 0.5;
    if (fullPassDiscount === 'free' && basePrice) return 0;
    else return basePrice;
  }, [ageGroup, currentPricePeriod, fullPassDiscount]);

  const fullPassDiscountList: FullPassDiscount[] =
    // Kids and baby can't have less than 100% discount
    ageGroup === 'baby' || ageGroup === 'kids'
      ? ['none', 'free']
      : ['none', 'group', '30%', '50%', 'free'];

  const isEligible = useMemo(() => {
    if (ageGroup === 'baby' || ageGroup === 'kids') {
      if (isFullPass || selectedWorkshops.length >= minWsKids) return true;
      else return false;
    } else {
      if (isFullPass || selectedWorkshops.length >= minWsAdults) return true;
      else return false;
    }
  }, [ageGroup, isFullPass, selectedWorkshops]);

  const soloPassPrice = useMemo((): number => {
    const priceKids = contestSoloPrice.soloPassKids.price.live;
    const priceRisingStar = contestSoloPrice.soloPassRisingStar.price.live;
    const priceProfessionals = contestSoloPrice.soloPassProfessionals.price.live;

    // Price for Kids and Baby
    if (ageGroup === 'baby' || ageGroup === 'kids')
      return isFullPass ? priceKids.priceDiscounted : priceKids.priceNormal;
    // Price for everyone else
    else {
      if (contestLevel === 'professionals')
        return isFullPass ? priceProfessionals.priceDiscounted : priceProfessionals.priceNormal;
      else return isFullPass ? priceRisingStar.priceDiscounted : priceRisingStar.priceNormal;
    }
  }, [ageGroup, contestLevel, isFullPass]);

  return (
    <FormProvider {...methods}>
      <p className={textStyles.p}>
        {t('form.common.total')}: {total}€
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Collapse in={currentStep === 'personal'} unmountOnExit>
          <PersonalData onStepSubmit={hanleSteps} />
        </Collapse>

        <Collapse in={currentStep === 'workshops'} unmountOnExit>
          <Workshops
            onStepSubmit={hanleSteps}
            currentPricePeriod={currentPricePeriod}
            fullPassPrice={fullPassPrice}
            fullPassDiscountList={fullPassDiscountList}
            setStepTotal={setWsTotal}
          />
        </Collapse>

        <Collapse in={currentStep === 'contestSolo'} unmountOnExit>
          <ContestSolo
            onStepSubmit={hanleSteps}
            setStepTotal={setContestSoloTotal}
            isEligible={isEligible}
            soloPassPrice={soloPassPrice}
          />
        </Collapse>

        <Collapse in={currentStep === 'contestGroups'} unmountOnExit>
          <ContestGroups onStepSubmit={hanleSteps} setStepTotal={setContestGroupsTotal} />
        </Collapse>

        {/* <Button type='submit' variant='contained' size='large' disableElevation fullWidth>
          Submit form
        </Button> */}
      </form>
    </FormProvider>
  );
};
