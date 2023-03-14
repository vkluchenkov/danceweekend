import { FormProvider, useForm } from 'react-hook-form';
import { PersonalData } from './PersonalData';
import styles from '@/styles/Registration.module.css';
import { useState } from 'react';
import { Button } from '@mui/material';

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

export const FormLive: React.FC = () => {
  const [step, setStep] = useState(1);

  const onSubmit = (data: any) => console.log(data);

  const nextStep = () => setStep((c) => c + 1);
  const prevStep = () => setStep((c) => c - 1);

  const methods = useForm<FormFields>();

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {step === 1 && <PersonalData onNext={nextStep} onPrev={prevStep} currentStep={step} />}
        <Button type='submit' variant='contained' size='large' disableElevation fullWidth>
          Submit form
        </Button>
      </form>
    </FormProvider>
  );
};
