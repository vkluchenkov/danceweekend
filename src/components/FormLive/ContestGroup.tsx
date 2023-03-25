import useTranslation from 'next-translate/useTranslation';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import { GroupContest } from './types';
import { MenuItem } from '@mui/material';
import { FormInputField, FormInputSelect } from '@/src/ui-kit/input';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import { contestGroupPrice } from '@/src/ulis/price';

interface ContestGroupProps {
  field: GroupContest & { id: string; index: number };
}

export const ContestGroup: React.FC<ContestGroupProps> = ({ field }) => {
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
    <div className={styles.form}>
      <h4 className={textStyles.h4}>{t('form.contest.groups.chooseType')}:</h4>

      <FormInputSelect control={control} fullWidth name={`groupContest[${field.index}].type`}>
        <MenuItem value='duo'>{t('form.contest.groups.duo')}</MenuItem>
        <MenuItem value='group'>{t('form.contest.groups.group')}</MenuItem>
      </FormInputSelect>

      <FormInputField
        control={control}
        type='tel'
        label={t('form.contest.groups.qty')}
        name={`groupContest[${field.index}].qty`}
      />

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
    </div>
  );
};
