import React from "react";
import Logo from "../../../../public/images/Logo-Gold.png";
import gerb from "../../../../public/images/home-gerb.0379468a.svg";
import flag from "../../../../public/images/download.png";
import ThemeToggle from "../../../core/components/darkMode/ThemeToggle.tsx";
import LanguageSelector from "../../../core/components/language/LanguageSelector.tsx";

const Navbar: React.FC = () => {

  return (
    <header className="fixed left-0 top-0 z-[9999] w-full bg-blue-950 shadow-md backdrop-blur">
      <div className="container mx-auto flex justify-between px-4 py-3">
        <div className="flex w-full items-center justify-between">
          <div className="no-copy">
            <a href="/" className="flex items-center justify-center gap-5">
              <img
                src={gerb}
                alt="Ko'prik qurulish"
                className=" size-10 object-cover mobil330:hidden sm:block" // 15x1 px
              />
              <img
                src={flag}
                alt="Ko'prik qurulish"
                className="h-14 mobil330:hidden sm:block" // 150x10
              />
              <img src={Logo} alt="Ko'prik qurulish" className="h-12" />
            </a>
          </div>
          <div className="no-copy flex items-center gap-6 dark:text-white md:order-2">
            <LanguageSelector />
            {/*<Notification />*/}
            <ThemeToggle />

          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
