"use client";
import { app } from "@/common/firebase";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";
export default function Page() {
  const [links, setLinks] = useState<any[]>([]);
  const { light } = useSelector((state: any) => state.light);
  useEffect(() => {
    const ref = collection(getFirestore(app), "links");
    const unsub = onSnapshot(ref, (querySnapshot: any) => {
      const snapshotData: any[] = [];
      querySnapshot.forEach((doc: any) => {
        snapshotData.push(doc.data());
      });
      setLinks(snapshotData);
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="min-h-screen">
      {" "}
      <Link
        href="/admin"
        className="bg-black py-3 px-6 text-white font-bold text-lg flex items-center"
      >
        <FaLongArrowAltLeft className="mr-2 text-xl" />
        Strona głowna
      </Link>
      <div className="relative w-full">
        <h1 className="text-4xl font-bold mt-12 mb-12 px-6 font-gotham text-white">
          Przeglądasz wszystkie kolekcje linków
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 p-6">
        {links.map((item: any, i: any) => (
          <Link
            className={`p-4 ${
              light === true
                ? "bg-white text-zinc-800"
                : "bg-zinc-800 text-white"
            } font-bold text-sm sm:text-base lg:text-lg xl:text-xl font-gotham flex flex-col items-start justify-start`}
            key={i}
            href={`/admin/links/${item.id}`}
          >
            <p className="text-3xl font-bold">{item.name}</p>
            <div className="-ml-6 flex flex-row flex-wrap">
              <p className="ml-6 mt-6">
                <span className="font-light">w trakcie: </span>
                <span className="text-2xl text-white bg-black p-1">
                  {
                    item.data?.filter((link: any) => link.status === "pending")
                      ?.length
                  }
                  {"/"}
                  {item.data?.length}
                </span>
              </p>
              <p className="ml-6 mt-6">
                <span className="font-light">dostarczonych: </span>
                <span className="text-2xl text-green-500">
                  {
                    item.data?.filter(
                      (link: any) =>
                        link.status === "delivered" || link.status === "visited"
                    )?.length
                  }
                </span>
              </p>
              <p className="ml-6 mt-6">
                <span className="font-light">obejrzanych: </span>
                <span className="text-2xl text-purple-500">
                  {
                    item.data?.filter((link: any) => link.status === "visited")
                      ?.length
                  }
                </span>
              </p>
            </div>
          </Link>
        ))}
        {links?.length === 0 && "Brak danych..."}
        <Link
          title="Generuj linki"
          href="/admin/generate-links"
          className="bg-green-500 hover:bg-green-400 text-white font-bold text-sm sm:text-base lg:text-lg xl:text-xl flex items-center justify-center p-3"
        >
          Generuj linki <FaLongArrowAltRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
}
