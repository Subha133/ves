import { Link } from 'react-router-dom';
import { siteData } from '../data';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';
import ComparisonCard from '../components/ComparisonCard';
import styles from './DivisionPage.module.css';
import bizStyles from './BusinessPage.module.css';

const d = siteData.divisions.ves_business;

export default function BusinessPage() {
  return (
    <div className={styles.page}>
      <SEO
        title="VES Business - Scale Your Revenue"
        description="Performance marketing and ad production for businesses. Turn your ad spend into a growth engine with data-driven strategy."
        path="/business"
      />
      {/* Hero */}
      <section className={`${styles.hero} ${bizStyles.hero}`}>
        <div className={styles.heroBg}>
          <div className={styles.heroGrid}></div>
          <div className={styles.heroGlow1}></div>
          <div className={styles.heroGlow2}></div>
          <div className={styles.ambientOrb1}></div>
          <div className={styles.ambientOrb2}></div>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroTop}>
            <div className={styles.heroText}>
              <div className={styles.breadcrumb}>
                <Link to="/" className={styles.breadLink}>Home</Link>
                <span>/</span>
                <span>VES Business</span>
              </div>
              <span className={styles.heroTag}>{d.hero_label}</span>
              <h1 className={styles.heroTitle}>{d.title.toUpperCase()}</h1>
              <p className={styles.heroSub}>{d.subtitle}. {d.description}</p>

              <div className={styles.trustBar}>
                <span className={styles.trustNum}>4x Avg. ROAS</span>
                <span className={styles.trustSep}>|</span>
                <span className={styles.trustText}>Data-Driven Growth</span>
              </div>

              <div className={styles.heroCtas}>
                <a href="#contact" className={styles.ctaPrimary}>Scale Your Business</a>
                <a href="#services" className={styles.ctaSecondary}>Our Services -&gt;</a>
              </div>
            </div>

            <div className={styles.heroImageWrapper}>
              <div className={styles.heroImageContainer}>
                <div className={styles.imageGlow}></div>
                <img
                  src="/images/ceo.jpg"
                  alt="VES CEO"
                  className={styles.heroImage}
                  loading="lazy"
                />
                <div className={styles.imageRing}></div>
                <div className={styles.imageBadge}>
                  <span className={styles.imageBadgeDot}></span>
                  <span>Founder & CEO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Strip */}
      <section className={bizStyles.results}>
        <div className={styles.sectionInner}>
          <span className={styles.sectionLabel}>/ PROVEN RESULTS</span>
          <div className={bizStyles.resultsGrid}>
            <ComparisonCard
              client="TechCorp"
              label="Meta Ads + Funnel"
              before="$5K/mo"
              after="$45K/mo"
              metric="9x Scale"
              detail="Complete funnel overhaul and strategic ad scaling."
            />
            <ComparisonCard
              client="StyleHub"
              label="E-Commerce Ads"
              before="$12K"
              after="$40K"
              metric="3.3x ROI"
              detail="Revitalized ad creative and retargeting systems."
            />
            <ComparisonCard
              client="Dr. Arjun"
              label="Personal Branding"
              before="200"
              after="10,000+"
              metric="50x Growth"
              detail="Follower growth and authority building."
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className={styles.services} id="services">
        <div className={styles.sectionInner}>
          <span className={styles.sectionLabel}>/ WHAT WE DO</span>
          <h2 className={styles.sectionTitle}>PERFORMANCE MARKETING<br />THAT CONVERTS</h2>
          <div className={styles.servicesGrid}>
            {d.services.map((s, i) => (
              <div key={i} className={styles.serviceCard} style={{ animationDelay: `${i * 0.1}s` }}>
                <div
                  className={styles.serviceIcon}
                  dangerouslySetInnerHTML={{ __html: s.icon }}
                />
                <h3 className={styles.serviceTitle}>{s.title}</h3>
                <p className={styles.serviceDesc}>{s.desc}</p>
                <div className={styles.serviceNum}>{String(i + 1).padStart(2, '0')}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Reel
      <VideoReel
        items={d.video_categories}
        title="CRAFTING DIGITAL LEGACIES"
        label="/ MOTION ARCHIVE"
      /> */}

      {/* Detail Case Studies */}
      <section className={styles.services}>
        <div className={styles.sectionInner}>
          <span className={styles.sectionLabel}>/ DEEP DIVES</span>
          <h2 className={styles.sectionTitle}>CAMPAIGNS THAT<br />CHANGED THE GAME</h2>
          <div className={bizStyles.caseGrid}>
            {siteData.case_studies.filter(c => c.detail).map((c, i) => (
              <div key={i} className={bizStyles.caseCard}>
                <div className={bizStyles.caseTop}>
                  <span className={bizStyles.caseTag}>{c.type}</span>
                  <span className={bizStyles.caseResult}>{c.result}</span>
                </div>
                <h3 className={bizStyles.caseClient}>{c.client}</h3>
                <p className={bizStyles.caseDetail}>{c.detail}</p>
                <div className={bizStyles.caseBar}>
                  <div className={bizStyles.caseBarFill}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonials}>
        <div className={styles.sectionInner}>
          <span className={styles.sectionLabel}>/ CLIENT VOICES</span>
          <h2 className={styles.sectionTitle}>WHAT BUSINESSES SAY</h2>
          <div className={styles.testGrid}>
            {siteData.testimonials.filter((_, i) => i % 2 === 0).map((t, i) => (
              <div key={i} className={styles.testCard}>
                <div className={styles.testQuote}>
                  <span className={styles.qMark}>"</span>
                  {t.quote}
                </div>
                <div className={styles.testAuthor}>
                  <div className={styles.testAvatar}>
                    {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className={styles.testName}>{t.name}</p>
                    <p className={styles.testRole}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection} id="contact">
        <div className={styles.ctaBg}></div>
        <div className={styles.sectionInner} style={{ position: 'relative', textAlign: 'center' }}>
          <span className={styles.sectionLabel}>/ GET STARTED</span>
          <h2 className={styles.sectionTitle} style={{ marginBottom: '1rem' }}>
            READY TO SCALE<br />YOUR REVENUE?
          </h2>
          <p style={{ color: 'var(--gray)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
            Turn your ad spend into a growth engine. Let's talk strategy.
          </p>

          <div className={styles.formWrapper} style={{ maxWidth: '600px', margin: '0 auto' }}>
            <ContactForm />
          </div>

          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '3rem', opacity: 0.7 }}>
            <a href={`tel:${siteData.company.contact.phone}`} style={{ color: 'var(--gray)', fontSize: '0.85rem' }}>
              Phone: {siteData.company.contact.phone}
            </a>
            <a href={`mailto:${siteData.company.contact.email}`} style={{ color: 'var(--gray)', fontSize: '0.85rem' }}>
              Email: {siteData.company.contact.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
