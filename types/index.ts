export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  link: string;
  tags: string[];
  year: number;
  images: ProjectImage[];
  videos?: ProjectVideo[];
  featured?: boolean;
  color?: string; // Optional color for UI theming  
}

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProjectVideo {
  src: string;
  poster?: string;
  caption?: string;
}
