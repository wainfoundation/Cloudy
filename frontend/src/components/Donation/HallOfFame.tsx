import { motion } from 'framer-motion';
import styled from 'styled-components';
import {
  Card,
  Avatar,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  Diamond as DiamondIcon,
  Verified as VerifiedIcon,
  Star as StarIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';

const HallContainer = styled.div`
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
  margin: 0 auto;
`;

const DonorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const DonorCard = styled(motion(Card))`
  padding: 2rem;
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const DonorAvatar = styled(Avatar)`
  && {
    width: 80px;
    height: 80px;
    margin: 0 auto 1rem;
    border: 3px solid #6366f1;
  }
`;

const DonorName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const DonorBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin: 1rem 0;
`;

const DonationAmount = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #6366f1;
  margin: 1rem 0;
`;

const BadgeTooltip = styled(Tooltip)`
  cursor: pointer;
`;

const HallOfFame = () => {
  // Mock data - replace with real donor data from your backend
  const donors = [
    {
      id: 1,
      name: 'Alex Thompson',
      avatar: '👨‍💻',
      amount: 100,
      badges: ['diamond', 'early', 'vip'],
      joinDate: 'January 2024',
    },
    {
      id: 2,
      name: 'Sarah Chen',
      avatar: '👩‍💼',
      amount: 50,
      badges: ['gold', 'early'],
      joinDate: 'February 2024',
    },
    {
      id: 3,
      name: 'Michael Brown',
      avatar: '👨‍🚀',
      amount: 25,
      badges: ['silver'],
      joinDate: 'March 2024',
    },
    // Add more donors as needed
  ];

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'diamond':
        return <DiamondIcon sx={{ color: '#6366f1' }} />;
      case 'gold':
        return <TrophyIcon sx={{ color: '#fbbf24' }} />;
      case 'silver':
        return <StarIcon sx={{ color: '#94a3b8' }} />;
      case 'early':
        return <VerifiedIcon sx={{ color: '#10b981' }} />;
      case 'vip':
        return <DiamondIcon sx={{ color: '#ec4899' }} />;
      default:
        return null;
    }
  };

  const getBadgeLabel = (badge: string) => {
    switch (badge) {
      case 'diamond':
        return 'Diamond Donor';
      case 'gold':
        return 'Gold Donor';
      case 'silver':
        return 'Silver Donor';
      case 'early':
        return 'Early Supporter';
      case 'vip':
        return 'VIP Member';
      default:
        return '';
    }
  };

  return (
    <HallContainer>
      <Hero>
        <Title>Hall of Fame</Title>
        <Subtitle>
          Celebrating our amazing donors who make Cloudy possible. Thank you for your support!
        </Subtitle>
      </Hero>

      <DonorsGrid>
        {donors.map((donor) => (
          <DonorCard
            key={donor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DonorAvatar>{donor.avatar}</DonorAvatar>
            <DonorName>
              {donor.name}
              {donor.badges.includes('diamond') && (
                <DiamondIcon sx={{ color: '#6366f1' }} />
              )}
            </DonorName>
            <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              Member since {donor.joinDate}
            </div>
            <DonationAmount>\${donor.amount}</DonationAmount>
            <DonorBadges>
              {donor.badges.map((badge) => (
                <BadgeTooltip
                  key={badge}
                  title={getBadgeLabel(badge)}
                  arrow
                >
                  <Chip
                    icon={getBadgeIcon(badge)}
                    label={getBadgeLabel(badge)}
                    variant="outlined"
                    size="small"
                  />
                </BadgeTooltip>
              ))}
            </DonorBadges>
          </DonorCard>
        ))}
      </DonorsGrid>
    </HallContainer>
  );
};

export default HallOfFame; 