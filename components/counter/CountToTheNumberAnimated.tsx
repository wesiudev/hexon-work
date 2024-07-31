"use client";
// logic for an animation that counts to a number
import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import { useIsVisible } from "react-is-visible";
export default function CountToTheNumberAnimated({
  textBeforeNumber,
  numberToAnimateTo,
  textAfterNumber,
  textColor,
  animationSpeed,
}: {
  textBeforeNumber: string;
  numberToAnimateTo: number;
  textAfterNumber: string;
  textColor: string;
  animationSpeed: number;
}) {
  const [count, setCount] = useState<number>(0);
  const [hasFinished, setHasFinished] = useState<boolean>(false);
  const ref = useRef<any>();
  const isVisible = useIsVisible(ref);
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        if (count < numberToAnimateTo - 10) {
          setCount(count + 1);
        } else if (count < numberToAnimateTo - 2) {
          setCount(count + 1);
        } else {
          setCount(numberToAnimateTo);
          setHasFinished(true);
        }
      }, animationSpeed);
      return () => clearInterval(interval);
    }
  }, [count, hasFinished, numberToAnimateTo, isVisible]);
  useEffect(() => {
    AOS.init({
      offset: 100,
    });
  }, []);
  return (
    <>
      <div
        ref={ref}
        data-aos={textAfterNumber === "Projektów" ? "fade-down" : "fade-up"}
        aos-duration="1000"
        className={`${
          textAfterNumber !== "Projektów" && "lg:items-end"
        } text-2xl flex flex-col items-start max-w-[40rem]`}
      >
        <div
          style={{ color: textColor }}
          className="text-base lg:text-lg font-bold"
        >
          {textBeforeNumber}
        </div>

        <div className="font-bold text-8xl flex flex-row w-max items-end">
          <div className="font-bold bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] bg-clip-text text-transparent drop-shadow-xl shadow-zinc-800">
            {count.toLocaleString("pl-PL")}
            {numberToAnimateTo === 97 && "%"}
          </div>
          <div
            style={{ color: textColor }}
            className="text-sm italic mb-2 ml-4"
          >
            {textAfterNumber}
          </div>
        </div>
      </div>
    </>
  );
}
