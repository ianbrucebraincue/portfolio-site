import Link from "next/link";
import cardStyles from "./RouteCard.module.css";
import styles from "./RouteLinkLowCarbon.module.css";

export default function RouteLinkLowCarbon() {
  return (
    <Link
      href="/low-carbon"
      className={`${cardStyles.card} ${styles.card}`}
      aria-label="Explore Low Carbon text-only version"
    >
      <div className={cardStyles.inner}>
        <span className={cardStyles.index} aria-hidden>
          03
        </span>

        {/* Intentional whitespace — the emptiness is the design */}
        <div className={styles.spacer} aria-hidden />

        <div className={styles.body}>
          <span className={styles.label}>
            Low Carbon
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
            >
              <path d="M2 10L10 2M4 2h6v6" />
            </svg>
          </span>
          <p className={styles.desc}>Text-only. No animations, no heavy assets.</p>
        </div>
      </div>
    </Link>
  );
}
