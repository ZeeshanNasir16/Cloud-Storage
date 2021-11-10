import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import TuneIcon from '@material-ui/icons/Tune';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { useThemeContext } from 'Components/theme';

const DRAWER_WIDTH = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    top: 12,
    bottom: 12,
    left: -4,
    position: 'fixed',
    zIndex: 2001,
  },

  sideBarBtn: {
    padding: 4,
    marginTop: '-24px',
    left: ({ open }) => (open ? DRAWER_WIDTH - 22 : -5),
    top: ({ open }) => (open ? 18 : '60%'),
    color: 'rgb(33, 43, 54)',
    position: 'absolute',
    backgroundColor: (props) =>
      props.themeMode
        ? theme.mode['dark'][0]
        : theme.mode['light'][1],
    borderRadius: '0px 24px 24px 24px',
    boxShadow:
      'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 12px 24px 0px',
    '& span:hover': {
      color: theme.palette.primary.main,
    },
    transition: 'all 0.25s ease-out',
  },
}));

export default function SideMenu({ onOpenSidebar, open }) {
  const themeMode = useThemeContext();
  const classes = useStyles({ open, themeMode });
  return (
    <div className={classes.root}>
      <div className={classes.sideBarBtn}>
        <IconButton
          onClick={onOpenSidebar}
          sx={{
            mr: 1,
            color: 'text.primary',
          }}
        >
          {open ? <CloseIcon /> : <TuneIcon />}
        </IconButton>
      </div>
    </div>
  );
}
