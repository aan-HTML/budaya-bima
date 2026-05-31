"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronLeft, ChevronRight, Check, X } from "lucide-react";
import Image from "next/image";

interface TenunStoryProps {
  onClose: () => void;
}

const chapters = [
  {
    id: 1,
    label: "Bab 01",
    navTitle: "Asal Usul Tenun",
    title: "Asal Usul Tenun Mbojo",
    subtitle: '"Warisan yang diwariskan tangan ke tangan"',
    image:
      "https://sdn28.bimakota.sch.id/upload/kontent/1683685830_bac8249a2b42d7a176eb.jpg",
    imageAlt: "Kain tenun Bima",
    story: [
      "Jauh sebelum mesin tenun ditemukan, perempuan-perempuan Mbojo telah merangkai helai demi helai benang menjadi kain bermakna. Tradisi menenun di Bima diperkirakan telah berlangsung sejak abad ke-14, tumbuh bersama peradaban Kesultanan.",
      "Tenun bukan sekadar aktivitas rumah tangga. Ia adalah bahasa — cara perempuan Mbojo mengekspresikan identitas, status sosial, dan doa-doa tulus kepada Sang Pencipta.",
    ],
    fact: "Di masa Kesultanan Bima, kemampuan menenun adalah salah satu syarat utama seorang perempuan dianggap layak untuk menikah.",
  },
  {
    id: 2,
    label: "Bab 02",
    navTitle: "Memilih Benang",
    title: "Memilih Benang yang Tepat",
    subtitle: '"Dari alam, untuk jiwa"',
    image:
      "https://sdn28.bimakota.sch.id/upload/kontent/1683685830_bac8249a2b42d7a176eb.jpg",
    imageAlt: "Proses pemilihan benang",
    story: [
      "Sebelum sehelai benang pun disentuh alat tenun, para pengrajin Mbojo memulai perjalanan panjang di pasar benang tradisional. Kualitas benang menentukan segalanya — tekstur, kilau, dan ketahanan kain yang akan lahir.",
      "Benang sutra dan katun dipilih dengan teliti. Setiap warna memiliki makna hierarkis — tidak semua warna boleh dipakai oleh semua kalangan masyarakat Mbojo.",
    ],
    fact: "Warna-warna khas tenun Bima seperti merah tua, hitam pekat, dan kuning emas dahulu diperoleh dari pewarna alami — kulit pohon, akar tumbuhan, dan lumpur khas daerah Bima.",
  },
  {
    id: 3,
    label: "Bab 03",
    navTitle: "Proses Menenun",
    title: "Proses Menenun: Sabar & Teliti",
    subtitle: '"Setiap tarikan benang adalah doa"',
    image:
      "https://sdn28.bimakota.sch.id/upload/kontent/1683685830_bac8249a2b42d7a176eb.jpg",
    imageAlt: "Proses menenun",
    story: [
      "Alat tenun tradisional Bima disebut gedongan. Cara kerjanya sederhana namun membutuhkan koordinasi tangan, kaki, dan konsentrasi penuh. Satu lembar kain berukuran 2 meter bisa memakan waktu 2 hingga 4 minggu pengerjaan.",
      "Para penenun biasanya bekerja di pagi hari, saat cahaya matahari masih lembut dan udara belum terlalu panas. Suara 'tak-tik-tak' alat tenun adalah irama keseharian desa-desa penghasil tenun di Bima.",
    ],
    fact: "Desa Ntobo di Kecamatan Woha adalah salah satu sentra tenun terbesar di Bima. Hampir setiap rumah di desa ini memiliki minimal satu alat tenun gedongan.",
  },
  {
    id: 4,
    label: "Bab 04",
    navTitle: "Makna Motif",
    title: "Makna di Balik Setiap Motif",
    subtitle: '"Simbol yang berbicara tanpa kata"',
    image:
      "https://sdn28.bimakota.sch.id/upload/kontent/1683685830_bac8249a2b42d7a176eb.jpg",
    imageAlt: "Motif tenun Bima",
    story: [
      "Tembe Nggoli memiliki lebih dari 100 motif yang masing-masing menyimpan makna filosofis. Motif Bunga Samobo melambangkan keindahan dan kegembiraan. Motif Kakando mencerminkan kekuatan dan perlindungan. Motif Nggusu Waru melambangkan delapan penjuru mata angin — keseimbangan hidup.",
      "Pemilihan motif pada acara tertentu tidak dilakukan sembarangan. Ada motif khusus untuk pernikahan, ada yang hanya boleh dipakai oleh keluarga kesultanan, dan ada yang digunakan dalam ritual adat tertentu.",
    ],
    fact: "Motif 'Weri' yang berbentuk seperti gelang adalah simbol ikatan sosial dan persaudaraan dalam masyarakat Mbojo.",
  },
  {
    id: 5,
    label: "Bab 05",
    navTitle: "Warisan Budaya",
    title: "Menjaga Warisan untuk Generasi Mendatang",
    subtitle: '"Benang yang tak boleh putus"',
    image:
      "https://sdn28.bimakota.sch.id/upload/kontent/1683685830_bac8249a2b42d7a176eb.jpg",
    imageAlt: "Warisan tenun Bima",
    story: [
      "Di era modern, tenun Bima menghadapi tantangan besar. Produksi massal kain dari luar daerah menekan harga jual, sementara generasi muda mulai enggan mempelajari seni yang membutuhkan kesabaran tinggi ini.",
      "Namun semangat pelestarian terus berkobar. Festival Tenun Mbojo tahunan, program pelatihan di sekolah-sekolah, dan pasar online membantu para pengrajin menjangkau pembeli yang lebih luas — bahkan hingga mancanegara.",
    ],
    fact: "Pada tahun 2023, tenun Bima (Tembe Nggoli) resmi diusulkan sebagai Warisan Budaya Takbenda Nasional oleh Pemerintah Kabupaten Bima.",
  },
];

export default function TenunStory({ onClose }: TenunStoryProps) {
  const [activeChapter, setActiveChapter] = useState(0);

  const handleOverlayClick = () => {
    onClose();
  };

  const handlePrevious = () => {
    if (activeChapter > 0) {
      setActiveChapter(activeChapter - 1);
    }
  };

  const handleNext = () => {
    if (activeChapter < chapters.length - 1) {
      setActiveChapter(activeChapter + 1);
    }
  };

  const currentChapter = chapters[activeChapter];
  const firstWord = currentChapter.story[0].split(" ")[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-[#0d0d0d] rounded-2xl border border-gray-800 w-full max-w-4xl h-[88vh] max-h-[700px] flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="h-[52px] bg-[#111] border-b border-[#222] px-5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-[#d4af37]" />
            <span className="font-serif text-[#d4af37] text-sm font-bold">
              Kisah di Balik Tenun Mbojo
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#555] text-xs">
              {activeChapter + 1} dari {chapters.length}
            </span>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-[#1e1e1e] border border-[#333] flex items-center justify-center text-[#777] hover:text-[#d4af37] hover:border-[#d4af37] transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-[#1a1a1a] flex-shrink-0 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#d4af37] to-[#e8cc6a]"
            initial={{ width: 0 }}
            animate={{
              width: `${((activeChapter + 1) / chapters.length) * 100}%`,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        {/* Body */}
        <div className="flex flex-1 min-h-0">
          {/* Chapter nav - left sidebar */}
          <div className="w-[195px] bg-[#0a0a0a] border-r border-[#1e1e1e] flex-col py-4 flex-shrink-0 overflow-y-auto hidden md:flex">
            {chapters.map((chapter, i) => (
              <button
                key={chapter.id}
                onClick={() => setActiveChapter(i)}
                className={`py-2.5 px-4 border-l-2 transition-colors ${
                  activeChapter === i
                    ? "border-l-[#d4af37] bg-[#111]"
                    : "border-l-transparent hover:bg-[#0a0a0a]/50"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center text-[9px] font-semibold ${
                      i < activeChapter
                        ? "bg-[#d4af37] border-[#d4af37] text-black"
                        : activeChapter === i
                          ? "bg-[#d4af37] border-[#d4af37] text-black"
                          : "bg-[#1e1e1e] border-[#333] text-[#555]"
                    }`}
                  >
                    {i < activeChapter ? (
                      <Check size={9} />
                    ) : (
                      <span>{i + 1}</span>
                    )}
                  </div>
                  <span
                    className={`text-[9px] uppercase tracking-widest ${
                      activeChapter === i ? "text-[#d4af37]" : "text-[#444]"
                    }`}
                  >
                    {chapter.navTitle.split(" ")[0]}
                  </span>
                </div>
                <p
                  className={`text-xs font-semibold leading-snug ${
                    activeChapter === i ? "text-[#e5e5e5]" : "text-[#555]"
                  }`}
                >
                  {chapter.navTitle}
                </p>
              </button>
            ))}
          </div>

          {/* Content area */}
          <div className="flex-1 overflow-y-auto px-8 py-8 md:px-10 scroll-smooth">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChapter}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
              >
                {/* Chapter badge */}
                <div className="inline-flex gap-6 bg-[#1a1400]/50 border border-[#d4af37]/25 text-[#d4af37] text-[10px] font-semibold px-3 py-1 rounded-full mb-4 tracking-wide">
                  {currentChapter.label}
                </div>

                {/* Title */}
                <h1 className="font-serif text-white text-2xl md:text-3xl font-bold leading-snug mb-1.5">
                  {currentChapter.title}
                </h1>

                {/* Subtitle */}
                <p className="text-[#d4af37] text-sm italic font-serif mb-5">
                  {currentChapter.subtitle}
                </p>

                {/* Divider */}
                <div className="w-12 h-0.5 bg-[#d4af37] mb-6" />

                {/* Image */}
                <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-gray-800 mb-6">
                  <Image
                    src={currentChapter.image}
                    alt={currentChapter.imageAlt}
                    fill
                    className="object-cover"
                    unoptimized={true}
                  />
                </div>

                {/* Story paragraphs */}
                <div className="space-y-4 mb-5">
                  {currentChapter.story.map((paragraph, i) => {
                    const words = paragraph.split(" ");
                    const firstWord = words[0];
                    const restText = words.slice(1).join(" ");

                    return (
                      <p key={i} className="text-[#888] text-sm leading-relaxed">
                        <span className="text-[#d4af37] font-semibold">
                          {firstWord}
                        </span>{" "}
                        {restText}
                      </p>
                    );
                  })}
                </div>

                {/* Fact box */}
                <div className="bg-[#111] border border-[#222] rounded-lg p-4 my-5">
                  <p className="text-[#d4af37] text-[9px] font-semibold uppercase tracking-widest mb-2">
                    💡 Tahukah kamu?
                  </p>
                  <p className="text-[#aaa] text-xs leading-relaxed">
                    {currentChapter.fact}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation footer */}
        <div className="bg-[#0a0a0a] border-t border-[#1e1e1e] px-5 py-3 flex justify-between items-center flex-shrink-0">
          {/* Previous button */}
          <button
            onClick={handlePrevious}
            disabled={activeChapter === 0}
            className={`bg-transparent border border-[#333] text-[#666] px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeChapter === 0
                ? "opacity-30 cursor-not-allowed"
                : "hover:border-[#d4af37] hover:text-[#d4af37]"
            }`}
          >
            <ChevronLeft size={14} />
            Sebelumnya
          </button>

          {/* Dot indicators */}
          <div className="flex gap-1.5">
            {chapters.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveChapter(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  activeChapter === i ? "bg-[#d4af37]" : "bg-[#2a2a2a]"
                }`}
              />
            ))}
          </div>

          {/* Next button or Finish button */}
          {activeChapter < chapters.length - 1 ? (
            <button
              onClick={handleNext}
              className="bg-[#d4af37] text-black px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-[#e8cc6a] transition-colors"
            >
              Selanjutnya
              <ChevronRight size={14} />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="bg-[#d4af37] text-black px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-[#e8cc6a] transition-colors"
            >
              <Check size={14} />
              Selesai
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
