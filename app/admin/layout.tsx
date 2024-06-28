"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import LoginPage from "./LoginPage";
import Loading from "./loading";
import { app, auth } from "@/common/firebase";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Toast from "../components/Toast";
import { FaLightbulb } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setLight } from "@/common/redux/slices/lightSlice";
import { usePathname } from "next/navigation";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import dynamic from "next/dynamic";
const Nav = dynamic(() => import("./Nav"), { ssr: false });
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [messages, setMessages] = useState<any[]>([]);
  useEffect(() => {
    const ref = collection(getFirestore(app), "messages");
    const unsub = onSnapshot(ref, (querySnapshot: any) => {
      const snapshotData: any[] = [];
      querySnapshot.forEach((doc: any) => {
        snapshotData.push(doc.data());
      });
      setMessages(snapshotData);
    });
  }, []);
  const pathname = usePathname();
  const [isNavOpen, setNavOpen] = useState(false);
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();

  const { light } = useSelector((state: any) => state.light);

  return (
    <>
      <Toast />
      {!loading && (
        <div className="relative w-full overflow-x-hidden font-coco bg-[#404149] font-sans">
          {!pathname.includes("/leads/leads") &&
            !pathname.includes("/leads/courses") &&
            !pathname.includes("/leads/applications") && (
              <button
                onClick={() => dispatch(setLight(!light))}
                className="absolute right-6 top-6"
              >
                <FaLightbulb
                  className={`text-4xl ${
                    light ? "text-yellow-400" : "text-white"
                  }`}
                />
              </button>
            )}
          {user ? (
            <>
              <Nav
                isNavOpen={isNavOpen}
                setNavOpen={setNavOpen}
                messages={messages}
              />
              <div className={` duration-500 w-full pt-24 scrollbar`}>
                <Link href="/" className="absolute left-20 top-6 z-50">
                  <Image
                    src="/logo-hexon2.png"
                    width={200}
                    height={200}
                    alt=""
                    className="w-[150px]"
                  />
                </Link>

                {children}
              </div>
            </>
          ) : (
            <LoginPage />
          )}
        </div>
      )}
      {loading && <Loading />}
    </>
  );
}
