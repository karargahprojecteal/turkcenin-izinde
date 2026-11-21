"use client";

import React, { useMemo } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  Info,
  BookOpen,
  Compass,
} from "lucide-react";
import { Locale, UI_COPY } from "@/data/i18n";
import { ALPHABET_SYSTEMS, AlphabetSystem } from "@/data/alphabets";
import { ACADEMIC_SOURCES } from "@/data/bibliography";

interface ScriptLabSectionProps {
  locale: Locale;
  selectedScriptId: string;
  onSelectScript: (id: string) => void;
  onNavigateToSource: (sourceId: string) => void;
}

export function ScriptLabSection({
  locale,
  selectedScriptId,
  onSelectScript,
  onNavigateToSource,
}: ScriptLabSectionProps) {
  const copy = UI_COPY[locale];

  const activeScript: AlphabetSystem = useMemo(() => {
    return (
      ALPHABET_SYSTEMS.find((s) => s.id === selectedScriptId) ||
      ALPHABET_SYSTEMS[0]
    );
  }, [selectedScriptId]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-[#e2dacb] pb-4">
        <h2 className="font-serif text-2xl font-bold text-[#0f172a] sm:text-3xl">
          {copy.nav.alphabets}
        </h2>
        <p className="mt-1 text-sm text-[#0f172a]/70">
          {locale === "tr"
            ? "Türk dillerinin tarih boyunca kullandığı özgün ve uyarlanmış yazı sistemleri, Unicode glif örnekleri ve okuma yönü şemaları."
            : "Indigenous and adapted writing systems used for Turkic languages, featuring authentic Unicode glyphs and reading-direction visualizers."}
        </p>
      </div>

      {/* Script Selector Tabs */}
      <div
        role="tablist"
        aria-label={locale === "tr" ? "Yazı Sistemleri" : "Writing Systems"}
        className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {ALPHABET_SYSTEMS.map((script) => {
          const isSelected = script.id === activeScript.id;
          return (
            <button
              key={script.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => onSelectScript(script.id)}
              className={`focus-museum flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all ${
                isSelected
                  ? "border-[#0e7490] bg-[#0f172a] text-[#f8f6f1] shadow-md"
                  : "border-[#e2dacb] bg-white text-[#0f172a] hover:border-[#0e7490]"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`font-mono text-[11px] font-bold ${
                    isSelected ? "text-[#7dd3fc]" : "text-[#0e7490]"
                  }`}
                >
                  {script.era[locale]}
                </span>
                <span
                  className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase ${
                    isSelected
                      ? "bg-white/10 text-[#fbbf24]"
                      : "bg-[#f1ede4] text-[#0f172a]/75"
                  }`}
                >
                  {script.direction}
                </span>
              </div>
              <div className="mt-2 font-serif text-sm font-bold leading-snug">
                {script.name[locale]}
              </div>
              <div
                className={`mt-1 text-[11px] ${
                  isSelected ? "text-[#cbd5e1]" : "text-[#0f172a]/65"
                }`}
              >
                {script.writingSystemType[locale]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Script Showcase + Directionality Visualizer */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left: Specimen & Metadata */}
        <div className="space-y-5 rounded-2xl border border-[#e2dacb] bg-white p-6 shadow-sm lg:col-span-7">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#0e7490]/10 px-3 py-1 text-xs font-bold text-[#0e7490]">
                {activeScript.writingSystemType[locale]}
              </span>
              {activeScript.unicodeBlock && (
                <span className="rounded-full border border-[#e2dacb] bg-[#f8f6f1] px-3 py-1 font-mono text-[11px] font-medium text-[#0f172a]/75">
                  {activeScript.unicodeBlock}
                </span>
              )}
            </div>
            <h3 className="mt-3 font-serif text-2xl font-bold text-[#0f172a]">
              {activeScript.name[locale]}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#0f172a]/85">
              {activeScript.description[locale]}
            </p>
          </div>

          {/* Sample Word Box */}
          <div className="rounded-xl border border-[#b45309]/30 bg-[#0f172a] p-5 text-[#f8f6f1]">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#fbbf24]">
              <span>{locale === "tr" ? "Örnek Yazım" : "Sample Inscription"}</span>
              <span className="font-mono text-[#7dd3fc]">{activeScript.signCount}</span>
            </div>

            <div
              dir={activeScript.direction === "rtl" ? "rtl" : "ltr"}
              className="my-4 rounded-lg bg-white/5 px-4 py-4 text-center font-serif text-2xl tracking-wider text-white sm:text-3xl"
            >
              {activeScript.sampleWord.original}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div>
                <span className="text-[#94a3b8]">
                  {locale === "tr" ? "Çevriyazı: " : "Transliteration: "}
                </span>
                <span className="font-mono font-semibold text-[#7dd3fc]">
                  {activeScript.sampleWord.transliteration}
                </span>
              </div>
              <div>
                <span className="text-[#94a3b8]">
                  {locale === "tr" ? "Anlam: " : "Meaning: "}
                </span>
                <span className="font-semibold text-white">
                  {activeScript.sampleWord.meaning[locale]}
                </span>
              </div>
            </div>

            {activeScript.sampleWord.hasFontNote && (
              <div className="mt-3 flex items-start gap-2 rounded-lg bg-[#b45309]/20 p-2.5 text-[11px] text-[#fde68a]">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>{activeScript.scientificNote[locale]}</span>
              </div>
            )}
          </div>

          {/* Scientific Note */}
          {!activeScript.sampleWord.hasFontNote && (
            <div className="rounded-xl border border-[#0e7490]/25 bg-[#0e7490]/5 p-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0e7490]">
                {locale === "tr" ? "Bilimsel Not" : "Scientific Note"}
              </div>
              <p className="mt-1 text-sm text-[#0f172a]/85">
                {activeScript.scientificNote[locale]}
              </p>
            </div>
          )}

          {/* Metadata & Sources */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e2dacb] pt-4 text-xs">
            <div className="text-[#0f172a]/75">
              <strong className="text-[#0f172a]">
                {locale === "tr" ? "Bölge: " : "Region: "}
              </strong>
              {activeScript.region[locale]}
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-[#b45309]" />
              {activeScript.sourceIds.map((srcId) => {
                const src = ACADEMIC_SOURCES.find((s) => s.id === srcId);
                if (!src) return null;
                return (
                  <button
                    key={src.id}
                    type="button"
                    onClick={() => onNavigateToSource(src.id)}
                    className="focus-museum rounded border border-[#e2dacb] bg-[#f8f6f1] px-2 py-1 text-[11px] font-medium text-[#0f172a] hover:border-[#0e7490] hover:text-[#0e7490]"
                  >
                    {src.authorOrInstitution}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Directionality Visualizer */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#e2dacb] bg-[#f1ede4]/60 p-6 shadow-sm lg:col-span-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0e7490]">
              <Compass className="h-4 w-4" />
              <span>
                {locale === "tr"
                  ? "Okuma Yönü Görselleştiricisi"
                  : "Reading Direction Visualizer"}
              </span>
            </div>
            <h4 className="mt-2 font-serif text-lg font-bold text-[#0f172a]">
              {activeScript.directionLabel[locale]}
            </h4>
          </div>

          {/* Visual Diagram */}
          <div className="my-6 flex flex-1 items-center justify-center rounded-xl border border-[#e2dacb] bg-white p-6">
            {activeScript.direction === "rtl" && (
              <div className="w-full space-y-4 text-center">
                <div className="flex items-center justify-between rounded-lg bg-[#f8f6f1] px-4 py-3 font-mono text-xs font-bold text-[#0e7490]">
                  <span>{locale === "tr" ? "Bitiş (Sol)" : "End (Left)"}</span>
                  <ArrowLeft className="h-5 w-5 animate-pulse text-[#b45309]" />
                  <span>{locale === "tr" ? "Başlangıç (Sağ)" : "Start (Right)"}</span>
                </div>
                <div className="space-y-2">
                  {[1, 2].map((line) => (
                    <div
                      key={line}
                      className="flex flex-row-reverse items-center justify-start gap-2 rounded border border-dashed border-[#e2dacb] p-2.5"
                    >
                      <span className="rounded bg-[#0f172a] px-2 py-0.5 font-mono text-[10px] text-white">
                        {line}. {locale === "tr" ? "Satır" : "Line"}
                      </span>
                      <div className="h-2 flex-1 rounded bg-[#0e7490]/25" />
                      <ArrowLeft className="h-4 w-4 text-[#0e7490]" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeScript.direction === "ltr" && (
              <div className="w-full space-y-4 text-center">
                <div className="flex items-center justify-between rounded-lg bg-[#f8f6f1] px-4 py-3 font-mono text-xs font-bold text-[#0e7490]">
                  <span>{locale === "tr" ? "Başlangıç (Sol)" : "Start (Left)"}</span>
                  <ArrowRight className="h-5 w-5 animate-pulse text-[#b45309]" />
                  <span>{locale === "tr" ? "Bitiş (Sağ)" : "End (Right)"}</span>
                </div>
                <div className="space-y-2">
                  {[1, 2].map((line) => (
                    <div
                      key={line}
                      className="flex items-center justify-start gap-2 rounded border border-dashed border-[#e2dacb] p-2.5"
                    >
                      <span className="rounded bg-[#0f172a] px-2 py-0.5 font-mono text-[10px] text-white">
                        {line}. {locale === "tr" ? "Satır" : "Line"}
                      </span>
                      <div className="h-2 flex-1 rounded bg-[#0e7490]/25" />
                      <ArrowRight className="h-4 w-4 text-[#0e7490]" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeScript.direction === "ttb-ltr" && (
              <div className="w-full space-y-4 text-center">
                <div className="flex items-center justify-between rounded-lg bg-[#f8f6f1] px-4 py-2.5 font-mono text-xs font-bold text-[#0e7490]">
                  <span>{locale === "tr" ? "Sütunlar: Soldan → Sağa" : "Columns: Left → Right"}</span>
                  <ArrowRight className="h-4 w-4 text-[#b45309]" />
                </div>
                <div className="flex justify-center gap-4">
                  {[1, 2, 3].map((col) => (
                    <div
                      key={col}
                      className="flex h-36 w-14 flex-col items-center justify-between rounded-lg border border-dashed border-[#0e7490]/40 bg-[#f8f6f1] py-2"
                    >
                      <span className="rounded bg-[#0f172a] px-1.5 py-0.5 font-mono text-[10px] text-white">
                        S{col}
                      </span>
                      <div className="w-1.5 flex-1 rounded bg-[#0e7490]/30 my-1.5" />
                      <ArrowDown className="h-4 w-4 text-[#0e7490]" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <p className="text-xs leading-relaxed text-[#0f172a]/70">
            {locale === "tr"
              ? "Not: Eski Uygur yazısı Soğd yatay yazısının 90° saat yönünün tersine döndürülmesiyle dikey hale gelmiş, sütunlar soldan sağa sıralanmıştır."
              : "Note: Old Uyghur rotated the horizontal Sogdian script 90° counter-clockwise into vertical columns ordered left-to-right."}
          </p>
        </div>
      </div>

      {/* Authentic Glyphs Grid */}
      <section className="rounded-2xl border border-[#e2dacb] bg-white p-6 shadow-sm">
        <h3 className="font-serif text-xl font-bold text-[#0f172a]">
          {locale === "tr" ? "Karakter ve Ses Değerleri" : "Authentic Glyphs & Phonetic Values"}
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {activeScript.glyphs.map((g, idx) => (
            <div
              key={`${activeScript.id}-${idx}`}
              className="flex items-start gap-4 rounded-xl border border-[#e2dacb] bg-[#f8f6f1] p-4 transition-colors hover:border-[#0e7490] hover:bg-white"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#b45309]/30 bg-[#0f172a] font-serif text-2xl text-[#f8f6f1] shadow-sm">
                {g.glyph}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-sm font-bold text-[#0f172a]">
                    {g.transliteration}
                  </span>
                  <span className="rounded bg-[#0e7490]/10 px-2 py-0.5 font-mono text-xs font-semibold text-[#0e7490]">
                    {g.phonetic}
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-[#0f172a]/75">
                  {g.note[locale]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
