import React from 'react';
import { ButtonBase } from '@material-ui/core';
import { Link } from 'react-router-dom';
import LogoImg from '../../../assets/logo.svg';

function SiteLogo({ w, h }) {
   return (
      <div id='logo'>
         <ButtonBase disableRipple component={Link} to='/'>
            <img src={LogoImg} width={w} height={h} alt='Logo' />
         </ButtonBase>
      </div>
   );
}

export default SiteLogo;
