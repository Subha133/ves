import { useState, useRef, useEffect } from 'react';
import styles from './ClientVideosSection.module.css';
import { ShimmerCard } from './Shimmer';

// Client videos from Cloudinary
const CLIENT_VIDEOS = [
  { 
    id: 'ayurnath', 
    src: 'https://res.cloudinary.com/debvroycl/video/upload/v1772447068/Ayurnnath_AD_05_1_xnvrry.mp4',
    title: 'Ayurnath Ad',
    client: 'Ayurnath'
  },
  { 
    id: 'anamika', 
    src: 'https://res.cloudinary.com/debvroycl/video/upload/v1772446928/Anamika_maam_reel_1_kystkx.mp4',
    title: 'Anamika',
    client: 'Anamika'
  },
  { 
    id: 'shapna', 
    src: 'https://res.cloudinary.com/debvroycl/video/upload/v1772446590/shapna_mam_9n_1_zynrnf.mp4',
    title: 'Shapna',
    client: 'Shapna'
  },
  { 
    id: 'purnpragya', 
    src: 'https://res.cloudinary.com/debvroycl/video/upload/v1772443806/Purn_pragya_reel_2_1_v6u0ek.mp4',
    title: 'Purn Pragya',
    client: 'Purn Pragya'
  },
  { 
    id: 'rizwan', 
    src: 'https://res.cloudinary.com/debvroycl/video/upload/v1772443796/Rizwan_sir_Reel_7_rmmpla.mp4',
    title: 'Rizwan',
    client: 'Rizwan'
  },
  { 
    id: 'sunny', 
    src: 'https://res.cloudinary.com/debvroycl/video/upload/v1772443791/Sunny_Khurana_reel_3_1_1_sgakpn.mp4',
    title: 'Sunny Khurana',
    client: 'Sunny Khurana'
  },
  { 
    id: 'mudit', 
    src: 'https://res.cloudinary.com/debvroycl/video/upload/v1772443784/Mudit_sir_reel_6_1_t3hqdw.mp4',
    title: 'Mudit',
    client: 'Mudit'
  }
];

function VideoModal({ video, onClose }) {
  const modalRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log('Play error:', err));
    }
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  return (
    <div 
      className={styles.modalOverlay}
      ref={modalRef}
      onClick={handleBackdropClick}
    >
      <div className={styles.modalBackdrop}></div>
      <div className={styles.modalContent}>
        <button className={styles.modalClose} onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className={styles.modalVideoWrapper}>
          <video
            ref={videoRef}
            src={video.src}
            className={styles.modalVideo}
            autoPlay
            controls
            playsInline
          />
        </div>
        <div className={styles.modalInfo}>
          <h3 className={styles.modalTitle}>{video.title}</h3>
          <p className={styles.modalClient}>{video.client}</p>
        </div>
      </div>
    </div>
  );
}

function VideoCard({ video, onClick }) {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => console.log('Autoplay issue:', err));
    }
  }, []);

  const handleLoadedData = () => {
    setIsLoaded(true);
  };

  return (
    <div
      className={styles.card}
      onClick={onClick}
    >
      <div className={styles.cardGlow}></div>
      <div className={styles.cardInner}>
        <div className={styles.videoWrapper}>
          {!isLoaded && <ShimmerCard className={styles.videoShimmer} />}
          <video
            ref={videoRef}
            src={video.src}
            className={`${styles.video} ${isLoaded ? styles.videoLoaded : styles.videoLoading}`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={handleLoadedData}
          />
          <div className={styles.videoOverlay}>
            <div className={styles.playIcon}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>
        <div className={styles.cardInfo}>
          <h3 className={styles.videoTitle}>{video.title}</h3>
          <p className={styles.clientName}>{video.client}</p>
        </div>
      </div>
      <div className={styles.cardShadow}></div>
    </div>
  );
}

export default function ClientVideosSection({ title, label }) {
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);
  const pausedRef = useRef(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Triple the list for seamless infinite loop
  const tripled = [...CLIENT_VIDEOS, ...CLIENT_VIDEOS, ...CLIENT_VIDEOS];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const SPEED = 0.6;

    const animate = () => {
      if (!pausedRef.current && !selectedVideo) {
        posRef.current += SPEED;
        const oneThird = track.scrollWidth / 3;
        if (posRef.current >= oneThird) {
          posRef.current = 0;
        }
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [selectedVideo]);

  const handleMouseEnter = () => {
    pausedRef.current = true;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    pausedRef.current = false;
    setIsHovered(false);
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    pausedRef.current = true;
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
    pausedRef.current = false;
  };

  const scrollLeft = () => {
    const track = trackRef.current;
    if (track) {
      posRef.current -= 350;
      if (posRef.current < 0) {
        posRef.current = track.scrollWidth / 3 - 350;
      }
      track.style.transform = `translateX(-${posRef.current}px)`;
    }
  };

  const scrollRight = () => {
    const track = trackRef.current;
    if (track) {
      posRef.current += 350;
      const oneThird = track.scrollWidth / 3;
      if (posRef.current >= oneThird) {
        posRef.current = 0;
      }
      track.style.transform = `translateX(-${posRef.current}px)`;
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          {label && <span className={styles.label}>{label}</span>}
          {title && <h2 className={styles.title}>{title}</h2>}
        </div>
        <div className={styles.headerLine}></div>
      </div>

      <div 
        className={styles.carouselContainer}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.fadeLeft}></div>
        <div className={styles.fadeRight}></div>
        
        {/* Navigation Arrows */}
        <button 
          className={`${styles.navArrow} ${styles.navArrowLeft}`}
          onClick={scrollLeft}
          aria-label="Scroll left"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <button 
          className={`${styles.navArrow} ${styles.navArrowRight}`}
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
        
        <div className={styles.track} ref={trackRef}>
          {tripled.map((video, i) => (
            <VideoCard
              key={`${video.id}-${i}`}
              video={video}
              onClick={() => handleVideoClick(video)}
            />
          ))}
        </div>
      </div>

      {isHovered && !selectedVideo && (
        <div className={styles.pauseIndicator}>
          <span>Hover to Pause • Click to Watch</span>
        </div>
      )}

      {selectedVideo && (
        <VideoModal 
          video={selectedVideo} 
          onClose={handleCloseModal} 
        />
      )}
    </section>
  );
}
