import { FaStar } from "react-icons/fa";

const opinions = [
  {
    name: "Wiesława Sokólska",
    opinion:
      "Instalacje użytkuje od 2lat. Płacę za prąd 35zł miesięcznie ogrzewając dom również pompą. Jednego dnia straciłem połączenie z aplikacją w telefonie, ale firma szybko zaradziła problemowi. Bardzo polecam..",
    rating: "5",
  },
  {
    name: "Andrzej Karkowski",
    opinion:
      "Długo zbieraliśmy się z decyzją montażu instalacji fotowoltaicznej w zestawie z pompą ciepła, jednak Pan Marek świetnie wyjaśnił nam poszczególne etapy montażu…",
    rating: "5",
  },
  {
    name: "Ricks V.",
    opinion:
      "Sprawnie wykonana usługa. Profesjonalne podejście i terminowość. Pompa daje radę przy aktualnych -12 stopniach.…",
    rating: "5",
  },
  {
    name: "Alan Project",
    opinion:
      "Sprzęt śmiga od roku. Po czasie mogę stwierdzić, że inwestycja była tego warta.…",
    rating: "5",
  },
  {
    name: "Cezary Kas",
    opinion:
      "Polecam tą firmę z całego serducha, firma bardzo rzetelna i przede wszystkim uczciwa a trudno dzisiaj o taką... Ekipa monterska na wysokim poziomie kultury…",
    rating: "5",
  },
  {
    name: "Michał Broniewski",
    opinion:
      "Nic dodać nic ująć. Jestem zadowolony, zarówno estetycznie jak i zgodnie ze sztuką. Jeden sezon za mną i wszystko gra jak z nut. Gorąco polecam :)",
    rating: "5",
  },
  {
    name: "Hubert Ozimkiewicz",
    opinion:
      "Instalacja półtorej roku na dachu, rachunki za prąd już nie straszą.",
    rating: "5",
  },
  {
    name: "Jarosław Lipkowski",
    opinion: "Super. Profesjonalna i miła obsługa.",
    rating: "5",
  },
];

export default function Opinions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 font-gotham">
      {opinions.map((opinion, index) => (
        <div
          data-aos="fade-up"
          aos-duration="300"
          className={`flex flex-col justify-center border-t border-green-500 p-6 relative`}
          key={index}
        >
          <div className="rounded-full w-10 h-10 text-white font-bold flex items-center justify-center text-2xl">
            {opinion.name.charAt(0).toUpperCase()}
          </div>
          <span className="font-bold text-2xl">{opinion.name}</span>
          <p className="mt-4 text-base font-light">{opinion.opinion}</p>
          <div className="flex flex-row items-center text-yellow-400 mt-2">
            <FaStar className="h-4 w-4" />
            <FaStar className="h-4 w-4" />
            <FaStar className="h-4 w-4" />
            <FaStar className="h-4 w-4" />
            <FaStar className="h-4 w-4" />
          </div>
        </div>
      ))}
    </div>
  );
}
