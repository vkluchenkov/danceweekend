import React, { useMemo } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useFieldArray, useFormContext } from 'react-hook-form';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import { useCallback, useEffect, useState } from 'react';
import { Button, Collapse, FormControlLabel } from '@mui/material';

import { ContestGroupStepProps, FormFields, GroupContest } from './types';
import { InputCheckbox } from '@/src/ui-kit/input/InputCheckbox';
import { ContestGroup } from './ContestGroup';
import { contestGroupPrice } from '@/src/ulis/price';
import { maxGroups } from '@/src/ulis/constants';
import { contestCategories } from '@/src/ulis/contestCategories';

export const ContestGroups: React.FC<ContestGroupStepProps> = ({
  onStepSubmit,
  setStepTotal,
  isEligible,
}) => {
  const { t } = useTranslation('registration');

  const [isGroup, setIsGroup] = useState(false);

  const methods = useFormContext<FormFields>();
  const { control, watch, trigger, setValue, clearErrors } = methods;

  const { fields } = useFieldArray({
    control,
    name: 'groupContest',
    keyName: 'id',
  });

  const defaultGroup: GroupContest = useMemo(() => {
    return {
      type: 'duo',
      styles: [],
      style: '',
      qty: 2,
      name: '',
      price: contestGroupPrice.live * 2, //qty
    };
  }, []);

  const groupContest = watch('groupContest');
  const contestAgeGroup = watch('contestAgeGroup');

  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...groupContest[index],
      index,
    };
  });

  useEffect(() => {
    contestAgeGroup === 'baby' && onStepSubmit('next');
  }, []);

  // Set first group fields and clear all group fields and errors on checkbox change
  useEffect(() => {
    if (isGroup) setValue('groupContest', [defaultGroup]);
    else {
      setValue('groupContest', []);
      clearErrors();
    }
  }, [isGroup, setValue, defaultGroup, clearErrors]);

  useEffect(() => {
    const res = controlledFields.reduce((prev, current) => {
      return prev + current.price;
    }, 0);
    setStepTotal(res);
  }, [controlledFields, setStepTotal]);

  const handleMore = useCallback(async () => {
    const isValid = await trigger();
    if (isValid) setValue('groupContest', [...groupContest, defaultGroup]);
  }, [groupContest, setValue, defaultGroup, trigger]);

  const handleDelete = useCallback(
    (id: string) => {
      const copy = controlledFields.slice();
      const index = copy.findIndex((i) => i.id === id);
      if (index >= 0) {
        copy.splice(index, 1);
        setValue('groupContest', [...copy]);
      }
    },
    [controlledFields, setValue]
  );

  const handleGroup = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
    setIsGroup(checked);

  const groups = controlledFields.map((field) => {
    const isDuo = field.type === 'duo';
    const isGroup = field.type === 'group';

    const contestCategory = contestCategories.find(
      (cat) => (cat.ageGroup === contestAgeGroup && cat.isDuo === isDuo) || cat.isGroup === isGroup
    );

    const catStyles = contestCategory?.categories.filter((style) => style.types.includes('live'));

    return (
      <ContestGroup
        field={field}
        key={field.id}
        catStyles={catStyles}
        onDelete={() => handleDelete(field.id)}
      />
    );
  });

  return (
    <div className={styles.form}>
      <h2 className={textStyles.h2}>{t('form.contest.groups.title')}</h2>
      {!isEligible && <p>{t('form.contest.oops')}</p>}

      {isEligible && (
        <>
          <FormControlLabel
            control={<InputCheckbox checked={isGroup} onChange={handleGroup} />}
            label={<p className={textStyles.p}>{t('form.contest.groups.checkboxLabel')}</p>}
          />

          <Collapse in={isGroup} unmountOnExit>
            <div className={styles.form}>{groups}</div>

            {groupContest.length && groupContest.length < maxGroups && (
              <Button
                type='button'
                variant='outlined'
                fullWidth
                size='large'
                disableElevation
                onClick={handleMore}
              >
                {t('form.contest.groups.add')}
              </Button>
            )}
          </Collapse>
        </>
      )}

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
