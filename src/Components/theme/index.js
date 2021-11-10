/* eslint-disable no-unused-vars */
import React, { useMemo, createContext, useContext } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import breakpoints from './breakpoints';
import { changePalette } from './palette';
import GlobalStyles from './GlobalStyles';
import typography from './typography';
import { useDarkMode } from 'hooks/useDarkMode';

export const DarkModeContext = createContext();

export const useThemeContext = () => {
  return useContext(DarkModeContext);
};

const themeColors = {
  light: ['#FFFFFF', '#EFF2F9'],
  dark: ['#0A112B', '#161F3E'],
};

const MIndex = ({ children }) => {
  const [themeMode, setThemeMode] = useDarkMode('theme', 1);

  const themeOptions = useMemo(() => {
    return {
      overrides: {
        MuiCssBaseline: {
          '@global': {
            body: {
              backgroundColor: themeMode
                ? themeColors['dark'][1]
                : themeColors['light'][1],
              backgroundRepeat: 'no-repeat',

              '& #portal': {
                backgroundColor: themeMode
                  ? themeColors['dark'][0]
                  : themeColors['light'][0],
              },
            },
          },
        },
        MuiOutlinedInput: {
          root: {
            backgroundColor: themeMode
              ? themeColors['dark'][1]
              : themeColors['light'][1],

            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#454F5B',
            },
          },
        },
      },
      palette: changePalette(themeMode, themeColors),
      breakpoints,
      typography,
      mode: themeColors,
    };
  }, [themeMode]);

  const theme = createTheme(themeOptions);

  const toggleDarkMode = (val) => {
    setThemeMode(val ? 1 : 0);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <DarkModeContext.Provider value={{ toggleDarkMode, themeMode }}>
        {children}
      </DarkModeContext.Provider>
    </ThemeProvider>
  );
};

export default MIndex;
