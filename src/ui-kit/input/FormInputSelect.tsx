import React from 'react';
import { Control, useController, UseControllerProps } from 'react-hook-form';
import { InputSelect, InputSelectProps } from './InputSelect';

type FormInputSelectProps = InputSelectProps & {
  control: Control<any>;
  name: string;
  rules?: UseControllerProps['rules'];
};

export const FormInputSelect: React.FC<FormInputSelectProps> = ({
  control,
  name,
  rules,
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
    <InputSelect
      {...props}
      required={!!rules?.required}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      name={name}
      inputRef={ref}
    />
  );
};
