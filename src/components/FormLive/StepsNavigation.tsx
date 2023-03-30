import styles from '@/styles/Registration.module.css';
import { Button } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { useFormContext } from 'react-hook-form';
import { FormFields, Step } from './types';

interface StepsNavigationProps {
  onStepSubmit: (direction: 'next' | 'prev') => void;
  currentStep: Step | undefined;
  onFormSubmit: () => void;
}

export const StepsNavigation: React.FC<StepsNavigationProps> = ({
  onStepSubmit,
  onFormSubmit,
  currentStep,
}) => {
  const { t } = useTranslation('registration');

  const methods = useFormContext<FormFields>();
  const { trigger, watch } = methods;

  const isNextDisabled = watch('isNextDisabled');
  const isPrevDisabled = watch('isPrevDisabled');

  const nextBtn = (
    <Button
      type='button'
      variant='outlined'
      size='large'
      disableElevation
      fullWidth
      disabled={isNextDisabled}
      onClick={async () => {
        const isValid = await trigger();
        if (isValid) onStepSubmit('next');
      }}
    >
      {t('form.common.next')}
    </Button>
  );

  const prevBtn = (
    <Button
      type='button'
      variant='outlined'
      size='large'
      disableElevation
      fullWidth
      disabled={isPrevDisabled}
      onClick={() => onStepSubmit('prev')}
    >
      {t('form.common.prev')}
    </Button>
  );

  const submitBtn = (
    <Button
      type='button'
      variant='outlined'
      size='large'
      disableElevation
      fullWidth
      disabled={isNextDisabled}
      onClick={onFormSubmit}
    >
      {t('form.common.submit')}
    </Button>
  );

  const render = () => {
    if (!currentStep?.prev)
      return (
        <>
          <div></div> {nextBtn}
        </>
      );
    if (!currentStep?.next)
      return (
        <>
          {prevBtn} {submitBtn}
        </>
      );
    return (
      <>
        {prevBtn} {nextBtn}
      </>
    );
  };

  return <div className={styles.naviWrapper}>{render()}</div>;
};
