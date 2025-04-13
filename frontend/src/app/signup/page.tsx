'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';

export default function SignUpPage() {
  useEffect(() => {
    // Initialize Pi SDK
    if (typeof window !== 'undefined' && window.Pi) {
      window.Pi.init({ version: "2.0" });
    }

    // Handle Pi Network Sign-Up
    const piSignupButton = document.getElementById('pi-signup');
    if (piSignupButton) {
      piSignupButton.addEventListener('click', async (e: Event) => {
        e.preventDefault();
        try {
          const scopes = ['username', 'payments'];
          const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
          handleSuccessfulSignUp(authResult);
        } catch (err) {
          console.error('Authentication failed:', err);
          alert('Sign-up failed. Please try again.');
        }
      });
    }

    // Handle successful authentication
    function handleSuccessfulSignUp(authResult: any) {
      const user = authResult.user;
      console.log('Signed up user:', user);
      alert(`Welcome, ${user.username}! Your Cloudy account is ready.`);
      window.location.href = '/home';
    }

    // Handle incomplete payments (required by Pi SDK)
    function onIncompletePaymentFound(payment: any) {
      console.log('Incomplete payment found:', payment);
      return { handled: false };
    }

    // Mobile menu toggle with debounce
    let isToggling = false;
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', () => {
        if (isToggling) return;
        isToggling = true;
        mobileMenu.classList.toggle('open');
        const isOpen = mobileMenu.classList.contains('open');
        hamburger.textContent = isOpen ? '✕' : '☰';
        hamburger.setAttribute('aria-expanded', String(isOpen));
        setTimeout(() => { isToggling = false; }, 300);
      });

      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('open');
          hamburger.textContent = '☰';
          hamburger.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Scroll reveal animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.05, rootMargin: '20px' });

    document.querySelectorAll('.section-title, .signup-container, .instruction-card, .faq-card, .footer-section').forEach(el => observer.observe(el));

    // Mobile nav active state
    document.querySelectorAll('.footer-mobile-nav a').forEach(link => {
      link.addEventListener('click', () => {
        document.querySelectorAll('.footer-mobile-nav a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });

    return () => {
      // Cleanup event listeners
      if (piSignupButton) {
        piSignupButton.removeEventListener('click', () => {});
      }
      if (hamburger && mobileMenu) {
        hamburger.removeEventListener('click', () => {});
        mobileMenu.querySelectorAll('a').forEach(link => {
          link.removeEventListener('click', () => {});
        });
      }
    };
  }, []);

  return (
    <>
      <Script src="https://sdk.minepi.com/pi-sdk.js" strategy="beforeInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/js/all.min.js" strategy="beforeInteractive" />
      
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
            <Link href="/home">Home</Link>
            <Link href="/features">Features</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/categories">Categories</Link>
            <Link href="/top-creators">Top Creators</Link>
            <Link href="/learnmore">Learn More</Link>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <nav className="mobile-menu">
        <ul>
          <li><Link href="/home"><span className="icon">🏠</span>Home</Link></li>
          <li><Link href="/features"><span className="icon">✨</span>Features</Link></li>
          <li><Link href="/pricing"><span className="icon">💰</span>Pricing</Link></li>
          <li><Link href="/categories"><span className="icon">📚</span>Categories</Link></li>
          <li><Link href="/top-creators"><span className="icon">🌟</span>Top Creators</Link></li>
          <li><Link href="/learnmore"><span className="icon">ℹ️</span>Learn More</Link></li>
          {/* Add more menu items as needed */}
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Join Cloudy with Pi Network ☁️</h1>
          <p>Sign up using your Pi Network account to unlock a world of productivity and collaboration tools.</p>
          <div className="cta-buttons">
            <button onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}>Sign Up Now</button>
            <button className="secondary-btn" onClick={() => window.location.href = '/learnmore'}>Learn More</button>
          </div>
        </div>
      </div>

      {/* Sign-Up Section */}
      <div className="signup-section" id="signup">
        <h2 className="section-title">Create Your Cloudy Account</h2>
        <div className="signup-container">
          <h3>Sign Up with Pi Network</h3>
          <p>Use your Pi Network account for a secure and seamless sign-up experience.</p>
          <a href="#" className="pi-signup-button" id="pi-signup">Sign Up with Pi ☁️</a>
        </div>
      </div>

      {/* Instructions Section */}
      <div className="instructions-section">
        <h2 className="section-title">How to Sign Up</h2>
        <div className="instructions-list">
          <div className="instruction-card">
            <h4>Step 1: Install Pi Browser</h4>
            <p>Download the Pi Browser from the Google Play Store or iOS App Store to access the Pi Network ecosystem.</p>
          </div>
          <div className="instruction-card">
            <h4>Step 2: Log In to Pi Network</h4>
            <p>Open the Pi Browser and sign in with your Pi Network account credentials.</p>
          </div>
          <div className="instruction-card">
            <h4>Step 3: Authorize Cloudy</h4>
            <p>Click "Sign Up with Pi" to authorize Cloudy to access your Pi account details securely.</p>
          </div>
          <div className="instruction-card">
            <h4>Step 4: Start Creating</h4>
            <p>Once signed up, set up your workspace and begin using Cloudy's tools!</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          <div className="faq-card">
            <h4>Do I need a Pi Network account?</h4>
            <p>Yes, Cloudy uses Pi Network for secure authentication. Download the Pi Network app to create an account if you don't have one.</p>
          </div>
          <div className="faq-card">
            <h4>Is my data safe with Cloudy?</h4>
            <p>Absolutely. We use Pi Network's secure authentication and prioritize your privacy with robust data protection.</p>
          </div>
          <div className="faq-card">
            <h4>Can I sign up without Pi Browser?</h4>
            <p>No, the Pi Browser is required for Pi Network authentication to ensure a secure sign-up process.</p>
          </div>
          <div className="faq-card">
            <h4>What can I do after signing up?</h4>
            <p>You'll gain access to workspace tools, analytics, and the ability to sell digital goods with Pi payments.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h4>Explore more ☁️</h4>
            <ul>
              <li><Link href="/explore-more">Explore More</Link></li>
              <li><Link href="/categories">Categories</Link></li>
              <li><Link href="/top-creators">Top Creators</Link></li>
              <li><Link href="/new-releases">New Releases</Link></li>
              <li><Link href="/discover">Discover</Link></li>
            </ul>
          </div>
          {/* Add more footer sections as needed */}
        </div>
        <div className="footer-mobile-nav">
          <ul>
            <li><Link href="/home"><span className="icon">🏠</span>Home</Link></li>
            <li><Link href="/features"><span className="icon">✨</span>Features</Link></li>
            <li><Link href="/pricing"><span className="icon">💰</span>Pricing</Link></li>
            <li><Link href="/discover"><span className="icon">🔍</span>Discover</Link></li>
            <li><Link href="/profile"><span className="icon">👤</span>Profile</Link></li>
          </ul>
        </div>
        <div className="footer-subscription">
          <h4>Subscribe to Our Newsletter ☁️</h4>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span>© 2025 <span className="footer-app-name">Cloudy</span>. All rights reserved.</span>
            <span>We do not sell or share your personal information.</span>
            <div className="footer-bottom-links">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
              <Link href="/cookie-settings">Cookie Settings</Link>
              <Link href="/whitepaper">Whitepaper</Link>
              <Link href="/docs">Docs</Link>
              <Link href="/security">Security</Link>
              <Link href="/notice">Notices</Link>
            </div>
          </div>
          <div className="social-icons">
            <a href="https://facebook.com/cloudy" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="https://twitter.com/cloudy" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fab fa-x-twitter"></i></a>
            <a href="https://instagram.com/cloudy" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="https://telegram.org/cloudy" target="_blank" rel="noopener noreferrer" aria-label="Telegram"><i className="fab fa-telegram"></i></a>
            <a href="https://discord.com/cloudy" target="_blank" rel="noopener noreferrer" aria-label="Discord"><i className="fab fa-discord"></i></a>
          </div>
          <span className="footer-powered">Powered by Pi Network</span>
        </div>
      </footer>
    </>
  );
} 