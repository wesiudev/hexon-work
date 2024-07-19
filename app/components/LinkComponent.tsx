"use client";
import { updateLink } from "@/common/firebase";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import { FaLink } from "react-icons/fa";
import "moment/locale/pl";
export default function LinkComponent({
  light,
  index,
  link,
  justCopied,
  setJustCopied,
  copyLink,
}: {
  light: any;
  index: any;
  link: any;
  justCopied: any;
  setJustCopied: any;
  copyLink: any;
}) {
  moment.locale("pl");
  const [name, setName] = useState("");
  function removeInvitePrefix(url: string) {
    const prefix = "https://hexon.work/invite/";
    if (url.startsWith(prefix)) {
      return url.slice(prefix.length);
    }
    return url;
  }
  return (
    <>
      <div
        key={index}
        className={`duration-500 flex items-center ${
          light
            ? index % 2 === 0
              ? "bg-white text-black"
              : "bg-gray-200 text-black"
            : index % 2 === 0
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
            {index + 1}
          </div>
          <div
            className={`duration-500 w-[115px] lg:w-[200px] text-sm text-center ${
              light
                ? index % 2 === 0
                  ? "bg-white text-black"
                  : "bg-gray-200 text-black"
                : index % 2 === 0
                ? "bg-gray-700 text-white"
                : "bg-gray-500 text-white"
            } font-bold h-12 flex items-center justify-center aspect-square ${
              link.status === "delivered" &&
              !link.hasMovieTimeEnded &&
              "!text-green-500"
            } ${
              link.status === "visited" &&
              justCopied.index !== index &&
              !link.hasMovieTimeEnded &&
              "!text-purple-600"
            } ${link.hasMovieTimeEnded && "!text-blue-500"}
              ${justCopied?.index === index && "!text-green-500"}`}
          >
            <>
              {justCopied?.index !== index &&
                link.status === "visited" &&
                !link.hasMovieTimeEnded &&
                "Odwiedził"}
              {justCopied?.index !== index &&
                link.status === "delivered" &&
                !link.hasMovieTimeEnded &&
                "Dostarczono"}
              {justCopied?.index !== index &&
                link.status === "pending" &&
                !link.hasMovieTimeEnded &&
                "W trakcie"}
              {link.hasMovieTimeEnded &&
                justCopied?.index !== index &&
                "Obejrzane"}
              {justCopied?.index === index && "Skopiowano"}
            </>
          </div>
          <button
            title="Kopiuj link"
            onClick={() =>
              copyLink({ link: link.link, index: index, name: "" })
            }
            className="w-12 text-center bg-green-500 border-yellow-300 hover:bg-green-600 text-white font-bold h-12 flex items-center justify-center aspect-square"
          >
            <FaLink />
          </button>
        </div>
        <button
          onClick={() => copyLink({ link: link.link, index: index, name: "" })}
          className={`hidden sm:block mx-3 py-1 overflow-x-hidden w-[80px] sm:w-[150px] md:w-[200px] lg:w-[250px] xl:w-[300px] 2xl:w-[350px]`}
        >
          <p className={`font-light w-max text-sm`}>{link.link}</p>
        </button>
        <div
          className={`h-full sm:border-l ${
            light ? "border-zinc-600 text-zinc-800" : "border-white text-white"
          } px-3 py-1 sm:w-[120px] duration-500`}
        >
          <div
            className={`h-full font-light  w-full sm:w-[150px] md:w-[200px] lg:w-[250px] xl:w-[300px] 2xl:w-[350px] text-sm flex items-center justify-center`}
          >
            <div className="flex flex-col sm:flex-row sm:space-x-2 items-center justify-center text-center h-full">
              {link?.date && (
                <div className="text-[12px] font-bold flex items-center justify-center">
                  {link.secondVersion ? (
                    <>
                      {/* <div className="">
                        Aktywował link:{" "}
                        <span className="text-green-500 font-bold">
                          {moment(link?.date)
                            .subtract(1, "day")
                            .format("DD MMMM YYYY hh:mm:ss")}
                        </span>
                      </div> */}
                      <div className="w-max">
                        Czas do:{" "}
                        <span className="text-purple-700 font-bold ">
                          {moment(link.date).format("DD MM YYYY hh:mm:ss")}
                        </span>
                      </div>
                    </>
                  ) : (
                    <span className="text-green-500 font-bold ">
                      {moment(link.date).format("DD MMMM YYYY")}
                    </span>
                  )}
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
      <div
        className={`${
          light ? "bg-green-500" : "bg-purple-700"
        } text-white font-bold w-max h-12 flex items-center justify-center aspect-square duration-500 border-b border-black mb-6`}
      >
        {link?.name !== "" && link?.name !== undefined ? (
          <div className="w-max px-3 bg-white text-zinc-800">
            Kandydat: {link?.name} <br /> Czas spędzony:{" "}
            {link?.timeSpent ? `${link?.timeSpent} sekund` : "brak danych"}
          </div>
        ) : (
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Imie i nazwisko"
            className="p-3 focus:outline-none shadow-md shadow-black bg-white text-zinc-800"
          />
        )}
        {link?.name !== "" && link?.name !== undefined && (
          <button
            title="Edytuj"
            onClick={() => {
              updateLink(removeInvitePrefix(link.link), { ...link, name: "" });
              setName("");
            }}
            className="px-3 text-center bg-green-500 border-yellow-300 hover:bg-green-600 text-white font-bold h-12 flex items-center justify-center"
          >
            Edytuj
          </button>
        )}
        {(link?.name === undefined || link?.name === "") && (
          <button
            title="Zapisz"
            onClick={() =>
              updateLink(removeInvitePrefix(link.link), { ...link, name: name })
            }
            className="px-3 text-center bg-green-500 border-yellow-300 hover:bg-green-600 text-white font-bold h-12 flex items-center justify-center"
          >
            Zapisz
          </button>
        )}
      </div>
    </>
  );
}
