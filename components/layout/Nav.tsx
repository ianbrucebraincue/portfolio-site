import Link from "next/link";
import styles from "./Nav.module.css";

interface NavProps {
  active?: "3d" | "web" | "low-carbon";
}

export default function Nav({ active }: NavProps) {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main navigation">
        <Link href="/" className={styles.logo} aria-label="Home">
          Ian Bruce
        </Link>

        <ul className={styles.links}>
          <li>
            <Link
              href="/web"
              className={styles.link}
              aria-current={active === "web" ? "page" : undefined}
            >
              Modern 
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
              href="/low-carbon"
              className={`${styles.link} ${styles.lowCarbonLink}`}
              aria-current={active === "low-carbon" ? "page" : undefined}
              title="Low-carbon text-only version"
            >
              Low Carbon
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
