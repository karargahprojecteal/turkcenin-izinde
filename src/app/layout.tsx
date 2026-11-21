import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TÜRKÇENİN İZİNDE — YAZININ HAFIZASI | Digital Script Museum",
  description:
    "Obsidian Gallery & Illuminated Epigraphy: Interactive Digital Script Museum exploring Göktürk Runic, Old Uyghur, Arabic, Cyrillic, Latin, and Silk Road Turkic writing systems and historical artifacts.",
  keywords: [
    "Türkçenin İzinde",
    "Yazının Hafızası",
    "Digital Script Museum",
    "Göktürk Runic",
    "Old Uyghur",
    "Orkhon Inscriptions",
    "Dîvânu Lugâti't-Türk",
    "Kutadgu Bilig",
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
      className={`${inter.variable} ${cormorant.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-[#111113] text-[#f5f0e6] antialiased selection:bg-[#d97706]/30 selection:text-[#f5f0e6]">
        {children}
      </body>
    </html>
  );
}
