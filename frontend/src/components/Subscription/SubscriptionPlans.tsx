import { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { usePiNetwork } from '@/hooks/usePiNetwork';
import {
  Button,
  Card,
  CircularProgress,
  Alert,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import {
  Check as CheckIcon,
  PiCircle as PiIcon,
  Storage as StorageIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';

const PlansContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  background: linear-gradient(135deg, #f5f6ff, #fff);
  padding: 4rem 2rem;
  border-radius: 1rem;
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const PlanCard = styled(motion(Card))<{ featured?: boolean }>`
  padding: 2rem;
  text-align: center;
  border: ${props => props.featured ? '2px solid #6366f1' : '1px solid #e5e7eb'};
  position: relative;
  overflow: visible;
`;

const FeaturedBadge = styled(Chip)`
  position: absolute;
  top: -12px;
  right: -12px;
`;

const PlanTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const PlanPrice = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #6366f1;
  margin: 1rem 0;

  span {
    font-size: 1rem;
    color: #6b7280;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  text-align: left;
`;

const Feature = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  color: #4b5563;

  svg {
    color: #10b981;
  }
`;

const subscriptionPlans = [
  {
    id: 'basic',
    title: 'Basic',
    price: 5,
    period: 'month',
    features: [
      '5 GB Storage',
      'Basic Support',
      'Standard Speed',
      '1 Project',
      'Community Access'
    ],
    cloudyCoins: 100
  },
  {
    id: 'pro',
    title: 'Pro',
    price: 15,
    period: 'month',
    featured: true,
    features: [
      '50 GB Storage',
      'Priority Support',
      'High Speed Access',
      'Unlimited Projects',
      'Advanced Analytics',
      'Custom Domain'
    ],
    cloudyCoins: 500
  },
  {
    id: 'enterprise',
    title: 'Enterprise',
    price: 30,
    period: 'month',
    features: [
      '500 GB Storage',
      '24/7 Support',
      'Maximum Speed',
      'Unlimited Everything',
      'Custom Solutions',
      'API Access',
      'Dedicated Server'
    ],
    cloudyCoins: 1500
  }
];

const SubscriptionPlans = () => {
  const { piNetwork, authenticate } = usePiNetwork();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubscribe = async (planId: string, amount: number) => {
    setLoading(planId);
    setError('');
    setSuccess('');

    try {
      const auth = await authenticate();
      if (!auth.accessToken) {
        throw new Error('Authentication failed');
      }

      // Create payment using Pi Network SDK
      const payment = await piNetwork.createPayment({
        amount,
        memo: `Subscription to ${planId} plan`,
        metadata: { planId, type: 'subscription' }
      });

      // Handle the payment completion
      const result = await payment.complete();
      
      if (result.status === 'completed') {
        // Call your backend to update user subscription
        await fetch('/api/subscriptions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.accessToken}`
          },
          body: JSON.stringify({
            planId,
            paymentId: result.identifier,
            amount
          })
        });

        setSuccess(`Successfully subscribed to ${planId} plan!`);
      }
    } catch (err) {
      setError(err.message || 'Failed to process subscription');
    } finally {
      setLoading(null);
    }
  };

  return (
    <PlansContainer>
      <Hero>
        <Typography variant="h2" gutterBottom>
          Choose Your Plan
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Get more storage and features with our premium plans
        </Typography>
      </Hero>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 4 }}>
          {success}
        </Alert>
      )}

      <PlansGrid>
        {subscriptionPlans.map((plan) => (
          <PlanCard
            key={plan.id}
            featured={plan.featured}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {plan.featured && (
              <FeaturedBadge
                label="Most Popular"
                color="primary"
              />
            )}
            <PlanTitle>{plan.title}</PlanTitle>
            <PlanPrice>
              {plan.price} π <span>/ {plan.period}</span>
            </PlanPrice>
            <Typography variant="subtitle1" color="primary" gutterBottom>
              {plan.cloudyCoins} Cloudy Coins Included
            </Typography>
            <FeatureList>
              {plan.features.map((feature, index) => (
                <Feature key={index}>
                  <CheckIcon fontSize="small" />
                  {feature}
                </Feature>
              ))}
            </FeatureList>
            <Button
              variant={plan.featured ? "contained" : "outlined"}
              color="primary"
              fullWidth
              size="large"
              onClick={() => handleSubscribe(plan.id, plan.price)}
              disabled={loading === plan.id}
              startIcon={loading === plan.id ? <CircularProgress size={20} /> : <PiIcon />}
            >
              {loading === plan.id ? 'Processing...' : 'Subscribe with Pi'}
            </Button>
          </PlanCard>
        ))}
      </PlansGrid>

      <Box textAlign="center" mt={4}>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          All plans include:
        </Typography>
        <Box display="flex" justifyContent="center" gap={4} mt={2}>
          <Box textAlign="center">
            <StorageIcon color="primary" sx={{ fontSize: 40 }} />
            <Typography variant="body2">Secure Storage</Typography>
          </Box>
          <Box textAlign="center">
            <SpeedIcon color="primary" sx={{ fontSize: 40 }} />
            <Typography variant="body2">Fast Access</Typography>
          </Box>
          <Box textAlign="center">
            <SecurityIcon color="primary" sx={{ fontSize: 40 }} />
            <Typography variant="body2">Data Protection</Typography>
          </Box>
        </Box>
      </Box>
    </PlansContainer>
  );
};

export default SubscriptionPlans; 