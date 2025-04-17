import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { usePiNetwork } from '@/hooks/usePiNetwork';
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  PiCircle as PiIcon,
} from '@mui/icons-material';

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

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: #6b7280;
  margin: 1.5rem 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e5e7eb;
  }

  &::before {
    margin-right: 0.5rem;
  }

  &::after {
    margin-left: 0.5rem;
  }
`;

const PiButton = styled(Button)`
  && {
    background-color: #6366f1;
    color: white;
    padding: 0.75rem 1.5rem;
    text-transform: none;
    font-size: 1rem;
    
    &:hover {
      background-color: #4f46e5;
    }
  }
`;

const Links = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #6b7280;

  a {
    color: #6366f1;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const TermsText = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  text-align: center;
  margin-top: 1rem;

  a {
    color: #6366f1;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SignUp = () => {
  const navigate = useNavigate();
  const { piNetwork, authenticate } = usePiNetwork();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      setError('Please accept the terms and conditions');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Add your signup logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePiSignUp = async () => {
    if (!acceptTerms) {
      setError('Please accept the terms and conditions');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      const auth = await authenticate();
      if (auth.accessToken) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Pi Network authentication failed');
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
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
          />
          
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            fullWidth
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                color="primary"
              />
            }
            label="I accept the terms and conditions"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading || !acceptTerms}
            sx={{ mt: 1 }}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Create Account'}
          </Button>
        </Form>

        <OrDivider>or</OrDivider>

        <PiButton
          fullWidth
          onClick={handlePiSignUp}
          disabled={isLoading || !acceptTerms}
          startIcon={<PiIcon />}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Sign up with Pi Network'}
        </PiButton>

        <Links>
          <span>Already have an account? </span>
          <Link to="/login" style={{ marginLeft: '0.5rem' }}>Sign in</Link>
        </Links>

        <TermsText>
          By creating an account, you agree to our{' '}
          <Link to="/terms">Terms of Service</Link> and{' '}
          <Link to="/privacy">Privacy Policy</Link>
        </TermsText>
      </AuthCard>
    </AuthContainer>
  );
};

export default SignUp; 