import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

function FormInput({ name, label, type }) {
   const { control } = useFormContext();
   return (
      <Grid item xs={12}>
         <Controller
            name={name}
            control={control}
            defaultValue=''
            rules={{ required: `${label} required` }}
            render={({ field }) => {
               return (
                  <TextField
                     {...field}
                     label={label}
                     name={name}
                     type={type}
                     required
                     fullWidth
                     variant='outlined'
                  />
               );
            }}
         />
      </Grid>
   );
}

export default FormInput;
