import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Box, Container, Typography, Button } from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Telegram as TelegramIcon,
  Discord as DiscordIcon
} from '@mui/icons-material';

// Import the CSS as a module
import './Landing.css';

const Landing = () => {
  useEffect(() => {
    // Header shadow on scroll
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (header) {
        header.classList.toggle('scrolled', window.scrollY > 0);
      }
    };

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    let isToggling = false;

    const handleMobileMenu = () => {
      if (isToggling) return;
      isToggling = true;
      mobileMenu?.classList.toggle('open');
      const isOpen = mobileMenu?.classList.contains('open');
      if (hamburger) {
        hamburger.textContent = isOpen ? '✕' : '☰';
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
      setTimeout(() => { isToggling = false; }, 300);
    };

    // Scroll reveal animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.05, rootMargin: '20px' });

    document.querySelectorAll('.section-title, .feature-card, .testimonial-card, .pricing-card, .footer-section')
      .forEach(el => observer.observe(el));

    // Event listeners
    window.addEventListener('scroll', handleScroll);
    hamburger?.addEventListener('click', handleMobileMenu);

    // Mobile menu link handlers
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu?.classList.remove('open');
        if (hamburger) {
          hamburger.textContent = '☰';
          hamburger.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Mobile nav active state
    const mobileNavLinks = document.querySelectorAll('.footer-mobile-nav a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNavLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      hamburger?.removeEventListener('click', handleMobileMenu);
    };
  }, []);

  return (
    <>
      {/* Mobile Header */}
      <header className="mobile-header">
        <div className="logo">Cloudy</div>
        <button className="hamburger" aria-label="Toggle menu" aria-expanded="false">☰</button>
      </header>

      {/* Desktop Header */}
      <header>
        <div className="header-container">
          <div className="logo">Cloudy</div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/features">Features</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/top-creators">Top Creators</Link>
            <Link to="/learn-more">Learn More</Link>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <nav className="mobile-menu">
        {/* ... Mobile menu content ... */}
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Unleash Your Creativity with Cloudy ☁️</h1>
          <p>The Pi-powered platform that combines productivity, commerce, and collaboration for creators and teams.</p>
          <div className="cta-buttons">
            <Button variant="contained" color="primary" component={Link} to="/signup">
              Get Started
            </Button>
            <Button variant="outlined" component={Link} to="/learn-more">
              Learn More
            </Button>
            <Button variant="contained" color="secondary" component={Link} to="/explore">
              Explore More ☁️
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features" id="features">
        <h2 className="section-title">Why Choose Cloudy?</h2>
        <div className="feature-grid">
          {/* ... Feature cards ... */}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials">
        <h2 className="section-title">What Creators Say</h2>
        <div className="testimonial-grid">
          {/* ... Testimonial cards ... */}
        </div>
      </div>

      {/* Pricing Section */}
      <div className="pricing" id="pricing">
        <h2 className="section-title">Simple Pricing with Pi</h2>
        <div className="pricing-grid">
          {/* ... Pricing cards ... */}
        </div>
      </div>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          {/* ... Footer sections ... */}
        </div>
        <div className="footer-mobile-nav">
          {/* ... Mobile navigation ... */}
        </div>
        <div className="footer-subscription">
          <h4>Subscribe to Our Newsletter ☁️</h4>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
        <div className="footer-bottom">
          {/* ... Footer bottom content ... */}
        </div>
      </footer>
    </>
  );
};

export default Landing; 