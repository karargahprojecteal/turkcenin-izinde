"use client";

import React, { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  BookOpen,
  Languages,
  ShieldCheck,
  Sparkles,
  FileText,
} from "lucide-react";
import { Locale, UI_COPY } from "@/data/i18n";
import {
  HISTORICAL_PERIODS,
  EpistemicStatus,
} from "@/data/periods";
import { ALPHABET_SYSTEMS } from "@/data/alphabets";
import { ACADEMIC_SOURCES } from "@/data/bibliography";

interface TimelineSectionProps {
  locale: Locale;
  selectedPeriodId: string;
  onSelectPeriod: (id: string) => void;
  onNavigateToScript: (scriptId: string) => void;
  onNavigateToSource: (sourceId: string) => void;
}

export function TimelineSection({
  locale,
  selectedPeriodId,
  onSelectPeriod,
  onNavigateToScript,
  onNavigateToSource,
}: TimelineSectionProps) {
  const copy = UI_COPY[locale];
  const [statusFilter, setStatusFilter] = useState<"all" | EpistemicStatus>("all");

  const filteredPeriods = useMemo(() => {
    if (statusFilter === "all") return HISTORICAL_PERIODS;
    return HISTORICAL_PERIODS.filter((p) => p.status === statusFilter);
  }, [statusFilter]);

  const activePeriod = useMemo(() => {
    return (
      filteredPeriods.find((p) => p.id === selectedPeriodId) ||
      filteredPeriods[0] ||
      HISTORICAL_PERIODS[0]
    );
  }, [filteredPeriods, selectedPeriodId]);

  const activeIndex = filteredPeriods.findIndex((p) => p.id === activePeriod.id);

  const handleStep = (delta: number) => {
    if (filteredPeriods.length === 0) return;
    const nextIdx =
      (activeIndex + delta + filteredPeriods.length) % filteredPeriods.length;
    onSelectPeriod(filteredPeriods[nextIdx].id);
  };

  const handleTrackKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      handleStep(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      handleStep(-1);
    }
  };

  const formatYear = (year: number | null) => {
    if (year === null) return locale === "tr" ? "Günümüz" : "Present";
    if (year < 0) return locale === "tr" ? `MÖ ${Math.abs(year)}` : `${Math.abs(year)} BCE`;
    return `${year}`;
  };

  return (
    <div className="space-y-6">
      {/* Section Header & Filter */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#e2dacb] pb-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#0f172a] sm:text-3xl">
            {copy.nav.timeline}
          </h2>
          <p className="mt-1 text-sm text-[#0f172a]/70">
            {locale === "tr"
              ? "Proto-Türkçe rekonstrüksiyonundan çağdaş döneme 10 tarihsel katman. Sol/sağ ok tuşlarıyla gezinebilirsiniz."
              : "10 historical layers from Proto-Turkic reconstruction to the contemporary era. Navigate with Left/Right arrow keys."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(["all", "attested", "reconstructed"] as const).map((status) => {
            const active = statusFilter === status;
            const label =
              status === "all"
                ? locale === "tr"
                  ? "Tümü (10)"
                  : "All (10)"
                : status === "attested"
                ? locale === "tr"
                  ? "Kanıtlanmış (9)"
                  : "Attested (9)"
                : locale === "tr"
                ? "Kuramsal (1)"
                : "Reconstructed (1)";
            return (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`focus-museum rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  active
                    ? "bg-[#0f172a] text-white shadow-sm"
                    : "border border-[#e2dacb] bg-white text-[#0f172a]/80 hover:border-[#0e7490]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Horizontal Interactive Timeline Track */}
      <div
        role="region"
        aria-label={locale === "tr" ? "Kronolojik Zaman Çizelgesi" : "Chronological Timeline"}
        onKeyDown={handleTrackKeyDown}
        className="rounded-2xl border border-[#e2dacb] bg-white p-4 shadow-sm sm:p-5"
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-xs font-semibold text-[#0e7490]">
            {activeIndex + 1} / {filteredPeriods.length} · {activePeriod.dateLabel[locale]}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleStep(-1)}
              aria-label={locale === "tr" ? "Önceki dönem" : "Previous period"}
              className="focus-museum rounded-lg border border-[#e2dacb] bg-[#f8f6f1] p-1.5 text-[#0f172a] hover:border-[#0e7490] hover:text-[#0e7490]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => handleStep(1)}
              aria-label={locale === "tr" ? "Sonraki dönem" : "Next period"}
              className="focus-museum rounded-lg border border-[#e2dacb] bg-[#f8f6f1] p-1.5 text-[#0f172a] hover:border-[#0e7490] hover:text-[#0e7490]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative flex gap-3 overflow-x-auto pb-2 pt-1">
          {filteredPeriods.map((period) => {
            const isSelected = period.id === activePeriod.id;
            const isReconstructed = period.status === "reconstructed";

            return (
              <button
                key={period.id}
                type="button"
                onClick={() => onSelectPeriod(period.id)}
                aria-pressed={isSelected}
                className={`focus-museum group relative flex min-w-[185px] shrink-0 flex-col justify-between rounded-xl border p-3.5 text-left transition-all ${
                  isSelected
                    ? "border-[#0e7490] bg-[#0f172a] text-[#f8f6f1] shadow-md"
                    : isReconstructed
                    ? "border-dashed border-[#b45309]/60 bg-[#b45309]/5 text-[#0f172a] hover:border-[#b45309]"
                    : "border-[#e2dacb] bg-[#f8f6f1] text-[#0f172a] hover:border-[#0e7490] hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`font-mono text-[11px] font-bold ${
                      isSelected
                        ? "text-[#7dd3fc]"
                        : isReconstructed
                        ? "text-[#b45309]"
                        : "text-[#0e7490]"
                    }`}
                  >
                    {formatYear(period.startYear)} – {formatYear(period.endYear)}
                  </span>
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isReconstructed ? "bg-[#b45309]" : "bg-[#0e7490]"
                    }`}
                  />
                </div>
                <div className="mt-2 font-serif text-sm font-bold leading-snug">
                  {period.title[locale]}
                </div>
                <div
                  className={`mt-1 line-clamp-1 text-[11px] ${
                    isSelected ? "text-[#cbd5e1]" : "text-[#0f172a]/60"
                  }`}
                >
                  {period.region[locale]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Period Detail Panel */}
      <article className="rounded-2xl border border-[#e2dacb] bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#e2dacb] pb-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white ${
                  activePeriod.status === "reconstructed"
                    ? "bg-[#b45309]"
                    : "bg-[#0e7490]"
                }`}
              >
                {activePeriod.status === "reconstructed" ? (
                  <Sparkles className="h-3.5 w-3.5" />
                ) : (
                  <ShieldCheck className="h-3.5 w-3.5" />
                )}
                {activePeriod.status === "reconstructed"
                  ? copy.badges.reconstructed
                  : copy.badges.attested}
              </span>
              <span className="rounded-full border border-[#e2dacb] bg-[#f8f6f1] px-3 py-1 font-mono text-xs font-semibold text-[#0f172a]">
                {activePeriod.dateLabel[locale]}
              </span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#0f172a] sm:text-3xl">
              {activePeriod.title[locale]}
            </h3>
            <p className="text-sm font-medium text-[#0e7490]">
              {activePeriod.subtitle[locale]}
            </p>
          </div>

          <div className="rounded-xl border border-[#e2dacb] bg-[#f8f6f1] px-4 py-3 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-[#0f172a]">
              <MapPin className="h-3.5 w-3.5 text-[#0e7490]" />
              <span>{activePeriod.region[locale]}</span>
            </div>
            <div className="mt-1 font-mono text-[11px] text-[#0f172a]/60">
              {activePeriod.coordinates.lat.toFixed(2)}°N,{" "}
              {activePeriod.coordinates.lng.toFixed(2)}°E
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {/* Left Column: Summary & Highlights */}
          <div className="space-y-6 lg:col-span-7">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0f172a]/60">
                {locale === "tr" ? "Tarihsel ve Dilbilimsel Özet" : "Historical & Linguistic Summary"}
              </h4>
              <p className="mt-2 text-base leading-relaxed text-[#0f172a]/90">
                {activePeriod.summary[locale]}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0f172a]/60">
                {locale === "tr" ? "Öne Çıkan Dil Özellikleri" : "Linguistic Highlights"}
              </h4>
              <ul className="mt-2.5 space-y-2">
                {activePeriod.linguisticHighlights[locale].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 rounded-lg bg-[#f8f6f1] px-3.5 py-2.5 text-sm text-[#0f172a]/85"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0e7490]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[#b45309]/30 bg-[#b45309]/5 p-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#b45309]">
                {locale === "tr" ? "Akademik Not" : "Academic Note"}
              </div>
              <p className="mt-1 text-sm leading-relaxed text-[#0f172a]/85">
                {activePeriod.academicNote[locale]}
              </p>
            </div>
          </div>

          {/* Right Column: Key Works, Scripts, Sources */}
          <div className="space-y-5 lg:col-span-5">
            <div className="rounded-xl border border-[#e2dacb] bg-[#f8f6f1] p-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0f172a]">
                <FileText className="h-4 w-4 text-[#0e7490]" />
                <span>
                  {locale === "tr" ? "Temel Eserler / Tanıklıklar" : "Key Works & Attestations"}
                </span>
              </div>
              <ul className="mt-3 space-y-1.5">
                {activePeriod.keyWorks.map((work) => (
                  <li
                    key={work}
                    className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-[#0f172a] shadow-sm"
                  >
                    {work}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[#e2dacb] bg-[#f8f6f1] p-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0f172a]">
                <Languages className="h-4 w-4 text-[#0e7490]" />
                <span>
                  {locale === "tr" ? "Kullanılan Yazı Sistemleri" : "Scripts Used"}
                </span>
              </div>
              {activePeriod.scripts.length === 0 ? (
                <p className="mt-2 text-xs italic text-[#0f172a]/70">
                  {locale === "tr"
                    ? "Yazı öncesi dönem — doğrudan alfabe belgesi yoktur."
                    : "Pre-literary period — no direct script records."}
                </p>
              ) : (
                <div className="mt-3 flex flex-wrap gap-2">
                  {activePeriod.scripts.map((scriptId) => {
                    const matched = ALPHABET_SYSTEMS.find((a) => a.id === scriptId);
                    return (
                      <button
                        key={scriptId}
                        type="button"
                        onClick={() => {
                          if (matched) onNavigateToScript(matched.id);
                        }}
                        disabled={!matched}
                        className={`focus-museum rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                          matched
                            ? "border border-[#0e7490]/30 bg-white text-[#0e7490] hover:bg-[#0e7490] hover:text-white"
                            : "border border-[#e2dacb] bg-white/60 text-[#0f172a]/60"
                        }`}
                      >
                        {matched ? matched.name[locale] : scriptId}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="rounded-xl border border-[#e2dacb] bg-[#f8f6f1] p-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0f172a]">
                <BookOpen className="h-4 w-4 text-[#b45309]" />
                <span>{copy.sourcesHeading}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {activePeriod.sourceIds.map((srcId) => {
                  const src = ACADEMIC_SOURCES.find((s) => s.id === srcId);
                  if (!src) return null;
                  return (
                    <button
                      key={src.id}
                      type="button"
                      onClick={() => onNavigateToSource(src.id)}
                      className="focus-museum rounded-lg border border-[#b45309]/30 bg-white px-2.5 py-1.5 text-left text-xs font-medium text-[#0f172a] transition-colors hover:border-[#b45309] hover:bg-[#b45309]/10"
                    >
                      {src.authorOrInstitution} ({src.year})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
