"use client";

import React from "react";
import { Scale, GitBranch, PenTool, Type } from "lucide-react";
import { UI_COPY, type Locale } from "@/data/i18n";

interface ScientificNoticeBannerProps {
  locale: Locale;
}

export function ScientificNoticeBanner({ locale }: ScientificNoticeBannerProps) {
  const pillars = [
    {
      icon: GitBranch,
      tag: locale === "tr" ? "01 · GENETİK AİLE" : "01 · GENETIC FAMILY",
      title: locale === "tr" ? "Dil (Language)" : "Language",
      body:
        locale === "tr"
          ? "Sözcük dağarcığı, ses bilgisi ve sözdizimiyle tanımlanan tarihsel-genetik yapıdır. Türk dili farklı yüzyıllarda farklı alfabelerle yazılmış olsa da aynı dil ailesinin üyesi kalmıştır."
          : "A historical-genetic system defined by phonology, morphology, and syntax. Changing scripts over centuries does not alter a language's genetic family.",
    },
    {
      icon: PenTool,
      tag: locale === "tr" ? "02 · YAPISAL TİPOLOJİ" : "02 · STRUCTURAL TYPOLOGY",
      title: locale === "tr" ? "Yazı Sistemi (Writing System)" : "Writing System",
      body:
        locale === "tr"
          ? "Seslerin veya anlamların görsel olarak kodlanma yöntemidir: Runiform karma alfabe, kursiv alfabe, ünsüz ağırlıklı abjad, hece-ünlü işaretli abugida veya tam sesçil (fonemik) alfabe."
          : "The structural method used to encode speech visually: runiform hybrid, cursive alphabet, abjad (consonant-centered), abugida, or full phonemic alphabet.",
    },
    {
      icon: Type,
      tag: locale === "tr" ? "03 · İŞARET ENVANTERİ" : "03 · SIGN INVENTORY",
      title: locale === "tr" ? "Alfabe (Alphabet)" : "Alphabet",
      body:
        locale === "tr"
          ? "Belirli bir yazı sisteminin belirli bir dil için uyarlanmış somut harf/işaret dizgesidir (ör. 38–40 işaretli Orhon, ek harfli Osmanlı Arapçası veya 29 harfli 1928 Türk Latincesi)."
          : "The concrete inventory of signs adapted for a specific language—such as the 38–40 Orkhon signs, adapted Ottoman Arabic, or the 29-letter 1928 Turkish Latin alphabet.",
    },
  ];

  return (
    <section
      aria-labelledby="scientific-distinction-heading"
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="rounded-2xl border border-[#d97706]/35 bg-[#1a1a1f] p-6 shadow-xl sm:p-8">
        <div className="flex flex-col gap-4 border-b border-[#f5f0e6]/10 pb-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-3.5">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#d97706]/40 bg-[#d97706]/15 text-[#d97706]">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#d97706]">
                {locale === "tr"
                  ? "KÜRATÖRYEL BİLİMSEL İLKE"
                  : "CURATORIAL SCIENTIFIC PRINCIPLE"}
              </p>
              <h2
                id="scientific-distinction-heading"
                className="mt-1 font-serif text-xl font-semibold text-[#f5f0e6] sm:text-2xl"
              >
                {UI_COPY[locale].distinctionNotice}
              </h2>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.tag}
                className="rounded-xl border border-[#f5f0e6]/10 bg-[#111113]/70 p-5 transition-colors hover:border-[#d97706]/40"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-widest text-[#d97706]">
                    {pillar.tag}
                  </span>
                  <Icon className="h-4 w-4 text-[#d97706]/80" />
                </div>
                <h3 className="mt-2.5 font-serif text-lg font-semibold text-[#f5f0e6]">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#a8a29e]">
                  {pillar.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
