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
}

export default function Admin() {
  moment.locale("pl");
  const [user, loading] = useAuthState(auth);
  const [data, setData] = useState<AdminPageProps>({
    courses: [],
    leads: [],
    applications: [],
  });
  useEffect(() => {
    const ref = collection(getFirestore(app), "courses");
    const ref1 = collection(getFirestore(app), "leads");
    const ref2 = collection(getFirestore(app), "employees");
    const unsub = onSnapshot(ref, (querySnapshot: any) => {
      const snapshotData: any[] = querySnapshot.docs.map((doc: any) =>
        doc.data()
      );
      setData((prevData) => ({ ...prevData, courses: snapshotData }));
    });
    const unsub2 = onSnapshot(ref1, (querySnapshot: any) => {
      const snapshotData: any[] = querySnapshot.docs.map((doc: any) =>
        doc.data()
      );
      if (user?.email === "admin@hexon.work") {
        setData((prevData) => ({
          ...prevData,
          leads: snapshotData.filter((lead: any) => !lead.owner),
        }));
      }
      if (user?.email === "nikos@hexon.work") {
        setData((prevData) => ({
          ...prevData,
          leads: snapshotData.filter((lead: any) => lead.owner === "nikos"),
        }));
      }
    });
    const unsub3 = onSnapshot(ref2, (querySnapshot: any) => {
      const snapshotData: any[] = querySnapshot.docs.map((doc: any) =>
        doc.data()
      );
      setData((prevData) => ({ ...prevData, applications: snapshotData }));
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
  const { width } = useWindowDimensions();
  return (
    <div
      className={`min-h-screen grid lg:grid-cols-2 -ml-4 -mt-4 p-6 font-sans`}
    >
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
            <ResponsiveContainer width="100%" height={width < 768 ? 300 : 700}>
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
                <Bar dataKey="leady" fill="green" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      {/* <div
        className={`${
          light
            ? "text-zinc-800 bg-white"
            : "text-white bg-zinc-800 duration-300"
        } flex flex-col p-6 h-max ml-4 mt-4`}
      >
        <h2
          className={`text-3xl font-bold font-sans ${
            light ? "text-zinc-800" : "text-white"
          }`}
        >
          <Link href="/admin/leads/courses" className="flex items-center">
            <FaArrowRight className="mr-2" />
            Szkolenia
          </Link>
        </h2>
        <div
          className={`mt-4 p-3 font-bold ${
            light ? "text-zinc-800 bg-gray-300" : "text-white bg-zinc-600"
          }`}
        >
          <p className="text-xl">Wszystkie Leady: {data.courses.length}</p>
          <p className="text-xl">
            Nowe Leady:{" "}
            {data.courses.filter((lead: any) => !lead.isFinished)?.length}{" "}
          </p>
        </div>
        <div className="mt-4 bg-white p-4">
          <LineChart
            height={300}
            width={width < 1024 ? 0.75 * width : 0.4 * width}
            data={generateLeadsChartData(data.courses)}
            margin={{
              top: 5,
              right: 30,
              left: 20,
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
        </div>
      </div> */}
      {user?.email === "admin@hexon.work" && (
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
      )}
    </div>
  );
}
