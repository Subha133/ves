import { useState, useRef, useEffect } from "react";

// ─── Utility: YouTube thumbnail ───────────────────────────────────────────────
function thumb(id) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

// ─── Mini play-button SVG ─────────────────────────────────────────────────────
function PlayIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="26" fill="rgba(14,165,233,0.18)" />
      <circle cx="26" cy="26" r="20" fill="rgba(14,165,233,0.28)" />
      <polygon points="21,18 38,26 21,34" fill="#ffffff" />
    </svg>
  );
}

// ─── Individual video card ────────────────────────────────────────────────────
function VideoCard({ video, onClick, isActive }) {
  return (
    <button
      onClick={() => onClick(video)}
      className={`ves-card ${isActive ? "ves-card--active" : ""}`}
      aria-label={`Play ${video.title}`}
    >
      <div className="ves-card__thumb">
        <img src={thumb(video.id)} alt={video.title} loading="lazy" />
        <div className="ves-card__overlay" />
        <div className="ves-card__play">
          <PlayIcon />
        </div>
        <span className="ves-card__views">{video.views}</span>
      </div>
      <div className="ves-card__meta">
        <p className="ves-card__title">{video.title}</p>
        <p className="ves-card__spec">{video.specialty}</p>
      </div>
      {isActive && <div className="ves-card__active-bar" />}
    </button>
  );
}

// ─── Modal lightbox ───────────────────────────────────────────────────────────
function VideoModal({ video, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, []);

  return (
    <div className="ves-modal" onClick={(e) => e.target === ref.current && onClose()} ref={ref}>
      <div className="ves-modal__backdrop" onClick={onClose} />
      <div className="ves-modal__box">
        <button className="ves-modal__close" onClick={onClose} aria-label="Close">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <line x1="2" y1="2" x2="20" y2="20" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="20" y1="2" x2="2" y2="20" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>
        <div className="ves-modal__frame-wrap">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="ves-modal__frame"
          />
        </div>
        <div className="ves-modal__info">
          <p className="ves-modal__name">{video.title}</p>
          <p className="ves-modal__spec">{video.specialty}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function DoctorsVideoSection({ videos = [], title = "PROFESSIONALS WE'VE WORKED WITH", label = "Video Showcase", subtitle = "Watch how India's top doctors are building their digital authority through powerful video content." }) {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);

  if (!videos || videos.length === 0) return null;

  return (
    <>
      {/* ── Styles (scoped via class prefix) ── */}
      <style>{`
        /* ── reset / tokens ── */
        .ves-sec * { box-sizing: border-box; margin: 0; padding: 0; }

        .ves-sec {
          --sky: #0ea5e9;
          --sky-dim: rgba(14,165,233,0.12);
          --sky-glow: rgba(14,165,233,0.35);
          --bg: #04090f;
          --surface: #080f18;
          --border: rgba(14,165,233,0.15);
          --gray: #8098b0;
          --white: #e8f4ff;
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          padding: 96px 0 112px;
          position: relative;
          overflow: hidden;
        }

        /* ── background texture ── */
        .ves-sec::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 40% at 50% 0%, rgba(14,165,233,0.08) 0%, transparent 70%),
            repeating-linear-gradient(
              0deg, transparent, transparent 39px,
              rgba(14,165,233,0.04) 39px, rgba(14,165,233,0.04) 40px
            ),
            repeating-linear-gradient(
              90deg, transparent, transparent 39px,
              rgba(14,165,233,0.04) 39px, rgba(14,165,233,0.04) 40px
            );
          pointer-events: none;
        }

        /* ── section header ── */
        .ves-header {
          position: relative;
          text-align: center;
          margin-bottom: 64px;
          padding: 0 24px;
        }
        .ves-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--sky);
          margin-bottom: 18px;
        }
        .ves-eyebrow::before,
        .ves-eyebrow::after {
          content: '';
          display: block;
          height: 1px;
          width: 40px;
          background: var(--sky);
          opacity: 0.5;
        }
        .ves-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 5vw, 3.4rem);
          font-weight: 800;
          color: var(--white);
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 14px;
        }
        .ves-title em {
          font-style: normal;
          color: var(--sky);
        }
        .ves-sub {
          color: var(--gray);
          font-size: 0.95rem;
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* ── count strip ── */
        .ves-count {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-bottom: 60px;
          padding: 0 24px;
          flex-wrap: wrap;
        }
        .ves-count__item {
          text-align: center;
        }
        .ves-count__num {
          font-family: 'Syne', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          color: var(--sky);
          display: block;
        }
        .ves-count__label {
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gray);
        }

        /* ── featured embed ── */
        .ves-featured {
          max-width: 1200px;
          margin: 0 auto 64px;
          padding: 0 24px;
          position: relative;
        }
        .ves-featured__inner {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: 0 0 80px rgba(14,165,233,0.12), 0 0 160px rgba(14,165,233,0.05);
          background: var(--surface);
        }
        .ves-featured__frame-wrap {
          position: relative;
          padding-top: 56.25%; /* 16:9 */
        }
        .ves-featured__frame {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }
        .ves-featured__placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: var(--surface);
          transition: background 0.3s;
        }
        .ves-featured__placeholder:hover { background: #0b1520; }
        .ves-featured__placeholder img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.45;
          transition: opacity 0.4s;
        }
        .ves-featured__placeholder:hover img { opacity: 0.6; }
        .ves-featured__btn {
          position: relative;
          z-index: 2;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: var(--sky);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 40px var(--sky-glow);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .ves-featured__placeholder:hover .ves-featured__btn {
          transform: scale(1.12);
          box-shadow: 0 0 60px var(--sky-glow);
        }
        .ves-featured__btn svg { fill: #fff; }
        .ves-featured__caption {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          z-index: 2;
          background: linear-gradient(transparent, rgba(4,9,15,0.95));
          padding: 48px 28px 22px;
        }
        .ves-featured__caption-name {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--white);
          letter-spacing: -0.01em;
        }
        .ves-featured__caption-spec {
          font-size: 0.78rem;
          color: var(--sky);
          letter-spacing: 0.08em;
          margin-top: 2px;
        }
        .ves-featured__live {
          position: absolute;
          top: 18px;
          left: 18px;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(4,9,15,0.75);
          border: 1px solid rgba(14,165,233,0.3);
          border-radius: 100px;
          padding: 5px 12px;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--sky);
          backdrop-filter: blur(8px);
        }
        .ves-featured__live::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--sky);
          box-shadow: 0 0 6px var(--sky);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* ── grid ── */
        .ves-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) {
          .ves-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .ves-grid { grid-template-columns: 1fr; }
        }

        /* ── card ── */
        .ves-card {
          position: relative;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          text-align: left;
          width: 100%;
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
          outline: none;
        }
        .ves-card:hover {
          border-color: rgba(14,165,233,0.4);
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(14,165,233,0.12), 0 0 0 1px rgba(14,165,233,0.15);
        }
        .ves-card--active {
          border-color: var(--sky) !important;
          box-shadow: 0 0 32px rgba(14,165,233,0.25) !important;
        }
        .ves-card__thumb {
          position: relative;
          aspect-ratio: 16/9;
          overflow: hidden;
        }
        .ves-card__thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s, filter 0.5s;
          filter: brightness(0.7) saturate(0.8);
        }
        .ves-card:hover .ves-card__thumb img {
          transform: scale(1.06);
          filter: brightness(0.85) saturate(1);
        }
        .ves-card__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, transparent 40%, rgba(4,9,15,0.7));
        }
        .ves-card__play {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .ves-card:hover .ves-card__play { opacity: 1; }
        .ves-card__views {
          position: absolute;
          bottom: 8px;
          right: 10px;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.7);
          background: rgba(4,9,15,0.6);
          padding: 3px 8px;
          border-radius: 100px;
          backdrop-filter: blur(4px);
        }
        .ves-card__meta {
          padding: 14px 16px 16px;
        }
        .ves-card__title {
          font-family: 'Syne', sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--white);
          letter-spacing: -0.01em;
          margin-bottom: 3px;
        }
        .ves-card__spec {
          font-size: 0.7rem;
          color: var(--sky);
          letter-spacing: 0.06em;
        }
        .ves-card__active-bar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--sky), transparent);
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }

        /* ── bottom label ── */
        .ves-bottom {
          text-align: center;
          margin-top: 52px;
          padding: 0 24px;
        }
        .ves-bottom__line {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--gray);
        }
        .ves-bottom__line::before,
        .ves-bottom__line::after {
          content: '';
          display: block;
          height: 1px;
          width: 60px;
          background: var(--border);
        }

        /* ── modal ── */
        .ves-modal {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .ves-modal__backdrop {
          position: absolute;
          inset: 0;
          background: rgba(2,6,12,0.92);
          backdrop-filter: blur(16px);
          animation: fadein 0.25s ease;
        }
        @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
        .ves-modal__box {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 960px;
          animation: scalein 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes scalein { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .ves-modal__close {
          position: absolute;
          top: -44px;
          right: 0;
          background: rgba(14,165,233,0.15);
          border: 1px solid rgba(14,165,233,0.3);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }
        .ves-modal__close:hover { background: rgba(14,165,233,0.3); }
        .ves-modal__frame-wrap {
          position: relative;
          padding-top: 56.25%;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(14,165,233,0.2);
          box-shadow: 0 0 100px rgba(14,165,233,0.2);
        }
        .ves-modal__frame {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
        }
        .ves-modal__info {
          margin-top: 16px;
          text-align: center;
        }
        .ves-modal__name {
          font-family: 'Syne', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--white);
        }
        .ves-modal__spec {
          font-size: 0.78rem;
          color: var(--sky);
          margin-top: 3px;
          letter-spacing: 0.08em;
        }

        /* ── responsive tweaks ── */
        @media (max-width: 700px) {
          .ves-sec { padding: 64px 0 80px; }
          .ves-count { gap: 24px; }
          .ves-modal__close { top: -40px; }
        }
      `}</style>

      {/* ── Google Fonts ── */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700&display=swap"
      />

      <section className="ves-sec">
        {/* Header */}
        <div className="ves-header">
          {label && <div className="ves-eyebrow">{label}</div>}
          <h2 className="ves-title" dangerouslySetInnerHTML={{ __html: title }}></h2>
          {subtitle && <p className="ves-sub">{subtitle}</p>}
        </div>

        {/* Stats strip */}
        <div className="ves-count">
          {[
            { num: "750+", label: "Doctors Featured" },
            { num: "2M+", label: "Total Views" },
            { num: "98%", label: "Satisfaction Rate" },
          ].map((s, i) => (
            <div key={i} className="ves-count__item">
              <span className="ves-count__num">{s.num}</span>
              <span className="ves-count__label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Featured video (first in list) */}
        <div className="ves-featured">
          <div className="ves-featured__inner">
            <div className="ves-featured__frame-wrap">
              {active?.id === videos[0].id ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videos[0].id}?autoplay=1&rel=0`}
                  title={videos[0].title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="ves-featured__frame"
                />
              ) : (
                <div
                  className="ves-featured__placeholder"
                  onClick={() => setActive(videos[0])}
                  role="button"
                  tabIndex={0}
                  aria-label={`Play featured video: ${videos[0].title}`}
                  onKeyDown={(e) => e.key === "Enter" && setActive(videos[0])}
                >
                  <img src={thumb(videos[0].id)} alt={videos[0].title} />
                  <div className="ves-featured__btn">
                    <svg width="28" height="28" viewBox="0 0 24 24">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                  <div className="ves-featured__caption">
                    <p className="ves-featured__caption-name">{videos[0].title}</p>
                    <p className="ves-featured__caption-spec">{videos[0].specialty}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="ves-featured__live">Featured</div>
          </div>
        </div>

        {/* Card grid (rest of videos) */}
        <div className="ves-grid">
          {videos.slice(1).map((v) => (
            <VideoCard
              key={v.id}
              video={v}
              onClick={(vid) => setActive(vid)}
              isActive={active?.id === v.id}
            />
          ))}
        </div>

        {/* Bottom label */}
        <div className="ves-bottom">
          <span className="ves-bottom__line">More videos every month</span>
        </div>
      </section>

      {/* Lightbox modal */}
      {active && active.id !== videos[0].id && (
        <VideoModal video={active} onClose={() => setActive(null)} />
      )}
    </>
  );
}