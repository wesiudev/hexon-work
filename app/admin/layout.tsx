"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import LoginPage from "./LoginPage";
import Loading from "./loading";
import { auth } from "@/common/firebase";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Nav from "../Nav";
import Toast from "../components/Toast";
import { FaLightbulb } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setLight } from "@/common/redux/slices/lightSlice";
import { usePathname } from "next/navigation";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isNavOpen, setNavOpen] = useState(false);
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();
  const { light } = useSelector((state: any) => state.light);
  if (loading) {
    return <Loading />;
  } else
    return (
      <>
        <Toast />
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
              <Nav isNavOpen={isNavOpen} setNavOpen={setNavOpen} />
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
      </>
    );
}
