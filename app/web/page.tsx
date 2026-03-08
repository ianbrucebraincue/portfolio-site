import { projects } from "@/data/projects";
import WebHero from "@/components/web/WebHero";
import WebSection from "@/components/web/WebSection";
import WebOutro from "@/components/web/WebOutro";

// Server component — passes data to client components that need GSAP
export default function WebPage() {
  return (
    <main>
      <WebHero />
      {projects.map((project, index) => (
        <WebSection key={project.id} project={project} index={index} />
      ))}
      <WebOutro />
    </main>
  );
}
