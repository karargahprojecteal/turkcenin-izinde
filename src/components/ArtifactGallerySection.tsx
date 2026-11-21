"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  MapPin,
  Award,
  X,
  BookOpen,
  Languages,
  Clock,
  Layers,
} from "lucide-react";
import { Locale, UI_COPY } from "@/data/i18n";
import { HISTORICAL_ARTIFACTS, HistoricalArtifact } from "@/data/artifacts";
import { ALPHABET_SYSTEMS } from "@/data/alphabets";
import { HISTORICAL_PERIODS } from "@/data/periods";
import { ACADEMIC_SOURCES } from "@/data/bibliography";

interface ArtifactGallerySectionProps {
  locale: Locale;
  selectedArtifactId: string | null;
  onSelectArtifact: (id: string | null) => void;
  onNavigateToPeriod: (periodId: string) => void;
  onNavigateToScript: (scriptId: string) => void;
  onNavigateToSource: (sourceId: string) => void;
}

export function ArtifactGallerySection({
  locale,
  selectedArtifactId,
  onSelectArtifact,
  onNavigateToPeriod,
  onNavigateToScript,
  onNavigateToSource,
}: ArtifactGallerySectionProps) {
  const copy = UI_COPY[locale];
  const [scriptFilter, setScriptFilter] = useState<string>("all");

  const filteredArtifacts = useMemo(() => {
    if (scriptFilter === "all") return HISTORICAL_ARTIFACTS;
    return HISTORICAL_ARTIFACTS.filter((a) => a.scriptId === scriptFilter);
  }, [scriptFilter]);

  const activeArtifact: HistoricalArtifact | null = useMemo(() => {
    if (!selectedArtifactId) return null;
    return HISTORICAL_ARTIFACTS.find((a) => a.id === selectedArtifactId) || null;
  }, [selectedArtifactId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeArtifact) {
        onSelectArtifact(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeArtifact, onSelectArtifact]);

  const uniqueScriptIds = Array.from(
    new Set(HISTORICAL_ARTIFACTS.map((a) => a.scriptId))
  );

  return (
    <div className="space-y-6">
      {/* Header & Script Filter */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#e2dacb] pb-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#0f172a] sm:text-3xl">
            {copy.nav.artifacts}
          </h2>
          <p className="mt-1 text-sm text-[#0f172a]/70">
            {locale === "tr"
              ? "Türkçenin yazılı tarihini kanıtlayan anıtsal yazıtlar, el yazmaları, sözlükler ve arşiv belgeleri."
              : "Monumental inscriptions, Silk Road manuscripts, lexicons, and archival milestones attesting Turkic history."}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setScriptFilter("all")}
            className={`focus-museum rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              scriptFilter === "all"
                ? "bg-[#0f172a] text-white"
                : "border border-[#e2dacb] bg-white text-[#0f172a]/80 hover:border-[#0e7490]"
            }`}
          >
            {locale === "tr" ? "Tümü" : "All"} ({HISTORICAL_ARTIFACTS.length})
          </button>
          {uniqueScriptIds.map((sid) => {
            const scriptObj = ALPHABET_SYSTEMS.find((s) => s.id === sid);
            return (
              <button
                key={sid}
                type="button"
                onClick={() => setScriptFilter(sid)}
                className={`focus-museum rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  scriptFilter === sid
                    ? "bg-[#0f172a] text-white"
                    : "border border-[#e2dacb] bg-white text-[#0f172a]/80 hover:border-[#0e7490]"
                }`}
              >
                {scriptObj ? scriptObj.name[locale].split("(")[0].trim() : sid}
              </button>
            );
          })}
        </div>
      </div>

      {/* Museum Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredArtifacts.map((artifact) => {
          const scriptObj = ALPHABET_SYSTEMS.find(
            (s) => s.id === artifact.scriptId
          );
          return (
            <button
              key={artifact.id}
              type="button"
              onClick={() => onSelectArtifact(artifact.id)}
              className="focus-museum group flex flex-col justify-between rounded-2xl border border-[#e2dacb] bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0e7490] hover:shadow-md"
            >
              <div className="w-full">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-md bg-[#f1ede4] px-2.5 py-1 font-mono text-[11px] font-bold text-[#b45309]">
                    {artifact.date}
                  </span>
                  {artifact.unescoStatus && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#0e7490]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#0e7490]">
                      <Award className="h-3 w-3" />
                      UNESCO
                    </span>
                  )}
                </div>

                <h3 className="mt-3 font-serif text-lg font-bold text-[#0f172a] group-hover:text-[#0e7490]">
                  {artifact.title[locale]}
                </h3>

                <div className="mt-1 flex items-center gap-1.5 text-xs text-[#0f172a]/65">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-[#0e7490]" />
                  <span className="line-clamp-1">{artifact.location[locale]}</span>
                </div>

                {/* Excerpt Preview */}
                <div className="mt-4 rounded-xl bg-[#0f172a] p-3.5 text-center">
                  <p className="line-clamp-2 font-serif text-base text-[#f8f6f1]">
                    {artifact.excerptOriginal}
                  </p>
                  <p className="mt-1.5 line-clamp-1 font-mono text-[11px] text-[#7dd3fc]">
                    {artifact.excerptTransliteration}
                  </p>
                </div>

                <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-[#0f172a]/80">
                  {artifact.description[locale]}
                </p>
              </div>

              <div className="mt-4 flex w-full items-center justify-between border-t border-[#e2dacb] pt-3 text-[11px] font-semibold text-[#0e7490]">
                <span>
                  {scriptObj
                    ? scriptObj.name[locale].split("(")[0].trim()
                    : artifact.scriptId}
                </span>
                <span>{locale === "tr" ? "Detayı İncele →" : "Inspect Artifact →"}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Artifact Detail Modal */}
      {activeArtifact && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="artifact-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/70 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) onSelectArtifact(null);
          }}
        >
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#e2dacb] bg-[#f8f6f1] p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4 border-b border-[#e2dacb] pb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-[#b45309] px-2.5 py-0.5 font-mono text-xs font-bold text-white">
                    {activeArtifact.date}
                  </span>
                  {activeArtifact.unescoStatus && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#0e7490] px-2.5 py-0.5 text-xs font-bold text-white">
                      <Award className="h-3.5 w-3.5" />
                      {activeArtifact.unescoStatus[locale]}
                    </span>
                  )}
                </div>
                <h3
                  id="artifact-modal-title"
                  className="mt-2 font-serif text-2xl font-bold text-[#0f172a]"
                >
                  {activeArtifact.title[locale]}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onSelectArtifact(null)}
                aria-label={locale === "tr" ? "Kapat" : "Close"}
                className="focus-museum rounded-lg border border-[#e2dacb] bg-white p-2 text-[#0f172a] hover:border-[#0e7490]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 space-y-5">
              {/* Excerpt Showcase */}
              <div className="rounded-xl bg-[#0f172a] p-5 text-center text-[#f8f6f1]">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#fbbf24]">
                  {locale === "tr" ? "Özgün Metin Kesiti" : "Primary Text Excerpt"}
                </div>
                <p className="mt-2 font-serif text-xl leading-relaxed sm:text-2xl">
                  {activeArtifact.excerptOriginal}
                </p>
                <p className="mt-2 font-mono text-xs text-[#7dd3fc]">
                  {activeArtifact.excerptTransliteration}
                </p>
                <p className="mt-2 border-t border-white/15 pt-2 text-xs italic text-[#cbd5e1]">
                  “{activeArtifact.excerptTranslation[locale]}”
                </p>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed text-[#0f172a]/90">
                {activeArtifact.description[locale]}
              </p>

              {/* Museum Metadata */}
              <div className="grid gap-3 rounded-xl border border-[#e2dacb] bg-white p-4 text-xs sm:grid-cols-2">
                <div>
                  <span className="font-bold text-[#0e7490]">
                    {locale === "tr" ? "Buluntu / Yazım Yeri:" : "Origin / Location:"}
                  </span>
                  <p className="mt-0.5 text-[#0f172a]">{activeArtifact.location[locale]}</p>
                </div>
                <div>
                  <span className="font-bold text-[#0e7490]">
                    {locale === "tr" ? "Korunduğu Kurum:" : "Repository:"}
                  </span>
                  <p className="mt-0.5 text-[#0f172a]">{activeArtifact.repository[locale]}</p>
                </div>
                <div className="sm:col-span-2">
                  <span className="font-bold text-[#0e7490]">
                    {locale === "tr" ? "Materyal / Fiziksel Tanım:" : "Material / Format:"}
                  </span>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[#0f172a]">
                    <Layers className="h-3.5 w-3.5 text-[#b45309]" />
                    <span>{activeArtifact.material[locale]}</span>
                  </p>
                </div>
              </div>

              {/* Cross-links */}
              <div className="flex flex-wrap gap-2 border-t border-[#e2dacb] pt-4">
                {(() => {
                  const p = HISTORICAL_PERIODS.find(
                    (per) => per.id === activeArtifact.periodId
                  );
                  if (!p) return null;
                  return (
                    <button
                      type="button"
                      onClick={() => {
                        onSelectArtifact(null);
                        onNavigateToPeriod(p.id);
                      }}
                      className="focus-museum inline-flex items-center gap-1.5 rounded-lg border border-[#0e7490]/30 bg-white px-3 py-1.5 text-xs font-semibold text-[#0e7490] hover:bg-[#0e7490] hover:text-white"
                    >
                      <Clock className="h-3.5 w-3.5" />
                      <span>{p.title[locale]}</span>
                    </button>
                  );
                })()}

                {(() => {
                  const sc = ALPHABET_SYSTEMS.find(
                    (s) => s.id === activeArtifact.scriptId
                  );
                  if (!sc) return null;
                  return (
                    <button
                      type="button"
                      onClick={() => {
                        onSelectArtifact(null);
                        onNavigateToScript(sc.id);
                      }}
                      className="focus-museum inline-flex items-center gap-1.5 rounded-lg border border-[#b45309]/30 bg-white px-3 py-1.5 text-xs font-semibold text-[#b45309] hover:bg-[#b45309] hover:text-white"
                    >
                      <Languages className="h-3.5 w-3.5" />
                      <span>{sc.name[locale].split("(")[0].trim()}</span>
                    </button>
                  );
                })()}

                {activeArtifact.sourceIds.map((srcId) => {
                  const src = ACADEMIC_SOURCES.find((s) => s.id === srcId);
                  if (!src) return null;
                  return (
                    <button
                      key={src.id}
                      type="button"
                      onClick={() => {
                        onSelectArtifact(null);
                        onNavigateToSource(src.id);
                      }}
                      className="focus-museum inline-flex items-center gap-1.5 rounded-lg border border-[#e2dacb] bg-white px-3 py-1.5 text-xs font-medium text-[#0f172a] hover:border-[#0f172a]"
                    >
                      <BookOpen className="h-3.5 w-3.5 text-[#0e7490]" />
                      <span>{src.authorOrInstitution}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
