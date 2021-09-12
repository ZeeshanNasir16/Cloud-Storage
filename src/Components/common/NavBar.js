import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import LogoSection from '../layouts/LogoSection/SiteLogo';
import { styled } from '@material-ui/core/styles';
import AccountPopover from '../layouts/Dashboard/AccountPopover';

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 72;

const RootStyle = styled(AppBar)(({ theme }) => ({
   zIndex: theme.zIndex.drawer + 1,
   boxShadow: 'none',
   backdropFilter: 'blur(6px)',
   WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
   backgroundColor: theme.palette.background.paper,
   marginBottom: theme.spacing(2),
   borderBottom: '1px solid #e8e8e8',
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
   minHeight: APPBAR_MOBILE,
   '& .MuiIconButton-root': {
      padding: 0,
   },
   [theme.breakpoints.up('lg')]: {
      minHeight: APPBAR_DESKTOP,
      padding: theme.spacing(0, 5),
   },
}));

export default function NavBar() {
   return (
      <RootStyle>
         <ToolbarStyle>
            <LogoSection w={60} h={60} />
            <Box sx={{ flexGrow: 1 }} />
            <AccountPopover />
         </ToolbarStyle>
      </RootStyle>
   );
}
