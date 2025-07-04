import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme-provider";

interface HeroVideoProps {
  src?: string;
  thumbnail?: string;
}

/**
 * A component to render a hero video with a thumbnail overlay that plays when visible in the viewport.
 *
 * The component uses an IntersectionObserver to determine when the video is in view and attempts to play it.
 * If autoplay fails due to browser restrictions, it listens for user gestures (touch or click) to trigger playback.
 * The video is muted by default and has a dark theme overlay that fades out as the video plays.
 *
 * @param {HeroVideoProps} props - The component props, including `src` for the video URL and `thumbnail` for the thumbnail image URL.
 */
export function HeroVideo({ src = "/videos/hero.mp4", thumbnail = "/videos/hero.png" }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;

    /**
     * Attempts to play a video and handles user interaction if autoplay fails.
     */
    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setHasPlayed(true);
          })
          .catch(() => {
            /**
             * Plays the video and sets hasPlayed to true, then removes gesture event listeners.
             */
            const onGesture = () => {
              video
                .play()
                .then(() => {
                  setHasPlayed(true);
                })
                .catch((e) => {
                  alert(e)
                });

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
      { threshold: 0.5 },
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
            src={thumbnail}
            alt="Video Thumbnail"
            className="absolute top-0 left-0 inset-0 w-full h-full object-cover transition-opacity duration-500 z-10 opacity-100"
          />
        </>
      )}

      <video
        ref={videoRef}
        className="absolute top-0 left-0 inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-100 z-0"
        playsInline
        autoPlay
        muted
        loop
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
      >
        <source src={src + "?ngsw-bypass=true"} type="video/mp4" />
      </video>
    </>
  );
}
