import { motion } from 'framer-motion';
import styled from 'styled-components';

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  color: #6b7280;
  margin-bottom: 2rem;
`;

const PiStatus = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  background: #f0fdf4;
  color: #166534;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 500;
  margin-bottom: 2rem;

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    background: #22c55e;
    border-radius: 50%;
    margin-right: 0.5rem;
  }
`;

const Section = styled(motion.section)`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const SectionContent = styled.div`
  color: #4b5563;
  font-size: 1.125rem;
  line-height: 1.75;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: #6b7280;
  line-height: 1.6;
`;

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <AboutContainer>
      <Hero>
        <Title
          initial="hidden"
          animate="visible"
          variants={itemVariants}
        >
          About Cloudy
        </Title>
        <Subtitle
          initial="hidden"
          animate="visible"
          variants={itemVariants}
        >
          Building the future of decentralized finance on Pi Network
        </Subtitle>
        <PiStatus
          initial="hidden"
          animate="visible"
          variants={itemVariants}
        >
          Pi Network Connected
        </PiStatus>
      </Hero>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Section variants={itemVariants}>
          <SectionTitle>Our Mission</SectionTitle>
          <SectionContent>
            <h3 className="text-xl font-semibold mb-4">Building a decentralized future with Pi</h3>
            <p className="mb-4">
              Cloudy is dedicated to creating powerful, accessible tools for the Pi Network ecosystem. 
              Our mission is to drive real-world utility and adoption of Pi cryptocurrency through intuitive, 
              secure applications that connect users with merchants and services.
            </p>
            <p>
              We believe in the power of decentralized finance to transform economies and create opportunities 
              for people worldwide. By building on the Pi Network, we're helping to establish a cryptocurrency 
              that's accessible to everyone, regardless of technical expertise.
            </p>
          </SectionContent>
        </Section>

        <FeaturesGrid>
          <FeatureCard variants={itemVariants}>
            <FeatureTitle>Security First</FeatureTitle>
            <FeatureDescription>
              Your safety is our priority. Cloudy implements industry-leading security practices to protect 
              your assets and personal information. All transactions are transparent and secure.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard variants={itemVariants}>
            <FeatureTitle>Lightning Fast</FeatureTitle>
            <FeatureDescription>
              Our application is designed for speed and efficiency, allowing you to send, receive, and 
              manage your Pi with minimal delay and maximum convenience.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard variants={itemVariants}>
            <FeatureTitle>Pi SDK Integration</FeatureTitle>
            <FeatureDescription>
              Cloudy leverages the full power of the Pi Network SDK to provide a smooth, native-feeling 
              experience integrated with the Pi ecosystem.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard variants={itemVariants}>
            <FeatureTitle>Community Focused</FeatureTitle>
            <FeatureDescription>
              We're active members of the Pi community, building tools that address real needs and 
              incorporating feedback from users to continuously improve.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </motion.div>
    </AboutContainer>
  );
};

export default About; 