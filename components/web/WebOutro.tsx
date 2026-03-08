"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./WebOutro.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function WebOutro() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current?.querySelectorAll("[data-animate]") ?? [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.outro}>
      <div className={styles.inner}>
        <p data-animate className={styles.eyebrow}>
          Get in touch
        </p>
        <h2 data-animate className={styles.heading}>
          Let&apos;s build
          <br />
          something together.
        </h2>
        <p data-animate className={styles.sub}>
          Open to freelance projects, collaborations, and interesting conversations.
        </p>
        <a data-animate href="mailto:hello@example.com" className={styles.cta}>
          hello@example.com
        </a>

        <nav data-animate className={styles.nav} aria-label="Other experiences">
          <a href="/3d" className={styles.altLink}>
            Explore in 3D →
          </a>
          <a href="/low-carbon" className={styles.altLink}>
            Lite version →
          </a>
        </nav>
      </div>
    </section>
  );
}
