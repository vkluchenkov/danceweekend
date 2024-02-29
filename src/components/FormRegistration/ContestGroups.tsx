import { useCallback, useEffect, useMemo } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button, Collapse } from '@mui/material';

import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import { ContestGroupStepProps, FormFields, GroupContest } from './types';
import { ContestGroup } from './ContestGroup';
import { maxGroups } from '@/src/ulis/constants';
import { contestCategories } from '@/src/ulis/contestCategories';
import { FormInputCheckbox } from '@/src/ui-kit/input';

export const ContestGroups: React.FC<ContestGroupStepProps> = ({
  setStepTotal,
  lastDirection,
  onStepSubmit,
}) => {
  const { t } = useTranslation('registration');

  const methods = useFormContext<FormFields>();
  const { control, watch, trigger, setValue, clearErrors } = methods;

  const { fields } = useFieldArray({
    control,
    name: 'groupContest',
    keyName: 'id',
  });

  const groupContest = watch('groupContest');
  const contestAgeGroup = watch('contestAgeGroup');
  const contestLevel = watch('contestLevel');
  const isGroupContest = watch('isGroupContest');
  const version = watch('version');
  const settings = watch('settings');

  const defaultGroup: GroupContest = useMemo(() => {
    return {
      type: 'duo',
      ageGroup: contestAgeGroup,
      level: contestLevel,
      styles: [],
      style: '',
      qty: 2,
      name: '',
      price: settings?.price.contest?.contestGroupPrice! * 2, //qty
    };
    //eslint-disable-next-line
  }, []);

  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...groupContest[index],
      index,
    };
  });

  // clean contest group competition state if not empty
  // useEffect(() => {
  //     if (groupContest.length > 0) {
  //       setValue('isGroupContest', false);
  //       setValue('groupContest', []);
  //     }
  //     if (lastDirection) onStepSubmit(lastDirection);
  // });

  // Set first group fields and clear all group fields and errors on checkbox change
  useEffect(() => {
    if (isGroupContest && groupContest.length === 0) {
      setValue('groupContest', [defaultGroup]);
    }
    if (!isGroupContest && groupContest.length > 0) {
      setValue('groupContest', []);
      clearErrors();
    }
  }, [setValue, defaultGroup, clearErrors, groupContest, isGroupContest]);

  useEffect(() => {
    const res = controlledFields.reduce((prev, current) => {
      return prev + current.price;
    }, 0);
    setStepTotal(res);
  }, [controlledFields, setStepTotal]);

  const handleMore = useCallback(async () => {
    const isFormValid = await trigger();
    if (isFormValid) setValue('groupContest', [...groupContest, defaultGroup]);
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

  const groups = controlledFields.map((field) => {
    const isDuoType = field.type === 'duo';
    const isGroupType = field.type === 'group';

    const contestCategory = contestCategories.find(
      (cat) =>
        (cat.ageGroup === contestAgeGroup && cat.isDuoCategory === isDuoType) ||
        cat.isGroupCategory === isGroupType
    );

    return (
      <ContestGroup
        field={field}
        key={field.id}
        catStyles={contestCategory?.categories}
        onDelete={() => handleDelete(field.id)}
      />
    );
  });

  return (
    <div className={styles.form}>
      <h2 className={textStyles.h2}>{t('form.contest.groups.title')}</h2>
      <FormInputCheckbox
        name='isGroupContest'
        control={control}
        label={<p className={textStyles.p}>{t('form.contest.groups.checkboxLabel')}</p>}
      />

      <Collapse in={isGroupContest} unmountOnExit>
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
    </div>
  );
};
