// Fully static server component — zero JavaScript, no images, no videos.
// Optimized for low bandwidth, assistive technology, and accessibility.
// Plain <a> tags are intentional: Next.js <Link> adds client-side JS which defeats the low-carbon experience.
/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Lite",
  description: "Low-carbon, text-only portfolio. Projects without images or video.",
};

export default function LitePage() {
  return (
    <main>
      <header className="low-carbon-header">
        <h1>Your Name</h1>
        <p>Software engineer &amp; creative technologist</p>
        <nav className="low-carbon-nav" aria-label="Site experiences">
          <a href="/">Home</a>
          <a href="/web">Web version</a>
          <a href="/3d">3D version</a>
          <span aria-current="page">Lite (current)</span>
        </nav>
      </header>

      <section className="low-carbon-intro">
        <p>
          I build software that sits at the intersection of engineering and craft — interactive
          experiences, developer tools, and data visualizations. This is the low-bandwidth version
          of my portfolio. No images, no video, no trackers.
        </p>
        <p>
          Contact:{" "}
          <a href="mailto:hello@example.com">hello@example.com</a> ·{" "}
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
      </section>

      <section aria-label="Projects">
        <h2>Projects</h2>
        <ul className="project-list">
          {projects.map((project) => (
            <li key={project.id} className="project-item">
              <div className="project-meta">
                <span>{project.year}</span>
                <span>·</span>
                <span>{project.images.length} image{project.images.length !== 1 ? "s" : ""}</span>
                {project.videos && project.videos.length > 0 && (
                  <>
                    <span>·</span>
                    <span>{project.videos.length} video{project.videos.length !== 1 ? "s" : ""}</span>
                  </>
                )}
              </div>

              <h3 className="project-title">{project.title}</h3>

              <p className="project-desc">
                {project.longDescription ?? project.description}
              </p>

              {project.tags.length > 0 && (
                <ul className="project-tags" aria-label="Technologies">
                  {project.tags.map((tag) => (
                    <li key={tag} className="low-carbon-tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              )}

              <a
                href={project.link}
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} project`}
              >
                View project →
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer className="low-carbon-footer">
        <p>
          &copy; {new Date().getFullYear()} Your Name ·{" "}
          <a href="/web">Full site</a> ·{" "}
          <a href="/3d">3D experience</a>
        </p>
        <p>
          This page uses no JavaScript, no images, and no external fonts.
          Estimated transfer size: &lt;10 KB.
        </p>
      </footer>
    </main>
  );
}
