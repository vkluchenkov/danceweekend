import React, { useCallback, useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useFieldArray, useFormContext } from 'react-hook-form';
import textStyles from '@/styles/Text.module.css';
import { FormControlLabel } from '@mui/material';
import { SupportedLangs } from '@/src/types';
import { InputCheckbox } from '@/src/ui-kit/input/InputCheckbox';
import { FormFields } from './types';
import { contestSoloPrice } from '@/src/ulis/price';

export const ContestSoloList: React.FC = () => {
  const { t, lang } = useTranslation('registration');
  const methods = useFormContext<FormFields>();

  const { setValue, control, watch } = methods;

  const { fields } = useFieldArray({
    control,
    name: 'soloContest',
    keyName: 'id',
  });

  const currentLang = lang as SupportedLangs;

  const soloContest = watch('soloContest');
  const isFullPass = watch('isFullPass');
  const isSoloPass = watch('isSoloPass');
  const contestAgeGroup = watch('contestAgeGroup');
  const contestLevel = watch('contestLevel');
  const version = watch('version');

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
      const priceKids = contestSoloPrice.kids.price[version];
      const pricerRisingStar = contestSoloPrice.risingStar.price[version];
      const pricerProfessionals = contestSoloPrice.professionals.price[version];

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
    [contestAgeGroup, isFullPass, isSoloPass, contestLevel, version]
  );

  // Re-set prices when fields or Solo Pass change
  useEffect(() => {
    controlledFields.forEach((i) => {
      const price = getCategoryPrice(!!i.isSoloPass, !!i.isQueen);
      const index = soloContest.findIndex((cat) => cat.id === i.id);
      setValue(`soloContest.${index}.price`, price, { shouldTouch: true });
    });
  }, [soloContest, isSoloPass, contestLevel]);

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

  return <div>{categories}</div>;
};
