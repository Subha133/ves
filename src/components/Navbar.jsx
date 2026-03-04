import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteData } from '../data';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <img src="/ves_logo.png" alt="VES" className={styles.logoImg} />
          <span className={styles.logoText}>VISUAL EDIT STUDIO</span>
        </Link>

        <button className={styles.menuBtn} onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`${styles.bar} ${menuOpen ? styles.open1 : ''}`}></span>
          <span className={`${styles.bar} ${menuOpen ? styles.open2 : ''}`}></span>
          <span className={`${styles.bar} ${menuOpen ? styles.open3 : ''}`}></span>
        </button>

        <div className={`${styles.linksWrapper} ${menuOpen ? styles.mobileOpen : ''}`}>
          <ul className={styles.links}>
            {siteData.navigation.links.map(link => (
              <li key={link.label}>
                {link.href.startsWith('#') ? (
                  <a href={link.href} className={styles.link}>{link.label}</a>
                ) : (
                  <Link
                    to={link.href}
                    className={`${styles.link} ${isActive(link.href) ? styles.activeLink : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <a 
            href={`https://wa.me/${siteData.company.contact.phone.replace(/\s/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaBtn}
            onClick={() => setMenuOpen(false)}
          >
            {siteData.navigation.cta}
          </a>
        </div>
      </div>
    </nav>
  );
}
