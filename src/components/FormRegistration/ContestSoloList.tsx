import React, { useCallback, useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormControlLabel } from '@mui/material';
import clsx from 'clsx';
import Trans from 'next-translate/Trans';
import Link from 'next/link';

import textStyles from '@/styles/Text.module.css';
import { SupportedLangs } from '@/src/types';
import { InputCheckbox } from '@/src/ui-kit/input/InputCheckbox';
import { FormFields } from './types';

export const ContestSoloList: React.FC = () => {
  const { t, lang } = useTranslation('registration');
  const currentLang = lang as SupportedLangs;

  const absoluteWinnerText = (
    <Trans
      i18nKey='registration:form.contest.absoluteWinnerText'
      components={[
        <Link href='/competition/judging' target='_blank' className={textStyles.accent} key={1} />,
      ]}
    />
  );

  const methods = useFormContext<FormFields>();

  const { setValue, control, watch } = methods;

  const { fields } = useFieldArray({
    control,
    name: 'soloContest',
    keyName: 'id',
  });

  const settings = watch('settings');
  const soloContest = watch('soloContest');
  const isSoloPass = watch('isSoloPass');
  const contestAgeGroup = watch('contestAgeGroup');
  const contestLevel = watch('contestLevel');

  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...soloContest[index],
    };
  });

  const handleChange = (
    catId: string,
    price: number,
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const index = soloContest.findIndex((cat) => cat.id === catId);
    setValue(`soloContest.${index}.selected`, checked, { shouldTouch: true });
    setValue(`soloContest.${index}.price`, price, { shouldTouch: true });
  };

  const getCategoryPrice = useCallback(
    (isImprovisation: boolean): number => {
      const contestSoloPrice = settings?.price.contest?.contestsoloprice!;

      const priceKids = contestSoloPrice.kids;
      const priceRisingStar = contestSoloPrice.risingstar;
      const priceProfessionals = contestSoloPrice.professionals;

      // If category is included in Solo Pass
      if (!isImprovisation && isSoloPass) return 0;
      // If category is not included in Solo Pass
      if (contestAgeGroup === 'kids' || contestAgeGroup === 'baby') return priceKids;
      if (contestLevel === 'professionals') return priceProfessionals;
      return priceRisingStar;
    },
    [contestAgeGroup, isSoloPass, contestLevel, settings]
  );

  // Re-set prices when fields or Solo Pass change
  useEffect(() => {
    controlledFields.forEach((i) => {
      const price = getCategoryPrice(!!i.isImprovisation);
      const index = soloContest.findIndex((cat) => cat.id === i.id);
      setValue(`soloContest.${index}.price`, price, { shouldTouch: true });
    });

    // eslint-disable-next-line
  }, [soloContest, isSoloPass, contestLevel]);

  const absoluteWinnerCategories = controlledFields.map((cat) => {
    if (cat.isForWin)
      return (
        <div key={cat.id}>
          <FormControlLabel
            control={
              <InputCheckbox
                checked={cat.selected}
                onChange={handleChange.bind(null, cat.id, cat.price)}
              />
            }
            label={
              <p className={textStyles.p}>
                {cat.translations[currentLang].categoryTitle}
                {cat.price > 0 && (
                  <>
                    : <span className={textStyles.accent}>{cat.price}€</span>
                  </>
                )}
              </p>
            }
          />
        </div>
      );
  });

  const nonAbsoluteWinnerCategories = controlledFields.map((cat) => {
    if (!cat.isForWin)
      return (
        <div key={cat.id}>
          <FormControlLabel
            control={
              <InputCheckbox
                checked={cat.selected}
                onChange={handleChange.bind(null, cat.id, cat.price)}
              />
            }
            label={
              <p className={textStyles.p}>
                {cat.translations[currentLang].categoryTitle}
                {cat.price > 0 && (
                  <>
                    : <span className={textStyles.accent}>{cat.price}€</span>
                  </>
                )}
              </p>
            }
          />
        </div>
      );
  });

  const allCategories = controlledFields.map((cat) => {
    return (
      <div key={cat.id}>
        <FormControlLabel
          control={
            <InputCheckbox
              checked={cat.selected}
              onChange={handleChange.bind(null, cat.id, cat.price)}
            />
          }
          label={
            <p className={textStyles.p}>
              {cat.translations[currentLang].categoryTitle}
              {cat.price > 0 && (
                <>
                  : <span className={textStyles.accent}>{cat.price}€</span>
                </>
              )}
            </p>
          }
        />
      </div>
    );
  });

  if (contestLevel === 'professionals' && contestAgeGroup === 'adults')
    return (
      <>
        <p className={clsx(textStyles.p)} style={{ padding: '10px 0' }}>
          {absoluteWinnerText}
        </p>
        <h4 className={clsx(textStyles.h4, textStyles.accent)}>
          {t('form.contest.absoluteWinnerTitle')}:
        </h4>
        <div>{absoluteWinnerCategories}</div>
        <h4 className={clsx(textStyles.h4, textStyles.accent)}>{t('form.contest.restTitle')}:</h4>
        <div>{nonAbsoluteWinnerCategories}</div>
      </>
    );

  return <div translate='no'>{allCategories}</div>;
};
