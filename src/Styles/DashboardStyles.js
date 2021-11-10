import { makeStyles } from '@material-ui/core/styles';

const DRAWER_WIDTH = 300;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'relative',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  drawer: {
    minWidth: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    maxWidth: DRAWER_WIDTH,
    minWidth: DRAWER_WIDTH,
    border: 'none',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    position: 'relative',
  },
  loader: {
    width: '100%',
    height: 'inherit',
    display: 'block',
    position: 'relative',
    top: '40%',
    transform: 'translateY(-60%)',
    textAlign: 'center',

    '& img': {
      maxWidth: 534,
    },
  },
}));
