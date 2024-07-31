"use client";
import { pushAssistantMessage } from "@/common/firebase";
import { useState } from "react";
import { FaRobot } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import Messages from "./Messages";
async function getAnswer(question: string, mode: string) {
  const answer = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/assistantMessages?msg=${question}&mode=${mode}`,
    { cache: "no-store" }
  );
  return answer;
}
export default function Assistant({
  messages,
  mode,
  setMode,
}: {
  messages: any[];
  mode: string;
  setMode: Function;
}) {
  const [userQuestion, setUserQuestion] = useState("");
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
  const lawyerMessages = messages.filter(
    (message) => message.mode === "lawyer"
  );
  const assistant = messages.filter((message) => message.mode === "assistant");
  const assistantMessages = messages.filter(
    (message) =>
      (message.role === "assistant" || message.role === "user") &&
      (message.mode === "" ||
        !message.mode ||
        message.mode === typeof undefined) &&
      message.mode !== "assistant" &&
      message.mode !== "lawyer"
  );

  return (
    <>
      <div className="fixed bottom-3 right-3 lg:bottom-6 lg:right-6 z-[2999]">
        {" "}
        <button
          onClick={() => setAssistantOpen(!assistantOpen)}
          className={`p-3 text-white rounded-full ${
            assistantOpen
              ? "scale-150 duration-500 bg-green-500"
              : "scale-100 duration-200 bg-gray-500"
          }`}
        >
          <FaRobot className="text-3xl lg:text-4xl" />
        </button>
      </div>
      <div
        onClick={() => setAssistantOpen(!assistantOpen)}
        className={`z-[1999] overflow-y-scroll scrollbar h-full w-full fixed font-gotham bg-black flex items-center justify-center ${
          assistantOpen ? "bg-opacity-90 -left-0" : "bg-opacity-0 -left-[300vw]"
        }`}
      >
        <div
          onClick={(e: any) => {
            e.stopPropagation();
          }}
          className="w-full sm:w-[80%] lg:w-[50%] xl:w-[50rem] h-max p-3 lg:p-6 bg-white"
        >
          <h2 className="text-2xl font-bold text-center mb-2 text-zinc-800">
            Asystent AI
          </h2>
          <div className="grid grid-cols-3 gap-3 sm:gap-6">
            <button
              onClick={() => setMode("assistantMessages")}
              className="bg-black text-white font-bold text-sm py-1"
            >
              Ogólny
            </button>
            <button
              onClick={() => setMode("lawyer")}
              className="bg-black text-white font-bold text-sm py-1"
            >
              Prawnik
            </button>
            <button
              onClick={() => setMode("assistant")}
              className="bg-black text-white font-bold text-sm py-1"
            >
              Asystent HEXON
            </button>
          </div>
          <div className="mt-6 flex flex-col max-h-[40vh] sm:max-h-[50vh] w-full overflow-y-scroll scrollbar p-6 pb-24">
            {mode === "assistant" && (
              <>
                {assistant.length === 0 && (
                  <div className="text-zinc-800">Brak wiadomości...</div>
                )}
                <Messages messages={assistant} mode={mode} />
                {loading && (
                  <div className="flex flex-row items-center">
                    <div className="w-max h-max flex items-end justify-end text-2xl text-white bg-zinc-800 m-2 rounded-full aspect-square p-3">
                      <FaRobot className="w-6 h-6" />
                    </div>
                    <p className="w-[80%] p-3 rounded-md bg-gray-300 text-zinc-800 font-light">
                      Proszę czekać...
                    </p>
                  </div>
                )}
              </>
            )}
            {mode === "assistantMessages" && (
              <>
                {assistantMessages.length === 0 && (
                  <div className="text-zinc-800">Brak wiadomości...</div>
                )}
                <Messages messages={assistantMessages} mode={mode} />
                {loading && (
                  <div className="flex flex-row items-center">
                    <div className="w-max h-max flex items-end justify-end text-2xl text-white bg-zinc-800 m-2 rounded-full aspect-square p-3">
                      <FaRobot className="w-6 h-6" />
                    </div>
                    <p className="w-[80%] p-3 rounded-md bg-gray-300 text-zinc-800 font-light">
                      Proszę czekać...
                    </p>
                  </div>
                )}
              </>
            )}
            {mode === "lawyer" && (
              <>
                {lawyerMessages.length === 0 && (
                  <div className="text-zinc-800">Brak wiadomości...</div>
                )}
                <Messages messages={lawyerMessages} mode={mode} />
                {loading && (
                  <div className="flex flex-row items-center">
                    <div className="w-max h-max flex items-end justify-end text-2xl text-white bg-zinc-800 m-2 rounded-full aspect-square p-3">
                      <FaRobot className="w-6 h-6" />
                    </div>
                    <p className="w-[80%] p-3 rounded-md bg-gray-300 text-zinc-800 font-light">
                      Proszę czekać...
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="lg:mx-6 mt-6">
            <input
              type="text"
              onChange={(e) => setUserQuestion(e.target.value)}
              value={userQuestion}
              placeholder="Wpisz pytanie..."
              className=" w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-800 font-bold"
            />
            <button
              disabled={loading}
              onClick={() => {
                setLoading(true);
                pushAssistantMessage({
                  content: userQuestion,
                  role: "user",
                  id: uuidv4(),
                  mode: mode === "assistantMessages" ? "" : mode,
                });
                getAnswer(userQuestion, mode).then((res) => {
                  setLoading(false);
                });
              }}
              className=" mt-3 disabled:opacity-50 disabled:cursor-not-allowed w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Wyślij
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
