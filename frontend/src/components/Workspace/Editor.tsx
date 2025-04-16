import React, { useCallback, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Box, styled, IconButton, Toolbar } from '@mui/material';
import {
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  Code,
  Title,
  FormatQuote,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { updateContent } from '../../store/slices/workspaceSlice';
import { debounce } from 'lodash';

const EditorContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  overflow: 'auto',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1),
  gap: theme.spacing(1),
}));

const MenuButton = styled(IconButton)(({ theme, active }: { theme: any; active?: boolean }) => ({
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  padding: theme.spacing(0.5),
}));

const Editor: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const dispatch = useDispatch();
  const content = useSelector((state: RootState) => 
    state.workspace.pages.find(p => p.id === pageId)?.content || ''
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content,
    onUpdate: debounce(({ editor }) => {
      if (pageId) {
        dispatch(updateContent({
          pageId,
          content: editor.getHTML(),
        }));
      }
    }, 500),
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <StyledToolbar>
        <MenuButton
          active={editor.isActive('heading', { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <Title />
        </MenuButton>
        <MenuButton
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <FormatBold />
        </MenuButton>
        <MenuButton
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <FormatItalic />
        </MenuButton>
        <MenuButton
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <FormatListBulleted />
        </MenuButton>
        <MenuButton
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <FormatListNumbered />
        </MenuButton>
        <MenuButton
          active={editor.isActive('codeBlock')}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <Code />
        </MenuButton>
        <MenuButton
          active={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <FormatQuote />
        </MenuButton>
      </StyledToolbar>

      <EditorContainer>
        <EditorContent editor={editor} />
      </EditorContainer>
    </Box>
  );
};

export default Editor; 