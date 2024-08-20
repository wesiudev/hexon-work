"use client";
import { app, auth } from "@/common/firebase";
import { useWindowDimensions } from "@/lib/useWindowDimensions";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import "moment/locale/pl";
import { FaArrowRight } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts";
import { useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
interface AdminPageProps {
  courses: any[];
  leads: any[];
  applications: any[];
  nikosLeads: any[];
  secondLeads: any[];
}

export default function Admin() {
  moment.locale("pl");
  const [user, loading] = useAuthState(auth);
  const [data, setData] = useState<AdminPageProps>({
    courses: [],
    leads: [],
    applications: [],
    nikosLeads: [],
    secondLeads: [],
  });
  useEffect(() => {
    const ref1 = collection(getFirestore(app), "leads");
    const ref2 = collection(getFirestore(app), "employees");
    const ref3 = collection(getFirestore(app), "secondLeads");

    const unsub = onSnapshot(ref1, (querySnapshot: any) => {
      const snapshotData: any[] = querySnapshot.docs.map((doc: any) =>
        doc.data()
      );
      if (user?.email === "admin@hexon.work") {
        setData((prevData) => ({
          ...prevData,
          leads: snapshotData.filter((lead: any) => !lead.owner),
          nikosLeads: snapshotData.filter(
            (lead: any) => lead.owner === "nikos"
          ),
        }));
      }
      if (user?.email === "nikos@hexon.work") {
        setData((prevData) => ({
          ...prevData,
          leads: snapshotData.filter((lead: any) => lead.owner === "nikos"),
        }));
      }
    });
    const unsub1 = onSnapshot(ref2, (querySnapshot: any) => {
      const snapshotData: any[] = querySnapshot.docs.map((doc: any) =>
        doc.data()
      );
      setData((prevData) => ({ ...prevData, applications: snapshotData }));
    });
    const unsub2 = onSnapshot(ref3, (querySnapshot: any) => {
      const snapshotData: any[] = querySnapshot.docs.map((doc: any) =>
        doc.data()
      );
      setData((prevData) => ({ ...prevData, secondLeads: snapshotData }));
    });
  }, []);

  function generateLeadsChartData(data: any, key: string) {
    // Find unique month names from leads
    const uniqueMonths = new Set(
      data.map((lead: any) => moment(lead.createdAt).format("MM.YYYY"))
    );
    const uniqueMonthNames = Array.from(uniqueMonths).sort();

    // {'czerwiec 2024', 'maj 2024'}
    const chartData = uniqueMonthNames.map((month: any) => ({
      miesiac: month,
      [key]: data.filter(
        (lead: any) => moment(lead.createdAt).format("MM.YYYY") === month
      ).length,
    }));

    return chartData;
  }
  const { light } = useSelector((state: any) => state.light);
  return (
    <div
      className={`min-h-screen grid lg:grid-cols-2 -ml-4 -mt-4 p-6 font-sans`}
    >
      {
        <div className="flex flex-col">
          <div
            className={`${
              light
                ? "text-zinc-800 bg-white"
                : "text-white bg-zinc-800 duration-300"
            } flex flex-col p-6 h-max ml-4 mt-4 rounded-md`}
          >
            <h2
              className={`text-3xl font-bold font-sans ${
                light ? "text-zinc-800" : "text-white"
              }`}
            >
              <Link href="/admin/leads/leads" className="flex items-center">
                Dofinansowanie <FaArrowRight className="ml-2" />
              </Link>
            </h2>
            <div
              className={`mt-4 p-4 font-bold rounded-xl ${
                light
                  ? `text-white ${
                      user?.email === "admin@hexon.work"
                        ? "bg-[green]"
                        : "bg-[blue]"
                    }`
                  : "text-white bg-zinc-600"
              }`}
            >
              <p className="text-xl">Wszystkie Leady: {data.leads.length}</p>
              <p className="text-xl">
                Nowe Leady:{" "}
                {
                  data.leads.filter(
                    (lead: any) => !lead.isFinished && !lead.isTrash
                  )?.length
                }{" "}
              </p>
            </div>
            {user?.email === "nikos@hexon.work" && (
              <div className="mt-4 bg-blue-100 p-4 rounded-xl">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart
                    data={generateLeadsChartData(data.leads, "leady")}
                    margin={{
                      top: 5,
                      right: 0,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="miesiac" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="leady" stroke="blue" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
            {user?.email === "admin@hexon.work" && (
              <div className="mt-4 bg-green-100 p-4 rounded-xl">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={generateLeadsChartData(data.secondLeads, "leady")}
                    margin={{
                      top: 5,
                      right: 0,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="miesiac" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="leady" fill="green" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
          <div
            className={`${
              light
                ? "text-zinc-800 bg-white"
                : "text-white bg-zinc-800 duration-300"
            } flex flex-col p-6 h-max ml-4 mt-4 rounded-md`}
          >
            <h2
              className={`text-3xl font-bold font-sans ${
                light ? "text-zinc-800" : "text-white"
              }`}
            >
              <div className="flex flex-col">
                <Link
                  href="/admin/leads/second-leads"
                  className="flex items-center"
                >
                  Dofinansowanie <FaArrowRight className="ml-2" />
                </Link>
                <div className="text-base font-light">(prąd)</div>
              </div>
            </h2>
            <div
              className={`mt-4 p-4 font-bold rounded-xl ${
                light
                  ? `text-white ${
                      user?.email === "admin@hexon.work"
                        ? "bg-[red]"
                        : "bg-[blue]"
                    }`
                  : "text-white bg-zinc-600"
              }`}
            >
              <p className="text-xl">
                Wszystkie Leady: {data.secondLeads.length}
              </p>
              <p className="text-xl">
                Nowe Leady:{" "}
                {
                  data.secondLeads.filter(
                    (lead: any) => !lead.isFinished && !lead.isTrash
                  )?.length
                }{" "}
              </p>
            </div>
            {user?.email === "admin@hexon.work" && (
              <div className="mt-4 bg-red-100 p-4 rounded-xl">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={generateLeadsChartData(data.secondLeads, "leady")}
                    margin={{
                      top: 5,
                      right: 0,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="miesiac" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="leady" fill="red" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      }
      {user?.email === "admin@hexon.work" && (
        <div className="flex flex-col">
          <div
            className={`${
              light
                ? "text-zinc-800 bg-white"
                : "text-white bg-zinc-800 duration-300"
            } flex flex-col p-6 h-max ml-4 mt-4 rounded-md`}
          >
            <h2
              className={`text-3xl font-bold font-sans ${
                light ? "text-zinc-800" : "text-white"
              }`}
            >
              <Link
                href="/admin/leads/applications"
                className="flex items-center"
              >
                <FaArrowRight className="mr-2" />
                Aplikacje
              </Link>
            </h2>
            <div
              className={`mt-4 p-4 font-bold rounded-xl ${
                light ? "text-white bg-[green]" : "text-white bg-zinc-600"
              }`}
            >
              <p className="text-xl">
                Wszystkie aplikacje: {data.applications.length}
              </p>
              <p className="text-xl">
                Nowe aplikacje:{" "}
                {
                  data.applications.filter((lead: any) => !lead.isFinished)
                    ?.length
                }{" "}
              </p>
            </div>
            <div className="mt-4 bg-green-100 p-4 rounded-xl">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart
                  data={generateLeadsChartData(data.applications, "aplikacje")}
                  margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="miesiac" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="aplikacje" stroke="green" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div
            className={`${
              light
                ? "text-zinc-800 bg-white"
                : "text-white bg-zinc-800 duration-300"
            } flex flex-col p-6 h-max ml-4 mt-4 rounded-md`}
          >
            <h2
              className={`text-3xl font-bold font-sans ${
                light ? "text-zinc-800" : "text-white"
              }`}
            >
              <Link
                href="/admin/leads/leads-nikodem"
                className="flex items-center"
              >
                Dofinansowanie <FaArrowRight className="ml-2" />
              </Link>
            </h2>
            <span className="text-sm">(Nikodem)</span>
            <div
              className={`mt-4 p-4 font-bold rounded-xl ${
                light ? `text-white bg-[blue]` : "text-white bg-zinc-600"
              }`}
            >
              <p className="text-xl">
                Wszystkie Leady: {data.nikosLeads.length}
              </p>
              <p className="text-xl">
                Nowe Leady:{" "}
                {
                  data.nikosLeads.filter(
                    (lead: any) => !lead.isFinished && !lead.isTrash
                  )?.length
                }{" "}
              </p>
            </div>

            <div className="mt-4 bg-blue-100 p-4 rounded-xl">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart
                  data={generateLeadsChartData(data.nikosLeads, "leady")}
                  margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="miesiac" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="leady" stroke="blue" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
