"use client";
import { getLeads } from "@/common/firebase";
import Link from "next/link";
import Leads from "./Leads";

export default async function Page() {
  return <Leads />;
}
