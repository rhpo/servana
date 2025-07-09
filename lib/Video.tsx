import React from "react";

interface VideoProps {
  className?: string;
  src: string;
  type?: string;
  passKey?: string | number;
  ref?: React.Ref<HTMLVideoElement>;
}

/**
 * Renders a video component with fallback support for HLS streams.
 *
 * This function constructs an HLS source URL from the given `src` prop and attempts to load it using the `<video>` element.
 * If the constructed HLS URL is invalid, it falls back to the original `src`. The video is configured with various attributes
 * such as `muted`, `loop`, and autoplay features. It also includes sources for both the HLS stream and the original video file.
 *
 * @param props - An object containing properties for the video component.
 */
export default function Video(props: VideoProps) {
  // given src which is webm, we try to look for the m3u8 equivant in the same folder, it's basically {name}/{name}.m3u8
  // example: src = "/videos/hero.webm" => m3u8Src = "/videos/hero/hero.m3u8"

  let fileNameWOExt = props.src.split("/").pop()?.split(".")[0];
  let folderName = props.src.split("/").slice(0, -1).join("/");
  let m3u8Src = `${folderName}/${fileNameWOExt}/${fileNameWOExt}.m3u8`;

  // If the m3u8Src is not valid, we fallback to the original src
  if (!fileNameWOExt || !folderName) {
    m3u8Src = props.src;
  }

  return (
    <video
      className={props.className}
      muted
      loop
      playsInline
      webkit-playsinline="true"
      autoPlay
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
      ref={props.ref}
      key={props.passKey}
    >
      <source src={m3u8Src} type="application/x-mpegURL" />
      <source src={props.src} type={props.type || "video/webm"} />
    </video>
  );
}
