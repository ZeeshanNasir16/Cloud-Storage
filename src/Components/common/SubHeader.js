import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Grid,
  Box,
  IconButton,
  Tooltip,
  Divider,
} from '@material-ui/core';
import { useAuth } from 'Context/AuthContext';
import { storage, database } from '../../firebase';
import { ROOT_FOLDER } from 'hooks/useFolder';
import { v4 as uuidV4 } from 'uuid/dist';
import NewFolderDialog from 'Components/common/CreateFileDialog';
import BreadCrumbs from './BreadCrumbs';
import Uploadstatus from './UploadStatus';
import { getFileType } from '../Directory/FileTypes';
import {
  CreateNewFolder as CreateNewFolderIcon,
  CloudUpload as CloudUploadIcon,
} from '@material-ui/icons';
import { useStyles } from 'Styles/SubheaderStyles';
import Portal from 'Components/Portal';

function SubHeader({ currentFolder }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const { currentUser } = useAuth();

  const handleToggle = () => {
    setOpen(!open);
  };

  function closeDialog(fileid) {
    setUploadingFiles((prevUploadingFiles) =>
      prevUploadingFiles.filter((uploadFile) => {
        return uploadFile.id !== fileid;
      })
    );
  }

  const uploadFile = (e) => {
    const file = e.target.files[0];

    if (currentFolder == null || file == null) return;
    const fid = uuidV4();

    setUploadingFiles((prevUploadingFiles) => [
      ...prevUploadingFiles,
      {
        id: fid,
        name: file.name,
        fileMetaData: getFileType(file.name.split('.').pop()),
        progress: 0,
        error: false,
        status: 'uploading',
      },
    ]);

    //? Folder Path
    const folderPath =
      currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join('/')}/`
        : `${currentFolder.path.map((p) => p.name).join('/')}/${
            currentFolder.name
          }/`;

    //   //? Store file in storage of firebase,
    //   //? in ref dive the path of file storage
    //   //? put method uploads file in specified location

    const uploadTask = storage
      .ref(`/files/${currentUser.uid}/${folderPath}/${file.name}`)
      .put(file, {
        customMetadata: {
          fileType: file.type,
        },
      });

    //? Now we want to determine when changes occur or upload finishes,
    //? for this use the method below;
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          snapshot.bytesTransferred / snapshot.totalBytes;
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id === fid) {
              return {
                ...uploadFile,
                progress: progress * 100,
              };
            }
            return uploadFile;
          });
        });
      },
      (error) => {
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id === fid) {
              return {
                ...uploadFile,
                error: true,
              };
            }
            return uploadFile;
          });
        });
      },
      (complete) => {
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.filter((uploadFile) => {
            return uploadFile.id !== fid;
          });
        });

        toast.success('File uploaded successfully', {
          position: toast.POSITION.TOP_CENTER,
        });

        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          database.files
            .where('name', '==', file.name)
            .where('userId', '==', currentUser.uid)
            .where('folderId', '==', currentFolder.id)
            .get()
            .then((existingFiles) => {
              const existingFile = existingFiles.docs[0];

              // ? To overwrite the existing file url
              if (existingFile) existingFile.ref.update({ url: url });
              else
                database.files.add({
                  url: url,
                  name: file.name,
                  createdAt: database.getCurrentTimeStamp(),
                  folderId: currentFolder.id,
                  userId: currentUser.uid,
                });
            });
        });
      }
    );
  };

  return (
    <>
      <Box className={classes.gridContainer}>
        <Grid item>
          <BreadCrumbs currentFolder={currentFolder} />
        </Grid>
        <Grid item sx={{ padding: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'end',
            }}
          >
            <input
              id='fileuploadBtn'
              type='file'
              onChange={uploadFile}
            />

            <Tooltip title='Upload File' aria-label='add'>
              <label htmlFor='fileuploadBtn'>
                <IconButton
                  color='primary'
                  aria-label='upload picture'
                  component='span'
                  variant='outlined'
                >
                  <CloudUploadIcon />
                </IconButton>
              </label>
            </Tooltip>
            <Tooltip title='New Folder' aria-label='add'>
              <IconButton
                aria-label='newFolder'
                onClick={handleToggle}
              >
                <CreateNewFolderIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
      </Box>
      <Box sx={{ mb: 3, pr: 1 }}>
        <Divider />
      </Box>

      {open && (
        <NewFolderDialog
          open={open}
          handleToggle={handleToggle}
          currentFolder={currentFolder}
        />
      )}
      {uploadingFiles.length > 0 && (
        <Portal id='portal' title='Download/Upload Files'>
          {uploadingFiles.map((file) => (
            <Uploadstatus
              key={file.id}
              filename={file.name}
              fileMetaData={file.fileMetaData}
              progress={file.progress}
              error={file.error ? file.error : undefined}
              status={file.status}
              file_ext={file.name.split('.').pop()}
              closeDialog={() => closeDialog(file.id)}
            />
          ))}
        </Portal>
      )}
    </>
  );
}
export default SubHeader;
