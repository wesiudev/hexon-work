"use client";
import { app, updateLead } from "@/common/firebase";
import moment from "moment";
import { useEffect, useState } from "react";
import { collection, onSnapshot, getFirestore } from "firebase/firestore";
import "moment/locale/pl";
import Link from "next/link";
import { FaClock } from "react-icons/fa";

export default function Leads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    const ref = collection(getFirestore(app), "leads");
    const unsub = onSnapshot(ref, (querySnapshot: any) => {
      const snapshotData: any[] = [];
      querySnapshot.forEach((doc: any) => {
        snapshotData.push(doc.data());
      });
      setLeads(snapshotData);
    });
  }, []);
  moment.locale("pl");
  return (
    <div className="bg-gray-600 h-max w-full">
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
              <div key={lead.id} className="bg-zinc-800 p-3 h-max">
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
                      <td>{lead.ownership.toString()}</td>
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
                  </tbody>
                </table>
                <div className="flex flex-col w-full mt-3">
                  <button
                    onClick={() =>
                      updateLead(lead.id, { ...lead, isFinished: true })
                    }
                    className="w-full text-center bg-green-500 text-white py-2  font-light text-base"
                  >
                    Oznacz jako sprawdzone
                  </button>
                  <Link
                    className="w-full text-center bg-blue-500 text-white py-2 font-light text-base mt-2"
                    href={`tel:${lead.phone}`}
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
              <div key={lead.id} className="bg-zinc-800 p-3 h-max">
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
                      <td>{lead.ownership.toString()}</td>
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
                  </tbody>
                </table>
                <div className="flex flex-col w-full mt-3">
                  {lead.isFinished && (
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
                  <Link
                    className="w-full text-center bg-blue-500 text-white py-2 font-light text-base mt-2"
                    href={`tel:${lead.phone}`}
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
              <div key={lead.id} className="bg-zinc-800 p-3 h-max">
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
                      <td>{lead.ownership.toString()}</td>
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
                  </tbody>
                </table>
                <div className="flex flex-col w-full mt-3">
                  {lead.isFinished && (
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
                  <Link
                    className="w-full text-center bg-blue-500 text-white py-2 font-light text-base mt-2"
                    href={`tel:${lead.phone}`}
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
