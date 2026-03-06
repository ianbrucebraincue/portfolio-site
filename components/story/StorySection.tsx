"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/types";
import VideoPlayer from "@/components/ui/VideoPlayer";
import styles from "./StorySection.module.css";

gsap.registerPlugin(ScrollTrigger);

interface StorySectionProps {
  project: Project;
  index: number;
}

export default function StorySection({ project, index }: StorySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageGridRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-in the label, title, text
      gsap.fromTo(
        [labelRef.current, titleRef.current, textRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      // Parallax on images
      const images = imageGridRef.current?.querySelectorAll<HTMLElement>(`.${styles.imgWrapper}`);
      images?.forEach((img, i) => {
        gsap.fromTo(
          img,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
            delay: i * 0.1,
          }
        );

        // Subtle parallax while scrolling
        gsap.to(img.querySelector("img"), {
          yPercent: isEven ? -8 : 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isEven]);

  const primaryImage = project.images[0];
  const secondaryImages = project.images.slice(1, 3);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${isEven ? styles.even : styles.odd}`}
      aria-labelledby={`project-${project.id}`}
    >
      <div className={styles.inner}>
        {/* Text column */}
        <div className={styles.textCol}>
          <span ref={labelRef} className={styles.label}>
            {String(project.year)} · {project.tags[0]}
          </span>

          <h2 ref={titleRef} id={`project-${project.id}`} className={styles.title}>
            {project.title}
          </h2>

          <p ref={textRef} className={styles.desc}>
            {project.longDescription ?? project.description}
          </p>

          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>

          <a
            href={project.link}
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title}`}
          >
            View project
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M3 8h10M8 3l5 5-5 5" />
            </svg>
          </a>

          {/* Video below text on mobile / inline on desktop */}
          {project.videos && project.videos.length > 0 && (
            <div className={styles.videoWrapper}>
              <VideoPlayer video={project.videos[0]} />
            </div>
          )}
        </div>

        {/* Image column */}
        <div ref={imageGridRef} className={styles.imageCol}>
          {primaryImage && (
            <div className={styles.imgWrapper} data-primary>
              <Image
                src={primaryImage.src}
                alt={primaryImage.alt}
                width={primaryImage.width}
                height={primaryImage.height}
                className={styles.img}
                sizes="(max-width: 768px) 100vw, 55vw"
                priority={project.featured}
              />
            </div>
          )}

          {secondaryImages.length > 0 && (
            <div className={styles.secondaryGrid}>
              {secondaryImages.map((img) => (
                <div key={img.src} className={styles.imgWrapper}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    className={styles.img}
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
