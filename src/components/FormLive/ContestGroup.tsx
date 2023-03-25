import useTranslation from 'next-translate/useTranslation';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import { GroupContest } from './types';
import { Button, MenuItem } from '@mui/material';
import { FormInputField, FormInputSelect } from '@/src/ui-kit/input';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import { contestGroupPrice } from '@/src/ulis/price';
import clsx from 'clsx';
import { maxGroups } from '@/src/ulis/constants';

interface ContestGroupProps {
  field: GroupContest & { id: string; index: number };
  onMore: () => void;
  isLast: boolean;
}

export const ContestGroup: React.FC<ContestGroupProps> = ({ field, onMore, isLast }) => {
  const { t } = useTranslation('registration');
  const methods = useFormContext();
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  const groupContest: GroupContest[] = watch('groupContest');

  useEffect(() => {
    setValue(`groupContest.${field.index}.price`, field.qty * contestGroupPrice.live);
  }, [groupContest, setValue, field]);

  return (
    <div className={clsx(styles.form, styles.groupItem)}>
      <h3 className={textStyles.h3}>
        {t('form.contest.groups.group')}/{t('form.contest.groups.duo')} #{field.index + 1} :
      </h3>

      <FormInputSelect control={control} fullWidth name={`groupContest[${field.index}].type`}>
        <MenuItem value='duo'>{t('form.contest.groups.duo')}</MenuItem>
        <MenuItem value='group'>{t('form.contest.groups.group')}</MenuItem>
      </FormInputSelect>

      {field.type !== 'duo' && (
        <FormInputField
          control={control}
          type='tel'
          label={t('form.contest.groups.qty')}
          name={`groupContest[${field.index}].qty`}
        />
      )}

      <FormInputField
        control={control}
        label={t('form.contest.groups.name')}
        name={`groupContest[${field.index}].name`}
        rules={{
          required: t('form.common.required'),
        }}
        // error={!!errors?.groupContest[index].name}
        // helperText={`errors.groupContest[${field.index}].name.message` as string | undefined}
      />

      <p className={textStyles.p}>
        {t('form.contest.groups.price')}: <span className={textStyles.accent}>{field.price}€</span>
      </p>

      {/* Limit number of groups available for registration */}
      {isLast && field.index + 1 < maxGroups && (
        <Button type='button' variant='outlined' size='large' disableElevation onClick={onMore}>
          {t('form.contest.groups.add')}
        </Button>
      )}
    </div>
  );
};
