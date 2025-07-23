const Nazorat = () => {
    return (
        <div className={"h-screen overflow-y-auto"}>
      dashbord
        </div>
    )
}

export default Nazorat;
// import { Pie } from "react-chartjs-2";
// import {
//     Chart as ChartJS,
//     ArcElement,
//     Tooltip,
//     Legend,
// } from "chart.js";
// import { useState } from "react";
//
// ChartJS.register(ArcElement, Tooltip, Legend);
//
// const Nazorat = () => {
//     const [dark, setDark] = useState(false);
//
//     const chartOptions = {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//             legend: {
//                 position: 'bottom',
//                 labels: {
//                     padding: 15,
//                     font: {
//                         size: 10
//                     }
//                 }
//             }
//         },
//         cutout: '40%' // This creates the doughnut effect with centered empty space
//     };
//
//     const omborTarkibi = {
//         labels: ["Tsement", "G'isht", "Armatura", "Qum"],
//         datasets: [
//             {
//                 data: [30, 25, 20, 25],
//                 backgroundColor: ["#f87171", "#60a5fa", "#34d399", "#facc15"],
//                 borderWidth: 0,
//                 borderRadius: 5,
//             },
//         ],
//     };
//
//     const chiqimlar = {
//         labels: ["Qurilish", "Ta'mirlash", "Zaxira"],
//         datasets: [
//             {
//                 data: [50, 30, 20],
//                 backgroundColor: ["#fb923c", "#6366f1", "#10b981"],
//                 borderWidth: 0,
//                 borderRadius: 5,
//             },
//         ],
//     };
//
//     const rejadagiTaminot = {
//         labels: ["Buyurtma berilgan", "Yo'lda", "Kelgan"],
//         datasets: [
//             {
//                 data: [40, 35, 25],
//                 backgroundColor: ["#e879f9", "#38bdf8", "#a3e635"],
//                 borderWidth: 0,
//                 borderRadius: 5,
//             },
//         ],
//     };
//
//     return (
//         <div className={`p-6 ${dark ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
//
//             {/* Diagrams */}
//             <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-3">
//                 <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
//                     <h2 className="mb-4 text-center text-lg font-semibold">Ombordagi materiallar</h2>
//                     <div className="h-64">
//                         <Pie data={omborTarkibi} options={chartOptions} />
//                     </div>
//                 </div>
//                 <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
//                     <h2 className="mb-4 text-center text-lg font-semibold">Ombor chiqimlari (oylik)</h2>
//                     <div className="h-64">
//                         <Pie data={chiqimlar} options={chartOptions} />
//                     </div>
//                 </div>
//                 <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
//                     <h2 className="mb-4 text-center text-lg font-semibold">Rejadagi ta'minot</h2>
//                     <div className="h-64">
//                         <Pie data={rejadagiTaminot} options={chartOptions} />
//                     </div>
//                 </div>
//             </div>
//
//             {/* Table */}
//             <div className="overflow-x-auto rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
//                 <h2 className="mb-6 text-xl font-semibold">Materiallar Jadvali</h2>
//                 <table className="min-w-full table-auto border-collapse">
//                     <thead>
//                     <tr className="bg-gray-100 dark:bg-gray-700">
//                         <th className="border px-6 py-3 text-left">Material</th>
//                         <th className="border px-6 py-3 text-left">Miqdori</th>
//                         <th className="border px-6 py-3 text-left">Oxirgi kirim</th>
//                         <th className="border px-6 py-3 text-left">Holati</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                         <td className="border px-6 py-4">Tsement</td>
//                         <td className="border px-6 py-4">1200 kg</td>
//                         <td className="border px-6 py-4">15.07.2025</td>
//                         <td className="border px-6 py-4 font-medium text-green-600 dark:text-green-400">Yaxshi</td>
//                     </tr>
//                     <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                         <td className="border px-6 py-4">G'isht</td>
//                         <td className="border px-6 py-4">800 dona</td>
//                         <td className="border px-6 py-4">12.07.2025</td>
//                         <td className="border px-6 py-4 font-medium text-yellow-500 dark:text-yellow-400">Kamroq</td>
//                     </tr>
//                     <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                         <td className="border px-6 py-4">Armatura</td>
//                         <td className="border px-6 py-4">300 kg</td>
//                         <td className="border px-6 py-4">10.07.2025</td>
//                         <td className="border px-6 py-4 font-medium text-red-500 dark:text-red-400">Tugayapti</td>
//                     </tr>
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };
//
// export default Nazorat;