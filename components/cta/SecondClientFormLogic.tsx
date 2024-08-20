"use client";
import { pushLead, pushSecondLead } from "@/common/firebase";
import React, { useState } from "react";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Toast from "../Toast";
import { useDispatch } from "react-redux";
import { setModalVisible } from "@/common/redux/slices/actionSlice";
import Success from "../Success";
import { useRouter } from "next/navigation";
export default function SecondClientFormLogic({
  searchParams,
}: {
  searchParams: any;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = useState({
    provider: false,
    name: false,
    pNumber: false,
    email: false,
    owner: false,
  });
  const [formData, setFormData] = useState<any>({
    provider: "",
    name: "",
    pNumber: "",
    email: "",
    owner: "",
  });
  function setModalVisibility(action: string) {
    dispatch(setModalVisible(action));
  }
  const [isSent, setIsSent] = useState<any>(false);
  const handleSubmit = () => {
    // Check for errors
    let hasError = false;
    if (
      !formData.provider ||
      !formData.name ||
      !formData.email ||
      !formData.owner
    ) {
      toast.error("Uzupełnij dane.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      hasError = true;
      return;
    }

    // If no errors, proceed
    const id = toast.loading(<span>Wysyłanie formularza...</span>, {
      position: "bottom-right",
      theme: "dark",
    });
    if (!hasError) {
      if (!searchParams) {
        pushSecondLead({ ...formData, id: uuidv4() }).then(() => {
          setIsSent(true);
          toast.update(id, {
            render: (
              <span
                onClick={() => {
                  dispatch(setModalVisible(""));
                }}
              >
                Formularz wysłano pomyślnie!
              </span>
            ),
            type: "success",
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            isLoading: false,
          });
          router.push("/?thankyou=true");
          setTimeout(() => {
            dispatch(setModalVisible(""));
          }, 5000);
        });
      }
    }
  };

  return (
    <div>
      <Toast />
      {isSent && <Success />}
      <div className="flex flex-col relative">
        <div
          style={{ boxShadow: "0px 0px 3px black" }}
          className="rounded-xl mx-6 my-6 p-6 bg-white flex flex-col"
        >
          <div className="flex items-center flex-wrap -ml-4">
            <div className="mt-4 ml-4">
              <h2 className="sm:text-xl">Imię i nazwisko:</h2>

              <input
                onFocus={() => setError({ ...error, name: false })}
                autoComplete="name"
                style={{ boxShadow: "0px 0px 3px black" }}
                className={`mt-3 w-full lg:w-auto p-2 placeholder:font-light focus:outline-2 focus:outline-green-500`}
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                value={formData.name}
                placeholder="Wpisz imię i nazwisko"
              />
            </div>
            <div className="mt-4 ml-4">
              <h2 className="sm:text-xl">Telefon:</h2>

              <input
                onFocus={() => setError({ ...error, pNumber: false })}
                autoComplete="tel"
                style={{ boxShadow: "0px 0px 3px black" }}
                className={`mt-3 w-full lg:w-auto p-2 placeholder:font-light focus:outline-2 focus:outline-green-500`}
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, pNumber: e.target.value })
                }
                value={formData.pNumber}
                placeholder="Wpisz telefon"
              />
            </div>
            <div className="mt-4 ml-4">
              <h2 className="sm:text-xl">Email:</h2>

              <input
                onFocus={() => setError({ ...error, email: false })}
                autoComplete="email"
                style={{ boxShadow: "0px 0px 3px black" }}
                className={`mt-3 w-full lg:w-auto p-2 placeholder:font-light focus:outline-2 focus:outline-green-500`}
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                value={formData.email}
                placeholder="Wpisz email"
              />
            </div>
            <div className="mt-4 ml-4">
              <h2 className="sm:text-xl">Dostawca energii:</h2>
              <select
                onFocus={() => setError({ ...error, provider: false })}
                style={{ boxShadow: "0px 0px 3px black" }}
                className={`mt-3 w-full lg:w-auto p-2 placeholder:font-light focus:outline-2 focus:outline-green-500`}
                onChange={(e) =>
                  setFormData({ ...formData, provider: e.target.value })
                }
                value={formData.provider}
              >
                <option value="">Wybierz dostawcę energii</option>
                <option value="ENERGA">ENERGA</option>
                <option value="PGE">PGE</option>
                <option value="TAURON">TAURON</option>
                <option value="ENEA">ENEA</option>
                <option value="FORTUM">FORTUM</option>
                <option value="INNE">INNE</option>
              </select>
            </div>
          </div>
          {formData.provider === "INNE" && (
            <div className="flex flex-col">
              <h2 className="sm:text-xl">Wpisz dostawcę:</h2>
              <input
                onFocus={() => setError({ ...error, provider: false })}
                autoComplete="tel"
                style={{ boxShadow: "0px 0px 3px black" }}
                className={`mt-3 w-full lg:w-auto p-2 placeholder:font-light focus:outline-2 focus:outline-green-500`}
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, provider: e.target.value })
                }
                value={formData.provider}
                placeholder="Wpisz dostawcę"
              />
            </div>
          )}
          <label className="font-light mt-3">
            Czy jesteś właścicielem bądź prezesem firmy?
          </label>
          <div className="-ml-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <button
              onClick={() => {
                setFormData({ ...formData, owner: "Tak" });
              }}
              className={`${
                formData.owner === "Tak" ? "border-black" : "border-green-500"
              } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
            >
              Tak
            </button>
            <button
              onClick={() => {
                setFormData({ ...formData, owner: "Nie" });
              }}
              className={`${
                formData.owner === "Nie" ? "border-black" : "border-green-500"
              } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
            >
              Nie
            </button>
          </div>
          <div className="">
            {isSent && (
              <div className="text-green-500 animate-pulse mt-3">
                Dziękujemy za wypełnienie wniosku!
              </div>
            )}
            <div className="flex flex-col w-full mt-2">
              <button
                disabled={isSent}
                onClick={() => handleSubmit()}
                className="disabled:cursor-not-allowed flex flex-row items-center justify-center py-3 px-5 w-full text-base lg:w-max bg-gradient-to-br from-[#C5FF17] to-[#33E5CF] hover:scale-105 duration-200 ease-in-out text-zinc-800 rounded-lg cursor-pointer font-bold mt-2"
              >
                Wyślij wniosek <FaArrowRight className="ml-2" />
              </button>
              <button
                onClick={() => setModalVisibility("client")}
                className="font-light mt-2 lg:mr-4 text-left text-blue-500"
              >
                Dofinansowanie na termomodernizacje
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
