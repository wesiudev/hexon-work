"use client";
import { pushAssistantMessage } from "@/common/firebase";
import { useState } from "react";
import { FaRobot, FaUser } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
async function getAnswer(question: string) {
  const answer = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/assistant?msg=${question}`,
    { cache: "no-store" }
  );
  return answer;
}
export default function Assistant({ messages }: { messages: any[] }) {
  const [userQuestion, setUserQuestion] = useState("");
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <>
      <div className="fixed bottom-3 right-3 lg:bottom-6 lg:right-6 z-[1999]">
        {" "}
        <button
          onClick={() => setAssistantOpen(!assistantOpen)}
          className="p-3 bg-green-500 text-white rounded-full"
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
          <h2 className="text-2xl font-bold text-center mb-12 text-zinc-800">
            Asystent AI
          </h2>
          <div className="mt-6 flex flex-col max-h-[50vh] w-full overflow-y-scroll scrollbar p-6 pb-24">
            {messages.length === 0 && (
              <div className="text-zinc-800">Brak wiadomości...</div>
            )}
            {messages.length > 0 &&
              messages.map((message: any, i: any) => (
                <div
                  key={i}
                  className={`${
                    i !== 0 && "mt-3"
                  } text-left flex flex-row items-center justify-start`}
                >
                  {message.role === "assistant" && (
                    <div className="w-max h-max flex items-end justify-end text-2xl text-white bg-zinc-800 m-2 rounded-full aspect-square p-3">
                      <FaRobot className="w-6 h-6" />
                    </div>
                  )}
                  {message.role === "user" && (
                    <div className="w-max h-max flex items-end justify-end text-2xl text-white bg-zinc-800 m-2 rounded-full aspect-square p-3">
                      <FaUser className="w-6 h-6" />
                    </div>
                  )}
                  <div
                    className={`w-[80%] p-3 rounded-md ${
                      message.role === "user"
                        ? "bg-green-300 text-zinc-800 font-light"
                        : "bg-gray-300 text-zinc-800 font-light"
                    }`}
                  >
                    {message?.content}
                  </div>{" "}
                </div>
              ))}
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
                });
                getAnswer(userQuestion).then((res) => {
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
