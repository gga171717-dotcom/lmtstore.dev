"use client";
import { useState, useEffect } from "react";

interface NavBarProps {
  setActivePage?: (page: "home" | "about" | "store" | "work" | "contact") => void;
}

export const NavBar = ({ setActivePage }: NavBarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePageChange = (page: "home" | "about" | "store" | "work" | "contact") => {
    setActive(page);
    if (setActivePage) {
      setActivePage(page);
    }
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleTelegramClick = () => {
    window.open("https://t.me/Shuwangcoder", "_blank");
  };

  const navItems = [
    { name: "Home", page: "home" as const },
    { name: "About", page: "about" as const },
    { name: "Store", page: "store" as const },
    { name: "Work", page: "work" as const },
    { name: "Contact", page: "contact" as const }
  ];

  return (
    <>
      {scrolled && (
        <div className="fixed top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/40 to-transparent z-40 pointer-events-none" />
      )}
      
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-white/5 backdrop-blur-xl mt-3 shadow-lg"
            : "bg-gray-900/40 backdrop-blur-md border-b border-white/5"
        }`}
        style={{
          width: scrolled ? "auto" : "100%",
          margin: scrolled ? "0 auto" : "0",
          left: scrolled ? "50%" : "0",
          right: scrolled ? "auto" : "0",
          transform: scrolled ? "translateX(-50%)" : "none",
          borderRadius: scrolled ? "50px" : "0",
          padding: scrolled ? "0 7px" : "0",
        }}
      >
        <div className={`${!scrolled ? "max-w-7xl mx-auto" : ""} px-4 sm:px-6 lg:px-8`}>
          <div className={`flex justify-between items-center ${scrolled ? "py-5" : "py-3"}`}>
            {/* Logo - LMTSTORE (Left) */}
            <div
              className={`flex items-center gap-1 cursor-pointer group flex-shrink-0 ${scrolled ? "mr-12" : "mr-4"}`}
              onClick={() => handlePageChange("home")}
            >
              <div className={`${scrolled ? "w-6 h-6" : "w-7 h-7"} bg-gradient-to-br from-blue-400 to-pink-400 rounded-lg rotate-45 group-hover:rotate-90 transition-all duration-300`}></div>
              <div className="flex items-center">
                <span className={`${scrolled ? "text-sm" : "text-base"} text-white font-bold`}>
                  <span className="text-blue-400">LMT</span>
                  <span className="text-pink-400">STORE</span>
                </span>
              </div>
            </div>

            {/* Desktop Menu - Center with SMALL gap (តិចៗ) */}
            <div className="hidden md:flex items-center gap-5">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handlePageChange(item.page)}
                  className={`${scrolled ? "text-sm" : "text-[14px]"} font-medium cursor-pointer transition-all duration-300 relative group ${
                    active === item.page ? "text-white" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-pink-400 transition-all duration-300 ${
                    active === item.page ? "w-full" : "w-0 group-hover:w-full"
                  }`}></span>
                </button>
              ))}
            </div>

            {/* Telegram Button (Right) */}
            <div className="hidden md:block flex-shrink-0 ml-12">
              <button
                onClick={handleTelegramClick}
                className={`relative group flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-500 to-pink-500 ${
                  scrolled ? "px-3 py-1" : "px-4 py-1.5"
                } rounded-full hover:scale-105 transition-all duration-300`}
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.09-.2-.1-.06-.24-.04-.34-.02-.14.02-2.37 1.5-3.33 2.11-.32.21-.64.31-.94.31-.31 0-.81-.16-1.2-.29-.5-.17-.9-.26-.87-.55.02-.16.24-.32.66-.49 2.11-.92 4.53-1.92 6.26-2.53 2.96-1.02 3.68-1.12 4.09-1.12.14 0 .36.03.53.19.15.15.19.35.17.55z"/>
                </svg>
                {!scrolled && <span className="text-white text-xs font-medium">Telegram</span>}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={handleTelegramClick}
                className="w-8 h-8 bg-gradient-to-br from-blue-400 to-pink-400 rounded-full flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                </svg>
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handlePageChange(item.page)}
                    className={`text-center py-2 rounded-lg transition ${
                      active === item.page ? "text-blue-400 bg-gray-800/50" : "text-gray-400 hover:text-white hover:bg-gray-800/30"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};