import { useState, useCallback, useEffect } from 'react';
import { Layout } from '@/src/components/Layout';
import { NextPage } from 'next';
import textStyles from '@/styles/Text.module.css';
import styles from '@/styles/Registration.module.css';
import useTranslation from 'next-translate/useTranslation';
import { FormInputField, FormInputSelect } from '@/src/ui-kit/input';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { ThemeProvider, MenuItem, Snackbar, Alert, Collapse } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import axios from 'axios';
import Button from '@mui/material/Button';
import { Loader } from '@/src/components/Loader';
import { darkTheme } from '@/src/ulis/constants';
import { MusicFormFields } from '@/src/types/music.types';
import { AgeGroup, SupportedLangs } from '@/src/types';
import { Category, Level, contestCategories } from '@/src/ulis/contestCategories';

const ageGroups: AgeGroup[] = ['baby', 'kids', 'juniors', 'adults', 'seniors'];

const Music: NextPage = () => {
  const { t, lang } = useTranslation('music');
  const currentLang = lang as SupportedLangs;

  const methods = useForm<MusicFormFields>({
    mode: 'onChange',
  });
  const {
    handleSubmit,
    watch,
    trigger,
    setValue,
    control,
    formState: { errors },
  } = methods;

  const [isLoading, setIsLoading] = useState(false);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [audioLength, setAudioLenght] = useState(0);

  const file = watch('file');
  const ageGroup = watch('ageGroup');
  const event = watch('event');
  const categories = watch('categories');
  const levels = watch('levels');
  const type = watch('type');

  // Get audio duration
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      const audio = new Audio(url);
      audio.onloadedmetadata = () => setAudioLenght(audio.duration);
    } else setAudioLenght(0);
  }, [file]);

  // Map contest levels and styles by age group
  useEffect(() => {
    if (ageGroup) {
      const categories: (Category & { isDuo: boolean; isGroup: boolean })[] = [];
      const levels: Level[] = [];

      // Filter by age
      const filteredByAgeGroup = contestCategories.filter(
        (cat) => cat.ageGroup === ageGroup || cat.ageGroups?.includes(ageGroup)
      );

      // Fill categories from filtered
      filteredByAgeGroup.forEach((cat, index) => {
        cat.levels.forEach((level) => {
          if (level !== 'openLevel') {
            const isLevel = levels.includes(level);
            if (!isLevel) levels.push(level);
          }
        });

        cat.categories.forEach((style) =>
          categories.push({
            ...style,
            isDuo: !!cat.isDuo,
            isGroup: !!cat.isGroup,
          })
        );
      });

      setValue('categories', categories);
      setValue('levels', levels);
      setValue('level', levels[0]);
    }
  }, [ageGroup, setValue]);

  // Handle snackbar close
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setIsSnackBarOpen(false);
  };

  const onSubmit = useCallback(async (data: MusicFormFields) => {
    setIsLoading(true);

    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries(data)) formData.append(key, value);

      await axios.post('/api/music-submit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (error) {
      setIsSnackBarOpen(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const ageGroupOptions = ageGroups.map((age) => (
    <MenuItem key={age} value={age}>
      {t(`form.ageGroups.${age}`)}
    </MenuItem>
  ));

  const levelOptions = levels?.map((level) => (
    <MenuItem key={level} value={level}>
      {t(`form.levels.${level}`)}
    </MenuItem>
  ));

  const categoryOptions = categories?.map((category) => {
    const title = category.translations[currentLang].categoryTitle;
    const soloOrGroup = () => {
      if (category.isSolo) return 'solo';
      if (category.isGroup) return 'group';
      if (category.isDuo) return 'duo';
    };
    return (
      <MenuItem key={title + soloOrGroup()} value={`${soloOrGroup()}_${title}`}>
        {t(`form.${soloOrGroup()}`)}: {title}
      </MenuItem>
    );
  });

  return (
    <Layout title={t('pageTitle')}>
      <h1 className={textStyles.h1}>{t('pageTitle')}</h1>

      <section className={styles.section}>
        <ThemeProvider theme={darkTheme}>
          <FormProvider {...methods}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              {/* Common fields */}
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
                <MenuItem value='worldShow'>{t('form.worldShow')}</MenuItem>
              </FormInputSelect>

              {/* Contest */}
              <Collapse in={event === 'contest'} unmountOnExit>
                <div className={styles.form}>
                  <FormInputSelect
                    name='ageGroup'
                    control={control}
                    label={t('form.ageGroups.title')}
                    rules={{
                      required: t('form.required'),
                    }}
                    error={!!errors.ageGroup}
                    helperText={errors?.ageGroup?.message as string | undefined}
                  >
                    {ageGroupOptions}
                  </FormInputSelect>

                  <Collapse
                    in={ageGroup !== undefined && ageGroup !== 'baby' && ageGroup !== 'seniors'}
                    unmountOnExit
                  >
                    <div className={styles.form}>
                      <FormInputSelect
                        name='level'
                        control={control}
                        label={t('form.levels.title')}
                        rules={{
                          required: t('form.required'),
                        }}
                        error={!!errors.level}
                        helperText={errors?.level?.message as string | undefined}
                      >
                        {levelOptions}
                      </FormInputSelect>

                      <FormInputSelect
                        name='category'
                        control={control}
                        label={t('form.stylesTitle')}
                        rules={{
                          required: t('form.required'),
                        }}
                        error={!!errors.category}
                        helperText={errors?.category?.message as string | undefined}
                      >
                        {categoryOptions}
                      </FormInputSelect>
                    </div>
                  </Collapse>
                </div>
              </Collapse>

              {/* World Show */}
              <Collapse in={event === 'worldShow'} unmountOnExit>
                <div className={styles.form}>
                  <FormInputSelect
                    name='type'
                    control={control}
                    label={t('form.worldShowFields.type')}
                    rules={{
                      required: t('form.required'),
                    }}
                    error={!!errors.type}
                    helperText={errors?.type?.message as string | undefined}
                  >
                    <MenuItem value='group'>{t('form.worldShowFields.group')}</MenuItem>
                    <MenuItem value='solo'>{t('form.solo')}</MenuItem>
                  </FormInputSelect>

                  <Collapse in={type === 'group'} unmountOnExit>
                    <div className={styles.form}>
                      <FormInputField
                        name='groupName'
                        control={control}
                        rules={{
                          required: t('form.required'),
                        }}
                        label={t('form.worldShowFields.groupName')}
                        error={!!errors.groupName}
                        helperText={errors.groupName?.message as string | undefined}
                      />
                    </div>
                  </Collapse>
                </div>
              </Collapse>

              {/* File */}
              <Controller
                control={control}
                name='file'
                render={({ field: { onChange } }) => {
                  return (
                    <>
                      <label>{t('form.file')}</label>
                      <input
                        type='file'
                        accept='.mp3, .wav, .mp4a'
                        onChange={(event) => {
                          onChange(event.target.files?.[0]);
                        }}
                      />
                    </>
                  );
                }}
              />

              <FormHelperText>Audio duration: {Math.round(audioLength)} sec.</FormHelperText>

              {/* <FormInputField
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
              /> */}

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
