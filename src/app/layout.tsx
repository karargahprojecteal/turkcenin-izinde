import type { Metadata } from "next";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://turkcenin-izinde.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Türkçenin İzinde | Tracing Turkic — Tarihsel Dil ve Yazı Atlası",
    template: "%s | Türkçenin İzinde",
  },
  description:
    "Proto-Türkçe kuramsal rekonstrüksiyonlarından MÖ 209 Mete Han ve Büyük Hun dönemine, Orhon–Yenisey yazıtlarından İpek Yolu el yazmalarına ve 38 Türk diline uzanan kaynak doğrulamalı dijital akademik atlas.",
  keywords: [
    "Türkçenin İzinde",
    "Tracing Turkic",
    "Türk dilleri",
    "Orhun Yazıtları",
    "Göktürkçe",
    "Eski Uygurca",
    "Tarihsel dilbilim",
    "Turkic languages",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: ["en_US"],
    url: "/",
    siteName: "Türkçenin İzinde",
    title: "Türkçenin İzinde | Tracing Turkic — Tarihsel Dil ve Yazı Atlası",
    description:
      "38 Türk dili, 13 tarihsel dönem ve devlet, 10 yazı sistemi, Orhon–Yenisey epigrafisi ve 39 doğrulanmış akademik kaynakla etkileşimli dijital atlas.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Türkçenin İzinde | Tracing Turkic",
    description:
      "Türk dillerinin, alfabelerinin, tarihinin ve edebiyatının akademik kaynaklara dayanan interaktif dijital atlası.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
