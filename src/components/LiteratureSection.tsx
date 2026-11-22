"use client";

import React, { useState } from "react";
import { Feather, BookOpen, ScrollText, Sparkles } from "lucide-react";
import { Locale } from "@/data/i18n";
import {
  ORAL_TRADITION_PILLARS,
  LITERATURE_PERIODS,
  LITERARY_MASTERWORKS,
} from "@/data/literature";
import { ACADEMIC_SOURCES } from "@/data/bibliography";

interface LiteratureSectionProps {
  locale: Locale;
  onNavigateToSource: (sourceId: string) => void;
}

export function LiteratureSection({
  locale,
  onNavigateToSource,
}: LiteratureSectionProps) {
  const [selectedPeriodId, setSelectedPeriodId] = useState<string>(
    LITERATURE_PERIODS[0].id
  );

  const activePeriod =
    LITERATURE_PERIODS.find((p) => p.id === selectedPeriodId) ||
    LITERATURE_PERIODS[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#e2dacb] pb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-[#b45309]">
          {locale === "tr"
            ? "Sözlü Kültürden Çağdaş Türk Dünyasına"
            : "From Oral Epics to Contemporary Turkic World"}
        </span>
        <h2 className="mt-1 font-serif text-3xl font-bold text-[#0f172a]">
          {locale === "tr"
            ? "Türk Edebiyatı Tarih Atlası & Temel Eserler"
            : "Atlas of Turkic Literature & Masterworks"}
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-[#0f172a]/75">
          {locale === "tr"
            ? "Ozan/kam sözlü geleneğinden Eski Uygur çeviri külliyatına, Karahanlı–Çağatay–Divan–Halk edebiyatından Tanzimat, Cumhuriyet ve çağdaş Türk dünyası edebiyatlarına uzanan bütünsel edebiyat tarihi."
            : "A holistic literary atlas spanning oral epic traditions, Old Uyghur translations, Karakhanid, Chagatai, Divan, Folk, Tanzimat, Republican, and contemporary Turkic world literatures."}
        </p>
      </div>

      {/* Oral Tradition Pillars */}
      <div className="grid gap-4 md:grid-cols-3">
        {ORAL_TRADITION_PILLARS.map((pillar, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-[#e2dacb] bg-[#f1ede4]/60 p-5"
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#b45309]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{locale === "tr" ? "Sözlü Kültür Katmanı" : "Oral Heritage"}</span>
            </div>
            <h3 className="mt-2 font-serif text-lg font-bold text-[#0f172a]">
              {pillar.term[locale]}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#0f172a]/80">
              {pillar.desc[locale]}
            </p>
          </div>
        ))}
      </div>

      {/* Literary Periods Explorer */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-2 lg:col-span-5">
          {LITERATURE_PERIODS.map((p) => {
            const active = p.id === activePeriod.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPeriodId(p.id)}
                className={`focus-museum w-full rounded-xl border p-3.5 text-left transition-all ${
                  active
                    ? "border-[#0e7490] bg-[#0f172a] text-white shadow-md"
                    : "border-[#e2dacb] bg-white text-[#0f172a] hover:border-[#0e7490]/50"
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono opacity-80">
                  <span>{String(p.order).padStart(2, "0")}</span>
                  <span>{p.era}</span>
                </div>
                <div className="mt-1 font-serif text-base font-bold">
                  {p.name[locale]}
                </div>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-[#e2dacb] bg-white p-6 shadow-sm lg:col-span-7">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0e7490]">
            <Feather className="h-4 w-4 text-[#b45309]" />
            <span>{activePeriod.era}</span>
          </div>
          <h3 className="mt-2 font-serif text-2xl font-bold text-[#0f172a]">
            {activePeriod.name[locale]}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#0f172a]/85">
            {activePeriod.summary[locale]}
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-[#f8f6f1] p-4">
              <div className="text-xs font-bold uppercase text-[#b45309]">
                {locale === "tr" ? "Dil & Yazı Sistemi" : "Language & Script"}
              </div>
              <p className="mt-1 text-sm font-medium text-[#0f172a]">
                {activePeriod.languageAndScript[locale]}
              </p>
            </div>
            <div className="rounded-xl bg-[#f8f6f1] p-4">
              <div className="text-xs font-bold uppercase text-[#0e7490]">
                {locale === "tr" ? "Başlıca Türler" : "Key Genres"}
              </div>
              <p className="mt-1 text-sm text-[#0f172a]/85">
                {activePeriod.keyGenres[locale]}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <div className="text-xs font-bold uppercase text-[#0f172a]/70">
              {locale === "tr" ? "Önde Gelen Yazarlar & Eserler" : "Major Authors & Works"}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {activePeriod.majorAuthorsAndWorks.map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-[#e2dacb] bg-[#f8f6f1] px-3 py-1 text-xs font-semibold text-[#0f172a]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-[#e2dacb] pt-4">
            <BookOpen className="h-3.5 w-3.5 text-[#b45309]" />
            {activePeriod.sourceIds.map((srcId) => {
              const src = ACADEMIC_SOURCES.find((s) => s.id === srcId);
              if (!src) return null;
              return (
                <button
                  key={src.id}
                  type="button"
                  onClick={() => onNavigateToSource(src.id)}
                  className="focus-museum rounded-lg border border-[#e2dacb] bg-[#f8f6f1] px-2.5 py-1 text-[11px] font-medium text-[#0f172a] hover:border-[#0e7490] hover:text-[#0e7490]"
                >
                  {src.authorOrInstitution}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Literary Masterworks Encyclopedia Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ScrollText className="h-5 w-5 text-[#b45309]" />
          <h3 className="font-serif text-xl font-bold text-[#0f172a]">
            {locale === "tr"
              ? "Temel Eserler ve Yazarlar Ansiklopedisi (Seçki)"
              : "Encyclopedia of Literary Masterworks & Authors"}
          </h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {LITERARY_MASTERWORKS.map((work) => (
            <div
              key={work.id}
              className="flex flex-col justify-between rounded-2xl border border-[#e2dacb] bg-white p-5 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-[#0e7490]">
                  <span>{work.period[locale]}</span>
                  <span>{work.date}</span>
                </div>
                <h4 className="mt-1.5 font-serif text-lg font-bold text-[#0f172a]">
                  {work.title}
                </h4>
                <div className="text-xs font-semibold text-[#b45309]">
                  {work.author}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#0f172a]/80">
                  {work.significance[locale]}
                </p>
              </div>
              <div className="mt-4 space-y-1 border-t border-[#e2dacb] pt-3 text-[11px] text-[#0f172a]/70">
                <div>
                  <strong>{locale === "tr" ? "Dil:" : "Language:"}</strong> {work.language[locale]}
                </div>
                <div>
                  <strong>{locale === "tr" ? "Yazı/Nüsha:" : "Script/MSS:"}</strong> {work.manuscriptInfo[locale]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
