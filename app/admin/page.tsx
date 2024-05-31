"use client";

import Link from "next/link";

export default function Admin() {
  return (
    <div className="flex items-center justify-center flex-col space-y-3 min-h-screen font-sans bg-[#404149] h-full">
      <Link
        href="/admin/leads"
        className="bg-blue-500 text-white text-3xl p-3 font-light"
      >
        Dofinansownie
      </Link>
      <Link
        href="/admin/applications"
        className="bg-green-500 text-white text-3xl p-3 font-light"
      >
        Aplikacje
      </Link>
    </div>
  );
}
