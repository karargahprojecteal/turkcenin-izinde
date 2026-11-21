"use client";

import React, { useMemo, useState } from "react";
import { Award, MapPin, Search, ArrowUpRight, ScrollText } from "lucide-react";
import { ALPHABET_SYSTEMS } from "@/data/alphabets";
import {
  HISTORICAL_ARTIFACTS,
  type HistoricalArtifact,
} from "@/data/artifacts";
import { UI_COPY, type Locale } from "@/data/i18n";

interface ArtifactGalleryProps {
  locale: Locale;
  onSelectArtifact: (artifact: HistoricalArtifact) => void;
}

export function ArtifactGallery({
  locale,
  onSelectArtifact,
}: ArtifactGalleryProps) {
  const [selectedScriptFilter, setSelectedScriptFilter] =
    useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const scriptFilters = useMemo(() => {
    const usedIds = Array.from(
      new Set(HISTORICAL_ARTIFACTS.map((a) => a.scriptId))
    );
    return usedIds
      .map((id) => ALPHABET_SYSTEMS.find((s) => s.id === id))
      .filter((s): s is NonNullable<typeof s> => Boolean(s));
  }, []);

  const filteredArtifacts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return HISTORICAL_ARTIFACTS.filter((artifact) => {
      const matchesScript =
        selectedScriptFilter === "all" ||
        artifact.scriptId === selectedScriptFilter;
      if (!matchesScript) return false;
      if (!q) return true;
      const haystack = [
        artifact.title[locale],
        artifact.date,
        artifact.location[locale],
        artifact.material[locale],
        artifact.excerptTransliteration,
        artifact.description[locale],
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [locale, searchQuery, selectedScriptFilter]);

  return (
    <section
      id="gallery"
      aria-labelledby="artifact-gallery-heading"
      className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-3 border-b border-[#f5f0e6]/10 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#d97706]">
            {locale === "tr"
              ? "BÖLÜM II · KÜRATÖRYEL ESER KOLEKSİYONU"
              : "GALLERY II · CURATED ARTIFACT COLLECTION"}
          </p>
          <h2
            id="artifact-gallery-heading"
            className="mt-1.5 font-serif text-3xl font-semibold tracking-tight text-[#f5f0e6] sm:text-4xl"
          >
            {locale === "tr"
              ? "Yazıtlar, Yazmalar ve Tarihî Belgeler"
              : "Inscriptions, Manuscripts & Historic Editions"}
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-[#a8a29e]">
          {locale === "tr"
            ? "Orhon dikilitaşlarından Turfan rulolarına, Karahanlı başyapıtlarından 1928 Harf Devrimi belgelerine uzanan 9 seçkin eser vitrini."
            : "Nine curated vitrines spanning Orkhon stelae, Turfan scrolls, Karakhanid masterpieces, and the 1928 Turkish Alphabet Reform."}
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedScriptFilter("all")}
            className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors ${
              selectedScriptFilter === "all"
                ? "border-[#d97706] bg-[#d97706] text-[#111113] font-semibold"
                : "border-[#f5f0e6]/15 bg-[#1a1a1f] text-[#a8a29e] hover:border-[#d97706]/50 hover:text-[#f5f0e6]"
            }`}
          >
            {locale === "tr"
              ? `Tümü (${HISTORICAL_ARTIFACTS.length})`
              : `All (${HISTORICAL_ARTIFACTS.length})`}
          </button>
          {scriptFilters.map((script) => {
            const isActive = selectedScriptFilter === script.id;
            return (
              <button
                key={script.id}
                type="button"
                onClick={() => setSelectedScriptFilter(script.id)}
                className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors ${
                  isActive
                    ? "border-[#d97706] bg-[#d97706] text-[#111113] font-semibold"
                    : "border-[#f5f0e6]/15 bg-[#1a1a1f] text-[#a8a29e] hover:border-[#d97706]/50 hover:text-[#f5f0e6]"
                }`}
              >
                {script.name[locale].split("(")[0].trim()}
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a8a29e]" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={UI_COPY[locale].searchPlaceholder}
            aria-label={UI_COPY[locale].searchPlaceholder}
            className="w-full rounded-xl border border-[#f5f0e6]/15 bg-[#1a1a1f] py-2 pl-9 pr-3 text-sm text-[#f5f0e6] placeholder:text-[#a8a29e]/70 focus:border-[#d97706] focus:outline-none"
          />
        </div>
      </div>

      {/* Artifact Vitrine Grid */}
      {filteredArtifacts.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-[#f5f0e6]/10 bg-[#1a1a1f] p-10 text-center">
          <ScrollText className="mx-auto h-8 w-8 text-[#d97706]/70" />
          <p className="mt-3 font-serif text-lg text-[#f5f0e6]">
            {locale === "tr"
              ? "Arama ölçütünüze uygun eser bulunamadı."
              : "No artifacts match your current filter."}
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredArtifacts.map((artifact) => {
            const catalogNum =
              HISTORICAL_ARTIFACTS.findIndex((a) => a.id === artifact.id) + 1;
            const script = ALPHABET_SYSTEMS.find(
              (s) => s.id === artifact.scriptId
            );
            const isRtl = script?.direction === "rtl";

            return (
              <article
                key={artifact.id}
                className="group flex flex-col justify-between rounded-2xl border border-[#f5f0e6]/10 bg-[#1a1a1f] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d97706]/50 hover:shadow-[0_14px_34px_-14px_rgba(217,119,6,0.3)]"
              >
                <div>
                  {/* Card Top Bar */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] tracking-widest text-[#d97706]">
                      KAT. {String(catalogNum).padStart(2, "0")} ·{" "}
                      {artifact.date}
                    </span>
                    {artifact.unescoStatus && (
                      <span
                        title={artifact.unescoStatus[locale]}
                        className="inline-flex items-center gap-1 rounded border border-emerald-500/35 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-300"
                      >
                        <Award className="h-3 w-3" />
                        UNESCO
                      </span>
                    )}
                  </div>

                  {/* Title & Script Tag */}
                  <h3 className="mt-3 font-serif text-xl font-semibold text-[#f5f0e6] transition-colors group-hover:text-[#d97706]">
                    {artifact.title[locale]}
                  </h3>
                  {script && (
                    <p className="mt-1 font-mono text-[11px] text-[#a8a29e]">
                      {script.name[locale].split("(")[0].trim()}
                    </p>
                  )}

                  {/* Excerpt Plaque */}
                  <div className="mt-4 rounded-xl border border-[#f5f0e6]/10 bg-[#111113] p-3.5">
                    <p
                      dir={isRtl ? "rtl" : "ltr"}
                      className="font-epigraphy line-clamp-2 text-lg leading-relaxed text-[#f5f0e6]"
                    >
                      {artifact.excerptOriginal}
                    </p>
                    <p className="mt-2 truncate font-mono text-[11px] text-[#d97706]">
                      {artifact.excerptTransliteration}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="mt-3.5 line-clamp-3 text-sm leading-relaxed text-[#a8a29e]">
                    {artifact.description[locale]}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="mt-5 flex items-center justify-between border-t border-[#f5f0e6]/10 pt-3.5">
                  <span className="inline-flex items-center gap-1.5 truncate pr-2 text-xs text-[#a8a29e]">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-[#d97706]" />
                    <span className="truncate">{artifact.location[locale]}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectArtifact(artifact)}
                    className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-[#d97706]/40 bg-[#d97706]/10 px-3 py-1.5 font-mono text-xs font-medium text-[#f5f0e6] transition-colors hover:bg-[#d97706] hover:text-[#111113]"
                  >
                    <span>{locale === "tr" ? "İncele" : "Inspect"}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
