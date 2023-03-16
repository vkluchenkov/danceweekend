import useTranslation from 'next-translate/useTranslation';
import { useFormContext } from 'react-hook-form';
import textStyles from '@/styles/Text.module.css';
import { useMemo } from 'react';
import { Button } from '@mui/material';
import { SupportedLangs } from '@/src/types';
import { ispromoPeriod, workshopsPrice } from '@/src/ulis/price';
import { StepProps } from './types';
import { WorkshopsList } from './WorkshopsList';

export const Workshops: React.FC<StepProps> = ({ onStepSubmit }) => {
  const { t, lang } = useTranslation('registration');
  const methods = useFormContext();

  const { handleSubmit, setValue, control, watch } = methods;

  const currentLang = lang as SupportedLangs;

  const getCurrentPricePeriod = useMemo(() => {
    const today = new Date();
    if (ispromoPeriod) return workshopsPrice.find((i) => i.isPromo);
    else {
      return workshopsPrice.find((i) => i.startDate! <= today && today <= i.endDate!);
    }
  }, []);

  return (
    <>
      <h2 className={textStyles.h2}>Workshops</h2>

      <WorkshopsList currentPricePeriod={getCurrentPricePeriod} />

      <Button
        type='button'
        variant='text'
        size='large'
        disableElevation
        fullWidth
        onClick={handleSubmit(() => onStepSubmit('prev'))}
      >
        {t('form.common.prev')}
      </Button>
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
