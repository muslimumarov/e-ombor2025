import React, {useState} from 'react';
import {Eye, EyeOff, LogIn} from 'lucide-react';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({email, password});
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-[#0D1B2A] to-[#1B263B]">
            {/* Chap taraf */}
            <div className="hidden w-1/2 flex-col justify-center bg-[#0D1B2A] p-10 text-white md:flex">
                <div className="mb-12 flex justify-center">
                    <img src="/images/Logo-Gold.png" alt="logo" className="size-40 md:w-96"/>
                </div>
                <div className="space-y-4 text-center">
                    <h1 className=" text-4xl font-bold md:text-6xl">E-Ombor</h1>
                    <p className="text-lg font-bold md:text-6xl"> tizimiga xush kelibsiz</p>
                </div>
            </div>

            {/* O'ng taraf */}
            <div className="flex w-full items-center justify-center bg-gradient-to-br from-blue-100 to-purple-300 md:w-1/2">
                <div
                    className="w-[420px] rounded-3xl bg-white/20 px-14 py-10 shadow-2xl   duration-300 md:hover:scale-105">
                    <h2 className="mb-6 text-center text-3xl font-bold ">Tizimga Kirish</h2>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium ">Login</label>
                            <input
                                id="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin"
                                required
                                className="0 borde mt-1 w-full rounded-xl px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium ">Parol</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="mt-1 w-full rounded-xl border border-gray-300 bg-white/70 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-600 hover:text-gray-900"
                                    aria-label={showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
                                >
                                    {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 py-3 font-medium 
                            text-white opacity-80 shadow-lg transition-all hover:brightness-110 focus:outline-none focus:ring-2 
                            focus:ring-blue-400/50`}
                        >

                                <span className="flex items-center justify-center">
                                    <LogIn size={18} className="mr-2"/>
                                    Kirish
                                </span>
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
