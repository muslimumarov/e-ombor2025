import React from "react";
import Logo from "../../../../public/images/Logo-Gold.png";
import Logo2 from "../../../../public/images/Logo-Blue-Main.png";
import gerb from "../../../../public/images/home-gerb.0379468a.svg";
import flag from "../../../../public/images/download.png";
import ThemeToggle from "../../../core/components/darkMode/ThemeToggle.tsx";
import LanguageSelector from "../../../core/components/language/LanguageSelector.tsx";
import {Button, useThemeMode} from "flowbite-react";
import useMenuStore from "../../../store/useMenuStore.ts";
import { ListIcon, MenuIcon } from "lucide-react";
import Profile from "../../../components/profile/Profile.tsx";

const Navbar: React.FC = () => {
    const { mode } = useThemeMode(); // `theme` bu 'light' yoki 'dark'
    const isDark = mode === "dark";
    const { menuOpen, setMenuOpen } = useMenuStore();

    return (
        <header className="fixed left-0 top-0 z-[9999] w-full bg-gray-50 shadow-md backdrop-blur dark:bg-dark-primary">
            <div className=" flex items-center justify-between px-4 py-3">
                {/* Sidebar Toggle Button */}
                <div className="flex items-center gap-2">
                    <Button
                        color="gray"
                        size="xs"
                        className="mr-3 cursor-pointer text-gray-700"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <MenuIcon /> : <ListIcon />}
                    </Button>

                    {/* Logo Section */}
                    <a href="/" className="flex items-center gap-3">
                        <img
                            src={gerb}
                            alt="Gerb"
                            className="hidden size-10 object-cover sm:block"
                        />
                        <img
                            src={flag}
                            alt="Flag"
                            className="hidden h-12 sm:block"
                        />
                        <img
                            src={isDark ? Logo : Logo2}
                            alt="Logo"
                            className="h-10"
                        />
                    </a>
                </div>

                {/* Right-side buttons */}
                <div className="flex items-center gap-4 text-white">
                    <LanguageSelector />
                    <ThemeToggle />
                    <Profile/>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
