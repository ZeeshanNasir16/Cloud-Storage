import { makeStyles, alpha } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
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
      // backgroundColor: alpha(
      //   theme.palette.primary.dark,
      //   theme.palette.action.selectedOpacity
      // ),
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
