import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  styled,
  Collapse,
  Typography,
} from '@mui/material';
import {
  ChevronRight,
  ExpandMore,
  Description,
  Add,
  FolderOutlined,
  Settings,
  Search,
  Template,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const DRAWER_WIDTH = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const WorkspaceHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const StyledListItem = styled(ListItem)<{ depth?: number }>(({ theme, depth = 0 }) => ({
  paddingLeft: theme.spacing(2 + depth * 2),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

interface PageItem {
  id: string;
  title: string;
  type: 'page' | 'folder';
  children?: PageItem[];
}

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const pages = useSelector((state: RootState) => state.workspace.pages);

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (expandedItems.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const renderPageItem = (item: PageItem, depth = 0) => {
    const isExpanded = expandedItems.has(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <React.Fragment key={item.id}>
        <StyledListItem depth={depth} button onClick={() => {
          if (hasChildren) {
            toggleExpand(item.id);
          } else {
            navigate(`/workspace/${item.id}`);
          }
        }}>
          <ListItemIcon>
            {hasChildren ? (
              <IconButton size="small" onClick={(e) => {
                e.stopPropagation();
                toggleExpand(item.id);
              }}>
                {isExpanded ? <ExpandMore /> : <ChevronRight />}
              </IconButton>
            ) : (
              <Description fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText primary={item.title} />
        </StyledListItem>
        {hasChildren && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List disablePadding>
              {item.children.map((child) => renderPageItem(child, depth + 1))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  return (
    <StyledDrawer variant="permanent">
      <WorkspaceHeader>
        <Typography variant="h6">Workspace</Typography>
        <IconButton size="small">
          <Settings fontSize="small" />
        </IconButton>
      </WorkspaceHeader>

      <Box sx={{ p: 1 }}>
        <IconButton size="small" sx={{ mr: 1 }}>
          <Search fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <Add fontSize="small" />
        </IconButton>
      </Box>

      <List>
        <StyledListItem button onClick={() => navigate('/templates')}>
          <ListItemIcon>
            <Template fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Templates" />
        </StyledListItem>

        {pages.map((page) => renderPageItem(page))}
      </List>
    </StyledDrawer>
  );
};

export default Sidebar; 