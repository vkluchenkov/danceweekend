import { useCallback, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';
import clsx from 'clsx';
import axios from 'axios';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Collapse, Snackbar, Alert } from '@mui/material';
import { DateTime } from 'luxon';

import { PersonalData } from './PersonalData';
import styles from '@/styles/Registration.module.css';
import textStyles from '@/styles/Text.module.css';
import { Workshops } from './Workshops';
import { SupportedLangs, Version } from '@/src/types';
import {
  FormFields,
  FullPassDiscount,
  OrderPayload,
  SoloContestField,
  WorkshopsField,
} from './types';
import { getAgeGroup } from '@/src/ulis/getAgeGroup';
import { ContestSolo } from './ContestSolo';
import { defaultUrl, minWsAdults, minWsKids, motionVariants } from '@/src/ulis/constants';
import { contestCategories, Level } from '@/src/ulis/contestCategories';
import { ContestGroups } from './ContestGroups';
import { WorldShow } from './WorldShow';
import { Summary } from './Summary';
import { StepsNavigation } from './StepsNavigation';
import { Loader } from '../Loader';
import { WordpressApi } from '@/src/api/wordpressApi';
import { groupDiscount, kidsDiscount, p30Discount, p50Discount } from '@/src/ulis/price';
import { defaultValues, getWsPrices, liveSteps, onlineSteps } from './helpers';
import { schedule } from '@/src/ulis/schedule';

interface FormRegistrationProps {
  version: Version;
  priceData: Awaited<ReturnType<typeof WordpressApi.getSettings>>;
}

export const FormRegistration: React.FC<FormRegistrationProps> = ({ version, priceData }) => {
  const { t, lang } = useTranslation('registration');

  const currentLang = lang as SupportedLangs;

  const methods = useForm<FormFields>({
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const { handleSubmit, setValue, watch } = methods;

  const router = useRouter();

  const [isDev, setIsDev] = useState(false);
  const [total, setTotal] = useState(0);
  const [isTotalOpen, setIsTotalOpen] = useState(false);
  const [wstotal, setWsTotal] = useState(0);
  const [contestSoloTotal, setContestSoloTotal] = useState(0);
  const [contestGroupsTotal, setContestGroupsTotal] = useState(0);
  const [worldShowTotal, setWorldShowTotal] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

  const [lastDirection, setLastDirection] = useState<'prev' | 'next' | null>(null);

  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const [isPriceSet, setIsPriceSet] = useState(false);

  // Navigation form state
  const currentStep = watch('currentStep');

  // Form data
  const age = watch('age');
  const ageGroup = watch('ageGroup');
  const contestAgeGroup = watch('contestAgeGroup');
  const isFullPass = watch('isFullPass');
  const fullPassDiscount = watch('fullPassDiscount');
  const contestLevel = watch('contestLevel');
  const settings = watch('settings');
  const workshops = watch('workshops');

  const selectedWorkshops = workshops.filter((ws) => ws.selected);

  const isStep = useMemo(() => {
    const steps = version === 'live' ? liveSteps : onlineSteps;
    return steps.find((step) => step.id === currentStep);
  }, [currentStep, version]);

  useEffect(() => {
    setIsDev(!window.location.href.startsWith(defaultUrl));
  }, [setIsDev]);

  // Set price from props -= once =-
  useEffect(() => {
    if (priceData && !isPriceSet) {
      // console.log('setting price');
      setValue('settings', priceData);
      setIsPriceSet(true);
    }
  }, [priceData, isPriceSet, setValue]);

  // Set version from props
  useEffect(() => {
    // console.log('setting version');
    setValue('version', version);
  }, [version, setValue]);

  // open Total snackbar on change
  useEffect(() => {
    total > 0 && setIsTotalOpen(true);
    total === 0 && setIsTotalOpen(false);
  }, [total]);

  // Write initial age groups into form state
  const initialAgeGroup = useMemo(() => {
    // console.log('getting initial age group');
    return getAgeGroup(age);
  }, [age]);

  useEffect(() => {
    // console.log('setting contest age group');
    setValue('contestAgeGroup', initialAgeGroup);
    setValue('ageGroup', initialAgeGroup);
  }, [initialAgeGroup, setValue]);

  // Write workshops prices into form state
  useEffect(() => {
    setValue('wsPrices', getWsPrices(settings, isDev));
  }, [settings, isDev, setValue]);

  // Map solo contest styles and levels into form state
  useEffect(() => {
    const res: SoloContestField = [];
    // Filter by age
    const filteredByAgeGroup = contestCategories.filter(
      (cat) => cat.ageGroup === contestAgeGroup || cat.ageGroups?.includes(contestAgeGroup!)
    );
    // Filter solo only
    const filteredBySolo = filteredByAgeGroup.filter(
      (cat) => !cat.isDuoCategory && !cat.isGroupCategory
    );

    const levels: Level[] = [];

    filteredBySolo.forEach((cat) => {
      if (contestLevel && cat.levels.includes(contestLevel)) {
        cat.categories.forEach((style) => {
          style.isSolo &&
            res.push({
              ...style,
              selected: false,
              id: style.translations.en.categoryTitle,
              price: 0,
            });
        });
      }
      cat.levels.forEach((level) => {
        if (level !== 'openLevel') {
          const isLevel = levels.includes(level);
          if (!isLevel) levels.push(level);
        }
      });
    });
    setValue('soloContest', res);
    setValue('contestLevels', levels);
    // eslint-disable-next-line
  }, [contestAgeGroup, contestLevel]);

  // Map workshops data into form state
  useEffect(() => {
    const res: WorkshopsField = [];
    schedule.forEach((day) => {
      day.dayEvents.forEach((event) => {
        event.type === 'workshop' &&
          res.push({ ...event, selected: false, day: day.translations[currentLang].dayTitle });
      });
    });
    setValue('workshops', res);
  }, [setValue, currentLang]);

  // Check if has enough workshops selected
  const isEligeble = useMemo(() => {
    if (isFullPass) return true;
    if (ageGroup === 'baby' || (ageGroup === 'kids' && selectedWorkshops.length >= minWsKids))
      return true;
    if (
      (ageGroup === 'juniors' || ageGroup === 'adults' || ageGroup === 'seniors') &&
      selectedWorkshops.length >= minWsAdults
    )
      return true;
    return false;
  }, [isFullPass, selectedWorkshops, ageGroup]);

  // Summarize step totals
  useEffect(() => {
    setTotal(wstotal + contestSoloTotal + contestGroupsTotal + worldShowTotal);
  }, [wstotal, contestSoloTotal, contestGroupsTotal, worldShowTotal]);

  // Handle form submit
  const onSubmit = async (data: FormFields) => {
    setIsLoading(true);

    const payload: OrderPayload = {
      ...data,
      fullPassPrice: fullPassPrice,
      currentLang: currentLang,
      soloPassPrice: getSoloPassPrice(),
      total: total,
    };

    await axios
      .post('/api/reg-submit', payload)
      .then((res) => {
        router.push('/thank-you');
      })
      .catch((error: any) => {
        setIsSnackBarOpen(true);
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  // Handle steps navigation
  const hanleSteps = useCallback(
    (direction: 'next' | 'prev') => {
      if (isStep && isStep[direction]) {
        setValue('currentStep', isStep[direction]!);
        setLastDirection(direction);
      }
      // Wait for the prev step to transition out
      setTimeout(() => {
        setIsNextDisabled(false);
      }, 400);
    },
    [setValue, isStep]
  );

  // Handle snackbar close
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setIsSnackBarOpen(false);
  };

  const fullPassPrice = useMemo(() => {
    if (settings) {
      const isPromo = (): boolean => {
        const livePromo = isDev
          ? settings.price.promoPeriodDev.isLivePromo.toLowerCase()
          : settings.price.promoPeriod.isLivePromo.toLowerCase();

        return livePromo === 'true' ? true : false;
      };

      const periods = Object.entries(settings.price.periods);

      const today = DateTime.now().setZone('Europe/Warsaw');

      const basePrice = (): number | undefined => {
        const periodPrice = periods.find((p) => {
          const startDate = DateTime.fromISO(p[1].start)
            .setZone('UTC')
            .setZone('Europe/Warsaw', { keepLocalTime: true });

          const endDate = DateTime.fromISO(p[1].end)
            .setZone('UTC')
            .setZone('Europe/Warsaw', { keepLocalTime: true });

          return startDate <= today && today <= endDate;
        })?.[1].price;

        const promoPrice = isDev
          ? settings.price.promoPeriodDev.price.live
          : settings.price.promoPeriod.price.live;

        return isPromo() ? promoPrice : periodPrice!.live;
      };

      // additional discounts (certificates, etc.)
      if (fullPassDiscount === 'group' && basePrice())
        return Number.parseFloat((basePrice()! * groupDiscount).toFixed(2));

      if (fullPassDiscount === '30%' && basePrice())
        return Number.parseFloat((basePrice()! * p30Discount).toFixed(2));

      if (fullPassDiscount === '50%' && basePrice())
        return Number.parseFloat((basePrice()! * p50Discount).toFixed(2));
      if (fullPassDiscount === 'free') return 0;

      // Kids discount
      if ((ageGroup === 'baby' || ageGroup === 'kids') && basePrice())
        return Number.parseFloat((basePrice()! * kidsDiscount).toFixed(2));
      else return basePrice();
    } else return undefined;
  }, [ageGroup, settings, fullPassDiscount, isDev]);

  const fullPassDiscountList: FullPassDiscount[] = useMemo(() => {
    // Kids and baby can't have less than 50% discount in live version due to automatic 30%
    return ageGroup === 'baby' || ageGroup === 'kids'
      ? ['none', '50%', 'free']
      : ['none', 'group', '30%', '50%', 'free'];
  }, [ageGroup]);

  const getSoloPassPrice = () => {
    const soloPrice = isFullPass
      ? settings?.price.contest?.contestsoloprice!
      : settings?.price.contest?.contestsolopricewithoutfullpass!;

    const priceKids = soloPrice.soloPassKids;
    const priceRisingStar = soloPrice.soloPassRisingStar;
    const priceProfessionals = soloPrice.soloPassProfessionals;

    if (ageGroup === 'baby' || ageGroup === 'kids') return priceKids;
    if (contestLevel === 'professionals') return priceProfessionals;
    return priceRisingStar;
  };

  return (
    <FormProvider {...methods}>
      <form className={styles.form}>
        {currentStep === 'personal' && (
          <AnimatePresence>
            <motion.div
              key={'personal'}
              initial='hidden'
              animate='enter'
              exit='exit'
              variants={motionVariants}
              transition={{ type: 'linear', duration: 0.3 }}
            >
              <PersonalData setIsNextDisabled={setIsNextDisabled} />
            </motion.div>
          </AnimatePresence>
        )}

        {currentStep === 'workshops' && (
          <AnimatePresence>
            <motion.div
              key={'workshops'}
              initial='hidden'
              animate='enter'
              exit='exit'
              variants={motionVariants}
              transition={{ type: 'linear', duration: 0.3 }}
            >
              <Workshops
                // currentPricePeriod={currentPricePeriod}
                fullPassPrice={fullPassPrice}
                fullPassDiscountList={fullPassDiscountList}
                setStepTotal={setWsTotal}
                setIsNextDisabled={setIsNextDisabled}
              />
            </motion.div>
          </AnimatePresence>
        )}

        {currentStep === 'contestSolo' && (
          <AnimatePresence>
            <motion.div
              key={'workshops'}
              initial='hidden'
              animate='enter'
              exit='exit'
              variants={motionVariants}
              transition={{ type: 'linear', duration: 0.3 }}
            >
              <ContestSolo
                setStepTotal={setContestSoloTotal}
                soloPassPrice={getSoloPassPrice()}
                setIsNextDisabled={setIsNextDisabled}
                isEligible={isEligeble}
              />
            </motion.div>
          </AnimatePresence>
        )}

        {currentStep === 'contestGroups' && (
          <AnimatePresence>
            <motion.div
              key={'workshops'}
              initial='hidden'
              animate='enter'
              exit='exit'
              variants={motionVariants}
              transition={{ type: 'linear', duration: 0.3 }}
            >
              <ContestGroups
                setStepTotal={setContestGroupsTotal}
                lastDirection={lastDirection}
                onStepSubmit={hanleSteps}
              />
            </motion.div>
          </AnimatePresence>
        )}

        {currentStep === 'worldShow' && (
          <AnimatePresence>
            <motion.div
              key={'workshops'}
              initial='hidden'
              animate='enter'
              exit='exit'
              variants={motionVariants}
              transition={{ type: 'linear', duration: 0.3 }}
            >
              <WorldShow setStepTotal={setWorldShowTotal} isEligible={isEligeble} />
            </motion.div>
          </AnimatePresence>
        )}

        {currentStep === 'summary' && (
          <AnimatePresence>
            <motion.div
              key={'workshops'}
              initial='hidden'
              animate='enter'
              exit='exit'
              variants={motionVariants}
              transition={{ type: 'linear', duration: 0.3 }}
            >
              <Summary
                fullPassPrice={fullPassPrice}
                soloPassPrice={getSoloPassPrice()}
                total={total}
                setIsNextDisabled={setIsNextDisabled}
              />
            </motion.div>
          </AnimatePresence>
        )}

        <Collapse in={isTotalOpen && currentStep !== 'summary'} unmountOnExit>
          <h2 className={clsx(textStyles.h2)}>
            {t('form.common.total')}: <span className={textStyles.accent}>{total}€</span>
          </h2>
        </Collapse>

        <StepsNavigation
          currentStep={isStep}
          onStepSubmit={hanleSteps}
          onFormSubmit={handleSubmit(onSubmit)}
          isNextDisabled={isNextDisabled}
        />

        <Snackbar
          open={isSnackBarOpen}
          onClose={handleClose}
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        >
          <Alert severity='warning' onClose={handleClose} variant='filled'>
            {t('form.error')}
          </Alert>
        </Snackbar>
      </form>

      {isLoading && <Loader />}
    </FormProvider>
  );
};
