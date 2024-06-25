"use client";
import { useState } from "react";
import { FaLink } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Links({ links }: { links: any }) {
  const [justCopied, setJustCopied] = useState<any>();
  function copyLink(obj: { link: string; i: number }) {
    setJustCopied(obj);
    navigator.clipboard.writeText(obj.link).then(() => {
      toast.success("Skopiowano", { autoClose: 5000 });
    });
  }
  const { light } = useSelector((state: any) => state.light);
  return (
    <div className="mt-12 px-6 duration-300">
      <div className="flex items-center w-full">
        <div
          className={`${
            light ? "bg-white text-black" : "bg-zinc-800 text-white"
          } font-bold w-12 h-12 flex items-center justify-center aspect-square`}
        >
          nr
        </div>
        <div
          className={`w-[150px] lg:w-[200px] text-center font-bold h-12 flex items-center justify-center aspect-square ${
            light ? "bg-white text-black" : "bg-zinc-800 text-white"
          }`}
        >
          status
        </div>
      </div>
      <div className="grid grid-cols-1">
        {links.map((link: any, i: any) => (
          <div
            key={i}
            className={`flex items-center ${
              light
                ? i % 2 === 0
                  ? "bg-white text-black"
                  : "bg-gray-200 text-black"
                : i % 2 === 0
                ? "bg-gray-700 hover:bg-opacity-80 duration-300 text-white"
                : "bg-gray-500 hover:bg-opacity-80 duration-300 text-white"
            }`}
          >
            <div className="w-max flex flex-row">
              <div
                className={`${
                  light ? "bg-green-500" : "bg-purple-700"
                } text-white font-bold w-12 h-12 flex items-center justify-center aspect-square`}
              >
                {i + 1}
              </div>
              <div
                className={`w-[150px] lg:w-[200px] text-sm text-center ${
                  light
                    ? i % 2 === 0
                      ? "bg-white text-black"
                      : "bg-gray-200 text-black"
                    : i % 2 === 0
                    ? "bg-gray-700 text-white"
                    : "bg-gray-500 text-white"
                } font-bold h-12 flex items-center justify-center aspect-square ${
                  link.status === "delivered" && "!text-green-500"
                }
              ${justCopied?.i === i && "!text-yellow-400"}`}
              >
                {justCopied?.i !== i &&
                  link.status === "delivered" &&
                  "Dostarczono"}
                {justCopied?.i !== i &&
                  link.status === "pending" &&
                  "W trakcie"}
                {justCopied?.i === i && "Skopiowano"}
              </div>
              <button
                title="Kopiuj link"
                onClick={() => copyLink({ link: link.link, i: i })}
                className="w-12 text-center bg-gray-500 border-x-[5px] border-yellow-300 hover:bg-gray-600 text-white font-bold h-12 flex items-center justify-center aspect-square"
              >
                <FaLink />
              </button>
            </div>
            <button
              onClick={() => copyLink({ link: link.link, i: i })}
              className={` overflow-x-hidden px-3`}
            >
              <p className={`font-light w-max text-sm`}>{link.link}</p>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
