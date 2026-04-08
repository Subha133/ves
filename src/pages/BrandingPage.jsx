import { Link } from 'react-router-dom';
import { siteData } from '../data';
import VideoCarousel from '../components/VideoCarousel';
import DoctorsTestimonials from '../components/DoctorsTestimonials';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';
import styles from './DivisionPage.module.css';

const d = siteData.divisions.ves_branding;

export default function BrandingPage() {
    return (
        <div className={styles.page}>
            <SEO
                title="VES Brand - Authority for Doctors"
                description="Specialized personal branding for doctors and healthcare professionals. Build trust and authority ethically."
                path="/branding"
            />
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroBg}>
                    <div className={styles.heroGrid}></div>
                    <div className={styles.heroGlow1}></div>
                    <div className={styles.heroGlow2}></div>
                    <div className={styles.ambientOrb1}></div>
                    <div className={styles.ambientOrb2}></div>
                </div>
                <div className={styles.heroContent}>
                    <div className={styles.heroTop}>
                        <div className={styles.heroText}>
                            <div className={styles.breadcrumb}>
                                <span>VES Brand</span>
                            </div>
                            <span className={styles.heroTag}>{d.hero_label}</span>
                            <h1 className={styles.heroTitle}>{d.title.toUpperCase()}</h1>
                            <p className={styles.heroSub}>{d.subtitle}. {d.description}</p>

                            <div className={styles.trustBar}>
                                <span className={styles.trustNum}>{d.clients_count}</span>
                                <span className={styles.trustSep}>|</span>
                                <span className={styles.trustText}>5+ Years of Excellence</span>
                            </div>

                            <div className={styles.heroCtas}>
                                <a href="#contact" className={styles.ctaPrimary}>Start Your Journey</a>
                                <a href="#services" className={styles.ctaSecondary}>Our Services -&gt;</a>
                            </div>
                        </div>

                        <div className={styles.heroImageWrapper}>
                            <div className={styles.heroImageContainer}>
                                <div className={styles.imageGlow}></div>
                                <img
                                    src="/images/ceo.jpg"
                                    alt="VES CEO"
                                    className={styles.heroImage}
                                    loading="lazy"
                                />
                                <div className={styles.imageRing}></div>
                                <div className={styles.imageBadge}>
                                    <span className={styles.imageBadgeDot}></span>
                                    <span>Founder & CEO</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted Clients — Infinite Marquee */}
            <section className={styles.clients}>
                <div className={styles.clientsHeader}>
                    <span className={styles.clientsHeaderDot} />
                    <span className={styles.clientsHeaderLabel}>Trusted By</span>
                    <span className={styles.clientsDivider} />
                </div>
                <div className={styles.clientsTrack}>
                    <div className={styles.clientsScroll}>
                        {d.trusted_clients.map((c, i) => (
                            <div key={`a-${i}`} className={styles.clientChip}>{c}</div>
                        ))}
                        {d.trusted_clients.map((c, i) => (
                            <div key={`b-${i}`} className={styles.clientChip} aria-hidden="true">{c}</div>
                        ))}
                        {d.trusted_clients.map((c, i) => (
                            <div key={`c-${i}`} className={styles.clientChip} aria-hidden="true">{c}</div>
                        ))}
                        {d.trusted_clients.map((c, i) => (
                            <div key={`d-${i}`} className={styles.clientChip} aria-hidden="true">{c}</div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services — New Professional Services Grid */}
            <section className={styles.services} id="services">
                <div className={styles.sectionInner}>

                    {/* Header */}
                    <div className={styles.servicesHeaderWrap}>
                        <span className={styles.servicesSectionEyebrow}>What We Do</span>
                        <h2 className={styles.servicesSectionTitle}>
                            SERVICES DESIGNED<br />FOR <span>PROFESSIONALS</span>
                        </h2>
                        <p className={styles.servicesSectionSub}>
                            Especially Doctors — Building digital authority with strategic content and professional positioning.
                        </p>
                    </div>

                    {/* Card grid */}
                    <div className={styles.serviceCardsGrid}>
                        {[
                            {
                                title: "Premium Reels Editing",
                                desc: "High-quality short-form video editing crafted to maximize engagement, retention, and audience reach.",
                                icon: "🎬"
                            },
                            {
                                title: "Personal Brand Content Blueprint",
                                desc: "A strategic content framework designed to build a strong, authentic, and authoritative personal brand.",
                                icon: "📋"
                            },
                            {
                                title: "Professional Positioning Strategy",
                                desc: "Strategic positioning that establishes credibility, authority, and trust within your professional niche.",
                                icon: "🎯"
                            },
                            {
                                title: "Advanced SEO Optimization",
                                desc: "Advanced search optimization techniques to enhance discoverability and improve online visibility.",
                                icon: "🔍"
                            },
                            {
                                title: "Monthly Positioning Optimization",
                                desc: "Ongoing refinement of brand positioning to maintain relevance, authority, and consistent audience growth.",
                                icon: "📈"
                            },
                            {
                                title: "Detailed Analytics Report",
                                desc: "Comprehensive performance reports providing insights into reach, engagement, and overall strategy effectiveness.",
                                icon: "📊"
                            },
                            {
                                title: "Dedicated Account Management",
                                desc: "A dedicated account manager available from 9:00 AM to 5:00 PM to ensure seamless communication and support.",
                                icon: "👤"
                            },
                            {
                                title: "Mini Content Audit",
                                desc: "A quick yet insightful review of your existing content to identify opportunities for better engagement and growth.",
                                icon: "✓"
                            }
                        ].map((s, i) => {
                            const accents = ['#0ea5e9', '#38bdf8', '#0891b2', '#06b6d4', '#0ea5e9', '#38bdf8', '#0891b2', '#06b6d4'];
                            return (
                                <div
                                    key={i}
                                    className={styles.svcCard}
                                    style={{ '--card-accent': accents[i] }}
                                >
                                    {/* Ghost number */}
                                    <span className={styles.svcNum}>{String(i + 1).padStart(2, '0')}</span>

                                    {/* Icon */}
                                    <div className={styles.svcIconRing}>
                                        <span className={styles.svcIconText}>{s.icon}</span>
                                    </div>

                                    {/* Text */}
                                    <h3 className={styles.svcTitle}>{s.title}</h3>
                                    <p className={styles.svcDesc}>{s.desc}</p>

                                    {/* Hover glow */}
                                    <div className={styles.svcGlow} />
                                </div>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* Branding Video Section */}
            <section className={styles.videoCarouselSection} style={{ padding: '5rem 0', background: '#fdfdfd' }}>
                <div className={styles.sectionInner}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{
                            fontSize: 'clamp(2rem, 5vw, 2.5rem)',
                            color: '#0d9488', // Teal color from screenshot
                            fontFamily: 'var(--font-display, sans-serif)',
                            fontWeight: '600'
                        }}>
                            Our Work
                        </h2>
                    </div>
                </div>
                <VideoCarousel />
            </section>

            {/* Doctors Testimonials - Alternating Vertical Carousel */}
            <DoctorsTestimonials
                title="DOCTORS TESTIMONIALS"
                label="/ OUR HAPPY CLIENTS"
            />

            {/* Why VES */}
            <section className={styles.why}>
                <div className={styles.sectionInner}>
                    <div className={styles.whyGrid}>
                        <div className={styles.whyLeft}>
                            <span className={styles.sectionLabel}>/ WHY VES BRAND</span>
                            <h2 className={styles.sectionTitle}>SO YOU CAN FOCUS<br />ON YOUR PATIENTS</h2>
                            <p className={styles.whyDesc}>
                                While you're saving lives, we're building your brand. Our team handles every aspect of your digital presence — from content strategy to video production — so your expertise reaches the people who need it most.
                            </p>
                            <Link to="/" className={styles.ctaSecondary}>View All Services -&gt;</Link>
                        </div>
                        <div className={styles.whyRight}>
                            <div className={styles.whyStats}>
                                {[
                                    { num: '750+', label: 'Doctors Across India' },
                                    { num: '5+', label: 'Years Exclusive Focus' },
                                    { num: '100%', label: 'Ethics Compliant' },
                                    { num: '24/7', label: 'Content Strategy' },
                                ].map((s, i) => (
                                    <div key={i} className={styles.whyStat}>
                                        <span className={styles.whyNum}>{s.num}</span>
                                        <span className={styles.whyLabel}>{s.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className={styles.testimonials}>
                <div className={styles.sectionInner}>
                    <span className={styles.sectionLabel}>/ CLIENT VOICES</span>
                    <h2 className={styles.sectionTitle}>WHAT DOCTORS SAY</h2>
                    <div className={styles.testGrid}>
                        {siteData.testimonials.filter((_, i) => i % 2 === 1).map((t, i) => (
                            <div key={i} className={styles.testCard}>
                                <div className={styles.testQuote}>
                                    <span className={styles.qMark}>"</span>
                                    {t.quote}
                                </div>
                                <div className={styles.testAuthor}>
                                    <div className={styles.testAvatar}>
                                        {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                    </div>
                                    <div>
                                        <p className={styles.testName}>{t.name}</p>
                                        <p className={styles.testRole}>{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className={styles.ctaSection} id="contact">
                <div className={styles.ctaBg}></div>
                <div className={styles.sectionInner} style={{ position: 'relative', textAlign: 'center' }}>
                    <span className={styles.sectionLabel}>/ GET STARTED</span>
                    <h2 className={styles.sectionTitle} style={{ marginBottom: '1rem' }}>
                        READY TO BUILD<br />YOUR AUTHORITY?
                    </h2>
                    <p style={{ color: 'var(--gray)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
                        Join 750+ doctors already growing with VES Brand.
                    </p>

                    <div className={styles.formWrapper} style={{ maxWidth: '600px', margin: '0 auto' }}>
                        <ContactForm />
                    </div>

                    <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '3rem', opacity: 0.7 }}>
                        <a href={`tel:${siteData.company.contact.phone}`} style={{ color: 'var(--gray)', fontSize: '0.85rem' }}>
                            Phone: {siteData.company.contact.phone}
                        </a>
                        <a href={`mailto:${siteData.company.contact.email}`} style={{ color: 'var(--gray)', fontSize: '0.85rem' }}>
                            Email: {siteData.company.contact.email}
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
