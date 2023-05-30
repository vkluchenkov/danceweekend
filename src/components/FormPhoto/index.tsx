import { FormInputField } from '@/src/ui-kit/input';
import { Alert, Button, FormHelperText, Snackbar } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { Controller, useFormContext } from 'react-hook-form';
import styles from '@/styles/Registration.module.css';
import { PhotoFormFields } from '@/src/types/photo.types';

interface FormPhotoProps {
  isSuccess: boolean;
  isError: boolean;
  isFileSizeCorrect: boolean;
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
}

export const FormPhoto: React.FC<FormPhotoProps> = ({
  isSuccess,
  isError,
  isFileSizeCorrect,
  handleClose,
}) => {
  const { t, lang } = useTranslation('photoForm');

  const methods = useFormContext<PhotoFormFields>();
  const {
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = methods;

  const name = watch('name');
  const file = watch('file');

  return (
    <>
      <div className={styles.form}>
        <FormInputField
          name='name'
          control={control}
          rules={{
            required: t('form.required'),
            pattern: {
              value: /^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9\s\-]+$/, //Latin + Polish
              message: t('form.patternError'),
            },
          }}
          label={t('form.name')}
          error={!!errors.name}
          helperText={errors.name?.message as string | undefined}
        />

        <Controller
          control={control}
          name='file'
          render={({ field: { onChange } }) => {
            return (
              <>
                <label>{t('form.file')}</label>
                <input
                  type='file'
                  accept='image/png, image/jpeg'
                  onChange={(event) => {
                    onChange(event.target.files?.[0]);
                  }}
                />
              </>
            );
          }}
        />
        {!isFileSizeCorrect && <FormHelperText error>{t('form.sizeError')}</FormHelperText>}

        {file && isFileSizeCorrect && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={URL.createObjectURL(file)} alt='Preview' className={styles.preview} />
        )}
      </div>

      <Button
        type='submit'
        variant='outlined'
        size='large'
        disableElevation
        fullWidth
        disabled={!!!file || !isFileSizeCorrect}
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
