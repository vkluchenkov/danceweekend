import useTranslation from 'next-translate/useTranslation';
import { useFormContext } from 'react-hook-form';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import { useEffect, useState } from 'react';
import { Button, Collapse, FormControlLabel, MenuItem } from '@mui/material';
import { ContestSoloStepProps, SoloContestField } from './types';
import { AgeGroup } from '@/src/types';
import { InputCheckbox } from '@/src/ui-kit/input/InputCheckbox';
import { FormInputSelect } from '@/src/ui-kit/input';
import { getContestAgeGroupsList } from './helpers';
import { Level } from '@/src/ulis/contestCategories';
import { ContestSoloList } from './ContestSoloList';

export const ContestSolo: React.FC<ContestSoloStepProps> = ({
  onStepSubmit,
  setStepTotal,
  isEligible,
  soloPassPrice,
}) => {
  const { t } = useTranslation('registration');

  const [isCompetition, setIsCompetition] = useState(false);

  const methods = useFormContext();
  const { control, watch, trigger, setValue } = methods;

  const ageGroup: AgeGroup | null = watch('ageGroup');
  const contestLevels: Level[] = watch('contestLevels');
  const isSoloPass: boolean = watch('isSoloPass');
  const soloContest: SoloContestField = watch('soloContest');
  const soloContestSelected = soloContest.filter((cat) => cat.selected);

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

  const handleCompetition = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
    setIsCompetition(checked);

  const handleSoloPass = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
    setValue('isSoloPass', checked);

  return (
    <div className={styles.form}>
      <h2 className={textStyles.h2}>{t('form.contest.soloTitle')}</h2>
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
            <FormControlLabel
              control={<InputCheckbox checked={isSoloPass} onChange={handleSoloPass} />}
              label={
                <p className={textStyles.p}>
                  {t('form.contest.soloPassLabel')}
                  {': '}
                  <span className={textStyles.accent}>{soloPassPrice}€</span>
                </p>
              }
            />
            <p className={textStyles.p}>{t('form.contest.solosPassDescription')}</p>
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
          disabled={isCompetition && !soloContestSelected.length}
        >
          {t('form.common.next')}
        </Button>
      </div>
    </div>
  );
};
