"use client";
import Image from "next/image";
import ClientFormLogic from "./ClientFormLogic";
import { usePathname } from "next/navigation";
import { IoIosClose } from "react-icons/io";

export default function ClientForm({
  action,
  setAction,
  searchParams,
}: {
  action: string;
  setAction: Function;
  searchParams: any;
}) {
  const pathname = usePathname();
  return (
    <div
      className={`${
        !pathname.includes("invite") &&
        !pathname.includes("admin") &&
        !pathname.includes("recruitment") &&
        !pathname.includes("courses")
          ? "block"
          : "hidden"
      } font-gotham z-[1600] left-0 top-0 fixed w-full h-full ${
        action === "client" ? "translate-x-0" : "-translate-x-[400vw]"
      }`}
    >
      <button
        onClick={() => setAction(undefined)}
        style={{ boxShadow: "0 0 5px 0 white" }}
        className={`fixed z-[9999] border border-black bg-white bg-opacity-80 text-white text-4xl top-5 right-5 p-2 rounded-xl w-10 h-10 flex items-center justify-center ${
          action === "client"
            ? "translate-x-0 duration-[1000ms]"
            : "translate-x-[100vw]"
        }`}
      >
        <IoIosClose className="w-10 h-10 text-black" />{" "}
      </button>
      <div
        onClick={() => setAction(undefined)}
        className={`w-full h-full bg-black duration-500 ${
          action === "client" ? "bg-opacity-80" : "bg-opacity-0"
        }`}
      >
        <div
          onClick={(e: any) => e.stopPropagation()}
          className={`${
            action === "client"
              ? "fixed -translate-y-0"
              : "-translate-y-[100vh]"
          } duration-500 delay-500 left-1/2 -translate-x-1/2 top-0 w-[85vw] lg:max-w-[70vw] xl:max-w-[60vw] h-[80vh] bg-white overflow-y-scroll max-h-[80vh] rounded-b-3xl overflow-x-hidden`}
        >
          <div className="bg-gradient-to-br from-[#C5FF17] to-[#33E5CF] p-6 flex flex-col sm:flex-row xl:sticky z-10 top-0 left-0">
            <div className="w-max flex items-center justify-center pr-12">
              <Image
                src="/logo-hexon2.png"
                width={250}
                height={125}
                alt=""
                className="max-w-[150px] lg:max-w-[250px] h-auto"
              />
            </div>
            <div className="lg:px-3 mt-3 lg:mt-0">
              <h2 className="text-2xl text-left xl:text-4xl font-bold text-blue-600 drop-shadow-xl shadow-black italic">
                Wypełnij wniosek o dofinansowanie
              </h2>
              <p className="sm:text-justify mt-3 mx-auto text-gray-600 font-light">
                Dzięki podanym informacjom będziemy mogli dostosować poziom
                dofinansowania, który najlepiej odpowiada Twoim potrzebom.
              </p>
            </div>
          </div>
          <div className="w-full text-zinc-800">
            <ClientFormLogic searchParams={searchParams} />
          </div>
        </div>
      </div>
    </div>
  );
}
