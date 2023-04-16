import { useState, useCallback } from 'react';
import { Layout } from '@/src/components/Layout';
import { NextPage } from 'next';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import useTranslation from 'next-translate/useTranslation';
import { FormInputField, FormInputSelect } from '@/src/ui-kit/input';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { ThemeProvider, MenuItem, InputAdornment, Collapse, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { Loader } from '@/src/components/Loader';
import { darkTheme } from '@/src/ulis/constants';
import { MusicFormFields } from '@/src/types/music.types';

const Music: NextPage = () => {
  const { t } = useTranslation('music');
  const router = useRouter();

  const methods = useForm<MusicFormFields>({
    mode: 'onChange',
  });
  const {
    handleSubmit,
    watch,
    trigger,
    control,
    formState: { errors },
  } = methods;

  const [isLoading, setIsLoading] = useState(false);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

  // Handle snackbar close
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setIsSnackBarOpen(false);
  };

  const onSubmit = useCallback(async (data: MusicFormFields) => {}, []);

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
                name='surname'
                control={control}
                rules={{
                  required: t('form.required'),
                }}
                label={t('form.surname')}
                error={!!errors.surname}
                helperText={errors.surname?.message as string | undefined}
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
                name='file'
                type='file'
                accept='.mp3, .wav, .mp4a'
                control={control}
                rules={{
                  required: t('form.required'),
                }}
                // label={t('form.file')}
                error={!!errors.file}
                helperText={errors.file?.message as string | undefined}
              />

              <FormInputSelect
                name='event'
                control={control}
                label={t('form.event')}
                rules={{
                  required: t('form.required'),
                }}
                error={!!errors.event}
                helperText={errors?.event?.message as string | undefined}
              >
                <MenuItem value='contest'>{t('form.contest')}</MenuItem>
                <MenuItem value='gala'>{t('form.gala')}</MenuItem>
                <MenuItem value='worldShow'>{t('form.worldShow')}</MenuItem>
              </FormInputSelect>

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

export default Music;
