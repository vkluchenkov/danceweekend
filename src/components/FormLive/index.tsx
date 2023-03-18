import { FormProvider, useForm } from 'react-hook-form';
import { PersonalData } from './PersonalData';
import styles from '@/styles/Registration.module.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Workshops } from './Workshops';
import { schedule, Workshop } from '@/src/ulis/schedule';
import useTranslation from 'next-translate/useTranslation';
import { SupportedLangs } from '@/src/types';
import { FormFields, Step, StepId, WorkshopsField } from './types';
import { ispromoPeriod, kidsDiscount, kidsMaxAge, workshopsPrice } from '@/src/ulis/price';

const steps: Step[] = [
  {
    id: 'personal',
    prev: null,
    next: 'workshops',
  },
  {
    id: 'workshops',
    prev: 'personal',
    next: null,
  },
];

const defaultValues: Partial<FormFields> = {
  isFullPass: false,
  isSoloPass: false,
  workshops: [],
};

export const FormLive: React.FC = () => {
  const { t, lang } = useTranslation();
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

  const age: number = watch('age');

  const currentPricePeriod = useMemo(() => {
    const today = new Date();
    if (ispromoPeriod) return workshopsPrice.find((i) => i.isPromo);
    else return workshopsPrice.find((i) => i.startDate! <= today && today <= i.endDate!);
  }, []);

  const fullPassPrice =
    age <= kidsMaxAge
      ? currentPricePeriod && currentPricePeriod.price.live.fullPassPrice * kidsDiscount
      : currentPricePeriod?.price.live.fullPassPrice;

  const getCurrentComponent = () => {
    if (currentStep === 'personal') return <PersonalData onStepSubmit={hanleSteps} />;
    if (currentStep === 'workshops')
      return (
        <Workshops
          onStepSubmit={hanleSteps}
          currentPricePeriod={currentPricePeriod}
          fullPassPrice={fullPassPrice}
          setWsTotal={setWsTotal}
        />
      );
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {wstotal > 0 && <p>Total: {wstotal}€</p>}
        {getCurrentComponent()}
        {/* <Button type='submit' variant='contained' size='large' disableElevation fullWidth>
          Submit form
        </Button> */}
      </form>
    </FormProvider>
  );
};
