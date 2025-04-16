import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
  styled,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { createPage } from '../../store/slices/workspaceSlice';
import { v4 as uuidv4 } from 'uuid';

const TemplateCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const TemplateMedia = styled(CardMedia)(({ theme }) => ({
  paddingTop: '56.25%', // 16:9 aspect ratio
  backgroundColor: theme.palette.grey[200],
}));

const Templates: React.FC = () => {
  const templates = useSelector((state: RootState) => state.workspace.templates);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUseTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      const newPageId = uuidv4();
      dispatch(createPage({
        id: newPageId,
        title: `${template.title} - ${new Date().toLocaleDateString()}`,
        content: template.content,
        type: 'page',
      }));
      navigate(`/workspace/${newPageId}`);
    }
  };

  const groupedTemplates = templates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, typeof templates>);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Templates
      </Typography>
      
      {Object.entries(groupedTemplates).map(([category, categoryTemplates]) => (
        <Box key={category} sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {category}
          </Typography>
          
          <Grid container spacing={3}>
            {categoryTemplates.map((template) => (
              <Grid item xs={12} sm={6} md={4} key={template.id}>
                <TemplateCard>
                  {template.thumbnail ? (
                    <TemplateMedia
                      image={template.thumbnail}
                      title={template.title}
                    />
                  ) : (
                    <TemplateMedia
                      title={template.title}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h3">
                      {template.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {template.description}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUseTemplate(template.id)}
                      fullWidth
                    >
                      Use Template
                    </Button>
                  </CardContent>
                </TemplateCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Container>
  );
};

export default Templates; 