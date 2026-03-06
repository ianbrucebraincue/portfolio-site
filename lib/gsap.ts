/**
 * Central GSAP setup module.
 * Import from here instead of directly from "gsap" to ensure
 * plugins are registered exactly once across the app.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
