import React, { useState } from 'react';
import {
   Avatar,
   Typography,
   IconButton,
   Tooltip,
} from '@material-ui/core';
import FileOptions from './FileOptions';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Lightbox from 'react-awesome-lightbox';
import { getFileType, getFileIcon } from './FileTypes';
import FileRenameDialog from './RenameDialog';
import { styles } from './DirectoryStyles';
// import { useAuth } from '../../Context/AuthContext';
import { database, storage } from '../../firebase';
import { toast } from 'react-toastify';
import ConfirmationDialog from '../common/ConfirmationDialog';

export default function File({ file_ext, file, parentDirChk }) {
   const classes = styles();
   const [showDialog, setShowDialog] = useState(false);
   const [confDialog, setConfirDialog] = useState(false);
   const [anchorEl, setAnchorEl] = useState(null);
   const [preview, setPreview] = useState(null);
   const [confMessage, setconfMessage] = useState(null);
   //    const { currentUser } = useAuth();

   const open = Boolean(anchorEl);

   //? Toggle Confirmation dialog
   const toggleConfDialog = () => {
      setConfirDialog(!confDialog);
   };

   // ? Close Image Viewer
   const closeViewer = (e) => {
      e.stopPropagation();
      setPreview(null);
   };

   // ? Close File options
   const fileOptionsClose = (e) => {
      e.stopPropagation();
      setAnchorEl(null);
   };

   //? File or folder click to open
   const fileSelect = () => {
      if (getFileType(file_ext) === 'image') {
         setPreview(true);
      } else {
         window.open(file.url, '_blank');
      }
   };

   //? File's menu option toggle function
   const fileOptionsSelect = (e) => {
      e.stopPropagation();
      setAnchorEl(e.currentTarget);
   };

   // ? File or folder options selection
   const selectedOption = (e) => {
      e.stopPropagation();

      const { myValue } = e.currentTarget.dataset;

      if (myValue === 'preview') {
         if (getFileType(file_ext) === 'image') {
            setPreview(true);
         } else {
            window.open(file.url, '_blank');
         }
      } else if (myValue === 'rename') setShowDialog(true);
      else if (myValue === 'remove') {
         setconfMessage({
            title: 'remove',
            info: { fileName: file.name, folderId: file.folderId },
         });

         setConfirDialog(true);
         //  setTimeout(() => {
         //  }, 500);
      }
      setAnchorEl(null);
   };

   //? Confirm Dialog submit
   const confirmDialogSubmit = async () => {
      try {
         const fileRef = storage.refFromURL(file.url);

         //? Remove files from storage then delete reference from firestore db
         await fileRef.delete();
         await database.files.doc(file.id).delete();
         toast.success('File deleted successfully from your drive', {
            position: toast.POSITION.TOP_CENTER,
         });
      } catch (error) {
         toast.error(`Could'nt delete file, ${error.code}`, {
            position: toast.POSITION.TOP_CENTER,
         });
      }

      toggleConfDialog(false);
      setconfMessage(null);
   };

   // ? Show/hide dialog used to modify name of directory
   const handleToggle = () => {
      setShowDialog(!showDialog);
   };

   //?  Dialog submission event
   const renameDialogSubmit = (renameTitle) => {
      const updatefileName = `${renameTitle}.${file.name
         .split('.')
         .pop()}`;

      if (updatefileName.toLowerCase() !== file.name.toLowerCase()) {
         parentDirChk('file', updatefileName, file.id);
      }
      handleToggle();
   };

   return (
      <>
         <main className={classes.root} onClick={fileSelect}>
            <Avatar
               className={classes.avatar}
               src={getFileIcon(file_ext)}
               alt={file_ext}
            />
            <Tooltip title={file.name} aria-label='add'>
               <Typography variant='body2'>{file.name}</Typography>
            </Tooltip>
            <IconButton
               aria-label='more'
               aria-controls='long-menu'
               aria-haspopup='true'
               onClick={fileOptionsSelect}
               className={classes.fileOptions}
            >
               <MoreVertIcon />
            </IconButton>
            <FileOptions
               type='file'
               open={open}
               fileOptionsClose={fileOptionsClose}
               anchorEl={anchorEl}
               selectedOption={selectedOption}
            />

            {preview && (
               <Lightbox
                  image={file.url}
                  title={file.name}
                  onClose={closeViewer}
                  doubleClickZoom={6}
                  allowReset
               />
            )}
         </main>
         <FileRenameDialog
            open={showDialog}
            handleToggle={handleToggle}
            dialogSubmit={renameDialogSubmit}
            dirName={file.name}
         />
         {confDialog && (
            <ConfirmationDialog
               open={confDialog}
               toggleDialog={toggleConfDialog}
               confirmAction={confirmDialogSubmit}
               message={{
                  title: confMessage.title,
                  messageDesc: `Are you sure you want to ${confMessage.title} "${confMessage.info.fileName}" ?`,
               }}
            />
         )}
      </>
   );
}
