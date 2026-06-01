"use client";

import { memo } from "react";
import FadeIn from "./FadeIn";
import { Globe, Mail } from "lucide-react";

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
        </FadeIn>
      </div>
    </footer>
  );
}

export default memo(Footer);
