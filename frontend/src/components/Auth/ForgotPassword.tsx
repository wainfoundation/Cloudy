import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import {
  TextField,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';

const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f6ff, #fff);
  padding: 1rem;
`;

const AuthCard = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: #1f2937;
  text-align: center;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "☁️";
    margin-right: 0.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Description = styled.p`
  color: #6b7280;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 0.875rem;
  line-height: 1.5;
`;

const Links = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: #6b7280;

  a {
    color: #6366f1;
    text-decoration: none;
    margin: 0 0.5rem;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SuccessMessage = styled(motion.div)`
  text-align: center;
  color: #059669;
  margin-top: 1.5rem;
  padding: 1rem;
  background: #f0fdf4;
  border-radius: 0.5rem;
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Add your password reset logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setSuccess(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo>Cloudy</Logo>
        
        <Description>
          Enter your email address and we'll send you instructions to reset your password.
        </Description>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            disabled={success}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading || success}
            sx={{ mt: 1 }}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Reset Password'}
          </Button>
        </Form>

        {success && (
          <SuccessMessage
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Check your email for password reset instructions.
          </SuccessMessage>
        )}

        <Links>
          <Link to="/login">Back to Sign In</Link>
          <span>•</span>
          <Link to="/signup">Create Account</Link>
        </Links>
      </AuthCard>
    </AuthContainer>
  );
};

export default ForgotPassword; 