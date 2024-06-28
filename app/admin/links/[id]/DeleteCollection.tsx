"use client";
import { deleteLink } from "@/common/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteCollection({ id }: { id: any }) {
  const router = useRouter();
  const [deleteInsurance, setDeleteInsurance] = useState(false);
  return (
    <>
      {!deleteInsurance && (
        <button
          onClick={() => setDeleteInsurance(true)}
          className="ml-3 underline text-white font-bold hover:no-underline"
        >
          usuń kolekcję
        </button>
      )}
      {deleteInsurance && (
        <button
          onClick={() => deleteLink(id).then(() => router.push("/admin/links"))}
          className="ml-3 underline text-white font-bold hover:no-underline"
        >
          usuń kolekcję {id}.
        </button>
      )}
    </>
  );
}
