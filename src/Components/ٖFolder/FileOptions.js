import React from 'react';
import {
   Typography,
   Menu,
   MenuItem,
   ListItemIcon,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Icons
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles((theme) => ({
   root: {
      textTransform: 'capitalize',
      '& .MuiMenuItem-root': {
         minHeight: '35px',
      },
   },
   listItemIconStyle: {
      minWidth: 30,
   },
}));

export default function FileMenu({
   anchorEl,
   open,
   fileOptionsClose,
   selectedOption,
   type,
}) {
   const classes = useStyles();
   let ft = type === 'folder' ? 'open' : 'preview';
   return (
      <Menu
         id='long-menu'
         anchorEl={anchorEl}
         keepMounted
         open={open}
         onClose={fileOptionsClose}
         className={classes.root}
      >
         <MenuItem data-my-value={ft} onClick={selectedOption}>
            <ListItemIcon className={classes.listItemIconStyle}>
               <FolderOpenIcon />
            </ListItemIcon>
            <Typography variant='inherit'>{ft}</Typography>
         </MenuItem>
         <MenuItem data-my-value='download' onClick={selectedOption}>
            <ListItemIcon className={classes.listItemIconStyle}>
               <DownloadIcon />
            </ListItemIcon>
            <Typography variant='inherit'>Download</Typography>
         </MenuItem>
         <MenuItem data-my-value='rename' onClick={selectedOption}>
            <ListItemIcon className={classes.listItemIconStyle}>
               <EditIcon />
            </ListItemIcon>
            <Typography variant='inherit'>Rename</Typography>
         </MenuItem>
         <MenuItem data-my-value='remove' onClick={selectedOption}>
            <ListItemIcon className={classes.listItemIconStyle}>
               <DeleteIcon />
            </ListItemIcon>
            <Typography variant='inherit'>Remove</Typography>
         </MenuItem>
      </Menu>
   );
}
