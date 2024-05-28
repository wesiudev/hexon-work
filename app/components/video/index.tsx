"use client";
import { useEffect, useRef, useState } from "react";
import { IoVolumeHigh } from "react-icons/io5";
import { IoMdVolumeOff } from "react-icons/io";
import { useIsVisible } from "react-is-visible";
export default function RecruitmentVideo() {
  const [muted, setMuted] = useState<boolean>(false);
  const ref = useRef<any>();
  const isVisible = useIsVisible(ref);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setPlaying(false);
      playing && setPlaying(false);
    }, 47000);
  }, [playing]);
  return (
    <>
      <div className="w-full z-50 relative">
        <div ref={ref} className="absolute w-12 h-px top-[50%] left-0 z-50" />
        <video
          src="https://firebasestorage.googleapis.com/v0/b/wesiudev-5e3b9.appspot.com/o/recruitment-video.mp4?alt=media&token=40861c1a-e97f-40b2-a116-83961107615f"
          autoPlay={playing}
          loop
          muted={(playing === false || muted === true) && true}
          className={`w-full z-50`}
          onClick={() => {
            setPlaying(!playing), setMuted(!muted);
          }}
        />

        <button
          onClick={() => setMuted(!muted)}
          className="p-2 flex items-center justify-center absolute bottom-3 right-3 sm:right-6 sm:bottom-6 rounded-full bg-black text-white text-2xl sm:text-4xl"
        >
          {muted && <IoMdVolumeOff />}
          {!muted && <IoVolumeHigh />}
        </button>
      </div>
      {playing === true && (
        <div
          className={`duration-500 ${
            // is the element that we are scrolling to visible?
            !isVisible &&
            "fixed bottom-6 right-6 w-[200px] sm:w-[250px] lg:w-[350px] xl:w-[400px] 2xl:w-[450px] z-[99999999]"
          } ${isVisible && "fixed opacity-0 -right-12 -bottom-12"}`}
        >
          <div className="relative">
            <video
              src="https://firebasestorage.googleapis.com/v0/b/wesiudev-5e3b9.appspot.com/o/recruitment-video.mp4?alt=media&token=40861c1a-e97f-40b2-a116-83961107615f"
              autoPlay={playing}
              loop
              muted
            />
            <button
              onClick={() => setMuted(!muted)}
              className="p-2 flex items-center justify-center absolute bottom-3 right-3 sm:right-6 sm:bottom-6 rounded-full bg-black text-white text-lg sm:text-xl"
            >
              {muted && <IoMdVolumeOff />}
              {!muted && <IoVolumeHigh />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
