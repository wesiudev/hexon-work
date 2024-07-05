import { updateLink } from "@/common/firebase";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { id, data } = await request.json();
  if (!id)
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });

  await updateLink(id, data);
  return NextResponse.json({ status: "success" });
}
