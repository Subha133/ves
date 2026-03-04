import { useState } from 'react';
import styles from './DoctorsTestimonials.module.css';
import { ShimmerCard } from './Shimmer';

// Helper to add Cloudinary transformations to URL
const getOptimizedUrl = (url) => {
  return url.replace('/upload/', '/upload/f_auto,q_auto,w_800/');
};

const TESTIMONIAL_IMAGES = [
  "https://res.cloudinary.com/debvroycl/image/upload/v1772440000/WhatsApp_Image_2026-02-20_at_11.44.08_PM_md1mrh.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439999/WhatsApp_Image_2026-02-12_at_5.10.49_PM_dr8bgw.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439999/WhatsApp_Image_2026-02-23_at_8.00.10_PM_gxwbc5.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439998/WhatsApp_Image_2026-02-10_at_12.20.33_PM_pcetyn.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439998/WhatsApp_Image_2026-02-06_at_1.46.30_PM_uzsxpz.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439997/WhatsApp_Image_2025-12-26_at_4.51.39_PM_yys28x.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439996/WhatsApp_Image_2026-02-12_at_5.42.19_PM_zqdapn.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439995/WhatsApp_Image_2026-02-12_at_1.47.15_PM_drc4hq.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439995/WhatsApp_Image_2026-01-21_at_2.25.48_PM_xrgidy.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439995/WhatsApp_Image_2025-12-05_at_6.29.38_PM_1_a9dgb7.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439994/WhatsApp_Image_2026-02-07_at_2.31.30_PM_kkgdnk.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439993/WhatsApp_Image_2025-12-05_at_6.29.38_PM_ixb1jd.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439992/WhatsApp_Image_2026-02-13_at_12.30.09_PM_urhny2.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439992/Ayurnath_Reel_Doctor_1_jbrnr4.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439991/WhatsApp_Image_2025-11-28_at_8.08.26_PM_jojtv6.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439990/WhatsApp_Image_2025-12-24_at_11.57.38_AM_jelpxr.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439989/WhatsApp_Image_2025-11-05_at_6.11.07_PM_fixejs.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439946/WhatsApp_Image_2026-02-23_at_8.00.10_PM_gmkioq.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439944/WhatsApp_Image_2026-02-20_at_11.44.08_PM_ohtzzw.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439944/WhatsApp_Image_2026-02-13_at_12.30.09_PM_iicgmp.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439943/WhatsApp_Image_2026-02-12_at_5.42.19_PM_ololal.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439941/WhatsApp_Image_2026-02-12_at_5.10.49_PM_xpluk2.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439941/WhatsApp_Image_2026-02-12_at_1.47.15_PM_aonmcp.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439940/WhatsApp_Image_2026-02-10_at_12.20.33_PM_cyucru.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439939/WhatsApp_Image_2026-02-07_at_2.31.30_PM_euor4j.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439938/WhatsApp_Image_2026-02-06_at_1.46.30_PM_rdn3b6.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439937/WhatsApp_Image_2026-01-21_at_2.25.48_PM_eohgcs.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439937/WhatsApp_Image_2025-12-26_at_4.51.39_PM_z3iqxb.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439936/WhatsApp_Image_2025-12-24_at_11.57.38_AM_phoqpk.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439936/WhatsApp_Image_2025-12-20_at_10.34.41_AM_sewrvb.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439935/WhatsApp_Image_2025-12-05_at_6.29.38_PM_1_sznpk9.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439935/WhatsApp_Image_2025-12-05_at_6.29.38_PM_xcji5a.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439935/WhatsApp_Image_2025-11-28_at_8.08.26_PM_yml57x.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439934/WhatsApp_Image_2025-11-05_at_6.11.07_PM_mq9rdu.jpg",
  "https://res.cloudinary.com/debvroycl/image/upload/v1772439934/Ayurnath_Reel_Doctor_1_ex19as.jpg"
].map(getOptimizedUrl);

// Image Card with Shimmer loading effect
function ImageCard({ src, index }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={styles.imageCard}>
      <div className={styles.imageGlow}></div>
      <div className={styles.imageFrame}>
        {!isLoaded && <ShimmerCard className={styles.shimmerOverlay} />}
        <img 
          src={src} 
          alt={`Testimonial ${index + 1}`}
          className={`${styles.image} ${isLoaded ? styles.imageLoaded : styles.imageLoading}`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
        />
      </div>
      <div className={styles.imageShadow}></div>
    </div>
  );
}

export default function DoctorsTestimonials({ title, label }) {
  // Split images into 3 columns for alternating scroll
  const column1 = TESTIMONIAL_IMAGES.filter((_, i) => i % 3 === 0);
  const column2 = TESTIMONIAL_IMAGES.filter((_, i) => i % 3 === 1);
  const column3 = TESTIMONIAL_IMAGES.filter((_, i) => i % 3 === 2);

  // Triple each column for seamless loop
  const tripledCol1 = [...column1, ...column1, ...column1];
  const tripledCol2 = [...column2, ...column2, ...column2];
  const tripledCol3 = [...column3, ...column3, ...column3];

  return (
    <section className={styles.section}>
      <div className={styles.sectionInner}>
        {/* Header */}
        <div className={styles.header}>
          {label && <span className={styles.label}>{label}</span>}
          {title && <h2 className={styles.title}>{title}</h2>}
          <div className={styles.headerLine}></div>
        </div>

        {/* Alternating Vertical Carousel */}
        <div className={styles.carouselWrapper}>
          {/* Column 1 - Scrolls Down */}
          <div className={styles.column}>
            <div className={`${styles.track} ${styles.trackDown}`}>
              {tripledCol1.map((src, i) => (
                <ImageCard key={`col1-${i}`} src={src} index={i} />
              ))}
            </div>
          </div>

          {/* Column 2 - Scrolls Up */}
          <div className={styles.column}>
            <div className={`${styles.track} ${styles.trackUp}`}>
              {tripledCol2.map((src, i) => (
                <ImageCard key={`col2-${i}`} src={src} index={i} />
              ))}
            </div>
          </div>

          {/* Column 3 - Scrolls Down */}
          <div className={styles.column}>
            <div className={`${styles.track} ${styles.trackDown}`}>
              {tripledCol3.map((src, i) => (
                <ImageCard key={`col3-${i}`} src={src} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edge fade overlays */}
      <div className={styles.fadeTop}></div>
      <div className={styles.fadeBottom}></div>
    </section>
  );
}
