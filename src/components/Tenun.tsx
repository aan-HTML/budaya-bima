"use client";

import Image from "next/image";
import FadeIn from "./FadeIn";
import { Box, Check } from "lucide-react";

export default function Tenun() {
  const umaItems = [
    "Struktur kayu tahan gempa warisan rekayasa leluhur.",
    "Atap ilalang menjulang berfungsi sebagai lumbung padi (sokolo) di tingkat paling atas.",
    "Tingkat bawah berdesain terbuka, digunakan untuk bersosialisasi dan bertenun.",
  ];

  return (
    <section id="tenun" className="py-24 px-6 max-w-7xl mx-auto">
      {/* Tenun Catalog */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28">
        <FadeIn direction="left">
          <h2 className="text-4xl font-serif text-[#d4af37] mb-3">Katalog Tenun</h2>
          <h3 className="text-2xl font-bold text-white mb-6">Mahakarya Tembe Nggoli</h3>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">
            Kain tenun Bima bukan sekadar penutup tubuh, melainkan lembaran filosofi. Setiap
            tarikan benang menceritakan status sosial, doa, dan kedekatan masyarakat Mbojo
            dengan alam sekitarnya.
          </p>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Platform ini menyediakan fitur Showcase Interaktif 3D untuk melihat detail
            tekstur benang dan memahami makna di balik motif Bunga Samobo, Kakando, hingga
            Nggusu Waru.
          </p>
          <button className="inline-flex items-center gap-2 bg-[#d4af37] text-black px-8 py-4 rounded-lg font-bold hover:bg-[#e8cc6a] transition-colors duration-200 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]">
            <Box size={18} />
            Buka Showcase 3D
          </button>
        </FadeIn>

        <FadeIn direction="right" delay={0.15}>
          <div className="relative">
            <div className="absolute inset-0 bg-[#d4af37]/20 rounded-xl blur-2xl" />
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-700 aspect-[4/3]">
              <Image
                src="/images/tenun-motif.jpg"
                alt="Motif Tenun Bima"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
                quality={85}
              />
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Uma Lengge */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <FadeIn direction="left" delay={0.1} className="order-2 lg:order-1">
          <div className="relative">
            <div className="absolute inset-0 bg-[#d4af37]/15 rounded-xl blur-2xl" />
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-700 aspect-[4/3]">
              <Image
                src="/images/uma-lengge.jpg"
                alt="Uma Lengge"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
                quality={85}
              />
            </div>
          </div>
        </FadeIn>

        <FadeIn direction="right" className="order-1 lg:order-2">
          <h2 className="text-4xl font-serif text-[#d4af37] mb-2">Eksplorasi Rumah Adat</h2>
          <h3 className="text-2xl font-bold text-white mb-8">Uma Lengge</h3>
          <ul className="space-y-4 text-gray-300 mb-8">
            {umaItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-4 bg-[#161616] p-4 rounded-lg border border-gray-800"
              >
                <Check size={18} className="text-[#d4af37] mt-0.5 shrink-0" />
                <p className="text-sm leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
          <blockquote className="border-l-4 border-[#d4af37] pl-5 italic font-serif text-lg text-gray-300">
            Desain tata ruang mencerminkan hierarki kehidupan dan kearifan lokal.
          </blockquote>
        </FadeIn>
      </div>
    </section>
  );
}
