import React from 'react';
import { Control, useController, UseControllerProps } from 'react-hook-form';
import { InputCheckbox, InputCheckboxProps } from './InputCheckbox';
import { FormControlLabel } from '@mui/material';

type FormInputCheckboxProps = InputCheckboxProps & {
  control: Control<any>;
  name: string;
  rules?: UseControllerProps['rules'];
  label: React.ReactNode;
};

export const FormInputCheckbox: React.FC<FormInputCheckboxProps> = ({
  control,
  name,
  rules,
  label,
  ...props
}) => {
  const {
    field: { onChange, onBlur, value, ref },
  } = useController({
    name,
    control,
    rules: rules,
    defaultValue: false,
  });

  return (
    <FormControlLabel
      control={
        <InputCheckbox
          {...props}
          required={!!rules?.required}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          name={name}
          inputRef={ref}
          checked={value}
        />
      }
      label={label}
    />
  );
};
