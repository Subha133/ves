import { Link } from 'react-router-dom';
import { siteData } from '../data';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.glow}></div>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <img src="/ves_logo.png" alt="VES" className={styles.logo} />
            <p className={styles.brandName}>VISUAL EDIT STUDIO</p>
            <p className={styles.brandDesc}>{siteData.company.description}</p>
          </div>

          <div className={styles.links}>
            <p className={styles.colTitle}>Quick Links</p>
            {siteData.navigation.links.map(l => (
              <Link key={l.label} to={l.href} className={styles.link}>{l.label}</Link>
            ))}
          </div>

          <div className={styles.contact}>
            <p className={styles.colTitle}>Connect</p>
            <a href={`mailto:${siteData.company.contact.email}`} className={styles.contactItem}>
              <span className={styles.contactIcon}>✉</span>
              {siteData.company.contact.email}
            </a>
            <a href={`tel:${siteData.company.contact.phone}`} className={styles.contactItem}>
              <span className={styles.contactIcon}>✆</span>
              {siteData.company.contact.phone}
            </a>
            <p className={styles.contactItem}>
              <span className={styles.contactIcon}>◎</span>
              {siteData.company.contact.address}
            </p>
          </div>

          <div className={styles.cta}>
            <p className={styles.colTitle}>Ready to Scale?</p>
            <a 
              href={`https://wa.me/${siteData.company.contact.phone.replace(/\s/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappBtn}
            >
              Chat on WhatsApp
            </a>
            <p className={styles.ctaText}>Response under 2 hours</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>© 2026 Visual Edit Studio. All rights reserved.</p>
          <div className={styles.policies}>
            <a href="#" className={styles.policyLink}>Privacy Policy</a>
            <a href="#" className={styles.policyLink}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
