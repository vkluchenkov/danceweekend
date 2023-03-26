import { FormControl, FormHelperText, InputLabel } from '@mui/material';
import React from 'react';
import { Control, useController, UseControllerProps } from 'react-hook-form';
import { InputSelect, InputSelectProps } from './InputSelect';

type FormInputSelectProps = InputSelectProps & {
  control: Control<any>;
  name: string;
  rules?: UseControllerProps['rules'];
  error?: Boolean;
  helperText?: string;
};

export const FormInputSelect: React.FC<FormInputSelectProps> = ({
  control,
  name,
  rules,
  helperText,
  error,
  ...props
}) => {
  const {
    field: { onChange, onBlur, value, ref },
  } = useController({
    name,
    control,
    rules: rules,
    defaultValue: '',
  });

  return (
    <FormControl error={error}>
      <InputLabel required={!!rules?.required}>{props.label}</InputLabel>
      <InputSelect
        {...props}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
        inputRef={ref}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
