import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
interface Props {
    handleGoNext: () => void;
    handleClose: () => void;
    open: boolean;
}
const ConfirmationDialog = (props: Props) => {
  const { handleGoNext,open,handleClose } = props;


 
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {'Advancing to next Round'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Are you sure you want to proceed? Once accepted, you would not be able
          to change the submitted information.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleGoNext} autoFocus>
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
