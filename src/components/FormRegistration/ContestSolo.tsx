import useTranslation from 'next-translate/useTranslation';
import { useFormContext } from 'react-hook-form';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Collapse, MenuItem } from '@mui/material';

import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import { ContestSoloStepProps, FormFields } from './types';
import { FormInputCheckbox, FormInputSelect } from '@/src/ui-kit/input';
import { getContestAgeGroupsList } from './helpers';
import { ContestSoloList } from './ContestSoloList';

export const ContestSolo: React.FC<ContestSoloStepProps> = ({
  setStepTotal,
  soloPassPrice,
  setIsNextDisabled,
}) => {
  const { t } = useTranslation('registration');

  const methods = useFormContext<FormFields>();
  const {
    control,
    watch,
    setValue,
    resetField,
    formState: { errors },
  } = methods;

  const ageGroup = watch('ageGroup');
  const contestAgeGroup = watch('contestAgeGroup');
  const contestLevels = watch('contestLevels');
  const contestLevel = watch('contestLevel');
  const isSoloPass = watch('isSoloPass');
  const isSoloContest = watch('isSoloContest');
  const soloContest = watch('soloContest');
  const soloContestSelected = soloContest.filter((cat) => cat.selected);

  const [isInitialized, setIsInitialized] = useState(false);

  // disable next if none selected
  useEffect(() => {
    if (isSoloContest && !soloContestSelected.length) {
      setIsNextDisabled(true);
    } else setIsNextDisabled(false);
  }, [isSoloContest, soloContestSelected, setIsNextDisabled]);

  const cleanup = useCallback(() => {
    // clear all stlyes
    if (soloContest.length > 0) soloContest.forEach((i) => (i.selected = false));
    // clear solo pass
    setValue('isSoloPass', false);
    // set level to default
    if (contestAgeGroup === 'baby' || contestAgeGroup === 'seniors')
      setValue('contestLevel', 'openLevel');
    else {
      resetField('contestLevel');
    }
  }, [contestAgeGroup, soloContest, setValue, resetField]);

  // Clear all contest entries on checkbox off
  useEffect(() => {
    if (!isSoloContest) {
      // console.log('cleaning up because of checkbox');
      cleanup();
    }
    // want to run this ONLY on chackbox change
    // eslint-disable-next-line
  }, [isSoloContest]);

  // Clear all contest entries on age change and styles remapping
  useEffect(() => {
    // making sure it's not running on component init
    if (!isInitialized) setIsInitialized(true);
    else {
      // console.log('cleaning up because of age / styles change');
      cleanup();
    }
    // want to run this ONLY on age change
    // eslint-disable-next-line
  }, [contestAgeGroup, soloContest]);

  // Set step total
  useEffect(() => {
    let total = 0;
    if (isSoloPass) total = total + soloPassPrice;
    if (soloContestSelected) {
      const catsPrice = soloContestSelected.reduce((prev, current) => prev + current.price, 0);
      total = total + catsPrice;
    }
    setStepTotal(total);
  }, [isSoloPass, soloPassPrice, soloContestSelected, setStepTotal]);

  const ageGroupList = useMemo(() => {
    return getContestAgeGroupsList(ageGroup);
  }, [ageGroup]);

  const contestLevelsList = useMemo(() => {
    return contestLevels.map((level) => (
      <MenuItem key={level} value={level}>
        {t(`form.contest.levels.${level}`)}
      </MenuItem>
    ));
  }, [contestLevels, t]);

  return (
    <div className={styles.form}>
      <h2 className={textStyles.h2}>{t('form.contest.soloTitle')}</h2>

      <FormInputCheckbox
        control={control}
        name='isSoloContest'
        label={<p className={textStyles.p}>{t('form.contest.checkboxLabel')}</p>}
      />

      <Collapse in={isSoloContest} unmountOnExit>
        <div className={styles.form}>
          {ageGroupList.length > 1 && (
            <FormInputSelect
              name='contestAgeGroup'
              control={control}
              label={t('form.contest.ageGroups.title')}
              rules={{
                required: t('form.common.required'),
              }}
              error={!!errors?.contestAgeGroup}
              helperText={errors?.contestAgeGroup?.message as string | undefined}
            >
              {ageGroupList.map((group) => (
                <MenuItem key={group} value={group}>
                  {t(`form.contest.ageGroups.${group}`)}
                </MenuItem>
              ))}
            </FormInputSelect>
          )}

          {contestLevels.length > 0 && (
            <FormInputSelect
              name='contestLevel'
              control={control}
              label={t('form.contest.levels.title')}
              rules={{
                required: t('form.common.required'),
              }}
              error={!!errors?.contestLevel}
              helperText={errors?.contestLevel?.message as string | undefined}
            >
              {contestLevelsList}
            </FormInputSelect>
          )}

          {/* Solo Pass selection */}
          <Collapse in={!!contestLevel && contestLevel !== 'debut'} unmountOnExit>
            <div>
              <h4 className={textStyles.h4}>{t('form.contest.soloPassTitle')}:</h4>
              <p className={textStyles.p}>{t('form.contest.solosPassDescription')}</p>
              <FormInputCheckbox
                name='isSoloPass'
                control={control}
                label={
                  <p className={textStyles.p}>
                    {t('form.contest.soloPassLabel')}
                    {': '}
                    <span className={textStyles.accent}>
                      {soloPassPrice > 0 ? soloPassPrice + '€' : ''}
                    </span>
                  </p>
                }
              />
            </div>
          </Collapse>
          {/* Styles selection */}
          <Collapse in={!!soloContest.length} unmountOnExit>
            <h4 className={textStyles.h4}>{t('form.contest.stylesTitle')}:</h4>
            <ContestSoloList />
          </Collapse>
        </div>
      </Collapse>
    </div>
  );
};
