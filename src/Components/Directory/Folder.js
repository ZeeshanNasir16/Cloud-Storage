import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import FileOptions from './FileOptions';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { styles } from 'Styles/DirectoryStyles';
import { FOLDER_ICONS } from './FileTypes';
import FileRenameDialog from './RenameDialog';
// import ConfirmationDialog from '../common/ConfirmationDialog';
import ConfirmationDialog from 'Components/common/ConfirmationDialog';
import { database, storage } from '../../firebase';
import { useThemeContext } from 'Components/theme';
import { toast } from 'react-toastify';

function Folder({ folder, parentDirChk }) {
  const themeMode = useThemeContext();
  const classes = styles(themeMode);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [confDialog, setConfirDialog] = useState(false);
  const [confMessage, setconfMessage] = useState(null);
  const [wait, setWait] = useState(false);

  const open = Boolean(anchorEl);

  const fileOptionsClose = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  // ? Show/hide dialog used to modify name of directory
  const handleToggle = () => {
    setShowDialog(!showDialog);
  };

  //? File or folder double click to open
  const fileSelect = (e) => {
    history.push({
      pathname: `/folder/${folder.id}`,
      state: { folder: folder },
    });
  };

  //? File Option menu toggle function
  const fileOptionsSelect = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  // ? Folder options selection
  const selectedOption = (e) => {
    e.stopPropagation();
    const { myValue } = e.currentTarget.dataset;

    if (myValue === 'open') {
      history.push({
        pathname: `/folder/${folder.id}`,
        state: { folder: folder },
      });
    } else if (myValue === 'rename') setShowDialog(true);
    else if (myValue === 'remove') {
      setconfMessage({
        title: 'remove',
        info: {
          folderName: folder.name,
          folderId: folder.parentId,
        },
      });

      setConfirDialog(true);
    }

    setAnchorEl(null);
  };

  //? Toggle Confirmation dialog
  const toggleConfDialog = () => {
    setConfirDialog(!confDialog);
  };

  //? Search recursively through folder's tree (files and folders inside the folder)
  const searchFolder = async (subfolder) => {
    try {
      const files = await database.files
        .where('folderId', '==', subfolder.id)
        .where('userId', '==', subfolder.userId)
        .get();

      //? Delete files in that folder
      if (!files.empty)
        files.docs.map(async (doc) => {
          await storage.refFromURL(doc.data().url).delete();
          await database.files.doc(doc.id).delete();
        });

      const folders = await database.folders
        .where('parentId', '==', subfolder.id)
        .where('userId', '==', subfolder.userId)
        .get();

      if (folders.empty) {
        await database.folders.doc(subfolder.id).delete();
      } else {
        folders.docs.map((folder) =>
          searchFolder(database.formattedDoc(folder))
        );
      }
      await database.folders.doc(subfolder.id).delete();
    } catch (error) {
      toast.error(`Error occured: ${error.code}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    //? Get sub folders in that folder
  };

  //? Confirm Dialog submit
  const confirmDialogSubmit = async () => {
    setWait(true);
    toggleConfDialog(false);

    await searchFolder(folder, 0);

    setWait(false);
    setconfMessage(null);
  };

  //?  Dialog submission event
  const renameDialogSubmit = (renameTitle) => {
    if (renameTitle.toLowerCase() !== folder.name.toLowerCase()) {
      parentDirChk('folder', renameTitle, folder.id);
    }
    handleToggle();
  };

  return (
    <>
      <main className={classes.root} onClick={fileSelect}>
        <Avatar
          className={classes.avatar}
          src={FOLDER_ICONS[0].path}
          alt='File'
        />
        <Tooltip title={folder.name} aria-label='add'>
          <Typography variant='body2'>{folder.name}</Typography>
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
          type='folder'
          open={open}
          fileOptionsClose={fileOptionsClose}
          anchorEl={anchorEl}
          selectedOption={selectedOption}
        />
      </main>
      <FileRenameDialog
        open={showDialog}
        handleToggle={handleToggle}
        dialogSubmit={renameDialogSubmit}
        dirName={folder.name}
      />

      {confDialog && (
        <ConfirmationDialog
          open={confDialog}
          toggleDialog={toggleConfDialog}
          confirmAction={confirmDialogSubmit}
          message={{
            title: confMessage.title,
            messageDesc: `Are you sure you want to ${confMessage.title} "${confMessage.info.folderName}" ?`,
          }}
        />
      )}
      {/* {console.log(wait)} */}
      {/* {!wait && ( */}
      {/* <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 100,
        }}
        open={true}
        //    onClick={handleClose}
      >
        <Typography variant='h1' component='h4'>
          Deleting Folder & its Subfiles and Folders
        </Typography>
        <CircularProgress color='inherit' />
      </Backdrop> */}
      {/* )} */}
    </>
  );
}

export default Folder;
