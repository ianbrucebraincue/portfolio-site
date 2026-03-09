import Link from "next/link";
import cardStyles from "./RouteCard.module.css";
import styles from "./RouteLinkWeb.module.css";

export default function RouteLinkWeb() {
  return (
    <Link
      href="/web"
      className={`${cardStyles.card} ${styles.card}`}
      aria-label="Explore Modern Web portfolio"
    >
      <div className={cardStyles.inner}>
        <span className={cardStyles.index} aria-hidden>
          01
        </span>

        <div className={styles.body}>
          <h2 className={styles.label}>Modern Web</h2>
          <p className={styles.desc}>Scroll-driven animation, GSAP, and CSS craft.</p>
        </div>

        <span className={styles.cta} aria-hidden>
          View projects
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden
          >
            <path d="M2 7h10M7 2l5 5-5 5" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
