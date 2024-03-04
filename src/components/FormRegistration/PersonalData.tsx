import useTranslation from 'next-translate/useTranslation';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Collapse, FormControlLabel } from '@mui/material';

import { FormInputCheckbox, FormInputField } from '@/src/ui-kit/input';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import { FormFields, PersonalStepProps, StepProps } from './types';
import { InputCheckbox } from '@/src/ui-kit/input/InputCheckbox';
import { useEffect } from 'react';

export const PersonalData: React.FC<PersonalStepProps> = ({ setIsNextDisabled }) => {
  const { t } = useTranslation('registration');

  const methods = useFormContext<FormFields>();
  const {
    control,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  const { fields } = useFieldArray({
    control,
    name: 'yearsBefore2',
    keyName: 'id',
  });

  const version = watch('version');
  const yearsBefore2 = watch('yearsBefore2');
  const beenBefore = watch('beenBefore');
  const yearsBeforeSelected = yearsBefore2.filter((year) => year.selected);

  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...yearsBefore2[index],
    };
  });

  // disable next if no years selected
  useEffect(() => {
    if (beenBefore && !yearsBeforeSelected.length) {
      setIsNextDisabled(true);
    } else setIsNextDisabled(false);
  }, [yearsBeforeSelected, beenBefore, setIsNextDisabled]);

  const handleYearChange = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const index = yearsBefore2.findIndex((cat) => cat.id === id);
    setValue(`yearsBefore2.${index}.selected`, checked, { shouldTouch: true });
  };

  const yearsFields = controlledFields.map((year) => {
    return (
      <div key={year.id}>
        <FormControlLabel
          control={
            <InputCheckbox
              checked={year.selected}
              onChange={handleYearChange.bind(null, year.id)}
            />
          }
          label={<p className={textStyles.p}>{year.year}</p>}
        />
      </div>
    );
  });

  return (
    <>
      <h2 className={textStyles.h2}>{t('form.personal.title')}</h2>
      <div className={styles.form}>
        <FormInputField
          name='name'
          label={t('form.personal.name')}
          control={control}
          rules={{
            required: t('form.common.required'),
            pattern: {
              value: /^[a-zA-ZÀ-ÖØ-ÝżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9\s\-]+$/,
              message: t('form.common.patternError'),
            },
          }}
          error={!!errors.name}
          helperText={errors?.name?.message as string | undefined}
        />

        <FormInputField
          name='surname'
          label={t('form.personal.surname')}
          control={control}
          rules={{
            required: t('form.common.required'),
            pattern: {
              value: /^[a-zA-ZÀ-ÖØ-ÝżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9\s\-]+$/,
              message: t('form.common.patternError'),
            },
          }}
          error={!!errors.surname}
          helperText={errors?.surname?.message as string | undefined}
        />
        {version === 'live' && (
          <>
            <FormInputField
              name='stageName'
              label={t('form.personal.stageName')}
              control={control}
              rules={{
                pattern: {
                  value: /^[a-zA-ZÀ-ÖØ-ÝżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9\s\-]+$/,
                  message: t('form.common.patternError'),
                },
              }}
              error={!!errors.stageName}
              helperText={errors?.stageName?.message as string | undefined}
            />

            <FormInputField
              name='age'
              type='tel'
              label={t('form.personal.age')}
              rules={{
                required: t('form.common.required'),
                min: {
                  value: 4,
                  message: t('form.personal.ageError'),
                },
                max: {
                  value: 99,
                  message: t('form.personal.ageError'),
                },
                pattern: {
                  value: /^\d+$/,
                  message: t('form.common.numbersError'),
                },
              }}
              control={control}
              error={!!errors.age}
              helperText={errors?.age?.message as string | undefined}
            />
            <FormInputCheckbox
              control={control}
              name='beenBefore'
              label={<p className={textStyles.p}>{t('form.personal.yearsBeforeTitle')} </p>}
            />
            <Collapse in={beenBefore} unmountOnExit>
              <div>
                <p className={textStyles.p} style={{ paddingBottom: '10px' }}>
                  {t('form.personal.yearsBefore')}:
                </p>
                <div className={styles.yearsWrapper}>{yearsFields}</div>
              </div>
            </Collapse>
          </>
        )}
      </div>

      <h2 className={textStyles.h2}>{t('form.personal.contacts')}</h2>

      <div className={styles.form}>
        <FormInputField
          name='email'
          label='Email'
          type='email'
          placeholder='user@example.com'
          control={control}
          rules={{
            required: t('form.common.required'),
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
              message: t('form.personal.emailError'),
            },
          }}
          error={!!errors.email}
          helperText={errors?.email?.message as string | undefined}
        />

        <FormInputField
          name='social'
          placeholder='instagram, facebook @danceweekendwarsaw'
          label={t('form.personal.social')}
          control={control}
          rules={{
            required: t('form.common.required'),
          }}
          error={!!errors.social}
          helperText={errors?.social?.message as string | undefined}
        />
        {version === 'live' && (
          <>
            <FormInputField
              name='country'
              label={t('form.personal.country')}
              control={control}
              rules={{
                required: t('form.common.required'),
              }}
              error={!!errors.country}
              helperText={errors?.country?.message as string | undefined}
            />

            <FormInputField
              name='city'
              label={t('form.personal.city')}
              control={control}
              rules={{
                required: t('form.common.required'),
              }}
              error={!!errors.city}
              helperText={errors?.city?.message as string | undefined}
            />

            <FormInputField
              name='tel'
              type='tel'
              placeholder='+48 123456789'
              label={t('form.personal.tel')}
              control={control}
              rules={{
                required: t('form.common.required'),
              }}
              error={!!errors.tel}
              helperText={errors?.tel?.message as string | undefined}
            />
          </>
        )}
      </div>
    </>
  );
};
