import { NextResponse, NextRequest } from "next/server";
import { createChat } from "completions";
import { pushAssistantMessage } from "@/common/firebase";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: NextRequest) {
  const msg = req.nextUrl.searchParams.get("msg");

  const chat = createChat({
    apiKey: "sk-proj-m5F97TxvGplJe3a2yfloT3BlbkFJG1TEpMpZ3ms6QfONLsMT",
    model: "gpt-3.5-turbo",
  });

  await chat.sendMessage("Ping");
  const response = await chat.sendMessage(
    `Proszę odpowiedziec na pytanie:(${msg}). Postaraj się pomóc na każdy możliwy sposób. Odpowiadasz po polsku.`,
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
  await pushAssistantMessage({
    content: response.content.response,
    role: "assistant",
    id: uuidv4(),
  });
  return NextResponse.json({ status: "success" });
}
