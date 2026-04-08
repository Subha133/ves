import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const BrandingPage = lazy(() => import('./pages/BrandingPage'));
const BusinessPage = lazy(() => import('./pages/BusinessPage'));
const CoursesPage = lazy(() => import('./pages/CoursesPage'));

import { siteData } from './data';
import fStyles from './FloatingActions.module.css';

// Loading fallback component
const PageLoader = () => (
  <div style={{
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--black)',
    color: 'var(--teal)',
    fontFamily: 'var(--font-display)',
    fontSize: '2rem'
  }}>
    LOADING...
  </div>
);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const social = siteData.company.contact.social;

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/branding" element={<BrandingPage />} />
          <Route path="/business" element={<BusinessPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
      <Footer />

      {/* Floating WhatsApp Button */}
      <a
        href={social.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className={fStyles.waFab}
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.003 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.364.633 4.638 1.833 6.636L2.667 29.333l6.864-1.8A13.267 13.267 0 0 0 16.003 29.333c7.364 0 13.33-5.97 13.33-13.333S23.367 2.667 16.003 2.667zm0 24c-2.13 0-4.2-.574-6.003-1.66l-.43-.256-4.073 1.067 1.087-3.966-.28-.44A10.628 10.628 0 0 1 5.333 16c0-5.882 4.788-10.667 10.67-10.667S26.667 10.118 26.667 16 21.882 26.667 16.003 26.667zm5.847-7.974c-.32-.16-1.893-.934-2.187-1.04-.293-.107-.507-.16-.72.16-.213.32-.827 1.04-1.013 1.254-.187.213-.373.24-.693.08-.32-.16-1.35-.497-2.573-1.587-.95-.847-1.593-1.893-1.78-2.213-.187-.32-.02-.493.14-.653.144-.144.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.26-.627-.527-.54-.72-.55l-.613-.013a1.18 1.18 0 0 0-.853.4c-.293.32-1.12 1.094-1.12 2.667s1.147 3.093 1.307 3.307c.16.213 2.253 3.44 5.46 4.826.763.33 1.36.527 1.824.674.766.243 1.464.209 2.015.127.615-.093 1.893-.774 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373z" />
        </svg>
      </a>

      {/* Floating Social Media Bar */}
      <div className={fStyles.socialBar}>
        {/* Instagram */}
        <a href={social.instagram} target="_blank" rel="noopener noreferrer" className={`${fStyles.socialLink} ${fStyles.insta}`} aria-label="Instagram">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.326 3.608 1.301.975.975 1.24 2.242 1.301 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.326 2.633-1.301 3.608-.975.975-2.242 1.24-3.608 1.301-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.326-3.608-1.301-.975-.975-1.24-2.242-1.301-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.326-2.633 1.301-3.608C4.51 2.49 5.777 2.225 7.143 2.163 8.41 2.105 8.79 2.163 12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 5.197.157 3.355.673 1.997 2.03.64 3.387.124 5.23.04 7.086-.014 8.366 0 8.774 0 12c0 3.226.014 3.634.072 4.914.085 1.856.6 3.698 1.958 5.056 1.357 1.357 3.199 1.873 5.055 1.958C8.366 23.986 8.774 24 12 24s3.634-.014 4.914-.072c1.856-.085 3.698-.6 5.056-1.958 1.357-1.357 1.873-3.2 1.958-5.056.058-1.28.072-1.688.072-4.914 0-3.226-.014-3.634-.072-4.914-.085-1.856-.6-3.698-1.958-5.056C20.612.673 18.77.157 16.914.072 15.634.014 15.226 0 12 0z" fill="#fff" />
            <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324A6.162 6.162 0 0 0 12 5.838zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" fill="#fff" />
            <circle cx="18.406" cy="5.594" r="1.44" fill="#fff" />
          </svg>
        </a>
        {/* Facebook */}
        <a href={social.facebook} target="_blank" rel="noopener noreferrer" className={`${fStyles.socialLink} ${fStyles.fb}`} aria-label="Facebook">
          <svg viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.532-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.883v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
          </svg>
        </a>
        {/* LinkedIn */}
        <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className={`${fStyles.socialLink} ${fStyles.li}`} aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>      </div>
    </>
  );
}

