import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TÜRKÇENİN İZİNDE — DİL AĞACI | Linguistic Cladogram",
  description:
    "Interactive Turkic language family cladogram, phonological sound-law comparator (Oghur r/l vs Common Turkic z/š, *adaq reflexes), and academic bibliography.",
  keywords: [
    "Turkic languages",
    "Türk dilleri",
    "Dil ağacı",
    "Cladogram",
    "Oghur",
    "Common Turkic",
    "Comparative linguistics",
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
      className={`${ibmPlexSans.variable} ${ibmPlexSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans bg-white text-slate-900 antialiased selection:bg-blue-700 selection:text-white">
        {children}
      </body>
    </html>
  );
}
