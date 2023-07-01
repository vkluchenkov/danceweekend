import { useState, useCallback, useEffect, useMemo } from 'react';
import { Layout } from '@/src/components/Layout';
import { NextPage } from 'next';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import useTranslation from 'next-translate/useTranslation';
import { FormProvider, useForm } from 'react-hook-form';
import { ThemeProvider } from '@mui/material';
import axios from 'axios';
import { Loader } from '@/src/components/Loader';
import { darkTheme, groupsLimit, margin, soloLimit, worldShowLimit } from '@/src/ulis/constants';
import { MusicFormFields } from '@/src/types/music.types';
import { Style, Level, contestCategories } from '@/src/ulis/contestCategories';
import { FormMusic } from '@/src/components/FormMusic';

const Music: NextPage = () => {
  const { t } = useTranslation('music');

  const methods = useForm<MusicFormFields>({
    mode: 'onChange',
  });
  const { handleSubmit, watch, setValue, reset } = methods;

  const [isLoading, setIsLoading] = useState(false);
  // const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isDurationCorrect, setIsDurationCorrect] = useState(false);

  const file = watch('file');
  const ageGroup = watch('ageGroup');
  const type = watch('type');
  const audioLength = watch('audioLength');
  const event = watch('event');

  // Get audio duration
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      const audio = new Audio(url);
      audio.onloadedmetadata = () => setValue('audioLength', audio.duration);
    } else setValue('audioLength', 0);
  }, [file, setValue]);

  const audioLimit = useMemo(() => {
    if (event === 'worldShow') return worldShowLimit;
    else return type === 'group' || type === 'duo' ? groupsLimit : soloLimit;
  }, [type, event]);

  // Check if audio is within limits
  useEffect(() => {
    audioLength > 0 && setIsDurationCorrect(audioLength <= audioLimit * margin);
  }, [audioLength, audioLimit]);

  // Map contest levels and styles by age group and type
  useEffect(() => {
    if (ageGroup) {
      const categories: (Style & { isDuo: boolean; isGroup: boolean })[] = [];
      const levels: Level[] = [];

      // Filter by age
      const filteredByAgeGroup = contestCategories.filter(
        (cat) => cat.ageGroup === ageGroup || cat.ageGroups?.includes(ageGroup)
      );

      // filter by type
      const filteredByType = filteredByAgeGroup.filter((cat) => {
        if (type === 'solo') return !cat.isDuoCategory && !cat.isGroupCategory;
        if (type === 'duo') return cat.isDuoCategory;
        if (type === 'group') return cat.isGroupCategory;
      });

      // Fill categories from filtered
      filteredByType.forEach((cat, index) => {
        cat.levels.forEach((level) => {
          if (level !== 'openLevel') {
            const isLevel = levels.includes(level);
            if (!isLevel) levels.push(level);
          }
        });

        cat.categories.forEach(
          (style) =>
            !style.isImprovisation &&
            categories.push({
              ...style,
              isDuo: !!cat.isDuoCategory,
              isGroup: !!cat.isGroupCategory,
            })
        );
      });

      setValue('categories', categories);
      setValue('levels', levels);
      setValue('level', levels[0]);
    }
  }, [ageGroup, setValue, type]);

  // Handle snackbar close
  const handleClose = useCallback((event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setIsError(false);
    setIsSuccess(false);
  }, []);

  const onSubmit = useCallback(
    async (data: MusicFormFields) => {
      setIsLoading(true);

      try {
        const formData = new FormData();

        for (const [key, value] of Object.entries(data)) formData.append(key, value);

        await axios.post('/api/music-submit', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setIsSuccess(true);
        reset();
      } catch (error) {
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
              <FormMusic
                isError={isError}
                isSuccess={isSuccess}
                audioLength={audioLength}
                isDurationCorrect={isDurationCorrect}
                handleClose={handleClose}
                audioLimit={audioLimit}
              />
            </form>
            {isLoading && <Loader />}
          </FormProvider>
        </ThemeProvider>
      </section>
    </Layout>
  );
};

export default Music;
