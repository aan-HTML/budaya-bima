import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Budaya Bima — Maja Labo Dahu",
  description:
    "Platform digital interaktif untuk mengeksplorasi kekayaan budaya Bima — sejarah, tenun, kuliner, dan tradisi masyarakat Mbojo.",
  keywords: ["Bima", "Budaya Bima", "Mbojo", "Tembe Nggoli", "Uma Lengge"],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Budaya Bima — Maja Labo Dahu",
    description: "Gerbang digital budaya Bima: sejarah, tenun, kuliner, dan tradisi Mbojo.",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Poppins:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" as="image" href="/images/hero-bg.webp" />
      </head>
      <body className="bg-[#0d0d0d] text-gray-200 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
