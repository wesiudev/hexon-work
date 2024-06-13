"use client";
import { getLeads } from "@/common/firebase";
import Link from "next/link";
import Leads from "./Applications";

export default async function Page() {
  return <Leads />;
}
