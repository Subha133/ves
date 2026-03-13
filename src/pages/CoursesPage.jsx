import { useState } from 'react';
import { siteData } from '../data';
import SEO from '../components/SEO';
import styles from './CoursesPage.module.css';

export default function CoursesPage() {
    const [showModal, setShowModal] = useState(false);

    const handleCourseClick = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    return (
        <div className={styles.page}>
            <SEO
                title="VES Academy - Master Your Craft"
                description="Learn the exact strategies and systems we use to scale brands and build authority for our high-ticket clients."
                path="/courses"
            />
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroBg}>
                    <div className={styles.heroGrid}></div>
                    <div className={styles.heroGlow1}></div>
                    <div className={styles.heroGlow2}></div>
                    <div className={styles.ambientOrb1}></div>
                    <div className={styles.ambientOrb2}></div>
                </div>
                <div className={styles.heroContent}>
                    <span className={styles.heroTag}>/ VES ACADEMY</span>
                    <h1 className={styles.heroTitle}>MASTER YOUR CRAFT</h1>
                    <p className={styles.heroDesc}>
                        Learn the exact strategies, systems, and secrets we use to scale brands and build authority for our high-ticket clients.
                    </p>
                </div>
            </section>

            {/* Courses Grid */}
            <section className={styles.coursesSection}>
                <div className={styles.container}>
                    <div className={styles.coursesGrid}>
                        {siteData.courses.map((course) => (
                            <div key={course.id} className={styles.courseCard} onClick={handleCourseClick}>
                                <div className={styles.cardImageWrap}>
                                    <img src={course.image} alt={course.title} className={styles.cardImage} />
                                    <div className={styles.cardTags}>
                                        <span className={styles.tag}>{course.level}</span>
                                    </div>
                                </div>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.courseTitle}>{course.title}</h3>
                                    <p className={styles.courseDesc}>{course.description}</p>

                                    <div className={styles.courseMeta}>
                                        <div className={styles.metaItem}>
                                            <span className={styles.metaIcon}>⏱️</span>
                                            <span className={styles.metaText}>{course.duration}</span>
                                        </div>
                                        <div className={styles.metaItem}>
                                            <span className={styles.metaIcon}>🎓</span>
                                            <span className={styles.metaText}>{course.instructor}</span>
                                        </div>
                                    </div>

                                    <div className={styles.cardFooter}>
                                        <span className={styles.price}>{course.price}</span>
                                        <button className={styles.enrollBtn}>Enroll Now</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Coming Soon Modal */}
            {showModal && (
                <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalIcon}>🚀</div>
                        <h2 className={styles.modalTitle}>Courses Are Coming Soon!</h2>
                        <p className={styles.modalDesc}>
                            We're currently putting the finishing touches on our academy. Thanks for showing interest! Join our waitlist to get notified when we launch.
                        </p>
                        <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                            Got it, thanks!
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
