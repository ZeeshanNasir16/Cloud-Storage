import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  mainContainer: {
    position: 'relative',
    marginLeft: 0,
    marginRight: 0,
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    // backgroundColor: '#fff',
    [theme.breakpoints.up('sm')]: {
      background: 'transparent',
    },
  },
  backImgContainer: {
    display: 'none',
    width: '100%',
    height: 'inherit',
    padding: 60,
    position: 'absolute',

    [theme.breakpoints.up('sm')]: {
      display: 'inline-block',
    },
  },
  backImg: {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    textAlign: 'center',

    '& img': {
      maxWidth: 534,
    },
  },
  formContent: {
    maxWidth: 350,
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(3),
    zIndex: 2,

    '& h4': {
      color: theme.palette.primary.main,
    },

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      borderRadius: 10,
      boxShadow: '0 6px 15px rgb(0 0 0 / 16%)',
    },
  },
}));
