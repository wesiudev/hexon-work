"use client";

import { setModalVisible } from "@/common/redux/slices/actionSlice";
import Image from "next/image";
import { useDispatch } from "react-redux";

export default function SecondCta({ style }: { style?: string }) {
  const dispatch = useDispatch();
  function setModalVisibility(action: string) {
    dispatch(setModalVisible(action));
  }
  return (
    <>
      {!style && (
        <button
          onClick={() => setModalVisibility("energy")}
          className="w-[300px] h-[150px] relative z-[15000]"
        >
          <h2 className="z-10 border-2 border-green-500 text-xl font-bold absolute top-0 left-0 w-full h-full bg-black rounded-2xl bg-opacity-50 flex items-center justify-center">
            ZŁÓŻ WNIOSEK O TAŃSZY PRĄD DLA TWOJEJ FIRMY
          </h2>
          <Image
            src="/prad.jpg"
            width={300}
            height={300}
            alt="Tańszy prąd formularz"
            className="absolute inset-0 object-cover w-full h-full group-hover:scale-110 duration-500 rounded-2xl"
          />
        </button>
      )}
      {style === "home" && (
        <button
          onClick={() => setModalVisibility("energy")}
          className="relative z-[15000] mt-6"
        >
          <h2 className="py-3 px-5 w-max text-base bg-gradient-to-br from-[#C5FF17] to-[#33E5CF] hover:scale-110 duration-200 ease-in-out text-zinc-800 rounded-lg cursor-pointer font-bold">
            ZŁÓŻ WNIOSEK
          </h2>
        </button>
      )}
    </>
  );
}
