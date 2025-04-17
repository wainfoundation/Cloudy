import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

interface SplashScreenProps {
  isLoading: boolean;
  onLoadingComplete?: () => void;
}

const SplashContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f6ff, #fff);
  z-index: 9999;
  font-family: 'Inter', ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
`;

const Content = styled.div`
  text-align: center;
`;

const Logo = styled.div`
  font-size: clamp(32px, 8vw, 40px);
  font-weight: 600;
  color: #1f2937;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;

  &::before {
    content: "☁️";
    margin-right: 12px;
    font-size: clamp(36px, 8vw, 44px);
    display: inline-block;
    animation: float 2s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @media (max-width: 480px) {
    font-size: clamp(28px, 8vw, 36px);
    &::before {
      font-size: clamp(32px, 8vw, 40px);
      margin-right: 8px;
    }
  }
`;

const Tagline = styled.p`
  font-size: clamp(14px, 3vw, 16px);
  font-weight: 400;
  color: #6b7280;
  margin-bottom: 32px;

  @media (max-width: 480px) {
    font-size: clamp(12px, 3vw, 14px);
  }
`;

const Loader = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid #6366f1;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
  }
`;

const SplashScreen: React.FC<SplashScreenProps> = ({ isLoading, onLoadingComplete }) => {
  useEffect(() => {
    if (!isLoading && onLoadingComplete) {
      onLoadingComplete();
    }
  }, [isLoading, onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <SplashContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Content>
            <Logo>Cloudy</Logo>
            <Tagline>Unleash Your Creativity with Pi ☁️</Tagline>
            <Loader />
          </Content>
        </SplashContainer>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen; 