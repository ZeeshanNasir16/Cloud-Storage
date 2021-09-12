import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles, alpha } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Cancel';
import {
   Box,
   Typography,
   CircularProgress,
   IconButton,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
   root: {
      position: 'fixed',
      bottom: 10,
      right: 10,
      display: 'flex',
      flexDirection: 'row',
      WebkitBoxAlign: 'center',
      backgroundColor: '#fff',
      alignItems: 'center',
      borderRadius: 10,
      padding: theme.spacing(2),
      boxShadow: `0 0 2px 0 ${alpha(
         '#919EAB',
         0.24
      )}, 0 20px 40px -4px ${alpha('#919EAB', 0.24)}`,
      border: `solid 1px ${alpha('#919EAB', 0.52)}`,
      zIndex: 222,
      [theme.breakpoints.down('xs')]: {
         width: '95%',
         margin: theme.spacing(1),
         right: 0,
         bottom: 0,
      },
   },
   content: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
         width: '100%',
         whiteSpace: 'nowrap',
         overflow: 'hidden',
         textOverflow: 'ellipsis',
      },
   },
   closeBtn: {
      position: 'absolute',
      top: 0,
      right: 0,
   },
}));

function CircularProgressWithLabel(props) {
   return (
      <Box position='relative' display='inline-flex' sx={{ mr: 1 }}>
         <CircularProgress
            variant='determinate'
            {...props}
            color={props.error ? 'secondary' : 'primary'}
         />
         <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position='absolute'
            display='flex'
            alignItems='center'
            justifyContent='center'
         >
            <Typography
               variant='caption'
               component='div'
               color='textSecondary'
            >{`${Math.round(props.value)}%`}</Typography>
         </Box>
      </Box>
   );
}

function UploadStatus(props) {
   const {
      id,
      filename,
      fileMetaData,
      progress,
      status,
      error,
      closeDialog,
   } = props;
   const classes = useStyles();

   return ReactDOM.createPortal(
      <>
         <section className={classes.root}>
            <Box
               component='img'
               alt='title'
               src='/static/folder/txt_file.png'
               sx={{ width: 40, height: 40, borderRadius: 1.5 }}
            />
            <section className={classes.content}>
               <Typography
                  variant='subtitle2'
                  noWrap
                  sx={{
                     maxWidth: '17ch',
                  }}
               >
                  {filename}
               </Typography>
               <Typography
                  variant='body2'
                  noWrap
                  sx={{
                     color: 'text.secondary',
                     maxWidth: '17ch',
                  }}
               >
                  {fileMetaData} - {status}
               </Typography>
            </section>
            <CircularProgressWithLabel
               value={progress}
               error={error}
            />
            {error && (
               <IconButton
                  aria-label='delete'
                  size='small'
                  className={classes.closeBtn}
                  onClick={() => closeDialog(id)}
               >
                  <CloseIcon fontSize='small' />
               </IconButton>
            )}
         </section>
      </>,
      document.getElementById('portal')
   );
}

export default UploadStatus;
