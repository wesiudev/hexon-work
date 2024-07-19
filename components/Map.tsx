"use client";
import Image from "next/image";
import AOS from "aos";
import { useEffect } from "react";
export default function Map() {
  useEffect(() => {
    AOS.init({
      offset: 50,
    });
  }, []);
  return (
    <>
      <div className="group">
        <Image
          src="/map/domek.png"
          data-aos="zoom-in"
          data-aos-duration="1000"
          width={50}
          height={50}
          alt=""
          className="w-[8%] absolute top-[40%] left-[9.5%] sm:left-[8.5%]"
        />
      </div>
      <div className="group">
        <Image
          src="/map/domek.png"
          data-aos="zoom-in"
          data-aos-duration="1000"
          width={50}
          height={50}
          alt=""
          className="w-[10%] absolute top-[58%] left-[18%]"
        />
      </div>
      <div className="group">
        <Image
          src="/map/domek.png"
          data-aos="zoom-in"
          data-aos-duration="1000"
          width={50}
          height={50}
          alt=""
          className="w-[6%] absolute top-[69%] left-[33%]"
        />
      </div>
      <div className="group">
        <Image
          src="/map/domek.png"
          data-aos="zoom-in"
          data-aos-duration="1000"
          width={50}
          height={50}
          alt=""
          className="w-[6%] absolute top-[76%] left-[43%]"
        />
      </div>
      <div className="group">
        <Image
          src="/map/domek.png"
          data-aos="zoom-in"
          data-aos-duration="1000"
          width={50}
          height={50}
          alt=""
          className="w-[6%] absolute top-[67%] left-[44.5%]"
        />
      </div>
      <div className="group">
        <Image
          src="/map/domek.png"
          data-aos="zoom-in"
          data-aos-duration="1000"
          width={50}
          height={50}
          alt=""
          className="w-[8%] absolute top-[81%] left-[56.5%]"
        />
      </div>
      <div className="group">
        <Image
          src="/map/domek.png"
          data-aos="zoom-in"
          data-aos-duration="1000"
          width={50}
          height={50}
          alt=""
          className="w-[8%] absolute top-[78%] left-[72.5%]"
        />
      </div>
      <div className="group">
        <Image
          src="/map/domek.png"
          data-aos="zoom-in"
          data-aos-duration="1000"
          width={50}
          height={50}
          alt=""
          className="w-[10%] absolute top-[57%] left-[79%]"
        />
      </div>
      <div className="group">
        <Image
          src="/map/domek.png"
          data-aos="zoom-in"
          data-aos-duration="1000"
          width={50}
          height={50}
          alt=""
          className="w-[8%] absolute top-[65%] left-[60.5%]"
        />
      </div>
      <div className="group">
        <Image
          src="/map/domek.png"
          data-aos="zoom-in"
          data-aos-duration="1000"
          width={50}
          height={50}
          alt=""
          className="w-[10%] absolute top-[50%] left-[47.5%]"
        />
      </div>
      <div className="group">
        <Image
          src="/map/domek.png"
          data-aos="zoom-in"
          data-aos-duration="1000"
          width={50}
          height={50}
          alt=""
          className="w-[8%] absolute top-[46%] left-[30%]"
        />
      </div>
      <div className="group">
        <Image
          src="/map/domek.png"
          data-aos="zoom-in"
          data-aos-duration="1000"
          width={50}
          height={50}
          alt=""
          className="w-[8%] absolute top-[36%] left-[22%]"
        />
      </div>
      <div className="group">
        <Image
          src="/map/domek.png"
          data-aos="zoom-in"
          data-aos-duration="1000"
          width={50}
          height={50}
          alt=""
          className="w-[10%] absolute top-[27%] left-[37.5%]"
        />
      </div>
      <div className="group">
        <Image
          src="/map/domek.png"
          data-aos="zoom-in"
          data-aos-duration="1000"
          width={50}
          height={50}
          alt=""
          className="w-[8%] absolute top-[44%] left-[65%]"
        />
      </div>
      <div className="group">
        <Image
          src="/map/domek.png"
          data-aos="zoom-in"
          data-aos-duration="1000"
          width={50}
          height={50}
          alt=""
          className="w-[8%] absolute top-[34%] left-[56%]"
        />
      </div>
      <div className="group">
        <Image
          src="/map/domek.png"
          data-aos="zoom-in"
          data-aos-duration="1000"
          width={50}
          height={50}
          alt=""
          className="w-[10%] absolute top-[23%] left-[78%]"
        />
      </div>
      <div className="group">
        {/* <Image
                  src="/favicons/android-chrome-192x192.png"
                  width={50}
                  height={50}
                  alt=""
                  className="group-hover:scale-x-100 scale-x-0 duration-300 ease-in-out w-[10%] absolute top-[23%] left-[78%]"
                />
                <Image
                  src="/map/domek.png"
                   data-aos="zoom-in" aos-delay={500}
                  width={50}
                  height={50}
                  alt=""
                  className="w-[10%] absolute top-[23%] left-[78%]"
                /> */}
      </div>
      <div className="group" aos-data-aos="zoom-in">
        <Image
          src="/map/domek.png"
          data-aos="zoom-in"
          data-aos-duration="1000"
          width={50}
          height={50}
          alt=""
          className="w-[10%] absolute top-[14.5%] sm:top-[13.5%] left-[58%]"
        />
      </div>
      <div className="group">
        {/* <Image
                  src="/favicons/android-chrome-192x192.png"
                  width={50}
                  height={50}
                  alt=""
                  className="group-hover:scale-x-100 scale-x-0 duration-300 ease-in-out w-[10%] absolute top-[13.5%] left-[58%]"
                />
                <Image
                  src="/map/domek.png"
                   data-aos="zoom-in" aos-delay={500}
                  width={50}
                  height={50}
                  alt=""
                  className="w-[10%] absolute top-[13.5%] left-[58%]"
                /> */}
      </div>
      <div className="group">
        <Image
          src="/map/domek.png"
          data-aos="zoom-in"
          data-aos-duration="1000"
          width={50}
          height={50}
          alt=""
          className="w-[10%] absolute top-[10%] left-[32%]"
        />
      </div>
      <div className="group">
        <Image
          src="/map/domek.png"
          data-aos="zoom-in"
          data-aos-duration="1000"
          width={50}
          height={50}
          alt=""
          className="w-[10%] absolute top-[20%] left-[10%]"
        />
      </div>
      <div className="group">
        <Image
          src="/map/map6.png"
          height={1024}
          width={1024}
          alt=""
          className=""
        />
      </div>
    </>
  );
}
