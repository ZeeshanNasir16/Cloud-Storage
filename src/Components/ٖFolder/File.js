import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FileOptions from './FileOptions';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Lightbox from 'react-awesome-lightbox';
import { getFileType, getFileIcon } from './FileTypes';

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      padding: theme.spacing(1),
      margin: theme.spacing(1),
      backgroundColor: '#fff',
      borderRadius: 12,
      width: 150,

      '& p': {
         textAlign: 'center',
         lineHeight: '1.3em',
         marginTop: theme.spacing(1),
         whiteSpace: 'nowrap',
         overflow: 'hidden',
         textOverflow: 'ellipsis',
         width: 125,
      },

      '&:hover': {
         border: '1px solid #C4CDD5',
      },
   },
   avatar: {
      width: 55,
      height: 55,
      flexGrow: 0,
   },
   fileOptions: {
      position: 'absolute',
      top: 0,
      right: 0,
      padding: 5,

      '& span': {
         margin: 0,
      },
   },
}));

export default function File({ file_ext, file }) {
   const classes = useStyles();
   const [anchorEl, setAnchorEl] = useState(null);
   const [preview, setPreview] = useState(null);
   const open = Boolean(anchorEl);

   const fileOptionsClose = (e) => {
      e.stopPropagation();
      setAnchorEl(null);
   };

   //? File or folder double click to open
   const fileSelect = (e) => {
      if (getFileType(file_ext) === 'image') {
         setPreview(true);
      } else {
         window.open(file.url, '_blank');
      }
   };

   const closeViewer = (e) => {
      e.stopPropagation();
      setPreview(null);
   };

   //? File Option menu toggle function
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
      } else if (myValue === 'rename') {
      }

      setAnchorEl(null);
   };

   return (
      <main className={classes.root} onClick={fileSelect}>
         <Avatar
            className={classes.avatar}
            src={getFileIcon(file_ext)}
            alt={file_ext}
         />
         <Typography variant='body2'>{file.name}</Typography>
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
   );
}
