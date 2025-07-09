import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import Video from "@/lib/Video";

interface HeroVideoProps {
  src?: string | string[];
  thumbnail?: string | string[];
}

/**
 * Render a hero video component with optional sources and thumbnail.
 *
 * This function manages video playback, handling intersection observer events,
 * attempting to autoplay videos, and setting up gesture listeners if autoplay fails.
 * It also handles theming by adjusting the background color based on the current theme.
 *
 * @param props - An object containing the source(s) of the video and the thumbnail.
 * @returns A React component rendering a hero video with optional sources and thumbnails.
 */
export function HeroVideo({
  src = "/videos/hero.webm",
  thumbnail = "/videos/hero.png",
}: HeroVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const { isDarkTheme } = useTheme();

  // Normalize src and thumbnail to arrays
  let sources = Array.isArray(src) ? src : [src];

  // sources will be choose random 2 videos of sources
  sources = sources.sort(() => 0.5 - Math.random()).slice(0, 2);

  const thumbnails = Array.isArray(thumbnail) ? thumbnail : [thumbnail];

  useEffect(() => {
    const videos = videoRefs.current.filter(Boolean) as HTMLVideoElement[];
    if (videos.length === 0) return;

    // Set up all videos
    videos.forEach((video) => {
      video.defaultMuted = true;
      video.muted = true;
    });

    /**
     * Attempts to play all videos and sets up gesture listeners if any video fails to play.
     */
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
          /**
           * Plays all videos and sets hasPlayed to true, then removes gesture event listeners.
           */
          const onGesture = () => {
            Promise.all(videos.map((video) => video.play()))
              .then(() => {
                setHasPlayed(true);
              })
              .catch((e) => {
                // alert(`Error playing videos: ${e}`);
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
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pt-[var(--navbar-height-mobile)] md:pt-0"
    >
      {!hasPlayed && (
        <>
          <div
            className={`absolute inset-0 z-20 ${
              isDarkTheme ? "bg-black/50" : "bg-black/10"
            }`}
          />
          <div className="absolute inset-0 z-10 flex flex-col md:flex-row">
            <div key={`thumbnail`} className="flex-1 relative">
              {/* show loading spinner in the center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-gray-300 rounded-full animate-spin">
                  <div className="w-full h-full bg-black rounded-full">
                    <img
                      src={thumbnails[0]}
                      alt="Loading"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="absolute inset-0 z-0 flex flex-col md:flex-row">
        {sources.map((source, index) => (
          <Video
            key={`video-${index}`}
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            className="flex-1 min-w-0 min-h-0 w-full h-full object-cover transition-opacity duration-500 opacity-100"
            src={source}
          ></Video>
        ))}
      </div>
    </div>
  );
}
