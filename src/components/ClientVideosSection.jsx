import { useState, useRef, useCallback } from 'react';
import siteData from '../data/site-data.json';
import styles from './ClientVideosSection.module.css';
import { ShimmerCard } from './Shimmer';

const CLIENT_VIDEOS = siteData.client_videos;

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
    videoRef.current?.play().catch(() => { });
  }, []);

  return (
    <div
      className={styles.modalOverlay}
      ref={modalRef}
      onClick={(e) => e.target === modalRef.current && onClose()}
    >
      <div className={styles.modalBackdrop} />
      <div className={styles.modalContent}>
        <button className={styles.modalClose} onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className={styles.modalVideoWrapper}>
          <video ref={videoRef} src={video.src} poster={video.poster}
            className={styles.modalVideo} autoPlay controls playsInline />
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

function VideoCard({ video, onClick }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.videoWrapper}>
        {!isLoaded && <ShimmerCard className={styles.shimmer} />}
        <video
          src={video.src}
          poster={video.poster}
          className={`${styles.video} ${isLoaded ? styles.videoVisible : ''}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setIsLoaded(true)}
        />
        {/* Click-to-watch hint overlay */}
        <div className={styles.overlay}>
          <div className={styles.playBtn}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.cardInfo}>
        <p className={styles.cardTitle}>{video.title}</p>
        <p className={styles.cardClient}>{video.client}</p>
      </div>
    </div>
  );
}

// ─── ClientVideosSection ──────────────────────────────────────────────────────

import { useEffect } from 'react';

export default function ClientVideosSection({ title, label }) {
  const trackRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const scrollStart = useRef(0);
  const didDrag = useRef(false);

  const scrollBy = useCallback((dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(`.${styles.card}`);
    const step = card ? card.offsetWidth + 20 : 320;
    track.scrollBy({ left: dir * step, behavior: 'smooth' });
  }, []);

  const onPointerDown = useCallback((e) => {
    didDrag.current = false;
    setIsDragging(true);
    dragStartX.current = e.pageX;
    scrollStart.current = trackRef.current.scrollLeft;
    trackRef.current.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!isDragging) return;
    const walk = (e.pageX - dragStartX.current) * 1.2;
    if (Math.abs(walk) > 4) didDrag.current = true;
    trackRef.current.scrollLeft = scrollStart.current - walk;
  }, [isDragging]);

  const onPointerUp = useCallback(() => setIsDragging(false), []);

  return (
    <section className={styles.section}>

      <div className={styles.header}>
        {label && <span className={styles.label}>{label}</span>}
        {title && <h2 className={styles.title}>{title}</h2>}
        <div className={styles.headerLine} />
      </div>

      <div className={styles.carouselWrapper}>
        <div className={styles.fadeLeft} />
        <div className={styles.fadeRight} />

        <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => scrollBy(-1)} aria-label="Previous">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => scrollBy(1)} aria-label="Next">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <div
          ref={trackRef}
          className={styles.track}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          {CLIENT_VIDEOS.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onClick={() => { if (!didDrag.current) setSelectedVideo(video); }}
            />
          ))}
        </div>
      </div>

      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </section>
  );
}
