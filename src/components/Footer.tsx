"use client";

import { memo, useState } from "react";
import FadeIn from "./FadeIn";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, Mail, MapPin, Github, ArrowUpRight } from "lucide-react";

interface FooterProps {
  messages: {
    footer: {
      title: string;
      desc: string;
      copy: string;
    };
  };
}

function Footer({ messages }: FooterProps) {
  const [showCard, setShowCard] = useState(false);
  const f = messages.footer;
  return (
    <footer className="bg-black py-20 text-center border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-4xl font-serif text-[#d4af37] mb-5">{f.title}</h2>
          <p className="text-xl text-gray-400 mb-12">{f.desc}</p>

          <div className="inline-flex flex-col md:flex-row items-center justify-center gap-4 bg-[#161616] px-8 py-4 rounded-full border border-gray-800 shadow-xl">
            <span className="text-[#d4af37] font-bold tracking-widest text-sm flex items-center gap-2">
              <Globe size={15} />
              WWW.BUDAYABIMA.ID
            </span>
            <span className="hidden md:inline text-gray-700">|</span>
            <span className="text-[#d4af37] font-bold tracking-widest text-sm flex items-center gap-2">
              <Mail size={15} />
              EXPLORE@BUDAYABIMA.ID
            </span>
          </div>

          <p className="mt-14 text-sm text-gray-600">{f.copy}</p>

          <div className="flex items-center justify-center gap-1.5 mt-5 pt-5 border-t border-[#1a1a1a]">
            <span className="text-[#444] text-[11px]">Dikembangkan oleh</span>
            <div className="relative">
              <span
                onClick={() => setShowCard((v) => !v)}
                className="text-[#d4af37] text-[11px] font-semibold cursor-pointer border-b border-dashed border-[#d4af3780] pb-px hover:text-[#e8cc6a] transition-colors duration-200"
              >
                Annasirat (Aan)
              </span>

              <AnimatePresence>
                {showCard && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowCard(false)} />

                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[220px] bg-[#111] border border-[#d4af37] rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.8)] z-50"
                    >
                      <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[7px] border-t-[#d4af37]" />

                      <div className="bg-gradient-to-br from-[#1a1400] to-[#111] px-4 py-3.5 flex items-center gap-3 border-b border-[#1e1e1e]">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#d4af37] to-[#a37a10] flex items-center justify-center text-black text-lg font-bold flex-shrink-0 border-2 border-[#d4af37]">
                          A
                        </div>
                        <div>
                          <p className="text-[#e5e5e5] text-[13px] font-bold leading-tight">Annasirat (Aan)</p>
                          <p className="text-[#d4af37] text-[10px] mt-0.5">Front-end - UI/UX</p>
                          <p className="text-[#555] text-[9px] mt-0.5 flex items-center gap-1">
                            <MapPin size={8} />
                            Kabupaten Bima, NTB
                          </p>
                        </div>
                      </div>

                      <div className="p-3 flex flex-col gap-2">
                        <a
                          href="https://aan.my.id"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2.5 px-2.5 py-2 bg-[#161616] border border-[#222] rounded-lg hover:border-[#d4af3750] hover:bg-[#1a1a1a] transition-colors duration-200 group"
                        >
                          <div className="w-[22px] h-[22px] rounded-md bg-[#1a1400] flex items-center justify-center flex-shrink-0">
                            <Globe size={12} className="text-[#d4af37]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[#666] text-[9px] uppercase tracking-wider">Portfolio</p>
                            <p className="text-[#e5e5e5] text-[10px] font-semibold truncate">aan.my.id</p>
                          </div>
                          <ArrowUpRight size={11} className="text-[#444] group-hover:text-[#d4af37] transition-colors" />
                        </a>

                        <a
                          href="https://github.com/aan-HTML"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2.5 px-2.5 py-2 bg-[#161616] border border-[#222] rounded-lg hover:border-[#d4af3750] hover:bg-[#1a1a1a] transition-colors duration-200 group"
                        >
                          <div className="w-[22px] h-[22px] rounded-md bg-[#161616] flex items-center justify-center flex-shrink-0">
                            <Github size={12} className="text-[#e5e5e5]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[#666] text-[9px] uppercase tracking-wider">GitHub</p>
                            <p className="text-[#e5e5e5] text-[10px] font-semibold truncate">github.com/aan-HTML</p>
                          </div>
                          <ArrowUpRight size={11} className="text-[#444] group-hover:text-[#d4af37] transition-colors" />
                        </a>

                        <a
                          href="https://linkedin.com/in/aan270510"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2.5 px-2.5 py-2 bg-[#161616] border border-[#222] rounded-lg hover:border-[#d4af3750] hover:bg-[#1a1a1a] transition-colors duration-200 group"
                        >
                          <div className="w-[22px] h-[22px] rounded-md bg-[#0a1929] flex items-center justify-center flex-shrink-0">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="#0a66c2"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                              <rect x="2" y="9" width="4" height="12" />
                              <circle cx="4" cy="4" r="2" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[#666] text-[9px] uppercase tracking-wider">LinkedIn</p>
                            <p className="text-[#e5e5e5] text-[10px] font-semibold truncate">Annasirat</p>
                          </div>
                          <ArrowUpRight size={11} className="text-[#444] group-hover:text-[#d4af37] transition-colors" />
                        </a>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}

export default memo(Footer);
