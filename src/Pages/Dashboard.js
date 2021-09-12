import React, { useState } from 'react';
import { useFolder } from '../hooks/useFolder';
import { useParams, useLocation } from 'react-router-dom';
import {
   Box,
   Drawer,
   Toolbar,
   Divider,
   Backdrop,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../Components/common/NavBar';
import SideMenu from '../Components/CustomDrawer/SideMenu';
import { MHidden } from '../Components/@material-extend';
import Search from '../Components/common/Search';
import TreeView from '../Components/CustomDrawer/TreeView';
import ScrollBar from '../Components/common/ScrollBar';
import FolderLayout from '../Components/layouts/common/FolderLayout';
import Folder from '../Components/ٖFolder/Folder';
import File from '../Components/ٖFolder/File';
import Subheader from '../Components/common/SubHeader';
// import EmptyDashboard from '../Components/layouts/Dashboard/EmptyDashboard';

const DRAWER_WIDTH = 300;

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
      position: 'relative',
   },
   backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
   },
   drawer: {
      minWidth: DRAWER_WIDTH,
      flexShrink: 0,
   },
   drawerPaper: {
      minWidth: DRAWER_WIDTH,
   },
   content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      position: 'relative',
   },
}));

function Dashboard() {
   const classes = useStyles();
   const { folderId } = useParams();
   const { state = {} } = useLocation();

   const { folder, childFolders, childFiles } = useFolder(
      folderId,
      state.folder
   );

   console.log('Dashboard ', folder, childFolders, childFiles);

   const [open, setOpen] = useState(false);

   const toggleSideBar = () => {
      setOpen((prev) => !prev);
   };

   const renderContent = (
      <React.Fragment>
         <Toolbar />
         <Search />
         <Divider />
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
            <TreeView />
         </ScrollBar>
      </React.Fragment>
   );

   return (
      <div className={classes.root}>
         <Backdrop
            className={classes.backdrop}
            open={open}
            onClick={toggleSideBar}
         />
         <Box
            sx={{
               display: 'flex',
               minHeight: '100vh',
            }}
         >
            <NavBar />
            <MHidden width='smDown'>
               <Drawer
                  variant='permanent'
                  className={classes.drawer}
                  onClose={toggleSideBar}
                  classes={{
                     paper: classes.drawerPaper,
                  }}
               >
                  {renderContent}
               </Drawer>
            </MHidden>
            <MHidden width='mdUp'>
               <SideMenu onOpenSidebar={toggleSideBar} open={open} />
               <Drawer
                  open={open}
                  className={classes.drawer}
                  onClose={toggleSideBar}
                  classes={{
                     paper: classes.drawerPaper,
                  }}
               >
                  {renderContent}
               </Drawer>
            </MHidden>
         </Box>
         <main className={classes.content}>
            <Toolbar />
            <Subheader currentFolder={folder} />
            {childFolders === null || childFiles === null ? (
               <div>Loading</div>
            ) : (
               <FolderLayout>
                  {childFolders.length > 0 &&
                     childFolders.map((childFolder) => (
                        <Folder
                           key={childFolder.id}
                           folder={childFolder}
                        />
                     ))}
                  {childFiles.length > 0 &&
                     childFiles.map((childFile) => (
                        <File
                           key={childFile.id}
                           file_ext={childFile.name.split('.').pop()}
                           file={childFile}
                        />
                     ))}
               </FolderLayout>
            )}
         </main>
      </div>
   );
}

export default Dashboard;
// {
//    childFolders === null || childFiles === null ? (
//       <div>Loading</div>
//    ) : childFolders.length !== 0 && childFiles.length !== 0 ? (
//       <FolderLayout>
//          {childFolders.length > 0 &&
//             childFolders.map((childFolder) => (
//                <Folder key={childFolder.id} folder={childFolder} />
//             ))}
//          {childFiles.length > 0 &&
//             childFiles.map((childFile) => (
//                <File
//                   key={childFile.id}
//                   file_ext={childFile.name.split('.').pop()}
//                   file={childFile}
//                />
//             ))}
//       </FolderLayout>
//    ) : (
//       <EmptyDashboard />
//    );
// }
