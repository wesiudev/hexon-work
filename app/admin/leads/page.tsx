"use client";

import { app } from "@/common/firebase";
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
  BarChart,
  Bar,
  PieChart,
  Pie,
  ResponsiveContainer,
} from "recharts";
interface AdminPageProps {
  courses: any[];
  leads: any[];
  applications: any[];
}

export default function Admin() {
  moment.locale("pl");
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
      setData((prevData) => ({ ...prevData, leads: snapshotData }));
    });
    const unsub3 = onSnapshot(ref2, (querySnapshot: any) => {
      const snapshotData: any[] = querySnapshot.docs.map((doc: any) =>
        doc.data()
      );
      setData((prevData) => ({ ...prevData, applications: snapshotData }));
    });
  }, []);

  function generateLeadsChartData(data: any) {
    //find unique month names from leads
    const uniqueMonths = new Set(
      data.map((lead: any) => moment(lead.createdAt).format("MMMM YYYY"))
    );
    const uniqueMonthNames = Array.from(uniqueMonths);

    // {'czerwiec 2024', 'maj 2024'}
    const chartData = uniqueMonthNames
      .map((month: any) => ({
        miesiac: month,
        leady: data
          .filter(
            (lead: any) => moment(lead.createdAt).format("MMMM YYYY") === month
          )
          .sort(
            (a: any, b: any) =>
              moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf()
          ),
      }))
      .sort(
        (a: any, b: any) =>
          moment(a.miesiac).valueOf() - moment(b.miesiac).valueOf()
      );
    return chartData;
  }
  generateLeadsChartData(data.leads);
  const leadsChartData = [
    {
      miesiac: "Maj",
      leady: data.leads.filter(
        (lead: any) =>
          moment(lead.createdAt).year() === 2024 &&
          moment(lead.createdAt).month() === 4
      ).length,
    },
    {
      miesiac: "Czerwiec",
      leady: data.leads.filter(
        (lead: any) =>
          moment(lead.createdAt).year() === 2024 &&
          moment(lead.createdAt).month() === 5
      ).length,
    },
  ];

  const { width } = useWindowDimensions();
  return (
    <div className=" bg-gray-600 min-h-screen grid grid-cols-1 lg:grid-cols-2 -ml-4 -mt-4 p-6 font-sans">
      <div className="text-zinc-800 flex flex-col p-6 bg-zinc-800 h-max ml-4 mt-4">
        <h2 className="text-3xl font-bold font-sans text-white">
          <Link href="/admin/leads/leads" className="flex items-center">
            <FaArrowRight className="mr-2" /> Dofinansowanie
          </Link>
        </h2>
        <div className="mt-4 font-bold text-white">
          <p className="text-xl">Wszystkie Leady: {data.leads.length}</p>
          <p className="text-xl">
            Nowe Leady:{" "}
            {data.leads.filter((lead: any) => !lead.isFinished)?.length}{" "}
          </p>
        </div>
        <div className="mt-4 bg-white p-4">
          <LineChart
            height={500}
            width={width < 1024 ? 0.75 * width : 0.4 * width}
            data={generateLeadsChartData(data.leads)}
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
      </div>
      <div className="text-zinc-800 flex flex-col p-6 bg-zinc-800 h-max ml-4 mt-4">
        <h2 className="text-3xl font-bold font-sans text-white">
          <Link href="/admin/leads/courses" className="flex items-center">
            <FaArrowRight className="mr-2" />
            Szkolenia
          </Link>
        </h2>
        <div className="mt-4 font-bold text-white">
          <p className="text-xl">Wszystkie Leady: {data.courses.length}</p>
          <p className="text-xl">
            Nowe Leady:{" "}
            {data.courses.filter((lead: any) => !lead.isFinished)?.length}{" "}
          </p>
        </div>
        <div className="mt-4 bg-white p-4">
          <LineChart
            height={500}
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
      </div>
      <div className="text-zinc-800 flex flex-col p-6 bg-zinc-800 h-max ml-4 mt-4">
        <h2 className="text-3xl font-bold font-sans text-white">
          <Link href="/admin/leads/applications" className="flex items-center">
            <FaArrowRight className="mr-2" />
            Aplikacje
          </Link>
        </h2>
        <div className="mt-4 font-bold text-white">
          <p className="text-xl">Wszystkie Leady: {data.applications.length}</p>
          <p className="text-xl">
            Nowe Leady:{" "}
            {data.applications.filter((lead: any) => !lead.isFinished)?.length}{" "}
          </p>
        </div>
        <div className="mt-4 bg-white p-4">
          <LineChart
            height={500}
            width={width < 1024 ? 0.75 * width : 0.4 * width}
            data={generateLeadsChartData(data.applications)}
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
      </div>
    </div>
  );
}
