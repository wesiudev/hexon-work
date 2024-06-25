"use client";

import moment from "moment";
import { useEffect, useState } from "react";
import BasicDatePicker from "./DatePicker";
import dayjs from "dayjs";
import { app, getLinkWithId } from "@/common/firebase";
import { useRouter } from "next/navigation";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import Image from "next/image";

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
  return (
    <>
      {invite?.status !== "delivered" && (
        <>
          <p className="text-white text-sm xl:text-base max-w-[30rem] font-sans mt-3 text-center">
            Aktywuj link, aby dołączyć do wdrażającego szkolenia online. Wybierz
            godzinę, w której będziesz jutro uczestniczyć w szkoleniu.
          </p>
          <div className="flex flex-col my-3">
            <h2
              onClick={() => console.log(invite)}
              className="mt-3 text-xl bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] bg-clip-text text-transparent font-bold"
            >
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
                getLinkWithId(linkId, {
                  ...data,
                  date: data.date.format("MM-DD-YYYY"),
                });
                router.push(`/invite/${linkId}?sent=true`);
              }}
              className="bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] font-sans text-lg text-center text-zinc-800 px-3 py-1 rounded-xl max-w-[40rem] mt-4 mx-auto"
            >
              Aktywuj link
            </button>
          </div>
        </>
      )}
      {invite?.status === "delivered" && (
        <div className="">
          <p className="flex flex-col items-center justify-center text-white text-lg xl:text-base max-w-[30rem] font-sans mt-3 text-center">
            <span className="font-bold text-green-500">
              Link aktywowano pomyślnie.
            </span>{" "}
            <Image
              src="https://cataas.com/cat"
              width={512}
              height={512}
              alt=""
              className="w-[300px] h-auto rounded-3xl my-12"
            />
            <div className="mt-6 text-xl">
              Wróć tutaj {moment(invite?.date).format("MM-DD-YYYY")} między
              godziną {invite?.hour} by odebrać dostęp do szkolenia
              wdrożeniowego.
            </div>
          </p>
        </div>
      )}
    </>
  );
}
// data.date.format("MM-DD-YYYY")
