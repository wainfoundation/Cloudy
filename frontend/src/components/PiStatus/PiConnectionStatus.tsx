import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Tooltip, Box, Typography } from '@mui/material';
import { usePiNetwork } from '@/hooks/usePiNetwork';

const StatusDot = styled('div')<{ status: 'connected' | 'disconnected' }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.status === 'connected' ? '#22c55e' : '#ef4444'};
  box-shadow: 0 0 8px ${props => props.status === 'connected' ? '#22c55e80' : '#ef444480'};
  margin-right: 8px;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 ${props => props.status === 'connected' ? '#22c55e80' : '#ef444480'};
    }
    70% {
      box-shadow: 0 0 0 6px ${props => props.status === 'connected' ? '#22c55e00' : '#ef444400'};
    }
    100% {
      box-shadow: 0 0 0 0 ${props => props.status === 'connected' ? '#22c55e00' : '#ef444400'};
    }
  }
`;

const StatusContainer = styled(Box)`
  display: flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

const PiConnectionStatus = () => {
  const { piNetwork, authenticate } = usePiNetwork();
  const [isConnected, setIsConnected] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const auth = await authenticate();
        if (auth.accessToken) {
          setIsConnected(true);
          // Get user info if available
          const user = await piNetwork.currentUser();
          setUsername(user?.username || null);
        } else {
          setIsConnected(false);
          setUsername(null);
        }
      } catch (err) {
        setIsConnected(false);
        setUsername(null);
      }
    };

    checkConnection();
    // Check connection status every 30 seconds
    const interval = setInterval(checkConnection, 30000);

    return () => clearInterval(interval);
  }, [authenticate, piNetwork]);

  const handleClick = async () => {
    if (!isConnected) {
      try {
        await authenticate();
      } catch (err) {
        console.error('Failed to connect to Pi Network:', err);
      }
    }
  };

  const getTooltipContent = () => {
    if (isConnected) {
      return username 
        ? `Connected to Pi Network as ${username}`
        : 'Connected to Pi Network';
    }
    return 'Click to connect to Pi Network';
  };

  return (
    <Tooltip title={getTooltipContent()} arrow>
      <StatusContainer onClick={handleClick}>
        <StatusDot status={isConnected ? 'connected' : 'disconnected'} />
        <Typography variant="body2" color="inherit">
          Pi Network {isConnected ? 'Connected' : 'Disconnected'}
        </Typography>
      </StatusContainer>
    </Tooltip>
  );
};

export default PiConnectionStatus; 