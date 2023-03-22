import useTranslation from 'next-translate/useTranslation';
import { useFormContext } from 'react-hook-form';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import { useEffect } from 'react';
import {
  Button,
  Collapse,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
} from '@mui/material';
import { FullPassDiscount, WorkshopsField, WorkshopsStepProps, WorkshopsType } from './types';
import { WorkshopsList } from './WorkshopsList';
import { FormInputSelect } from '@/src/ui-kit/input';
import { schedule } from '@/src/ulis/schedule';
import { SupportedLangs } from '@/src/types';

export const Workshops: React.FC<WorkshopsStepProps> = ({
  onStepSubmit,
  setWsTotal,
  currentPricePeriod,
  fullPassPrice,
  fullPassDiscountList,
}) => {
  const { t, lang } = useTranslation('registration');
  const currentLang = lang as SupportedLangs;

  const methods = useFormContext();
  const { handleSubmit, setValue, control, watch } = methods;

  const isFullPass: boolean = watch('isFullPass');
  const workshopsType: WorkshopsType = watch('workshopsType');
  const isWorkshops: WorkshopsField = watch('workshops');
  const selectedWorkshops = isWorkshops.filter((ws) => ws.selected);

  // Set step total
  useEffect(() => {
    if (isFullPass && fullPassPrice) setWsTotal(fullPassPrice);
    else if (!selectedWorkshops) setWsTotal(0);
    else {
      const wsPrice = selectedWorkshops.reduce((prev, current) => {
        const price: number | undefined =
          currentPricePeriod?.price.live[`${current.teachersPriceGroup!}Price`];
        return prev + price!;
      }, 0);
      setWsTotal(wsPrice);
    }
  }, [selectedWorkshops, isFullPass, currentPricePeriod, fullPassPrice, setWsTotal]);

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
    } else setValue('fullPassDiscount', 'none', { shouldTouch: true });
  };

  return (
    <>
      <h2 className={textStyles.h2}>{t('form.workshops.title')}</h2>

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
              <span>
                {t('form.workshops.fullPass')} {fullPassPrice}€
              </span>
            }
          />
          <FormControlLabel
            value='single'
            control={<Radio />}
            label={<span>{t('form.workshops.singleWs')} </span>}
          />
        </RadioGroup>
      </FormControl>

      <Collapse in={workshopsType === 'single'}>
        <WorkshopsList currentPricePeriod={currentPricePeriod} />
      </Collapse>

      <Collapse in={workshopsType === 'fullPass'}>
        <div className={styles.form}>
          <h4 className={textStyles.h4}>{t('form.workshops.discounts.title')}</h4>
          <FormInputSelect name='fullPassDiscount' control={control}>
            {fullPassDiscountList.map((i) => (
              <MenuItem key={i} value={i}>
                {t(`form.workshops.discounts.${i}`)}
              </MenuItem>
            ))}
          </FormInputSelect>
        </div>
      </Collapse>

      <Button
        type='button'
        variant='text'
        size='large'
        disableElevation
        fullWidth
        onClick={handleSubmit(() => onStepSubmit('prev'))}
      >
        {t('form.common.prev')}
      </Button>
      <Button
        type='button'
        variant='contained'
        size='large'
        disableElevation
        fullWidth
        onClick={handleSubmit(() => onStepSubmit('next'))}
      >
        {t('form.common.next')}
      </Button>
    </>
  );
};
