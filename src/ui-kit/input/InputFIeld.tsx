import TextField, { TextFieldProps } from '@mui/material/TextField';
import { styles } from './styles';

export type InputFieldProps = TextFieldProps & {};

export const InputField: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      {...props}
      InputProps={{
        ...props.InputProps,
        sx: styles.input,
      }}
    />
  );
};
