"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";

interface NavbarProps {
  locale: string;
  messages: Record<string, Record<string, string>>;
}

export default function Navbar({ locale, messages }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = messages.nav as Record<string, string>;

  const links = useMemo(
    () => [
      { href: "#sejarah", label: nav.sejarah },
      { href: "#galeri", label: nav.galeri },
      { href: "#tenun", label: nav.tenun },
      { href: "#kamus", label: nav.kamus },
      { href: "#kuliner", label: nav.kuliner },
    ],
    [nav]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const otherLocale = locale === "id" ? "en" : "id";

  return (
    <motion.nav
      aria-label="Main navigation"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed w-full z-50 border-b border-gray-800 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-md py-3 shadow-xl shadow-black/50"
          : "bg-black/80 backdrop-blur-sm py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#top" className="text-[#d4af37] font-serif text-2xl font-bold tracking-wide">
          Budaya Bima
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-semibold">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-gray-300 hover:text-[#d4af37] transition-colors duration-200 group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#d4af37] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          {/* Language switcher */}
          <a
            href={`/${otherLocale}`}
            className="flex items-center gap-1.5 text-gray-400 hover:text-[#d4af37] transition-colors duration-200"
          >
            <Globe size={15} />
            <span className="uppercase">{otherLocale}</span>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-black/98 border-t border-gray-800"
          >
            <div className="flex flex-col px-6 py-5 space-y-4 text-center">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-300 hover:text-[#d4af37] transition py-1 font-medium"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`/${otherLocale}`}
                className="flex items-center justify-center gap-1.5 text-gray-400 hover:text-[#d4af37] transition pt-2 border-t border-gray-800"
              >
                <Globe size={14} />
                <span className="uppercase text-sm">{otherLocale}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
