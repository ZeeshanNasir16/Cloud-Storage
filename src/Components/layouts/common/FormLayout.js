import React from 'react';
import { Typography, Grid, Box, Card } from '@material-ui/core';
import SiteLogo from '../LogoSection/SiteLogo';
import { useStyles } from 'Styles/FormLayoutStyles';
import { useThemeContext } from 'Components/theme';

const FormLayout = ({ children }) => {
  const themeMode = useThemeContext();
  const classes = useStyles(themeMode);
  return (
    <section className={classes.mainContainer}>
      <section className={classes.backImgContainer}>
        <Box className={classes.backImg}>
          <img
            src='http://brandio.io/envato/iofrm/html/images/graphic3.svg'
            alt='background'
          />
        </Box>
      </section>

      <Card className={classes.formContent}>
        <Grid container>
          <Grid item sx={{ mb: 5 }} colspacing={5} xs={12}>
            <SiteLogo w={70} h={70} />
            <Typography variant='h4'>Welcome</Typography>
            <Typography sx={{ color: 'textSecondary' }} gutterBottom>
              Get your files organized with <strong>box</strong>
            </Typography>
          </Grid>
        </Grid>
        {children}
      </Card>
    </section>
  );
};

export default FormLayout;
