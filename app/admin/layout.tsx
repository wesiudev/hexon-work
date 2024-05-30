"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import LoginPage from "./LoginPage";
import Loading from "./loading";
import { auth } from "@/common/firebase";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <Loading />;
  } else
    return (
      <div className="w-full font-coco fixed left-0 top-0 z-[9999] bg-white">
        {user ? (
          <>
            <div className="min-w-full min-h-screen bg-[#222430]">
              {children}
            </div>
          </>
        ) : (
          <LoginPage />
        )}
      </div>
    );
}
