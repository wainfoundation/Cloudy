import { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { usePiNetwork } from '@/hooks/usePiNetwork';
import {
  Button,
  Card,
  TextField,
  CircularProgress,
  Alert,
  Tooltip,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import {
  PiCircle as PiIcon,
  CurrencyBitcoin as CryptoIcon,
  PaymentOutlined as PayPalIcon,
  Diamond as RewardIcon,
  Favorite as HeartIcon,
} from '@mui/icons-material';

const DonationContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const DonationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const DonationCard = styled(Card)`
  padding: 2rem;
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const DonationAmount = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 1rem 0;
`;

const RewardsSection = styled.div`
  background: linear-gradient(135deg, #f5f6ff, #fff);
  padding: 3rem;
  border-radius: 1rem;
  margin-bottom: 4rem;
`;

const RewardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const RewardCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  text-align: center;

  svg {
    font-size: 3rem;
    color: #6366f1;
    margin-bottom: 1rem;
  }
`;

const PaymentSection = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const PaymentMethods = styled.div`
  margin: 2rem 0;
`;

const CustomButton = styled(Button)`
  && {
    padding: 1rem 2rem;
    font-size: 1.1rem;
    margin-top: 1rem;
  }
`;

const Donation = () => {
  const { piNetwork, authenticate } = usePiNetwork();
  const [amount, setAmount] = useState('10');
  const [paymentMethod, setPaymentMethod] = useState('pi');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleDonate = async () => {
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      if (paymentMethod === 'pi') {
        const auth = await authenticate();
        if (auth.accessToken) {
          // Implement Pi payment here
          await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate payment
        }
      } else {
        // Implement other payment methods
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate payment
      }
      setSuccess(true);
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const donationTiers = [
    { amount: '5', rewards: 'Bronze Badge' },
    { amount: '10', rewards: 'Silver Badge + Early Access' },
    { amount: '25', rewards: 'Gold Badge + VIP Updates' },
  ];

  return (
    <DonationContainer>
      <Hero>
        <Title>Support Cloudy</Title>
        <Subtitle>
          Help us build the future of decentralized storage. Your support makes a difference.
        </Subtitle>
      </Hero>

      <DonationGrid>
        {donationTiers.map((tier) => (
          <DonationCard key={tier.amount}>
            <DonationAmount>\${tier.amount}</DonationAmount>
            <p>{tier.rewards}</p>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setAmount(tier.amount)}
            >
              Select
            </Button>
          </DonationCard>
        ))}
      </DonationGrid>

      <RewardsSection>
        <Title style={{ fontSize: '2rem' }}>Donor Rewards</Title>
        <RewardsGrid>
          <RewardCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Diamond />
            <h3>Hall of Fame</h3>
            <p>Get featured on our donors wall</p>
          </RewardCard>

          <RewardCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <RewardIcon />
            <h3>Early Access</h3>
            <p>Be the first to try new features</p>
          </RewardCard>

          <RewardCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <HeartIcon />
            <h3>Custom Badges</h3>
            <p>Show off your support with exclusive badges</p>
          </RewardCard>
        </RewardsGrid>
      </RewardsSection>

      <PaymentSection>
        <Card sx={{ p: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Thank you for your donation! Check your email for reward details.
            </Alert>
          )}

          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />

          <PaymentMethods>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="pi"
                control={<Radio />}
                label={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <PiIcon style={{ marginRight: '8px' }} /> Pi Network
                  </div>
                }
              />
              <FormControlLabel
                value="crypto"
                control={<Radio />}
                label={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CryptoIcon style={{ marginRight: '8px' }} /> Cryptocurrency
                  </div>
                }
              />
              <FormControlLabel
                value="paypal"
                control={<Radio />}
                label={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <PayPalIcon style={{ marginRight: '8px' }} /> PayPal
                  </div>
                }
              />
            </RadioGroup>
          </PaymentMethods>

          <CustomButton
            variant="contained"
            fullWidth
            onClick={handleDonate}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Donate Now'}
          </CustomButton>
        </Card>
      </PaymentSection>
    </DonationContainer>
  );
};

export default Donation; 