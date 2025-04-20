import useTranslation from 'next-translate/useTranslation';
import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import {
  Collapse,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
} from '@mui/material';

import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import { FormFields, WorkshopsField, WorkshopsStepProps, WorkshopsType } from './types';
import { FormInputField, FormInputSelect } from '@/src/ui-kit/input';
import { SupportedLangs } from '@/src/types';
import { schedule } from '@/src/ulis/schedule';
import { WorkshopsList } from './WorkshopsList';
import { currencySymbol } from '@/src/ulis/constants';

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
    setValue,
    formState: { errors },
  } = methods;

  const [isDiscount, setIsDiscount] = useState(false);
  const [isGroup, setIsGroup] = useState(false);

  const isFullPass = watch('isFullPass');
  const workshops = watch('workshops');
  const workshopsType = watch('workshopsType');
  const wsPrices = watch('wsPrices');
  const isFullPassDiscount = watch('fullPassDiscount');
  const version = watch('version');

  const selectedWorkshops = workshops.filter((ws) => ws.selected);

  // Disable next if no selection made
  useEffect(() => {
    if (isFullPass || selectedWorkshops.length >= 1) setIsNextDisabled(false);
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
    if (isFullPass && fullPassPrice) {
      setStepTotal(fullPassPrice);
    } else if (!isFullPass && selectedWorkshops.length >= 1) {
      const total = selectedWorkshops.reduce((acc, ws) => {
        const price = wsPrices?.[ws.teachersPriceGroup].price;
        return acc + price!;
      }, 0);
      setStepTotal(total);
    } else setStepTotal(0);
  }, [isFullPass, fullPassPrice, setStepTotal, selectedWorkshops, wsPrices]);

  const handleFullPass = (event: React.ChangeEvent<HTMLInputElement>, value: WorkshopsType) => {
    setValue('isFullPass', value === 'fullPass', { shouldTouch: true });
    setValue('workshopsType', value, { shouldTouch: true });

    // Reset selection if option has changed
    if (value === 'fullPass') {
      const res: WorkshopsField = [];
      schedule.forEach((day) => {
        day.dayEvents.forEach((event) => {
          event.type === 'workshop' &&
            res.push({ ...event, selected: false, day: day.translations[currentLang].dayTitle });
        });
      });
      setValue('workshops', res);
    } else {
      setValue('fullPassDiscount', 'none', { shouldTouch: true });
      setValue('fullPassDiscountSource', '');
    }
  };

  // content
  const workshopsDescription = (
    <>
      <p className={textStyles.p}>{t('form.workshops.fullPassDescription1')}</p>
      {version === 'live' && (
        <p className={textStyles.p}>{t('form.workshops.fullPassDescription2Live')}</p>
      )}
      {version === 'online' && (
        <p className={textStyles.p}>{t('form.workshops.fullPassDescription2Online')}</p>
      )}
    </>
  );

  return (
    <div className={styles.form}>
      <h2 className={textStyles.h2}>{t('form.workshops.title')}</h2>
      {workshopsDescription}

      <FormControl component='fieldset'>
        <h4 className={textStyles.h4}>{t('form.workshops.selectTitle')}</h4>
        <RadioGroup
          translate='no'
          row
          name='workshops-selection'
          value={workshopsType || ''}
          onChange={(event, value) => handleFullPass(event, value as WorkshopsType)}
        >
          <FormControlLabel
            value='fullPass'
            control={<Radio />}
            label={
              <p className={textStyles.p}>
                {t('form.workshops.fullPass')}{' '}
                <span className={textStyles.accent}>
                  {fullPassPrice ? fullPassPrice + currencySymbol : ''}
                </span>
              </p>
            }
          />
          <FormControlLabel
            value='single'
            control={<Radio />}
            label={<p className={textStyles.p}>{t('form.workshops.singleWs')}</p>}
          />
        </RadioGroup>
      </FormControl>

      <Collapse in={workshopsType === 'single'} unmountOnExit>
        <WorkshopsList />
      </Collapse>

      <Collapse in={isFullPass} unmountOnExit>
        <div className={styles.form}>
          <FormInputSelect
            translate='no'
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
              <MenuItem key={i} value={i} translate='no'>
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
