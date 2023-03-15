import { FormProvider, useForm } from 'react-hook-form';
import { PersonalData } from './PersonalData';
import styles from '@/styles/Registration.module.css';
import { useCallback, useState } from 'react';
import { Button } from '@mui/material';
import next from 'next';
import { Workshops } from './Workshops';

type StepId = 'personal' | 'workshops' | 'constestSolo' | 'contestGroups' | 'worldShow' | 'summary';

interface Step {
  id: StepId;
  // component: React.ReactNode;
  prev: StepId | null;
  next: StepId | null;
  showOn?: boolean;
}

interface FormFields {
  name: string;
  surname: string;
  stageName: string;
  age: number;
  email: string;
  social: string;
  country: string;
  city: string;
  tel: string;
}

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

export const FormLive: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<StepId>('personal');

  const hanleSteps = useCallback(
    (direction: 'next' | 'prev') => {
      const isStep = steps.find((step) => step.id === currentStep);
      if (isStep && isStep[direction]) setCurrentStep(isStep[direction]!);
    },
    [currentStep]
  );

  const methods = useForm<FormFields>();
  const { handleSubmit, getValues } = methods;

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
