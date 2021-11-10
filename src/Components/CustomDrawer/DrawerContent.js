import React from 'react';
import {
  Toolbar,
  Typography,
  Container,
  Box,
} from '@material-ui/core';
import Search from 'Components/common/Search';
import ScrollBar from 'Components/common/ScrollBar';
import CloudIcon from '@material-ui/icons/Cloud';
import StorageTreeView from './StorageTreeView';

const DrawerContent = () => {
  return (
    <React.Fragment>
      <Toolbar />
      <Search />

      <ScrollBar
        sx={{
          height: '100%',
          '& .simplebar-content': {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'scroll',
          },
        }}
      >
        <StorageTreeView />
      </ScrollBar>
    </React.Fragment>
  );
};

export default DrawerContent;
