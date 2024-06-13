"use client";
import { useRouter } from "next/navigation";
import Loading from "./loading";

export default function Admin() {
  const router = useRouter();
  router.push("/admin/leads");
  return (
    <div className="flex items-center justify-center flex-col space-y-3 min-h-screen bg-[#404149] h-full font-sans">
      <Loading />
    </div>
  );
}
