import React, { useState } from 'react';
import {
  Button,
  Grid,
  Typography,
  CircularProgress,
  TextField,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { useAuth } from 'Context/AuthContext';
import MuiAlert from '@material-ui/lab/Alert';

const WrapperSection = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(1),

  '& form': {
    margin: theme.spacing(3, 0),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export function ForgotpasswordForm() {
  const { resetPassword } = useAuth();
  const [state, setstate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resetmessage, setMessage] = useState(null);

  const handleChange = (e) => {
    setstate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      await resetPassword(state);
      setMessage(
        'Password reset email sent, check your inbox and click on link to enter new password'
      );
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };
  return (
    <WrapperSection>
      {resetmessage !== null ? (
        <Typography variant='body2'>{resetmessage}</Typography>
      ) : (
        <>
          <Typography variant='body2'>
            Please enter the email address associated with your
            account and We will email you a link to reset your
            password.
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name='email'
                  label='Email'
                  type='email'
                  fullWidth
                  variant='outlined'
                  required
                  value={state}
                  onChange={handleChange}
                />
              </Grid>

              {error !== null && (
                <Grid item xs={12}>
                  <Alert severity='error'>{error}</Alert>
                </Grid>
              )}

              <Grid item xs={12}>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={20} color='inherit' />
                  ) : (
                    'Reset Password'
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>
          <Box
            sx={{
              mt: 4,
              color: 'primary.main',
            }}
          >
            <Typography variant='subtitle2'>
              <Link to='/login'>Back to Login</Link>
            </Typography>
          </Box>
        </>
      )}
    </WrapperSection>
  );
}
