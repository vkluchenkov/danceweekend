import React from 'react';
import { Select, SelectProps } from '@mui/material';

export type InputSelectProps = SelectProps & {};

export const InputSelect: React.FC<InputSelectProps> = (props) => <Select {...props} />;
