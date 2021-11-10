import React, { useState } from 'react';
import { database, storage } from '../../firebase';
import {
  Avatar,
  Typography,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import Lightbox from 'react-awesome-lightbox';
import { styles } from 'Styles/DirectoryStyles';
import FileOptions from './FileOptions';
import { getFileType, getFileIcon } from './FileTypes';
import FileRenameDialog from './RenameDialog';
import ConfirmationDialog from 'Components/common/ConfirmationDialog';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DownloadFile from './FileDownload';
import Portal from 'Components/Portal';
import { useThemeContext } from 'Components/theme';

export default function File({ file_ext, file, parentDirChk }) {
  const themeMode = useThemeContext();
  const classes = styles(themeMode);
  const [showDialog, setShowDialog] = useState(false);
  const [confDialog, setConfirDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [preview, setPreview] = useState(null);
  const [download, setDownload] = useState(false);

  // ? State for confirmation dialog message
  const [confMessage, setconfMessage] = useState(null);

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

  // ? File options selection
  const selectedOption = (e) => {
    e.stopPropagation();

    const { myValue } = e.currentTarget.dataset;

    if (myValue === 'preview') {
      if (getFileType(file_ext) === 'image') {
        setPreview(true);
      } else {
        // window.open(file.url, '_self');
      }
    } else if (myValue === 'rename') setShowDialog(true);
    else if (myValue === 'remove') {
      setconfMessage({
        title: 'remove',
        info: { fileName: file.name, folderId: file.folderId },
      });

      setConfirDialog(true);
    } else {
      if (!download) setDownload((st) => !st);
      else {
        toast.warning(
          'File already downloading, wait for it to finish',
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      }
    }
    setAnchorEl(null);
  };

  const toggleDownloadFile = () => {
    setDownload((st) => !st);
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
      {download && (
        <Portal id='portal' title='Download/Upload Files'>
          <DownloadFile
            file={file}
            file_ext={file_ext}
            removeComp={toggleDownloadFile}
          />
        </Portal>
      )}
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
