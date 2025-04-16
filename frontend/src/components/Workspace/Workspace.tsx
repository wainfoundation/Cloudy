import React from 'react';
import { Box, styled } from '@mui/material';
import Sidebar from './Sidebar';
import Editor from './Editor';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { moveBlock } from '../../store/slices/workspaceSlice';

const WorkspaceContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const MainContent = styled(Box)(({ theme }) => ({
  flex: 1,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
}));

const Workspace: React.FC = () => {
  const dispatch = useDispatch();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    dispatch(moveBlock({
      sourceIndex: result.source.index,
      destinationIndex: result.destination.index,
      type: result.type,
      blockId: result.draggableId,
    }));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <WorkspaceContainer>
        <Sidebar />
        <MainContent>
          <Editor />
        </MainContent>
      </WorkspaceContainer>
    </DragDropContext>
  );
};

export default Workspace; 