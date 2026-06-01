"use client";

import Image from "next/image";
import FadeIn from "./FadeIn";
import { useRef, useState, type RefObject } from "react";
import { Church, Building, Shirt, ChevronLeft, ChevronRight } from "lucide-react";

const kulinerItems = [
  {
    src: "/images/uta-palumara.jpg",
    fallbackBg: "from-amber-900/40 to-orange-900/20",
    alt: "Uta Palumara",
    title: "Uta Palumara",
    desc: "Olahan ikan laut (bandeng atau tongkol) dengan kuah kuning bercita rasa asam, pedas, dan gurih. Menggunakan belimbing wuluh dan kemangi.",
    badge: "Sangat populer di acara keluarga.",
    badgeClass: "bg-green-900/50 text-green-400 border-green-800",
  },
  {
    src: "/images/uta-maju.jpg",
    fallbackBg: "from-red-900/40 to-orange-900/20",
    alt: "Uta Maju",
    title: "Uta Maju",
    desc: "Hidangan daging rusa (maju) yang dikeringkan (dendeng) atau diasap, dimasak dengan bumbu rempah pedas khas Bima.",
    badge: "Dulu merupakan hidangan mewah istana.",
    badgeClass: "bg-yellow-900/50 text-yellow-400 border-yellow-800",
  },
  {
    src: "/images/mina-sarua.jpg",
    fallbackBg: "from-teal-900/40 to-green-900/20",
    alt: "Mina Sarua",
    title: "Mina Sarua",
    desc: "Minuman jamu tradisional penghangat tubuh warisan turun-temurun. Terbuat dari campuran rempah-rempah pilihan, jahe, ketan, dan gula aren.",
    badge: null,
    badgeClass: "",
  },
  {
    src: "/images/tota-foo.webp",
    fallbackBg: "from-blue-900/40 to-indigo-900/20",
    alt: "Tota Foo",
    title: "Tota Foo",
    desc: "Sambal khas bima yang dicincang dengan berbahan dasar mangga muda, cabai, daun kemangi bawang merah, garam dan micin.",
    badge: null,
    badgeClass: "",
  },
  {
    src: "/images/timbu.jpg",
    fallbackBg: "from-purple-900/40 to-pink-900/20",
    alt: "Timbu",
    title: "Timbu",
    desc: "Timvu adalah lemang khas bima yang terbuat dari beras ketan dan santan, lalu dibakar di dalam bambu beralaskan daun pisang.",
    badge: null,
    badgeClass: "",
  }
];

const eventItems = [
  {
    Icon: Church,
    title: "Festival Keraton Kesultanan",
    desc: "Perayaan megah yang menampilkan prosesi adat Kesultanan Bima, parade pusaka, dan tarian istana di pelataran Museum Asi Mbojo.",
  },
  {
    Icon: Building,
    title: "Gelar Budaya Hanta Ua Pua",
    desc: "Upacara tradisional memperingati maulid Nabi dan masuknya agama Islam ke Bima, ditandai dengan arak-arakan budaya dan penyerahan sirih pinang.",
  },
  {
    Icon: Shirt,
    title: "Pekan Tenun Mbojo & Pawai Rimpu",
    desc: "Pameran mahakarya para penenun lokal, disertai fashion show jalanan berskala besar dengan konsep berbusana \"Rimpu\" yang diikuti ribuan peserta.",
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

export default function Kuliner() {
  const [kulinerIndex, setKulinerIndex] = useState(0);
  const [eventIndex, setEventIndex] = useState(0);
  const kulinerRef = useRef<HTMLDivElement>(null);
  const eventRef = useRef<HTMLDivElement>(null);

  return (
    <section id="kuliner" className="py-24 px-6 max-w-7xl mx-auto">
      {/* Kuliner */}
      <div className="mb-28">
        <FadeIn className="text-center mb-14">
          <h2 className="text-4xl font-serif text-[#d4af37]">
            Kekayaan Kuliner (Uta &amp; Mina)
          </h2>
          <div className="w-24 h-px bg-[#d4af37] mx-auto mt-4" />
        </FadeIn>

        <div
          ref={kulinerRef}
          className="flex md:grid md:grid-cols-3 gap-6 overflow-hidden md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0"
          style={{ scrollbarWidth: "none", touchAction: "none", overflowX: "hidden" }}
          onTouchStart={(e) => e.preventDefault()}
          onTouchMove={(e) => e.preventDefault()}
        >
          {kulinerItems.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.12} className="snap-start shrink-0 w-[80vw] md:w-auto">
              <div className="bg-[#161616] rounded-xl overflow-hidden border border-gray-800 hover:-translate-y-2 hover:border-[#d4af37]/30 transition-all duration-300 shadow-lg h-full flex flex-col">
                {/* Image placeholder with gradient bg for missing local images */}
                <div
                  className={`relative h-52 bg-gradient-to-br ${item.fallbackBg} flex items-center justify-center`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                    quality={85}
                    onError={() => {}}
                  />
                  {/* fallback text visible only when image errors */}
                  <span className="relative z-0 text-[#d4af37]/40 font-serif text-2xl font-bold">
                    {item.title}
                  </span>
                </div>
                <div className="p-8 text-center flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{item.desc}</p>
                  {item.badge && (
                    <span
                      className={`inline-block text-xs px-3 py-1 rounded-full border ${item.badgeClass}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 mt-4 md:hidden">
          <button
            onClick={() => scrollTo(kulinerRef, kulinerIndex, setKulinerIndex, kulinerItems.length, "prev")}
            className="transition-opacity duration-300"
            style={{ opacity: kulinerIndex === 0 ? 0.3 : 1 }}
            disabled={kulinerIndex === 0}
            aria-label="Sebelumnya"
          >
            <div className="w-9 h-9 rounded-full bg-[#161616] border border-[#2a2a2a] flex items-center justify-center text-[#d4af37]">
              <ChevronLeft size={16} />
            </div>
          </button>

          <div className="flex items-center gap-1.5">
            {kulinerItems.map((_, i) => (
              <div
                key={i}
                className="h-[5px] rounded-full transition-all duration-300 bg-[#2a2a2a]"
                style={{
                  width: i === kulinerIndex ? "16px" : "5px",
                  background: i === kulinerIndex ? "#d4af37" : "#2a2a2a",
                }}
              />
            ))}
          </div>

          <button
            onClick={() => scrollTo(kulinerRef, kulinerIndex, setKulinerIndex, kulinerItems.length, "next")}
            className="transition-opacity duration-300"
            style={{ opacity: kulinerIndex === kulinerItems.length - 1 ? 0.3 : 1 }}
            disabled={kulinerIndex === kulinerItems.length - 1}
            aria-label="Selanjutnya"
          >
            <div className="w-9 h-9 rounded-full bg-[#161616] border border-[#2a2a2a] flex items-center justify-center text-[#d4af37]">
              <ChevronRight size={16} />
            </div>
          </button>
        </div>
      </div>

      {/* Events */}
      <div>
        <FadeIn className="text-center mb-14">
          <h2 className="text-4xl font-serif text-[#d4af37]">Kalender Event &amp; Festival</h2>
          <div className="w-24 h-px bg-[#d4af37] mx-auto mt-4" />
        </FadeIn>

        <div
          ref={eventRef}
          className="flex md:flex-col gap-6 overflow-hidden md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] max-w-4xl mx-auto"
          style={{ scrollbarWidth: "none", touchAction: "none", overflowX: "hidden" }}
          onTouchStart={(e) => e.preventDefault()}
          onTouchMove={(e) => e.preventDefault()}
        >
          {eventItems.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.1} className="snap-start shrink-0 w-[85vw] md:w-auto">
              <div className="bg-[#161616] p-6 md:p-8 rounded-xl border border-gray-800 flex flex-col md:flex-row gap-6 items-center shadow-lg hover:border-[#d4af37]/40 transition-colors duration-200">
                <div className="w-16 h-16 shrink-0 rounded-full bg-[#d4af37]/10 flex items-center justify-center border border-[#d4af37]">
                  <item.Icon size={28} className="text-[#d4af37]" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 mt-4 md:hidden">
          <button
            onClick={() => scrollTo(eventRef, eventIndex, setEventIndex, eventItems.length, "prev")}
            className="transition-opacity duration-300"
            style={{ opacity: eventIndex === 0 ? 0.3 : 1 }}
            disabled={eventIndex === 0}
            aria-label="Sebelumnya"
          >
            <div className="w-9 h-9 rounded-full bg-[#161616] border border-[#2a2a2a] flex items-center justify-center text-[#d4af37]">
              <ChevronLeft size={16} />
            </div>
          </button>

          <div className="flex items-center gap-1.5">
            {eventItems.map((_, i) => (
              <div
                key={i}
                className="h-[5px] rounded-full transition-all duration-300 bg-[#2a2a2a]"
                style={{
                  width: i === eventIndex ? "16px" : "5px",
                  background: i === eventIndex ? "#d4af37" : "#2a2a2a",
                }}
              />
            ))}
          </div>

          <button
            onClick={() => scrollTo(eventRef, eventIndex, setEventIndex, eventItems.length, "next")}
            className="transition-opacity duration-300"
            style={{ opacity: eventIndex === eventItems.length - 1 ? 0.3 : 1 }}
            disabled={eventIndex === eventItems.length - 1}
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
