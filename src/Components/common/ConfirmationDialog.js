import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
   },
}));
function ConfirmationDialog({
   open,
   toggleDialog,
   message,
   confirmAction,
}) {
   const classes = useStyles();
   return (
      <Dialog
         open={open}
         onClose={toggleDialog}
         aria-labelledby='alert-dialog-title'
         aria-describedby='alert-dialog-description'
         className={classes.root}
      >
         <DialogTitle id='alert-dialog-title' align='center'>
            {message.title}
         </DialogTitle>
         <DialogContent align='center'>
            <DialogContentText
               id='alert-dialog-description'
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
            >
               Cancel
            </Button>
            <Button
               onClick={confirmAction}
               color='primary'
               variant='contained'
               autoFocus
            >
               {message.title}
            </Button>
         </DialogActions>
      </Dialog>
   );
}

export default ConfirmationDialog;
