import React from "react";
import LogoGold from "/images/Logo-Gold.png";
import LogoBlue from "/images/Logo-Blue-Main.png";
import Gerb from "/images/home-gerb.0379468a.svg";
import Flag from "/images/download.png";
import { useThemeMode } from "flowbite-react";
import LanguageSelector from "../../../core/components/language/LanguageSelector.tsx";
import ThemeToggle from "../../../core/components/darkMode/ThemeToggle.tsx";
import Profile from "../../../components/profile/Profile.tsx";

const Navbar: React.FC = () => {
    const { mode } = useThemeMode();
    const isDark = mode === "dark";

    return (
        <header className="fixed left-0 top-0 z-[9999] w-full bg-[#F5F7FA] shadow-md backdrop-blur dark:bg-[#1E293B] ">
            <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3">
                {/* Chap tomonda: Logo */}
                <div className="flex items-center gap-3">
                    <a href="/" className="flex items-center gap-3">
                        <img
                            src={Gerb}
                            alt="Gerb"
                            className="hidden size-10 object-cover sm:block"
                        />
                        <img
                            src={Flag}
                            alt="Flag"
                            className="hidden h-12 sm:block"
                        />
                        <img
                            src={isDark ? LogoGold : LogoBlue}
                            alt="Logo"
                            className="h-10"
                        />
                    </a>
                </div>

                {/* O‘ng tomonda: Til, Tema va Profil */}
                <div className="flex items-center gap-4">
                    <LanguageSelector />
                    <ThemeToggle />
                    <Profile /> {/* rolega qarab avatar */}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
