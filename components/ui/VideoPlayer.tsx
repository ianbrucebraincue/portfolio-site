"use client";

import { useRef, useState, useCallback } from "react";
import type { ProjectVideo } from "@/types";
import styles from "./VideoPlayer.module.css";

interface VideoPlayerProps {
  video: ProjectVideo;
  className?: string;
}

export default function VideoPlayer({ video, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const togglePlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  }, []);

  const handleEnded = useCallback(() => setPlaying(false), []);
  const handleCanPlay = useCallback(() => setLoaded(true), []);

  return (
    <figure className={`${styles.figure} ${className ?? ""}`}>
      <div className={styles.wrapper}>
        {/* Lazy-loaded: preload="none" defers network fetch until interaction */}
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          preload="none"
          playsInline
          className={styles.video}
          onEnded={handleEnded}
          onCanPlay={handleCanPlay}
          aria-label={video.caption ?? "Project video"}
        />

        <button
          className={`${styles.playBtn} ${playing ? styles.playing : ""}`}
          onClick={togglePlay}
          aria-label={playing ? "Pause video" : "Play video"}
        >
          {playing ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <rect x="4" y="3" width="4" height="14" rx="1" />
              <rect x="12" y="3" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path d="M6 4l12 6-12 6V4z" />
            </svg>
          )}
        </button>

        {!loaded && (
          <div className={styles.loadHint} aria-hidden>
            Click to load & play
          </div>
        )}
      </div>

      {video.caption && <figcaption className={styles.caption}>{video.caption}</figcaption>}
    </figure>
  );
}
