import Link from "next/link";
import styles from "./Nav.module.css";

interface NavProps {
  active?: "3d" | "story" | "lite";
}

export default function Nav({ active }: NavProps) {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main navigation">
        <Link href="/" className={styles.logo} aria-label="Home">
          YN
        </Link>

        <ul className={styles.links}>
          <li>
            <Link
              href="/story"
              className={styles.link}
              aria-current={active === "story" ? "page" : undefined}
            >
              Story
            </Link>
          </li>
          <li>
            <Link
              href="/3d"
              className={styles.link}
              aria-current={active === "3d" ? "page" : undefined}
            >
              3D
            </Link>
          </li>
          <li>
            <Link
              href="/lite"
              className={`${styles.link} ${styles.liteLink}`}
              aria-current={active === "lite" ? "page" : undefined}
              title="Low-carbon text-only version"
            >
              Lite
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
