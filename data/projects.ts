import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "luminance",
    title: "Luminance",
    description:
      "An interactive generative art system that translates sound frequencies into real-time WebGL visual fields. Built for live performance installations.",
    longDescription:
      "Luminance is a browser-based audio-visual engine that analyzes incoming audio streams and maps frequency bands to procedural GLSL shaders. The system supports MIDI input for parameter control, allowing performers to sculpt visual output in real time. Deployed at three gallery exhibitions across Berlin and Amsterdam.",
    link: "https://github.com",
    tags: ["WebGL", "GLSL", "Web Audio API", "TypeScript"],
    year: 2024,
    featured: true,
    images: [
      {
        src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80",
        alt: "Luminance generative art — glowing green waveforms on black background",
        width: 1200,
        height: 800,
      },
      {
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
        alt: "Luminance installation view at gallery space",
        width: 1200,
        height: 800,
      },
      {
        src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
        alt: "Luminance code and circuit detail",
        width: 1200,
        height: 800,
      },
    ],
    videos: [
      {
        src: "/videos/luminance-demo.mp4",
        poster: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=60",
        caption: "Live performance demo, Berlin 2024",
      },
    ],
  },
  {
    id: "meridian",
    title: "Meridian",
    description:
      "A spatial data visualization platform for urban planners that renders city infrastructure as an explorable 3D graph network.",
    longDescription:
      "Meridian ingests GeoJSON and CSV data exports from municipal databases and builds an interactive graph where nodes are infrastructure assets and edges represent dependency relationships. City planners can simulate failure cascades and identify single points of failure before they occur. Used by three European municipalities.",
    link: "https://github.com",
    tags: ["Three.js", "D3.js", "Next.js", "PostgreSQL", "GeoJSON"],
    year: 2024,
    featured: true,
    images: [
      {
        src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
        alt: "Meridian — city infrastructure network visualization",
        width: 1200,
        height: 800,
      },
      {
        src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
        alt: "Meridian dashboard showing node graph",
        width: 1200,
        height: 800,
      },
    ],
    videos: [
      {
        src: "/videos/meridian-demo.mp4",
        poster: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=60",
        caption: "Failure cascade simulation",
      },
    ],
  },
  {
    id: "folio-type",
    title: "Folio Type",
    description:
      "An open-source variable font specimen tool. Designers can stress-test typefaces across axes in a real-time browser environment.",
    longDescription:
      "Folio Type provides a live design environment for variable font exploration. Users define axis ranges and the tool generates animated transitions across all registered axes simultaneously. Export targets include CSS custom properties, specimen PDFs, and embeddable iframes. Over 4,000 designers use it monthly.",
    link: "https://github.com",
    tags: ["Typography", "CSS", "TypeScript", "Vite", "Open Source"],
    year: 2023,
    images: [
      {
        src: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80",
        alt: "Folio Type — variable font specimen interface",
        width: 1200,
        height: 800,
      },
      {
        src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200&q=80",
        alt: "Folio Type showing weight axis range",
        width: 1200,
        height: 800,
      },
    ],
  },
  {
    id: "atlas-ml",
    title: "Atlas ML",
    description:
      "A machine learning experiment dashboard that visualizes training runs as navigable multi-dimensional space.",
    longDescription:
      "Atlas ML connects to experiment tracking backends (MLflow, W&B) and renders hyperparameter spaces as interactive point clouds. Clusters of successful runs become visually apparent, letting researchers intuit relationships that tabular views miss. Supports custom projection algorithms including UMAP and t-SNE.",
    link: "https://github.com",
    tags: ["Python", "React", "WebGL", "MLflow", "UMAP"],
    year: 2023,
    images: [
      {
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
        alt: "Atlas ML — experiment run point cloud visualization",
        width: 1200,
        height: 800,
      },
      {
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
        alt: "Atlas ML dashboard with metric curves",
        width: 1200,
        height: 800,
      },
    ],
    videos: [
      {
        src: "/videos/atlas-demo.mp4",
        poster: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=60",
        caption: "Navigating the hyperparameter space",
      },
    ],
  },
  {
    id: "stillwater",
    title: "Stillwater",
    description:
      "A mindfulness web app with ambient generative soundscapes. No accounts, no tracking — just a browser tab that breathes.",
    longDescription:
      "Stillwater generates infinite ambient audio using the Web Audio API: layered oscillators, pink noise, and convolution reverb create an evolving soundscape. Visual feedback is a minimal canvas animation synced to breathing cadence. The entire app ships in under 40 KB. Built as an exploration of digital calm.",
    link: "https://github.com",
    tags: ["Web Audio API", "Canvas", "Minimalism", "Accessibility"],
    year: 2022,
    images: [
      {
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
        alt: "Stillwater app — minimal breathing interface",
        width: 1200,
        height: 800,
      },
    ],
  },
  {
    id: "campo",
    title: "Campo",
    description:
      "A real-time collaborative field notes tool for environmental researchers. Works offline-first with CRDTs.",
    longDescription:
      "Campo is a progressive web app for ecological fieldwork. Researchers collect GPS-tagged observations, sketches, and audio notes that sync via CRDT-based replication when connectivity is restored. Designed to work reliably in remote areas with intermittent mobile data. Used by two university research groups.",
    link: "https://github.com",
    tags: ["PWA", "CRDTs", "IndexedDB", "Offline-First", "React"],
    year: 2022,
    images: [
      {
        src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80",
        alt: "Campo — field research notes app on mobile",
        width: 1200,
        height: 800,
      },
      {
        src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
        alt: "Campo map view with field observations",
        width: 1200,
        height: 800,
      },
    ],
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
