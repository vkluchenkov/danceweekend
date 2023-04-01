import useTranslation from 'next-translate/useTranslation';
import { useFormContext } from 'react-hook-form';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import { useEffect } from 'react';
import { Collapse, MenuItem } from '@mui/material';
import { ContestSoloStepProps, FormFields } from './types';
import { FormInputCheckbox, FormInputSelect } from '@/src/ui-kit/input';
import { getContestAgeGroupsList } from './helpers';
import { ContestSoloList } from './ContestSoloList';

export const ContestSolo: React.FC<ContestSoloStepProps> = ({
  setStepTotal,
  isEligible,
  soloPassPrice,
  setIsNextDisabled,
}) => {
  const { t } = useTranslation('registration');

  const methods = useFormContext<FormFields>();
  const {
    control,
    watch,
    trigger,
    setValue,
    resetField,
    formState: { errors },
  } = methods;

  const version = watch('version');
  const ageGroup = watch('ageGroup');
  const contestLevels = watch('contestLevels');
  const isSoloPass = watch('isSoloPass');
  const isSoloContest = watch('isSoloContest');
  const soloContest = watch('soloContest');
  const soloContestSelected = soloContest.filter((cat) => cat.selected);

  useEffect(() => {
    if (isSoloContest && !soloContestSelected.length) {
      setIsNextDisabled(true);
    } else setIsNextDisabled(false);
  }, [isSoloContest, soloContestSelected, setIsNextDisabled]);

  // Clear all contest entries on checkbox disable or if not eligible
  useEffect(() => {
    if ((!isSoloContest && soloContest.length > 0) || (!isEligible && soloContest.length > 0)) {
      soloContest.forEach((i) => (i.selected = false));
      setValue('isSoloPass', false);
      resetField('contestLevel');
      if (!isEligible && soloContest) setValue('isSoloContest', false);
    }
  }, [isSoloContest, soloContest, isEligible, setValue, resetField]);

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
      {!isEligible && <p>{t('form.contest.oops')}</p>}
      {isEligible && (
        <FormInputCheckbox
          control={control}
          name='isSoloContest'
          label={<p className={textStyles.p}>{t('form.contest.checkboxLabel')}</p>}
        />
      )}

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
          {ageGroup && ageGroup !== 'baby' && version === 'live' && (
            <div>
              <h4 className={textStyles.h4}>{t('form.contest.soloPassTitle')}:</h4>
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
              <p className={textStyles.p}>{t('form.contest.solosPassDescription')}</p>
            </div>
          )}

          <h4 className={textStyles.h4}>{t('form.contest.stylesTitle')}:</h4>
          <ContestSoloList />
        </div>
      </Collapse>
    </div>
  );
};
