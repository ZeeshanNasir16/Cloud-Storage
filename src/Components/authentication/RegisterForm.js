import React, { useState } from 'react';
import {
  Button,
  Grid,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import TextInputField from 'Components/CustomFields/CustomTextField';
import PasswordField from 'Components/CustomFields/CustomPasswordFIeld';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { useAuth } from 'Context/AuthContext';
import MuiAlert from '@material-ui/lab/Alert';

const WrapperSection = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(1),

  '& form': {
    marginBottom: theme.spacing(3),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export function RegisterForm() {
  const methods = useForm();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signUp } = useAuth();

  const onFormSubmit = async (data) => {
    setError('');

    const { email, password, confirmpassword } = data;

    if (password.trim().length < 8) {
      return setError('Password should be alteast 8 characters long');
    }
    if (password !== confirmpassword) {
      return setError('Password do not match');
    } else {
      try {
        setLoading(true);
        await signUp(email, password);
        history.push('/');
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
  };
  return (
    <WrapperSection>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => {
            onFormSubmit({ ...data });
          })}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextInputField
                name='email'
                label='Email'
                type='email'
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <PasswordField name='password' label='Password' />
            </Grid>

            <Grid item xs={12}>
              <PasswordField
                name='confirmpassword'
                label='Confirm Password'
              />
            </Grid>

            <Grid item xs={12}>
              {error !== '' && (
                <Alert severity='error'>{error}</Alert>
              )}
            </Grid>

            <Grid item xs={5}>
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
                  'Sign Up'
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>

      <Box
        sx={{
          mt: 6,
          color: 'primary.main',
        }}
      >
        <Typography variant='subtitle2'>
          <Link to='/login'>Login to account</Link>
        </Typography>
      </Box>
    </WrapperSection>
  );
}
