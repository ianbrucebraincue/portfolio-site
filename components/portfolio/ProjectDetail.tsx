"use client";

import Image from "next/image";
import type { Project } from "@/types";
import styles from "./ProjectDetail.module.css";

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  return (
    <>
      {/* Clicking the backdrop closes the panel */}
      <div className={styles.backdrop} onClick={onClose} aria-hidden />

      <aside
        className={styles.panel}
        aria-label={`${project.title} details`}
      >
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close project detail"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M2 2l14 14M16 2L2 16" />
          </svg>
        </button>

        <div className={styles.content}>
          <span className={styles.year}>{project.year}</span>
          <h2 className={styles.title}>{project.title}</h2>
          <p className={styles.desc}>
            {project.longDescription ?? project.description}
          </p>

          {/* Tech stack */}
          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>

          {/* Preview images */}
          {project.images.length > 0 && (
            <div className={styles.imageGrid}>
              {project.images.slice(0, 2).map((img) => (
                <div key={img.src} className={styles.imgWrapper}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className={styles.img}
                    sizes="210px"
                  />
                </div>
              ))}
            </div>
          )}

          {/* View live link */}
          <a
            href={project.link}
            className={styles.viewLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            View live site
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
          </a>
        </div>
      </aside>
    </>
  );
}
