import useTranslation from 'next-translate/useTranslation';
import { useFormContext } from 'react-hook-form';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import { useEffect, useMemo, useState } from 'react';
import { Button, Collapse, FormControlLabel, MenuItem } from '@mui/material';
import { ContestSoloStepProps, SoloContestField } from './types';
import { AgeGroup, SupportedLangs } from '@/src/types';
import { InputCheckbox } from '@/src/ui-kit/input/InputCheckbox';
import { FormInputSelect } from '@/src/ui-kit/input';
import { getAgeGroup } from '@/src/ulis/getAgeGroup';
import { getContestAgeGroupsList } from './helpers';
import { Level } from '@/src/ulis/contestCategories';

export const ContestSolo: React.FC<ContestSoloStepProps> = ({
  onStepSubmit,
  setStepTotal,
  currentPricePeriod,
  isEligible,
}) => {
  const { t, lang } = useTranslation('registration');
  const currentLang = lang as SupportedLangs;

  const [isCompetition, setIsCompetition] = useState(false);

  const methods = useFormContext();
  const {
    handleSubmit,
    setValue,
    control,
    watch,
    trigger,
    formState: { errors },
  } = methods;

  const contestAgeGroup: AgeGroup | null = watch('contestAgeGroup');
  const ageGroup: AgeGroup | null = watch('ageGroup');
  const contestLevels: Level[] = watch('contestLevels');

  const ageGroupList = getContestAgeGroupsList(ageGroup);

  const handleCompetition = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
    setIsCompetition(checked);

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
