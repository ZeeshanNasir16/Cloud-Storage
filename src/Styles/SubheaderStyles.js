import { makeStyles, alpha } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
  gridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    marginBottom: theme.spacing(0),
    '& input': {
      display: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
  card: {
    position: 'fixed',
    bottom: 10,
    right: 10,
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor: '#fff',
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
  header: {
    padding: theme.spacing(2),
  },
}));
