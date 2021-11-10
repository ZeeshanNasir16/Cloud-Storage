import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    WebkitBoxAlign: 'center',
    backgroundColor: (props) =>
      props.themeMode
        ? theme.mode['dark'][0]
        : theme.mode['light'][0],
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  content: {
    marginRight: theme.spacing(2),
    '& h5, p': {
      maxWidth: '17ch',
    },
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
