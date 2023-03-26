import useTranslation from 'next-translate/useTranslation';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import { GroupContest } from './types';
import { Button, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormInputField, FormInputSelect } from '@/src/ui-kit/input';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import { contestGroupPrice } from '@/src/ulis/price';
import clsx from 'clsx';

interface ContestGroupProps {
  field: GroupContest & { id: string; index: number };
  onDelete: () => void;
}

export const ContestGroup: React.FC<ContestGroupProps> = ({ field, onDelete }) => {
  const { t } = useTranslation('registration');
  const methods = useFormContext();
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  useEffect(() => {
    const price = field.qty * contestGroupPrice.live;
    setValue(`groupContest.${field.index}.price`, price);
  }, [setValue, field.qty, field.index]);

  useEffect(() => {
    if (field.type === 'duo') setValue(`groupContest.${field.index}.qty`, 2);
  }, [field.type, setValue, field.index]);

  const fieldErros = errors.groupContest;

  console.log(errors);

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
            min: 3,
          }}
        />
      )}

      <FormInputField
        control={control}
        label={t('form.contest.groups.name')}
        name={`groupContest.${field.index}.name`}
        required
        rules={{
          required: t('form.common.required'),
        }}
        // error={fieldErros && !!fieldErros[field.index].name}
        // helperText={`errors.groupContest[${field.index}].name.message` as string | undefined}
      />

      <p className={textStyles.p}>
        {t('form.contest.groups.price')}: <span className={textStyles.accent}>{field.price}€</span>
      </p>
    </div>
  );
};
