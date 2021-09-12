// import PropTypes from 'prop-types';
// material
import { Popover } from '@material-ui/core';
import { alpha, styled } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const ArrowStyle = styled('span')(({ theme }) => ({
   [theme.breakpoints.up('sm')]: {
      top: -7,
      zIndex: 1,
      width: 12,
      right: 20,
      height: 12,
      content: "''",
      position: 'absolute',
      borderRadius: '0 0 4px 0',
      transform: 'rotate(-135deg)',
      background: theme.palette.background.paper,
      borderRight: `solid 1px ${alpha(
         theme.palette.grey[500],
         0.12
      )}`,
      borderBottom: `solid 1px ${alpha(
         theme.palette.grey[500],
         0.12
      )}`,
   },
}));

export default function MenuPopover({ children, sx, ...other }) {
   return (
      <Popover
         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
         PaperProps={{
            sx: {
               mt: 1.5,
               ml: 0.5,
               overflow: 'inherit',
               boxShadow: (theme) =>
                  `0 0 2px 0 ${alpha(
                     theme.palette.grey[500],
                     0.24
                  )}, 0 20px 40px -4px ${alpha(
                     theme.palette.grey[500],
                     0.24
                  )}`,
               border: (theme) =>
                  `solid 1px ${theme.palette.grey[500_8]}`,
               width: 200,
               ...sx,
            },
         }}
         {...other}
      >
         <ArrowStyle className='arrow' />
         {children}
      </Popover>
   );
}
