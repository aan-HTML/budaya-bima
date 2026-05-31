"use client";

import { motion } from "framer-motion";

interface HeroProps {
  messages: {
    hero: {
      tagline: string;
      title: string;
      quote: string;
      desc: string;
      badge: string;
    };
  };
}

export default function Hero({ messages }: HeroProps) {
  const h = messages.hero;

  return (
    <header id="top" className="hero-bg min-h-screen flex items-center justify-center text-center px-4 pt-20">
      <div className="max-w-4xl">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-xl md:text-2xl font-light uppercase text-gray-300 mb-4"
        >
          {h.tagline}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="text-5xl md:text-7xl font-serif font-bold text-[#d4af37] mb-8 drop-shadow-2xl"
        >
          {h.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-2xl font-serif italic text-white mb-4"
        >
          {h.quote}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {h.desc}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="inline-block border border-[#d4af37] px-8 py-3 rounded-full text-[#d4af37] font-bold tracking-wider text-sm"
        >
          {h.badge}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-20 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-[#d4af37]/50 rounded-full flex items-start justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
