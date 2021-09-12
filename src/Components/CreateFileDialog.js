import React from 'react';
import {
   Button,
   Avatar,
   Dialog,
   DialogContent,
   DialogTitle,
   DialogActions as MuiDialogActions,
   Slide,
} from '@material-ui/core';
import CustomField from './CustomFields/CustomTextField';
import { useForm, FormProvider } from 'react-hook-form';
import { withStyles } from '@material-ui/core/styles';
import { database } from '../firebase';
import { useAuth } from '../Context/AuthContext';
import { toast } from 'react-toastify';
import { ROOT_FOLDER } from '../hooks/useFolder';

const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction='down' ref={ref} {...props} />;
});

const DialogActions = withStyles((theme) => ({
   root: {
      margin: 0,
      padding: theme.spacing(3, 3),
   },
}))(MuiDialogActions);

export default function CreateFileDialog({
   open,
   handleToggle,
   currentFolder,
}) {
   const methods = useForm();
   const { currentUser } = useAuth();

   const formSubmit = (data) => {
      console.log(currentFolder);
      console.log('Before current folder check');

      if (currentFolder === null) return;

      console.log('After current folder check');

      const path = [...currentFolder.path];

      if (currentFolder !== ROOT_FOLDER)
         path.push({
            name: currentFolder.name,
            id: currentFolder.id,
         });
      try {
         // ^ Create a folder in the database
         database.folders.add({
            name: data.foldername,
            parentId: currentFolder.id,
            userId: currentUser.uid,
            path: path,
            createdAt: database.getCurrentTimeStamp(),
         });

         toast.success('Folder created successfully', {
            position: toast.POSITION.TOP_CENTER,
         });
      } catch (error) {
         toast.error(`Unable to create folder\n${error}`, {
            position: toast.POSITION.TOP_CENTER,
         });
      }

      handleToggle();
   };

   return (
      <Dialog
         fullWidth
         maxWidth='xs'
         open={open}
         onClose={handleToggle}
         TransitionComponent={Transition}
         aria-labelledby='form-dialog-title'
      >
         <FormProvider {...methods}>
            <form
               onSubmit={methods.handleSubmit((data) =>
                  formSubmit(data)
               )}
            >
               <DialogTitle id='form-dialog-title' align='center'>
                  <Avatar
                     variant='square'
                     alt='Remy Sharp'
                     src='/static/folder/add_folder.png'
                  />
                  Add New Folder
               </DialogTitle>
               <DialogContent>
                  <CustomField
                     name='foldername'
                     label='Title'
                     type='string'
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
                     Create
                  </Button>
               </DialogActions>
            </form>
         </FormProvider>
      </Dialog>
   );
}
