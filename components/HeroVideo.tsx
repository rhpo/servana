import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme-provider";

interface HeroVideoProps {
  src?: string | string[];
  thumbnail?: string | string[];
}

export function HeroVideo({
  src = "/videos/hero.mp4",
  thumbnail = "/videos/hero.png",
}: HeroVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const { isDarkTheme } = useTheme();

  // Normalize src and thumbnail to arrays
  const sources = Array.isArray(src) ? src : [src];
  const thumbnails = Array.isArray(thumbnail) ? thumbnail : [thumbnail];

  useEffect(() => {
    const videos = videoRefs.current.filter(Boolean) as HTMLVideoElement[];
    if (videos.length === 0) return;

    // Set up all videos
    videos.forEach((video) => {
      video.defaultMuted = true;
      video.muted = true;
    });

    const tryPlayAll = () => {
      const playPromises = videos.map((video) => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          return playPromise
            .then(() => {
              // Video played successfully
            })
            .catch(() => {
              // Video failed to play
              throw new Error("Video play failed");
            });
        }
        return Promise.resolve();
      });

      Promise.all(playPromises)
        .then(() => {
          setHasPlayed(true);
        })
        .catch(() => {
          // If any video fails to play, set up gesture listeners
          const onGesture = () => {
            Promise.all(videos.map((video) => video.play()))
              .then(() => {
                setHasPlayed(true);
              })
              .catch((e) => {
                alert(`Error playing videos: ${e}`);
              });

            window.removeEventListener("touchstart", onGesture);
            window.removeEventListener("click", onGesture);
          };
          window.addEventListener("touchstart", onGesture, { once: true });
          window.addEventListener("click", onGesture, { once: true });
        });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
          setIsVisible(true);
          tryPlayAll();
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasPlayed, sources.length]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      {!hasPlayed && (
        <>
          <div
            className={`absolute inset-0 z-20 ${
              isDarkTheme ? "bg-black/50" : "bg-black/10"
            }`}
          />
          <div className="absolute inset-0 z-10 flex flex-col md:flex-row">
            {sources.map((_, index) => (
              <div key={`thumbnail-${index}`} className="flex-1 relative">
                <img
                  src={thumbnails[index] || thumbnails[0]}
                  alt={`Video Thumbnail ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover opacity-100"
                />
              </div>
            ))}
          </div>
        </>
      )}

      <div className="absolute inset-0 z-0 flex flex-col md:flex-row">
        {sources.map((source, index) => (
          <video
            key={`video-${index}`}
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            className="flex-1 min-w-0 min-h-0 w-full h-full object-cover transition-opacity duration-500 opacity-100"
            playsInline
            autoPlay
            muted
            loop
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
          >
            <source src={source + ""} type="video/mp4" />
          </video>
        ))}
      </div>
    </div>
  );
}
