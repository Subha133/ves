import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../data';
import VideoCarousel from '../components/VideoCarousel';
import SEO from '../components/SEO';
import styles from './Home.module.css';

const allVideos = siteData.home_videos;
const ceoImages = ['https://res.cloudinary.com/dzr5dorsx/image/upload/q_auto/f_auto/v1775212341/_DSC5278.jpg_kybfkd.jpg', 'https://res.cloudinary.com/dzr5dorsx/image/upload/q_auto/f_auto/v1775212340/_DSC5279.jpg_1_zrrdgy.jpg', 'https://res.cloudinary.com/dzr5dorsx/image/upload/q_auto/f_auto/v1775212337/_DSC5297.jpg_ett6t5.jpg'];

export default function Home() {
  const [activeCeoIndex, setActiveCeoIndex] = useState(0);

  useEffect(() => {
    const firstChangeTimeout = setTimeout(() => {
      setActiveCeoIndex((prev) => (prev + 1) % ceoImages.length);
    }, 2000);

    const intervalId = setInterval(() => {
      setActiveCeoIndex((prev) => (prev + 1) % ceoImages.length);
    }, 8000);

    return () => {
      clearTimeout(firstChangeTimeout);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={styles.page}>
      <SEO
        title="We Build Authority & Scale Brands"
        description="Personal branding for professionals and performance marketing for businesses. Join 750+ professionals who trust Visual Edit Studio."
        path="/"
      />
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroGrid}></div>
          <div className={styles.heroGlow1}></div>
          <div className={styles.heroGlow2}></div>
          <div className={styles.ambientOrb1}></div>
          <div className={styles.ambientOrb2}></div>
          <div className={styles.heroNoise}></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroTop}>
            <div className={styles.heroText}>
              <div className={styles.heroBadge}>
                <span className={styles.badgeDot}></span>
                <span>750+ Professionals Trust VES</span>
              </div>

              <h1 className={styles.heroHeadline}>
                <span className={styles.heroLine1}>WE BUILD</span>
                <span className={styles.heroLine2}>AUTHORITY</span>
                <span className={styles.heroLine3}>& SCALE BRANDS</span>
              </h1>

              <p className={styles.heroSub}>
                Personal branding for professionals. Performance marketing for businesses.
              </p>

              <div className={styles.heroCtas}>
                <Link to="/branding" className={styles.ctaPrimary}>
                  For Doctors & Coaches
                </Link>
                <Link to="/business" className={styles.ctaSecondary}>
                  For Businesses →
                </Link>
              </div>
            </div>

            <div className={styles.heroImageWrapper}>
              <div className={styles.heroImageContainer}>
                <div className={styles.imageGlow}></div>
                <div className={styles.heroImageCarousel}>
                  {ceoImages.map((image, index) => (
                    <img
                      key={image}
                      src={image}
                      alt={`Founder & CEO of VES ${index + 1}`}
                      className={`${styles.heroImage} ${styles.heroImageSlide} ${index === activeCeoIndex ? styles.heroImageActive : ''}`}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      fetchPriority={index === 0 ? 'high' : 'auto'}
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = '/images/ceo.jpg';
                      }}
                    />
                  ))}
                </div>
                <div className={styles.imageRing}></div>
                <div className={styles.imageBadge}>
                  <span className={styles.imageBadgeDot}></span>
                  <span>Founder & CEO</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.heroStats}>
            {Object.entries(siteData.company.stats).map(([k, v]) => (
              <div key={k} className={styles.stat}>
                <span className={styles.statNum}>{v}</span>
                <span className={styles.statLabel}>{k.replace(/_/g, ' ')}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.scrollHint}>
          <div className={styles.scrollLine}></div>
          <span>SCROLL</span>
        </div>
      </section>

      {/* Two Divisions */}
      <section className={styles.divisions}>
        <div className={styles.divHeader}>
          <span className={styles.divLabel}>/ OUR DIVISIONS</span>
          <h2 className={styles.divTitle}>TWO PATHS. ONE STUDIO.</h2>
        </div>
        <div className={styles.divGrid}>
          <Link to="/branding" className={styles.divCard}>
            <div className={styles.divCardBg} style={{ '--accent': '#0e7490' }}></div>
            <div className={styles.divCardInner}>
              <span className={styles.divCardTag}>For Professionals</span>
              <h3 className={styles.divCardTitle}>VES BRAND</h3>
              <p className={styles.divCardDesc}>
                {siteData.divisions.ves_branding.description}
              </p>
              <ul className={styles.divServices}>
                {siteData.divisions.ves_branding.services.slice(0, 3).map(s => (
                  <li key={s.title}>
                    <span className={styles.sIcon} dangerouslySetInnerHTML={{ __html: s.icon }} /> {s.title}
                  </li>
                ))}
              </ul>
              <span className={styles.divCta}>Explore VES Brand →</span>
            </div>
          </Link>

          <Link to="/business" className={styles.divCard}>
            <div className={styles.divCardBg} style={{ '--accent': '#0284c7' }}></div>
            <div className={styles.divCardInner}>
              <span className={styles.divCardTag}>For Businesses</span>
              <h3 className={styles.divCardTitle}>VES BUSINESS</h3>
              <p className={styles.divCardDesc}>
                {siteData.divisions.ves_business.description}
              </p>
              <ul className={styles.divServices}>
                {siteData.divisions.ves_business.services.slice(0, 3).map(s => (
                  <li key={s.title}>
                    <span className={styles.sIcon} dangerouslySetInnerHTML={{ __html: s.icon }} /> {s.title}
                  </li>
                ))}
              </ul>
              <span className={styles.divCta}>Explore VES Business →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Video Carousel */}
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>/ MOTION ARCHIVE</span>
        <h2 className={styles.sectionTitle}>CRAFTING DIGITAL LEGACIES</h2>
        <div className={styles.sectionLine}></div>
      </div>
      <VideoCarousel videos={allVideos} />

      {/* Case Studies */}
      <section className={styles.cases}>
        <div className={styles.casesHeader}>
          <span className={styles.casesLabel}>/ RESULTS THAT SPEAK</span>
          <h2 className={styles.casesTitle}>REAL NUMBERS.<br />REAL GROWTH.</h2>
        </div>
        <div className={styles.casesGrid}>
          {siteData.case_studies.map((c, i) => (
            <div key={i} className={styles.caseCard}>
              <div className={styles.caseType}>{c.type}</div>
              <div className={styles.caseResult}>{c.result}</div>
              <div className={styles.caseClient}>{c.client}</div>
              {c.detail && <p className={styles.caseDetail}>{c.detail}</p>}
              <div className={styles.caseBar}>
                <div className={styles.caseBarFill}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonials}>
        <div className={styles.testHeader}>
          <span className={styles.testLabel}>/ CLIENT VOICES</span>
          <h2 className={styles.testTitle}>TRUSTED BY LEADERS</h2>
        </div>
        <div className={styles.testGrid}>
          {siteData.testimonials.map((t, i) => (
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
      </section>

      {/* CTA Banner */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaBannerBg}></div>
        <div className={styles.ctaBannerContent}>
          <span className={styles.ctaBannerLabel}>/ READY TO START?</span>
          <h2 className={styles.ctaBannerTitle}>TRANSFORM YOUR BRAND<br />INTO A GROWTH ENGINE</h2>
          <img
            src="https://res.cloudinary.com/dzr5dorsx/image/upload/q_auto/f_auto/v1775212337/_DSC5274.jpg_hxn1vt.jpg"
            alt="VES growth showcase"
            className={styles.ctaCenterImage}
            loading="lazy"
          />
          <p className={styles.ctaBannerSub}>Join 750+ professionals who trust VES to build their digital authority.</p>
          <div className={styles.ctaBannerBtns}>
            <Link to="/branding" className={styles.ctaPrimary}>For Professionals</Link>
            <Link to="/business" className={styles.ctaSecondary}>For Business →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}