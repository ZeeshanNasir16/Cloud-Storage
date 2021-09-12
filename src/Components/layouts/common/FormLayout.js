import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import SiteLogo from '../LogoSection/SiteLogo';

const ContentStyle = styled('div')(({ theme }) => ({
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
      backgroundColor: '#fff',
      boxShadow: '0 6px 15px rgb(0 0 0 / 16%)',
   },
}));

const ContentContainer = styled('div')(({ theme }) => ({
   position: 'relative',
   marginLeft: 0,
   marginRight: 0,
   height: '100%',
   display: 'flex',
   flexWrap: 'wrap',
   backgroundColor: '#fff',
   [theme.breakpoints.up('sm')]: {
      background: 'transparent',
   },
}));

const BackImgContainer = styled('div')(({ theme }) => ({
   display: 'none',
   width: '100%',
   height: 'inherit',
   padding: 60,
   position: 'absolute',

   [theme.breakpoints.up('sm')]: {
      display: 'inline-block',
   },
}));

const BackImg = styled('div')({
   position: 'relative',
   top: '50%',
   transform: 'translateY(-50%)',
   textAlign: 'center',

   '& img': {
      maxWidth: 534,
   },
});

function FormLayout({ children }) {
   return (
      <ContentContainer>
         <BackImgContainer>
            <BackImg>
               <img
                  src='http://brandio.io/envato/iofrm/html/images/graphic3.svg'
                  alt='background'
               />
            </BackImg>
         </BackImgContainer>

         <ContentStyle>
            <Grid container>
               <Grid item sx={{ mb: 5 }} colspacing={5} xs={12}>
                  <SiteLogo w={70} h={70} />
                  <Typography variant='h4'>Welcome</Typography>
                  <Typography
                     sx={{ color: 'text.secondary' }}
                     gutterBottom
                  >
                     Get your files organized with{' '}
                     <strong>box</strong>
                  </Typography>
               </Grid>
            </Grid>
            {children}
         </ContentStyle>
      </ContentContainer>
   );
}

export default FormLayout;
