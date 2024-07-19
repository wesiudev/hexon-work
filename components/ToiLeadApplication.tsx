import { updateApplication } from "@/common/firebase";

export default function ToiLeadApplication({
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
            <td>Email:</td>
            <td>{lead.email}</td>
          </tr>
          <tr className="bg-gray-700">
            <td>Imię i nazwisko:</td>
            <td>{lead.name}</td>
          </tr>
          <tr className="bg-gray-700">
            <td>Tel:</td>
            <td>{lead.phoneNumber}</td>
          </tr>
          <tr className="bg-gray-700">
            <tr className="bg-gray-700">
              <td colSpan={2}>
                <a
                  href={lead.file}
                  download
                  className="text-white underline font-light"
                >
                  Pobierz CV
                </a>
              </td>
            </tr>
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
              updateApplication(lead.id, {
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
