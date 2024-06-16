"use client";
import { app, updateLead } from "@/common/firebase";
import moment from "moment";
import { useEffect, useState } from "react";
import { collection, onSnapshot, getFirestore } from "firebase/firestore";
import "moment/locale/pl";
import Link from "next/link";
import { FaClock, FaLongArrowAltLeft } from "react-icons/fa";
import Image from "next/image";
import Confetti from "react-confetti";
import { ReactSketchCanvas } from "react-sketch-canvas";
export default function Leads() {
  const [isSigning, setIsSigning] = useState(false);
  const [signingLead, setSigningLead] = useState<any>({});
  const [leads, setLeads] = useState<any[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [filter, setFilter] = useState("");
  const [noteOpen, setNoteOpen] = useState<any>();
  useEffect(() => {
    const ref = collection(getFirestore(app), "leads");
    const unsub = onSnapshot(ref, (querySnapshot: any) => {
      const snapshotData: any[] = [];
      querySnapshot.forEach((doc: any) => {
        snapshotData.push(doc.data());
      });
      setLeads(
        snapshotData.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
      );
    });
  }, []);
  moment.locale("pl");
  return (
    <>
      {noteOpen !== undefined && (
        <div
          onClick={() => {
            setNoteOpen(undefined);
          }}
          className="z-[120] fixed left-0 top-0 w-full h-full bg-black bg-opacity-80 flex flex-col items-center justify-center"
        >
          <div
            className="bg-slate-700 border-black border-2 p-6 sm:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <textarea
              onChange={(e) =>
                setNoteOpen({ ...noteOpen, note: e.target.value })
              }
              name="note"
              id="note"
              rows={10}
              autoFocus
              placeholder="Wpisz tekst"
              className="font-bold text-base font-sans p-3 w-full text-zinc-800 drop-shadow-xl shadow-black"
            >
              {noteOpen.note}
            </textarea>
            <button
              onClick={() => {
                updateLead(noteOpen.id, { ...noteOpen, note: noteOpen.note });
                setNoteOpen(undefined);
              }}
              className="w-full bg-green-500 hover:bg-green-400 font-gotham p-3 text-white font-bold"
            >
              Zapisz
            </button>
          </div>
        </div>
      )}
      {isSigning && (
        <div
          onClick={() => {
            setIsSigning(false);
            setSigningLead({});
          }}
          className="z-[120] fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center"
        >
          <div onClick={(e) => e.stopPropagation()} className="w-[300px] h-max">
            <h2 className="text-xl font-bold bg-black w-full font-gotham p-3">
              Podpis (parafka)
            </h2>
            <ReactSketchCanvas
              width="300px"
              height="150px"
              canvasColor="white"
              strokeColor="black"
            />
            <button
              onClick={() => {
                updateLead(signingLead.id, { ...signingLead, signed: true });
                setIsAnimating(true);
                setTimeout(() => {
                  setIsAnimating(false);
                }, 7500);
                setSigningLead({});
                setIsSigning(false);
              }}
              className="w-full text-center bg-green-500 hover:bg-green-400 font-bold text-white py-2 text-base font-gotham"
            >
              Zatwierdź
            </button>
          </div>
        </div>
      )}
      <div className="bg-gray-600 h-max w-full font-sans">
        <Link
          href="/admin/leads"
          className="bg-black py-3 px-6 text-white font-bold text-lg flex items-center"
        >
          <FaLongArrowAltLeft className="mr-2 text-xl" />
          Powrót
        </Link>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-6 !text-white">
          <button
            onClick={() => setFilter("")}
            className={`bg-black p-1 border-2 border-transparent border-dashed ${
              filter === "" && "border-white"
            }`}
          >
            Wszystkie
          </button>
          <button
            onClick={() => setFilter("new")}
            className={`bg-black p-1 border-2 border-transparent border-dashed ${
              filter === "new" && "border-white"
            }`}
          >
            Nowe
          </button>
          <button
            onClick={() => setFilter("old")}
            className={`bg-black p-1 border-2 border-transparent border-dashed ${
              filter === "old" && "border-white"
            }`}
          >
            Sprawdzone
          </button>
        </div>
        <div className="px-6 py-3 grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 font-sans gap-6 min-h-screen text-white">
          {leads.map((lead: any, i: any) => (
            <>
              {!lead.isFinished && filter === "new" && (
                <div
                  key={lead.id}
                  className={`relative bg-zinc-800 p-3 h-max border-[3px] ${
                    lead.status === undefined && "border-zinc-800"
                  } ${lead.status === "rejected" && "border-red-500"} ${
                    lead?.status === "accepted" && "border-yellow-400"
                  }`}
                >
                  {lead.signed && (
                    <div
                      onClick={() => {
                        setIsAnimating(true);
                        setTimeout(() => {
                          setIsAnimating(false);
                        }, 7500);
                      }}
                      className="cursor-pointer absolute w-full h-full z-50 bg-black left-0 top-0 bg-opacity-80 flex items-center justify-center "
                    >
                      <Image
                        src="/dolar.gif"
                        width={400}
                        height={400}
                        alt=""
                        className={`w-1/2 ${isAnimating && "animate-bounce"}`}
                      />
                    </div>
                  )}
                  <div className="flex w-full justify-between items-center">
                    <p>{moment(lead.createdAt).format("DD-MM-YYYY")}</p>
                    <p className="flex flex-row items-center">
                      <FaClock className="mr-2 h-4 w-4" />
                      {moment(lead.createdAt).fromNow()}
                    </p>
                  </div>
                  <table className="w-full mt-3">
                    <tbody>
                      <tr className="bg-gray-700">
                        <td>Komornik:</td>
                        <td>{lead.debtStatus}</td>
                      </tr>
                      <tr className="bg-gray-600">
                        <td>Źródło ciepła:</td>
                        <td>{lead.heatingSource}</td>
                      </tr>
                      <tr className="bg-gray-700">
                        <td>Hektary:</td>
                        <td>{lead.hectareCount}</td>
                      </tr>
                      <tr className="bg-gray-600">
                        <td>Więcej niż 10 lat:</td>
                        <td>{lead.houseAge}</td>
                      </tr>
                      <tr className="bg-gray-700">
                        <td>Rodzaj budynku:</td>
                        <td>{lead.houseType}</td>
                      </tr>
                      <tr className="bg-gray-600">
                        <td>Dochody:</td>
                        <td>{lead.incomeLevel}</td>
                      </tr>
                      <tr className="bg-gray-700">
                        <td>Właściciel KW:</td>
                        <td>{lead.ownership === true ? "Tak" : "Nie"}</td>
                      </tr>
                      <tr className="bg-gray-600">
                        <td>Numer Telefonu:</td>
                        <td>
                          {lead.phone} {lead.name}
                        </td>
                      </tr>
                      <tr className="bg-gray-700">
                        <td>Uczestnicy gospodarstwa:</td>
                        <td>{lead.visitors}</td>
                      </tr>
                      <tr className="bg-gray-600">
                        <td>Region:</td>
                        <td>{lead?.region ? lead.region : "Nie podano"}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="pt-3 w-full flex flex-row justify-between">
                    <div>Notatka:</div>
                    <button
                      onClick={() => setNoteOpen(lead)}
                      className="text-blue-500 font-light"
                    >
                      Edytuj
                    </button>
                  </div>
                  {lead?.note !== undefined && (
                    <p className="text-white font-light">{lead?.note}</p>
                  )}
                  <div className="flex flex-col w-full mt-3">
                    <button
                      onClick={() =>
                        updateLead(lead.id, { ...lead, isFinished: true })
                      }
                      className="w-full text-center bg-green-500 text-white py-2  font-light text-base"
                    >
                      Oznacz jako sprawdzone
                    </button>
                    {lead.isFinished && (
                      <div className="grid grid-cols-2 mt-2">
                        <button
                          onClick={() =>
                            updateLead(lead.id, { ...lead, status: "rejected" })
                          }
                          className="bg-gray-500 hover:bg-gray-400 duration-200 p-3"
                        >
                          Odrzuć
                        </button>
                        <button
                          onClick={() =>
                            updateLead(lead.id, { ...lead, status: "accepted" })
                          }
                          className="bg-green-500 hover:bg-green-400 duration-200 p-3"
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
                        className="w-full text-center bg-yellow-400 font-bold text-white py-2 text-base mt-2"
                      >
                        Podpisz
                      </button>
                    )}

                    {lead.isFinished && !lead?.status && (
                      <Link
                        className="w-full text-center bg-blue-500 text-white py-2 font-light text-base mt-2"
                        href={`tel:${lead.phone}`}
                      >
                        Zadzwoń
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </>
          ))}
          {leads.map((lead: any, i: any) => (
            <>
              {filter === "" && (
                <div
                  key={lead.id}
                  className={`relative bg-zinc-800 p-3 h-max border-[3px] ${
                    lead.status === undefined && "border-zinc-800"
                  } ${lead.status === "rejected" && "border-red-500"} ${
                    lead?.status === "accepted" && "border-yellow-400"
                  }`}
                >
                  {lead.signed && (
                    <div
                      onClick={() => {
                        setIsAnimating(true);
                        setTimeout(() => {
                          setIsAnimating(false);
                        }, 7500);
                      }}
                      className="cursor-pointer absolute w-full h-full z-50 bg-black left-0 top-0 bg-opacity-80 flex items-center justify-center "
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
                    <p>{moment(lead.createdAt).format("DD-MM-YYYY")}</p>
                    <p className="flex flex-row items-center">
                      <FaClock className="mr-2 h-4 w-4" />
                      {moment(lead.createdAt).fromNow()}
                    </p>
                  </div>
                  <table className="w-full mt-3">
                    <tbody>
                      <tr className="bg-gray-700">
                        <td>Komornik:</td>
                        <td>{lead.debtStatus}</td>
                      </tr>
                      <tr className="bg-gray-600">
                        <td>Źródło ciepła:</td>
                        <td>{lead.heatingSource}</td>
                      </tr>
                      <tr className="bg-gray-700">
                        <td>Hektary:</td>
                        <td>{lead.hectareCount}</td>
                      </tr>
                      <tr className="bg-gray-600">
                        <td>Więcej niż 10 lat:</td>
                        <td>{lead.houseAge}</td>
                      </tr>
                      <tr className="bg-gray-700">
                        <td>Rodzaj budynku:</td>
                        <td>{lead.houseType}</td>
                      </tr>
                      <tr className="bg-gray-600">
                        <td>Dochody:</td>
                        <td>{lead.incomeLevel}</td>
                      </tr>
                      <tr className="bg-gray-700">
                        <td>Właściciel KW:</td>
                        <td>{lead.ownership === true ? "Tak" : "Nie"}</td>
                      </tr>
                      <tr className="bg-gray-600">
                        <td>Numer Telefonu:</td>
                        <td>
                          {lead.phone} {lead.name}
                        </td>
                      </tr>
                      <tr className="bg-gray-700">
                        <td>Uczestnicy gospodarstwa:</td>
                        <td>{lead.visitors}</td>
                      </tr>
                      <tr className="bg-gray-600">
                        <td>Region:</td>
                        <td>{lead?.region ? lead.region : "Nie podano"}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="pt-3 w-full flex flex-row justify-between">
                    <div>Notatka:</div>
                    <button
                      onClick={() => setNoteOpen(lead)}
                      className="text-blue-500 font-light"
                    >
                      Edytuj
                    </button>
                  </div>
                  {lead?.note !== undefined && (
                    <p className="text-white font-light">{lead?.note}</p>
                  )}
                  <div className="flex flex-col w-full mt-3">
                    {lead.isFinished && !lead?.signed && (
                      <button
                        onClick={() =>
                          updateLead(lead.id, { ...lead, isFinished: false })
                        }
                        className="w-full text-center bg-green-500 text-white py-2  font-light text-base"
                      >
                        Odznacz
                      </button>
                    )}
                    {!lead.isFinished && (
                      <button
                        onClick={() =>
                          updateLead(lead.id, { ...lead, isFinished: true })
                        }
                        className="w-full text-center bg-green-500 text-white py-2 font-light text-base"
                      >
                        Oznacz jako sprawdzone
                      </button>
                    )}
                    {lead.isFinished && !lead?.status && (
                      <div className="grid grid-cols-2 mt-2">
                        <button
                          onClick={() =>
                            updateLead(lead.id, { ...lead, status: "rejected" })
                          }
                          className="bg-gray-500 hover:bg-gray-400 duration-200 p-3"
                        >
                          Odrzuć
                        </button>
                        <button
                          onClick={() =>
                            updateLead(lead.id, { ...lead, status: "accepted" })
                          }
                          className="bg-green-500 hover:bg-green-400 duration-200 p-3"
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
                        className="w-full text-center bg-yellow-400 font-bold text-white py-2 text-base mt-2"
                      >
                        Podpisz
                      </button>
                    )}
                    {lead.isFinished && !lead?.status && (
                      <Link
                        className="w-full text-center bg-blue-500 text-white py-2 font-light text-base mt-2"
                        href={`tel:${lead.phone}`}
                      >
                        Zadzwoń
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </>
          ))}
          {leads.map((lead: any, i: any) => (
            <>
              {filter === "old" &&
                lead.isFinished &&
                lead.status !== "rejected" && (
                  <div
                    key={lead.id}
                    className={`relative bg-zinc-800 p-3 h-max border-[3px] ${
                      lead.status === undefined && "border-zinc-800"
                    } ${lead.status === "rejected" && "border-red-500"} ${
                      lead?.status === "accepted" && "border-yellow-400"
                    }`}
                  >
                    {lead.signed && (
                      <div
                        onClick={() => {
                          setIsAnimating(true);
                          setTimeout(() => {
                            setIsAnimating(false);
                          }, 7500);
                        }}
                        className="cursor-pointer absolute w-full h-full z-50 bg-black left-0 top-0 bg-opacity-80 flex items-center justify-center "
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
                      <p>{moment(lead.createdAt).format("DD-MM-YYYY")}</p>
                      <p className="flex flex-row items-center">
                        <FaClock className="mr-2 h-4 w-4" />
                        {moment(lead.createdAt).fromNow()}
                      </p>
                    </div>
                    <table className="w-full mt-3">
                      <tbody>
                        <tr className="bg-gray-700">
                          <td>Komornik:</td>
                          <td>{lead.debtStatus}</td>
                        </tr>
                        <tr className="bg-gray-600">
                          <td>Źródło ciepła:</td>
                          <td>{lead.heatingSource}</td>
                        </tr>
                        <tr className="bg-gray-700">
                          <td>Hektary:</td>
                          <td>{lead.hectareCount}</td>
                        </tr>
                        <tr className="bg-gray-600">
                          <td>Więcej niż 10 lat:</td>
                          <td>{lead.houseAge}</td>
                        </tr>
                        <tr className="bg-gray-700">
                          <td>Rodzaj budynku:</td>
                          <td>{lead.houseType}</td>
                        </tr>
                        <tr className="bg-gray-600">
                          <td>Dochody:</td>
                          <td>{lead.incomeLevel}</td>
                        </tr>
                        <tr className="bg-gray-700">
                          <td>Właściciel KW:</td>
                          <td>{lead.ownership === true ? "Tak" : "Nie"}</td>
                        </tr>
                        <tr className="bg-gray-600">
                          <td>Numer Telefonu:</td>
                          <td>
                            {lead.phone} {lead.name}
                          </td>
                        </tr>
                        <tr className="bg-gray-700">
                          <td>Uczestnicy gospodarstwa:</td>
                          <td>{lead.visitors}</td>
                        </tr>
                        <tr className="bg-gray-600">
                          <td>Region:</td>
                          <td>{lead?.region ? lead.region : "Nie podano"}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="pt-3 w-full flex flex-row justify-between">
                      <div>Notatka:</div>
                      <button
                        onClick={() => setNoteOpen(lead)}
                        className="text-blue-500 font-light"
                      >
                        Edytuj
                      </button>
                    </div>
                    {lead?.note !== undefined && (
                      <p className="text-white font-light">{lead?.note}</p>
                    )}
                    <div className="flex flex-col w-full mt-3">
                      {lead.isFinished && !lead?.signed && (
                        <button
                          onClick={() =>
                            updateLead(lead.id, { ...lead, isFinished: false })
                          }
                          className="w-full text-center bg-green-500 text-white py-2  font-light text-base"
                        >
                          Odznacz
                        </button>
                      )}
                      {!lead.isFinished && (
                        <button
                          onClick={() =>
                            updateLead(lead.id, { ...lead, isFinished: true })
                          }
                          className="w-full text-center bg-green-500 text-white py-2  font-light text-base"
                        >
                          Oznacz jako sprawdzone
                        </button>
                      )}
                      {lead.isFinished && !lead?.status && (
                        <div className="grid grid-cols-2 mt-2">
                          <button
                            onClick={() =>
                              updateLead(lead.id, {
                                ...lead,
                                status: "rejected",
                              })
                            }
                            className="bg-gray-500 hover:bg-gray-400 duration-200 p-3"
                          >
                            Odrzuć
                          </button>
                          <button
                            onClick={() =>
                              updateLead(lead.id, {
                                ...lead,
                                status: "accepted",
                              })
                            }
                            className="bg-green-500 hover:bg-green-400 duration-200 p-3"
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
                          className="w-full text-center bg-yellow-400 font-bold text-white py-2 text-base mt-2"
                        >
                          Podpisz
                        </button>
                      )}
                      {lead.isFinished && !lead?.status && (
                        <Link
                          className="w-full text-center bg-blue-500 text-white py-2 font-light text-base mt-2"
                          href={`tel:${lead.phone}`}
                        >
                          Zadzwoń
                        </Link>
                      )}
                    </div>
                  </div>
                )}
            </>
          ))}
        </div>
      </div>
      {isAnimating && (
        <div className="fixed w-full h-full top-0 -left-1/2 translate-x-1/2 z-[100]">
          <Confetti width={1920} height={1019} />
        </div>
      )}
      {isAnimating && (
        <div className="fixed w-full h-full top-0 -left-1/2 translate-x-1/2 z-[100]">
          <Confetti width={1920} height={1019} />
        </div>
      )}
    </>
  );
}
