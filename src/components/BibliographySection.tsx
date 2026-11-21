"use client";

import React, { useMemo, useState } from "react";
import { BookMarked, ExternalLink } from "lucide-react";
import { ACADEMIC_SOURCES, type AcademicSource } from "@/data/bibliography";
import { UI_COPY, type Locale } from "@/data/i18n";

interface BibliographySectionProps {
  locale: Locale;
  highlightedSourceId: string | null;
}

type SourceTypeFilter = "all" | AcademicSource["type"];

export function BibliographySection({
  locale,
  highlightedSourceId,
}: BibliographySectionProps) {
  const [typeFilter, setTypeFilter] = useState<SourceTypeFilter>("all");

  const typeLabels: Record<SourceTypeFilter, { tr: string; en: string }> = {
    all: { tr: "Tümü", en: "All" },
    book: { tr: "Kitap", en: "Books" },
    encyclopedia: { tr: "Ansiklopedi", en: "Encyclopedias" },
    unesco: { tr: "UNESCO", en: "UNESCO" },
    journal: { tr: "Makale", en: "Journals" },
    archive: { tr: "Arşiv", en: "Archives" },
  };

  const filteredSources = useMemo(() => {
    if (typeFilter === "all") return ACADEMIC_SOURCES;
    return ACADEMIC_SOURCES.filter((s) => s.type === typeFilter);
  }, [typeFilter]);

  return (
    <section
      id="bibliography"
      aria-labelledby="bibliography-heading"
      className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col gap-3 border-b border-[#f5f0e6]/10 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#d97706]">
            {locale === "tr"
              ? "BÖLÜM III · DOĞRULANMIŞ KAYNAKÇA"
              : "GALLERY III · VERIFIED BIBLIOGRAPHY"}
          </p>
          <h2
            id="bibliography-heading"
            className="mt-1.5 font-serif text-3xl font-semibold tracking-tight text-[#f5f0e6] sm:text-4xl"
          >
            {UI_COPY[locale].sourcesHeading}
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-[#a8a29e]">
          {locale === "tr"
            ? "Sergide yer alan tüm yazı sistemleri, tarihlendirmeler ve eser açıklamaları aşağıdaki akademik referanslara dayanmaktadır."
            : "All writing systems, datings, and artifact descriptions in this museum are grounded in the peer-reviewed and archival references below."}
        </p>
      </div>

      {/* Type Filter Pills */}
      <div className="mt-6 flex flex-wrap gap-2">
        {(Object.keys(typeLabels) as SourceTypeFilter[]).map((key) => {
          const isActive = typeFilter === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setTypeFilter(key)}
              className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors ${
                isActive
                  ? "border-[#d97706] bg-[#d97706] text-[#111113] font-semibold"
                  : "border-[#f5f0e6]/15 bg-[#1a1a1f] text-[#a8a29e] hover:border-[#d97706]/50 hover:text-[#f5f0e6]"
              }`}
            >
              {typeLabels[key][locale]}
            </button>
          );
        })}
      </div>

      {/* Sources Grid */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {filteredSources.map((source) => {
          const isHighlighted = highlightedSourceId === source.id;
          return (
            <article
              key={source.id}
              id={`source-${source.id}`}
              className={`rounded-xl border p-5 transition-all ${
                isHighlighted
                  ? "border-[#d97706] bg-[#d97706]/10 shadow-[0_0_25px_-8px_rgba(217,119,6,0.5)]"
                  : "border-[#f5f0e6]/10 bg-[#1a1a1f] hover:border-[#d97706]/40"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <BookMarked className="h-4 w-4 shrink-0 text-[#d97706]" />
                  <span className="rounded border border-[#d97706]/35 bg-[#d97706]/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#d97706]">
                    {typeLabels[source.type][locale]} · {source.year}
                  </span>
                </div>
                {source.url && (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1 font-mono text-[11px] text-[#d97706] hover:underline"
                  >
                    <span>{locale === "tr" ? "Erişim" : "Source"}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>

              <p className="mt-3 text-sm font-medium leading-relaxed text-[#f5f0e6]">
                {source.citation}
              </p>

              <p className="mt-2 text-xs leading-relaxed text-[#a8a29e]">
                {source.supports[locale]}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-[#f5f0e6]/10 pt-2.5 font-mono text-[10px] text-[#a8a29e]">
                <span>{source.authorOrInstitution}</span>
                {source.doi && <span>DOI: {source.doi}</span>}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
