import useTranslation from 'next-translate/useTranslation';
import { useFormContext } from 'react-hook-form';

import { FormInputField } from '@/src/ui-kit/input';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import { FormFields, StepProps } from './types';

export const PersonalData: React.FC<StepProps> = () => {
  const { t } = useTranslation('registration');

  const methods = useFormContext<FormFields>();
  const {
    control,
    trigger,
    watch,
    formState: { errors },
  } = methods;

  const version = watch('version');

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
            <div>
              <p className={textStyles.p} style={{ paddingBottom: '10px' }}>
                {t('form.personal.yearsBeforeTitle')}
              </p>
              <FormInputField
                name='yearsBefore'
                label={t('form.personal.yearsBefore')}
                placeholder='2016, 2017, 2023'
                control={control}
                error={!!errors.yearsBefore}
                helperText={errors?.yearsBefore?.message as string | undefined}
              />
            </div>
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
