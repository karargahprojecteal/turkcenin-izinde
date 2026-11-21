"use client";

import React, { useState } from "react";
import { BookMarked, ExternalLink, X, Filter } from "lucide-react";
import type { AcademicSource } from "@/data/bibliography";
import type { Locale } from "@/data/i18n";

interface BibliographyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  sources: AcademicSource[];
  activePeriodSourceIds: string[];
  activePeriodTitle: string;
}

type SourceTypeFilter = "all" | AcademicSource["type"];

const TYPE_LABELS: Record<SourceTypeFilter, { tr: string; en: string }> = {
  all: { tr: "Tümü", en: "All" },
  book: { tr: "Kitap", en: "Book" },
  encyclopedia: { tr: "Ansiklopedi", en: "Encyclopedia" },
  unesco: { tr: "UNESCO", en: "UNESCO" },
  journal: { tr: "Makale", en: "Journal" },
  archive: { tr: "Arşiv", en: "Archive" },
};

export function SourceCard({
  source,
  locale,
  isHighlighted,
}: {
  source: AcademicSource;
  locale: Locale;
  isHighlighted: boolean;
}) {
  return (
    <article
      className={`rounded-xl border p-4 transition-colors ${
        isHighlighted
          ? "border-[#b45309]/60 bg-[#b45309]/5 ring-1 ring-[#b45309]/15"
          : "border-[#e6dccb] bg-[#faf7f2] hover:border-[#d6cbb8]"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="rounded border border-[#d6cbb8] bg-[#f3ede2] px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#57534e]">
            {TYPE_LABELS[source.type][locale]}
          </span>
          <span className="font-mono text-xs text-[#78716c]">
            {source.year}
          </span>
          {isHighlighted && (
            <span className="rounded-full bg-[#b45309] px-2 py-0.5 text-[10px] font-semibold text-[#faf7f2]">
              {locale === "tr" ? "Seçili Dönem Kaynağı" : "Active Period"}
            </span>
          )}
        </div>
        <span className="font-mono text-[11px] text-[#78716c]">
          #{source.id}
        </span>
      </div>

      <p className="mt-2 font-serif text-sm font-medium leading-relaxed text-[#1c1917]">
        {source.citation}
      </p>

      <p className="mt-1.5 text-xs leading-relaxed text-[#57534e]">
        {source.supports[locale]}
      </p>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#e6dccb]/80 pt-2.5 text-[11px] text-[#78716c]">
        <span>{source.authorOrInstitution}</span>
        <div className="flex items-center gap-3">
          {source.doi && (
            <span className="font-mono">DOI: {source.doi}</span>
          )}
          {source.url && (
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-[#b45309] underline-offset-2 hover:underline"
            >
              <span>{locale === "tr" ? "Kaynağa Git" : "Open Source"}</span>
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function BibliographyDrawer({
  isOpen,
  onClose,
  locale,
  sources,
  activePeriodSourceIds,
  activePeriodTitle,
}: BibliographyDrawerProps) {
  const [filterType, setFilterType] = useState<SourceTypeFilter>("all");
  const [onlyActive, setOnlyActive] = useState(false);

  if (!isOpen) return null;

  const filteredSources = sources.filter((s) => {
    if (onlyActive && !activePeriodSourceIds.includes(s.id)) return false;
    if (filterType !== "all" && s.type !== filterType) return false;
    return true;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#1c1917]/40 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bib-drawer-title"
    >
      <div className="flex h-full w-full max-w-2xl flex-col border-l border-[#d6cbb8] bg-[#faf7f2] shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#e6dccb] bg-[#f3ede2] px-6 py-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#b45309]">
              <BookMarked className="h-3.5 w-3.5" aria-hidden="true" />
              <span>
                {locale === "tr"
                  ? "Doğrulanmış Akademik Kaynakça"
                  : "Verified Academic Bibliography"}
              </span>
            </div>
            <h2
              id="bib-drawer-title"
              className="mt-1 font-serif text-2xl font-semibold text-[#1c1917]"
            >
              {locale === "tr" ? "Kaynakça Arşivi" : "Bibliography Archive"} (
              {filteredSources.length})
            </h2>
            <p className="mt-0.5 text-xs text-[#57534e]">
              {locale === "tr"
                ? `Seçili dönem: ${activePeriodTitle}`
                : `Active period: ${activePeriodTitle}`}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={locale === "tr" ? "Kapat" : "Close"}
            className="rounded-lg border border-[#d6cbb8] bg-[#faf7f2] p-2 text-[#44403c] transition-colors hover:bg-[#efe7d8] hover:text-[#1c1917]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e6dccb] bg-[#faf7f2] px-6 py-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <Filter className="mr-1 h-3.5 w-3.5 text-[#78716c]" />
            {(Object.keys(TYPE_LABELS) as SourceTypeFilter[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFilterType(t)}
                className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                  filterType === t
                    ? "bg-[#1c1917] text-[#faf7f2]"
                    : "bg-[#f3ede2] text-[#44403c] hover:bg-[#e6dccb]"
                }`}
              >
                {TYPE_LABELS[t][locale]}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setOnlyActive((prev) => !prev)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              onlyActive
                ? "border-[#b45309] bg-[#b45309]/10 text-[#92400e]"
                : "border-[#d6cbb8] bg-white text-[#57534e] hover:border-[#b45309]/40"
            }`}
          >
            {locale === "tr"
              ? "Yalnızca Seçili Dönem"
              : "Active Period Only"}
          </button>
        </div>

        {/* Source list */}
        <div className="chronos-scroll flex-1 space-y-3 overflow-y-auto p-6">
          {filteredSources.map((source) => (
            <SourceCard
              key={source.id}
              source={source}
              locale={locale}
              isHighlighted={activePeriodSourceIds.includes(source.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
