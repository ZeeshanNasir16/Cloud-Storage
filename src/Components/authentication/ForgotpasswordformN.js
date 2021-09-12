import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useAuth } from '../../Context/AuthContext';
import MuiAlert from '@material-ui/lab/Alert';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles({
   root: {
      width: 300,
      marginTop: 50,
      margin: '0 auto',
      display: 'block',

      '& h2': {
         textAlign: 'center',
      },
   },
   bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
   },

   pos: {
      marginTop: 12,
   },
   buttons: {
      display: 'flex',
      justifyContent: 'space-between',
   },
});

function Alert(props) {
   return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export const ForgotPasswordForm = () => {
   const { resetPassword } = useAuth();
   const [state, setstate] = useState('');
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');
   const [message, setMessage] = useState('');
   const history = useHistory();

   const classes = useStyles();

   const handleChange = (e) => {
      setstate(e.target.value);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         setError('');
         setMessage('');
         setLoading(true);
         await resetPassword(state);
         setMessage('reset password email sent, check your inbox');
      } catch (error) {
         setError('Password reset failed');
      }

      setLoading(false);
   };

   return (
      <div className={classes.root}>
         <Card className={classes.root}>
            {message !== '' && (
               <Alert severity='success'>{message}</Alert>
            )}
            {error !== '' && <Alert severity='error'>{error}</Alert>}
            <CardContent>
               <Typography variant='h5' component='h2'>
                  Reset Password
               </Typography>

               <TextField
                  className={classes.pos}
                  id='outlined-basic'
                  label='Email'
                  variant='outlined'
                  fullWidth
                  value={state}
                  onChange={handleChange}
               />
            </CardContent>
            <CardContent className={classes.buttons}>
               <Button
                  variant='contained'
                  color='primary'
                  onClick={handleSubmit}
                  disabled={loading}
                  fullWidth
               >
                  Reset Password
               </Button>
            </CardContent>
            <CardContent>
               <Button
                  color='primary'
                  fullWidth
                  //   onClick={history.push('/Signin')}
               >
                  Login
               </Button>
            </CardContent>
         </Card>
         <Typography variant='subtitle1' className={classes.pos}>
            Need an account ?<Link to='/Signup'>Signup</Link>
         </Typography>
      </div>
   );
};
