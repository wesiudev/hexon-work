import { NextResponse } from "next/server";
import { app } from "@/common/firebase";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
export async function GET() {
  const getData = async () => {
    const ref = collection(getFirestore(app), "links");
    const unsub = onSnapshot(ref, (querySnapshot) => {
      const snapshotData = [];
      querySnapshot.forEach((doc) => {
        snapshotData.push(doc.data());
      });
      const newData = snapshotData.map((item) => item.data);
      return NextResponse.json(newData);
    });
  };
  await getData();
}
