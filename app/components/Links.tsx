"use client";
import moment from "moment";
import { useState } from "react";
import { FaLink } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LinkComponent from "./LinkComponent";
export default function Links({ links }: { links: any }) {
  const [justCopied, setJustCopied] = useState<any>(-1);
  function copyLink(obj: { link: string; i: number; name: string }) {
    setJustCopied(obj);
    navigator.clipboard.writeText(obj.link).then(() => {
      toast.success("Skopiowano", { autoClose: 5000 });
    });
  }
  const { light } = useSelector((state: any) => state.light);
  return (
    <>
      <div className="mt-12 px-6 duration-300 min-h-screen">
        <div className="flex items-center w-full">
          <div
            className={`${
              light ? "bg-white text-black" : "bg-zinc-600 text-white"
            } font-bold w-12 h-12 flex items-center justify-center aspect-square duration-500`}
          >
            nr
          </div>
          <div
            className={`w-[115px] lg:w-[200px] text-center font-bold h-12 flex items-center justify-center aspect-square duration-500 ${
              light ? "bg-gray-300 text-black" : "bg-zinc-800 text-white"
            }`}
          >
            status
          </div>
          <div
            className={`w-12 h-12 bg-white flex items-center justify-center duration-500 ${
              light ? "bg-white text-black" : "bg-zinc-600 text-white"
            }`}
          >
            -
          </div>
          <div
            className={`hidden w-[104px] sm:w-[174px] md:w-[224px] lg:w-[274px] xl:w-[324px] 2xl:w-[374px] font-bold h-12 sm:flex items-center justify-center duration-500 ${
              light ? "bg-gray-300 text-black" : "bg-zinc-800 text-white"
            }`}
          >
            link
          </div>
          <div
            className={`w-[104px] sm:w-[174px] md:w-[224px] lg:w-[274px] xl:w-[324px] 2xl:w-[374px] font-bold h-12 flex items-center justify-center duration-500 ${
              light
                ? "bg-gray-300 sm:bg-white text-black"
                : "bg-zinc-800 sm:bg-zinc-600 text-white"
            }`}
          >
            data
          </div>
        </div>
        <div className="grid grid-cols-1">
          {links?.map((link: any, i: any) => (
            <>
              <LinkComponent
                setJustCopied={setJustCopied}
                copyLink={copyLink}
                light={light}
                index={i}
                link={link}
                justCopied={justCopied}
              />
            </>
          ))}
        </div>
      </div>
    </>
  );
}
