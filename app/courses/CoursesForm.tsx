"use client";
import { pushCourse } from "@/common/firebase";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export default function CoursesForm() {
  const [isSent, setIsSent] = useState(false);
  const [inputs, setInputs] = useState<{
    name: string;
    email: string;
    phoneNumber: string;
  }>({
    name: "",
    email: "",
    phoneNumber: "",
  });

  return (
    <div>
      <div className="mx-auto grid grid-cols-1 gap-4 mt-12 w-full font-sans">
        <div className="flex flex-col text-black">
          <label className="text-sm text-white" htmlFor="name">
            Imię i nazwisko
          </label>
          <input
            className="border-b-[3px]  focus:border-blue-600 bg-gray-200 focus:bg-white duration-200 hover:bg-gray-100 px-2 py-0.5 outline-none focus:outline-none border-transparent"
            type="text"
            id="name"
            name="name"
            value={inputs.name}
            placeholder="Jan Kowalski"
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div className="grid grid-cols-2 gap-4 text-black">
          <div className="flex flex-col">
            <label className="text-sm text-white" htmlFor="email">
              Adres e-mail
            </label>
            <input
              required
              className="border-b-[3px] focus:border-blue-600 bg-gray-200 focus:bg-white duration-200 hover:bg-gray-100 px-2 py-0.5 outline-none focus:outline-none border-transparent"
              type="email"
              id="email"
              name="email"
              placeholder="jan.kowalski@gmail.com"
              value={inputs.email}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-white" htmlFor="phoneNumber">
              Numer telefonu
            </label>
            <input
              required
              className="border-b-[3px] focus:border-blue-600 bg-gray-200 focus:bg-white duration-200 hover:bg-gray-100 px-2 py-0.5 outline-none focus:outline-none border-transparent"
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={inputs.phoneNumber}
              placeholder="Numer telefonu"
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, phoneNumber: e.target.value }))
              }
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-sm text-white">
          {isSent && (
            <p className="bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] bg-clip-text text-transparent font-bold">
              Formularz został wysłany
            </p>
          )}
        </div>
        <button
          onClick={() => {
            pushCourse({ ...inputs, id: uuidv4() });
            setIsSent(true);
          }}
          disabled={isSent}
          className="disabled:cursor-not-allowed bg-black hover:bg-zinc-800 border-transparent-zinc-800 outline-none focus:outline-none duration-200 text-center p-4"
        >
          <span className="bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] bg-clip-text text-transparent font-bold">
            {!isSent && "ZAPISZ SIĘ NA SZKOLENIE"}
            {isSent && "DZIĘKUJEMY"}
          </span>
        </button>
        <p className="text-sm text-gray-500">
          Wyrażam zgodę na przetwarzanie moich danych osobowych zawartych w
          formularzu rekrutacyjnym przez HEXON GROUP Spółka z ograniczoną
          odpowiedzialnością w celu skontaktowania się w sprawie szkolenia,
          zgodnie z przepisami Rozporządzenia Parlamentu Europejskiego i Rady
          (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób
          fizycznych w związku z przetwarzaniem danych osobowych oraz w sprawie
          swobodnego przepływu takich danych (RODO).
        </p>
      </div>
    </div>
  );
}
