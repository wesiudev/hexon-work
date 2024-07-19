import { FaRobot, FaUser } from "react-icons/fa";

export default function Messages({
  messages,
  mode,
}: {
  messages: any;
  mode?: string;
}) {
  return (
    <div>
      <div className="flex flex-row items-center justify-start">
        <div className="w-max h-max flex items-end justify-end text-2xl text-white bg-zinc-800 m-2 rounded-full aspect-square p-3">
          <FaRobot className="w-6 h-6" />
        </div>
        <div className="bg-blue-500 text-white font-light p-3 rounded-xl max-w-[40rem]">
          Dzień dobry, jestem asystentem HEXON. Jak mogę Ci pomóc? Wpisz
          wiadomość poniżej by otrzymać odpowiedź w mgnieniu oka.
        </div>
      </div>{" "}
      {messages?.length > 0 &&
        messages?.map((message: any, i: any) => (
          <div
            key={i}
            className={`mt-3 text-left flex flex-row items-center justify-start`}
          >
            <>
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
            </>
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
    </div>
  );
}
