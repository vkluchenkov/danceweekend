import useTranslation from 'next-translate/useTranslation';
import { useFormContext } from 'react-hook-form';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import { useState } from 'react';
import { Button, FormControlLabel } from '@mui/material';
import { ContestSoloStepProps } from './types';
import { SupportedLangs } from '@/src/types';
import { InputCheckbox } from '@/src/ui-kit/input/InputCheckbox';

export const ContestSolo: React.FC<ContestSoloStepProps> = ({
  onStepSubmit,
  setStepTotal,
  currentPricePeriod,
  isEligible,
}) => {
  const { t, lang } = useTranslation('registration');
  const currentLang = lang as SupportedLangs;

  const [isCompetition, setIsCompetition] = useState(false);

  const methods = useFormContext();
  const {
    handleSubmit,
    setValue,
    control,
    watch,
    trigger,
    formState: { errors },
  } = methods;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
    setIsCompetition(checked);

  return (
    <div className={styles.form}>
      <h2 className={textStyles.h2}>{t('form.contest.title')}</h2>
      {!isEligible && <p>Ooops...</p>}
      {isEligible && (
        <FormControlLabel
          control={<InputCheckbox checked={isCompetition} onChange={handleChange} />}
          label={<p className={textStyles.p}>{t('form.contest.checkboxLabel')}</p>}
        />
      )}
      <div className={styles.naviWrapper}>
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
        <Button
          type='button'
          variant='outlined'
          size='large'
          disableElevation
          fullWidth
          onClick={async () => {
            const isValid = await trigger();
            if (isValid) onStepSubmit('next');
          }}
        >
          {t('form.common.next')}
        </Button>
      </div>
    </div>
  );
};
