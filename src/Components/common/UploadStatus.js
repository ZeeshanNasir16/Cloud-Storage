import React from 'react';
import CloseIcon from '@material-ui/icons/Cancel';
import {
  Box,
  Typography,
  CircularProgress,
  IconButton,
} from '@material-ui/core';
import { useStyles } from 'Styles/UploadDialogStyles';
import { getFileIcon } from '../Directory/FileTypes';
import { useThemeContext } from 'Components/theme';

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
  const themeMode = useThemeContext();
  const {
    id,
    filename,
    fileMetaData,
    progress,
    status,
    error,
    closeDialog,
  } = props;
  const classes = useStyles(themeMode);

  return (
    <section className={classes.root}>
      <Box
        component='img'
        alt='title'
        src={getFileIcon(props?.file_ext)}
        sx={{ width: 40, height: 40, borderRadius: 1.5 }}
      />
      <section className={classes.content}>
        <Typography
          variant='subtitle2'
          component='h5'
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
            color: 'textSecondary',
            maxWidth: '17ch',
          }}
        >
          {fileMetaData} - {status}
        </Typography>
      </section>
      <CircularProgressWithLabel
        value={progress || 0}
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
  );
}

export default UploadStatus;
