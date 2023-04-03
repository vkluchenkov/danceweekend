import { useState } from 'react';
import { Layout } from '@/src/components/Layout';
import { NextPage } from 'next';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import useTranslation from 'next-translate/useTranslation';
import { FormInputField, FormInputSelect } from '@/src/ui-kit/input';
import { FormProvider, useForm } from 'react-hook-form';
import { PaymentFormFields } from '@/src/types/payment.types';
import {
  createTheme,
  ThemeProvider,
  MenuItem,
  InputAdornment,
  Collapse,
  Snackbar,
  Alert,
} from '@mui/material';
import { montserrat } from '@/src/ulis/font';

import { PayPalButtons } from '@paypal/react-paypal-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { Loader } from '@/src/components/Loader';

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
const stripePromise = loadStripe(stripeKey);

const Payment: NextPage = () => {
  const { t, lang } = useTranslation('payment');
  const router = useRouter();

  const methods = useForm<PaymentFormFields>({
    mode: 'onChange',
  });
  const {
    handleSubmit,
    setValue,
    watch,
    trigger,
    control,
    formState: { errors },
  } = methods;

  const [isLoading, setIsLoading] = useState(false);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

  const form = watch();
  const qty = watch('qty');
  const method = watch('method');

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#eec571',
      },
      mode: 'dark',
    },
    typography: {
      fontFamily: montserrat.style.fontFamily,
    },
  });

  // Handle snackbar close
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setIsSnackBarOpen(false);
  };

  const onSubmit = async (data: PaymentFormFields) => {
    setIsLoading(true);

    try {
      await axios.post('/api/payment-submit', data);

      if (method === 'stripe') {
        await axios
          .post('/api/stripe-session', data)
          .then((res) => window.open(res.data.url as string, '_self'));
      }

      if (method === 'paypal') router.push('/payment/thank-you');
    } catch (error) {
      setIsLoading(false);
      setIsSnackBarOpen(true);
    }
  };

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

              <FormInputField
                name='qty'
                type='number'
                control={control}
                rules={{
                  required: t('form.required'),
                  min: {
                    value: 10,
                    message: t('form.qtyMinError'),
                  },
                }}
                label={t('form.qty')}
                error={!!errors.qty}
                helperText={errors.qty?.message as string | undefined}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>€</InputAdornment>,
                }}
              />

              <FormInputSelect
                name='method'
                control={control}
                label={t('form.method')}
                rules={{
                  required: t('form.required'),
                }}
                error={!!errors.method}
                helperText={errors?.method?.message as string | undefined}
              >
                <MenuItem value='paypal'>{t('form.paypal')}</MenuItem>
                <MenuItem value='stripe'>{t('form.stripe')}</MenuItem>
              </FormInputSelect>

              <Collapse in={method === 'paypal'} unmountOnExit>
                <PayPalButtons
                  style={{ color: 'gold', height: 40, label: 'checkout', shape: 'rect' }}
                  fundingSource='paypal'
                  disabled={false}
                  createOrder={async (data, actions) => {
                    const isValid = await trigger();
                    const value = qty !== '' ? parseFloat(qty).toFixed(2) : '0';
                    if (isValid)
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: { value: value },
                          },
                        ],
                        application_context: {},
                      });
                    else return '';
                  }}
                  onApprove={async (data, actions) => {
                    await actions.order!.capture();
                    handleSubmit(onSubmit);
                  }}
                />
              </Collapse>
              <Collapse in={method === 'stripe'} unmountOnExit>
                <Button
                  type='submit'
                  variant='outlined'
                  size='large'
                  disableElevation
                  fullWidth
                  disabled={false}
                >
                  {t('form.stripeBtn')}
                </Button>
              </Collapse>

              <Snackbar
                open={isSnackBarOpen}
                onClose={handleClose}
                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
              >
                <Alert severity='warning' onClose={handleClose} variant='filled'>
                  {t('form.error')}
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

export default Payment;
