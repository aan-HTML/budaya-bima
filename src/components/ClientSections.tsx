"use client";

import dynamic from "next/dynamic";

const Galeri = dynamic(() => import("./Galeri"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[520px] flex items-center justify-center text-gray-400">
      Memuat galeri...
    </div>
  ),
});
const Tenun = dynamic(() => import("./Tenun"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[520px] flex items-center justify-center text-gray-400">
      Memuat showcase tenun...
    </div>
  ),
});
const Kamus = dynamic(() => import("./Kamus"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[520px] flex items-center justify-center text-gray-400">
      Memuat kamus interaktif...
    </div>
  ),
});
const Kuliner = dynamic(() => import("./Kuliner"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[520px] flex items-center justify-center text-gray-400">
      Memuat kuliner...
    </div>
  ),
});
const Footer = dynamic(() => import("./Footer"), {
  ssr: false,
  loading: () => (
    <div className="py-20 text-center text-gray-400">Memuat footer...</div>
  ),
});

interface ClientSectionsProps {
  messages: any;
}

export default function ClientSections({ messages }: ClientSectionsProps) {
  return (
    <>
      <Galeri />
      <Tenun />
      <Kamus />
      <Kuliner />
      <Footer messages={messages} />
    </>
  );
}
