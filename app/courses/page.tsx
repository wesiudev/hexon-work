import Image from "next/image";
import Header from "../components/header";
import Hero from "../components/hero/Hero";
import Link from "next/link";
import CoursesForm from "./CoursesForm";

export default function Page() {
  return (
    <div className="min-h-screen w-full relative">
      <Link href="/" className="absolute left-8 top-6 xl:top-12 z-[501]">
        <Image
          src="/logo-hexon2.png"
          width={400}
          height={400}
          alt=""
          className="w-[170px] sm:w-[200px]"
        />
      </Link>
      <Header view={"courses"} />
      <div className="bg-zinc-800 h-screen w-full fixed left-0 top-0">
        <Hero />
      </div>
      <div className="relative z-50 flex items-center justify-center h-full px-8 py-48">
        <div className="bg-black bg-opacity-50 rounded-3xl p-6 h-max lg:w-3/4 xl:w-3/5 2xl:w-1/2 flex items-center justify-center flex-col">
          <div>
            <h1 className="font-gotham text-3xl bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] bg-clip-text text-transparent text-center">
              Weź udział w bezpłatnym szkoleniu sprzedażowym
            </h1>
            <div className="w-max mx-auto mt-2 text-base bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] bg-clip-text text-transparent font-gotham">
              13.06.2024
            </div>
            <p className="font-sans text-lg text-center text-white max-w-[40rem] mt-4 mx-auto">
              Wypełnij formularz, a my wyślemy wszystkie potrzebne informacje
              dotyczące szkolenia.
            </p>
          </div>
          <CoursesForm />
        </div>
      </div>
    </div>
  );
}
