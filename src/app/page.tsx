"use client";

import React, { useState } from "react";
import { ArrowDown, Compass, Layers, ScrollText, Sparkles } from "lucide-react";
import { ALPHABET_SYSTEMS } from "@/data/alphabets";
import { HISTORICAL_ARTIFACTS, type HistoricalArtifact } from "@/data/artifacts";
import { ACADEMIC_SOURCES } from "@/data/bibliography";
import type { Locale } from "@/data/i18n";
import { MuseumHeader } from "@/components/MuseumHeader";
import { ScientificNoticeBanner } from "@/components/ScientificNoticeBanner";
import { ScriptSpecimenLab } from "@/components/ScriptSpecimenLab";
import { ArtifactGallery } from "@/components/ArtifactGallery";
import { ArtifactDetailModal } from "@/components/ArtifactDetailModal";
import { BibliographySection } from "@/components/BibliographySection";

export default function ScriptMuseumPage() {
  const [locale, setLocale] = useState<Locale>("tr");
  const [activeScriptId, setActiveScriptId] = useState<string>(
    ALPHABET_SYSTEMS[0].id
  );
  const [selectedArtifact, setSelectedArtifact] =
    useState<HistoricalArtifact | null>(null);
  const [highlightedSourceId, setHighlightedSourceId] = useState<string | null>(
    null
  );

  const stats = [
    {
      value: String(ALPHABET_SYSTEMS.length),
      label: locale === "tr" ? "Yazı Geleneği" : "Script Traditions",
    },
    {
      value: String(HISTORICAL_ARTIFACTS.length),
      label: locale === "tr" ? "Küratörlü Eser" : "Curated Artifacts",
    },
    {
      value: "3",
      label: locale === "tr" ? "Yazım Yönü (RTL / LTR / Dikey)" : "Directions (RTL / LTR / TTB)",
    },
    {
      value: String(ACADEMIC_SOURCES.length),
      label: locale === "tr" ? "Akademik Kaynak" : "Verified Sources",
    },
  ];

  return (
    <div className="min-h-screen bg-[#111113] text-[#f5f0e6]">
      <MuseumHeader locale={locale} onToggleLocale={setLocale} />

      <main>
        {/* Museum Exhibition Hero */}
        <section
          id="overview"
          className="museum-grid-bg relative overflow-hidden border-b border-[#f5f0e6]/10"
        >
          {/* Ambient Brass Spotlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-28 left-1/2 h-96 w-[44rem] -translate-x-1/2 rounded-full bg-[#d97706]/15 blur-[130px]"
          />

          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-22 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#d97706]/40 bg-[#1a1a1f] px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[#d97706]">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>
                    {locale === "tr"
                      ? "KALICI SERGİ · DİJİTAL YAZI MÜZESİ"
                      : "PERMANENT EXHIBITION · DIGITAL SCRIPT MUSEUM"}
                  </span>
                </div>

                <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight text-[#f5f0e6] sm:text-5xl lg:text-6xl">
                  {locale === "tr" ? (
                    <>
                      YAZININ HAFIZASI
                      <span className="mt-2 block text-2xl font-normal text-[#d97706] sm:text-3xl">
                        Taştan Kâğıda Türkçenin Yazı Serüveni
                      </span>
                    </>
                  ) : (
                    <>
                      MEMORY OF SCRIPT
                      <span className="mt-2 block text-2xl font-normal text-[#d97706] sm:text-3xl">
                        Turkic Epigraphy &amp; Writing Systems from Stone to Print
                      </span>
                    </>
                  )}
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#a8a29e] sm:text-lg">
                  {locale === "tr"
                    ? "Orhon Vadisi'nin kireçtaşı dikilitaşlarından Turfan'ın dikey Uygur rulolarına, Karahanlı yazmalarından 1928 Harf Devrimi'ne kadar Türkçeyi taşıyan yazı sistemlerini özgün Unicode glifleriyle keşfedin."
                    : "Explore the writing systems that carried Turkic languages across thirteen centuries—from Orkhon limestone stelae and vertical Turfan scrolls to Karakhanid manuscripts and the 1928 Alphabet Reform."}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <a
                    href="#script-lab"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#d97706] px-5 py-3 text-sm font-semibold text-[#111113] transition-colors hover:bg-[#f59e0b]"
                  >
                    <Compass className="h-4 w-4" />
                    <span>
                      {locale === "tr"
                        ? "Yazı Laboratuvarına Gir"
                        : "Enter Script Specimen Lab"}
                    </span>
                  </a>
                  <a
                    href="#gallery"
                    className="inline-flex items-center gap-2 rounded-xl border border-[#f5f0e6]/20 bg-[#1a1a1f] px-5 py-3 text-sm font-medium text-[#f5f0e6] transition-colors hover:border-[#d97706] hover:text-[#d97706]"
                  >
                    <ScrollText className="h-4 w-4 text-[#d97706]" />
                    <span>
                      {locale === "tr"
                        ? "Eser Galerisini Gez"
                        : "Browse Artifact Gallery"}
                    </span>
                    <ArrowDown className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Illuminated Stele Placard */}
              <div className="lg:col-span-4">
                <div className="brass-glow rounded-2xl border border-[#d97706]/35 bg-[#1a1a1f]/95 p-6">
                  <div className="flex items-center justify-between border-b border-[#f5f0e6]/10 pb-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#d97706]">
                      {locale === "tr" ? "EPİGRAFİK VİTRİN" : "EPIGRAPHIC VITRINE"}
                    </span>
                    <Layers className="h-4 w-4 text-[#d97706]" />
                  </div>

                  <div className="my-5 rounded-xl border border-[#f5f0e6]/10 bg-[#111113] p-5 text-center">
                    <p
                      dir="rtl"
                      className="font-epigraphy text-3xl tracking-widest text-[#f5f0e6]"
                    >
                      𐱅𐰭𐰼𐰃 · 𐱅𐰇𐰼𐰰
                    </p>
                    <p className="mt-3 font-mono text-xs text-[#d97706]">
                      Teŋri · Türk (Orkhon, 8th c.)
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {stats.map((st) => (
                      <div
                        key={st.label}
                        className="rounded-lg border border-[#f5f0e6]/10 bg-[#111113]/70 p-3"
                      >
                        <p className="font-serif text-2xl font-semibold text-[#f5f0e6]">
                          {st.value}
                        </p>
                        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-[#a8a29e]">
                          {st.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scientific Distinction Notice */}
        <ScientificNoticeBanner locale={locale} />

        {/* Interactive Script Specimen Lab */}
        <ScriptSpecimenLab
          locale={locale}
          activeScriptId={activeScriptId}
          onSelectScript={setActiveScriptId}
          onSelectSource={(sourceId) => setHighlightedSourceId(sourceId)}
        />

        {/* Curated Artifact Gallery */}
        <ArtifactGallery
          locale={locale}
          onSelectArtifact={(artifact) => setSelectedArtifact(artifact)}
        />

        {/* Verified Academic Bibliography */}
        <BibliographySection
          locale={locale}
          highlightedSourceId={highlightedSourceId}
        />
      </main>

      {/* Artifact Detail Modal */}
      <ArtifactDetailModal
        artifact={selectedArtifact}
        locale={locale}
        onClose={() => setSelectedArtifact(null)}
        onInspectScript={(scriptId) => setActiveScriptId(scriptId)}
      />

      {/* Museum Footer */}
      <footer className="border-t border-[#f5f0e6]/10 bg-[#1a1a1f]/60 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <div>
            <p className="font-serif text-base font-semibold tracking-wider text-[#f5f0e6]">
              {locale === "tr"
                ? "TÜRKÇENİN İZİNDE — YAZININ HAFIZASI"
                : "TRACING TURKIC — MEMORY OF SCRIPT"}
            </p>
            <p className="mt-1 font-mono text-xs text-[#a8a29e]">
              {locale === "tr"
                ? "Obsidian Gallery & Illuminated Epigraphy · Akademik Dijital Müze"
                : "Obsidian Gallery & Illuminated Epigraphy · Academic Digital Museum"}
            </p>
          </div>
          <p className="font-mono text-[11px] text-[#a8a29e]">
            {locale === "tr"
              ? "Dil ≠ Yazı Sistemi ≠ Alfabe"
              : "Language ≠ Writing System ≠ Alphabet"}
          </p>
        </div>
      </footer>
    </div>
  );
}
