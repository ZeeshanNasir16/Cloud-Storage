import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme) => ({
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
      cursor: 'pointer',
      userSelect: 'none',

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
