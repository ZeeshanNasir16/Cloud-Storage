import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
   root: {
      marginTop: theme.spacing(3),
      padding: theme.spacing(1),
      display: 'flex',
      alignItems: 'center',
   },
   input: {
      marginLeft: theme.spacing(1),
      //   flex: 1,
   },
   iconButton: {
      padding: 10,
   },
   divider: {
      height: 28,
      margin: 4,
   },
}));

export default function CustomizedInputBase() {
   const classes = useStyles();

   return (
      <Paper className={classes.root} elevation={0}>
         <IconButton
            type='submit'
            className={classes.iconButton}
            aria-label='search'
         >
            <SearchIcon />
         </IconButton>
         <Divider
            className={classes.divider}
            orientation='vertical'
         />
         <InputBase
            className={classes.input}
            placeholder='Search Files'
            inputProps={{ 'aria-label': 'search files' }}
         />
      </Paper>
   );
}
