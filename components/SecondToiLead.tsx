import { updateLead, updateSecondLead } from "@/common/firebase";
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
            <td>Imie i nazwisko:</td>
            <td>{lead.name}</td>
          </tr>
          <tr className="bg-gray-600">
            <td>Numer telefonu:</td>
            <td>{lead.pNumber}</td>
          </tr>
          <tr className="bg-gray-700">
            <td>Dostawca:</td>
            <td>{lead.provider}</td>
          </tr>
          <tr className="bg-gray-600">
            <td>Właściciel firmy:</td>
            <td>{lead.owner}</td>
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
              updateSecondLead(lead.id, {
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
