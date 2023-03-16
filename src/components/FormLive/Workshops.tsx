import { FormInputField } from '@/src/ui-kit/input';
import useTranslation from 'next-translate/useTranslation';
import { useFieldArray, useFormContext } from 'react-hook-form';
import textStyles from '@/styles/Text.module.css';
import { useEffect, useMemo } from 'react';
import { Button, FormControlLabel } from '@mui/material';
import { schedule, Workshop } from '@/src/ulis/schedule';
import { SupportedLangs } from '@/src/types';
import { ispromoPeriod, workshopsPrice } from '@/src/ulis/price';
import { InputCheckbox } from '@/src/ui-kit/input/InputCheckbox';
import { WorkshopsField } from './types';
import clsx from 'clsx';
import { text } from 'stream/consumers';

interface StepProps {
  onStepSubmit: (direction: 'next' | 'prev') => void;
}

export const Workshops: React.FC<StepProps> = ({ onStepSubmit }) => {
  const { t, lang } = useTranslation('registration');
  const methods = useFormContext();

  const {
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
    setError,
  } = methods;

  const { fields } = useFieldArray({
    control,
    name: 'workshops',
  });

  const currentLang = lang as SupportedLangs;

  const watchWorkshops: WorkshopsField = watch('workshops');

  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchWorkshops[index],
    };
  });

  const getCurrentPricePeriod = useMemo(() => {
    const today = new Date();
    if (ispromoPeriod) return workshopsPrice.find((i) => i.isPromo);
    else {
      return workshopsPrice.find((i) => i.startDate! <= today && today <= i.endDate!);
    }
  }, []);

  const handleChange = (
    wsId: number,
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const wsIndex = watchWorkshops.findIndex((ws) => ws.id === wsId);
    setValue(`workshops.${wsIndex}.selected`, checked, { shouldTouch: true });
  };

  const days = controlledFields.map((ws) => ws.day);
  const uniqueDays = Array.from(new Set(days));

  const workshops = uniqueDays.map((day) => {
    const workshopsInputs = controlledFields.map((ws) => {
      const price = getCurrentPricePeriod?.price.live[`${ws.teachersPriceGroup!}Price`];
      if (ws.day === day) {
        return (
          <FormControlLabel
            key={ws.id}
            control={
              <InputCheckbox checked={ws.selected} onChange={handleChange.bind(null, ws.id)} />
            }
            label={
              <p className={textStyles.p}>
                {ws.start}—{ws.end}
                <br />
                {ws.translations[currentLang].title}: {ws.translations[currentLang].description}
                <br />
                {price}€
              </p>
            }
          />
        );
      }
    });

    return (
      <>
        <h3 className={clsx(textStyles.h2, textStyles.accent)} key={day}>
          {day}
        </h3>
        {workshopsInputs}
      </>
    );
  });

  return (
    <>
      <h2 className={textStyles.h2}>Workshops</h2>

      {workshops}

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
