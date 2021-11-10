import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useThemeContext } from 'Components/theme';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'space-evenly',
    border: '1px solid #0000003b',
    marginInline: theme.spacing(2.5),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
    borderRadius: 20,
    paddingInline: theme.spacing(1),
    backgroundColor: (props) =>
      props.themeMode
        ? theme.mode['dark'][1]
        : theme.mode['light'][1],
    minHeight: '3em',

    '& svg': {
      marginInline: theme.spacing(1),
      color: theme.palette.grey[600],
    },
  },
  input: {
    color: (props) => (props.themeMode ? '#FFF' : '#000'),
    marginLeft: theme.spacing(1),
    paddingInline: '4px 14px',
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
  const themeMode = useThemeContext();
  const classes = useStyles(themeMode);

  return (
    <Paper className={classes.root} elevation={0}>
      <SearchIcon />
      {/* <IconButton
        type='submit'
        className={classes.iconButton}
        aria-label='search'
      >
      </IconButton> */}
      <Divider className={classes.divider} orientation='vertical' />
      <InputBase
        className={classes.input}
        placeholder='Search Files'
        inputProps={{ 'aria-label': 'search files' }}
      />
    </Paper>
  );
}
