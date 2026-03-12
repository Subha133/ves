import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import styles from './ClientVideosSection.module.css';
import { ShimmerCard } from './Shimmer';

// Memoized at module level — stable reference, never recreated
const CLIENT_VIDEOS = [
  {
    id: 'ayurnath',
    src: 'https://res.cloudinary.com/debvroycl/video/upload/v1772447068/Ayurnnath_AD_05_1_xnvrry.mp4',
    poster: '/posters/ayurnath.jpg',
    title: 'Ayurnath Ad',
    client: 'Ayurnath'
  },
  {
    id: 'anamika',
    src: 'https://res.cloudinary.com/debvroycl/video/upload/v1772446928/Anamika_maam_reel_1_kystkx.mp4',
    poster: '/posters/anamika.jpg',
    title: 'Anamika',
    client: 'Anamika'
  },
  {
    id: 'shapna',
    src: 'https://res.cloudinary.com/debvroycl/video/upload/v1772446590/shapna_mam_9n_1_zynrnf.mp4',
    poster: '/posters/shapna.jpg',
    title: 'Shapna',
    client: 'Shapna'
  },
  {
    id: 'purnpragya',
    src: 'https://res.cloudinary.com/debvroycl/video/upload/v1772443806/Purn_pragya_reel_2_1_v6u0ek.mp4',
    poster: '/posters/purnpragya.jpg',
    title: 'Purn Pragya',
    client: 'Purn Pragya'
  },
  {
    id: 'rizwan',
    src: 'https://res.cloudinary.com/debvroycl/video/upload/v1772443796/Rizwan_sir_Reel_7_rmmpla.mp4',
    poster: '/posters/rizwan.jpg',
    title: 'Rizwan',
    client: 'Rizwan'
  },
  {
    id: 'sunny',
    src: 'https://res.cloudinary.com/debvroycl/video/upload/v1772443791/Sunny_Khurana_reel_3_1_1_sgakpn.mp4',
    poster: '/posters/sunny.jpg',
    title: 'Sunny Khurana',
    client: 'Sunny Khurana'
  },
  {
    id: 'mudit',
    src: 'https://res.cloudinary.com/debvroycl/video/upload/v1772443784/Mudit_sir_reel_6_1_t3hqdw.mp4',
    poster: '/posters/mudit.jpg',
    title: 'Mudit',
    client: 'Mudit'
  }
];

// ─── VideoModal ───────────────────────────────────────────────────────────────

function VideoModal({ video, onClose }) {
  const modalRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  useEffect(() => {
    videoRef.current?.play().catch((err) => console.warn('Modal play error:', err));
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) onClose();
  };

  return (
    <div className={styles.modalOverlay} ref={modalRef} onClick={handleBackdropClick}>
      <div className={styles.modalBackdrop} />
      <div className={styles.modalContent}>
        <button className={styles.modalClose} onClick={onClose} aria-label="Close video">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className={styles.modalVideoWrapper}>
          <video
            ref={videoRef}
            src={video.src}
            poster={video.poster}
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

// ─── VideoCard ────────────────────────────────────────────────────────────────
// FIX: Only the "active" (center-visible) card autoplays.
// All other cards show a poster image until they become active.

function VideoCard({ video, onClick, isActive }) {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // FIX: Play/pause driven by isActive prop — not blanket autoPlay on every card
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (isActive) {
      el.play().catch((err) => console.warn('Autoplay blocked:', err));
    } else {
      el.pause();
    }
  }, [isActive]);

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.cardGlow} />
      <div className={styles.cardInner}>
        <div className={styles.videoWrapper}>
          {!isLoaded && <ShimmerCard className={styles.videoShimmer} />}
          <video
            ref={videoRef}
            src={video.src}
            poster={video.poster}           // FIX: poster prevents black flash
            className={`${styles.video} ${isLoaded ? styles.videoLoaded : styles.videoLoading}`}
            muted
            loop
            playsInline
            preload="metadata"              // Only fetch enough to show poster/dims
            onLoadedData={() => setIsLoaded(true)}
          />
          <div className={styles.videoOverlay}>
            <div className={styles.playIcon}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
        <div className={styles.cardInfo}>
          <h3 className={styles.videoTitle}>{video.title}</h3>
          <p className={styles.clientName}>{video.client}</p>
        </div>
      </div>
      <div className={styles.cardShadow} />
    </div>
  );
}

// ─── ClientVideosSection ──────────────────────────────────────────────────────

export default function ClientVideosSection({ title, label }) {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);           // FIX: ref-based card tracking instead of querySelector
  const autoScrollRef = useRef(null);
  const resumeTimeoutRef = useRef(null);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);

  const [isHovered, setIsHovered] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  // FIX: Only duplicate twice (not triple). Two sets are enough for seamless loop
  // and cuts rendered video count from 21 → 14.
  const extendedVideos = useMemo(
    () => [...CLIENT_VIDEOS, ...CLIENT_VIDEOS],
    []
  );
  const originalCount = CLIENT_VIDEOS.length;

  // Initialize scroll to the start of the second (looping) set
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollLeft = container.scrollWidth / 2;
    }
  }, []);

  // FIX: IntersectionObserver using cardRefs instead of querySelector
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index'), 10);
            setActiveVideoIndex(index % originalCount);
          }
        });
      },
      {
        root: container,
        threshold: 0.6,
        rootMargin: '0px -25% 0px -25%',
      }
    );

    cardRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [originalCount]);

  // Auto-scroll via rAF — paused while interacting or modal is open
  useEffect(() => {
    const container = containerRef.current;
    if (!container || isInteracting || selectedVideo) {
      if (autoScrollRef.current) cancelAnimationFrame(autoScrollRef.current);
      return;
    }

    let lastTime = performance.now();
    const speed = 0.5;

    const scroll = (currentTime) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      container.scrollLeft += speed * (delta / 16.67);

      // FIX: Recompute oneThird dynamically each frame to handle resize
      const oneThird = container.scrollWidth / 2;
      if (container.scrollLeft >= oneThird) {
        container.scrollLeft -= oneThird;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft += oneThird;
      }

      autoScrollRef.current = requestAnimationFrame(scroll);
    };

    autoScrollRef.current = requestAnimationFrame(scroll);
    return () => { if (autoScrollRef.current) cancelAnimationFrame(autoScrollRef.current); };
  }, [isInteracting, selectedVideo]);

  // FIX: Cleanup resumeTimeoutRef on unmount to prevent setState on unmounted component
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const handleInteractionStart = useCallback(() => {
    setIsInteracting(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  }, []);

  const handleInteractionEnd = useCallback(() => {
    resumeTimeoutRef.current = setTimeout(() => setIsInteracting(false), 3000);
  }, []);

  const handleVideoClick = useCallback((video) => {
    if (isDragging) return;
    setSelectedVideo(video);
  }, [isDragging]);

  const scrollLeft = useCallback(() => {
    containerRef.current?.scrollBy({ left: -350, behavior: 'smooth' });
  }, []);

  const scrollRight = useCallback(() => {
    containerRef.current?.scrollBy({ left: 350, behavior: 'smooth' });
  }, []);

  // FIX: setPointerCapture so drag continues even if pointer leaves the container
  const handlePointerDown = useCallback((e) => {
    handleInteractionStart();
    setIsDragging(false);
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartX.current = e.pageX - containerRef.current.offsetLeft;
    scrollStartX.current = containerRef.current.scrollLeft;
  }, [handleInteractionStart]);

  const handlePointerMove = useCallback((e) => {
    if (!containerRef.current) return;
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - dragStartX.current) * 1.2;
    if (Math.abs(walk) > 5) setIsDragging(true);
    containerRef.current.scrollLeft = scrollStartX.current - walk;
  }, []);

  const handlePointerUp = useCallback(() => {
    setTimeout(() => setIsDragging(false), 50);
    handleInteractionEnd();
  }, [handleInteractionEnd]);

  // FIX: handleMouseLeave was called but never defined — now properly defined
  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
    handleInteractionEnd();
  }, [handleInteractionEnd]);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const half = container.scrollWidth / 2;
    if (container.scrollLeft >= half) {
      container.scrollLeft -= half;
    } else if (container.scrollLeft <= 0) {
      container.scrollLeft += half;
    }
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          {label && <span className={styles.label}>{label}</span>}
          {title && <h2 className={styles.title}>{title}</h2>}
        </div>
        <div className={styles.headerLine} />
      </div>

      <div
        className={styles.carouselWrapper}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); handleMouseLeave(); }} // FIX: now defined
      >
        <div className={styles.fadeLeft} />
        <div className={styles.fadeRight} />

        <div
          ref={containerRef}
          className={styles.carouselContainer}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handleMouseLeave}
          onScroll={handleScroll}
          onWheel={() => { handleInteractionStart(); handleInteractionEnd(); }}
        >
          <div className={styles.track}>
            {extendedVideos.map((video, i) => (
              <div
                key={`${video.id}-${i}`}
                data-index={i}
                ref={(el) => (cardRefs.current[i] = el)}  // FIX: ref-based tracking
                className={`${styles.cardContainer} ${activeVideoIndex === i % originalCount ? styles.active : ''}`}
              >
                <VideoCard
                  video={video}
                  onClick={() => handleVideoClick(video)}
                  isActive={activeVideoIndex === i % originalCount}  // FIX: only active card plays
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {isHovered && !selectedVideo && (
        <div className={styles.dragIndicator}>
          <span>← Drag to scroll • Click to Watch →</span>
        </div>
      )}

      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </section>
  );
}
