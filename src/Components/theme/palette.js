import { alpha } from '@material-ui/core/styles';

export const changePalette = (theme, themeColors) => {
  // ~  theme value true for dark mode and false for light mode
  const palette = {
    primary: { ...PRIMARY },

    background: {
      paper: theme ? themeColors['dark'][0] : themeColors['light'][0],
      // default: theme ? '#1A222B' : '#F7F9FC',
    },
    text: {
      primary: theme ? GREY[0] : GREY[900],
      secondary: theme ? GREY[200] : GREY[600],
      disabled: theme ? PRIMARY.main : GREY[500],
    },

    grey: GREY,
    // divider: theme ? '#384150' : '#EDEDEF',
    divider: theme ? '#384150' : GREY[500],
    action: { ...actions },
  };

  return palette;
};

const PRIMARY = {
  // ? Color Selected
  lighter: '#C8FACD',
  light: '#5BE584',
  main: '#00AB55',
  dark: '#007B55',
  darker: '#005249',
  contrastText: '#fff',
};

// SETUP COLORS
const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB', // input button for back color
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381', // input svg color
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  10_5: alpha('#FFFFFF', 0.05),
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8), //#5a6169
};

const actions = {
  active: GREY[600],
  hover: GREY[500_8],
  selected: GREY[500_16],
  disabled: GREY[500_80],
  disabledBackground: GREY[500_24],
  focus: GREY[500_24],
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
};
