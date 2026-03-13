import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import siteData from "../data/site-data.json";
import styles from "./VideoCarousel.module.css";

const defaultVideos = siteData.client_videos;

export default function VideoCarousel({ videos: customVideos }) {
  const videoList = customVideos || defaultVideos;
  const [activeVideo, setActiveVideo] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className={styles.container}>
      {/* Scrolling Track */}
      <div className={styles.scrollContainer}>
        <motion.div
          className={styles.track}
          animate={isPaused ? {} : { x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 60, // Increased duration for more videos (18)
            ease: "linear",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {[...videoList, ...videoList].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className={styles.card}
              onClick={() => setActiveVideo(item)}
            >
              <div className={styles.videoWrapper}>
                  <video 
                    src={item.src} 
                    className={styles.videoThumbnail}
                    muted
                    playsInline
                    loop
                    preload="metadata"
                    onMouseEnter={(e) => e.target.play()}
                    onMouseLeave={(e) => {
                        e.target.pause();
                        e.target.currentTime = 0;
                    }}
                  />
                <div className={styles.overlay}>
                  <div className={styles.playButton}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className={styles.info}>
                   <h4 className={styles.title}>{item.title}</h4>
                   <p className={styles.client}>{item.client.toUpperCase()}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Modal Video Player */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className={styles.closeButton}
                aria-label="Close"
              >
                ✕
              </button>
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>{activeVideo.title}</h3>
                <p className={styles.modalClient}>{activeVideo.client}</p>
              </div>
              <div className={styles.modalVideoWrapper}>
                <video
                  src={activeVideo.src}
                  controls
                  autoPlay
                  className={styles.modalVideo}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
