"use client";
import { app, updateMessage } from "@/common/firebase";
import moment from "moment";
import { useEffect, useState } from "react";
import { collection, onSnapshot, getFirestore } from "firebase/firestore";
import "moment/locale/pl";
import Link from "next/link";
import { FaClock, FaLongArrowAltLeft } from "react-icons/fa";

export default function Leads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    const ref = collection(getFirestore(app), "messages");
    const unsub = onSnapshot(ref, (querySnapshot: any) => {
      const snapshotData: any[] = [];
      querySnapshot.forEach((doc: any) => {
        snapshotData.push(doc.data());
      });
      setLeads(
        snapshotData.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
      );
    });
    const ref2 = collection(getFirestore(app), "sessions");
    const unsub2 = onSnapshot(ref2, (querySnapshot: any) => {
      const snapshotData: any[] = [];
      querySnapshot.forEach((doc: any) => {
        snapshotData.push(doc.data());
      });
      setSessions(
        snapshotData.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
      );
    });
    return () => {
      unsub();
      unsub2();
    };
  }, []);
  moment.locale("pl");
  const sum = sessions.reduce(
    (accumulator, current) => accumulator + current.timeSpent,
    0
  );
  function formatTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <div className="bg-gray-600 h-max w-full font-sans">
      <Link
        href="/admin/leads"
        className="bg-black py-3 px-6 text-white font-bold text-lg flex items-center"
      >
        <FaLongArrowAltLeft className="mr-2 text-xl" />
        Powrót
      </Link>
      <div className="flex flex-row items-center px-6 text-sm sm:text-base font-bold font-gotham text-white drop-shadow-xl shadow-black">
        Czas oglądania filmu wdrożeniowego:{" "}
        <span className="text-green-500 p-3">{formatTime(sum)}</span>
      </div>
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
                className={`bg-zinc-800 p-3 h-max border-[3px] ${
                  lead.status === undefined && "border-zinc-800"
                } ${lead.status === "rejected" && "border-red-500"} ${
                  lead?.status === "accepted" && "border-yellow-400"
                }`}
              >
                <div className="flex w-full justify-between items-center">
                  <p>{moment(lead.createdAt).format("DD-MM-YYYY")}</p>
                  <p className="flex flex-row items-center">
                    <FaClock className="mr-2 h-4 w-4" />
                    {moment(lead.createdAt).fromNow()}
                  </p>
                </div>
                <div className="bg-white text-zinc-800 drop-shadow-xl shadow-black mt-3">
                  <div className="flex flex-row w-full items-center justify-between">
                    <h2 className="font-bold text-xl p-3">{lead.name}</h2>
                    <div className="flex items-center px-3">
                      <FaClock className="mr-1 w-5 h-5" />{" "}
                      {lead?.timeSpent > 0 && (
                        <div className="text-xl font-bold font-gotham">
                          {formatTime(lead?.timeSpent)}
                        </div>
                      )}
                      {(!lead?.timeSpent || lead?.timeSpent === 0) && (
                        <div className="text-gray-400 text-xl font-bold font-gotham">
                          ??:??:??
                        </div>
                      )}
                    </div>
                  </div>
                  {!lead.message && (
                    <h3 className="p-3 bg-gray-300">Nic nie powiedział</h3>
                  )}
                  {lead.message !== "" && (
                    <h3 className="p-3 bg-gray-300">{lead.message}</h3>
                  )}
                  <div className="flex flex-col p-3">
                    <div>{lead.phone}</div>
                    <div>{lead.email}</div>
                  </div>
                </div>
                <div className="flex flex-col w-full mt-3">
                  {lead.isFinished && (
                    <button
                      onClick={() =>
                        updateMessage(lead.id, {
                          ...lead,
                          isFinished: false,
                        })
                      }
                      className="w-full text-center bg-green-500 text-white py-2  font-light text-base"
                    >
                      Odznacz
                    </button>
                  )}
                  {lead.isFinished && (
                    <div className="grid grid-cols-2">
                      <button
                        onClick={() =>
                          updateMessage(lead.id, {
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
                          updateMessage(lead.id, {
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
                  {!lead.isFinished && (
                    <button
                      onClick={() =>
                        updateMessage(lead.id, {
                          ...lead,
                          isFinished: true,
                        })
                      }
                      className="w-full text-center bg-green-500 text-white py-2 font-light text-base"
                    >
                      Oznacz jako sprawdzone
                    </button>
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
                className={`bg-zinc-800 p-3 h-max border-[3px] ${
                  lead.status === undefined && "border-zinc-800"
                } ${lead.status === "rejected" && "border-red-500"} ${
                  lead?.status === "accepted" && "border-yellow-400"
                }`}
              >
                <div className="flex w-full justify-between items-center">
                  <p>{moment(lead.createdAt).format("DD-MM-YYYY")}</p>
                  <p className="flex flex-row items-center">
                    <FaClock className="mr-2 h-4 w-4" />
                    {moment(lead.createdAt).fromNow()}
                  </p>
                </div>
                <div className="bg-white text-zinc-800 drop-shadow-xl shadow-black mt-3">
                  <div className="flex flex-row w-full items-center justify-between">
                    <h2 className="font-bold text-xl p-3">{lead.name}</h2>
                    <div className="flex items-center px-3">
                      <FaClock className="mr-1 w-5 h-5" />{" "}
                      {lead?.timeSpent > 0 && (
                        <div className="text-xl font-bold font-gotham">
                          {formatTime(lead?.timeSpent)}
                        </div>
                      )}
                      {(!lead?.timeSpent || lead?.timeSpent === 0) && (
                        <div className="text-gray-400 text-xl font-bold font-gotham">
                          ??:??:??
                        </div>
                      )}
                    </div>
                  </div>
                  {!lead.message && (
                    <h3 className="p-3 bg-gray-300">Nic nie powiedział</h3>
                  )}
                  {lead.message !== "" && (
                    <h3 className="p-3 bg-gray-300">{lead.message}</h3>
                  )}
                  <div className="flex flex-col p-3">
                    <div>{lead.phone}</div>
                    <div>{lead.email}</div>
                  </div>
                </div>
                <div className="flex flex-col w-full mt-3">
                  {lead.isFinished && (
                    <button
                      onClick={() =>
                        updateMessage(lead.id, {
                          ...lead,
                          isFinished: false,
                        })
                      }
                      className="w-full text-center bg-green-500 text-white py-2  font-light text-base"
                    >
                      Odznacz
                    </button>
                  )}
                  {lead.isFinished && (
                    <div className="grid grid-cols-2">
                      <button
                        onClick={() =>
                          updateMessage(lead.id, {
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
                          updateMessage(lead.id, {
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
                  {!lead.isFinished && (
                    <button
                      onClick={() =>
                        updateMessage(lead.id, {
                          ...lead,
                          isFinished: true,
                        })
                      }
                      className="w-full text-center bg-green-500 text-white py-2 font-light text-base"
                    >
                      Oznacz jako sprawdzone
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        ))}
        {leads.map((lead: any, i: any) => (
          <>
            {filter === "old" && lead.isFinished && (
              <div
                key={lead.id}
                className={`bg-zinc-800 p-3 h-max border-[3px] ${
                  lead.status === undefined && "border-zinc-800"
                } ${lead.status === "rejected" && "border-red-500"} ${
                  lead?.status === "accepted" && "border-yellow-400"
                }`}
              >
                <div className="flex w-full justify-between items-center">
                  <p>{moment(lead.createdAt).format("DD-MM-YYYY")}</p>
                  <p className="flex flex-row items-center">
                    <FaClock className="mr-2 h-4 w-4" />
                    {moment(lead.createdAt).fromNow()}
                  </p>
                </div>
                <div className="bg-white text-zinc-800 drop-shadow-xl shadow-black mt-3">
                  <div className="flex flex-row w-full items-center justify-between">
                    <h2 className="font-bold text-xl p-3">{lead.name}</h2>
                    <div className="flex items-center px-3">
                      <FaClock className="mr-1 w-5 h-5" />{" "}
                      {lead?.timeSpent > 0 && (
                        <div className="text-xl font-bold font-gotham">
                          {formatTime(lead?.timeSpent)}
                        </div>
                      )}
                      {(!lead?.timeSpent || lead?.timeSpent === 0) && (
                        <div className="text-gray-400 text-xl font-bold font-gotham">
                          ??:??:??
                        </div>
                      )}
                    </div>
                  </div>
                  {!lead.message && (
                    <h3 className="p-3 bg-gray-300">Nic nie powiedział</h3>
                  )}
                  {lead.message !== "" && (
                    <h3 className="p-3 bg-gray-300">{lead.message}</h3>
                  )}
                  <div className="flex flex-col p-3">
                    <div>{lead.phone}</div>
                    <div>{lead.email}</div>
                  </div>
                </div>
                <div className="flex flex-col w-full mt-3">
                  {lead.isFinished && (
                    <button
                      onClick={() =>
                        updateMessage(lead.id, {
                          ...lead,
                          isFinished: false,
                        })
                      }
                      className="w-full text-center bg-green-500 text-white py-2  font-light text-base"
                    >
                      Odznacz
                    </button>
                  )}
                  {lead.isFinished && (
                    <div className="grid grid-cols-2">
                      <button
                        onClick={() =>
                          updateMessage(lead.id, {
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
                          updateMessage(lead.id, {
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
                  {!lead.isFinished && (
                    <button
                      onClick={() =>
                        updateMessage(lead.id, {
                          ...lead,
                          isFinished: true,
                        })
                      }
                      className="w-full text-center bg-green-500 text-white py-2  font-light text-base"
                    >
                      Oznacz jako sprawdzone
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
