import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import AppRoutes from './routes';

const App = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isLandingPage && <Navigation />}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <AppRoutes />
      </Box>
    </Box>
  );
};

export default App; 