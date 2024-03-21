import { useCallback, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';
import clsx from 'clsx';
import axios from 'axios';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Collapse, Snackbar, Alert } from '@mui/material';

import { PersonalData } from './PersonalData';
import styles from '@/styles/Registration.module.css';
import textStyles from '@/styles/Text.module.css';
import { Workshops } from './Workshops';
import { SupportedLangs, Version } from '@/src/types';
import { FormFields, FullPassDiscount, OrderPayload, SoloContestField } from './types';
import { getAgeGroup } from '@/src/ulis/getAgeGroup';
import { ContestSolo } from './ContestSolo';
import { motionVariants } from '@/src/ulis/constants';
import { contestCategories, Level } from '@/src/ulis/contestCategories';
import { ContestGroups } from './ContestGroups';
import { WorldShow } from './WorldShow';
import { Summary } from './Summary';
import { StepsNavigation } from './StepsNavigation';
import { Loader } from '../Loader';
import { WordpressApi } from '@/src/api/wordpressApi';
import { kidsDiscount } from '@/src/ulis/price';
import { defaultValues, liveSteps, onlineSteps } from './helpers';

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
  const fullPassDiscount = watch('fullPassDiscount');
  const contestLevel = watch('contestLevel');
  const settings = watch('settings');

  const isStep = useMemo(() => {
    const steps = version === 'live' ? liveSteps : onlineSteps;
    return steps.find((step) => step.id === currentStep);
  }, [currentStep, version]);

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

  // Map solo contest styles and levels into form state
  useEffect(() => {
    // console.log('mapping contest fields');
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
      soloPassPrice: soloPassPrice,
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
        if (version === 'live')
          return settings?.price.promoPeriod.isLivePromo.toLowerCase() === 'true' ? true : false;
        else
          return settings?.price.promoPeriod?.isOnlinePromo.toLowerCase() === 'true' ? true : false;
      };

      const periods = Object.entries(settings.price.periods);

      const today = new Date();

      const basePrice = (): number | undefined => {
        const periodPrice = periods.find((p) => {
          const startDate = new Date(p[1].start);
          const endDate = new Date(p[1].end);
          return startDate <= today && today <= endDate;
        })?.[1].price;

        const promoPrice = settings.price.promoPeriod.price[version];

        const currentPrice: number | undefined = isPromo() ? promoPrice : periodPrice![version];

        // Kids discount for live version
        if (version === 'live' && (ageGroup === 'baby' || ageGroup === 'kids') && currentPrice)
          return Number.parseFloat((currentPrice * kidsDiscount).toFixed(2));
        else return currentPrice;
      };

      // additional discounts (certificates, etc.)
      if (fullPassDiscount === 'group' && basePrice())
        return Number.parseFloat((basePrice()! * 0.8).toFixed(2));

      if (fullPassDiscount === '30%' && basePrice())
        return Number.parseFloat((basePrice()! * 0.7).toFixed(2));

      if (fullPassDiscount === '50%' && basePrice())
        return Number.parseFloat((basePrice()! * 0.5).toFixed(2));
      if (fullPassDiscount === 'free') return 0;
      else return basePrice();
    } else return undefined;
  }, [ageGroup, settings, fullPassDiscount, version]);

  const fullPassDiscountList: FullPassDiscount[] = useMemo(() => {
    // Kids and baby can't have less than 100% discount in live version due to automatic 50%
    if (version === 'live')
      return ageGroup === 'baby' || ageGroup === 'kids'
        ? ['none', 'free']
        : ['none', 'group', '30%', '50%', 'free'];
    // No group discounts for online
    else return ['none', '30%', '50%', 'free'];
  }, [ageGroup, version]);

  const soloPassPrice = useMemo(() => {
    const priceKids = settings?.price.contest?.contestsoloprice?.soloPassKids!;
    const priceRisingStar = settings?.price.contest?.contestsoloprice?.soloPassRisingStar!;
    const priceProfessionals = settings?.price.contest?.contestsoloprice?.soloPassProfessionals!;

    if (ageGroup === 'baby' || ageGroup === 'kids') return priceKids;
    if (contestLevel === 'professionals') return priceProfessionals;
    return priceRisingStar;
  }, [ageGroup, settings, contestLevel]);

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
                soloPassPrice={soloPassPrice}
                setIsNextDisabled={setIsNextDisabled}
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
              <WorldShow setStepTotal={setWorldShowTotal} />
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
                soloPassPrice={soloPassPrice}
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
