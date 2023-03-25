import React, { useMemo } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useFieldArray, useFormContext } from 'react-hook-form';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import { useCallback, useEffect, useState } from 'react';
import { Button, Collapse, FormControlLabel } from '@mui/material';
import { ContestGroupStepProps, GroupContest } from './types';
import { InputCheckbox } from '@/src/ui-kit/input/InputCheckbox';
import { ContestGroup } from './ContestGroup';

export const ContestGroups: React.FC<ContestGroupStepProps> = ({ onStepSubmit, setStepTotal }) => {
  const { t } = useTranslation('registration');

  const [isGroup, setIsGroup] = useState(false);

  const methods = useFormContext();
  const { control, watch, trigger, setValue } = methods;

  const { fields } = useFieldArray({
    control,
    name: 'groupContest',
    keyName: 'id',
  });

  const defaultGroup: GroupContest = useMemo(() => {
    return {
      type: 'duo',
      qty: 2,
      name: '',
      price: 0,
    };
  }, []);

  const groupContest: GroupContest[] = watch('groupContest');

  const controlledFields = fields.map((field, index) => {
    const isLast: boolean = index === fields.length - 1;
    return {
      ...field,
      ...groupContest[index],
      index,
      isLast,
    };
  });

  useEffect(() => {
    if (isGroup) setValue('groupContest', [defaultGroup]);
    else setValue('groupContest', []);
  }, [isGroup, setValue, defaultGroup]);

  const handleMore = useCallback(() => {
    setValue('groupContest', [...groupContest, defaultGroup]);
  }, [groupContest, setValue, defaultGroup]);

  const handleGroup = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
    setIsGroup(checked);

  const groups = controlledFields.map((field) => (
    <ContestGroup field={field} key={field.id} onMore={handleMore} isLast={field.isLast} />
  ));

  return (
    <div className={styles.form}>
      <h2 className={textStyles.h2}>{t('form.contest.groups.title')}</h2>

      <FormControlLabel
        control={<InputCheckbox checked={isGroup} onChange={handleGroup} />}
        label={<p className={textStyles.p}>{t('form.contest.groups.checkboxLabel')}</p>}
      />

      <Collapse in={isGroup} unmountOnExit>
        <div className={styles.form}>{groups}</div>
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
