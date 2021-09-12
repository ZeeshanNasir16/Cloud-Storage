import React from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FileOptions from './FileOptions';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const FOLDER_ICONS = [
   {
      type: 'folder-filled',
      path: '/static/folder/filled_container.png',
   },
   {
      type: 'folder-empty',
      path: '/static/folder/empty_folder.png',
   },
];

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
      flexFlow: 'column wrap',
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

function Folder({ folder }) {
   const classes = useStyles();
   const history = useHistory();
   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);

   const fileOptionsClose = (e) => {
      e.stopPropagation();
      setAnchorEl(null);
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

   // ? File or folder options selection
   const selectedOption = (e) => {
      e.stopPropagation();
      const { myValue } = e.currentTarget.dataset;

      if (myValue === 'open') {
         history.push({
            pathname: `/folder/${folder.id}`,
            state: { folder: folder },
         });
      } else if (myValue === 'rename') return '';

      setAnchorEl(null);
   };

   return (
      <main className={classes.root} onClick={fileSelect}>
         <Avatar
            className={classes.avatar}
            src={FOLDER_ICONS[0].path}
            alt='File'
         />
         <Typography variant='body2'>{folder.name}</Typography>
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
   );
}

export default Folder;
