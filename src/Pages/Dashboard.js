import React, { useState } from 'react';
import { useFolder } from 'hooks/useFolder';
import { useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { database } from '../firebase';
import { Box, Drawer, Toolbar, Backdrop } from '@material-ui/core';
import { MHidden } from 'Components/@material-extend';
import NavBar from 'Components/common/NavBar';
import Subheader from 'Components/common/SubHeader';
import DrawerContent from 'Components/CustomDrawer/DrawerContent';
import SideMenu from 'Components/CustomDrawer/SideMenu';
import FolderLayout from 'Components/layouts/common/FolderLayout';
import Folder from 'Components/Directory/Folder';
import File from 'Components/Directory/File';
import EmptyDashboard from 'Components/layouts/Dashboard/EmptyDashboard';
import { useThemeContext } from 'Components/theme';
import { useStyles } from 'Styles/DashboardStyles';

function Dashboard() {
  const themeMode = useThemeContext();
  const classes = useStyles(themeMode);
  const { folderId } = useParams();
  const { state = {} } = useLocation();

  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state.folder
  );

  const [open, setOpen] = useState(false);

  const toggleSideBar = () => {
    setOpen((prev) => !prev);
  };

  //? func to check filename and rename file if not same
  const checkChildFiles = async (type, dirName, dirId) => {
    if (type === 'file') {
      let casesensitive = dirName.toLowerCase();
      const result =
        childFiles.filter(
          (file) => file.name.toLowerCase() === casesensitive
        ).length > 0;

      if (!result) {
        //? Update file name
        try {
          await database.files.doc(dirId).update({
            name: dirName,
          });

          toast.success(`${type} name updated successfully`, {
            position: toast.POSITION.TOP_CENTER,
          });
        } catch (error) {
          toast.error(`Failed to rename, ${error.code}`, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } else
        toast.warning(
          'File with same name already exists, choose different name',
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
    } else {
      let casesensitive = dirName.toLowerCase();
      const result =
        childFolders.filter(
          (folder) => folder.name.toLowerCase() === casesensitive
        ).length > 0;

      if (!result) {
        //? Update file name
        try {
          await database.folders.doc(dirId).update({
            name: dirName,
          });
          toast.success(`${type} name updated successfully`, {
            position: toast.POSITION.TOP_CENTER,
          });
        } catch (error) {
          toast.error(`Failed to rename, ${error.code}`, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } else
        toast.warning(
          'Folder with same name already exists, choose different name',
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
    }
  };

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
            <DrawerContent />
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
            <DrawerContent />
          </Drawer>
        </MHidden>
      </Box>
      <main className={classes.content}>
        <Toolbar />
        <Subheader currentFolder={folder} />
        {childFolders === null || childFiles === null ? (
          <Box className={classes.loader}>
            <img src='/static/loader/spinner.gif' alt='loader' />
          </Box>
        ) : !childFolders.length && !childFiles.length ? (
          <EmptyDashboard />
        ) : (
          <FolderLayout>
            {childFolders.length > 0 &&
              childFolders.map((childFolder) => (
                <Folder
                  key={childFolder.id}
                  folder={childFolder}
                  parentDirChk={checkChildFiles}
                />
              ))}
            {childFiles.length > 0 &&
              childFiles.map((childFile) => (
                <File
                  key={childFile.id}
                  file_ext={childFile.name.split('.').pop()}
                  file={childFile}
                  parentDirChk={checkChildFiles}
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
