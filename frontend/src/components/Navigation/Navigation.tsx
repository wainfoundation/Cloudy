import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, styled } from '@mui/material';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PiConnectionStatus from '../PiStatus/PiConnectionStatus';

const StyledAppBar = styled(AppBar)`
  background-color: #1a1a1a;
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const NavLinks = styled('div')`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Navigation = () => {
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button color="inherit">CloudyPi</Button>
        </Link>
        <NavLinks>
          <Link to="/templates" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="inherit">Templates</Button>
          </Link>
          <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="inherit">About</Button>
          </Link>
          <Link to="/storage" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="inherit">Storage</Button>
          </Link>
          <Link to="/subscription" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button 
              color="primary"
              variant="contained"
              startIcon={<WorkspacePremiumIcon />}
            >
              Upgrade
            </Button>
          </Link>
          <Link to="/donate" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="inherit" startIcon={<VolunteerActivismIcon />}>
              Donate
            </Button>
          </Link>
          <Link to="/hall-of-fame" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="inherit" startIcon={<EmojiEventsIcon />}>
              Hall of Fame
            </Button>
          </Link>
          <PiConnectionStatus />
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="inherit">Login</Button>
          </Link>
          <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="inherit" variant="outlined">
              Sign Up
            </Button>
          </Link>
        </NavLinks>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Navigation; 