"use client";

import { auth } from "@/common/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  function emailPasswordLogin() {
    if (email.includes("@") && email.includes(".")) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {})
        .catch((error) => {
          if (error.code === "auth/user-not-found") {
            setEmailError("Niepoprawne dane.");
            setTimeout(() => {
              setEmailError("");
            }, 7500);
          }
        });
    } else if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Wpisz poprawny login");
      setTimeout(() => {
        setEmailError("");
      }, 7500);
    }
    if (password.length < 6) {
      setPasswordError("Błędne hasło");
      setTimeout(() => {
        setPasswordError("");
      }, 7500);
    }
  }
  return (
    <div className="font-sans relative flex flex-col h-screen justify-center items-center bg-gray-100 overflow-hidden">
      <form className="flex flex-col w-full max-w-sm p-6 bg-white rounded-lg shadow-md relative z-50">
        <label className="text-gray-700 font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border text-black border-gray-400 p-2 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Email"
          required
        />
        <label className="text-gray-700 font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border text-black border-gray-400 p-2 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Password"
          required
        />
        <h3
          className={`h-px ${
            (emailError || passwordError) && "!h-6 mb-8 duration-500"
          }  duration-500`}
        >
          {emailError && emailError}, {passwordError && passwordError}
        </h3>
        <button
          onClick={(e) => {
            e.preventDefault();
            emailPasswordLogin();
          }}
          type="submit"
          className="bg-green-400 text-white py-2 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Login
        </button>
      </form>{" "}
      <h1 className="text-center text-2xl  bg-gradient-to-br from-zinc-600 via-zinc-600 to-zinc-600 text-white p-3 rounded-b-xl relative z-50">
        <Image
          src="/logo-hexon2.png"
          width={200}
          height={200}
          alt=""
          className=""
        />
      </h1>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-400 via-blue-500 to-red-500 opacity-25"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-green-400 via-blue-500 to-red-500 opacity-25"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-400 via-blue-500 to-red-500 opacity-25 transform rotate-45"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-green-400 via-blue-500 to-red-500 opacity-25 transform -rotate-45"></div>
    </div>
  );
}
