import React from 'react';
import { Box, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(10),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function EmptyDashboard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <Box
          sx={{
            maxWidth: 500,
            margin: 'auto',
            textAlign: 'center',
          }}
        >
          <Typography variant='h3' paragraph>
            Looks like there isn't any items.
          </Typography>
          <Typography sx={{ color: 'textSecondary' }}>
            Start adding your files & folders
          </Typography>

          <Box
            component='img'
            src='/static/illustrations/empty.png'
            sx={{
              maxHeight: 260,
              mx: 'auto',
              my: { xs: 5, sm: 10 },
            }}
          />
        </Box>
      </Container>
    </div>
  );
}
