import { useState, useCallback } from 'react';
import { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { FormProvider, useForm } from 'react-hook-form';
import axios from 'axios';
import Button from '@mui/material/Button';
import { ThemeProvider, Snackbar, Alert, MenuItem } from '@mui/material';

import { Layout } from '@/src/components/Layout';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import { FormInputField, FormInputSelect } from '@/src/ui-kit/input';
import { Loader } from '@/src/components/Loader';
import { darkTheme } from '@/src/ulis/constants';
import { PaymentConfirmFields } from '@/src/types/payment.types';

const PaymentConfirm: NextPage = () => {
  const { t } = useTranslation('paymentConfirm');

  const methods = useForm<PaymentConfirmFields>({
    mode: 'onChange',
  });
  const {
    handleSubmit,
    watch,
    trigger,
    reset,
    control,
    formState: { errors },
  } = methods;

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  // Handle snackbar close
  const handleClose = useCallback((event?: React.SyntheticEvent | Event, reason?: string) => {
    // if (reason === 'clickaway') return;
    setIsError(false);
    setIsSuccess(false);
  }, []);

  const onSubmit = useCallback(
    async (data: PaymentConfirmFields) => {
      setIsLoading(true);
      try {
        await axios.post('/api/payment-confirm', data);
        setIsSuccess(true);
        reset();
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [reset]
  );

  return (
    <Layout title={t('pageTitle')}>
      <h1 className={textStyles.h1}>{t('pageTitle')}</h1>

      <section className={styles.section}>
        <ThemeProvider theme={darkTheme}>
          <FormProvider {...methods}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <FormInputField
                name='name'
                control={control}
                rules={{
                  required: t('form.required'),
                }}
                label={t('form.name')}
                error={!!errors.name}
                helperText={errors.name?.message as string | undefined}
              />

              <FormInputField
                name='email'
                type='email'
                control={control}
                rules={{
                  required: t('form.required'),
                }}
                label={t('form.email')}
                error={!!errors.email}
                helperText={errors.email?.message as string | undefined}
              />

              <FormInputSelect
                name='lang'
                control={control}
                label={t('form.lang')}
                rules={{
                  required: t('form.required'),
                }}
                error={!!errors.lang}
                helperText={errors?.lang?.message as string | undefined}
              >
                <MenuItem value='en'>{t('form.en')}</MenuItem>
                <MenuItem value='ru'>{t('form.ru')}</MenuItem>
              </FormInputSelect>

              <FormInputField
                name='password'
                type='password'
                control={control}
                rules={{
                  required: t('form.required'),
                }}
                label={t('form.password')}
                error={!!errors.password}
                helperText={errors.password?.message as string | undefined}
              />

              <Button
                type='submit'
                variant='outlined'
                size='large'
                disableElevation
                fullWidth
                disabled={false}
              >
                {t('form.submit')}
              </Button>

              <Snackbar
                open={isError}
                onClose={handleClose}
                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
              >
                <Alert severity='warning' onClose={handleClose} variant='filled'>
                  {t('form.error')}
                </Alert>
              </Snackbar>

              <Snackbar
                open={isSuccess}
                onClose={handleClose}
                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
              >
                <Alert severity='success' onClose={handleClose} variant='filled'>
                  {t('form.success')}
                </Alert>
              </Snackbar>
            </form>
            {isLoading && <Loader />}
          </FormProvider>
        </ThemeProvider>
      </section>
    </Layout>
  );
};

export default PaymentConfirm;
