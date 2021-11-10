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
import { Alert } from 'Components/common/Alert';

const WrapperSection = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(1),

  '& form': {
    marginBottom: theme.spacing(3),
  },
}));

export function LoginForm() {
  const methods = useForm();
  const { signin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  const onFormSubmit = async (data) => {
    try {
      setLoading(true);
      await signin(data.email, data.password);
      history.push('/');
    } catch (error) {
      setError('Failed to login\n', error);
      setLoading(false);
    }
  };
  return (
    <WrapperSection>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            onFormSubmit({ ...data })
          )}
        >
          <Grid container spacing={3}>
            {error !== null && (
              <Grid item xs={12}>
                <Alert severity='error'>{error}</Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <Alert severity='info'>
                Use email : <strong> demo@boxcloud.app</strong>{' '}
                {' / '} password : <strong>demo12345</strong>
              </Alert>
            </Grid>

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
                  'Sign In'
                )}
              </Button>
            </Grid>
            <Grid item>
              <Link to='/forgotpassword' variant='body2'>
                Forgot password?
              </Link>
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
          <Link to='/register'>Register new account</Link>
        </Typography>
      </Box>
    </WrapperSection>
  );
}
