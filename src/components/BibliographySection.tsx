"use client";

import React, { useMemo, useState } from "react";
import {
  BookOpen,
  ExternalLink,
  Copy,
  Check,
  Search,
} from "lucide-react";
import { Locale, UI_COPY } from "@/data/i18n";
import { ACADEMIC_SOURCES, AcademicSource } from "@/data/bibliography";

interface BibliographySectionProps {
  locale: Locale;
  highlightedSourceId: string | null;
}

type SourceTypeFilter = "all" | AcademicSource["type"];

export function BibliographySection({
  locale,
  highlightedSourceId,
}: BibliographySectionProps) {
  const copy = UI_COPY[locale];
  const [typeFilter, setTypeFilter] = useState<SourceTypeFilter>("all");
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredSources = useMemo(() => {
    return ACADEMIC_SOURCES.filter((src) => {
      const matchesType = typeFilter === "all" || src.type === typeFilter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        src.citation.toLowerCase().includes(q) ||
        src.authorOrInstitution.toLowerCase().includes(q) ||
        src.supports[locale].toLowerCase().includes(q);
      return matchesType && matchesQuery;
    });
  }, [typeFilter, query, locale]);

  const handleCopy = async (id: string, citation: string) => {
    try {
      await navigator.clipboard.writeText(citation);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // Clipboard may be unavailable in restricted contexts
    }
  };

  const typeLabels: Record<SourceTypeFilter, { tr: string; en: string }> = {
    all: { tr: "Tümü", en: "All" },
    book: { tr: "Kitap", en: "Book" },
    encyclopedia: { tr: "Ansiklopedi", en: "Encyclopedia" },
    unesco: { tr: "UNESCO", en: "UNESCO" },
    journal: { tr: "Makale", en: "Journal" },
    archive: { tr: "Arşiv", en: "Archive" },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-[#e2dacb] pb-4">
        <h2 className="font-serif text-2xl font-bold text-[#0f172a] sm:text-3xl">
          {copy.sourcesHeading}
        </h2>
        <p className="mt-1 text-sm text-[#0f172a]/70">
          {locale === "tr"
            ? "Atlastaki tüm tarihsel dönemler, sınıflandırmalar ve eser künyeleri aşağıdaki hakemli ve kurumsal kaynaklara dayanmaktadır."
            : "All historical periods, classifications, and artifact records in this atlas are grounded in the peer-reviewed and institutional sources below."}
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-1.5">
          {(["all", "book", "encyclopedia", "unesco", "journal", "archive"] as const).map(
            (t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTypeFilter(t)}
                className={`focus-museum rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  typeFilter === t
                    ? "bg-[#0f172a] text-white"
                    : "border border-[#e2dacb] bg-white text-[#0f172a]/80 hover:border-[#0e7490]"
                }`}
              >
                {typeLabels[t][locale]}
              </button>
            )
          )}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#0e7490]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={locale === "tr" ? "Kaynakça içinde ara..." : "Filter bibliography..."}
            aria-label={locale === "tr" ? "Kaynakça içinde ara" : "Filter bibliography"}
            className="focus-museum w-full rounded-lg border border-[#e2dacb] bg-white py-1.5 pl-9 pr-3 text-xs text-[#0f172a] placeholder:text-[#0f172a]/50"
          />
        </div>
      </div>

      {/* Sources List */}
      <div className="space-y-3">
        {filteredSources.map((src) => {
          const isHighlighted = highlightedSourceId === src.id;
          return (
            <article
              key={src.id}
              className={`rounded-2xl border p-5 transition-all ${
                isHighlighted
                  ? "border-2 border-[#0e7490] bg-[#0e7490]/5 shadow-md"
                  : "border-[#e2dacb] bg-white shadow-sm hover:border-[#0e7490]/50"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-md bg-[#0f172a] px-2.5 py-0.5 text-[11px] font-bold uppercase text-[#f8f6f1]">
                    <BookOpen className="h-3 w-3 text-[#38bdf8]" />
                    {typeLabels[src.type][locale]}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#b45309]">
                    {src.year}
                  </span>
                  <span className="text-xs font-semibold text-[#0e7490]">
                    {src.authorOrInstitution}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(src.id, src.citation)}
                    className="focus-museum inline-flex items-center gap-1 rounded-lg border border-[#e2dacb] bg-[#f8f6f1] px-2.5 py-1 text-[11px] font-semibold text-[#0f172a] hover:border-[#0e7490]"
                  >
                    {copiedId === src.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#0e7490]" />
                        <span>{locale === "tr" ? "Kopyalandı" : "Copied"}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-[#0e7490]" />
                        <span>{locale === "tr" ? "Künyeyi Kopyala" : "Copy Citation"}</span>
                      </>
                    )}
                  </button>

                  {src.url && (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-museum inline-flex items-center gap-1 rounded-lg bg-[#0e7490] px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-[#0891b2]"
                    >
                      <span>{locale === "tr" ? "Kaynak" : "Source"}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>

              <p className="mt-3 font-serif text-sm font-medium leading-relaxed text-[#0f172a]">
                {src.citation}
              </p>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#e2dacb] pt-2.5 text-xs text-[#0f172a]/75">
                <span>
                  <strong className="text-[#0e7490]">
                    {locale === "tr" ? "Desteklediği Kapsam: " : "Supports: "}
                  </strong>
                  {src.supports[locale]}
                </span>
                {src.doi && (
                  <span className="font-mono text-[11px] text-[#0f172a]/60">
                    DOI: {src.doi}
                  </span>
                )}
              </div>
            </article>
          );
        })}

        {filteredSources.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#e2dacb] bg-white p-8 text-center text-sm text-[#0f172a]/65">
            {locale === "tr"
              ? "Eşleşen akademik kaynak bulunamadı."
              : "No matching academic sources found."}
          </div>
        )}
      </div>
    </div>
  );
}
