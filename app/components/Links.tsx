"use client";
import moment from "moment";
import { useState } from "react";
import { FaLink } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Links({ links }: { links: any }) {
  const [justCopied, setJustCopied] = useState<any>(-1);
  function copyLink(obj: { link: string; i: number }) {
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
            className={`w-[104px] sm:w-[174px] md:w-[224px] lg:w-[274px] xl:w-[324px] 2xl:w-[374px] font-bold h-12 flex items-center justify-center duration-500 ${
              light ? "bg-gray-300 text-black" : "bg-zinc-800 text-white"
            }`}
          >
            link
          </div>
          <div
            className={`w-[104px] sm:w-[174px] md:w-[224px] lg:w-[274px] xl:w-[324px] 2xl:w-[374px] font-bold h-12 flex items-center justify-center duration-500 ${
              light ? "bg-white text-black" : "bg-zinc-600 text-white"
            }`}
          >
            data
          </div>
        </div>
        <div className="grid grid-cols-1">
          {links?.map((link: any, i: any) => (
            <div
              key={i}
              className={`duration-500 flex items-center ${
                light
                  ? i % 2 === 0
                    ? "bg-white text-black"
                    : "bg-gray-200 text-black"
                  : i % 2 === 0
                  ? "bg-gray-700 text-white"
                  : "bg-gray-500 text-white"
              }`}
            >
              <div className="w-max flex flex-row">
                <div
                  className={`${
                    light ? "bg-green-500" : "bg-purple-700"
                  } text-white font-bold w-12 h-12 flex items-center justify-center aspect-square duration-500`}
                >
                  {i + 1}
                </div>
                <div
                  className={`duration-500 w-[115px] lg:w-[200px] text-sm text-center ${
                    light
                      ? i % 2 === 0
                        ? "bg-white text-black"
                        : "bg-gray-200 text-black"
                      : i % 2 === 0
                      ? "bg-gray-700 text-white"
                      : "bg-gray-500 text-white"
                  } font-bold h-12 flex items-center justify-center aspect-square ${
                    link.status === "delivered" &&
                    !link.hasMovieTimeEnded &&
                    "!text-green-500"
                  } ${link.hasMovieTimeEnded && "!text-blue-500"}
              ${justCopied?.i === i && "!text-yellow-400"}`}
                >
                  <>
                    {justCopied?.i !== i &&
                      link.status === "delivered" &&
                      !link.hasMovieTimeEnded &&
                      "Dostarczono"}
                    {justCopied?.i !== i &&
                      link.status === "pending" &&
                      !link.hasMovieTimeEnded &&
                      "W trakcie"}
                    {link.hasMovieTimeEnded && "Obejrzane"}
                  </>
                </div>
                <button
                  title="Kopiuj link"
                  onClick={() => copyLink({ link: link.link, i: i })}
                  className="w-12 text-center bg-green-500 border-yellow-300 hover:bg-green-600 text-white font-bold h-12 flex items-center justify-center aspect-square"
                >
                  <FaLink />
                </button>
              </div>
              <button
                onClick={() => copyLink({ link: link.link, i: i })}
                className={`mx-3 py-1 overflow-x-hidden w-[80px] sm:w-[150px] md:w-[200px] lg:w-[250px] xl:w-[300px] 2xl:w-[350px]`}
              >
                <p className={`font-light w-max text-sm`}>{link.link}</p>
              </button>
              <div
                className={`h-full border-l-2 ${
                  light
                    ? "border-black text-zinc-800"
                    : "border-white text-white"
                } px-3 py-1 w-[120px] duration-500`}
              >
                <div
                  className={`h-full font-light w-[80px] sm:w-[150px] md:w-[200px] lg:w-[250px] xl:w-[300px] 2xl:w-[350px] text-sm flex items-center justify-center`}
                >
                  <div className="flex flex-col sm:flex-row sm:space-x-2 items-center justify-center text-center h-full">
                    {link?.date && (
                      <div className="text-[12px] font-bold">
                        {moment(link.date).format("DD.MM.YYYY")}
                      </div>
                    )}
                    {link?.hour && (
                      <div className="text-[12px] font-bold">{link.hour}</div>
                    )}
                    {!link.date && "-"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
