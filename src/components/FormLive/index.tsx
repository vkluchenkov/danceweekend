import { FormProvider, useForm } from 'react-hook-form';
import { PersonalData } from './PersonalData';
import styles from '@/styles/Registration.module.css';

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
  const onSubmit = (data: any) => console.log(data);

  const methods = useForm<FormFields>();

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <PersonalData />
      </form>
    </FormProvider>
  );
};
