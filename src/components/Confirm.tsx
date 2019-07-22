import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface IConfirmProps extends DialogProps {
  message: string;
  onAgree?: () => void;
  onDisagree?: () => void;
  agreeLabel?: string;
  disagreelabel?: string;
}
const Confirm: React.SFC<IConfirmProps> = ({
  title,
  message,
  agreeLabel = '예',
  disagreelabel = '아니오',
  onAgree = () => {},
  onDisagree = () => {},
  ...props
}) => {
  return (
    <Dialog
      aria-labelledby="confirm-dialog"
      aria-describedby="confirm-dialog-description"
      {...props}
    >
      {title && <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDisagree} color="primary">
          {disagreelabel}
        </Button>
        <Button onClick={onAgree} color="primary" variant="contained">
          {agreeLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirm;
