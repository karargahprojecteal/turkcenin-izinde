"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  BookOpen,
  Compass,
  Eye,
  Info,
  Play,
  Sparkles,
} from "lucide-react";
import { ALPHABET_SYSTEMS, type AlphabetSystem } from "@/data/alphabets";
import { ACADEMIC_SOURCES } from "@/data/bibliography";
import type { Locale } from "@/data/i18n";

interface ScriptSpecimenLabProps {
  locale: Locale;
  activeScriptId: string;
  onSelectScript: (id: string) => void;
  onSelectSource: (sourceId: string) => void;
}

function DirectionVisualizer({
  script,
  locale,
}: {
  script: AlphabetSystem;
  locale: Locale;
}) {
  const [animating, setAnimating] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setAnimating(false);
    setStep(0);
  }, [script.id]);

  useEffect(() => {
    if (!animating) return;
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev >= 3) {
          setAnimating(false);
          return 0;
        }
        return prev + 1;
      });
    }, 650);
    return () => clearInterval(timer);
  }, [animating]);

  const directionBadge =
    script.direction === "rtl"
      ? locale === "tr"
        ? "SAĞDAN SOLA (RTL)"
        : "RIGHT-TO-LEFT (RTL)"
      : script.direction === "ttb-ltr"
        ? locale === "tr"
          ? "DİKEY YUKARIDAN AŞAĞI (TTB)"
          : "VERTICAL TOP-TO-BOTTOM (TTB)"
        : locale === "tr"
          ? "SOLDAN SAĞA (LTR)"
          : "LEFT-TO-RIGHT (LTR)";

  return (
    <div className="rounded-xl border border-[#f5f0e6]/10 bg-[#111113]/80 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Compass className="h-4 w-4 text-[#d97706]" />
          <span className="font-mono text-xs uppercase tracking-wider text-[#d97706]">
            {locale === "tr" ? "Yazım Yönü Görselleştirici" : "Writing Direction Visualizer"}
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            setStep(0);
            setAnimating(true);
          }}
          className="inline-flex items-center gap-1.5 rounded-md border border-[#d97706]/40 bg-[#d97706]/10 px-2.5 py-1 font-mono text-[11px] text-[#f5f0e6] transition-colors hover:bg-[#d97706]/25"
        >
          <Play className="h-3 w-3 text-[#d97706]" />
          <span>
            {locale === "tr" ? "Okuma Akışını Canlandır" : "Animate Reading Flow"}
          </span>
        </button>
      </div>

      <div className="mt-4 grid items-center gap-4 sm:grid-cols-[1fr_auto]">
        <div>
          <span className="inline-block rounded border border-[#f5f0e6]/15 bg-[#1a1a1f] px-2 py-0.5 font-mono text-[11px] text-[#f5f0e6]">
            {directionBadge}
          </span>
          <p className="mt-2 text-sm text-[#a8a29e]">
            {script.directionLabel[locale]}
          </p>
        </div>

        {/* SVG Orientation Schematic */}
        <div className="flex items-center justify-center rounded-lg border border-[#f5f0e6]/10 bg-[#1a1a1f] p-3">
          {script.direction === "rtl" && (
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-1.5">
                {[3, 2, 1, 0].map((idx) => (
                  <span
                    key={idx}
                    className={`flex h-7 w-7 items-center justify-center rounded border font-mono text-xs transition-all duration-300 ${
                      animating && step === idx
                        ? "scale-110 border-[#d97706] bg-[#d97706] text-[#111113] font-bold"
                        : "border-[#f5f0e6]/15 bg-[#111113] text-[#f5f0e6]/70"
                    }`}
                  >
                    {idx + 1}
                  </span>
                ))}
              </div>
              <div className="flex w-full items-center justify-between gap-2 font-mono text-[10px] text-[#d97706]">
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>{locale === "tr" ? "Bitiş ← Başlangıç" : "End ← Start"}</span>
              </div>
            </div>
          )}

          {script.direction === "ltr" && (
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-1.5">
                {[0, 1, 2, 3].map((idx) => (
                  <span
                    key={idx}
                    className={`flex h-7 w-7 items-center justify-center rounded border font-mono text-xs transition-all duration-300 ${
                      animating && step === idx
                        ? "scale-110 border-[#d97706] bg-[#d97706] text-[#111113] font-bold"
                        : "border-[#f5f0e6]/15 bg-[#111113] text-[#f5f0e6]/70"
                    }`}
                  >
                    {idx + 1}
                  </span>
                ))}
              </div>
              <div className="flex w-full items-center justify-between gap-2 font-mono text-[10px] text-[#d97706]">
                <span>{locale === "tr" ? "Başlangıç → Bitiş" : "Start → End"}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          )}

          {script.direction === "ttb-ltr" && (
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                {[0, 1].map((col) => (
                  <div key={col} className="flex flex-col gap-1">
                    {[0, 1].map((row) => {
                      const idx = col * 2 + row;
                      return (
                        <span
                          key={idx}
                          className={`flex h-6 w-6 items-center justify-center rounded border font-mono text-[11px] transition-all duration-300 ${
                            animating && step === idx
                              ? "scale-110 border-[#d97706] bg-[#d97706] text-[#111113] font-bold"
                              : "border-[#f5f0e6]/15 bg-[#111113] text-[#f5f0e6]/70"
                          }`}
                        >
                          {idx + 1}
                        </span>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center gap-1 font-mono text-[10px] text-[#d97706]">
                <ArrowDown className="h-3.5 w-3.5" />
                <span>{locale === "tr" ? "Sütun →" : "Col →"}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ScriptSpecimenLab({
  locale,
  activeScriptId,
  onSelectScript,
  onSelectSource,
}: ScriptSpecimenLabProps) {
  const activeScript =
    ALPHABET_SYSTEMS.find((s) => s.id === activeScriptId) ?? ALPHABET_SYSTEMS[0];

  const [selectedGlyphIdx, setSelectedGlyphIdx] = useState(0);

  useEffect(() => {
    setSelectedGlyphIdx(0);
  }, [activeScript.id]);

  const activeGlyph =
    activeScript.glyphs[selectedGlyphIdx] ?? activeScript.glyphs[0];

  const resolvedSources = activeScript.sourceIds
    .map((id) => ACADEMIC_SOURCES.find((src) => src.id === id))
    .filter((src): src is NonNullable<typeof src> => Boolean(src));

  return (
    <section
      id="script-lab"
      aria-labelledby="script-lab-heading"
      className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-3 border-b border-[#f5f0e6]/10 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#d97706]">
            {locale === "tr"
              ? "BÖLÜM I · İNTERAKTİF EPİGRAFİ LABORATUVARI"
              : "GALLERY I · INTERACTIVE EPIGRAPHY LAB"}
          </p>
          <h2
            id="script-lab-heading"
            className="mt-1.5 font-serif text-3xl font-semibold tracking-tight text-[#f5f0e6] sm:text-4xl"
          >
            {locale === "tr"
              ? "Yazı Sistemleri ve Glif İnceleme Vitrini"
              : "Script Specimen & Glyph Lab"}
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-[#a8a29e]">
          {locale === "tr"
            ? "Türk dillerinin tarihsel olarak kullandığı altı ana yazı geleneğini özgün Unicode glifleri, yazım yönleri ve sesbilgisel değerleriyle inceleyin."
            : "Inspect six major historical writing traditions used for Turkic languages with authentic Unicode glyphs, reading directions, and phonetic values."}
        </p>
      </div>

      {/* Script Selector Tabs */}
      <div
        className="mt-6 flex flex-wrap gap-2"
        role="tablist"
        aria-label={locale === "tr" ? "Yazı Sistemleri" : "Writing Systems"}
      >
        {ALPHABET_SYSTEMS.map((script, idx) => {
          const isSelected = script.id === activeScript.id;
          return (
            <button
              key={script.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => onSelectScript(script.id)}
              className={`group flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left transition-all ${
                isSelected
                  ? "border-[#d97706] bg-[#d97706]/15 text-[#f5f0e6] shadow-[0_0_20px_-6px_rgba(217,119,6,0.45)]"
                  : "border-[#f5f0e6]/10 bg-[#1a1a1f] text-[#a8a29e] hover:border-[#d97706]/40 hover:text-[#f5f0e6]"
              }`}
            >
              <span
                className={`font-mono text-[10px] ${
                  isSelected ? "text-[#d97706]" : "text-[#a8a29e]/70"
                }`}
              >
                0{idx + 1}
              </span>
              <span className="text-xs font-medium sm:text-sm">
                {script.name[locale].split("(")[0].trim()}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Specimen Vitrine */}
      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        {/* Left Column: Illuminated Specimen & Metadata */}
        <div className="space-y-5 rounded-2xl border border-[#f5f0e6]/10 bg-[#1a1a1f] p-6 lg:col-span-7">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#f5f0e6]/10 pb-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d97706]/40 bg-[#d97706]/10 px-2.5 py-0.5 font-mono text-[11px] text-[#d97706]">
                <Sparkles className="h-3 w-3" />
                {activeScript.writingSystemType[locale]}
              </span>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-[#f5f0e6] sm:text-3xl">
                {activeScript.name[locale]}
              </h3>
            </div>
            {activeScript.unicodeBlock && (
              <span className="rounded-md border border-[#f5f0e6]/10 bg-[#111113] px-2.5 py-1 font-mono text-[11px] text-[#a8a29e]">
                {activeScript.unicodeBlock}
              </span>
            )}
          </div>

          {/* Illuminated Sample Word Showcase */}
          <div className="relative overflow-hidden rounded-xl border border-[#d97706]/30 bg-gradient-to-br from-[#111113] via-[#151519] to-[#1a1610] p-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#d97706]">
                {locale === "tr" ? "ÖZGÜN YAZI ÖRNEĞİ" : "AUTHENTIC SPECIMEN"}
              </span>
              <span className="font-mono text-[11px] text-[#a8a29e]">
                {activeScript.era[locale]}
              </span>
            </div>

            <div className="my-5 flex min-h-[110px] items-center justify-center rounded-lg border border-[#f5f0e6]/5 bg-[#111113]/60 px-4 py-6">
              {activeScript.direction === "ttb-ltr" ? (
                <div className="flex items-center gap-6">
                  <div
                    className="font-epigraphy script-vertical-ttb max-h-36 text-3xl tracking-widest text-[#f5f0e6] sm:text-4xl"
                    lang="oui"
                  >
                    {activeScript.sampleWord.original}
                  </div>
                  <div className="border-l border-[#f5f0e6]/15 pl-4 text-left">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[#d97706]">
                      {locale === "tr" ? "Dikey Sütun Akışı" : "Vertical Column Flow"}
                    </p>
                    <p className="mt-1 font-mono text-sm text-[#f5f0e6]">
                      {activeScript.sampleWord.transliteration}
                    </p>
                  </div>
                </div>
              ) : (
                <p
                  dir={activeScript.direction === "rtl" ? "rtl" : "ltr"}
                  className="font-epigraphy text-center text-3xl leading-relaxed tracking-wider text-[#f5f0e6] sm:text-4xl"
                >
                  {activeScript.sampleWord.original}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#f5f0e6]/10 pt-3 text-sm">
              <div>
                <span className="font-mono text-xs text-[#a8a29e]">
                  {locale === "tr" ? "Çevriyazı: " : "Transliteration: "}
                </span>
                <span className="font-mono font-medium text-[#f5f0e6]">
                  {activeScript.sampleWord.transliteration}
                </span>
              </div>
              <div className="text-[#d97706]">
                <span className="font-mono text-xs text-[#a8a29e]">
                  {locale === "tr" ? "Anlam: " : "Meaning: "}
                </span>
                <span className="font-medium">
                  {activeScript.sampleWord.meaning[locale]}
                </span>
              </div>
            </div>
          </div>

          {/* Direction Visualizer */}
          <DirectionVisualizer script={activeScript} locale={locale} />

          {/* Description & Metadata Grid */}
          <p className="text-sm leading-relaxed text-[#f5f0e6]/85">
            {activeScript.description[locale]}
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-[#f5f0e6]/10 bg-[#111113]/70 p-3.5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#a8a29e]">
                {locale === "tr" ? "Coğrafi Yayılım" : "Geographic Region"}
              </p>
              <p className="mt-1 text-sm text-[#f5f0e6]">
                {activeScript.region[locale]}
              </p>
            </div>
            <div className="rounded-lg border border-[#f5f0e6]/10 bg-[#111113]/70 p-3.5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#a8a29e]">
                {locale === "tr" ? "İşaret Sayısı" : "Sign Inventory"}
              </p>
              <p className="mt-1 text-sm text-[#f5f0e6]">
                {activeScript.signCount}
              </p>
            </div>
          </div>

          {/* Scientific Note */}
          <div className="flex items-start gap-3 rounded-xl border border-[#d97706]/30 bg-[#d97706]/10 p-4">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#d97706]" />
            <p className="text-xs leading-relaxed text-[#f5f0e6]/90">
              <strong className="font-semibold text-[#d97706]">
                {locale === "tr" ? "Bilimsel Not: " : "Scientific Note: "}
              </strong>
              {activeScript.scientificNote[locale]}
            </p>
          </div>

          {/* Sources */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#a8a29e]">
              <BookOpen className="h-3.5 w-3.5 text-[#d97706]" />
              {locale === "tr" ? "Kaynaklar:" : "Sources:"}
            </span>
            {resolvedSources.map((src) => (
              <a
                key={src.id}
                href={`#source-${src.id}`}
                onClick={() => onSelectSource(src.id)}
                className="rounded-md border border-[#f5f0e6]/15 bg-[#111113] px-2.5 py-1 font-mono text-[11px] text-[#f5f0e6]/80 transition-colors hover:border-[#d97706] hover:text-[#d97706]"
              >
                {src.authorOrInstitution.split("(")[0].trim()} ({src.year})
              </a>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Glyph Specimen Grid & Loupe */}
        <div className="flex flex-col justify-between space-y-5 rounded-2xl border border-[#f5f0e6]/10 bg-[#1a1a1f] p-6 lg:col-span-5">
          <div>
            <div className="flex items-center justify-between border-b border-[#f5f0e6]/10 pb-3">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-[#d97706]" />
                <h4 className="font-serif text-lg font-semibold text-[#f5f0e6]">
                  {locale === "tr" ? "Glif Merceği" : "Glyph Loupe"}
                </h4>
              </div>
              <span className="font-mono text-[11px] text-[#a8a29e]">
                {locale === "tr" ? "İncelemek için seçin" : "Select to inspect"}
              </span>
            </div>

            {/* Active Glyph Magnifier */}
            {activeGlyph && (
              <div className="mt-4 rounded-xl border border-[#d97706]/35 bg-[#111113] p-5 text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-xl border border-[#f5f0e6]/10 bg-[#1a1a1f] font-epigraphy text-5xl text-[#f5f0e6] shadow-inner">
                  {activeGlyph.glyph}
                </div>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <span className="rounded bg-[#d97706]/15 px-2.5 py-0.5 font-mono text-sm font-semibold text-[#d97706]">
                    {activeGlyph.transliteration}
                  </span>
                  <span className="rounded border border-[#f5f0e6]/15 px-2.5 py-0.5 font-mono text-xs text-[#f5f0e6]">
                    IPA {activeGlyph.phonetic}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#a8a29e]">
                  {activeGlyph.note[locale]}
                </p>
              </div>
            )}

            {/* Glyph Specimen Grid */}
            <div className="mt-5">
              <p className="mb-2.5 font-mono text-[11px] uppercase tracking-wider text-[#a8a29e]">
                {locale === "tr"
                  ? `Karakter Örnekleri (${activeScript.glyphs.length})`
                  : `Specimen Glyphs (${activeScript.glyphs.length})`}
              </p>
              <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-3">
                {activeScript.glyphs.map((item, idx) => {
                  const isCurrent = idx === selectedGlyphIdx;
                  return (
                    <button
                      key={`${item.glyph}-${idx}`}
                      type="button"
                      onClick={() => setSelectedGlyphIdx(idx)}
                      className={`flex flex-col items-center justify-center rounded-xl border p-3 transition-all ${
                        isCurrent
                          ? "border-[#d97706] bg-[#d97706]/15 text-[#f5f0e6]"
                          : "border-[#f5f0e6]/10 bg-[#111113]/70 text-[#f5f0e6]/80 hover:border-[#d97706]/40"
                      }`}
                    >
                      <span className="font-epigraphy text-2xl leading-none">
                        {item.glyph}
                      </span>
                      <span className="mt-2 font-mono text-[11px] text-[#d97706]">
                        {item.transliteration}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-[#f5f0e6]/10 bg-[#111113]/60 p-3 text-xs text-[#a8a29e]">
            {locale === "tr"
              ? "İpucu: Aşağıdaki Eser Galerisi'nden bir yazıt veya el yazması seçerek bu yazı sisteminin tarihsel kullanımını inceleyebilirsiniz."
              : "Tip: Select an inscription or manuscript in the Artifact Gallery below to see this script in historical context."}
          </div>
        </div>
      </div>
    </section>
  );
}
