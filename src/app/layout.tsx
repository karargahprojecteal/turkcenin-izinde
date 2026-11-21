import type { Metadata } from "next";
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TÜRKÇENİN İZİNDE — COĞRAFİ ATLAS",
  description:
    "Türk Dilleri ve Yazı Kültürleri Coğrafi Atlası: Orhon'dan İstanbul'a, Yakutistan'dan Orta İran'a tarihsel yayılım ve çağdaş Türk dilleri dağılımı.",
  keywords: [
    "Türkçe",
    "Türk Dilleri",
    "Coğrafi Atlas",
    "Orhon",
    "Turfan",
    "Kaşgar",
    "Harezm",
    "Kıpçak",
    "Halaçça",
    "Turkic Languages Atlas",
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
      className={`${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-[#0b1320] text-slate-100 antialiased selection:bg-[#14b8a6]/30 selection:text-teal-200">
        {children}
      </body>
    </html>
  );
}
