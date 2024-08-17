"use client";
import { auth, deleteLead, updateLead } from "@/common/firebase";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoDiamondOutline } from "react-icons/io5";
import ToiLead from "./ToiLead";
import { FaCheckCircle } from "react-icons/fa";
import { renderMarkdown } from "@/utils/parseMarkdown";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
export default function Lead({
  forceVisibility,
  lead,
  filter,
  setIsAnimating,
  isAnimating,
  setIsSigning,
  setSigningLead,
  setNoteOpen,
  signingLead,
}: {
  forceVisibility?: boolean;
  lead: any;
  filter: string;
  setIsAnimating: any;
  isAnimating: boolean;
  setIsSigning: any;
  setSigningLead: any;
  setNoteOpen: any;
  signingLead: any;
}) {
  const [user, loading] = useAuthState(auth);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>();
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animationCheck, setAnimationCheck] = useState(false);
  const [trashLead, setTrashLead] = useState<any>();
  function getToiletOption() {
    const options = ["🚽", "🤮", "💩", "🤢"];
    return options[Math.floor(Math.random() * options.length)];
  }
  return (
    <>
      {/* SHOW MAIN ADMIN LEAD */}
      {!lead.owner && user?.email === "admin@hexon.work" && (
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
                  <ToiLead
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
          {selectedLead && (
            <div className="w-full h-full absolute left-0 top-0 items-center justify-center p-6 bg-black bg-opacity-80 z-[50]">
              <h2 className="text-2xl mb-4 mt-6">Przypisz leada do:</h2>
              <div className="h-[70%] w-full overflow-y-scroll scrollbar pr-3 py-4 flex flex-col space-y-2">
                <button
                  onClick={() =>
                    updateLead(lead.id, {
                      ...lead,
                      owner: "nikos",
                    }).then(() => {
                      setSelectedLead(null);
                      toast.success("Przypisano pomyślnie!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                      });
                    })
                  }
                  className="font-bold text-white bg-blue-500 hover:bg-blue-400 w-full py-1.5"
                >
                  Nikodem
                </button>
                <button
                  onClick={() =>
                    updateLead(lead.id, {
                      ...lead,
                      owner: "",
                    }).then(() => {
                      setSelectedLead(null);
                      toast.success("Przypisano pomyślnie!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                      });
                    })
                  }
                  className="font-bold text-white bg-green-500 hover:bg-green-400 w-full py-1.5"
                >
                  Adam
                </button>
              </div>
              <div className="w-full flex justify-center bg-white bg-opacity-20 hover:bg-opacity-30 duration-150 p-3 mt-3">
                <button
                  onClick={() => setSelectedLead(null)}
                  className="text-black underline hover:no-underline"
                >
                  Zamknij
                </button>
              </div>
            </div>
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
          {isAnimating && signingLead.id === lead.id && (
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
              className={`z-50 absolute top-14 right-14 w-max h-max p-6 rounded-xl bg-gray-600 flex flex-col items-start space-y-2 duration-500 ease-in-out ${
                !optionsOpen ? "-translate-y-[500px]" : "-translate-y-0"
              }`}
            >
              <button
                onClick={() => {
                  setSelectedLead(lead.id);
                  setOptionsOpen(false);
                }}
                className="w-full py-1 text-white bg-green-500 bg-opacity-100 duration-150 hover:bg-opacity-80 px-12"
              >
                Przypisz
              </button>
              <button
                onClick={() => {
                  setOptionsOpen(false);
                  setTrashLead(lead);
                }}
                className="w-full py-1 text-white bg-white bg-opacity-20 duration-150 hover:bg-opacity-30 px-12"
              >
                Kibel {getToiletOption()}
              </button>
              <button
                onClick={() =>
                  updateLead(lead.id, {
                    ...lead,
                    isFinished: false,
                    isTrash: false,
                    signed: false,
                    status: "reseted",
                  }).then(() => setOptionsOpen(false))
                }
                className="w-full py-1 text-white bg-white bg-opacity-20 duration-150 hover:bg-opacity-30 px-12"
              >
                Resetuj
              </button>
              <div className="h-12"></div>
              <button
                onClick={() => {
                  deleteLead(lead.id).then(() => {
                    toast.success("Usunięto", {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                    });
                    setOptionsOpen(false);
                  });
                }}
                className="my-24 w-full py-1 text-white bg-red-500 duration-150 hover:bg-opacity-80 px-12"
              >
                Usuń z bazy
              </button>
            </div>
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
                <td>Numer KW:</td>
                <td>
                  {lead?.ownerNumber1 &&
                  lead?.ownerNumber2 &&
                  lead?.ownerNumber3 ? (
                    <div className="">
                      {lead?.ownerNumber1} / {lead?.ownerNumber2} /{" "}
                      {lead?.ownerNumber3}
                    </div>
                  ) : (
                    "Nie podano"
                  )}{" "}
                </td>
              </tr>
              <tr className="bg-gray-700">
                <td>Numer Telefonu:</td>
                <td>
                  {lead.phone} {lead.name}
                </td>
              </tr>
              <tr className="bg-gray-600">
                <td>Uczestnicy gospodarstwa:</td>
                <td>{lead.visitors}</td>
              </tr>
              <tr className="bg-gray-700">
                <td>Region:</td>
                <td>{lead?.region ? lead.region : "Nie podano"}</td>
              </tr>
            </tbody>
          </table>
          <div className="pt-3 w-full flex flex-row justify-between">
            <div>Notatka:</div>
            <button
              onClick={() => {
                setNoteOpen(lead);
              }}
              className="text-blue-500 font-light rounded p-0.5 px-2 hover:bg-white hover:bg-opacity-20"
            >
              Edytuj
            </button>
          </div>
          {lead?.note !== undefined && (
            <div dangerouslySetInnerHTML={renderMarkdown(lead.note)} />
          )}

          <div className="flex flex-col w-full mt-3">
            {!lead.isFinished && (
              <button
                onClick={() =>
                  updateLead(lead.id, {
                    ...lead,
                    isFinished: true,
                  })
                }
                className="w-full text-center bg-green-500 text-white py-2 hover:bg-green-400 font-light text-base rounded"
              >
                Oznacz jako sprawdzone
              </button>
            )}
            {lead.isFinished &&
              (!lead?.status || lead.status === "reseted") && (
                <div className="grid grid-cols-2 mt-2 gap-2">
                  <button
                    onClick={() =>
                      updateLead(lead.id, {
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
                      updateLead(lead.id, {
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
      )}
      {/* NIKODEM LEADS */}
      {lead.owner === "nikos" &&
        user?.email === "admin@hexon.work" &&
        forceVisibility && (
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
                    <ToiLead
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
            {selectedLead && (
              <div className="w-full h-full absolute left-0 top-0 items-center justify-center p-6 bg-black bg-opacity-80 z-[50]">
                <h2 className="text-2xl mb-4 mt-6">Przypisz leada do:</h2>
                <div className="h-[70%] w-full overflow-y-scroll scrollbar pr-3 py-4 flex flex-col space-y-2">
                  <button
                    onClick={() =>
                      updateLead(lead.id, {
                        ...lead,
                        owner: "nikos",
                      }).then(() => {
                        setSelectedLead(null);
                        toast.success("Przypisano pomyślnie!", {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                        });
                      })
                    }
                    className="font-bold text-white bg-blue-500 hover:bg-blue-400 w-full py-1.5"
                  >
                    Nikodem
                  </button>
                  <button
                    onClick={() =>
                      updateLead(lead.id, {
                        ...lead,
                        owner: "",
                      }).then(() => {
                        setSelectedLead(null);
                        toast.success("Przypisano pomyślnie!", {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                        });
                      })
                    }
                    className="font-bold text-white bg-green-500 hover:bg-green-400 w-full py-1.5"
                  >
                    Adam
                  </button>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="w-max mx-auto mt-3 text-black underline hover:no-underline"
                >
                  Zamknij
                </button>
              </div>
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
            {isAnimating && signingLead.id === lead.id && (
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
                className={`z-50 absolute top-14 right-14 w-max h-max p-6 rounded-xl bg-gray-600 flex flex-col items-start space-y-2 duration-200 ease-in-out ${
                  !optionsOpen ? "-translate-y-[500px]" : "-translate-y-0"
                }`}
              >
                <button
                  onClick={() => {
                    setSelectedLead(lead.id);
                    setOptionsOpen(false);
                  }}
                  className="w-full py-1 text-white bg-green-500 bg-opacity-100 duration-150 hover:bg-opacity-80 px-12"
                >
                  Przypisz
                </button>
                <button
                  onClick={() => {
                    setOptionsOpen(false);
                    setTrashLead(lead);
                  }}
                  className="w-full px-12 py-1 text-white bg-white bg-opacity-20 duration-150 hover:bg-opacity-30"
                >
                  Kibel {getToiletOption()}
                </button>
                <button
                  onClick={() =>
                    updateLead(lead.id, {
                      ...lead,
                      isFinished: false,
                      isTrash: false,
                      signed: false,
                      status: "reseted",
                    }).then(() => setOptionsOpen(false))
                  }
                  className="w-full px-12 py-1 text-white bg-white bg-opacity-20 duration-150 hover:bg-opacity-30"
                >
                  Resetuj
                </button>
                <div className="h-12"></div>
                <button
                  onClick={() => {
                    deleteLead(lead.id).then(() => {
                      toast.success("Usunięto", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                      });
                      setOptionsOpen(false);
                    });
                  }}
                  className="my-24 w-full px-12 py-1 text-white bg-red-500 duration-150 hover:bg-opacity-80"
                >
                  Usuń z bazy
                </button>
              </div>
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
                  <td>Numer KW:</td>
                  <td>
                    {lead?.ownerNumber1 &&
                    lead?.ownerNumber2 &&
                    lead?.ownerNumber3 ? (
                      <div className="">
                        {lead?.ownerNumber1} / {lead?.ownerNumber2} /{" "}
                        {lead?.ownerNumber3}
                      </div>
                    ) : (
                      "Nie podano"
                    )}{" "}
                  </td>
                </tr>
                <tr className="bg-gray-700">
                  <td>Numer Telefonu:</td>
                  <td>
                    {lead.phone} {lead.name}
                  </td>
                </tr>
                <tr className="bg-gray-600">
                  <td>Uczestnicy gospodarstwa:</td>
                  <td>{lead.visitors}</td>
                </tr>
                <tr className="bg-gray-700">
                  <td>Region:</td>
                  <td>{lead?.region ? lead.region : "Nie podano"}</td>
                </tr>
              </tbody>
            </table>
            <div className="pt-3 w-full flex flex-row justify-between">
              <div>Notatka:</div>
              <button
                onClick={() => {
                  setNoteOpen(lead);
                }}
                className="text-blue-500 font-light rounded p-0.5 px-2 hover:bg-white hover:bg-opacity-20"
              >
                Edytuj
              </button>
            </div>
            {lead?.note !== undefined && (
              <div dangerouslySetInnerHTML={renderMarkdown(lead.note)} />
            )}

            <div className="flex flex-col w-full mt-3">
              {!lead.isFinished && (
                <button
                  onClick={() =>
                    updateLead(lead.id, {
                      ...lead,
                      isFinished: true,
                    })
                  }
                  className="w-full text-center bg-green-500 text-white py-2 hover:bg-green-400 font-light text-base rounded"
                >
                  Oznacz jako sprawdzone
                </button>
              )}
              {lead.isFinished &&
                (!lead?.status || lead.status === "reseted") && (
                  <div className="grid grid-cols-2 mt-2 gap-2">
                    <button
                      onClick={() =>
                        updateLead(lead.id, {
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
                        updateLead(lead.id, {
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
        )}
      {/* FORCE VISIBILITY ON MAIN ADMIN */}
      {lead.owner === "nikos" && user?.email === "nikos@hexon.work" && (
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
                  <ToiLead
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
          {selectedLead && (
            <div className="w-full h-full absolute left-0 top-0 items-center justify-center p-6 bg-black bg-opacity-80 z-[50]">
              <h2 className="text-2xl mb-4 mt-6">Przypisz leada do:</h2>
              <div className="h-[70%] w-full overflow-y-scroll scrollbar pr-3 py-4 flex flex-col space-y-2">
                <button
                  onClick={() =>
                    updateLead(lead.id, {
                      ...lead,
                      owner: "nikos",
                    }).then(() => {
                      setSelectedLead(null);
                      toast.success("Przypisano pomyślnie!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                      });
                    })
                  }
                  className="font-bold text-white bg-blue-500 hover:bg-blue-400 w-full py-1.5"
                >
                  Nikodem
                </button>
                <button
                  onClick={() =>
                    updateLead(lead.id, {
                      ...lead,
                      owner: "",
                    }).then(() => {
                      setSelectedLead(null);
                      toast.success("Przypisano pomyślnie!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                      });
                    })
                  }
                  className="font-bold text-white bg-green-500 hover:bg-green-400 w-full py-1.5"
                >
                  Adam
                </button>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="w-max mx-auto mt-3 text-black underline hover:no-underline"
              >
                Zamknij
              </button>
            </div>
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
          {isAnimating && signingLead.id === lead.id && (
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
              className={`z-50 absolute top-14 right-14 w-max h-max p-6 rounded-xl bg-gray-600 flex flex-col items-start space-y-2 duration-200 ease-in-out ${
                !optionsOpen ? "-translate-y-[500px]" : "-translate-y-0"
              }`}
            >
              <button
                onClick={() => {
                  setSelectedLead(lead.id);
                  setOptionsOpen(false);
                }}
                className="w-full py-1 text-white bg-green-500 bg-opacity-100 duration-150 hover:bg-opacity-80 px-12"
              >
                Przypisz
              </button>
              <button
                onClick={() => {
                  setOptionsOpen(false);
                  setTrashLead(lead);
                }}
                className="w-full px-12 py-1 text-white bg-white bg-opacity-20 duration-150 hover:bg-opacity-30"
              >
                Kibel {getToiletOption()}
              </button>
              <button
                onClick={() =>
                  updateLead(lead.id, {
                    ...lead,
                    isFinished: false,
                    isTrash: false,
                    signed: false,
                    status: "reseted",
                  }).then(() => setOptionsOpen(false))
                }
                className="w-full px-12 py-1 text-white bg-white bg-opacity-20 duration-150 hover:bg-opacity-30"
              >
                Resetuj
              </button>
              <div className="h-12"></div>
              <button
                onClick={() => {
                  deleteLead(lead.id).then(() => {
                    toast.success("Usunięto", {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                    });
                    setOptionsOpen(false);
                  });
                }}
                className="my-24 w-full px-12 py-1 text-white bg-red-500 duration-150 hover:bg-opacity-80"
              >
                Usuń z bazy
              </button>
            </div>
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
                <td>Numer KW:</td>
                <td>
                  {lead?.ownerNumber1 &&
                  lead?.ownerNumber2 &&
                  lead?.ownerNumber3 ? (
                    <div className="">
                      {lead?.ownerNumber1} / {lead?.ownerNumber2} /{" "}
                      {lead?.ownerNumber3}
                    </div>
                  ) : (
                    "Nie podano"
                  )}{" "}
                </td>
              </tr>
              <tr className="bg-gray-700">
                <td>Numer Telefonu:</td>
                <td>
                  {lead.phone} {lead.name}
                </td>
              </tr>
              <tr className="bg-gray-600">
                <td>Uczestnicy gospodarstwa:</td>
                <td>{lead.visitors}</td>
              </tr>
              <tr className="bg-gray-700">
                <td>Region:</td>
                <td>{lead?.region ? lead.region : "Nie podano"}</td>
              </tr>
            </tbody>
          </table>
          <div className="pt-3 w-full flex flex-row justify-between">
            <div>Notatka:</div>
            <button
              onClick={() => {
                setNoteOpen(lead);
              }}
              className="text-blue-500 font-light rounded p-0.5 px-2 hover:bg-white hover:bg-opacity-20"
            >
              Edytuj
            </button>
          </div>
          {lead?.note !== undefined && (
            <div dangerouslySetInnerHTML={renderMarkdown(lead.note)} />
          )}

          <div className="flex flex-col w-full mt-3">
            {!lead.isFinished && (
              <button
                onClick={() =>
                  updateLead(lead.id, {
                    ...lead,
                    isFinished: true,
                  })
                }
                className="w-full text-center bg-green-500 text-white py-2 hover:bg-green-400 font-light text-base rounded"
              >
                Oznacz jako sprawdzone
              </button>
            )}
            {lead.isFinished &&
              (!lead?.status || lead.status === "reseted") && (
                <div className="grid grid-cols-2 mt-2 gap-2">
                  <button
                    onClick={() =>
                      updateLead(lead.id, {
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
                      updateLead(lead.id, {
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
      )}
    </>
  );
}
