import { configureStore } from '@reduxjs/toolkit';
import workspaceReducer from './slices/workspaceSlice';

export const store = configureStore({
  reducer: {
    workspace: workspaceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['workspace/updateContent'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.content'],
        // Ignore these paths in the state
        ignoredPaths: ['workspace.pages.content'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 