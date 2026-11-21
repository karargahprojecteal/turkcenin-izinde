import type { Metadata } from "next";
import { Newsreader, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TÜRKÇENİN İZİNDE — CHRONOS | Türk Dilleri ve Yazı Kültürleri Tarih Atlası",
  description:
    "Proto-Türkçeden günümüze Türk dillerinin ve yazı sistemlerinin etkileşimli kronolojik tarih atlası. Interactive chronological atlas of Turkic languages and scripts.",
  keywords: [
    "Türkçe tarihi",
    "Göktürk",
    "Eski Uygurca",
    "Karahanlı",
    "Çağatayca",
    "Turkic linguistics",
    "Orkhon inscriptions",
    "CHRONOS",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${newsreader.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-[#faf7f2] font-sans text-[#1c1917] antialiased">
        {children}
      </body>
    </html>
  );
}
