import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.name}>Ian Bruce</h1>
        <p className={styles.tagline}>Frontend engineer &amp; creative technologist</p>

        <nav className={styles.nav} aria-label="Site experiences">
          <Link href="/web" className={styles.navLink} data-variant="primary">
            <span className={styles.navLabel}>Modern Web</span>
            <span className={styles.navDesc}>Classic website experience</span>
          </Link>

          <Link href="/3d" className={styles.navLink}>
            <span className={styles.navLabel}>3D World</span>
            <span className={styles.navDesc}>Explore projects in three dimensions</span>
          </Link>

          <Link href="/low-carbon" className={styles.navLink}>
            <span className={styles.navLabel}>Low Carbon</span>
            <span className={styles.navDesc}>Text-only version</span>
          </Link>
        </nav>
      </div>

      <footer className={styles.footer}>
        <a href="https://github.com/ianbrucebraincue" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="mailto:brucegordonian@gmail.com">Email</a>
      </footer>
    </main>
  );
}
