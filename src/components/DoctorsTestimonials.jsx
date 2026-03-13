import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import siteData from "../data/site-data.json";
import styles from "./DoctorsTestimonials.module.css";
import { ShimmerCard } from "./Shimmer";

const TESTIMONIAL_IMAGES = siteData.gallery_images;

function ImageCard({ src, onClick }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={styles.imageCard}
    >
      <div className={styles.imageFrame}>
        {!isLoaded && <ShimmerCard className={styles.shimmerOverlay} />}
        <img
          src={src}
          alt="Doctor Testimonial"
          className={`${styles.image} ${isLoaded ? styles.imageLoaded : styles.imageLoading}`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </motion.div>
  );
}

export default function DoctorsTestimonials({ title, label }) {
  const [selected, setSelected] = useState(null);

  // Split images into two rows
  const half = Math.ceil(TESTIMONIAL_IMAGES.length / 2);
  const row1 = TESTIMONIAL_IMAGES.slice(0, half);
  const row2 = TESTIMONIAL_IMAGES.slice(half);

  // Duplicate for seamless loop
  const duplicatedRow1 = [...row1, ...row1];
  const duplicatedRow2 = [...row2, ...row2];

  const speed = "40s";

  return (
    <section className={styles.section}>
      <div className={styles.sectionInner}>
        {/* Header */}
        <div className={styles.header}>
          {label && <span className={styles.label}>{label}</span>}
          {title && <h2 className={styles.title}>{title}</h2>}
          <div className={styles.headerLine}></div>
        </div>

        <div className={styles.marqueesContainer}>
          {/* Row 1 - Left to Right */}
          <div className={styles.marqueeWrapper}>
            <div
              className={`${styles.marqueeRow} ${styles.animateMarquee}`}
              style={{ "--duration": speed }}
            >
              {duplicatedRow1.map((src, i) => (
                <ImageCard
                  key={`row1-${i}`}
                  src={src}
                  onClick={() => setSelected(src)}
                />
              ))}
            </div>
          </div>

          {/* Row 2 - Right to Left */}
          <div className={styles.marqueeWrapper}>
            <div
              className={`${styles.marqueeRow} ${styles.animateMarqueeReverse}`}
              style={{ "--duration": speed }}
            >
              {duplicatedRow2.map((src, i) => (
                <ImageCard
                  key={`row2-${i}`}
                  src={src}
                  onClick={() => setSelected(src)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.closeButton}
                onClick={() => setSelected(null)}
              >
                ✕
              </button>
              <img
                src={selected}
                alt="Testimonial Full"
                className={styles.modalImage}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edge Fades */}
      <div className={styles.fadeLeft}></div>
      <div className={styles.fadeRight}></div>
    </section>
  );
}
