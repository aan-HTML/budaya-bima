"use client";

import Image from "next/image";
import FadeIn from "./FadeIn";
import { MessageSquare, BookOpen, MapPin } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";

const MapExplorer = dynamic(() => import("./MapExplorer"), { ssr: false });

const sapaanItems = [
  { term: "Nggahi", meaning: "Bicara/Kata" },
  { term: "Cou", meaning: "Siapa/Apa" },
  { term: "Mbaue", meaning: "Bagaimana kabarmu?" },
  { term: "Lembo Ade", meaning: "Sabar/Lapang dada (Ungkapan simpati yang sangat umum digunakan)." },
];

const budayaItems = [
  { term: "Maja", meaning: "Malu (dalam konteks etika dan moral)" },
  { term: "Dahu", meaning: "Takut (kepada Sang Pencipta)" },
  { term: "Rimpu", meaning: "Cara berbusana tradisional perempuan Bima menggunakan sarung (Tembe) yang menutupi kepala hingga badan." },
];

export default function Kamus() {
  const [mapOpen, setMapOpen] = useState(false);
  return (
    <section id="kamus" className="py-24 bg-[#111111] border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Dictionary */}
        <FadeIn direction="left">
          <h2 className="text-4xl font-serif text-[#d4af37] mb-8">
            Kamus Interaktif Bahasa Mbojo
          </h2>

          {/* Sapaan */}
          <div className="mb-10">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
              <MessageSquare size={18} className="text-[#d4af37]" />
              Sapaan &amp; Percakapan Dasar
            </h3>
            <div className="space-y-2.5">
              {sapaanItems.map((item) => (
                <div
                  key={item.term}
                  className="bg-[#161616] px-5 py-3.5 rounded-lg border border-gray-800 hover:border-[#d4af37]/30 transition-colors duration-200"
                >
                  <span className="text-[#d4af37] font-bold">{item.term}:</span>{" "}
                  <span className="text-gray-300 text-sm">{item.meaning}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Budaya */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
              <BookOpen size={18} className="text-[#d4af37]" />
              Istilah Budaya
            </h3>
            <div className="space-y-2.5">
              {budayaItems.map((item) => (
                <div
                  key={item.term}
                  className="bg-[#161616] px-5 py-3.5 rounded-lg border border-gray-800 hover:border-[#d4af37]/30 transition-colors duration-200"
                >
                  <span className="text-[#d4af37] font-bold">{item.term}:</span>{" "}
                  <span className="text-gray-300 text-sm">{item.meaning}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Map */}
        <FadeIn direction="right" delay={0.15}>
          <h2 className="text-4xl font-serif text-[#d4af37] mb-4">Peta Budaya Interaktif</h2>
          <p className="text-gray-300 mb-8 leading-relaxed text-sm">
            Jelajahi situs-situs bersejarah, desa penghasil tenun terbaik (seperti Desa
            Ntobo), hingga pusat kuliner otentik di seluruh wilayah Kabupaten dan Kota Bima
            melalui fitur pemetaan spasial berbasis Mapbox.
          </p>
          <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-700 h-[420px] group">
            <Image
              src="/images/map-bima.jpg"
              alt="Peta Administrasi Bima"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end justify-center p-6">
              <button onClick={() => setMapOpen(true)} className="bg-[#d4af37] hover:bg-[#e8cc6a] text-black w-full py-4 rounded-lg font-bold shadow-lg transition-colors duration-200 flex items-center justify-center gap-2">
                <MapPin size={20} />
                Mulai Eksplorasi Peta Spatial
              </button>
            </div>
          </div>
        </FadeIn>
        {mapOpen && <MapExplorer onClose={() => setMapOpen(false)} />}
      </div>
    </section>
  );
}
