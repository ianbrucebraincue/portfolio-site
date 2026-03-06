import Image from "next/image";
import type { Project } from "@/types";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

// Server component — reusable card for grid/list layouts
export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const cover = project.images[0];

  return (
    <article className={styles.card}>
      {cover && (
        <div className={styles.imageWrapper}>
          <Image
            src={cover.src}
            alt={cover.alt}
            width={cover.width}
            height={cover.height}
            className={styles.image}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            priority={priority}
          />
        </div>
      )}

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.year}>{project.year}</span>
          {project.featured && <span className={styles.featuredBadge}>Featured</span>}
        </div>

        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.desc}>{project.description}</p>

        <div className={styles.tags}>
          {project.tags.slice(0, 3).map((tag) => (
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
          View →
        </a>
      </div>
    </article>
  );
}
