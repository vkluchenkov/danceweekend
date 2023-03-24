import React, { useCallback, useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useFieldArray, useFormContext } from 'react-hook-form';
import textStyles from '@/styles/Text.module.css';
import { FormControlLabel } from '@mui/material';
import { AgeGroup, SupportedLangs } from '@/src/types';
import { InputCheckbox } from '@/src/ui-kit/input/InputCheckbox';
import { SoloContestField } from './types';
import { Level } from '@/src/ulis/contestCategories';
import { contestSoloPrice } from '@/src/ulis/price';

export const ContestSoloList: React.FC = () => {
  const { t, lang } = useTranslation('registration');
  const methods = useFormContext();

  const { setValue, control, watch } = methods;

  const { fields } = useFieldArray({
    control,
    name: 'soloContest',
    keyName: 'id',
  });

  const currentLang = lang as SupportedLangs;

  const soloContest: SoloContestField = watch('soloContest');
  const isFullPass: boolean = watch('isFullPass');
  const isSoloPass: boolean = watch('isSoloPass');
  const contestAgeGroup: AgeGroup = watch('contestAgeGroup');
  const contestLevel: Level = watch('contestLevel');

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
    (isCategorySoloPass: boolean, isQueen: boolean): number => {
      const priceKids = contestSoloPrice.kids.price.live;
      const pricerRisingStar = contestSoloPrice.risingStar.price.live;
      const pricerProfessionals = contestSoloPrice.professionals.price.live;

      // If category is included in Solo Pass
      if (isCategorySoloPass && isSoloPass) return 0;
      // If category is not included in Solo Pass
      else {
        // Price for Kids
        if (contestAgeGroup === 'kids' || contestAgeGroup === 'baby')
          return isFullPass ? priceKids.priceDiscounted : priceKids.priceNormal;
        // Price for everyone else
        else {
          // Price for Professionals and Queen
          if (contestLevel === 'professionals' || isQueen)
            return isFullPass
              ? pricerProfessionals.priceDiscounted
              : pricerProfessionals.priceNormal;
          // Price for Rising star / open level
          return isFullPass ? pricerRisingStar.priceDiscounted : pricerRisingStar.priceNormal;
        }
      }
    },
    [contestAgeGroup, isFullPass, isSoloPass, contestLevel]
  );

  // Re-set prices on Solo Pass / age group / and level change
  useEffect(() => {
    controlledFields.forEach((i) => {
      const price = getCategoryPrice(!!i.isSoloPass, !!i.isQueen);
      const index = soloContest.findIndex((cat) => cat.id === i.id);
      setValue(`soloContest.${index}.price`, price, { shouldTouch: true });
    });
  }, [controlledFields, getCategoryPrice, setValue, soloContest]);

  const categories = controlledFields.map((cat) => {
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
              {cat.translations[currentLang].categoryTitle}:
              <span className={textStyles.accent}>
                {' '}
                {cat.price > 0 ? cat.price + '€' : t('form.contest.free')}
              </span>
            </p>
          }
        />
      </div>
    );
  });

  return <div>{categories}</div>;
};
