import React from 'react';
import { FieldProps } from 'formik';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

const CustomMuiField: React.SFC<FieldProps & TextFieldProps> = ({
  field,
  form: { errors },
  variant = 'outlined',
  ...props
}) => {
  return (
    <TextField
      margin="normal"
      fullWidth
      error={!!errors[field.name]}
      helperText={errors[field.name]}
      variant={variant as any}
      {...field}
      {...props}
    />
  );
};

export default CustomMuiField;
