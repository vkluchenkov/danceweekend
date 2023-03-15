import { FormInputField } from '@/src/ui-kit/input';
import useTranslation from 'next-translate/useTranslation';
import { useFormContext } from 'react-hook-form';
import textStyles from '@/styles/Text.module.css';
import { useEffect } from 'react';
import { Button } from '@mui/material';

interface StepProps {
  onStepSubmit: (direction: 'next' | 'prev') => void;
}

export const Workshops: React.FC<StepProps> = ({ onStepSubmit }) => {
  const { t } = useTranslation('registration');
  const methods = useFormContext();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setError,
  } = methods;

  // useEffect(() => {
  //   const subscription = watch((value, { name, type }) => console.log(value));
  //   return () => subscription.unsubscribe();
  // }, [watch]);

  return (
    <>
      {/* <h2 className={textStyles.h2}>{t('form.personal.title')}</h2> */}
      <h2 className={textStyles.h2}>Workshops</h2>

      {/* <FormInputField
        autoFocus
        name='name'
        label={t('form.personal.name')}
        control={control}
        rules={{
          required: t('form.common.required'),
        }}
        error={!!errors.name}
        helperText={errors?.name?.message as string | undefined}
      /> */}

      <Button
        type='button'
        variant='text'
        size='large'
        disableElevation
        fullWidth
        onClick={handleSubmit(() => onStepSubmit('prev'))}
      >
        ← Prev
      </Button>
      <Button
        type='button'
        variant='contained'
        size='large'
        disableElevation
        fullWidth
        onClick={handleSubmit(() => onStepSubmit('next'))}
      >
        Next →
      </Button>
    </>
  );
};
