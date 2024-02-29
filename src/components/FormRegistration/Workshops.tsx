import useTranslation from 'next-translate/useTranslation';
import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Collapse, MenuItem } from '@mui/material';

import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import { FormFields, WorkshopsStepProps } from './types';
import { FormInputCheckbox, FormInputField, FormInputSelect } from '@/src/ui-kit/input';
import { SupportedLangs } from '@/src/types';

export const Workshops: React.FC<WorkshopsStepProps> = ({
  setStepTotal,
  fullPassPrice,
  fullPassDiscountList,
  setIsNextDisabled,
}) => {
  const { t, lang } = useTranslation('registration');
  const currentLang = lang as SupportedLangs;

  const methods = useFormContext<FormFields>();
  const {
    control,
    watch,
    formState: { errors },
  } = methods;

  const [isDiscount, setIsDiscount] = useState(false);
  const [isGroup, setIsGroup] = useState(false);

  const isFullPass = watch('isFullPass');
  const isFullPassDiscount = watch('fullPassDiscount');
  const version = watch('version');

  // Disable next if no selection
  useEffect(() => {
    if (isFullPass) setIsNextDisabled(false);
    else setIsNextDisabled(true);
  });

  //Handle discounts
  useEffect(() => {
    if (isFullPassDiscount != 'none' && isFullPassDiscount != 'group') {
      setIsDiscount(true);
      setIsGroup(false);
    }
    if (isFullPassDiscount === 'group') {
      setIsDiscount(false);
      setIsGroup(true);
    }
    if (isFullPassDiscount === 'none' || !isFullPassDiscount) {
      setIsDiscount(false);
      setIsGroup(false);
    }
  }, [isFullPassDiscount]);

  // Set step total
  useEffect(() => {
    if (isFullPass && fullPassPrice) setStepTotal(fullPassPrice);
    else setStepTotal(0);
  }, [isFullPass, fullPassPrice, setStepTotal]);

  // content
  const workshopsDescription = (
    <>
      <p className={textStyles.p}>{t('form.workshops.fullPassDescription1')}</p>
      <p className={textStyles.p}>{t('form.workshops.fullPassDescription2')}</p>
    </>
  );

  return (
    <div className={styles.form}>
      <h2 className={textStyles.h2}>{t('form.workshops.title')}</h2>
      {workshopsDescription}

      <FormInputCheckbox
        control={control}
        name='isFullPass'
        label={
          <p className={textStyles.p}>
            {t('form.workshops.fullPass')}{' '}
            <span className={textStyles.accent}>{fullPassPrice ? fullPassPrice + ' €' : ''}</span>
          </p>
        }
      />

      <Collapse in={isFullPass} unmountOnExit>
        <div className={styles.form}>
          <FormInputSelect
            name='fullPassDiscount'
            control={control}
            label={t('form.workshops.discounts.title')}
            rules={{
              required: t('form.common.required'),
            }}
            error={!!errors.fullPassDiscount}
            helperText={errors?.fullPassDiscount?.message as string | undefined}
          >
            {fullPassDiscountList.map((i) => (
              <MenuItem key={i} value={i}>
                {t(`form.workshops.discounts.${i}`)}
              </MenuItem>
            ))}
          </FormInputSelect>

          <Collapse in={isDiscount} unmountOnExit>
            <div className={styles.form}>
              <p className={textStyles.p}>{t('form.workshops.discounts.detailsDescription')}</p>
              <FormInputField
                name='fullPassDiscountSource'
                label={t('form.workshops.discounts.details')}
                control={control}
                rules={{
                  required: t('form.common.required'),
                }}
                error={!!errors.fullPassDiscountSource}
                helperText={errors?.fullPassDiscountSource?.message as string | undefined}
              />
            </div>
          </Collapse>

          <Collapse in={isGroup} unmountOnExit>
            <div className={styles.form}>
              <p className={textStyles.p}>{t('form.workshops.discounts.groupDescription')}</p>
              <FormInputField
                name='fullPassGroupName'
                label={t('form.workshops.discounts.groupName')}
                control={control}
                rules={{
                  required: t('form.common.required'),
                }}
                error={!!errors.fullPassDiscountSource}
                helperText={errors?.fullPassDiscountSource?.message as string | undefined}
              />
            </div>
          </Collapse>
        </div>
      </Collapse>
    </div>
  );
};
