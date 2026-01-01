"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const pathname = usePathname();
  const [atTop, setAtTop] = useState(true);
  const [open, setOpen] = useState(false);

  const navRef = useRef(null);
  const underlineRef = useRef(null);

  /* -----------------------------
           Scroll → header morph
        ----------------------------- */
  useEffect(() => {
    const onScroll = () => {
      setAtTop(window.scrollY < 50);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* -----------------------------
           Cursor-follow underline
        ----------------------------- */
  const moveUnderline = (el) => {
    if (!underlineRef.current || !navRef.current) return;

    const rect = el.getBoundingClientRect();
    const parentRect = navRef.current.getBoundingClientRect();

    underlineRef.current.style.width = `${rect.width}px`;
    underlineRef.current.style.transform = `translateX(${
      rect.left - parentRect.left
    }px)`;
    underlineRef.current.style.opacity = 1;
  };

  const hideUnderline = () => {
    if (!underlineRef.current) return;
    underlineRef.current.style.opacity = 0;
  };

  return (
    <header
      className={`fixed z-50 inset-x-0 mx-auto mt-4 px-6 py-4 rounded-full transition-all duration-700
      ${atTop ? "max-w-2xl" : "max-w-4xl bg-black/90 backdrop-blur-xl"}`}
    >
      <div className="flex items-center justify-between relative">
        {/* LOGO */}
        <Link
          href="/"
          className={`font-bold uppercase tracking-tight transition-colors ${
            atTop ? "text-blue-300" : "text-blue-300"
          }`}
        >
          ✺ TANK
        </Link>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg
            className={`w-6 h-6 text-blue-300 transition-transform duration-300`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* NAV */}
        <nav
          ref={navRef}
          onMouseLeave={hideUnderline}
          className={`
            absolute md:static top-full left-0 w-full md:w-auto
            flex-col md:flex-row md:flex gap-8
            mt-6 md:mt-0 px-6 md:px-0
            ${open ? "flex" : "hidden"}
          `}
        >
          {/* CURSOR UNDERLINE */}
          <span
            ref={underlineRef}
            className="absolute bottom-0 h-[2px] bg-current transition-all duration-300 opacity-0 hidden md:block"
          />

          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={(e) => moveUnderline(e.currentTarget)}
                className={`relative transition-colors text-blue-300 ${
                  isActive
                    ? "font-semibold opacity-100 border-b-2 border-current"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                {item.label}

                {/* ACTIVE INDICATOR (mobile + no hover) */}
                {isActive && (
                  <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-current md:hidden" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
