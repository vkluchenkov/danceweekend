import React, { useMemo } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useFormContext } from 'react-hook-form';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import { useEffect, useState } from 'react';
import { Button, Collapse } from '@mui/material';
import { WorldShowStepProps, FormFields } from './types';
import { worldShowPrice } from '@/src/ulis/price';
import { FormInputCheckbox, FormInputField } from '@/src/ui-kit/input';

export const WorldShow: React.FC<WorldShowStepProps> = ({ setStepTotal, isEligible }) => {
  const { t } = useTranslation('registration');

  const methods = useFormContext<FormFields>();
  const {
    control,
    watch,
    trigger,
    setValue,
    clearErrors,
    formState: { errors },
  } = methods;

  const isFullPass = watch('isFullPass');
  const isWorldShowSolo = watch('isWorldShowSolo');
  const isWorldShowGroup = watch('isWorldShowGroup');
  const worldShowGroup = watch('worldShowGroup');

  const soloPrice = useMemo(() => {
    return isFullPass ? worldShowPrice.soloPriceDicounted : worldShowPrice.soloPriceNormal;
  }, [isFullPass]);

  // Calculate group price
  useEffect(() => {
    if (worldShowGroup?.qty) {
      const price = worldShowGroup.qty * worldShowPrice.groups;
      setValue('worldShowGroup.price', price);
    }
  }, [setValue, worldShowGroup?.qty]);

  // Calculate step total
  useEffect(() => {
    const solo = isWorldShowSolo ? soloPrice : 0;
    const group = worldShowGroup?.price ? worldShowGroup.price : 0;
    setStepTotal(solo + group);
  }, [soloPrice, isWorldShowSolo, worldShowGroup?.price, setStepTotal]);

  // Set/delete default group values on checkbox change
  useEffect(() => {
    if (isWorldShowGroup && !worldShowGroup)
      setValue('worldShowGroup', {
        qty: 2,
        name: '',
        price: 0,
      });

    if (!isWorldShowGroup && worldShowGroup) setValue('worldShowGroup', null);
  }, [isWorldShowGroup, worldShowGroup, setValue]);

  return (
    <div className={styles.form}>
      <h2 className={textStyles.h2}>{t('form.worldShow.title')}</h2>
      <p className={textStyles.p}>{t('form.worldShow.description')}</p>
      {!isEligible && <p>{t('form.worldShow.oops')}</p>}

      {isEligible && (
        <>
          <FormInputCheckbox
            control={control}
            name='isWorldShowSolo'
            label={
              <p className={textStyles.p}>
                {t('form.worldShow.solo')}: <span className={textStyles.accent}>{soloPrice}€</span>
              </p>
            }
          />

          <FormInputCheckbox
            name='isWorldShowGroup'
            control={control}
            label={
              <p className={textStyles.p}>
                {t('form.worldShow.group')}:{' '}
                <span className={textStyles.accent}>
                  {worldShowPrice.groups}€ / {t('form.worldShow.perPerson')}
                </span>
              </p>
            }
          />

          <Collapse in={isWorldShowGroup} unmountOnExit>
            <div className={styles.form}>
              <FormInputField
                control={control}
                type='tel'
                label={t('form.contest.groups.qty')}
                name='worldShowGroup.qty'
                rules={{
                  required: t('form.common.required'),
                  min: {
                    value: 2,
                    message: t('form.worldShow.qtyError'),
                  },
                }}
                error={!!errors?.worldShowGroup?.qty}
                helperText={errors?.worldShowGroup?.qty?.message as string | undefined}
              />

              <FormInputField
                control={control}
                label={t('form.contest.groups.name')}
                name='worldShowGroup.name'
                rules={{
                  required: t('form.common.required'),
                }}
                error={!!errors?.worldShowGroup?.name}
                helperText={errors?.worldShowGroup?.name?.message as string | undefined}
              />

              <p className={textStyles.p}>
                {t('form.contest.groups.price')}:{' '}
                <span className={textStyles.accent}>{worldShowGroup?.price}€</span>
              </p>
            </div>
          </Collapse>
        </>
      )}
    </div>
  );
};
