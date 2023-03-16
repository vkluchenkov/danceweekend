import { FormProvider, useForm } from 'react-hook-form';
import { PersonalData } from './PersonalData';
import styles from '@/styles/Registration.module.css';
import { useCallback, useEffect, useState } from 'react';
import { Workshops } from './Workshops';
import { schedule, Workshop } from '@/src/ulis/schedule';
import useTranslation from 'next-translate/useTranslation';
import { SupportedLangs } from '@/src/types';
import { FormFields, Step, StepId, WorkshopsField } from './types';

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
};

export const FormLive: React.FC = () => {
  const { t, lang } = useTranslation();
  const currentLang = lang as SupportedLangs;
  const [currentStep, setCurrentStep] = useState<StepId>('personal');

  const hanleSteps = useCallback(
    (direction: 'next' | 'prev') => {
      const isStep = steps.find((step) => step.id === currentStep);
      if (isStep && isStep[direction]) setCurrentStep(isStep[direction]!);
    },
    [currentStep]
  );

  const methods = useForm<FormFields>({
    defaultValues: defaultValues,
  });
  const { handleSubmit, getValues, setValue } = methods;

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

  const onSubmit = (data: any) => console.log(data);

  const getCurrentComponent = () => {
    if (currentStep === 'personal') return <PersonalData onStepSubmit={hanleSteps} />;
    if (currentStep === 'workshops') return <Workshops onStepSubmit={hanleSteps} />;
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {getCurrentComponent()}
        {/* <Button type='submit' variant='contained' size='large' disableElevation fullWidth>
          Submit form
        </Button> */}
      </form>
    </FormProvider>
  );
};
