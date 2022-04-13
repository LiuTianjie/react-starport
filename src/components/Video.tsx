import { VideoHTMLAttributes, useRef, useEffect } from "react";

type VideoProps = VideoHTMLAttributes<HTMLVideoElement> & {
  srcObject: MediaStream;
};

export const Video = ({ srcObject, ...props }: VideoProps) => {
  const refVideo = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!refVideo.current) return;
    refVideo.current.srcObject = srcObject;
    console.log(refVideo.current.srcObject);
  }, [srcObject]);
  return <video ref={refVideo} autoPlay playsInline muted {...props} />;
};
