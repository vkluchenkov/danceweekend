import { FormProvider, useForm } from 'react-hook-form';
import { PersonalData } from './PersonalData';
import styles from '@/styles/Registration.module.css';
import textStyles from '@/styles/Text.module.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Workshops } from './Workshops';
import { schedule, Workshop } from '@/src/ulis/schedule';
import useTranslation from 'next-translate/useTranslation';
import { SupportedLangs } from '@/src/types';
import { FormFields, FullPassDiscount, Step, StepId, WorkshopsField } from './types';
import { ispromoPeriod, kidsDiscount, kidsMaxAge, workshopsPrice } from '@/src/ulis/price';
import { Collapse, Fade } from '@mui/material';
import { getAgeGroup } from '@/src/ulis/getAgeGroup';

const steps: Step[] = [
  {
    id: 'personal',
    prev: null,
    next: 'workshops',
  },
  {
    id: 'workshops',
    prev: 'personal',
    next: 'constestSolo',
  },
  {
    id: 'constestSolo',
    prev: 'personal',
    next: null,
  },
];

const defaultValues: Partial<FormFields> = {
  isFullPass: false,
  isSoloPass: false,
  workshops: [],
  fullPassDiscount: 'none',
};

export const FormLive: React.FC = () => {
  const { t, lang } = useTranslation('registration');
  const currentLang = lang as SupportedLangs;

  const methods = useForm<FormFields>({
    defaultValues: defaultValues,
  });
  const { handleSubmit, getValues, setValue, watch } = methods;

  const [currentStep, setCurrentStep] = useState<StepId>('personal');
  const [total, setTotal] = useState(0);
  const [wstotal, setWsTotal] = useState(0);

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

  // Summarize step totals
  useEffect(() => {
    setTotal(wstotal);
  }, [wstotal]);

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

  const age: number | undefined = watch('age');
  const fullPassDiscount: FullPassDiscount = watch('fullPassDiscount');

  const ageGroup = useMemo(() => {
    return age ? getAgeGroup(age) : null;
  }, [age]);

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
            setWsTotal={setWsTotal}
          />
        </Collapse>

        {/* <Button type='submit' variant='contained' size='large' disableElevation fullWidth>
          Submit form
        </Button> */}
      </form>
    </FormProvider>
  );
};
