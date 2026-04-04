"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import styles from "./WebHero.module.css";

export default function WebHero() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headlineRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 }
      )
        .fromTo(
          subRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.6"
        )
        .fromTo(
          scrollHintRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.2"
        );

      // Floating scroll hint — paused when tab is hidden to avoid idle RAF work
      const floatTween = gsap.to(scrollHintRef.current, {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "sine.inOut",
      });

      const onVisibility = () =>
        document.hidden ? floatTween.pause() : floatTween.resume();

      document.addEventListener("visibilitychange", onVisibility);
      return () => document.removeEventListener("visibilitychange", onVisibility);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.hero}>
      <div className={styles.inner}>
        <h1 ref={headlineRef} className={styles.headline}>
          Ian Bruce
          <br />
          <em>Portfolio</em>
        </h1>
        <p ref={subRef} className={styles.sub}>
          Building frontend experiences at the intersection of design and code.
          <br />
          Scroll to explore the projects.
        </p>
      </div>

      <div ref={scrollHintRef} className={styles.scrollHint} aria-hidden>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
