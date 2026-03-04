import { useState } from 'react';
import styles from './YoutubeVideoSection.module.css';

export default function YoutubeVideoSection({ videos = [], title, label }) {
    const [activeVideo, setActiveVideo] = useState(null);

    if (!videos || videos.length === 0) return null;

    return (
        <section className={styles.section}>
            <div className={styles.sectionInner}>
                {label && <span className={styles.sectionLabel}>{label}</span>}
                {title && <h2 className={styles.sectionTitle}>{title}</h2>}

                <div className={styles.videoGrid}>
                    {videos.map((video, index) => (
                        <div key={video.id || index} className={styles.videoCard}>
                            <div className={styles.videoContainer}>
                                {activeVideo === video.id ? (
                                    <iframe
                                        className={styles.iframe}
                                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                                        title={video.title || "YouTube video player"}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <div className={styles.thumbnailWrap} onClick={() => setActiveVideo(video.id)}>
                                        <img
                                            src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                                            alt={video.title || "Video thumbnail"}
                                            className={styles.thumbnail}
                                            loading="lazy"
                                        />
                                        {/* Play Button Overlay */}
                                        <div className={styles.playButton}>
                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                        {/* Overlay gradient for readability */}
                                        <div className={styles.thumbnailOverlay}>
                                            <h3 className={styles.videoTitle}>{video.title}</h3>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
