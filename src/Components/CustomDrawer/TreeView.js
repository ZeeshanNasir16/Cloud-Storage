import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, alpha } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import FolderIcon from '@material-ui/icons/Folder';

const useTreeItemStyles = makeStyles((theme) => ({
   root: {
      color: theme.palette.text.secondary,
      '&:hover > $content': {
         backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.focusOpacity
         ),
      },

      '&:focus > $content, &$selected > $content': {
         //  backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[100]})`,
         color: 'var(--tree-view-color)',
         backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.focusOpacity
         ),
      },
      '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label':
         {
            backgroundColor: 'transparent',
         },

      // ? Changing the selected item  styles
      '&.MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label':
         {
            backgroundColor: 'transparent',
         },
      '&.MuiTreeItem-root.Mui-selected > .MuiTreeItem-content': {
         //  backgroundColor: theme.palette.grey[100],
         backgroundColor: alpha(
            theme.palette.primary.dark,
            theme.palette.action.selectedOpacity
         ),
      },
   },
   content: {
      color: theme.palette.text.secondary,
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      '$expanded > &': {
         fontWeight: theme.typography.fontWeightRegular,
      },
   },
   group: {
      marginLeft: 0,
      '& $content': {
         paddingLeft: theme.spacing(2),
      },
   },
   expanded: {},
   selected: {},
   label: {
      fontWeight: 'inherit',
      color: 'inherit',
   },
   labelRoot: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0.7, 0),
   },
   labelIcon: {
      marginRight: theme.spacing(1),
   },
   labelText: {
      fontWeight: 'inherit',
      flexGrow: 1,
   },
}));

function StyledTreeItem(props) {
   const classes = useTreeItemStyles();
   const {
      labelText,
      labelIcon: LabelIcon,
      labelInfo,
      color,
      bgColor,
      ...other
   } = props;

   return (
      <TreeItem
         label={
            <div className={classes.labelRoot}>
               <LabelIcon
                  color='inherit'
                  className={classes.labelIcon}
               />
               <Typography
                  variant='body2'
                  className={classes.labelText}
               >
                  {labelText}
               </Typography>
               <Typography variant='caption' color='inherit'>
                  {labelInfo}
               </Typography>
            </div>
         }
         style={{
            '--tree-view-color': color,
            '--tree-view-bg-color': bgColor,
         }}
         classes={{
            root: classes.root,
            content: classes.content,
            expanded: classes.expanded,
            selected: classes.selected,
            group: classes.group,
            label: classes.label,
         }}
         {...other}
      />
   );
}

StyledTreeItem.propTypes = {
   bgColor: PropTypes.string,
   color: PropTypes.string,
   labelIcon: PropTypes.elementType.isRequired,
   labelInfo: PropTypes.string,
   labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
   root: {
      flexGrow: 1,
      maxWidth: 280,
   },
});

export default function GmailTreeView() {
   const classes = useStyles();

   return (
      <TreeView
         className={classes.root}
         defaultExpanded={['3']}
         defaultCollapseIcon={<ArrowDropDownIcon />}
         defaultExpandIcon={<ArrowRightIcon />}
         defaultEndIcon={<div style={{ width: 24 }} />}
      >
         <StyledTreeItem
            nodeId='1'
            labelText='Folder'
            labelIcon={FolderIcon}
         />
         <StyledTreeItem
            nodeId='2'
            labelText='Trash'
            labelIcon={DeleteIcon}
         />
         {/* <StyledTreeItem
            nodeId='3'
            labelText='Categories'
            labelIcon={FolderOpenIcon}
         >
            <StyledTreeItem
               nodeId='9'
               labelText='Categories'
               labelIcon={FolderOpenIcon}
            >
               <StyledTreeItem
                  nodeId='10'
                  labelText='Social'
                  labelIcon={SupervisorAccountIcon}
                  labelInfo='90'
                  color='#1a73e8'
                  bgColor='#e8f0fe'
               />
               <StyledTreeItem
                  nodeId='11'
                  labelText='Updates'
                  labelIcon={InfoIcon}
                  labelInfo='2,294'
                  color='#e3742f'
                  bgColor='#fcefe3'
               />
               <StyledTreeItem
                  nodeId='12'
                  labelText='Forums'
                  labelIcon={ForumIcon}
                  labelInfo='3,566'
                  color='#a250f5'
                  bgColor='#fff'
               />
               <StyledTreeItem
                  nodeId='13'
                  labelText='Promotions'
                  labelIcon={LocalOfferIcon}
                  labelInfo='733'
                  color='#3c8039'
                  bgColor='#e6f4ea'
               />

               <StyledTreeItem
                  nodeId='19'
                  labelText='Categories'
                  labelIcon={FolderOpenIcon}
               >
                  <StyledTreeItem
                     nodeId='22'
                     labelText='Promotions'
                     labelIcon={LocalOfferIcon}
                     labelInfo='733'
                     color='#3c8039'
                     bgColor='#e6f4ea'
                  />
               </StyledTreeItem>
            </StyledTreeItem>
            <StyledTreeItem
               nodeId='14'
               labelText='Social'
               labelIcon={SupervisorAccountIcon}
               labelInfo='90'
               color='#1a73e8'
               bgColor='#e8f0fe'
            />
            <StyledTreeItem
               nodeId='15'
               labelText='Updates'
               labelIcon={InfoIcon}
               labelInfo='2,294'
               color='#e3742f'
               bgColor='#fcefe3'
            />
         </StyledTreeItem> */}
      </TreeView>
   );
}
