import RouteLinkWeb from "@/components/home/RouteLinkWeb";
import RouteLink3D from "@/components/home/RouteLink3D";
import RouteLinkLowCarbon from "@/components/home/RouteLinkLowCarbon";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={`${styles.main} web-theme`}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.name}>Ian Bruce</h1>
          <p className={styles.tagline}>Frontend engineer &amp; creative technologist</p>
        </header>

        <nav className={styles.nav} aria-label="Site experiences">
          <RouteLinkWeb />
          <RouteLink3D />
          <RouteLinkLowCarbon />
        </nav>
      </div>

      <footer className={styles.footer}>
        <a
          href="https://github.com/ianbrucebraincue"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footerLink}
        >
          GitHub
        </a>
        <a href="mailto:brucegordonian@gmail.com" className={styles.footerLink}>
          Email
        </a>
      </footer>
    </main>
  );
}
