import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Page {
  id: string;
  title: string;
  content: string;
  type: 'page' | 'folder';
  children?: Page[];
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}

interface Template {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  thumbnail?: string;
}

interface WorkspaceState {
  pages: Page[];
  templates: Template[];
  currentPageId: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: WorkspaceState = {
  pages: [],
  templates: [
    {
      id: 'meeting-notes',
      title: 'Meeting Notes',
      description: 'Template for taking meeting notes with action items and attendees',
      content: '<h1>Meeting Notes</h1><p>Date: [Date]</p><h2>Attendees</h2><ul><li>[Name]</li></ul><h2>Agenda</h2><ul><li>[Topic]</li></ul><h2>Discussion</h2><p>[Notes]</p><h2>Action Items</h2><ul><li>[ ] Task</li></ul>',
      category: 'Productivity'
    },
    {
      id: 'project-plan',
      title: 'Project Plan',
      description: 'Comprehensive project planning template with goals, timeline, and resources',
      content: '<h1>Project Plan</h1><h2>Overview</h2><p>[Project description]</p><h2>Goals</h2><ul><li>[Goal 1]</li></ul><h2>Timeline</h2><ul><li>[Milestone 1]</li></ul><h2>Resources</h2><ul><li>[Resource 1]</li></ul>',
      category: 'Project Management'
    },
    {
      id: 'weekly-review',
      title: 'Weekly Review',
      description: 'Template for conducting personal or team weekly reviews',
      content: '<h1>Weekly Review</h1><h2>Achievements</h2><ul><li>[Achievement]</li></ul><h2>Challenges</h2><ul><li>[Challenge]</li></ul><h2>Next Week\'s Goals</h2><ul><li>[Goal]</li></ul>',
      category: 'Productivity'
    }
  ],
  currentPageId: null,
  isLoading: false,
  error: null
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPageId = action.payload;
    },
    createPage: (state, action: PayloadAction<Omit<Page, 'createdAt' | 'updatedAt'>>) => {
      const newPage = {
        ...action.payload,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      if (newPage.parentId) {
        const parent = findPageById(state.pages, newPage.parentId);
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(newPage);
        }
      } else {
        state.pages.push(newPage);
      }
    },
    updateContent: (state, action: PayloadAction<{ pageId: string; content: string }>) => {
      const page = findPageById(state.pages, action.payload.pageId);
      if (page) {
        page.content = action.payload.content;
        page.updatedAt = new Date().toISOString();
      }
    },
    moveBlock: (state, action: PayloadAction<{
      sourceIndex: number;
      destinationIndex: number;
      type: string;
      blockId: string;
    }>) => {
      const { sourceIndex, destinationIndex, type } = action.payload;
      if (type === 'page') {
        const [removed] = state.pages.splice(sourceIndex, 1);
        state.pages.splice(destinationIndex, 0, removed);
      }
    },
    deletePage: (state, action: PayloadAction<string>) => {
      const deletePageRecursive = (pages: Page[], id: string): boolean => {
        for (let i = 0; i < pages.length; i++) {
          if (pages[i].id === id) {
            pages.splice(i, 1);
            return true;
          }
          if (pages[i].children) {
            if (deletePageRecursive(pages[i].children, id)) {
              return true;
            }
          }
        }
        return false;
      };
      
      deletePageRecursive(state.pages, action.payload);
    },
  },
});

// Helper function to find a page by ID in the nested structure
const findPageById = (pages: Page[], id: string): Page | null => {
  for (const page of pages) {
    if (page.id === id) {
      return page;
    }
    if (page.children) {
      const found = findPageById(page.children, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

export const {
  setCurrentPage,
  createPage,
  updateContent,
  moveBlock,
  deletePage,
} = workspaceSlice.actions;

export default workspaceSlice.reducer; 