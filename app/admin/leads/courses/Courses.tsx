"use client";
import { app, updateCourse } from "@/common/firebase";
import moment from "moment";
import { useEffect, useState } from "react";
import { collection, onSnapshot, getFirestore } from "firebase/firestore";
import "moment/locale/pl";
import Link from "next/link";
import { FaClock, FaLongArrowAltLeft } from "react-icons/fa";

export default function Courses() {
  const [leads, setLeads] = useState<any[]>([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    const ref = collection(getFirestore(app), "courses");
    const unsub = onSnapshot(ref, (querySnapshot: any) => {
      const snapshotData: any[] = [];
      querySnapshot.forEach((doc: any) => {
        snapshotData.push(doc.data());
      });
      setLeads(snapshotData);
    });
    return () => {
      unsub();
    };
  }, []);
  moment.locale("pl");
  return (
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
                  </tbody>
                </table>
                <div className="flex flex-col w-full mt-3">
                  {lead.isFinished && (
                    <button
                      onClick={() =>
                        updateCourse(lead.id, {
                          ...lead,
                          isFinished: false,
                        })
                      }
                      className="w-full text-center bg-green-500 text-white py-2  font-light text-base"
                    >
                      Odznacz
                    </button>
                  )}
                  {!lead.isFinished && (
                    <button
                      onClick={() =>
                        updateCourse(lead.id, {
                          ...lead,
                          isFinished: true,
                        })
                      }
                      className="w-full text-center bg-green-500 text-white py-2 font-light text-base"
                    >
                      Oznacz jako sprawdzone
                    </button>
                  )}
                  {lead.isFinished && (
                    <div className="grid grid-cols-2">
                      <button
                        onClick={() =>
                          updateCourse(lead.id, { ...lead, status: "rejected" })
                        }
                        className="bg-gray-500 hover:bg-gray-400 duration-200 p-3"
                      >
                        Odrzuć
                      </button>
                      <button
                        onClick={() =>
                          updateCourse(lead.id, { ...lead, status: "accepted" })
                        }
                        className="bg-green-500 hover:bg-green-400 duration-200 p-3"
                      >
                        Akceptuj
                      </button>
                    </div>
                  )}
                  <Link
                    className="w-full text-center bg-blue-500 text-white py-2 font-light text-base mt-2"
                    href={`tel:${lead.phoneNumber}`}
                  >
                    Zadzwoń
                  </Link>
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
                <table className="w-full mt-3">
                  <tbody>
                    {" "}
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
                  </tbody>
                </table>
                <div className="flex flex-col w-full mt-3">
                  {lead.isFinished && (
                    <button
                      onClick={() =>
                        updateCourse(lead.id, {
                          ...lead,
                          isFinished: false,
                        })
                      }
                      className="w-full text-center bg-green-500 text-white py-2  font-light text-base"
                    >
                      Odznacz
                    </button>
                  )}
                  {!lead.isFinished && (
                    <button
                      onClick={() =>
                        updateCourse(lead.id, {
                          ...lead,
                          isFinished: true,
                        })
                      }
                      className="w-full text-center bg-green-500 text-white py-2 font-light text-base"
                    >
                      Oznacz jako sprawdzone
                    </button>
                  )}
                  {lead.isFinished && (
                    <div className="grid grid-cols-2">
                      <button
                        onClick={() =>
                          updateCourse(lead.id, { ...lead, status: "rejected" })
                        }
                        className="bg-gray-500 hover:bg-gray-400 duration-200 p-3"
                      >
                        Odrzuć
                      </button>
                      <button
                        onClick={() =>
                          updateCourse(lead.id, { ...lead, status: "accepted" })
                        }
                        className="bg-green-500 hover:bg-green-400 duration-200 p-3"
                      >
                        Akceptuj
                      </button>
                    </div>
                  )}
                  <Link
                    className="w-full text-center bg-blue-500 text-white py-2 font-light text-base mt-2"
                    href={`tel:${lead.phoneNumber}`}
                  >
                    Zadzwoń
                  </Link>
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
                  </tbody>
                </table>
                <div className="flex flex-col w-full mt-3">
                  {lead.isFinished && (
                    <button
                      onClick={() =>
                        updateCourse(lead.id, {
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
                          updateCourse(lead.id, { ...lead, status: "rejected" })
                        }
                        className="bg-gray-500 hover:bg-gray-400 duration-200 p-3"
                      >
                        Odrzuć
                      </button>
                      <button
                        onClick={() =>
                          updateCourse(lead.id, { ...lead, status: "accepted" })
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
                        updateCourse(lead.id, {
                          ...lead,
                          isFinished: true,
                        })
                      }
                      className="w-full text-center bg-green-500 text-white py-2  font-light text-base"
                    >
                      Oznacz jako sprawdzone
                    </button>
                  )}
                  <Link
                    className="w-full text-center bg-blue-500 text-white py-2 font-light text-base mt-2"
                    href={`tel:${lead.phoneNumber}`}
                  >
                    Zadzwoń
                  </Link>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
