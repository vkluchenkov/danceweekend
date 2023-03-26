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

interface ContestGroupProps {
  field: GroupContest & { id: string; index: number };
  onDelete: () => void;
}

export const ContestGroup: React.FC<ContestGroupProps> = ({ field, onDelete }) => {
  const { t } = useTranslation('registration');
  const methods = useFormContext<FormFields>();
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  const [changed, setChanged] = useState(false);

  const fieldErrors = errors.groupContest?.[field.index];

  useEffect(() => {
    const price = field.qty * contestGroupPrice.live;
    setValue(`groupContest.${field.index}.price`, price);
  }, [setValue, field.qty, field.index]);

  useEffect(() => {
    if (field.type === 'duo') {
      setValue(`groupContest.${field.index}.qty`, 2);
      setChanged(false);
    }
  }, [field.type, setValue, field.index]);

  useEffect(() => {
    if (field.type === 'group' && field.qty < 3 && !changed) {
      setValue(`groupContest.${field.index}.qty`, 3);
      setChanged(true);
    }
  }, [field.type, setValue, field.index, field.qty, changed]);

  return (
    <div className={clsx(styles.form)}>
      <div className={styles.group__header}>
        <h3 className={textStyles.h3}>
          {t('form.contest.groups.group')}/{t('form.contest.groups.duo')} #{field.index + 1} :
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

      <FormInputSelect control={control} fullWidth name={`groupContest.${field.index}.type`}>
        <MenuItem value='duo'>{t('form.contest.groups.duo')}</MenuItem>
        <MenuItem value='group'>{t('form.contest.groups.group')}</MenuItem>
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
