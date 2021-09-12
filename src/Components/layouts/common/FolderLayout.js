import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
      flexFlow: 'row wrap',
      alignItems: 'center',
      padding: 0,
      margin: 0,
      listStyle: 'none',
      '&::after': {
         content: '"',
         flex: 'auto',
      },

      [theme.breakpoints.down('sm')]: {
         padding: theme.spacing(1),
      },

      [theme.breakpoints.down('xs')]: {
         justifyContent: 'center',
      },
   },

   paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
   },
   item: {
      width: 150,
      height: 97,
      visibility: 'hidden',
      padding: theme.spacing(1),
      margin: theme.spacing(1),
   },
}));

function FolderLayout({ children }) {
   const classes = useStyles();

   return (
      <div className={classes.root}>
         {children}
         {/* <div className='item item-empty'></div> */}
         <div className={classes.item}></div>
      </div>
   );
}

export default FolderLayout;
