"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { pushLinks } from "@/common/firebase";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Links from "@/components/Links";

export default function Page() {
  const [links, setLinks] = useState<any>([]);
  const [error, setError] = useState(false);
  const [collection, setCollection] = useState("");
  function generateLink(quantity: number) {
    const newLinks = Array.from({ length: quantity }, (_, i) => ({
      link: `https://hexon.work/invite/${uuidv4()}`,
      status: "pending",
      id: uuidv4(),
      name: "",
      secondVersion: true,
    }));
    setLinks((prevLinks: any) => [...prevLinks, ...newLinks]);
  }
  const router = useRouter();
  const { light } = useSelector((state: any) => state.light);
  return (
    <div className="w-full h-full text-white font-sans pb-12">
      <h1 className="text-4xl font-bold mt-12 mb-12 px-6">
        Wygeneruj zaproszenia
      </h1>
      <label htmlFor="quantity" className="px-6">
        Podaj ilość
      </label>
      <div className="flex flex-row flex-wrap w-[300px] mt-3 gap-3 mb-3 px-6">
        <button
          onClick={() => setLinks([])}
          className={`w-max aspect-square p-3 ${
            light
              ? "bg-white text-zinc-800"
              : "bg-zinc-800 hover:bg-zinc-900 text-white"
          } font-bold duration-300`}
        >
          0
        </button>
        <button
          onClick={() => generateLink(10)}
          className={`w-max aspect-square p-3 ${
            light
              ? "bg-white text-zinc-800"
              : "bg-zinc-800 hover:bg-zinc-900 text-white"
          } font-bold duration-300`}
        >
          +10
        </button>

        <button
          onClick={() => generateLink(20)}
          className={`w-max aspect-square p-3 ${
            light
              ? "bg-white text-zinc-800"
              : "bg-zinc-800 hover:bg-zinc-900 text-white"
          } font-bold duration-300`}
        >
          +20
        </button>
        <button
          onClick={() => generateLink(30)}
          className={`w-max aspect-square p-3 ${
            light
              ? "bg-white text-zinc-800"
              : "bg-zinc-800 hover:bg-zinc-900 text-white"
          } font-bold duration-300`}
        >
          +30
        </button>
      </div>
      <div className="flex flex-col lg:flex-row items-center px-6">
        <div className="w-full  lg:w-[300px] h-max relative">
          <button
            onClick={() => {
              if (links?.length > 0) {
                setLinks((prevLinks: any) => prevLinks.slice(0, -1));
              } else {
                return;
              }
            }}
            className={`absolute left-0 h-full pl-4 pr-3 text-xl font-bold text-white flex items-center justify-center
              ${
                light
                  ? "bg-green-600 hover:bg-green-500"
                  : "bg-purple-600 hover:bg-purple-500"
              }`}
          >
            -
          </button>
          <button
            onClick={() => {
              generateLink(1);
            }}
            className={`absolute right-0 h-full pr-4 pl-3 text-xl font-bold text-white flex items-center justify-center
              ${
                light
                  ? "bg-green-600 hover:bg-green-500"
                  : "bg-purple-600 hover:bg-purple-500"
              }`}
          >
            +
          </button>
          <div
            className={`${
              light ? "bg-white text-zinc-800" : "bg-zinc-800 text-white"
            } duration-300 w-full text-center py-3`}
          >
            {links?.length}
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full mx-6">
        <input
          type="text"
          className={`mt-4 p-3 shodow-sm shadow-black w-full sm:w-[300px] ${
            light
              ? "text-zinc-800 bg-white placeholder:text-zinc-600"
              : "text-white bg-zinc-800 placeholder:text-gray-500"
          }`}
          placeholder="Wpisz nazwę kolekcji"
          value={collection}
          onChange={(e: any) => setCollection(e.target.value)}
          required
        />
        {error && (
          <div className="text-red-500 font-bold">Wpisz nazwę kolekcji.</div>
        )}
        <button
          onClick={() => {
            if (collection !== "") {
              const id = uuidv4();
              pushLinks({ name: collection, data: links, id: id });
              router.push(`/admin/links/${id}`);
            } else {
              setError(true);
            }
          }}
          className={`w-max mt-3 mb-6 p-3 duration-300 text-center text-white ${
            light
              ? "bg-green-500 hover:bg-green-600"
              : "bg-purple-500 hover:bg-purple-600"
          }`}
        >
          Zapisz kolekcję
        </button>
      </div>
      <Links links={links} />
    </div>
  );
}
