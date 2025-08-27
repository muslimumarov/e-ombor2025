import React, { useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

const Boshliq: React.FC = () => {
    const [activeTab, setActiveTab] = useState("umumiy");

    const pieData = [
        { name: "Cement", value: 36 },
        { name: "Steel", value: 26 },
        { name: "Bricks", value: 22 },
        { name: "Tools", value: 10 },
        { name: "Other", value: 6 },
    ];
    const COLORS = ["#4F46E5", "#22C55E", "#F59E0B", "#EF4444", "#6B7280"];

    const lineData = [
        { month: "Jan", kirish: 120, chiqish: 100 },
        { month: "Feb", kirish: 135, chiqish: 110 },
        { month: "Mar", kirish: 150, chiqish: 130 },
        { month: "Apr", kirish: 170, chiqish: 140 },
        { month: "May", kirish: 180, chiqish: 150 },
        { month: "Jun", kirish: 160, chiqish: 140 },
    ];

    const alerts = [
        { name: "Chelik novdalar 12 mm", current: 15, min: 50, status: "tahdidiy", kerak: 35 },
        { name: "Tsement qoplari 50 kg", current: 25, min: 100, status: "ogohlantirish", kerak: 75 },
        { name: "Xavfsizlik dubulg‘alari", current: 8, min: 20, status: "tahdidiy", kerak: 12 },
    ];

    return (
        <div className="min-h-screen overflow-y-auto bg-gray-50 dark:bg-[#1E293B]">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between border-b bg-white p-4 dark:bg-[#1E293B] dark:text-white">
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:underline dark:text-gray-300">
                    ⬅ Boshqaruv paneli sahifasiga qaytish
                </button>
            </div>

            <div className="mx-auto max-w-6xl p-4 sm:p-6">
                {/* Ombor Info */}
                <h1 className="mb-2 text-2xl font-bold dark:text-white sm:text-3xl">Ombor A</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300 sm:text-base">
                    Downtown tumani • Menejer: Jon Smit
                </p>

                {/* Statistik Kartalar */}
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg bg-white p-4 shadow dark:bg-slate-800 dark:text-white">
                        <p>Jami elementlar</p>
                        <h2 className="text-xl font-bold sm:text-2xl">1250</h2>
                        <p className="text-xs text-gray-500 sm:text-sm">Ilmoqoratinga 78 %</p>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow dark:bg-slate-800 dark:text-white">
                        <p>Umumiy qiymat</p>
                        <h2 className="text-xl font-bold sm:text-2xl">485 000 dollar</h2>
                        <p className="text-xs text-gray-500 sm:text-sm">
                            Har bir mahsulot uchun o‘rtacha 388 dollar
                        </p>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow dark:bg-slate-800 dark:text-white">
                        <p>Foydalanish darajasi</p>
                        <h2 className="text-xl font-bold sm:text-2xl">78 %</h2>
                        <div className="h-2 w-full rounded bg-gray-200 dark:bg-slate-700">
                            <div className="h-2 rounded bg-blue-500" style={{ width: "78%" }}></div>
                        </div>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow dark:bg-slate-800 dark:text-white">
                        <p>Samaradorlik</p>
                        <h2 className="text-xl font-bold sm:text-2xl">92 %</h2>
                        <div className="h-2 w-full rounded bg-gray-200 dark:bg-slate-700">
                            <div className="h-2 rounded bg-green-500" style={{ width: "92%" }}></div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-6 flex flex-wrap gap-2 border-b dark:border-slate-700 sm:gap-4">
                    {["umumiy", "tahlil", "bitimlar", "ishlash"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-2 pb-2 text-sm font-medium sm:px-3 ${
                                activeTab === tab
                                    ? "border-b-2 border-purple-600 text-purple-600"
                                    : "text-gray-500 dark:text-gray-300"
                            }`}
                        >
                            {tab === "umumiy" && "Umumiy ko‘rinish"}
                            {tab === "tahlil" && "Inventarizatsiya tahlili"}
                            {tab === "bitimlar" && "Bitimlar"}
                            {tab === "ishlash" && "Ishlash"}
                        </button>
                    ))}
                </div>

                {/* Content */}
                {activeTab === "umumiy" && (
                    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Pie Chart */}
                        <div className="rounded-lg bg-white p-4 shadow dark:bg-slate-800">
                            <h3 className="mb-4 text-sm font-semibold dark:text-white sm:text-base">
                                Kategoriya bo‘yicha inventarizatsiya
                            </h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                                        {pieData.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Line Chart */}
                        <div className="rounded-lg bg-white p-4 shadow dark:bg-slate-800">
                            <h3 className="mb-4 text-sm font-semibold dark:text-white sm:text-base">
                                Oylik faoliyat tendensiyalari
                            </h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={lineData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="kirish" stroke="#22C55E" strokeWidth={2} />
                                    <Line type="monotone" dataKey="chiqish" stroke="#6366F1" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* Alerts */}
                <div className="mt-6 rounded-lg bg-white p-4 shadow dark:bg-slate-800">
                    <h3 className="mb-4 text-sm font-semibold dark:text-white sm:text-base">
                        ⚠ Kam zaxiralar haqida ogohlantirishlar
                    </h3>
                    <ul className="space-y-3">
                        {alerts.map((a, i) => (
                            <li
                                key={i}
                                className="flex flex-wrap items-center justify-between rounded border p-3 dark:border-slate-700"
                            >
                                <div className="min-w-[200px]">
                                    <p className="font-medium dark:text-white">{a.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                                        Joriy: {a.current} | Minimal: {a.min}
                                    </p>
                                </div>
                                <span
                                    className={`mt-2 rounded-full px-3 py-1 text-xs font-semibold sm:mt-0 ${
                                        a.status === "tahdidiy"
                                            ? "bg-red-100 text-red-600"
                                            : "bg-yellow-100 text-yellow-600"
                                    }`}
                                >
                  {a.kerak} kerak
                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Boshliq;
