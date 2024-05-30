import moment from "moment";
import Link from "next/link";

export default function Leads({ leads }: { leads: any[] }) {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 font-sans gap-6">
      {leads.map((lead: any, i: any) => (
        <div key={lead.id} className="bg-zinc-800 p-3">
          <p className="text-sm text-gray-600">id: {lead.id}</p>
          <p className="mt-2">
            dodano: {moment(lead.createdAt).format("DD-MM-YYYY")}
          </p>
          <p className="">Komornik: {lead.debtStatus}</p>
          <p className="">Źródło ciepła: {lead.heatingSource}</p>
          <p className="">Hektary: {lead.hectareCount}</p>
          <p className="">Więcej niż 10 lat: {lead.houseAge}</p>
          <p className="">Rodzaj budynku: {lead.houseType}</p>
          <p className="">Dochody: {lead.incomeLevel}</p>
          <p className="">Właściciel KW: {lead.ownership.toString()}</p>
          <p className="">Numer Telefonu: {lead.phone}</p>
          <p className="">Uczestnicy gospodarstwa: {lead.visitors}</p>
        </div>
      ))}
    </div>
  );
}
