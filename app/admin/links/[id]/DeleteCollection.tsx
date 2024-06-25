"use client";
import { deleteLink } from "@/common/firebase";
import { useRouter } from "next/navigation";

export default function DeleteCollection({ id }: { id: any }) {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        deleteLink(id).then(() => router.push("/admin/links"));
      }}
      className="ml-3 underline text-white font-bold hover:no-underline"
    >
      usuń kolekcję
    </button>
  );
}
