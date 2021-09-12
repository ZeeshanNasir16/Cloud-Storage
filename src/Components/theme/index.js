/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import breakpoints from './breakpoints';
import { changePalette } from './palette';
import ThemeButton from './themeicon/icon';
import GlobalStyles from './GlobalStyles';
import typography from './typography';

const MIndex = ({ children }) => {
   const [isDarkMode, setIsDarkMode] = useState(false);
   //    const themeOptions = React.useMemo(
   //       () => ({
   //          palette: changePalette(isDarkMode ? 'dark' : 'light'),
   //          breakpoints,
   //          typography,
   //       }),
   //       [isDarkMode]
   //    );

   const themeOptions = React.useMemo(
      () => ({
         palette: changePalette(isDarkMode ? 'dark' : 'light'),
         breakpoints,
         typography,
      }),
      [isDarkMode]
   );
   const theme = createTheme(themeOptions);

   // eslint-disable-next-line no-unused-vars
   const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
   };

   return (
      <ThemeProvider theme={theme}>
         <CssBaseline />
         <GlobalStyles />
         {/* <ThemeButton isDarkMode handleChange={toggleDarkMode} /> */}
         {children}
      </ThemeProvider>
   );
};

export default MIndex;
