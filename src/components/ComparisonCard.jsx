import styles from './ComparisonCard.module.css';

export default function ComparisonCard({ before, after, label, metric, client, detail }) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.label}>{label}</span>
                <h3 className={styles.client}>{client}</h3>
            </div>

            <div className={styles.comparison}>
                <div className={styles.box}>
                    <span className={styles.title}>Before</span>
                    <div className={styles.value}>{before}</div>
                </div>
                <div className={styles.arrow}>→</div>
                <div className={`${styles.box} ${styles.highlight}`}>
                    <span className={styles.title}>After</span>
                    <div className={styles.value}>{after}</div>
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.metric}>
                    <span className={styles.metricVal}>{metric}</span>
                    <span className={styles.metricLabel}>Growth Spike</span>
                </div>
                <p className={styles.detail}>{detail}</p>
            </div>
        </div>
    );
}
