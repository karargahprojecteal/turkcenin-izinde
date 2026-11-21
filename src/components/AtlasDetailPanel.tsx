"use client";

import React from "react";
import {
  BookOpen,
  ExternalLink,
  Globe2,
  MapPin,
  ScrollText,
  Sparkles,
  X,
} from "lucide-react";
import { AtlasHub } from "@/data/atlasHubs";
import { HISTORICAL_PERIODS } from "@/data/periods";
import { TURKIC_BRANCHES, TurkicBranch } from "@/data/languageFamily";
import { ACADEMIC_SOURCES } from "@/data/bibliography";
import { ALPHABET_SYSTEMS } from "@/data/alphabets";
import { Locale, UI_COPY } from "@/data/i18n";

interface AtlasDetailPanelProps {
  locale: Locale;
  selectedHub: AtlasHub | null;
  selectedBranch: TurkicBranch | null;
  onCloseMobile?: () => void;
}

export default function AtlasDetailPanel({
  locale,
  selectedHub,
  selectedBranch,
  onCloseMobile,
}: AtlasDetailPanelProps) {
  const copy = UI_COPY[locale];

  // Determine which sources, periods, and languages to display
  const activeMode = selectedHub ? "hub" : selectedBranch ? "branch" : "empty";

  const linkedPeriods = selectedHub
    ? HISTORICAL_PERIODS.filter((p) => selectedHub.periodIds.includes(p.id))
    : [];

  const linkedBranches = selectedHub
    ? TURKIC_BRANCHES.filter((b) => selectedHub.branchIds.includes(b.id))
    : selectedBranch
    ? [selectedBranch]
    : [];

  const linkedLanguages = selectedHub
    ? TURKIC_BRANCHES.flatMap((b) => b.languages).filter((l) =>
        selectedHub.languageIds.includes(l.id)
      )
    : selectedBranch
    ? selectedBranch.languages
    : [];

  const sourceIds = selectedHub
    ? selectedHub.sourceIds
    : selectedBranch
    ? selectedBranch.sourceIds
    : [];

  const verifiedSources = ACADEMIC_SOURCES.filter((s) =>
    sourceIds.includes(s.id)
  );

  const scriptNameById = (id: string) => {
    const found = ALPHABET_SYSTEMS.find((a) => a.id === id);
    return found ? found.name[locale] : id;
  };

  if (activeMode === "empty") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-slate-800/90 bg-[#131e30] p-6 text-center">
        <div className="mb-3 rounded-full bg-[#14b8a6]/15 p-3 text-[#14b8a6]">
          <Globe2 className="h-6 w-6" />
        </div>
        <h3 className="font-serif text-lg font-semibold text-slate-100">
          {locale === "tr" ? "Bir Merkez veya Kol Seçin" : "Select a Hub or Branch"}
        </h3>
        <p className="mt-2 max-w-xs text-sm text-slate-400">
          {locale === "tr"
            ? "Coğrafi bağlamı, sesbilimsel özellikleri, yazılı eserleri ve akademik kaynakları incelemek için haritadaki bir merkeze tıklayın."
            : "Click any regional hub on the map or a language branch below to inspect its geographic context, linguistic traits, and verified sources."}
        </p>
      </div>
    );
  }

  return (
    <aside className="flex h-full flex-col rounded-2xl border border-slate-800/90 bg-[#131e30] shadow-2xl">
      {/* Panel Header */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-800/80 p-5">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#14b8a6]/15 px-2.5 py-0.5 text-[11px] font-semibold text-[#14b8a6]">
              <MapPin className="h-3 w-3" />
              {selectedHub
                ? selectedHub.coordLabel
                : selectedBranch?.macroGroup === "oghur"
                ? "Oğur (r-Turkic)"
                : locale === "tr"
                ? "Genel Türkçe"
                : "Common Turkic"}
            </span>
            {selectedHub && (
              <span className="rounded-full bg-[#f59e0b]/15 px-2.5 py-0.5 font-mono text-[11px] font-medium text-[#f59e0b]">
                {selectedHub.eraSummary[locale]}
              </span>
            )}
          </div>
          <h2 className="mt-2 font-serif text-xl font-bold text-white">
            {selectedHub
              ? selectedHub.name[locale]
              : selectedBranch?.name[locale]}
          </h2>
          <p className="mt-0.5 text-xs text-slate-300">
            {selectedHub
              ? selectedHub.subtitle[locale]
              : selectedBranch?.diagnosticFeature[locale]}
          </p>
        </div>
        {onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label={locale === "tr" ? "Paneli kapat" : "Close panel"}
            className="rounded-lg border border-slate-700/70 p-1.5 text-slate-400 hover:text-white lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 space-y-5 overflow-y-auto p-5">
        {/* Geographic & Linguistic Summary */}
        {selectedHub ? (
          <div className="space-y-3">
            <div className="rounded-xl border border-slate-800 bg-[#0b1320]/70 p-3.5">
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#14b8a6]">
                {locale === "tr" ? "Coğrafi Bağlam" : "Geographic Context"}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                {selectedHub.geographicContext[locale]}
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#0b1320]/70 p-3.5">
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#f59e0b]">
                {locale === "tr"
                  ? "Dilbilimsel Önem"
                  : "Linguistic Significance"}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                {selectedHub.linguisticSignificance[locale]}
              </p>
            </div>

            <div className="flex items-start gap-2 rounded-xl border border-[#14b8a6]/30 bg-[#14b8a6]/10 p-3 text-xs text-teal-100">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#14b8a6]" />
              <span>{selectedHub.keyFact[locale]}</span>
            </div>
          </div>
        ) : (
          selectedBranch && (
            <div className="rounded-xl border border-slate-800 bg-[#0b1320]/70 p-3.5">
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#14b8a6]">
                {locale === "tr" ? "Dal Özeti" : "Branch Overview"}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                {selectedBranch.description[locale]}
              </p>
            </div>
          )
        )}

        {/* Linked Historical Periods */}
        {linkedPeriods.length > 0 && (
          <div>
            <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300">
              <ScrollText className="h-3.5 w-3.5 text-[#f59e0b]" />
              {locale === "tr"
                ? "İlişkili Tarihsel Dönemler"
                : "Linked Historical Periods"}
            </h3>
            <div className="space-y-2.5">
              {linkedPeriods.map((period) => (
                <div
                  key={period.id}
                  className="rounded-xl border border-slate-800 bg-[#0b1320]/60 p-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-white">
                      {period.title[locale]}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        period.status === "attested"
                          ? "bg-[#14b8a6]/15 text-[#14b8a6]"
                          : "bg-[#f59e0b]/15 text-[#f59e0b]"
                      }`}
                    >
                      {period.status === "attested"
                        ? copy.badges.attested
                        : copy.badges.reconstructed}
                    </span>
                  </div>
                  <p className="mt-0.5 font-mono text-[11px] text-slate-400">
                    {period.dateLabel[locale]}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                    {period.summary[locale]}
                  </p>

                  {period.scripts.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {period.scripts.map((sc) => (
                        <span
                          key={sc}
                          className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300"
                        >
                          {scriptNameById(sc)}
                        </span>
                      ))}
                    </div>
                  )}

                  {period.keyWorks.length > 0 && (
                    <p className="mt-2 text-[11px] text-slate-400">
                      <span className="font-semibold text-slate-300">
                        {locale === "tr" ? "Temel Eserler: " : "Key Works: "}
                      </span>
                      {period.keyWorks.join(" · ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Linked Languages & Branches */}
        {linkedLanguages.length > 0 && (
          <div>
            <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300">
              <Globe2 className="h-3.5 w-3.5 text-[#14b8a6]" />
              {locale === "tr"
                ? "Temsil Edilen Türk Dilleri"
                : "Represented Turkic Languages"}
            </h3>
            {selectedHub && linkedBranches.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-1.5">
                {linkedBranches.map((b) => (
                  <span
                    key={b.id}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-[#0b1320] px-2.5 py-0.5 text-[11px] text-slate-200"
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: b.colorToken }}
                    />
                    {b.name[locale]}
                  </span>
                ))}
              </div>
            )}
            <div className="space-y-2">
              {linkedLanguages.map((lang) => (
                <div
                  key={lang.id}
                  className="rounded-xl border border-slate-800 bg-[#0b1320]/60 p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="text-sm font-semibold text-white">
                        {lang.name[locale]}
                      </span>
                      <span className="ml-2 font-mono text-xs text-[#14b8a6]">
                        {lang.nativeName}
                      </span>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        lang.status === "living"
                          ? "bg-emerald-500/15 text-emerald-300"
                          : "bg-amber-500/15 text-amber-300"
                      }`}
                    >
                      {lang.status === "living"
                        ? copy.badges.living
                        : copy.badges.historical}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-300">
                    {lang.keyFeature[locale]}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400">
                    <span>{lang.region[locale]}</span>
                    {lang.speakersApprox && (
                      <span className="font-mono text-[#f59e0b]">
                        {lang.speakersApprox}
                      </span>
                    )}
                    <span>{lang.currentScripts.join(", ")}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Verified Academic Sources */}
        {verifiedSources.length > 0 && (
          <div>
            <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300">
              <BookOpen className="h-3.5 w-3.5 text-[#14b8a6]" />
              {copy.sourcesHeading}
            </h3>
            <div className="space-y-2">
              {verifiedSources.map((src) => (
                <div
                  key={src.id}
                  className="rounded-xl border border-slate-800/90 bg-[#0b1320]/80 p-3 text-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] uppercase text-[#14b8a6]">
                      {src.type}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">
                      {src.year}
                    </span>
                  </div>
                  <p className="mt-1.5 font-medium leading-snug text-slate-200">
                    {src.citation}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    {src.supports[locale]}
                  </p>
                  {src.url && (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-[#14b8a6] hover:text-teal-300"
                    >
                      {locale === "tr" ? "Kaynağa git" : "Open source"}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
