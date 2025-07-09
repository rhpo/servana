import { useEffect, useState } from "react";

export function useAllMediaLoaded() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const mediaElements: (HTMLImageElement | HTMLVideoElement)[] = [
      ...Array.from(document.querySelectorAll("img")),
      ...Array.from(document.querySelectorAll("video")),
    ];

    if (mediaElements.length === 0) {
      setIsLoaded(true);
      return;
    }

    let loadedCount = 0;

    const checkDone = () => {
      loadedCount++;
      if (loadedCount === mediaElements.length) {
        setIsLoaded(true);
      }
    };

    mediaElements.forEach((el) => {
      if (el.tagName === "IMG") {
        if ((el as HTMLImageElement).complete) {
          checkDone();
        } else {
          el.addEventListener("load", checkDone, { once: true });
          el.addEventListener("error", checkDone, { once: true });
        }
      } else if (el.tagName === "VIDEO") {
        if ((el as HTMLVideoElement).readyState >= 3) {
          checkDone();
        } else {
          el.addEventListener("loadeddata", checkDone, { once: true });
          el.addEventListener("error", checkDone, { once: true });
        }
      }
    });
  }, []);

  return isLoaded;
}
