import { getPublicSessions } from "@/common/firebase";

export default async function Page() {
  const publicSessions = await getPublicSessions();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
      {publicSessions.map((item: any, i: any) => (
        <>
          {item.messages.length > 0 && (
            <div key={i}>
              {item.messages.map((message: any, i: number) => (
                <div
                  className={`${
                    message.role === "user" ? "bg-green-500" : "bg-gray-500"
                  }`}
                  key={i}
                >
                  {message.role === "user" && (
                    <b className="font-bold text-xl">
                      PYTANIE OD UŻYTKOWNIKA: <b>{message.content}</b>
                    </b>
                  )}
                  {message.role === "assistant" && <>{message.content}</>}
                </div>
              ))}
            </div>
          )}
        </>
      ))}
    </div>
  );
}
