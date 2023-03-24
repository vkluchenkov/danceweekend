import useTranslation from 'next-translate/useTranslation';
import { useFormContext } from 'react-hook-form';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import { useMemo, useState } from 'react';
import { Button, Collapse, FormControlLabel, MenuItem } from '@mui/material';
import { ContestSoloStepProps } from './types';
import { AgeGroup, SupportedLangs } from '@/src/types';
import { InputCheckbox } from '@/src/ui-kit/input/InputCheckbox';
import { FormInputSelect } from '@/src/ui-kit/input';
import { getContestAgeGroupsList } from './helpers';
import { contestCategories, Level } from '@/src/ulis/contestCategories';
import { ContestSoloList } from './ContestSoloList';
import { contestSoloPrice } from '@/src/ulis/price';

export const ContestSolo: React.FC<ContestSoloStepProps> = ({
  onStepSubmit,
  setStepTotal,
  isEligible,
}) => {
  const { t, lang } = useTranslation('registration');
  const currentLang = lang as SupportedLangs;

  const [isCompetition, setIsCompetition] = useState(false);

  const methods = useFormContext();
  const { control, watch, trigger, setValue } = methods;

  const ageGroup: AgeGroup | null = watch('ageGroup');
  const contestLevels: Level[] = watch('contestLevels');
  const contestLevel: Level = watch('contestLevel');
  const isSoloPass: boolean = watch('isSoloPass');
  const isFullPass: boolean = watch('isFullPass');

  const ageGroupList = getContestAgeGroupsList(ageGroup);

  const handleCompetition = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
    setIsCompetition(checked);

  const handleSoloPass = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
    setValue('isSoloPass', checked);

  const getSoloPassPrice = useMemo((): number => {
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
      else return isFullPass ? priceRisingStar.priceDiscounted : priceRisingStar.priceNormal;
    }
  }, [ageGroup, contestLevel, isFullPass]);

  return (
    <div className={styles.form}>
      <h2 className={textStyles.h2}>{t('form.contest.title')}</h2>
      {!isEligible && <p>{t('form.contest.oops')}</p>}
      {isEligible && (
        <FormControlLabel
          control={<InputCheckbox checked={isCompetition} onChange={handleCompetition} />}
          label={<p className={textStyles.p}>{t('form.contest.checkboxLabel')}</p>}
        />
      )}

      <Collapse in={isCompetition} unmountOnExit>
        <div className={styles.form}>
          {ageGroupList.length > 1 && (
            <>
              <h4 className={textStyles.h4}>{t('form.contest.ageGroups.title')}:</h4>
              <FormInputSelect name='contestAgeGroup' control={control}>
                {ageGroupList.map((group) => (
                  <MenuItem key={group} value={group}>
                    {t(`form.contest.ageGroups.${group}`)}
                  </MenuItem>
                ))}
              </FormInputSelect>
            </>
          )}

          {contestLevels.length > 0 && (
            <>
              <h4 className={textStyles.h4}>{t('form.contest.levels.title')}:</h4>
              <FormInputSelect name='contestLevel' control={control}>
                {contestLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {t(`form.contest.levels.${level}`)}
                  </MenuItem>
                ))}
              </FormInputSelect>
            </>
          )}

          {/* Solo Pass selection */}
          <div>
            <h4 className={textStyles.h4}>{t('form.contest.soloPassTitle')}:</h4>
            <p className={textStyles.p}>{t('form.contest.solosPassDescription')}</p>
            <FormControlLabel
              control={<InputCheckbox checked={isSoloPass} onChange={handleSoloPass} />}
              label={
                <p className={textStyles.p}>
                  {t('form.contest.soloPassLabel')}
                  {': '}
                  <span className={textStyles.accent}>{getSoloPassPrice}€</span>
                </p>
              }
            />
          </div>

          <h4 className={textStyles.h4}>{t('form.contest.stylesTitle')}:</h4>
          <ContestSoloList />
        </div>
      </Collapse>

      <div className={styles.naviWrapper}>
        <Button
          type='button'
          variant='outlined'
          size='large'
          disableElevation
          fullWidth
          onClick={() => onStepSubmit('prev')}
        >
          {t('form.common.prev')}
        </Button>
        <Button
          type='button'
          variant='outlined'
          size='large'
          disableElevation
          fullWidth
          onClick={async () => {
            const isValid = await trigger();
            if (isValid) onStepSubmit('next');
          }}
        >
          {t('form.common.next')}
        </Button>
      </div>
    </div>
  );
};
