import useTranslation from 'next-translate/useTranslation';
import { useFieldArray, useFormContext } from 'react-hook-form';
import textStyles from '@/styles/Text.module.css';
import { FormControlLabel } from '@mui/material';
import { PricePeriod, SupportedLangs } from '@/src/types';
import { InputCheckbox } from '@/src/ui-kit/input/InputCheckbox';
import { FormFields } from './types';
import clsx from 'clsx';
import React, { useCallback } from 'react';

interface WorkshopsSingleProps {
  currentPricePeriod: PricePeriod | undefined;
}

export const WorkshopsList: React.FC<WorkshopsSingleProps> = ({ currentPricePeriod }) => {
  const { t, lang } = useTranslation('registration');

  const methods = useFormContext<FormFields>();
  const { setValue, control, watch } = methods;

  const { fields } = useFieldArray({
    control,
    name: 'workshops',
    keyName: 'id',
  });

  const currentLang = lang as SupportedLangs;

  const watchWorkshops = watch('workshops');
  const version = watch('version');

  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchWorkshops[index],
    };
  });

  const handleChange = useCallback(
    (wsId: number, event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      const wsIndex = watchWorkshops.findIndex((ws) => ws.id === wsId);
      setValue(`workshops.${wsIndex}.selected`, checked, { shouldTouch: true });
    },
    [setValue, watchWorkshops]
  );

  // Sort workshops by day
  const days = controlledFields.map((ws) => ws.day);
  const uniqueDays = Array.from(new Set(days));

  const workshops = uniqueDays.map((day) => {
    const workshopsInputs = controlledFields.map((ws) => {
      const price = currentPricePeriod?.price[version][`${ws.teachersPriceGroup!}Price`];
      if (ws.day === day)
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
                <span className={textStyles.accent}>{price}€</span>
              </p>
            }
          />
        );
    });

    return (
      <React.Fragment key={day}>
        <h3 className={clsx(textStyles.h2, textStyles.accent)} key={day}>
          {day}
        </h3>
        {workshopsInputs}
      </React.Fragment>
    );
  });

  return <>{workshops}</>;
};
