import styles from './PosterSection.module.css';

export default function PosterSection({ posters = [], title, label }) {
    if (!posters || posters.length === 0) return null;

    // Triple the posters for seamless infinite scroll
    const tripledPosters = [...posters, ...posters, ...posters];

    return (
        <section className={styles.section}>
            <div className={styles.sectionInner}>
                <div className={styles.header}>
                    {label && <span className={styles.sectionLabel}>{label}</span>}
                    {title && <h2 className={styles.sectionTitle}>{title}</h2>}
                </div>

                <div className={styles.carousel3D}>
                    <div className={styles.carouselTrack3D}>
                        {tripledPosters.map((poster, index) => (
                            <div key={index} className={styles.carouselItem}>
                                <div className={styles.imageCard}>
                                    <div className={styles.imageGlow}></div>
                                    <div className={styles.imageFrame}>
                                        <img
                                            src={poster.src}
                                            alt={poster.alt || `Poster ${index + 1}`}
                                            className={styles.image}
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className={styles.imageShadow}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
