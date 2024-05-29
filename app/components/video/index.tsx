"use client";
import { useEffect, useRef, useState } from "react";
import { useIsVisible } from "react-is-visible";
import { FaPause, FaPlay } from "react-icons/fa";
export default function RecruitmentVideo() {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const ref = useRef<any>();
  const video1 = useRef<any>();
  const video2 = useRef<any>();
  const isVisible = useIsVisible(ref);
  const [playing, setPlaying] = useState(true);

  function pause() {
    video1?.current?.pause();
    video2?.current?.pause();
    setPlaying(false);
  }
  function play() {
    video1?.current?.play();
    video2?.current?.play();
    setPlaying(true);
  }
  useEffect(() => {
    play();
  }, [ref]);
  return (
    <>
      <div className="w-full z-50 relative">
        <div ref={ref} className="absolute w-12 h-px top-[50%] left-0 z-50" />

        {!playing && (
          <button
            onClick={() => play()}
            className="z-50 absolute left-3 bottom-3 sm:left-6 sm:bottom-6 text-lg sm:text-xl bg-black bg-opacity-50 rounded-full p-2 items-center justify-center flex text-white"
          >
            <FaPlay />
          </button>
        )}
        {playing && (
          <button
            onClick={() => pause()}
            className="z-50 absolute left-3 bottom-3 sm:left-6 sm:bottom-6 text-lg sm:text-xl bg-black bg-opacity-50 rounded-full p-2 items-center justify-center flex text-white"
          >
            <FaPause />
          </button>
        )}

        <video
          onPause={() => setPlaying(false)}
          ref={video1}
          src="https://firebasestorage.googleapis.com/v0/b/wesiudev-5e3b9.appspot.com/o/recruitment-video.mp4?alt=media&token=40861c1a-e97f-40b2-a116-83961107615f"
          autoPlay
          muted={isMuted}
          className={`w-full z-50`}
        />
      </div>

      <div
        className={`duration-500 z-[9999] w-[200px] sm:w-[250px] lg:w-[350px] xl:w-[400px] 2xl:w-[450px] ${
          !playing && "opacity-0"
        } ${
          // is the element that we are scrolling to visible?
          !isVisible && "fixed bottom-6 right-6"
        } ${isVisible && "fixed opacity-0 -right-12 -bottom-12"}`}
      >
        <div className="relative">
          {!playing && (
            <button
              onClick={() => play()}
              className="z-50 absolute left-3 bottom-3 sm:left-6 sm:bottom-6 text-lg sm:text-xl bg-black bg-opacity-50 rounded-full p-2 items-center justify-center flex text-white"
            >
              <FaPlay />
            </button>
          )}
          {playing && (
            <button
              onClick={() => pause()}
              className="z-50 absolute left-3 bottom-3 sm:left-6 sm:bottom-6 text-lg sm:text-xl bg-black bg-opacity-50 rounded-full p-2 items-center justify-center flex text-white"
            >
              <FaPause />
            </button>
          )}
          <video
            ref={video2}
            src="https://firebasestorage.googleapis.com/v0/b/wesiudev-5e3b9.appspot.com/o/recruitment-video.mp4?alt=media&token=40861c1a-e97f-40b2-a116-83961107615f"
            autoPlay
            muted
          />
        </div>
      </div>
    </>
  );
}
