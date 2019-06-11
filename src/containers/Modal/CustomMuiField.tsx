import React from 'react';
import { FieldProps } from 'formik';
import Typography from '@material-ui/core/Typography';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Failure from '@material-ui/icons/HighlightOff';

const CustomMuiField: React.SFC<FieldProps & TextFieldProps> = ({
  field,
  form: { errors },
  variant = 'outlined',
  ...props
}) => {
  const hasError = !!errors[field.name];
  return (
    <>
      <TextField
        margin="dense"
        InputLabelProps={{
          shrink: true,
        }}
        helperText={
          <Typography
            component="span"
            style={{
              minHeight: '1.4em',
              fontSize: '0.92em',
            }}
          >
            {hasError && (
              <>
                <Failure fontSize="inherit" /> {errors[field.name]}
              </>
            )}
          </Typography>
        }
        error={hasError}
        variant={variant as any}
        {...field}
        {...props}
      />
    </>
  );
};

export default CustomMuiField;
