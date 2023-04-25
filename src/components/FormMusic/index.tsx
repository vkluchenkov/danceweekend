import { useMemo } from 'react';
import { AgeGroup, SupportedLangs } from '@/src/types';
import { MusicFormFields } from '@/src/types/music.types';
import { FormInputField, FormInputSelect } from '@/src/ui-kit/input';
import { Alert, Button, Collapse, FormHelperText, MenuItem, Snackbar } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { Controller, useFormContext } from 'react-hook-form';
import styles from '@/styles/Registration.module.css';
import { contestCategories } from '@/src/ulis/contestCategories';

interface FormMusicProps {
  isSuccess: boolean;
  isError: boolean;
  audioLength: number;
  isDurationCorrect: boolean;
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  audioLimit: number;
}

const ageGroups: AgeGroup[] = ['baby', 'kids', 'juniors', 'adults', 'seniors'];

export const FormMusic: React.FC<FormMusicProps> = ({
  isSuccess,
  isError,
  audioLength,
  isDurationCorrect,
  handleClose,
  audioLimit,
}) => {
  const { t, lang } = useTranslation('music');
  const currentLang = lang as SupportedLangs;

  const methods = useFormContext<MusicFormFields>();
  const {
    control,
    watch,
    formState: { errors },
  } = methods;

  const ageGroup = watch('ageGroup');
  const event = watch('event');
  const categories = watch('categories');
  const category = watch('category');
  const levels = watch('levels');
  const type = watch('type');

  const ageGroupOptions = useMemo(() => {
    const filtered = ageGroups.filter((group) => {
      if (type === 'duo') {
        const isFound = contestCategories.find(
          (category) => category.isDuoCategory && category.ageGroup === group
        );
        if (!!isFound) return true;
      }

      if (type === 'group') {
        const isFound = contestCategories.find(
          (category) => category.isGroupCategory && category.ageGroup === group
        );
        if (!!isFound) return true;
      }

      if (type === 'solo') return true;
    });

    return filtered.map((age) => (
      <MenuItem key={age} value={age}>
        {t(`form.ageGroups.${age}`)}
      </MenuItem>
    ));
  }, [t, type]);

  const levelOptions = levels?.map((level) => (
    <MenuItem key={level} value={level}>
      {t(`form.levels.${level}`)}
    </MenuItem>
  ));

  const categoryOptions = categories?.map((category) => {
    const title = category.translations[currentLang].categoryTitle;
    const titleEn = category.translations.en.categoryTitle;
    return (
      <MenuItem key={title} value={titleEn}>
        {title}
      </MenuItem>
    );
  });

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.round(time % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
  };

  return (
    <>
      {/* Select group or solo */}
      <FormInputSelect
        name='type'
        control={control}
        label={t('form.type.title')}
        rules={{
          required: t('form.required'),
        }}
        error={!!errors.type}
        helperText={errors?.type?.message as string | undefined}
      >
        <MenuItem value='solo'>{t('form.solo')}</MenuItem>
        <MenuItem value='duo'>{t('form.type.duo')}</MenuItem>
        <MenuItem value='group'>{t('form.type.group')}</MenuItem>
      </FormInputSelect>

      {/* Solo fields */}
      <Collapse in={type === 'solo'} unmountOnExit>
        <div className={styles.form}>
          <FormInputField
            name='name'
            control={control}
            rules={{
              required: t('form.required'),
              pattern: {
                value: /^[a-zA-Z0-9\s\-]+$/,
                message: t('form.patternError'),
              },
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
              pattern: {
                value: /^[a-zA-Z0-9\s\-]+$/,
                message: t('form.patternError'),
              },
            }}
            label={t('form.surname')}
            error={!!errors.surname}
            helperText={errors.surname?.message as string | undefined}
          />
        </div>
      </Collapse>

      {/* Group fields */}
      <Collapse in={type === 'group' || type === 'duo'} unmountOnExit>
        <div className={styles.form}>
          <FormInputField
            name='groupName'
            control={control}
            rules={{
              required: t('form.required'),
              pattern: {
                value: /^[a-zA-Z0-9\s\-]+$/,
                message: t('form.patternError'),
              },
            }}
            label={t('form.groupName')}
            error={!!errors.groupName}
            helperText={errors.groupName?.message as string | undefined}
          />
        </div>
      </Collapse>

      {/* All the other fields */}
      <Collapse in={!!type} unmountOnExit>
        <div className={styles.form}>
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

              <Collapse in={!!ageGroup} unmountOnExit>
                <div className={styles.form}>
                  {!!levels?.length && (
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
                  )}

                  {!!categories?.length && (
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
                  )}
                </div>
              </Collapse>
            </div>
          </Collapse>
        </div>
      </Collapse>

      {/* File */}
      <Collapse
        in={(event === 'worldShow' && type != undefined) || !!category || ageGroup === 'baby'}
        unmountOnExit
      >
        <div className={styles.form}>
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

          {!isDurationCorrect && audioLength > 0 && (
            <FormHelperText error>
              {t('form.audio1') +
                formatTime(audioLength) +
                t('form.audio2') +
                formatTime(audioLimit)}
            </FormHelperText>
          )}
        </div>
      </Collapse>

      <Button
        type='submit'
        variant='outlined'
        size='large'
        disableElevation
        fullWidth
        disabled={!isDurationCorrect && audioLength > 0}
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
    </>
  );
};
