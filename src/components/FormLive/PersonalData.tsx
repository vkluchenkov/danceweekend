import { FormInputField } from '@/src/ui-kit/input';
import useTranslation from 'next-translate/useTranslation';
import { useFormContext } from 'react-hook-form';
import textStyles from '@/styles/Text.module.css';
import { useEffect } from 'react';
import { Button } from '@mui/material';

interface StepProps {
  onStepSubmit: (direction: 'next' | 'prev') => void;
}

export const PersonalData: React.FC<StepProps> = ({ onStepSubmit }) => {
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
      <h2 className={textStyles.h2}>{t('form.personal.title')}</h2>

      <FormInputField
        autoFocus
        name='name'
        label={t('form.personal.name')}
        control={control}
        rules={{
          required: t('form.common.required'),
        }}
        error={!!errors.name}
        helperText={errors?.name?.message as string | undefined}
      />

      <FormInputField
        name='surname'
        label={t('form.personal.surname')}
        control={control}
        rules={{
          required: t('form.common.required'),
        }}
        error={!!errors.surname}
        helperText={errors?.surname?.message as string | undefined}
      />

      <FormInputField
        name='stageName'
        label={t('form.personal.stageName')}
        control={control}
        error={!!errors.stageName}
        helperText={errors?.stageName?.message as string | undefined}
      />

      <FormInputField
        name='age'
        type='number'
        label={t('form.personal.age')}
        rules={{
          required: t('form.common.required'),
        }}
        control={control}
        error={!!errors.age}
        helperText={errors?.age?.message as string | undefined}
      />

      <h2 className={textStyles.h2}>{t('form.personal.contacts')}</h2>

      <FormInputField
        name='email'
        label='Email'
        type='email'
        placeholder='user@example.com'
        control={control}
        rules={{
          required: t('form.common.required'),
        }}
        error={!!errors.email}
        helperText={errors?.email?.message as string | undefined}
      />

      <FormInputField
        name='social'
        placeholder='instagram, facebook @danceweekendwarsaw'
        label={t('form.personal.social')}
        control={control}
        rules={{
          required: t('form.common.required'),
        }}
        error={!!errors.social}
        helperText={errors?.social?.message as string | undefined}
      />

      <FormInputField
        name='country'
        label={t('form.personal.country')}
        control={control}
        rules={{
          required: t('form.common.required'),
        }}
        error={!!errors.country}
        helperText={errors?.country?.message as string | undefined}
      />

      <FormInputField
        name='city'
        label={t('form.personal.city')}
        control={control}
        rules={{
          required: t('form.common.required'),
        }}
        error={!!errors.city}
        helperText={errors?.city?.message as string | undefined}
      />

      <FormInputField
        name='tel'
        type='tel'
        placeholder='+48 123456789'
        label={t('form.personal.tel')}
        control={control}
        rules={{
          required: t('form.common.required'),
        }}
        error={!!errors.tel}
        helperText={errors?.tel?.message as string | undefined}
      />

      <Button
        type='button'
        variant='contained'
        size='large'
        disableElevation
        fullWidth
        onClick={handleSubmit(() => onStepSubmit('next'))}
      >
        {t('form.common.next')}
      </Button>
    </>
  );
};
