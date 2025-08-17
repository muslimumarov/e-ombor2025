import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
// import MySidebar from "./sidebar/MySidebar";

const BaseLayout = () => {
    return (
        <>
            {/* Yuqoridagi Navbar */}
            <div className="w-full shrink-0">
                <Navbar />
            </div>

            {/* Pastki qism */}
            <div className="flex h-[calc(100%-70px)] w-full shrink">
                {/* Agar kerak bo‘lsa, sidebar qo‘shish */}
                {/* <MySidebar /> */}

                <div className="size-full overflow-y-auto p-3">
                    <div className="px-4dark:bg-[#1E293B] mx-auto mt-[70px] min-h-full max-w-[1200px] rounded-lg bg-white p-3 dark:bg-[#1E293B]">
                        <Outlet /> {/* Router child pages shu yerda chiqadi */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BaseLayout;
