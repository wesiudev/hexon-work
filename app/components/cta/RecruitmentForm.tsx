"use client";
import { useState } from "react";

export default function RecruitmentForm() {
  const [inputs, setInputs] = useState<{
    name: string;
    email: string;
    phoneNumber: string;
    file: File | null;
  }>({
    name: "",
    email: "",
    phoneNumber: "",
    file: null,
  });
  const [isFileTooBig, setIsFileTooBig] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file.size > 20 * 1024 * 1024) {
      setIsFileTooBig(true);
    } else {
      setIsFileTooBig(false);
      setInputs((prev) => ({ ...prev, file }));
    }
  };

  const validateForm = () => {
    if (!inputs.name || !inputs.email || !inputs.phoneNumber || !inputs.file) {
      setIsFormValid(false);
    } else if (isFileTooBig) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  };

  return (
    <form>
      <div className="grid grid-cols-1 gap-4 mt-12 lg:w-1/2">
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
        <div className="flex flex-col">
          <label className="text-sm text-white" htmlFor="file">
            Załącz CV
          </label>
          <input
            required
            className=" border-gray-300 px-2 py-0.5 outline-none focus:outline-none border-transparent"
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex flex-col items-center justify-center text-sm text-white">
          {isFileTooBig && <p className="text-red-600">Plik jest za duży</p>}
        </div>
        <button
          className="bg-black hover:scale-110 text border-transparent-zinc-800 px-2 py-0.5 outline-none focus:outline-none duration-200 text-center p-2"
          onClick={validateForm}
        >
          <span className="bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] bg-clip-text text-transparent font-bold">
            APLIKUJĘ NA STANOWISKO DORADCY
          </span>
        </button>
        <div className="flex flex-col items-center justify-center text-sm text-white">
          {isFormValid && (
            <p className="bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] bg-clip-text text-transparent font-bold">
              Formularz zosta wysłany
            </p>
          )}
        </div>
        <p className="text-sm">
          Aplikując wyrażam zgodę na przetwarzanie moich danych osobowych
          zawartych w formularzu rekrutacyjnym przez HEXON GROUP SPÓŁKA Z
          OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ w celu przeprowadzenia procesu
          rekrutacji zgodnie z przepisami Rozporządzenia Parlamentu
          Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w
          sprawie ochrony osób fizycznych w związku z przetwarzaniem danych
          osobowych i w sprawie swobodnego przepływu takich danych (RODO).
        </p>
      </div>
    </form>
  );
}
