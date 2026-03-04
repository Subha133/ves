import { useRef, useEffect, useState } from 'react';
import styles from './VideoReel.module.css';

// All videos available in /public/videos/
const ALL_VIDEOS = [
  { src: '/videos/astrology.mp4', label: 'Astrology' },
  { src: '/videos/buisness.mp4', label: 'Business' },
  { src: '/videos/buisness2.mp4', label: 'Business 2' },
  { src: '/videos/cooking.mp4', label: 'Cooking' },
  { src: '/videos/doctor.mp4', label: 'Doctor' },
  { src: '/videos/education.mp4', label: 'Education' },
  { src: '/videos/fashion.mp4', label: 'Fashion' },
  { src: '/videos/fitness coach.mp4', label: 'Fitness Coach' },
  { src: '/videos/gym.mp4', label: 'Gym' },
  { src: '/videos/makeup.mp4', label: 'Makeup' },
  { src: '/videos/ves_buisness.mp4', label: 'VES Business' },
  { src: '/videos/ves_intro.mp4', label: 'VES Intro' },
  { src: '/videos/ves_intro2.mp4', label: 'VES Intro 2' },
];

function VideoCard({ video, isActive, onClick }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isActive) {
      videoRef.current.muted = false;
      // Ensure it is playing in case browser paused it
      videoRef.current.play().catch((err) => console.log('Autoplay issue:', err));
    } else {
      videoRef.current.muted = true;
    }
  }, [isActive]);

  return (
    <div
      className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
      onClick={onClick}
    >
      <div className={styles.cardBg}>
        <video
          ref={videoRef}
          src={video.src}
          className={styles.videoEl}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
      <div className={styles.cardInfo}>
        <p className={styles.cardTitle}>{video.label}</p>
        <p className={styles.clickLabel}>{isActive ? 'PLAYING SOUND' : 'CLICK TO LISTEN'}</p>
      </div>
    </div>
  );
}

export default function VideoReel({ title, label, videos }) {
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);
  const pausedRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(null);

  // Triple the list for a seamless infinite loop
  const videoList = videos && videos.length > 0 ? videos : ALL_VIDEOS;
  const tripled = [...videoList, ...videoList, ...videoList];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const SPEED = 0.55; // px per frame

    const animate = () => {
      if (!pausedRef.current) {
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
  }, []);

  const handleMouseEnter = () => {
    pausedRef.current = true;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    pausedRef.current = false;
    setIsHovered(false);
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        {label && <span className={styles.label}>{label}</span>}
        {title && <h2 className={styles.title}>{title}</h2>}
        <div className={styles.line}></div>
      </div>

      <div
        className={styles.reelWrapper}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.fadeLeft}></div>
        <div className={styles.fadeRight}></div>
        <div className={styles.track} ref={trackRef}>
          {tripled.map((video, i) => (
            <VideoCard
              key={i}
              video={video}
              isActive={activeIndex === i}
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>

      {isHovered && (
        <div className={styles.pauseIndicator}>
          <span>HOVER TO PAUSE · HOVER CARD TO PLAY</span>
        </div>
      )}
    </section>
  );
}
