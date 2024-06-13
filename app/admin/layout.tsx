"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import LoginPage from "./LoginPage";
import Loading from "./loading";
import { auth } from "@/common/firebase";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Nav from "../Nav";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavOpen, setNavOpen] = useState(true);
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <Loading />;
  } else
    return (
      <div className="w-full overflow-x-hidden font-coco bg-[#404149]">
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
    );
}
