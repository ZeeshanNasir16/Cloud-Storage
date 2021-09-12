import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Grid, TextField } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

function CustomPasswordFIeld({ name, label, required }) {
   const { control } = useFormContext();
   const [values, setValues] = React.useState({
      password: '',
      showPassword: false,
   });

   const showHidePassword = () => {
      setValues((prev) => ({
         ...prev,
         showPassword: !prev.showPassword,
      }));
   };

   return (
      <Grid item xs={12}>
         <Controller
            name={name}
            control={control}
            defaultValue=''
            rules={{
               required: `${label} required`,
            }}
            InputProps={{ minLength: 7 }}
            render={({ field }) => (
               <TextField
                  {...field}
                  label={label}
                  name={name}
                  type={values.showPassword ? 'text' : 'password'}
                  required
                  fullWidth
                  variant='outlined'
                  InputProps={{
                     endAdornment: (
                        <InputAdornment position='end'>
                           <IconButton
                              edge='end'
                              onClick={showHidePassword}
                           >
                              {values.showPassword ? (
                                 <Visibility />
                              ) : (
                                 <VisibilityOff />
                              )}
                           </IconButton>
                        </InputAdornment>
                     ),
                  }}
               />
            )}
         />
      </Grid>
   );
}

export default CustomPasswordFIeld;
