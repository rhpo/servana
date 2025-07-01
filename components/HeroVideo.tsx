import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme-provider";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
    const { isDarkTheme } = useTheme();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setHasPlayed(true);
          })
          .catch(() => {
            // Fallback: wait for user interaction
            const onGesture = () => {
              video.play().then(() => setHasPlayed(true)).catch(() => {});
              window.removeEventListener("touchstart", onGesture);
              window.removeEventListener("click", onGesture);
            };
            window.addEventListener("touchstart", onGesture, { once: true });
            window.addEventListener("click", onGesture, { once: true });
          });
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
          setIsVisible(true);
          tryPlay();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [hasPlayed]);

  return (
    <>
      {!hasPlayed && (
        <>
            <div
                className={`absolute inset-0 z-20 ${isDarkTheme ? "bg-black/50" : "bg-black/10"}`}
            />

            <img
            src="/videos/hero.png?codiha=false"
            alt="Video Thumbnail"
            className={`absolute top-0 left-0 inset-0 w-full h-full object-cover transition-opacity duration-500 z-10 opacity-100`}
            />

        </>
      )}

        <video
          ref={videoRef}
          className={`absolute top-0 left-0 inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            "opacity-100 z-0"
          }`}
          playsInline
          autoPlay
          muted
          loop
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

    </>
  );
}
