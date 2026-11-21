import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Türkçenin İzinde | Tracing Turkic — Comprehensive Linguistic & Script Atlas",
  description:
    "Interactive museum and academic atlas of Turkic languages, historical periods, writing systems, geographic distribution, and primary epigraphic/manuscript artifacts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-[#f8f6f1] text-[#0f172a] antialiased selection:bg-[#0e7490]/20 selection:text-[#0f172a]">
        {children}
      </body>
    </html>
  );
}
