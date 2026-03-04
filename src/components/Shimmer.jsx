import styles from './Shimmer.module.css';

export default function Shimmer({ className = '', children, isLoading = true }) {
  if (!isLoading) return children;
  
  return (
    <div className={`${styles.shimmerWrapper} ${className}`}>
      <div className={styles.shimmer}></div>
    </div>
  );
}

// Shimmer card for image/video cards
export function ShimmerCard({ className = '' }) {
  return (
    <div className={`${styles.shimmerCard} ${className}`}>
      <div className={styles.shimmerBg}>
        <div className={styles.shimmerAnimation}></div>
      </div>
    </div>
  );
}
