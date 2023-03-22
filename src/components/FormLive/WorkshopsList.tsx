import useTranslation from 'next-translate/useTranslation';
import { useFieldArray, useFormContext } from 'react-hook-form';
import textStyles from '@/styles/Text.module.css';
import { FormControlLabel } from '@mui/material';
import { PricePeriod, SupportedLangs } from '@/src/types';
import { InputCheckbox } from '@/src/ui-kit/input/InputCheckbox';
import { WorkshopsField } from './types';
import clsx from 'clsx';
import React from 'react';

interface WorkshopsSingleProps {
  currentPricePeriod: PricePeriod | undefined;
}

export const WorkshopsList: React.FC<WorkshopsSingleProps> = ({ currentPricePeriod }) => {
  const { t, lang } = useTranslation('registration');
  const methods = useFormContext();

  const { setValue, control, watch } = methods;

  const { fields } = useFieldArray({
    control,
    name: 'workshops',
    keyName: 'id',
  });

  const currentLang = lang as SupportedLangs;

  const watchWorkshops: WorkshopsField = watch('workshops');

  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchWorkshops[index],
    };
  });

  const handleChange = (
    wsId: number,
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const wsIndex = watchWorkshops.findIndex((ws) => ws.id === wsId);
    setValue(`workshops.${wsIndex}.selected`, checked, { shouldTouch: true });
  };

  // Sort workshops by day
  const days = controlledFields.map((ws) => ws.day);
  const uniqueDays = Array.from(new Set(days));

  const workshops = uniqueDays.map((day) => {
    const workshopsInputs = controlledFields.map((ws) => {
      const price = currentPricePeriod?.price.live[`${ws.teachersPriceGroup!}Price`];
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
                {price}€
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
