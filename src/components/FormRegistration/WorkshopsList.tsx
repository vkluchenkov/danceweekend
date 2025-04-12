import useTranslation from 'next-translate/useTranslation';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormControlLabel } from '@mui/material';
import clsx from 'clsx';
import React, { useCallback } from 'react';

import { SupportedLangs } from '@/src/types';
import { InputCheckbox } from '@/src/ui-kit/input/InputCheckbox';
import { FormFields } from './types';
import textStyles from '@/styles/Text.module.css';
import { currencySymbol } from '@/src/ulis/constants';

interface WorkshopsSingleProps {
  // currentPricePeriod: PricePeriod | undefined;
}

export const WorkshopsList: React.FC<WorkshopsSingleProps> = () => {
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
  const wsPrices = watch('wsPrices');

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
      const price = wsPrices?.[ws.teachersPriceGroup].price;
      if (ws.day === day)
        return (
          <FormControlLabel
            style={{ width: '100%' }}
            key={ws.id}
            control={
              <InputCheckbox checked={ws.selected} onChange={handleChange.bind(null, ws.id)} />
            }
            label={
              <p className={textStyles.p}>
                {ws.start}-{ws.end}
                <br />
                {ws.translations[currentLang].title}: {ws.translations[currentLang].description}
                <br />
                <span className={textStyles.accent}>
                  {price}
                  {currencySymbol}
                </span>
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
