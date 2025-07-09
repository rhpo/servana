import React from "react";

interface VideoProps {
  className?: string;
  src: string;
  type?: string;
  passKey?: string | number;
  ref?: React.Ref<HTMLVideoElement>;
}

/**
 * Renders a video component with specified source and type, applying compression to the source URL.
 */
export default function Video(props: VideoProps) {
  // given src which is webm, we try to look for the m3u8 equivant in the same folder, it's basically {name}/{name}.m3u8
  // example: src = "/videos/hero.webm" => m3u8Src = "/videos/hero/hero.m3u8"

  // let fileNameWOExt = props.src.split("/").pop()?.split(".")[0];
  // let folderName = props.src.split("/").slice(0, -1).join("/");
  // let m3u8Src = `${folderName}/${fileNameWOExt}/${fileNameWOExt}.m3u8`;

  // // If the m3u8Src is not valid, we fallback to the original src
  // if (!fileNameWOExt || !folderName) {
  //   m3u8Src = props.src;
  // }

  let realSrc = props.src.replace(".", "-compressed.");

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
      {/* <source src={m3u8Src} type="application/x-mpegURL" /> */}
      <source src={realSrc} type={props.type || "video/webm"} />
    </video>
  );
}
