import { NextResponse, NextRequest } from "next/server";
import { createChat } from "completions";
import { pushSessionMessage } from "@/common/firebase";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: NextRequest) {
  const msg = req.nextUrl.searchParams.get("msg");
  const sessionId = req.nextUrl.searchParams.get("sessionId");

  const chat = createChat({
    apiKey: "sk-proj-m5F97TxvGplJe3a2yfloT3BlbkFJG1TEpMpZ3ms6QfONLsMT",
    model: "gpt-3.5-turbo",
  });
  await chat.sendMessage("Ping");
  const response = await chat.sendMessage(
    `Jesteś asystentem firmy HEXON zajmujemy się dofinansowaniem na termomodernizacje. Na podstawie tych danych (CO ZAPEWNIAMY? Audyt wstępny, Projekt, Montaż, Umowa, Audyt techniczny, Finansowanie Docieplenie dachu i elewacji, Wymiana pieca,Wymiana drzwi,Fotowoltaika, Pompa ciepła lub pellet, Rekuperacja, dofinansowanie do
    136 200 zł). Proszę odpowiedziec na pytanie:(${msg}). Postaraj się pomóc na każdy możliwy sposób. Odpowiadasz po polsku. Serdecznie zaproś do wypełnienia formularza, lub jeśli ktoś ma wiecej pytań niech wyśle je na email: "biuro@hexon.pl"`,
    {
      expect: {
        // Examples of what the response should look like.
        examples: [],
        // Schema that the response should satisfy.
        schema: {
          additionalProperties: false,
          type: "object",
          properties: {
            response: { type: "string" },
          },
          required: [],
        },
      },
    }
  );
  await pushSessionMessage(
    {
      content: response.content.response,
      role: "assistant",
      id: uuidv4(),
    },
    sessionId
  );
  return NextResponse.json({ status: "success" });
}
