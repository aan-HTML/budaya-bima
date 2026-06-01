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
    navTitle: "Kilas Balik Kain Kesultanan",
    title: "Kilas Balik Kain Kesultanan",
    subtitle: `"Tenun Mbojo bukan sekadar kain — ini identitas luhur suku Bima"`,
    image: "/images/tenun-motif.jpg",
    imageAlt: "Kain Tembe Nggoli",
    story: [
      `Matahari baru saja terbit di atas perbukitan tanah Mbojo, memancarkan sinar keemasan yang menembus celah-celah rumah panggung kayu. Di teras rumah, Nenek Aminah duduk bersila menatap bentangan benang yang mulai usang. Di sampingnya, Safira, sang cucu yang baru menginjak usia remaja, memperhatikan dengan penuh rasa ingin tahu.`,
      `"Nenek, sejak kapan masyarakat Bima mulai memakai sarung indah ini?" tanya Safira sambil jemarinya menyentuh permukaan sarung Tembe Nggoli yang melekat di pinggang sang nenek. Nenek Aminah tersenyum, matanya menerawang jauh, melintasi waktu ratusan tahun lalu.`,
      `"Tenun Mbojo ini bukan sekadar kain, Fira. Ini adalah identitas luhur suku Bima sejak zaman Kesultanan Bima dahulu kala. Kain ini lahir dari rahim budaya yang sangat menghormati kesopanan dan kehormatan." Nenek Aminah menceritakan bagaimana dahulu, setiap perempuan di tanah Bima diwajibkan bisa menenun sebelum mereka menikah.`,
      `Ketika syiar Islam masuk ke bumi Mbojo dibawa oleh para mubaligh dari Kerajaan Gowa-Tallo sekitar abad ke-17, fungsi kain tenun ini mengalami evolusi yang luar biasa. Lahirlah tradisi Rimpu — sebuah cara memakai dua lembar Tembe Nggoli yang difungsikan sebagai hijab untuk menutup aurat bagi perempuan Muslimah.`,
    ],
    fact: `Keterampilan menenun menjadi lambang kedewasaan seorang gadis Bima. Tradisi Rimpu adalah bukti harmoninya adat Bima dengan ajaran Islam yang masuk pada abad ke-17.`,
  },
  {
    id: 2,
    label: "Bab 02",
    navTitle: "Memilah Rasa di Sela Benang",
    title: "Memilah Rasa di Sela Benang",
    subtitle: `"Untuk membuat Tembe Nggoli yang bernyawa, mulailah dari bahan yang jujur"`,
    image: "/images/benang.webp",
    imageAlt: "Pemilihan benang tenun",
    story: [
      `Keesokan harinya, petualangan Safira mendalami warisan leluhurnya berlanjut. Kali ini, Nenek Aminah mengajaknya ke sebuah ruangan kecil di belakang rumah yang dipenuhi keranjang-keranjang berisi gulungan benang beraneka warna. Bau khas kapas alami langsung menyengat hidung Safira.`,
      `"Untuk membuat Tembe Nggoli yang bernyawa, kita harus memulai dari pemilihan bahan yang jujur," ujar Nenek Aminah sambil mengambil segenggam benang katun putih. Dahulu seluruh benang dibuat secara manual dari tanaman kapas yang dipetik di kebun, dipintal menjadi seutas benang, hingga diwarnai menggunakan bahan-bahan dari alam seperti akar pohon dan dedaunan.`,
      `Kain tradisional asli memiliki keajaiban tersendiri: terasa hangat saat dipakai di malam hari yang dingin, namun terasa sangat sejuk dan menyerap keringat di bawah terik matahari Bima yang menyengat.`,
      `Safira belajar membedakan kualitas benang. Merah tua, kuning keemasan, hijau tua, dan cokelat tanah adalah warna-warna utama yang menyimbolkan elemen alam dan spiritualitas masyarakat Bima.`,
    ],
    fact: `Warna-warna khas tenun Bima dahulu diperoleh dari pewarna alami — kulit pohon, akar tumbuhan, dan lumpur khas daerah Bima. Setiap warna memiliki makna hierarkis dalam masyarakat Mbojo.`,
  },
  {
    id: 3,
    label: "Bab 03",
    navTitle: "Irama Kayu yang Bernyanyi",
    title: "Irama Kayu yang Bernyanyi",
    subtitle: `"Prak... tok... prak... tok... melodi kehidupan dari alat tenun Tandi"`,
    image: "/images/pembuatan.webp",
    imageAlt: "Proses menenun dengan Tandi",
    story: [
      `Hari yang dinanti Safira akhirnya tiba. Nenek Aminah bersiap di depan Tandi, alat tenun tradisional berbahan kayu yang sudah diwariskan turun-temurun di keluarga mereka. Proses menenun ini dalam bahasa daerah Bima disebut dengan istilah Muna.`,
      `Nenek Aminah mulai memasukkan tubuhnya ke dalam rangkaian alat tenun. Kakinya bertumpu pada kayu penahan, sementara tangannya dengan cekatan memegang pari, sebilah kayu panjang untuk merapatkan benang. Prak... tok... prak... tok... Suara ketukan kayu terdengar berirama, seolah-olah penenun tua itu sedang memainkan sebuah melodi kehidupan.`,
      `Safira memperhatikan betapa rumitnya proses ini. Setiap helai benang pakan dimasukkan dengan tangan secara perlahan melalui sela-sela benang lungsin, lalu dirapatkan dengan sentakan bertenaga.`,
      `"Menenun itu latihan kesabaran dan ketelitian tinggi, Fira. Jika pikiranmu sedang kacau atau hatimu sedang tidak tenang, kerapihan kain ini akan terganggu. Setiap ketukan kayu mencerminkan keteguhan hati seorang perempuan Mbojo," bisik Nenek Aminah tanpa menghentikan gerakannya.`,
    ],
    fact: `Untuk menghasilkan selembar kain Tembe Nggoli utuh, dibutuhkan waktu berminggu-minggu bahkan berbulan-bulan. Desa Ntobo di Kecamatan Woha adalah sentra tenun terbesar di Bima — hampir setiap rumah memiliki alat tenun Tandi.`,
  },
  {
    id: 4,
    label: "Bab 04",
    navTitle: "Simfoni Garis dan Jiwa",
    title: "Simfoni Garis dan Jiwa",
    subtitle: `"Setiap motif adalah doa dan petuah hidup yang melekat pada kain"`,
    image: "/images/motif-tembe-nggoli.jpeg",
    imageAlt: "Motif tenun Tembe Nggoli",
    story: [
      `Satu bulan berlalu, dan selembar kain Tembe Nggoli baru akhirnya selesai ditenun. Nenek Aminah membentangkan kain itu di hadapan Safira. Warnanya merah menyala digabungkan dengan garis-garis emas yang membentuk pola geometris yang sangat indah.`,
      `"Lihatlah baik-baik, apa yang kamu lihat dari motif kain ini?" tanya Nenek Aminah. Safira mengamati barisan garis diagonal dan kotak-kotak kecil yang tersusun rapi. "Indah sekali, Nek. Tapi apakah garis-garis ini ada artinya?"`,
      `"Tentu saja," jawab Nenek Aminah penuh kebanggaan. "Motif Tembe Nggoli didominasi oleh Garo (garis-garis), Wunta (bunga), dan Kakando (rebung). Garis lurus yang tegas melambangkan prinsip hidup Dou Mbojo yang menjunjung tinggi kejujuran, ketegasan, dan keadilan."`,
      `Motif bunga menyimbolkan keanggunan dan keharuman budi pekerti. Sedangkan motif pucuk rebung mencerminkan pertumbuhan spiritual dan harapan agar manusia selalu berguna bagi sesamanya dari muda hingga tua.`,
    ],
    fact: `Motif "Weri" yang berbentuk seperti gelang adalah simbol ikatan sosial dan persaudaraan dalam masyarakat Mbojo. Setiap motif tidak dipilih sembarangan — ada motif khusus untuk pernikahan dan upacara adat kesultanan.`,
  },
  {
    id: 5,
    label: "Bab 05",
    navTitle: "Menenun Masa Depan",
    title: "Menenun Masa Depan",
    subtitle: `"Jiwa dan identitas luhur Bima akan terus ditenun oleh generasi masa depan"`,
    image: "/images/rimpu-mantika.jpg",
    imageAlt: "Festival Rimpu Mantika",
    story: [
      `Beberapa tahun kemudian, sebuah festival besar bertajuk Festival Rimpu Mantika digelar di pusat kota Bima. Ribuan perempuan berjalan beriringan mengenakan balutan Tembe Nggoli beraneka warna dengan gaya Rimpu Colo dan Rimpu Chili, memenuhi jalanan dengan pesona budaya yang luar biasa.`,
      `Di antara barisan penonton, Safira berdiri dengan anggun. Namun ia tidak lagi sekadar menjadi penonton biasa. Sadar bahwa generasi muda mulai melupakan seni menenun karena gempuran pakaian modern, Safira mengambil langkah nyata.`,
      `Ia mendirikan komunitas digital anak muda untuk mendokumentasikan proses pembuatan Tembe Nggoli, membuat narasi estetis tentang makna setiap motif, dan membantu para pengrajin tua di desanya menjual kain tenun secara online ke seluruh dunia. Tidak hanya itu, Safira juga memodifikasi kain tenun menjadi produk fesyen modern seperti jaket, tas, dan gaun tanpa menghilangkan nilai sakralnya.`,
      `Nenek Aminah yang melihat perjuangan cucunya dari kejauhan meneteskan air mata bahagia. Ia tahu, meskipun raga para penenun tua suatu saat akan tiada, jiwa dan identitas luhur suku Bima akan tetap hidup abadi — ditenun oleh tangan-tangan kreatif generasi masa depan.`,
    ],
    fact: `Pada tahun 2023, Tembe Nggoli resmi diusulkan sebagai Warisan Budaya Takbenda Nasional oleh Pemerintah Kabupaten Bima. Festival Rimpu Mantika kini menjadi salah satu festival budaya terbesar di Nusa Tenggara Barat.`,
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
