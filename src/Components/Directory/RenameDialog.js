import React, { useState } from 'react';
import {
   Button,
   Dialog,
   DialogContent,
   DialogTitle,
   DialogActions as MuiDialogActions,
   TextField,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { extFilenamewoExt } from './FileTypes';

const DialogActions = withStyles((theme) => ({
   root: {
      margin: 0,
      padding: theme.spacing(3, 3),
   },
}))(MuiDialogActions);

export default function RenameDialog({
   open,
   handleToggle,
   dialogSubmit,
   dirName,
}) {
   const [fileTitle, setFileTitle] = useState(
      extFilenamewoExt(dirName)
   );

   //? File name
   const titleChanged = (e) => {
      setFileTitle(e.target.value);
   };

   //? Consult
   const formSubmit = (e) => {
      e.preventDefault();
      setFileTitle('');
      dialogSubmit(fileTitle);
   };

   return (
      <Dialog
         fullWidth
         maxWidth='xs'
         open={open}
         onClose={handleToggle}
         aria-labelledby='form-dialog-title'
      >
         <form onSubmit={formSubmit}>
            <DialogTitle id='form-dialog-title' align='center'>
               Rename Directory
            </DialogTitle>
            <DialogContent>
               <TextField
                  name='foldername'
                  label='Directory name'
                  type='string'
                  value={fileTitle}
                  onChange={titleChanged}
                  variant='outlined'
                  fullWidth
               />
            </DialogContent>
            <DialogActions>
               <Button
                  onClick={handleToggle}
                  color='primary'
                  variant='outlined'
                  type='button'
               >
                  Cancel
               </Button>
               <Button
                  color='primary'
                  variant='contained'
                  type='submit'
               >
                  Rename
               </Button>
            </DialogActions>
         </form>
      </Dialog>
   );
}
