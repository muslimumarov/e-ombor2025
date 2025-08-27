// src/pages/NotFound.tsx
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-r from-purple-900 via-pink-800 to-red-700 text-white">
            <h1 className="animate-pulse text-9xl font-extrabold">404</h1>
            <p className="mt-4 text-2xl">Oops! Page not found.</p>
            <p className="mt-2 text-lg">Siz qidirgan sahifa mavjud emas.</p>
            <Link
                to="/login"
                className="mt-6 rounded-lg bg-white px-6 py-3 font-semibold text-purple-800 transition hover:bg-purple-100"
            >
                Bosh sahifaga qaytish
            </Link>
        </div>
    );
};

export default NotFound;
