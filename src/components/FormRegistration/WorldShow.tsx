import { useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useFormContext } from 'react-hook-form';
import { Collapse } from '@mui/material';

import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import { WorldShowStepProps, FormFields } from './types';
import { FormInputCheckbox, FormInputField } from '@/src/ui-kit/input';

export const WorldShow: React.FC<WorldShowStepProps> = ({ setStepTotal, isEligible }) => {
  const { t } = useTranslation('registration');

  const methods = useFormContext<FormFields>();
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  const isWorldShowSolo = watch('isWorldShowSolo');
  const isWorldShowGroup = watch('isWorldShowGroup');
  const worldShowGroup = watch('worldShowGroup');
  const settings = watch('settings');

  // Calculate group price
  useEffect(() => {
    if (worldShowGroup?.qty) {
      const price = worldShowGroup.qty * settings?.price.worldShow?.groups!;
      setValue('worldShowGroup.price', price);
    }
  }, [setValue, worldShowGroup?.qty, settings]);

  // Calculate step total
  useEffect(() => {
    const solo = isWorldShowSolo ? settings?.price.worldShow?.solo! : 0;
    const group = worldShowGroup?.price ? worldShowGroup.price : 0;
    setStepTotal(solo + group);
  }, [isWorldShowSolo, worldShowGroup?.price, settings, setStepTotal]);

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

  // Reset all worldshow fields if not eligible
  useEffect(() => {
    if (!isEligible) {
      setValue('isWorldShowSolo', false);
      setValue('isWorldShowGroup', false);
    }
  }, [isEligible, setValue]);

  return (
    <div className={styles.form}>
      <h2 className={textStyles.h2}>{t('form.worldShow.title')}</h2>
      {!isEligible && <p className={textStyles.p}>{t('form.worldShow.notEligible')}</p>}
      {isEligible && (
        <>
          <p className={textStyles.p}>{t('form.worldShow.description')}</p>
          <FormInputCheckbox
            control={control}
            name='isWorldShowSolo'
            label={
              <p className={textStyles.p}>
                {t('form.worldShow.solo')}:{' '}
                <span className={textStyles.accent}>{settings?.price.worldShow?.solo!}€</span>
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
                  {settings?.price.worldShow?.groups!}€ / {t('form.worldShow.perPerson')}
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
