import styles from '@/styles/Registration.module.css';
import { Button } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { useFormContext } from 'react-hook-form';
import { FormFields, Step } from './types';
import { motion, AnimatePresence } from 'framer-motion';

interface StepsNavigationProps {
  onStepSubmit: (direction: 'next' | 'prev') => void;
  currentStep: Step | undefined;
  onFormSubmit: () => void;
  isNextDisabled: boolean;
}

const motionVariants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

export const StepsNavigation: React.FC<StepsNavigationProps> = ({
  onStepSubmit,
  onFormSubmit,
  currentStep,
  isNextDisabled,
}) => {
  const { t } = useTranslation('registration');

  const methods = useFormContext<FormFields>();
  const { trigger } = methods;

  const nextBtn = (
    <Button
      type='button'
      variant='outlined'
      size='large'
      disableElevation
      fullWidth
      disabled={isNextDisabled}
      onClick={async () => {
        const isValid = await trigger(undefined, { shouldFocus: true });
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

  return (
    <motion.div
      className={styles.naviWrapper}
      initial='hidden'
      animate='enter'
      exit='exit'
      variants={motionVariants}
      transition={{ type: 'linear', duration: 0.3 }}
    >
      {render()}
    </motion.div>
  );
};
