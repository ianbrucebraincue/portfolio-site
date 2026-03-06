import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.name}>Your Name</h1>
        <p className={styles.tagline}>Software engineer & creative technologist</p>

        <nav className={styles.nav} aria-label="Site experiences">
          <Link href="/story" className={styles.navLink} data-variant="primary">
            <span className={styles.navLabel}>Scrollytelling</span>
            <span className={styles.navDesc}>Editorial storytelling experience</span>
          </Link>

          <Link href="/3d" className={styles.navLink}>
            <span className={styles.navLabel}>3D World</span>
            <span className={styles.navDesc}>Explore projects in three dimensions</span>
          </Link>

          <Link href="/lite" className={styles.navLink}>
            <span className={styles.navLabel}>Lite</span>
            <span className={styles.navDesc}>Low-carbon, text-only version</span>
          </Link>
        </nav>
      </div>

      <footer className={styles.footer}>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="mailto:hello@example.com">Email</a>
      </footer>
    </main>
  );
}
