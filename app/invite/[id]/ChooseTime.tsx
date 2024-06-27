"use client";
import moment from "moment";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  app,
  updateLink,
  pushMessage,
  pushSession,
  updateApplication,
  updateLinkMovieTime,
} from "@/common/firebase";
import { useRouter } from "next/navigation";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import Loading from "@/app/loading";
import Toast from "@/app/components/Toast";
export default function ChooseTime({ linkId }: { linkId: any }) {
  const [invite, setInvite] = useState<any>();
  useEffect(() => {
    const ref = collection(getFirestore(app), "links");
    const unsub = onSnapshot(ref, (querySnapshot: any) => {
      const snapshotData: any[] = [];
      querySnapshot.forEach((doc: any) => {
        snapshotData.push(doc.data());
      });
      const newData = snapshotData.map((item: any) => item.data);
      setInvite(
        newData.flat().filter((link: any) => link.link.includes(linkId))[0]
      );
    });
  }, []);

  const [data, setData] = useState<any>({
    ranges: {
      start: 0,
      end: 0,
    },
    hour: "",
    date: dayjs(moment().add(1, "day").format("YYYY-MM-DD")),
  });
  function convertTimeRanges(timeRange: any) {
    const [start, end] = timeRange.split("-");
    const startHour = parseInt(start.split(":")[0], 10);
    const endHour = parseInt(end.split(":")[0], 10);
    setData({
      ...data,
      hour: timeRange,
      ranges: { start: startHour, end: endHour },
    });
  }
  const router = useRouter();
  const show =
    moment(invite?.date).format("MM-DD-YYYY") ===
      moment().format("MM-DD-YYYY") &&
    parseInt(moment().format("H")) >= invite?.ranges?.start &&
    parseInt(moment().format("H")) <= invite?.ranges?.end;
  const isAfter =
    moment(invite?.date).format("MM-DD-YYYY") ===
      moment().format("MM-DD-YYYY") &&
    parseInt(moment().format("H")) >= invite?.ranges?.start &&
    parseInt(moment().format("H")) >= invite?.ranges?.end;
  const [error, setError] = useState({
    name: false,
    phone: false,
    email: false,
  });
  const [formData, setFormData] = useState<any>({
    message: "",
    phone: "",
    email: "",
    name: "",
  });

  const [isSent, setIsSent] = useState(false);
  const handleSubmit = () => {
    // Reset errors
    setError({ name: false, phone: false, email: false });

    // Check for errors
    let hasError = false;
    if (formData.name === "") {
      setError((prev) => ({ ...prev, name: true }));
      hasError = true;
    }
    if (formData.phone === "") {
      setError((prev) => ({ ...prev, phone: true }));
      hasError = true;
    }
    if (formData.email === "") {
      setError((prev) => ({ ...prev, email: true }));
      hasError = true;
    }

    // If no errors, proceed
    if (!hasError) {
      pushMessage({ ...formData, id: uuidv4() });
      updateLink(linkId, {
        ...invite,
        finished: true,
      });
    }
  };
  const [time, setTime] = useState(0);
  const [hasMovieTimeEnded, setHasMovieTimeEnded] = useState(false);

  const interval = setInterval(() => {
    setTime(time + 1);
  }, 1000);

  return (
    <>
      {!invite && <Loading />}
      {invite?.status !== "delivered" && (
        <>
          <p className="text-white text-sm xl:text-base max-w-[30rem] font-sans mt-3 text-center">
            Aktywuj link, aby dołączyć do wdrażającego szkolenia online. Wybierz
            godzinę, w której będziesz jutro uczestniczyć w szkoleniu.
          </p>
          <div className="flex flex-col my-3">
            <h2 className="mt-3 text-xl bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] bg-clip-text text-transparent font-bold">
              Wybierz godzinę
            </h2>
            <select
              required
              style={{ boxShadow: "0px 0px 3px black" }}
              className={`mt-3 w-full lg:w-auto p-2 placeholder:font-light focus:outline-2 focus:outline-green-500 text-black`}
              onChange={(e) => {
                convertTimeRanges(e.target.value);
              }}
              value={data.hour}
            >
              <option value="">Wybierz godzinę</option>
              <option value="4:00-6:00">4:00-6:00</option>
              <option value="6:00-8:00">6:00-8:00</option>
              <option value="8:00-10:00">8:00-10:00</option>
              <option value="10:00-12:00">10:00-12:00</option>
              <option value="12:00-14:00">12:00-14:00</option>
              <option value="14:00-16:00">14:00-16:00</option>
              <option value="16:00-18:00">16:00-18:00</option>
              <option value="18:00-20:00">18:00-20:00</option>
              <option value="20:00-22:00">20:00-22:00</option>
            </select>

            {/* <h2 className="mt-3 text-xl bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] bg-clip-text text-transparent font-bold">
              Wybierz datę
            </h2> */}
            {/* <BasicDatePicker data={data} setData={setData} /> */}
            <button
              onClick={() => {
                updateLink(linkId, {
                  ...data,
                  date: data.date.format("MM-DD-YYYY"),
                });
                router.push(`/invite/${linkId}?sent=true`);
              }}
              disabled={!data.hour}
              title={
                !data.hour ? "Wybierz godzinę aby przejść dalej" : "Aktywuj"
              }
              className="disabled:cursor-not-allowed bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] font-sans text-lg text-center text-zinc-800 px-3 py-1 rounded-xl max-w-[40rem] mt-4 mx-auto"
            >
              Aktywuj link
            </button>
          </div>
        </>
      )}
      {invite?.status === "delivered" && (
        <div className="">
          <p className="flex flex-col items-center justify-center text-white text-lg xl:text-base max-w-[30rem] font-sans mt-3 text-center">
            {(isAfter || hasMovieTimeEnded || invite.hasMovieTimeEnded) && (
              <div className="w-full">
                <h2 className="text-green-500 my-3 font-bold">
                  Dziękujemy za udział w szkoleniu.
                </h2>
                {!invite.finished && (
                  <div className="">
                    <p className="text-center max-w-[30rem] mx-auto text-white">
                      Masz jakieś pytania zanim podpiszesz z nami umowę o
                      współpracę? Kliknij tutaj i zapisz się, a biuro do Ciebie
                      na pewno się odezwie.
                    </p>

                    <h2 className="mt-3 text-xl bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] bg-clip-text text-transparent font-bold">
                      Imię
                    </h2>
                    {error.name && (
                      <p>
                        <span className="text-red-500">Wymagane</span>
                      </p>
                    )}
                    <input
                      onFocus={() => setError({ ...error, name: false })}
                      autoComplete="name"
                      style={{ boxShadow: "0px 0px 3px black" }}
                      className={`text-xl text-zinc-800 drop-shadow-xl shadow-black mt-3 w-full p-2 font-bold font-gotham placeholder:font-light focus:outline-2 focus:outline-green-500 ${
                        error.name && "border-2 border-red-500"
                      }`}
                      type="text"
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      value={formData.name}
                      placeholder="Wpisz imię"
                    />
                    <h2 className="mt-3 text-xl bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] bg-clip-text text-transparent font-bold">
                      Numer Telefonu
                    </h2>
                    {error.phone && (
                      <p>
                        <span className="text-red-500">Wymagane</span>
                      </p>
                    )}
                    <input
                      onFocus={() => setError({ ...error, phone: false })}
                      autoComplete="tel"
                      style={{ boxShadow: "0px 0px 3px black" }}
                      className={`text-xl text-zinc-800 drop-shadow-xl shadow-black mt-3 w-full p-2 font-bold font-gotham placeholder:font-light focus:outline-2 focus:outline-green-500 ${
                        error.phone && "border-2 border-red-500"
                      }`}
                      type="text"
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      value={formData.phone}
                      placeholder="Wpisz numer"
                    />
                    <h2 className="mt-3 text-xl bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] bg-clip-text text-transparent font-bold">
                      Adres Email
                    </h2>
                    {error.email && (
                      <p>
                        <span className="text-red-500">Wymagane</span>
                      </p>
                    )}
                    <input
                      onFocus={() => setError({ ...error, email: false })}
                      autoComplete="email"
                      style={{ boxShadow: "0px 0px 3px black" }}
                      className={`text-xl text-zinc-800 drop-shadow-xl shadow-black mt-3 w-full p-2 font-bold font-gotham placeholder:font-light focus:outline-2 focus:outline-green-500 ${
                        error.email && "border-2 border-red-500"
                      }`}
                      type="text"
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      value={formData.email}
                      placeholder="Wpisz email"
                    />
                    <textarea
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Napisz wiadomość... (opcjonalnie)"
                      name=""
                      id=""
                      cols={30}
                      className="p-3 outline-green-500 text-zinc-800 drop-shadow-xl shadow-black mt-8 text-xl font-bold font-gotham placeholder:font-light w-full"
                    ></textarea>
                    <button
                      onClick={() => {
                        handleSubmit();
                        setIsSent(true);
                      }}
                      disabled={isSent}
                      className="disabled:cursor-not-allowed bg-black hover:scale-110 text border-transparent-zinc-800 outline-none focus:outline-none duration-200 text-center p-4 w-full mt-6"
                    >
                      <span className="bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] bg-clip-text text-transparent font-bold">
                        {!isSent && "CHCĘ PRZEJŚĆ DO DALSZEGO ETAPU"}
                        {isSent && "DZIĘKUJEMY"}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            )}
            {!show && !isAfter && (
              <span className="font-bold text-green-500">
                Link aktywowano pomyślnie.
              </span>
            )}
            {show &&
              !isAfter &&
              !hasMovieTimeEnded &&
              !invite.hasMovieTimeEnded && (
                <div className="w-full sm:w-[30rem] lg:w-[40rem] mt-12">
                  <video
                    src="https://firebasestorage.googleapis.com/v0/b/decocanva-408fb.appspot.com/o/video-output-2BAF655B-6E85-450F-B34A-E8E84A94B640.MOV?alt=media&token=c2e1033d-6658-481b-886d-7aa523b03aed"
                    controls
                    className={`w-full z-50`}
                  />
                  <button
                    onClick={() => {
                      setHasMovieTimeEnded(true);
                      updateLink(linkId, {
                        ...invite,
                        hasMovieTimeEnded: true,
                      });
                      pushSession({ timeSpent: time, id: uuidv4() });
                      setTimeout(() => {
                        clearInterval(interval);
                      }, 2000);
                    }}
                    disabled={isSent}
                    className="disabled:cursor-not-allowed bg-black hover:scale-110 text border-transparent-zinc-800 outline-none focus:outline-none duration-200 text-center p-4 w-max mt-12"
                  >
                    <span className="bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] bg-clip-text text-transparent font-bold">
                      ZAKOŃCZ CZAS OGLĄDANIA
                    </span>
                  </button>
                </div>
              )}
            {!show && !isAfter && (
              <div className="mt-6 text-xl">
                Wróć tutaj {moment().add(1, "day").format("YYYY-MM-DD")} między
                godziną {invite?.hour} by odebrać dostęp do szkolenia
                wdrożeniowego.
              </div>
            )}
          </p>
          {!show && isAfter && (
            <p className="text-gray-500 text-sm text-justify mt-12 max-w-[30rem]">
              Aplikując wyrażam zgodę na przetwarzanie moich danych osobowych
              zawartych w formularzu rekrutacyjnym przez HEXON GROUP SPÓŁKA Z
              OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ w celu przeprowadzenia procesu
              rekrutacji zgodnie z przepisami Rozporządzenia Parlamentu
              Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w
              sprawie ochrony osób fizycznych w związku z przetwarzaniem danych
              osobowych i w sprawie swobodnego przepływu takich danych (RODO).
            </p>
          )}
        </div>
      )}
    </>
  );
}
// data.date.format("MM-DD-YYYY")
