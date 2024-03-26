import { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, MenuItem } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';

import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import { GroupContest, FormFields } from './types';
import { FormInputField, FormInputSelect } from '@/src/ui-kit/input';
import { contestCategories } from '@/src/ulis/contestCategories';
import { ageGroupArray, SupportedLangs } from '@/src/types';

interface ContestGroupProps {
  field: GroupContest & { id: string; index: number };
  onDelete: () => void;
}

export const ContestGroup: React.FC<ContestGroupProps> = ({ field, onDelete }) => {
  const { t, lang } = useTranslation('registration');
  const currentLang = lang as SupportedLangs;

  const methods = useFormContext<FormFields>();
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  const settings = watch('settings');
  const ageGroup = watch(`groupContest.${field.index}.ageGroup`);

  const fieldErrors = errors.groupContest?.[field.index];

  const [changed, setChanged] = useState(false);

  // Set min number of group dancers after select change (once)
  useEffect(() => {
    if (field.type === 'group' && field.qty < 3 && !changed) {
      setValue(`groupContest.${field.index}.qty`, 3);
      setChanged(true);
    }
  }, [field.type, setValue, field.index, field.qty, changed]);

  // Set number of dancers in duo to 2 after select change and reset change flag
  useEffect(() => {
    if (field.type === 'duo') {
      setValue(`groupContest.${field.index}.qty`, 2);
      setChanged(false);
    }
  }, [field.type, setValue, field.index]);

  // Calculate selection price
  useEffect(() => {
    const price = field.qty * settings?.price.contest?.contestGroupPrice!;
    setValue(`groupContest.${field.index}.price`, price);
  }, [setValue, field.qty, field.index, settings]);

  const contestCategory = contestCategories.find(
    (cat) => cat.ageGroup === ageGroup && (cat.isDuoCategory || cat.isGroupCategory)
  );

  return (
    <div className={clsx(styles.form)}>
      <div className={styles.group__header}>
        <h3 className={textStyles.h3}>
          {t('form.contest.groups.group')} / {t('form.contest.groups.duo')} #{field.index + 1} :
        </h3>
        {field.index > 0 && (
          <Button
            type='button'
            variant='text'
            startIcon={<DeleteIcon />}
            size='small'
            disableElevation
            onClick={onDelete}
          >
            {t('form.contest.groups.remove')}
          </Button>
        )}
      </div>

      <FormInputSelect
        translate='no'
        control={control}
        label={t('form.contest.groups.groupOrDuo')}
        fullWidth
        name={`groupContest.${field.index}.type`}
      >
        <MenuItem value='duo' translate='no'>
          {t('form.contest.groups.duo')}
        </MenuItem>
        <MenuItem value='group' translate='no'>
          {t('form.contest.groups.group')}
        </MenuItem>
      </FormInputSelect>

      <FormInputSelect
        translate='no'
        name={`groupContest.${field.index}.ageGroup`}
        control={control}
        label={t('form.contest.groups.ageGroupTitle')}
        rules={{
          required: t('form.common.required'),
        }}
        error={!!fieldErrors?.style}
        helperText={fieldErrors?.style?.message as string | undefined}
      >
        {ageGroupArray.map((group) => (
          <MenuItem key={group} value={group} translate='no'>
            {t(`form.contest.ageGroups.${group}`)}
          </MenuItem>
        ))}
      </FormInputSelect>

      <FormInputSelect
        translate='no'
        control={control}
        label={t('form.contest.groups.style')}
        fullWidth
        name={`groupContest.${field.index}.style`}
        rules={{
          required: t('form.common.required'),
        }}
        error={!!fieldErrors?.style}
        helperText={fieldErrors?.style?.message as string | undefined}
      >
        {contestCategory?.categories?.map((style) => {
          const id = style.translations.en.categoryTitle;
          const title = style.translations[currentLang].categoryTitle;
          return (
            <MenuItem key={id} value={id} translate='no'>
              {title}
            </MenuItem>
          );
        })}
      </FormInputSelect>

      {field.type !== 'duo' && (
        <FormInputField
          control={control}
          type='tel'
          label={t('form.contest.groups.qty')}
          name={`groupContest.${field.index}.qty`}
          rules={{
            required: t('form.common.required'),
            min: {
              value: 3,
              message: t('form.contest.groups.qtyError'),
            },
          }}
          error={!!fieldErrors?.qty}
          helperText={fieldErrors?.qty?.message as string | undefined}
        />
      )}

      <FormInputField
        control={control}
        label={t('form.contest.groups.name')}
        name={`groupContest.${field.index}.name`}
        rules={{
          required: t('form.common.required'),
        }}
        error={!!fieldErrors?.name}
        helperText={fieldErrors?.name?.message as string | undefined}
      />

      <p className={textStyles.p}>
        {t('form.contest.groups.price')}: <span className={textStyles.accent}>{field.price}€</span>
      </p>
    </div>
  );
};
