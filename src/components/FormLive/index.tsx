import { FormProvider, useForm } from 'react-hook-form';
import { PersonalData } from './PersonalData';
import styles from '@/styles/Registration.module.css';
import textStyles from '@/styles/Text.module.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Workshops } from './Workshops';
import { schedule } from '@/src/ulis/schedule';
import useTranslation from 'next-translate/useTranslation';
import { SupportedLangs } from '@/src/types';
import {
  FormFields,
  FullPassDiscount,
  OrderPayload,
  SoloContestField,
  Step,
  WorkshopsField,
} from './types';
import { contestSoloPrice, ispromoPeriod, kidsDiscount, workshopsPrice } from '@/src/ulis/price';
import { Collapse } from '@mui/material';
import { getAgeGroup } from '@/src/ulis/getAgeGroup';
import { ContestSolo } from './ContestSolo';
import { minWsAdults, minWsKids } from '@/src/ulis/constants';
import { contestCategories, Level } from '@/src/ulis/contestCategories';
import { ContestGroups } from './ContestGroups';
import { WorldShow } from './WorldShow';
import { Summary } from './Summary';
import clsx from 'clsx';
import { StepsNavigation } from './StepsNavigation';
import axios from 'axios';
import { Loader } from '../Loader';
import { useRouter } from 'next/router';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const steps: Step[] = [
  {
    id: 'personal',
    prev: null,
    next: 'workshops',
  },
  {
    id: 'workshops',
    prev: 'personal',
    next: 'contestSolo',
  },
  {
    id: 'contestSolo',
    prev: 'workshops',
    next: 'contestGroups',
  },
  {
    id: 'contestGroups',
    prev: 'contestSolo',
    next: 'worldShow',
  },
  {
    id: 'worldShow',
    prev: 'contestGroups',
    next: 'summary',
  },
  {
    id: 'summary',
    prev: 'worldShow',
    next: null,
  },
];

const defaultValues: Partial<FormFields> = {
  isFullPass: false,
  isSoloPass: false,
  fullPassDiscount: 'none',
  workshops: [],
  isSoloContest: false,
  soloContest: [],
  isGroupContest: false,
  groupContest: [],
  currentStep: 'personal',
  rulesAccepted: false,
};

export const FormLive: React.FC = () => {
  const { t, lang } = useTranslation('registration');
  const currentLang = lang as SupportedLangs;

  const router = useRouter();

  const methods = useForm<FormFields>({
    defaultValues: defaultValues,
    mode: 'onChange',
  });
  const { handleSubmit, setValue, watch } = methods;

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

  // Navigation form state
  const currentStep = watch('currentStep');

  // Form data
  const age = watch('age');
  const ageGroup = watch('ageGroup');
  const contestAgeGroup = watch('contestAgeGroup');
  const isFullPass = watch('isFullPass');
  const fullPassDiscount = watch('fullPassDiscount');
  const isWorkshops = watch('workshops');
  const contestLevel = watch('contestLevel');

  const selectedWorkshops = isWorkshops.filter((ws) => ws.selected);

  const isStep = useMemo(() => {
    return steps.find((step) => step.id === currentStep);
  }, [currentStep]);

  // open Total snackbar on change
  useEffect(() => {
    total > 0 && setIsTotalOpen(true);
  }, [total]);

  // Write initial age groups into form state
  useEffect(() => {
    setValue('contestAgeGroup', age ? getAgeGroup(age) : null);
    setValue('ageGroup', age ? getAgeGroup(age) : null);
  }, [age, setValue]);

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

  // Map solo contest styles into form state
  useEffect(() => {
    const res: SoloContestField = [];
    // Filter by age
    const filteredByAgeGroup = contestCategories.filter(
      (cat) => cat.ageGroup === contestAgeGroup || cat.ageGroups?.includes(contestAgeGroup!)
    );

    // Add only solo styles from with live type
    const levels: Level[] = [];

    filteredByAgeGroup.forEach((cat, index) => {
      cat.levels.forEach((level) => {
        if (level !== 'openLevel') {
          const isLevel = levels.includes(level);
          if (!isLevel) levels.push(level);
        }
      });

      cat.categories.forEach((style) => {
        style.isSolo &&
          style.types.includes('live') &&
          res.push({
            ...style,
            selected: false,
            id: style.translations.en.categoryTitle,
            price: 0,
          });
      });
    });

    setValue('soloContest', res);
    setValue('contestLevels', levels);
    setValue('contestLevel', levels[0]);
  }, [contestAgeGroup, setValue]);

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
      currentPricePeriod: currentPricePeriod,
      currentLang: currentLang,
      soloPassPrice: soloPassPrice,
      total: total,
    };
    await axios
      .post('/api/reg-submit', payload)
      .then((res) => {
        console.log(res.data);
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
      setIsNextDisabled(false);
      if (isStep && isStep[direction]) {
        setValue('currentStep', isStep[direction]!);
        setLastDirection(direction);
      }
    },
    [setValue, isStep]
  );

  // Handle snackbar close
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackBarOpen(false);
  };

  const currentPricePeriod = useMemo(() => {
    const today = new Date();
    if (ispromoPeriod) return workshopsPrice.find((i) => i.isPromo);
    else return workshopsPrice.find((i) => i.startDate! <= today && today <= i.endDate!);
  }, []);

  const fullPassPrice = useMemo(() => {
    // Kids discount
    const basePrice =
      ageGroup === 'baby' || ageGroup === 'kids'
        ? currentPricePeriod && currentPricePeriod.price.live.fullPassPrice * kidsDiscount
        : currentPricePeriod?.price.live.fullPassPrice;

    // additional discounts (certificates, etc.)
    if (fullPassDiscount === 'group' && basePrice)
      return Number.parseFloat((basePrice * 0.8).toFixed(2));

    if (fullPassDiscount === '30%' && basePrice)
      return Number.parseFloat((basePrice * 0.7).toFixed(2));

    if (fullPassDiscount === '50%' && basePrice)
      return Number.parseFloat((basePrice * 0.5).toFixed(2));
    if (fullPassDiscount === 'free' && basePrice) return 0;
    else return basePrice;
  }, [ageGroup, currentPricePeriod, fullPassDiscount]);

  const fullPassDiscountList: FullPassDiscount[] = useMemo(() => {
    // Kids and baby can't have less than 100% discount
    return ageGroup === 'baby' || ageGroup === 'kids'
      ? ['none', 'free']
      : ['none', 'group', '30%', '50%', 'free'];
  }, [ageGroup]);

  const isEligible = useMemo(() => {
    if (ageGroup === 'baby' || ageGroup === 'kids') {
      if (isFullPass || selectedWorkshops.length >= minWsKids) return true;
      else return false;
    } else {
      if (isFullPass || selectedWorkshops.length >= minWsAdults) return true;
      else return false;
    }
  }, [ageGroup, isFullPass, selectedWorkshops]);

  const soloPassPrice = useMemo(() => {
    const priceKids = contestSoloPrice.soloPassKids.price.live;
    const priceRisingStar = contestSoloPrice.soloPassRisingStar.price.live;
    const priceProfessionals = contestSoloPrice.soloPassProfessionals.price.live;

    // Price for Kids and Baby
    if (ageGroup === 'baby' || ageGroup === 'kids')
      return isFullPass ? priceKids.priceDiscounted : priceKids.priceNormal;
    // Price for everyone else
    else {
      if (contestLevel === 'professionals')
        return isFullPass ? priceProfessionals.priceDiscounted : priceProfessionals.priceNormal;
      if (!contestLevel) return 0;
      else return isFullPass ? priceRisingStar.priceDiscounted : priceRisingStar.priceNormal;
    }
  }, [ageGroup, contestLevel, isFullPass]);

  return (
    <FormProvider {...methods}>
      <form className={styles.form}>
        {currentStep === 'personal' && <PersonalData />}

        {currentStep === 'workshops' && (
          <Workshops
            // onStepSubmit={hanleSteps}
            currentPricePeriod={currentPricePeriod}
            fullPassPrice={fullPassPrice}
            fullPassDiscountList={fullPassDiscountList}
            setStepTotal={setWsTotal}
            setIsNextDisabled={setIsNextDisabled}
          />
        )}

        {currentStep === 'contestSolo' && (
          <ContestSolo
            setStepTotal={setContestSoloTotal}
            isEligible={isEligible}
            soloPassPrice={soloPassPrice}
            setIsNextDisabled={setIsNextDisabled}
          />
        )}

        {currentStep === 'contestGroups' && (
          <ContestGroups
            isEligible={isEligible}
            setStepTotal={setContestGroupsTotal}
            lastDirection={lastDirection}
            onStepSubmit={hanleSteps}
          />
        )}

        {currentStep === 'worldShow' && (
          <WorldShow isEligible={isEligible} setStepTotal={setWorldShowTotal} />
        )}

        {currentStep === 'summary' && (
          <Summary
            fullPassPrice={fullPassPrice}
            currentPricePeriod={currentPricePeriod}
            soloPassPrice={soloPassPrice}
            total={total}
            setIsNextDisabled={setIsNextDisabled}
          />
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
