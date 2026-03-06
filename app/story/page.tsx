import { projects } from "@/data/projects";
import StoryHero from "@/components/story/StoryHero";
import StorySection from "@/components/story/StorySection";
import StoryOutro from "@/components/story/StoryOutro";

// Server component — passes data to client components that need GSAP
export default function StoryPage() {
  return (
    <main>
      <StoryHero />
      {projects.map((project, index) => (
        <StorySection key={project.id} project={project} index={index} />
      ))}
      <StoryOutro />
    </main>
  );
}
