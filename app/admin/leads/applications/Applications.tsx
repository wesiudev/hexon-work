"use client";
import { app, updateApplication } from "@/common/firebase";
import moment from "moment";
import { useEffect, useState } from "react";
import { collection, onSnapshot, getFirestore } from "firebase/firestore";
import "moment/locale/pl";
import Link from "next/link";
import { FaClock, FaLongArrowAltLeft } from "react-icons/fa";
import Confetti from "react-confetti";
import { ReactSketchCanvas } from "react-sketch-canvas";
import Image from "next/image";
import LeadApplication from "@/components/LeadApplication";
export default function Leads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [isSigning, setIsSigning] = useState(false);
  const [signingLead, setSigningLead] = useState<any>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [noteOpen, setNoteOpen] = useState<any>();
  const [filter, setFilter] = useState("new");
  useEffect(() => {
    const ref = collection(getFirestore(app), "employees");
    const unsub = onSnapshot(ref, (querySnapshot: any) => {
      const snapshotData: any[] = [];
      querySnapshot.forEach((doc: any) => {
        snapshotData.push(doc.data());
      });
      setLeads(
        snapshotData.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
      );
    });
    return () => {
      unsub();
    };
  }, []);
  moment.locale("pl");
  return (
    <>
      <div className="bg-gray-600 h-max w-full font-sans">
        <Link
          href="/admin/leads"
          className="bg-black py-3 px-6 text-white font-bold text-lg flex items-center"
        >
          <FaLongArrowAltLeft className="mr-2 text-xl" />
          Powrót
        </Link>
        <div className="font-gotham font-light grid grid-cols-2 sm:grid-cols-3 gap-2 p-6 !text-white">
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
          </button>{" "}
          <button
            onClick={() => setFilter("signed")}
            className={`bg-black p-1 border-2 border-transparent border-dashed ${
              filter === "signed" && "border-white"
            }`}
          >
            Podpisane
          </button>{" "}
          <button
            onClick={() => setFilter("trashcan")}
            className={`bg-black p-1 border-2 border-transparent border-dashed ${
              filter === "trashcan" && "border-white"
            }`}
          >
            🚽
          </button>
        </div>
        <div className="px-6 py-3 grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 font-sans gap-6 min-h-screen text-white">
          {leads.map((lead: any, i: any) => (
            <>
              {filter === "new" && !lead.signed && lead.status !== "trash" && (
                <LeadApplication
                  key={i}
                  lead={lead}
                  setSigningLead={setSigningLead}
                  setNoteOpen={setNoteOpen}
                  setIsSigning={setIsSigning}
                  setIsAnimating={setIsAnimating}
                  isAnimating={isAnimating}
                  filter={filter}
                />
              )}
            </>
          ))}
          {leads.map((lead: any, i: any) => (
            <>
              {filter === "trashcan" &&
                lead.isTrash &&
                lead.status === "trash" && (
                  <LeadApplication
                    key={i}
                    lead={lead}
                    setSigningLead={setSigningLead}
                    setNoteOpen={setNoteOpen}
                    setIsSigning={setIsSigning}
                    setIsAnimating={setIsAnimating}
                    isAnimating={isAnimating}
                    filter={filter}
                  />
                )}
            </>
          ))}
          {leads.map((lead: any, i: any) => (
            <>
              {filter === "old" &&
                lead.isFinished &&
                lead.status !== "rejected" &&
                !lead.signed &&
                lead.status !== "trash" && (
                  <LeadApplication
                    key={i}
                    lead={lead}
                    setSigningLead={setSigningLead}
                    setNoteOpen={setNoteOpen}
                    setIsSigning={setIsSigning}
                    setIsAnimating={setIsAnimating}
                    isAnimating={isAnimating}
                    filter={filter}
                  />
                )}
            </>
          ))}
          {leads.map((lead: any, i: any) => (
            <>
              {filter === "signed" &&
                lead.isFinished &&
                lead.status === "accepted" &&
                lead.signed &&
                lead.status !== "trash" && (
                  <LeadApplication
                    key={i}
                    lead={lead}
                    setSigningLead={setSigningLead}
                    setNoteOpen={setNoteOpen}
                    setIsSigning={setIsSigning}
                    setIsAnimating={setIsAnimating}
                    isAnimating={isAnimating}
                    filter={filter}
                  />
                )}
            </>
          ))}
        </div>
      </div>
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
                updateApplication(noteOpen.id, {
                  ...noteOpen,
                  note: noteOpen.note,
                });
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
                updateApplication(signingLead.id, {
                  ...signingLead,
                  signed: true,
                });
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
      )}{" "}
      {isAnimating && (
        <div className="fixed w-full h-full top-0 -left-1/2 translate-x-1/2 z-[100]">
          <Confetti width={1920} height={1019} />
        </div>
      )}
      {isAnimating && (
        <div className="fixed w-full h-full top-0 -left-1/2 translate-x-1/2 z-[100]">
          <Confetti width={1920} height={1019} />
        </div>
      )}{" "}
      <Image
        src="/toilet3.gif"
        width={200}
        height={200}
        alt=""
        className={`opacity-0 w-1/2 fixed -left-[1000px]`}
      />
      <Image
        src="/dolar.gif"
        width={200}
        height={200}
        alt=""
        className={`opacity-0 w-1/2 fixed -left-[1000px]`}
      />
    </>
  );
}
