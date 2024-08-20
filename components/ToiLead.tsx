import { updateLead } from "@/common/firebase";
import Link from "next/link";

export default function SecondToiLead({
  lead,
  setAnimationStarted,
  setAnimationCheck,
  animationStarted,
  setOptionsOpen,
  setTrashLead,
}: {
  lead: any;
  setAnimationStarted: any;
  setAnimationCheck: any;
  animationStarted: any;
  setOptionsOpen: any;
  setTrashLead: any;
}) {
  return (
    <div className="w-[375px]">
      <table className="w-full mt-3">
        <tbody>
          <tr className="bg-gray-700">
            <td>Komornik:</td>
            <td>{lead.debtStatus}</td>
          </tr>
          <tr className="bg-gray-600">
            <td>Źródło ciepła:</td>
            <td>{lead.heatingSource}</td>
          </tr>
          <tr className="bg-gray-700">
            <td>Hektary:</td>
            <td>{lead.hectareCount}</td>
          </tr>
          <tr className="bg-gray-600">
            <td>Więcej niż 10 lat:</td>
            <td>{lead.houseAge}</td>
          </tr>
          <tr className="bg-gray-700">
            <td>Rodzaj budynku:</td>
            <td>{lead.houseType}</td>
          </tr>
          <tr className="bg-gray-600">
            <td>Dochody:</td>
            <td>{lead.incomeLevel}</td>
          </tr>
          <tr className="bg-gray-700">
            <td>Właściciel KW:</td>
            <td>{lead.ownership === true ? "Tak" : "Nie"}</td>
          </tr>
          <tr className="bg-gray-600">
            <td>Numer KW:</td>
            <td>
              {lead?.ownerNumber1 &&
              lead?.ownerNumber2 &&
              lead?.ownerNumber3 ? (
                <div className="">
                  {lead?.ownerNumber1} / {lead?.ownerNumber2} /{" "}
                  {lead?.ownerNumber3}
                </div>
              ) : (
                "Nie podano"
              )}{" "}
            </td>
          </tr>
          <tr className="bg-gray-700">
            <td>Numer Telefonu:</td>
            <td>
              {lead.phone} {lead.name}
            </td>
          </tr>
          <tr className="bg-gray-600">
            <td>Uczestnicy gospodarstwa:</td>
            <td>{lead.visitors}</td>
          </tr>
          <tr className="bg-gray-700">
            <td>Region:</td>
            <td>{lead?.region ? lead.region : "Nie podano"}</td>
          </tr>
        </tbody>
      </table>
      {!animationStarted && (
        <button
          onClick={() => {
            setAnimationStarted(true);
            setTimeout(() => {
              setAnimationCheck(true);
            }, 5000);
            setTimeout(() => {
              updateLead(lead.id, {
                ...lead,
                isFinished: true,
                isTrash: true,
                status: "trash",
              }).then(() => {
                setOptionsOpen(false);
                setAnimationCheck(false);
                setTrashLead();
              });
            }, 6000);
          }}
          className="bg-orange-700 py-2 px-6 text-white font-bold w-full"
        >
          Spłucz
        </button>
      )}
    </div>
  );
}
