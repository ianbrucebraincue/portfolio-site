import { projects } from "@/data/projects";
import WorldSceneLoader from "@/components/three/WorldSceneLoader";
import styles from "./page.module.css";

export default function ThreeDPage() {
  return (
    <div className={styles.page}>
      <WorldSceneLoader projects={projects} />

      <div className={styles.hint} aria-hidden>
        <kbd>Click</kbd> a project · <kbd>Drag</kbd> to orbit · <kbd>Scroll</kbd> to zoom
      </div>
    </div>
  );
}
