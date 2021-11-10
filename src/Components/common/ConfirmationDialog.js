import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    '& h2': {
      textTransform: 'capitalize',
    },
  },
  buttons: {
    padding: 20,
    justifyContent: 'space-between',
    '& button': {
      minWidth: 90,
    },
  },
}));
function ConfirmationDialog({
  open,
  toggleDialog,
  message,
  confirmAction,
}) {
  const classes = useStyles();
  const [state, setState] = useState(false);

  const handleSubmit = () => {
    setState((st) => !st);
    confirmAction();
  };
  return (
    <Dialog
      open={open}
      maxWidth='sm'
      onClose={toggleDialog}
      aria-labelledby='file-dialog-title'
      aria-describedby='file-dialog-description'
      className={classes.root}
    >
      <DialogTitle id='file-dialog-title' align='center'>
        {message.title}
      </DialogTitle>
      <DialogContent align='center'>
        <DialogContentText
          id='file-dialog-description'
          color='textSecondary'
        >
          {message.messageDesc}
          <br />
          You cannot undo this action
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.buttons}>
        <Button
          onClick={toggleDialog}
          color='primary'
          variant='outlined'
          autoFocus
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color='primary'
          variant='contained'
          disable={state.toString()}
          sx={{ width: '85px' }}
        >
          {state ? (
            <CircularProgress size={20} color='inherit' />
          ) : (
            message.title
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
