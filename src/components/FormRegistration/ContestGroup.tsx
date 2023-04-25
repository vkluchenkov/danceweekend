import useTranslation from 'next-translate/useTranslation';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import { GroupContest, FormFields } from './types';
import { Button, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormInputField, FormInputSelect } from '@/src/ui-kit/input';
import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { contestGroupPrice } from '@/src/ulis/price';
import clsx from 'clsx';
import { Style } from '@/src/ulis/contestCategories';
import { SupportedLangs } from '@/src/types';

interface ContestGroupProps {
  field: GroupContest & { id: string; index: number };
  onDelete: () => void;
  catStyles: Style[] | undefined;
}

export const ContestGroup: React.FC<ContestGroupProps> = ({ field, onDelete, catStyles }) => {
  const { t, lang } = useTranslation('registration');
  const currentLang = lang as SupportedLangs;

  const methods = useFormContext<FormFields>();
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  const version = watch('version');

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
    const price = field.qty * contestGroupPrice[version];
    setValue(`groupContest.${field.index}.price`, price);
  }, [setValue, field.qty, field.index, version]);

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
        control={control}
        label={t('form.contest.groups.groupOrDuo')}
        fullWidth
        name={`groupContest.${field.index}.type`}
      >
        <MenuItem value='duo'>{t('form.contest.groups.duo')}</MenuItem>
        <MenuItem value='group'>{t('form.contest.groups.group')}</MenuItem>
      </FormInputSelect>

      <FormInputSelect
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
        {catStyles?.map((style) => {
          const id = style.translations.en.categoryTitle;
          const title = style.translations[currentLang].categoryTitle;
          return (
            <MenuItem key={id} value={id}>
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
