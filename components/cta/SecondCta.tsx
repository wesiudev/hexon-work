"use client";

import { setModalVisible } from "@/common/redux/slices/actionSlice";
import Image from "next/image";
import { useDispatch } from "react-redux";

export default function SecondCta() {
  const dispatch = useDispatch();
  function setModalVisibility(action: string) {
    dispatch(setModalVisible(action));
  }
  return (
    <button
      onClick={() => setModalVisibility("energy")}
      className="w-[300px] h-[150px] relative z-[15000]"
    >
      <div className="z-10 border-2 border-green-500 text-xl font-bold absolute top-0 left-0 w-full h-full bg-black rounded-2xl bg-opacity-50 flex items-center justify-center">
        ZŁÓŻ WNIOSEK O TAŃSZY PRĄD DLA TWOJEJ FIRMY
      </div>

      <Image
        src="/prad.jpg"
        width={300}
        height={300}
        alt="Tańszy prąd formularz"
        className="absolute inset-0 object-cover w-full h-full group-hover:scale-110 duration-500 rounded-2xl"
      />
    </button>
  );
}
