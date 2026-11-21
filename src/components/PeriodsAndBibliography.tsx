"use client";

import React, { useState } from "react";
import { BookOpen, Clock, ExternalLink } from "lucide-react";
import { HISTORICAL_PERIODS } from "@/data/periods";
import { ACADEMIC_SOURCES, AcademicSource } from "@/data/bibliography";
import { Locale, UI_COPY } from "@/data/i18n";

interface PeriodsAndBibliographyProps {
  locale: Locale;
}

export function PeriodsAndBibliography({ locale }: PeriodsAndBibliographyProps) {
  const copy = UI_COPY[locale];
  const [sourceTypeFilter, setSourceTypeFilter] = useState<
    "all" | AcademicSource["type"]
  >("all");
  const [expandedPeriodId, setExpandedPeriodId] = useState<string>("proto-turkic");

  const filteredSources =
    sourceTypeFilter === "all"
      ? ACADEMIC_SOURCES
      : ACADEMIC_SOURCES.filter((s) => s.type === sourceTypeFilter);

  return (
    <>
      {/* Historical Periods Context Section (from periods.ts) */}
      <section id="periods" className="scroll-mt-20 border-t border-slate-300 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 border-b border-slate-300 pb-5 md:flex-row md:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-slate-500">
                <Clock className="h-4 w-4" />
                {locale === "tr"
                  ? "TARİHSEL KATMANLAR & KANITLANMIŞLIK"
                  : "HISTORICAL LAYERS & ATTESTATION"}
              </div>
              <h2 className="font-serif text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                {locale === "tr"
                  ? "Dönemler ve Yazılı Belgeleme"
                  : "Historical Periods & Written Attestation"}
              </h2>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-slate-600">
              {locale === "tr"
                ? "Genetik dil ağacı (kollar) ile tarihsel yazı dili dönemleri birbirini tamamlar; kuramsal Proto-Türkçe yazılı belgelerden kesin olarak ayrılır."
                : "Genetic language branches complement historical literary periods; reconstructed Proto-Turkic is strictly distinguished from attested written eras."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px border border-slate-300 bg-slate-300 md:grid-cols-2 lg:grid-cols-4">
            {HISTORICAL_PERIODS.map((period) => {
              const isReconstructed = period.status === "reconstructed";
              const isExpanded = expandedPeriodId === period.id;

              return (
                <div
                  key={period.id}
                  className={`flex flex-col justify-between bg-white p-4 transition-colors ${
                    isExpanded ? "ring-1 ring-inset ring-slate-900" : ""
                  }`}
                >
                  <div>
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] font-semibold text-slate-400">
                        0{period.order}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 font-mono text-[9.5px] font-semibold uppercase ${
                          isReconstructed
                            ? "border border-dashed border-slate-800 bg-slate-50 text-slate-900"
                            : "border border-blue-200 bg-blue-50 text-blue-800"
                        }`}
                      >
                        {isReconstructed
                          ? locale === "tr"
                            ? "Kuramsal"
                            : "Reconstructed"
                          : locale === "tr"
                            ? "Belgelenmiş"
                            : "Attested"}
                      </span>
                    </div>

                    <div className="font-mono text-[11px] text-slate-500">
                      {period.dateLabel[locale]}
                    </div>
                    <h3 className="mt-1 font-serif text-base font-semibold text-slate-900">
                      {period.title[locale]}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">
                      {isExpanded
                        ? period.summary[locale]
                        : period.subtitle[locale]}
                    </p>
                  </div>

                  <div className="mt-4 border-t border-slate-100 pt-2.5">
                    <div className="mb-2 text-[11px] text-slate-500">
                      <span className="font-semibold text-slate-700">
                        {locale === "tr" ? "Bölge:" : "Region:"}
                      </span>{" "}
                      {period.region[locale]}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedPeriodId(isExpanded ? "" : period.id)
                      }
                      className="font-mono text-[10.5px] font-semibold text-blue-700 hover:underline"
                    >
                      {isExpanded
                        ? locale === "tr"
                          ? "Daralt ↑"
                          : "Collapse ↑"
                        : locale === "tr"
                          ? "Özeti Oku ↓"
                          : "Read Summary ↓"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Academic Bibliography Section (from bibliography.ts) */}
      <section
        id="sources"
        className="scroll-mt-20 border-t border-slate-300 bg-slate-100/70 py-14"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col justify-between gap-4 border-b border-slate-300 pb-5 md:flex-row md:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-slate-500">
                <BookOpen className="h-4 w-4" />
                {locale === "tr" ? "DOĞRULANMIŞ LİTERATÜR" : "VERIFIED LITERATURE"}
              </div>
              <h2 className="font-serif text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                {copy.sourcesHeading}
              </h2>
            </div>

            {/* Source Type Filter */}
            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  { id: "all", label: locale === "tr" ? "Tümü" : "All" },
                  { id: "book", label: locale === "tr" ? "Kitap" : "Book" },
                  { id: "encyclopedia", label: locale === "tr" ? "Ansiklopedi" : "Encyclopedia" },
                  { id: "journal", label: locale === "tr" ? "Makale" : "Journal" },
                  { id: "unesco", label: "UNESCO" },
                  { id: "archive", label: locale === "tr" ? "Arşiv" : "Archive" },
                ] as const
              ).map((tab) => {
                const active = sourceTypeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSourceTypeFilter(tab.id)}
                    className={`border px-2.5 py-1 font-mono text-[11px] uppercase transition-colors ${
                      active
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-300 bg-white text-slate-700 hover:border-slate-500"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSources.map((src) => (
              <article
                key={src.id}
                className="flex flex-col justify-between border border-slate-300 bg-white p-4"
              >
                <div>
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[10px] uppercase text-slate-600">
                      {src.type}
                    </span>
                    <span className="font-mono text-[11px] text-slate-500">
                      {src.year}
                    </span>
                  </div>
                  <h3 className="text-xs font-semibold leading-snug text-slate-900">
                    {src.citation}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {src.supports[locale]}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-2.5 font-mono text-[10.5px]">
                  <span className="text-slate-400">{src.authorOrInstitution}</span>
                  {src.url && (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:underline"
                    >
                      {locale === "tr" ? "Erişim" : "Access"}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
