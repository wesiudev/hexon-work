"use client";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { app, pushMessage, pushSession } from "@/common/firebase";
import { useRouter } from "next/navigation";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import "moment/locale/pl";
import Loading from "@/app/loading";
import { FaPause, FaPlay, FaCheckCircle } from "react-icons/fa";
import { BsFullscreen } from "react-icons/bs";

const updateLink = async (id: string, data: any) =>
  fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/linkUpdate`, {
    method: "POST",
    body: JSON.stringify({ id, data }),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    cache: "no-store",
  });

export default function ChooseTime({ linkId }: { linkId: any }) {
  const [paused, setPaused] = useState(true);
  const [invite, setInvite] = useState<any>();
  const [finishInsurance, setFinishInsurance] = useState(false);
  const [time, setTime] = useState(0);
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPlayedOnce, setIsPlayedOnce] = useState(false);
  const video = useRef<any>();
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
    return () => {
      unsub();
    };
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
  const today = new Date(moment().format("MM-DD-YYYY"));
  const dateDB = new Date(invite?.date);
  const show =
    invite?.date === moment().format("MM-DD-YYYY") &&
    parseInt(moment().format("H")) >= invite?.ranges?.start &&
    parseInt(moment().format("H")) <= invite?.ranges?.end;
  const isAfter =
    (moment().format("MM-DD-YYYY") === moment(dateDB).format("MM-DD-YYYY") &&
      parseInt(moment().format("H")) >= invite?.ranges?.start &&
      parseInt(moment().format("H")) >= invite?.ranges?.end) ||
    today > dateDB;

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
  function getFirstWord(input: any) {
    if (input) {
      return input.split(" ")[0];
    } else {
      return;
    }
  }
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
      pushMessage({
        ...formData,
        id: uuidv4(),
        timeSpent: invite?.timeSpent + time,
      });
      updateLink(linkId, {
        ...invite,
        finished: true,
      });
    }
  };

  useEffect(() => {
    // Function to increment the time
    const incrementTime = () => {
      setTime((prevSeconds) => prevSeconds + 1);
    };

    // Set up the interval to increment every second
    const intervalId = setInterval(incrementTime, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const linkUsed = invite?.finished;
  function saveSession() {
    const id = uuidv4();
    pushSession({ timeSpent: time, id: id });
    updateLink(linkId, {
      ...invite,
      hasMovieTimeEnded: true,
      timeSpent: invite?.timeSpent + time,
    });
  }
  function requestFullScreenClose(element: any) {
    if (element.exitFullscreen) {
      element.exitFullscreen();
    } else if (element.mozCancelFullScreen) {
      /* Firefox */
      element.mozCancelFullScreen();
    } else if (element.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      element.webkitExitFullscreen();
    } else if (element.msExitFullscreen) {
      /* IE/Edge */
      element.msExitFullscreen();
    }
  }
  function requestFullScreen(element: any) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      /* Firefox */
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      /* IE/Edge */
      element.msRequestFullscreen();
    }
  }
  return (
    <>
      {!invite && <Loading />}
      {loading && <Loading />}
      {invite?.secondVersion && (
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="mt-3 text-2xl sm:text-3xl xl:text-4xl bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] bg-clip-text text-transparent font-bold px-4 lg:px-12 pt-3">
            Rekrutacja na stanowisko Doradcy Klienta
          </h2>{" "}
          {invite?.status !== "delivered" && invite?.status !== "visited" && (
            <>
              <p className="mt-4 text-white text-center px-12">
                {invite?.name && `Cześć ${getFirstWord(invite.name)}!`} Aktywuj
                link, by otrzymać 24-godzinny dostęp do wdrożeniowego materiału
                szkoleniowego.
              </p>
              <button
                onClick={() => {
                  setLoading(true);
                  updateLink(linkId, {
                    ...data,
                    date: moment().add(24, "hour"),
                    id: invite?.id,
                    name: invite?.name,
                    status: "delivered",
                    timeSpent: time,
                    secondVersion: true,
                  }).then(() => {
                    setLoading(false);
                  });
                }}
                title="Odbierz dostęp!"
                className="hover:scale-105 duration-300 disabled:cursor-not-allowed bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] font-sans text-lg text-center text-zinc-800 px-3 py-1 rounded-xl max-w-[40rem] mt-4 mx-auto"
              >
                Odbierz dostęp!
              </button>
            </>
          )}
          {moment().isAfter(invite?.date) && (
            <div className="text-center mt-3 text-red-500 italic pb-3">
              Link wygasł: {moment(invite?.date).format("DD.MM.YYYY HH:mm")}
            </div>
          )}
          {(invite?.status === "delivered" || invite?.status === "visited") &&
            !moment().isAfter(invite?.date) && (
              <div className="w-full mt-4">
                <div className="flex items-center justify-center text-center text-base font-light mb-4">
                  Dostęp do:{" "}
                  <div className="text-green-500 ml-1">
                    {" "}
                    {moment(invite?.date).format("DD.MM.YYYY HH:mm")}
                  </div>
                </div>
                <div className="relative group">
                  <video
                    ref={video}
                    src="https://firebasestorage.googleapis.com/v0/b/decocanva-408fb.appspot.com/o/webinar.mp4?alt=media&token=6b01f5f8-3a23-4773-a64b-fe8c7a0469a8"
                    className={`w-full z-50`}
                    onClick={() => {
                      if (paused) {
                        video.current?.play();
                        setPaused(false);
                        updateLink(linkId, {
                          ...invite,
                          timeSpent: invite?.timeSpent + time,
                          status: "visited",
                        }).then(() => setTime(0));
                      } else {
                        video.current?.pause();
                        setPaused(true);
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      setIsPlayedOnce(true);
                      video.current?.play();
                      setPaused(false);
                      updateLink(linkId, {
                        ...invite,
                        timeSpent: invite?.timeSpent + time,
                        status: "visited",
                      }).then(() => setTime(0));
                    }}
                    className={`${
                      paused
                        ? `${
                            invite?.status === "delivered"
                              ? "opacity-100"
                              : "group-hover:opacity-100"
                          } z-50 scale-100 duration-500`
                        : "rotate-45 z-0 duration-700"
                    } ease-in-out absolute text-2xl sm:text-3xl lg:text-4xl drop-shadow-xl shadow-black ${
                      !isPlayedOnce
                        ? "-translte-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        : "left-6 bottom-6"
                    } opacity-0`}
                  >
                    <FaPlay className={``} />
                  </button>
                  <button
                    onClick={() => {
                      video.current?.pause();
                      setPaused(true);
                    }}
                    className={`${
                      paused
                        ? "rotate-45 z-0 duration-700"
                        : "group-hover:opacity-100 z-50 scale-100 duration-500"
                    } ease-in-out absolute text-2xl sm:text-3xl lg:text-4xl drop-shadow-xl shadow-black left-6 bottom-6 opacity-0`}
                  >
                    <FaPause />
                  </button>
                  <button
                    onClick={() => {
                      requestFullScreen(video.current);
                    }}
                    className={`group-hover:opacity-100 ease-in-out absolute text-2xl sm:text-3xl lg:text-4xl drop-shadow-xl shadow-black right-6 bottom-6 opacity-0 !z-[500000]`}
                  >
                    <BsFullscreen />
                  </button>
                </div>

                <div className="relative max-w-[30rem] mt-20 mx-auto p-6 mb-6">
                  {invite.finished && (
                    <div className="z-[99] w-full h-full bg-black text-white italic bg-opacity-80 items-center justify-center flex flex-col text-center absolute left-0 top-0">
                      <FaCheckCircle className="text-green-500 text-7xl mb-3" />
                      Wiadomość wysłana pomyślnie.
                    </div>
                  )}
                  <h2 className="my-3 text-2xl sm:text-3xl xl:text-4xl bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] bg-clip-text text-transparent font-bold px-4 lg:px-12 pt-3">
                    KONTAKT
                  </h2>{" "}
                  <p className="text-center max-w-[30rem] mx-auto text-white">
                    Masz jakieś pytania zanim podpiszesz z nami umowę o
                    współpracę? Kliknij tutaj i zapisz się, a biuro do Ciebie na
                    pewno się odezwie.
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
                      setFormData({
                        ...formData,
                        message: e.target.value,
                      })
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
                    }}
                    disabled={invite?.finished}
                    className="disabled:cursor-not-allowed bg-black hover:scale-110 text border-transparent-zinc-800 outline-none focus:outline-none duration-200 text-center p-4 w-full mt-6"
                  >
                    <span className="bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] bg-clip-text text-transparent font-bold">
                      {!invite?.finished && "WYŚLIJ"}
                      {invite?.finished && "DZIĘKUJEMY"}
                    </span>
                  </button>
                  <p className="text-gray-500 text-sm text-justify mt-4 max-w-[30rem]">
                    Aplikując wyrażam zgodę na przetwarzanie moich danych
                    osobowych zawartych w formularzu rekrutacyjnym przez HEXON
                    GROUP SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ w celu
                    przeprowadzenia procesu rekrutacji zgodnie z przepisami
                    Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679
                    z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych
                    w związku z przetwarzaniem danych osobowych i w sprawie
                    swobodnego przepływu takich danych (RODO).
                  </p>
                </div>
              </div>
            )}
        </div>
      )}
      {!invite?.secondVersion && (
        <div>
          <div
            className={`fixed left-0 top-0 flex items-center justify-center w-full h-full bg-black duration-500 ${
              finishInsurance ? "bg-opacity-80 z-50" : "bg-opacity-0 -z-50"
            }`}
          >
            {finishInsurance && (
              <div className="w-max h-max p-6 text-white font-bold">
                Czy chcesz zakończyć oglądanie filmu?
                <button
                  className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-3"
                  onClick={() => {
                    setFinishInsurance(false);
                    saveSession();
                  }}
                  type="button"
                >
                  Przejdź dalej
                </button>
                <button
                  className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-3"
                  onClick={() => setFinishInsurance(false)}
                  type="button"
                >
                  Powrót
                </button>
              </div>
            )}
          </div>
          {invite?.status !== "delivered" && invite?.status !== "visited" && (
            <>
              <p className="text-white text-lg xl:text-base max-w-[30rem] font-sans mt-3 text-center font-bold mx-auto">
                {invite?.name && `Cześć ${getFirstWord(invite.name)}!`} Wybierz
                godzinę, o której <b>jutro</b> dołączysz do szkolenia.
              </p>

              <div className="flex flex-col my-3 px-3">
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
                  onClick={() =>
                    updateLink(linkId, {
                      ...data,
                      date: data.date.format("MM-DD-YYYY"),
                      id: invite?.id,
                      name: invite?.name,
                      status: "delivered",
                      timeSpent: time,
                    })
                  }
                  disabled={!data.hour}
                  title={
                    !data.hour ? "Wybierz godzinę aby przejść dalej" : "Aktywuj"
                  }
                  className="hover:scale-105 duration-300 disabled:cursor-not-allowed bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] font-sans text-lg text-center text-zinc-800 px-3 py-1 rounded-xl max-w-[40rem] mt-4 mx-auto"
                >
                  Aktywuj link
                </button>
                <div className="text-left mt-6">
                  <div className="text-red-500 w-max font-bold mr-3 text-lg">
                    Uwaga!{" "}
                  </div>{" "}
                  Szkolenie będzie dostępne tylko i wyłącznie w wybranych
                  godzinach dnia{" "}
                  <b>{moment().add(1, "day").format("D MMMM YYYY")}</b>
                </div>
              </div>
            </>
          )}
          {isAfter && !linkUsed && !invite.hasMovieTimeEnded && (
            <div className="text-red-500 font-bold text-2xl mt-4 text-center">
              Link nieaktywny. Te szkolenie było aktywne dnia{" "}
              {moment(invite?.date).format("DD.MM.YYYY")} w godzinach{" "}
              {invite.hour}
            </div>
          )}
          {invite?.finished && invite?.hasMovieTimeEnded && (
            <h2 className="text-green-500 mt-4 font-bold text-3xl text-center">
              Dziękujemy za udział w pierwszym etapie rekrutacji. Skontaktujemy
              się z tobą już wkrótce!
            </h2>
          )}
          {(invite?.status === "delivered" || invite?.status === "visited") && (
            <div className="">
              <p className="flex flex-col items-center justify-center text-white text-lg xl:text-base max-w-[30rem] font-sans mt-3 text-center">
                {!invite?.finished && invite?.hasMovieTimeEnded && (
                  <div className="w-full">
                    <h2 className="text-green-500 my-3 font-bold">
                      Dziękujemy za udział w pierwszym etapie rekrutacji.
                    </h2>
                    {!invite.finished && (
                      <div className="">
                        <p className="text-center max-w-[30rem] mx-auto text-white">
                          Masz jakieś pytania zanim podpiszesz z nami umowę o
                          współpracę? Kliknij tutaj i zapisz się, a biuro do
                          Ciebie na pewno się odezwie.
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
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
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
                            {!isSent && "CHCĘ PRZEJŚĆ DO NASTĘPNEGO ETAPU"}
                            {isSent && "DZIĘKUJEMY"}
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
                {!show &&
                  !isAfter &&
                  !invite.hasMovieTimeEnded &&
                  !invite.finished && (
                    <span className="font-bold text-green-500">
                      Link aktywowano pomyślnie.
                    </span>
                  )}
                {show &&
                  !isAfter &&
                  !invite.hasMovieTimeEnded &&
                  !invite.finished && (
                    <div className="w-full sm:w-[30rem] lg:w-[40rem] lg:px-12">
                      <h2 className=" text-xl bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] bg-clip-text text-transparent font-bold lg:px-12 pt-3 mb-4">
                        Rekrutacja na stanowisko Doradcy Klienta
                      </h2>
                      <video
                        src="https://firebasestorage.googleapis.com/v0/b/decocanva-408fb.appspot.com/o/webinar.mp4?alt=media&token=6b01f5f8-3a23-4773-a64b-fe8c7a0469a8"
                        controls
                        className={`w-full z-50 lg:px-12`}
                        onClick={() =>
                          updateLink(linkId, {
                            ...invite,
                            timeSpent: invite?.timeSpent + time,
                            status: "visited",
                          }).then(() => setTime(0))
                        }
                      />
                      <button
                        onClick={() => {
                          setFinishInsurance(true);
                        }}
                        disabled={isSent}
                        className="disabled:cursor-not-allowed bg-black hover:scale-110 text border-transparent-zinc-800 outline-none focus:outline-none duration-200 text-center p-4 w-max my-12"
                      >
                        <span className="bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] bg-clip-text text-transparent font-bold">
                          PRZEJDŹ DO 2. ETAPU
                        </span>
                      </button>
                    </div>
                  )}
                {!show &&
                  !isAfter &&
                  !invite.finished &&
                  !invite.hasMovieTimeEnded && (
                    <div className="mt-6 text-xl pb-3 px-3">
                      Wróć tutaj {moment(invite?.date).format("DD MMMM YYYY")}{" "}
                      między godziną {invite?.hour} by odebrać dostęp do
                      szkolenia wdrożeniowego.
                    </div>
                  )}
              </p>
              {!invite?.finished && invite?.hasMovieTimeEnded && (
                <p className="text-gray-500 text-sm text-justify mt-12 max-w-[30rem]">
                  Aplikując wyrażam zgodę na przetwarzanie moich danych
                  osobowych zawartych w formularzu rekrutacyjnym przez HEXON
                  GROUP SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ w celu
                  przeprowadzenia procesu rekrutacji zgodnie z przepisami
                  Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z
                  dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w
                  związku z przetwarzaniem danych osobowych i w sprawie
                  swobodnego przepływu takich danych (RODO).
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
// data.date.format("MM-DD-YYYY")
