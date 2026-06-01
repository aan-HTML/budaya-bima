"use client";

import Image from "next/image";
import FadeIn from "./FadeIn";
import { useRef, useState, type RefObject } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const galeriItems = [
  {
    src: "/images/galeri-1.webp",
    alt: "Tari Wura Bongi Monca",
    title: "Seni Tari",
    desc: "Gemulai Tari Wura Bongi Monca yang elegan, tarian istana untuk penyambutan tamu kehormatan.",
  },
  {
    src: "/images/galeri-2.webp",
    alt: "Busana Adat Bima",
    title: "Busana Adat",
    desc: "Keanggunan pakaian kebesaran adat dan pengantin Bima yang kaya akan ornamen keemasan.",
  },
  {
    src: "/images/galeri-3.webp",
    alt: "Uma Lengge",
    title: "Arsitektur",
    desc: "Bentuk ikonis Uma Lengge dengan atap menjulang, simbol kearifan sistem ketahanan pangan.",
  },
];

const scrollTo = (
  ref: RefObject<HTMLDivElement>,
  index: number,
  setIndex: (i: number) => void,
  total: number,
  direction: "prev" | "next"
) => {
  const newIndex = direction === "next" ? Math.min(index + 1, total - 1) : Math.max(index - 1, 0);
  setIndex(newIndex);

  if (ref.current) {
    const cardWidth = ref.current.scrollWidth / total;
    ref.current.scrollTo({
      left: cardWidth * newIndex,
      behavior: "smooth",
    });
  }
};

export default function Galeri() {
  const [galeriIndex, setGaleriIndex] = useState(0);
  const galeriRef = useRef<HTMLDivElement>(null);

  return (
    <section id="galeri" className="py-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl font-serif text-[#d4af37]">Galeri Visual Budaya</h2>
          <div className="w-24 h-px bg-[#d4af37] mx-auto mt-4" />
        </FadeIn>

        <div
          ref={galeriRef}
          className="flex md:grid md:grid-cols-3 gap-6 overflow-hidden md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0"
          style={{ scrollbarWidth: "none", touchAction: "none", overflowX: "hidden" }}
          onTouchStart={(e) => e.preventDefault()}
          onTouchMove={(e) => e.preventDefault()}
        >
          {galeriItems.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.15} className="snap-start shrink-0 w-[80vw] md:w-auto">
              <div className="group overflow-hidden rounded-xl bg-[#161616] shadow-xl relative h-80">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold text-[#d4af37] mb-1.5">{item.title}</h3>
                  <p className="text-gray-300 text-sm leading-snug">{item.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 mt-4 md:hidden">
          <button
            onClick={() => scrollTo(galeriRef, galeriIndex, setGaleriIndex, galeriItems.length, "prev")}
            className="transition-opacity duration-300"
            style={{ opacity: galeriIndex === 0 ? 0.3 : 1 }}
            disabled={galeriIndex === 0}
            aria-label="Sebelumnya"
          >
            <div className="w-9 h-9 rounded-full bg-[#161616] border border-[#2a2a2a] flex items-center justify-center text-[#d4af37]">
              <ChevronLeft size={16} />
            </div>
          </button>

          <div className="flex items-center gap-1.5">
            {galeriItems.map((_, i) => (
              <div
                key={i}
                className="h-[5px] rounded-full transition-all duration-300 bg-[#2a2a2a]"
                style={{
                  width: i === galeriIndex ? "16px" : "5px",
                  background: i === galeriIndex ? "#d4af37" : "#2a2a2a",
                }}
              />
            ))}
          </div>

          <button
            onClick={() => scrollTo(galeriRef, galeriIndex, setGaleriIndex, galeriItems.length, "next")}
            className="transition-opacity duration-300"
            style={{ opacity: galeriIndex === galeriItems.length - 1 ? 0.3 : 1 }}
            disabled={galeriIndex === galeriItems.length - 1}
            aria-label="Selanjutnya"
          >
            <div className="w-9 h-9 rounded-full bg-[#161616] border border-[#2a2a2a] flex items-center justify-center text-[#d4af37]">
              <ChevronRight size={16} />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
