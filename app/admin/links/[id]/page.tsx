import { getLinksById } from "@/common/firebase";
import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";
import DeleteCollection from "./DeleteCollection";
import LinksWrapper from "@/components/LinksWrapper";

export default async function Page({ params }: { params: { id: string } }) {
  const links = await getLinksById(params.id);
  return (
    <div>
      <Link
        href="/admin/links"
        className="bg-black py-3 px-6 text-white font-bold text-lg flex items-center"
      >
        <FaLongArrowAltLeft className="mr-2 text-xl" />
        Powrót
      </Link>
      <h2 className="my-12 px-6 text-left text-3xl font-bold text-white">
        Przeglądasz kolekcję linków:{" "}
        <span className="text-green-500">{links.name}</span>
      </h2>
      <div className="px-6">
        <span className="text-red-500">Uwaga!</span>{" "}
        <DeleteCollection id={links.id} />
      </div>
      <LinksWrapper id={params.id!} />
    </div>
  );
}
