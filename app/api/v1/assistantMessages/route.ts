import { NextResponse, NextRequest } from "next/server";
import { createChat } from "completions";
import { pushAssistantMessage } from "@/common/firebase";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: NextRequest) {
  const msg = req.nextUrl.searchParams.get("msg");
  const mode = req.nextUrl.searchParams.get("mode");

  const chat = createChat({
    apiKey: "sk-proj-m5F97TxvGplJe3a2yfloT3BlbkFJG1TEpMpZ3ms6QfONLsMT",
    model: "gpt-3.5-turbo",
  });
  if (mode === "lawyer") {
    await chat.sendMessage("Ping");
    const response = await chat.sendMessage(
      `Jesteś internetowym asystentem AI prawnikiem i odpowiadasz na pytanie. Proszę odpowiedziec na pytanie:(${msg}). Miej pod uwagę fakt, aby zachować zerową odpowiedzialność. Staraj sie pomóc poprowadzic człowieka przez jego problem jak tylko umiesz. Pisz w formie oficjalnej.`,
      {
        expect: {
          // Examples of what the response should look like.
          examples: [
            {
              response:
                "Oczywiście, mogę udzielić ogólnych informacji na ten temat. Prowadzenie działalności gospodarczej na terenie Polski przez obywatela innego kraju jest możliwe, ale wiąże się z pewnymi wymogami prawnymi. Obywatele Unii Europejskiej oraz krajów należących do Europejskiego Obszaru Gospodarczego (EOG) mogą prowadzić działalność gospodarczą w Polsce na tych samych zasadach, co obywatele polscy. Oznacza to, że mają oni prawo do zakładania firm, rejestrowania działalności gospodarczej oraz prowadzenia działalności bez dodatkowych ograniczeń. Obywatele państw spoza UE/EOG muszą spełniać dodatkowe wymagania, takie jak uzyskanie odpowiednich zezwoleń na pobyt i pracę. Mogą oni prowadzić działalność gospodarczą w Polsce, ale zazwyczaj konieczne jest uzyskanie zezwolenia na pobyt czasowy w celu prowadzenia działalności gospodarczej. W niektórych przypadkach mogą być wymagane dodatkowe zezwolenia lub licencje w zależności od rodzaju działalności. Zalecam skonsultowanie się z prawnikiem specjalizującym się w prawie imigracyjnym oraz gospodarczym, aby uzyskać szczegółowe informacje i pomoc w spełnieniu wszystkich wymogów formalnych. Pamiętaj, że przepisy mogą ulegać zmianom, dlatego ważne jest, aby być na bieżąco z aktualnymi regulacjami prawnymi.",
            },
            {
              response:
                "Rozwód w Polsce przeprowadza się na drodze sądowej. Aby uzyskać rozwód, należy złożyć odpowiedni pozew do sądu okręgowego właściwego dla miejsca zamieszkania małżonka. Proces rozwodowy składa się z kilku etapów i wiąże się z pewnymi konsekwencjami prawnymi. Oto szczegółowy przegląd: Procedura przeprowadzenia rozwodu: Złożenie pozwu rozwodowego: Pozew należy złożyć w sądzie okręgowym właściwym dla miejsca zamieszkania małżonka pozwanego. W pozwie należy przedstawić powody rozkładu pożycia małżeńskiego oraz ewentualne dowody na ich poparcie. Do pozwu dołącza się odpis aktu małżeństwa oraz, jeśli są dzieci, odpisy aktów urodzenia dzieci. Opłata sądowa: Złożenie pozwu wiąże się z koniecznością uiszczenia opłaty sądowej. Aktualną wysokość opłaty można sprawdzić w sądzie lub na stronie internetowej sądu. Rozprawa sądowa: Sąd przeprowadza rozprawę, podczas której obie strony mają możliwość przedstawienia swoich argumentów i dowodów. W trakcie rozprawy sąd może przeprowadzić mediację, aby umożliwić małżonkom osiągnięcie porozumienia. Orzeczenie rozwodu: Sąd wydaje wyrok rozwodowy, który może obejmować kwestie dotyczące władzy rodzicielskiej, alimentów, kontaktów z dziećmi oraz podziału majątku.Konsekwencje prawne rozwodu: Rozwiązanie małżeństwa: Rozwód skutkuje formalnym rozwiązaniem małżeństwa, co oznacza, że obie strony są wolne od zobowiązań małżeńskich. Podział majątku: Sąd może orzec o podziale majątku wspólnego małżonków. Podział ten może zostać dokonany w trakcie postępowania rozwodowego lub w odrębnym postępowaniu. Alimenty: Sąd może nałożyć obowiązek alimentacyjny na jednego z małżonków, jeśli uzna, że jest to konieczne do zapewnienia środków utrzymania drugiemu małżonkowi lub dzieciom. Władza rodzicielska i kontakty z dziećmi: Sąd decyduje o władzy rodzicielskiej nad wspólnymi dziećmi oraz o sposobie i częstotliwości kontaktów z dziećmi. Nazwisko: Po rozwodzie małżonek może powrócić do nazwiska noszonego przed zawarciem małżeństwa. W tym celu należy złożyć stosowne oświadczenie w urzędzie stanu cywilnego w terminie trzech miesięcy od uprawomocnienia się wyroku rozwodowego. Zaleca się skorzystanie z pomocy prawnika specjalizującego się w sprawach rodzinnych, aby uzyskać fachowe wsparcie na każdym etapie procesu rozwodowego oraz aby dobrze zrozumieć wszystkie konsekwencje prawne związane z rozwodem.",
            },
          ],
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
      mode: mode,
    });
    return NextResponse.json(response, { status: 200 });
  } else if (mode === "") {
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
      mode: mode,
    });
    return NextResponse.json({ status: "success" });
  } else if (mode === "assistant") {
    await chat.sendMessage("Ping");
    const response = await chat.sendMessage(
      `Jesteś asystentem firmy HEXON zajmujemy się dofinansowaniem na termomodernizacje. Na podstawie tych danych (CO ZAPEWNIAMY?
Audyt wstępny, Projekt, Montaż, Umowa, Audyt techniczny, Finansowanie Docieplenie dachu i elewacji,
Wymiana pieca,Wymiana drzwi,Fotowoltaika, Pompa ciepła lub pellet, Rekuperacja, dofinansowanie do
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
    await pushAssistantMessage({
      content: response.content.response,
      role: "assistant",
      id: uuidv4(),
      mode: mode,
    });
    return NextResponse.json({ status: "success" });
  }
}
