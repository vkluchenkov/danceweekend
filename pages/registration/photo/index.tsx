import { useState, useCallback, useEffect, useMemo } from 'react';
import { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { FormProvider, useForm } from 'react-hook-form';
import { ThemeProvider } from '@mui/material';
import axios from 'axios';

import { Layout } from '@/src/components/Layout';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import { Loader } from '@/src/components/Loader';
import { darkTheme, photoFileSizeLimit } from '@/src/ulis/constants';
import { PhotoFormFields } from '@/src/types/photo.types';
import { FormPhoto } from '@/src/components/FormPhoto';

const Photo: NextPage = () => {
  const { t } = useTranslation('photoForm');

  const methods = useForm<PhotoFormFields>({
    mode: 'onChange',
  });
  const { handleSubmit, watch, reset, setValue } = methods;

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFileSizeCorrect, setIsFileSizeCorrect] = useState(true);

  const file = watch('file');

  // Check file size
  useEffect(() => {
    if (file) {
      if (file.size <= photoFileSizeLimit) setIsFileSizeCorrect(true);
      else setIsFileSizeCorrect(false);
    }
  }, [file]);

  // Handle snackbar close
  const handleClose = useCallback((event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setIsError(false);
    setIsSuccess(false);
  }, []);

  const onSubmit = useCallback(
    async (data: PhotoFormFields) => {
      setIsLoading(true);

      try {
        const formData = new FormData();

        for (const [key, value] of Object.entries(data)) formData.append(key, value);

        await axios.post('/api/photo-submit', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setIsSuccess(true);
        setValue('file', null);
        reset();
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [reset, setValue]
  );

  return (
    <Layout title={t('pageTitle')}>
      <h1 className={textStyles.h1}>{t('pageTitle')}</h1>

      <section className={styles.section}>
        <ThemeProvider theme={darkTheme}>
          <FormProvider {...methods}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <FormPhoto
                isError={isError}
                isSuccess={isSuccess}
                handleClose={handleClose}
                isFileSizeCorrect={isFileSizeCorrect}
              />
            </form>
            {isLoading && <Loader />}
          </FormProvider>
        </ThemeProvider>
      </section>
    </Layout>
  );
};

export default Photo;
