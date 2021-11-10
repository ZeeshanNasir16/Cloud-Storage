import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import Typography from '@material-ui/core/Typography';
import {
  ChevronRight as FoldIcon,
  ExpandMore as UnfoldIcon,
  Image as ImageIcon,
  FolderOpen as FolderOpenIcon,
  Folder as FolderIcon,
  InsertDriveFile as UnknownFileIcon,
  Description as DocumentIcon,
  ToggleOffSharp,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Tree from 'material-ui-tree';
import getNodeDataByPath from 'material-ui-tree/lib/util';
import { useAuth } from 'Context/AuthContext';
import { database } from '../../firebase';
import { getFileType } from 'Components/Directory/FileTypes';
import CloudyIcon from '@material-ui/icons/CloudQueue';
import RenewIcon from '@material-ui/icons/Autorenew';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: 'transparent',
    maxWidth: 300,
    boxShadow: 'none',
    '& .MuiListItemText-root': {
      flexGrow: 1,
    },
    '& .MuiListItem-button': {
      cursor: 'pointer',
      // '& button': {
      //   flexGrow: 1,
      // },
    },
  },
  node: {
    display: 'flex',
    alignContent: 'center',
    columnGap: 8,
    '& span': {
      maxWidth: '20ch',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      fontWeight: 500,
      fontSize: '0.8rem',
    },
  },
  folderIconOpen: {
    color: theme.palette.primary.dark,
  },
  folderIconClose: {
    color: theme.palette.primary.main,
  },
}));

const checkArr = (arr1, arr2) => {
  const combinedArray = [];
  if (arr1 && arr1.length > 0) combinedArray.push(...arr1);
  if (arr2 && arr2.length > 0) combinedArray.push(...arr2);

  return combinedArray;
};

const getChildData = async (id, userId) => {
  const folders = await database.folders
    .where('parentId', '==', id)
    .where('userId', '==', userId)
    .get();

  const files = await database.files
    .where('folderId', '==', id)
    .where('userId', '==', userId)
    .get();

  const allChildrens = checkArr(
    folders?.docs.map((doc) => database.formattedTree(doc, 'folder')),
    files?.docs.map((doc) =>
      database.formattedTree(
        doc,
        getFileType(doc.data()?.name.split('.').pop())
      )
    )
  );
  return allChildrens;
};

function useIsMountedRef() {
  const isMountedRef = useRef(null);
  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  });
  return isMountedRef;
}

const StorageTreeView = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [folderView, setFolderView] = useState({ data: {} });
  const [loading, setLoading] = useState(false);
  const isMountedRef = useIsMountedRef();

  React.useEffect(() => {
    (async () => {
      const getRootData = await getChildData(null, currentUser.uid);
      if (isMountedRef.current)
        setFolderView({
          data: {
            name: 'My Storage',
            id: '123',
            type: 'root',
            tree: getRootData,
          },
        });
    })();
  }, [currentUser.uid, isMountedRef]);

  const requestChildrenData = useCallback(
    async (data, name, toggleFoldStatus) => {
      if (Object.keys(data).length !== 0) {
        const { id, type } = data;
        let chkId = id;
        if (id === '123') chkId = null;
        if (type === 'folder') {
          try {
            const childData = await getChildData(
              chkId,
              currentUser.uid
            );
            const treeData = Object.assign({}, folderView.data);
            getNodeDataByPath(treeData, name, 'tree').tree =
              childData;
            if (isMountedRef.current)
              setFolderView({
                ...folderView,
                data: treeData,
              });
            toggleFoldStatus();
          } catch (error) {
            toast.error(`Error getting files & folders, ${error}`, {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        } else {
          toggleFoldStatus();
        }
      }
    },
    [folderView, setFolderView, currentUser, isMountedRef]
  );

  const renderLabel = useCallback(
    (data, unfoldStatus) => {
      if (Object.keys(data).length !== 0) {
        const { type } = data;
        let iconComp = null;
        if (type === 'root')
          iconComp = <CloudyIcon color='secondary' />;
        else if (type === 'folder') {
          iconComp = unfoldStatus ? (
            <FolderOpenIcon style={{ color: '#F7D672' }} />
          ) : (
            <FolderIcon style={{ color: '#F7D672' }} />
          );
        } else {
          if (
            getFileType(data?.name.split('.').pop()) === 'document'
          ) {
            iconComp = <DocumentIcon style={{ color: '#3EB5FD' }} />;
          } else if (
            getFileType(data?.name.split('.').pop()) === 'image'
          ) {
            iconComp = iconComp = (
              <ImageIcon style={{ color: '#8D0A9A' }} />
            );
          } else {
            <UnknownFileIcon style={{ color: '#E94848' }} />;
          }
        }
        return (
          iconComp && (
            <Typography
              component='span'
              variant='body2'
              className={classes.node}
            >
              {React.cloneElement(iconComp, {
                className: classes.icon,
              })}
              <span>{data?.name}</span>
            </Typography>
          )
        );
      }
    },
    [classes]
  );

  const getActionsData = useCallback(
    (data, name, unfoldStatus, toggleFoldStatus) => {
      const { type, id } = data;
      if (type === 'folder' || type === 'root') {
        const chkId = id === '123' ? null : id;
        if (unfoldStatus) {
          if (data.type !== 'root' && data.type === 'folder') {
            if (!Reflect.has(data, 'tree')) {
              toggleFoldStatus();
            }
          }
        }
        if (!unfoldStatus) {
          return null;
        }

        return {
          icon: (
            <RenewIcon color='primary' size='sm' disabled={loading} />
          ),
          // label: 'Refresh',
          //hint: 'Refresh',
          onClick: async () => {
            setLoading(true);

            const getRootData = await getChildData(
              chkId,
              currentUser.uid
            );
            const treeData = Object.assign({}, folderView.data);
            const nodeData = getNodeDataByPath(
              treeData,
              name,
              'tree'
            );
            if (
              !Reflect.has(nodeData, 'tree') ||
              !Reflect.has(nodeData.tree, 'length')
            ) {
              nodeData.tree = [];
            }
            nodeData.tree = getRootData;
            if (isMountedRef.current) {
              setLoading(false);
              setFolderView({ ...folderView, data: treeData });
            }
          },
        };
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [folderView, setFolderView, currentUser.uid, isMountedRef]
  );

  return (
    <>
      <Tree
        className={classes.container}
        data={folderView?.data}
        labelKey='name'
        valueKey='id'
        childrenKey='tree'
        foldIcon={<FoldIcon />}
        unfoldIcon={<UnfoldIcon />}
        unfoldFirst
        renderLabel={renderLabel}
        getActionsData={getActionsData}
        requestChildrenData={requestChildrenData}
      />
    </>
  );
};

export default StorageTreeView;
