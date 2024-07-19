import { updateApplication } from "@/common/firebase";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import ToiLeadApplication from "./ToiLeadApplication";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoDiamondOutline } from "react-icons/io5";

export default function LeadApplication({
  lead,
  filter,
  setIsAnimating,
  isAnimating,
  setIsSigning,
  setSigningLead,
  setNoteOpen,
}: {
  lead: any;
  filter: string;
  setIsAnimating: any;
  isAnimating: boolean;
  setIsSigning: any;
  setSigningLead: any;
  setNoteOpen: any;
}) {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animationCheck, setAnimationCheck] = useState(false);

  const [trashLead, setTrashLead] = useState<any>();
  function getToiletOption() {
    const options = ["🚽", "🤮", "💩", "🤢"];
    return options[Math.floor(Math.random() * options.length)];
  }
  return (
    <div
      key={lead.id}
      className={`rounded relative bg-zinc-800 p-3 h-max border-[3px] overflow-hidden ${
        lead.status === "trash" && "border-orange-700"
      } ${lead.status === "reseted" && "border-white"} ${
        lead.status === "accepted" && "border-green-500"
      } ${lead.status === undefined && "border-zinc-800"} ${
        lead.status === "rejected" && "border-red-500"
      } ${lead?.status === "accepted" && "border-yellow-400"}`}
    >
      {lead.status === "trash" && (
        <div className="w-full h-full absolute left-0 top-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-9xl">
          🚽
        </div>
      )}
      {trashLead && (
        <div className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-[9999] flex items-center justify-center">
          <div className="w-max h-max relative">
            <div
              className={`absolute left-1/2 top-1/2 duration-[5000ms] ${
                animationStarted
                  ? "scale-0 rotate-[4000deg] -translate-x-[75%] -translate-y-[55%]"
                  : "scale-100 -translate-x-1/2 -translate-y-1/2"
              }`}
            >
              <ToiLeadApplication
                lead={lead}
                setAnimationStarted={setAnimationStarted}
                setAnimationCheck={setAnimationCheck}
                animationStarted={animationStarted}
                setOptionsOpen={setOptionsOpen}
                setTrashLead={setTrashLead}
              />
            </div>
            {animationStarted && (
              <Image
                width={400}
                height={400}
                src={"/toilet3.gif"}
                alt=""
                className={`${
                  animationCheck ? "opacity-0" : "opacity-100"
                } ease-in-out duration-500 w-[375px]`}
              />
            )}
            {trashLead && animationCheck && (
              <div className="fixed flex items-center justify-center w-full h-full left-0 top-0 bg-black bg-opacity-50">
                <FaCheckCircle className="h-[250px] w-[250px] text-green-500 drop-shadow-xl shadow-black" />
              </div>
            )}
          </div>
        </div>
      )}
      {optionsOpen && (
        <div className="w-full h-full absolute left-0 top-0 bg-black bg-opacity-50" />
      )}

      {lead.signed && (
        <div
          onClick={() => {
            setIsAnimating(true);
            setTimeout(() => {
              setIsAnimating(false);
            }, 7750);
          }}
          className="rounded cursor-pointer absolute w-full h-full z-50 bg-black left-0 top-0 bg-opacity-80 flex items-center justify-center"
        >
          <Image
            src="/dolar.gif"
            width={200}
            height={200}
            alt=""
            className={`w-1/2 ${isAnimating && "animate-bounce"}`}
          />
        </div>
      )}
      <div className="flex w-full justify-between items-center">
        <div className="flex space-x-2">
          <p>{moment(lead.createdAt).format("DD-MM-YYYY")}</p>
          <p className="text-blue-500 font-light font-gotham italic">
            {moment(lead.createdAt).fromNow()}
          </p>
        </div>
        <button
          onClick={() => setOptionsOpen(!optionsOpen)}
          className="text-3xl text-white h-full px-2 hover:bg-white hover:bg-opacity-20 rounded relative z-50"
        >
          <HiOutlineDotsHorizontal />
        </button>
        <div
          className={`z-50 absolute top-14 right-14 w-max h-max py-6 bg-zinc-800 flex flex-col items-start space-y-1 duration-200 ease-in-out ${
            !optionsOpen ? "-translate-y-[300px]" : "-translate-y-0"
          }`}
        >
          <button
            onClick={() => {
              setOptionsOpen(false);
              setTrashLead(lead);
            }}
            className="w-full px-4 py-1 text-white bg-white bg-opacity-0 duration-150 hover:bg-opacity-20"
          >
            Kibel {getToiletOption()}
          </button>
          <button
            onClick={() =>
              updateApplication(lead.id, {
                ...lead,
                isFinished: false,
                isTrash: false,
                signed: false,
                status: "reseted",
              }).then(() => setOptionsOpen(false))
            }
            className="w-full px-4 py-1 text-white bg-white bg-opacity-0 duration-150 hover:bg-opacity-20"
          >
            Resetuj
          </button>
        </div>
      </div>

      <table className="w-full mt-3">
        <tbody>
          <tr className="bg-gray-700">
            <td>Email:</td>
            <td>{lead.email}</td>
          </tr>
          <tr className="bg-gray-700">
            <td>Imię i nazwisko:</td>
            <td>{lead.name}</td>
          </tr>
          <tr className="bg-gray-700">
            <td>Tel:</td>
            <td>{lead.phoneNumber}</td>
          </tr>
          <tr className="bg-gray-700">
            <tr className="bg-gray-700">
              <td colSpan={2}>
                <a
                  href={lead.file}
                  download
                  className="text-white underline font-light"
                >
                  Pobierz CV
                </a>
              </td>
            </tr>
          </tr>
        </tbody>
      </table>
      <div className="pt-3 w-full flex flex-row justify-between">
        <div>Notatka:</div>
        <button
          onClick={() => setNoteOpen(lead)}
          className="text-blue-500 font-light rounded p-0.5 px-2 hover:bg-white hover:bg-opacity-20"
        >
          Edytuj
        </button>
      </div>
      {lead?.note !== undefined && (
        <p className="text-white font-light">{lead?.note}</p>
      )}
      <div className="flex flex-col w-full mt-3">
        {!lead.isFinished && (
          <button
            onClick={() =>
              updateApplication(lead.id, {
                ...lead,
                isFinished: true,
              })
            }
            className="w-full text-center bg-green-500 text-white py-2 hover:bg-green-400 font-light text-base rounded"
          >
            Oznacz jako sprawdzone
          </button>
        )}
        {lead.isFinished && (!lead?.status || lead.status === "reseted") && (
          <div className="grid grid-cols-2 mt-2 gap-2">
            <button
              onClick={() =>
                updateApplication(lead.id, {
                  ...lead,
                  status: "rejected",
                })
              }
              className="bg-gray-500 hover:bg-gray-400 p-3 rounded"
            >
              Odrzuć
            </button>
            <button
              onClick={() =>
                updateApplication(lead.id, {
                  ...lead,
                  status: "accepted",
                })
              }
              className="bg-green-500 hover:bg-green-400 p-3 rounded"
            >
              Akceptuj
            </button>
          </div>
        )}
        {lead?.status === "accepted" && !lead.signed && (
          <button
            onClick={() => {
              setIsSigning(true);
              setSigningLead(lead);
            }}
            className="w-full text-center bg-gradient-to-br from-yellow-800 via-yellow-400 to-yellow-800 hover:from-yellow-600 hover:via-yellow-400 hover:to-yellow-600 font-bold text-white py-2 text-base mt-2 rounded relative group"
          >
            <span className="drop-shadow-xl shadow-black">Podpisz</span>{" "}
            <IoDiamondOutline className="group-hover:scale-150 duration-500 absolute right-3 top-1/2 -translate-y-1/2 text-white ml-2 text-2xl" />
          </button>
        )}
        {lead.isFinished && !lead?.status && (
          <Link
            className="w-full text-center bg-blue-500 text-white py-2 font-light text-base mt-2 rounded"
            href={`tel:${lead.phone}`}
          >
            Zadzwoń
          </Link>
        )}
      </div>
    </div>
  );
}
