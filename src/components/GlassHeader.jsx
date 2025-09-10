// components/GlassHeader.jsx
import React, { useEffect, useRef, useState } from "react";

const GlassHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const mq = useRef(typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)") : null);

  useEffect(() => {
    const m = mq.current;
    if (!m) return;
    const onChange = (e) => e.matches && setMenuOpen(false);
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const lock = menuOpen && !(mq.current?.matches);
    if (lock) root.classList.add("overflow-hidden");
    else root.classList.remove("overflow-hidden");
    return () => root.classList.remove("overflow-hidden");
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const handleNavClick = (e) => {
    const href = e.currentTarget.getAttribute("href") || "";
    if (href.startsWith("#")) setMenuOpen(false);
  };

  return (
    <header className="sticky top-[env(safe-area-inset-top,0)] z-40 w-full px-4 sm:px-6 flex justify-end">
      {/* right-aligned bar */}
      <div
        className="
          mt-4
          w-full lg:max-w-screen-xl
          ml-auto
          bg-white/10 backdrop-blur-md
          rounded-xl
          px-3 sm:px-4
          h-14 sm:h-16
          flex items-center justify-between
          text-white
          ring-1 ring-white/10
        "
      >
        {/* Logo + title */}
        <a
          href="#home"
          className="font-semibold flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-lg"
        >
          <img
            src="/assets/image/logo.png"
            height={30}
            width={30}
            alt="Dream Stage logo"
            className="h-7 w-7 sm:h-[30px] sm:w-[30px]"
          />
          <span className="text-base sm:text-lg tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
            DREAMSTAGE
          </span>
        </a>

        {/* Desktop nav (≥ lg) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
        <a
            href="https://form.jotform.com/252493423386058"
            target="_blank"
            rel="noopener noreferrer"
            className="
              px-4 py-2 rounded-lg 
              bg-gradient-to-r from-purple-500 to-pink-500
              text-white font-semibold text-sm
              hover:opacity-90 transition
              focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
            "
          >
            Request an Invite
          </a>
          <a href="#home" className="cursor-target uppercase text-sm tracking-wide hover:opacity-80 transition">HOME</a>
          <a href="#about" className="cursor-target uppercase text-sm tracking-wide hover:opacity-80 transition">ABOUT</a>
          <a href="#art_bridge" className="cursor-target uppercase text-sm tracking-wide hover:opacity-80 transition">ART BRIDGE</a>
          <a href="#collective" className="cursor-target uppercase text-sm tracking-wide hover:opacity-80 transition">COLLECTIVE</a>
          <a href="#contact" className="cursor-target uppercase text-sm tracking-wide hover:opacity-80 transition">CONTACT</a>

          

          <a
            href="/login"
            className="
              px-4 py-2 rounded-lg 
              bg-gradient-to-r from-purple-500 to-pink-500
              text-white font-semibold text-sm
              hover:opacity-90 transition
              focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
            "
          >
            LOGIN
          </a>
        </nav>

        {/* Hamburger (≤ lg) */}
        <button
          className="block lg:hidden p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
          )}
          <span className="sr-only">Menu</span>
        </button>
      </div>

      {/* Mobile dropdown (right-aligned) */}
      <div
        id="mobile-menu"
        className={[
          "lg:hidden transition-[opacity,transform] duration-200 ease-out w-full px-4 sm:px-6 flex justify-end",
          menuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none",
        ].join(" ")}
      >
        <nav className="mt-3 w-full lg:max-w-screen-xl ml-auto">
          <div
            className="
              bg-white/20 backdrop-blur-md
              rounded-xl
              p-4
              text-white
              ring-1 ring-white/10
              shadow-lg
            "
          >
            <a
              href="https://form.jotform.com/252493423386058"
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-full inline-flex justify-center
                px-4 py-2 rounded-lg 
                bg-gradient-to-r from-purple-500 to-pink-500
                text-center font-semibold
                hover:opacity-90 transition
                focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
                mb-2
              "
              onClick={() => setMenuOpen(false)}
            >
              Request an Invite
            </a>

            <div className="grid grid-cols-1 gap-2 text-base">
              <a href="#home" className="hover:underline py-1" onClick={handleNavClick}>Home</a>
              <a href="#about" className="hover:underline py-1" onClick={handleNavClick}>About</a>
              <a href="#art_bridge" className="hover:underline py-1" onClick={handleNavClick}>Art Bridge</a>
              <a href="#collective" className="hover:underline py-1" onClick={handleNavClick}>Collective</a>
              <a href="#contact" className="hover:underline py-1" onClick={handleNavClick}>Contact</a>
              <a
                href="/login"
                className="
                  w-full inline-flex justify-center
                  px-4 py-2 rounded-lg 
                  bg-gradient-to-r from-purple-500 to-pink-500
                  text-center font-semibold
                  hover:opacity-90 transition
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
                  mt-1
                "
                onClick={() => setMenuOpen(false)}
              >
                LOGIN
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default GlassHeader;
