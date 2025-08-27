import React, { useState } from "react";

const Omborchi: React.FC = () => {
    const [activeTab, setActiveTab] = useState("oxirgi");

    const tabs = [
        { key: "oxirgi", label: "Oxirgi operatsiyalar" },
        { key: "kirish", label: "Omborga kirish" },
        { key: "chiqish", label: "Ombordan chiqish" },
    ];

    const operations = [
        {
            type: "Kirish",
            element: "Tsement qoplari",
            amount: 100,
            warehouse: "Ombor A",
            date: "2024-01-15",
            operator: "Jon Doe",
        },
        {
            type: "Chiqish",
            element: "Chelik novdalar",
            amount: 50,
            warehouse: "Ombor A",
            date: "2024-01-14",
            operator: "Jon Doe",
        },
    ];

    return (
        <div className="min-h-screen overflow-y-auto bg-gray-50 p-4 dark:bg-[#1E293B] sm:p-6">
            <div className="mx-auto max-w-5xl">
                {/* Sarlavha */}
                <h1 className="mb-2 text-2xl font-bold dark:text-white sm:text-3xl">
                    Ombor boshqaruvi
                </h1>
                <p className="mb-6 text-sm text-gray-600 dark:text-gray-300 sm:text-base">
                    Omborga kirish va chiqishlarni boshqaring
                </p>

                {/* Tabs */}
                <div className="mb-6 flex gap-4 overflow-x-auto border-b pb-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`whitespace-nowrap px-2 pb-2 text-sm font-medium transition-colors ${
                                activeTab === tab.key
                                    ? "border-b-2 border-black font-bold text-black dark:text-white"
                                    : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Jadval */}
                {activeTab === "oxirgi" && (
                    <div className="overflow-x-auto rounded-lg bg-white p-4 shadow dark:bg-slate-800">
                        <h2 className="mb-4 text-base font-semibold dark:text-white sm:text-lg">
                            Oxirgi operatsiyalar
                        </h2>

                        {/* Katta ekranda jadval, kichikda card */}
                        <div className="hidden md:block">
                            <table className="w-full border-collapse text-sm">
                                <thead>
                                <tr className="bg-gray-100 text-left dark:bg-slate-700">
                                    <th className="p-2">Turi</th>
                                    <th className="p-2">Element</th>
                                    <th className="p-2">Miqdori</th>
                                    <th className="p-2">Ombor</th>
                                    <th className="p-2">Sana</th>
                                    <th className="p-2">Operator</th>
                                </tr>
                                </thead>
                                <tbody>
                                {operations.map((op, idx) => (
                                    <tr key={idx} className="border-t dark:border-slate-600">
                                        <td
                                            className={`p-2 font-medium ${
                                                op.type === "Kirish"
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }`}
                                        >
                                            {op.type}
                                        </td>
                                        <td className="p-2 dark:text-gray-200">{op.element}</td>
                                        <td className="p-2 dark:text-gray-200">{op.amount}</td>
                                        <td className="p-2 dark:text-gray-200">{op.warehouse}</td>
                                        <td className="p-2 dark:text-gray-200">{op.date}</td>
                                        <td className="p-2 dark:text-gray-200">{op.operator}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobil versiya: card list */}
                        <div className="space-y-4 md:hidden">
                            {operations.map((op, idx) => (
                                <div
                                    key={idx}
                                    className="rounded-md border p-3 dark:border-slate-600"
                                >
                                    <div className="flex justify-between">
                                        <span
                                            className={`font-medium ${
                                                op.type === "Kirish"
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }`}
                                        >
                                            {op.type}
                                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {op.date}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm dark:text-gray-200">
                                        <strong>Element:</strong> {op.element}
                                    </p>
                                    <p className="text-sm dark:text-gray-200">
                                        <strong>Miqdori:</strong> {op.amount}
                                    </p>
                                    <p className="text-sm dark:text-gray-200">
                                        <strong>Ombor:</strong> {op.warehouse}
                                    </p>
                                    <p className="text-sm dark:text-gray-200">
                                        <strong>Operator:</strong> {op.operator}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "kirish" && (
                    <div className="rounded-lg bg-white p-4 shadow dark:bg-slate-800 dark:text-white sm:p-6">
                        <h2 className="text-base font-semibold sm:text-lg">Omborga kirish</h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            Bu yerda yangi kirim qo‘shish formasi bo‘ladi.
                        </p>
                    </div>
                )}

                {activeTab === "chiqish" && (
                    <div className="rounded-lg bg-white p-4 shadow dark:bg-slate-800 dark:text-white sm:p-6">
                        <h2 className="text-base font-semibold sm:text-lg">Ombordan chiqish</h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            Bu yerda yangi chiqim qo‘shish formasi bo‘ladi.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Omborchi;
