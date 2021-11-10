import { withStyles } from '@material-ui/styles';

const GlobalStyles = withStyles((theme) => ({
  '@global': {
    '*': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    },
    html: {
      width: '100%',
      height: '100%',
      '-ms-text-size-adjust': '100%',
      '-webkit-overflow-scrolling': 'touch',
    },
    body: {
      width: '100%',
      height: '100%',
    },
    '#root': {
      width: '100%',
      height: '100%',
      overflowY: 'scroll', /// Check for alternate
      // backgroundColor: theme.palette.background.default,
    },
    '#logo': {
      textAlign: 'center',

      '& a': {
        textDecoration: 'none',
        '&:hover': {
          border: 'none',
        },
      },
    },
    input: {
      '&[type=number]': {
        MozAppearance: 'textfield',
        '&::-webkit-outer-spin-button': {
          margin: 0,
          WebkitAppearance: 'none',
        },
        '&::-webkit-inner-spin-button': {
          margin: 0,
          WebkitAppearance: 'none',
        },
      },
    },
    textarea: {
      '&::-webkit-input-placeholder': {
        color: theme.palette.text.disabled,
      },
      '&::-moz-placeholder': {
        opacity: 1,
        color: theme.palette.text.disabled,
      },
      '&:-ms-input-placeholder': {
        color: theme.palette.text.disabled,
      },
      '&::placeholder': { color: theme.palette.text.disabled },
    },
    a: {
      color: theme.palette.primary.dark,
      textDecoration: 'none',
      verticalAlign: '-webkit-baseline-middle',
    },
    img: { display: 'inline-block', maxWidth: '100%' },

    '#portal': {
      maxHeight: 230,
      maxWidth: 300,
      position: 'absolute',
      bottom: 10,
      right: 10,
      backgroundColor: theme.mode,
      borderRadius: 10,
      boxShadow: `0 0 2px 0 ${theme.palette.grey[500_24]}, 0 20px 40px -4px ${theme.palette.grey[500_24]}`,
      border: `solid 1px ${theme.palette.grey[500_48]}`,
      zIndex: 222,
      overflow: 'scroll',
    },
  },
}))(() => null);

export default GlobalStyles;
