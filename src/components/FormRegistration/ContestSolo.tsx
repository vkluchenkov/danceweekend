import useTranslation from 'next-translate/useTranslation';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
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
  const contestLevels = watch('contestLevels');
  const contestLevel = watch('contestLevel');
  const isSoloPass = watch('isSoloPass');
  const isSoloContest = watch('isSoloContest');
  const soloContest = watch('soloContest');
  const soloContestSelected = soloContest.filter((cat) => cat.selected);

  // disable next if none selected
  useEffect(() => {
    if (isSoloContest && !soloContestSelected.length) {
      setIsNextDisabled(true);
    } else setIsNextDisabled(false);
  }, [isSoloContest, soloContestSelected, setIsNextDisabled]);

  // Clear all contest entries on checkbox disable
  useEffect(() => {
    if (!isSoloContest && soloContest.length > 0) {
      soloContest.forEach((i) => (i.selected = false));
      setValue('isSoloPass', false);
      resetField('contestLevel');
      if (soloContest) setValue('isSoloContest', false);
    }
  }, [isSoloContest, soloContest, setValue, resetField]);

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

  const ageGroupList = getContestAgeGroupsList(ageGroup);

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
              {contestLevels.map((level) => (
                <MenuItem key={level} value={level}>
                  {t(`form.contest.levels.${level}`)}
                </MenuItem>
              ))}
            </FormInputSelect>
          )}

          {/* Solo Pass selection */}
          <Collapse in={contestLevel !== 'debut'} unmountOnExit>
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
