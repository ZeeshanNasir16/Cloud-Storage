import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Breadcrumbs, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ROOT_FOLDER } from '../../hooks/useFolder';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
   root: {
      '& a': {
         color: theme.palette.primary.darker,
         userSelect: 'none',
      },
   },
   link: {
      display: 'flex',
      alignItems: 'center',
   },
   icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
   },
}));

export default function BreadCrumbs({ currentFolder }) {
   const classes = useStyles();

   //?  If current folder is root folder set path to [] otherwise to path of root folder
   let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
   if (currentFolder) path = [...path, ...currentFolder.path];

   return (
      <Breadcrumbs aria-label='breadcrumb' className={classes.root}>
         {path.map((folder, index) => (
            <Link
               key={folder.id}
               className={classes.link}
               color='textPrimary'
               to={{
                  pathname: folder.id ? `/folder/${folder.id}` : '/',
                  state: {
                     folder: {
                        ...folder,
                        path: path.slice(1, index),
                     },
                  },
               }}
            >
               {folder.id === null && (
                  <HomeIcon className={classes.icon} />
               )}
               {folder.name}
            </Link>
         ))}
         {currentFolder && (
            <Typography
               color='textPrimary'
               variant='subtitle1'
               className={classes.link}
            >
               {currentFolder.id === null && (
                  <HomeIcon className={classes.icon} />
               )}
               {currentFolder.name}
            </Typography>
         )}
      </Breadcrumbs>
   );
}
