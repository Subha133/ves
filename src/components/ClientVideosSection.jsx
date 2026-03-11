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
      <div className={styles.cardShadow}></div>
    </div>
  );
}

export default function ClientVideosSection({ title, label }) {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);
  const autoScrollRef = useRef(null);
  const resumeTimeoutRef = useRef(null);

  // Triple the items for a smooth infinite scroll buffer
  const extendedVideos = [...CLIENT_VIDEOS, ...CLIENT_VIDEOS, ...CLIENT_VIDEOS];
  const originalCount = CLIENT_VIDEOS.length;

  // Initialize scroll to the middle set of videos
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const scrollPos = (container.scrollWidth / 3);
      container.scrollLeft = scrollPos;
    }
  }, []);

  // Intersection Observer to track center item
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observerOptions = {
      root: container,
      threshold: 0.6,
      rootMargin: '0px -25% 0px -25%'
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index'));
          setActiveVideoIndex(index % originalCount);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const cards = container.querySelectorAll(`.${styles.card}`);
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [originalCount]);

  // Auto-scroll using requestAnimationFrame for smoother motion
  useEffect(() => {
    const container = containerRef.current;
    if (!container || isInteracting || selectedVideo) {
      if (autoScrollRef.current) cancelAnimationFrame(autoScrollRef.current);
      return;
    }

    let lastTime = performance.now();
    const speed = 0.5; // Adjusted for a "slow" premium feel

    const scroll = (currentTime) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      if (container) {
        container.scrollLeft += speed * (delta / 16.67);

        // Seamless loop reset using original width
        const originalWidth = container.scrollWidth / 3;
        if (container.scrollLeft >= originalWidth * 2) {
          container.scrollLeft -= originalWidth;
        } else if (container.scrollLeft <= 0) {
          container.scrollLeft += originalWidth;
        }
      }
      autoScrollRef.current = requestAnimationFrame(scroll);
    };

    autoScrollRef.current = requestAnimationFrame(scroll);
    return () => {
      if (autoScrollRef.current) cancelAnimationFrame(autoScrollRef.current);
    };
  }, [isInteracting, selectedVideo]);

  const handleInteractionStart = () => {
    setIsInteracting(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const handleInteractionEnd = () => {
    resumeTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 3000);
  };

  const handleVideoClick = (video) => {
    if (isDragging) return;
    setSelectedVideo(video);
  };

  const scrollLeft = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  // Unified pointer event handlers for both mouse and touch interactions
  const handlePointerDown = (e) => {
    handleInteractionStart();
    setIsDragging(false);
    // Use pointer coordinates (pageX) for consistency across input types
    dragStartX.current = e.pageX - containerRef.current.offsetLeft;
    scrollStartX.current = containerRef.current.scrollLeft;
  };

  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - dragStartX.current) * 1.2;
    if (Math.abs(walk) > 5) setIsDragging(true);
    containerRef.current.scrollLeft = scrollStartX.current - walk;
  };

  const handlePointerUp = () => {
    setTimeout(() => setIsDragging(false), 50);
    handleInteractionEnd();
  };

  const handlePointerLeave = () => {
    setIsDragging(false);
    handleInteractionEnd();
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const oneThird = container.scrollWidth / 3;
    if (container.scrollLeft >= oneThird * 2) {
      container.scrollLeft -= oneThird;
    } else if (container.scrollLeft <= 0) {
      container.scrollLeft += oneThird;
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

      <div className={styles.carouselWrapper}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); handleMouseLeave(); }}
      >
        <div className={styles.fadeLeft}></div>
        <div className={styles.fadeRight}></div>




        <div
          ref={containerRef}
          className={styles.carouselContainer}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          onScroll={handleScroll}
          onWheel={() => {
            handleInteractionStart();
            handleInteractionEnd();
          }}
        >
          <div className={styles.track}>
            {extendedVideos.map((video, i) => (
              <div
                key={`${video.id}-${i}`}
                data-index={i}
                className={`${styles.cardContainer} ${activeVideoIndex === i % originalCount ? styles.active : ''}`}
              >
                <VideoCard
                  video={video}
                  onClick={() => handleVideoClick(video)}
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
