import useTranslation from 'next-translate/useTranslation';
import { useFormContext } from 'react-hook-form';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import { useEffect, useState } from 'react';
import {
  Button,
  Collapse,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
} from '@mui/material';
import {
  FormFields,
  FullPassDiscount,
  WorkshopsField,
  WorkshopsStepProps,
  WorkshopsType,
} from './types';
import { WorkshopsList } from './WorkshopsList';
import { FormInputField, FormInputSelect } from '@/src/ui-kit/input';
import { schedule, Workshop } from '@/src/ulis/schedule';
import { SupportedLangs } from '@/src/types';

export const Workshops: React.FC<WorkshopsStepProps> = ({
  onStepSubmit,
  setStepTotal,
  currentPricePeriod,
  fullPassPrice,
  fullPassDiscountList,
}) => {
  const { t, lang } = useTranslation('registration');
  const currentLang = lang as SupportedLangs;

  const methods = useFormContext<FormFields>();
  const {
    setValue,
    control,
    watch,
    trigger,
    formState: { errors },
  } = methods;

  const [isDiscount, setIsDiscount] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const isFullPass = watch('isFullPass');
  const isFullPassDiscount = watch('fullPassDiscount');
  const workshopsType = watch('workshopsType');
  const isWorkshops = watch('workshops');

  const selectedWorkshops = isWorkshops.filter((ws) => ws.selected);

  useEffect(() => {
    setValue('isNextDisabled', isNextDisabled);
  }, [isNextDisabled, setValue]);

  useEffect(() => {
    if (isFullPass || selectedWorkshops.length) setIsNextDisabled(false);
    else setIsNextDisabled(true);
  }, [isFullPass, selectedWorkshops]);

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
    else if (!selectedWorkshops) setStepTotal(0);
    else {
      const wsPrice = selectedWorkshops.reduce((prev, current) => {
        const price: number | undefined =
          currentPricePeriod?.price.live[`${current.teachersPriceGroup!}Price`];
        return prev + price!;
      }, 0);
      setStepTotal(wsPrice);
    }
  }, [selectedWorkshops, isFullPass, currentPricePeriod, fullPassPrice, setStepTotal]);

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
      setValue('fullPassGroupName', '');
    }
  };

  return (
    <div className={styles.form}>
      <h2 className={textStyles.h2}>{t('form.workshops.title')}</h2>
      <p className={textStyles.p}>{t('form.workshops.fullPassDescription1')}</p>
      <p className={textStyles.p}>{t('form.workshops.fullPassDescription2')}</p>

      <FormControl component='fieldset'>
        <h4 className={textStyles.h4}>{t('form.workshops.selectTitle')}</h4>
        <RadioGroup
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
                  {fullPassPrice ? fullPassPrice + ' €' : ''}
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
        <WorkshopsList currentPricePeriod={currentPricePeriod} />
      </Collapse>

      <Collapse in={workshopsType === 'fullPass'} unmountOnExit>
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
