"use client";

import React from "react";
import { BookOpen, Compass, ArrowRightLeft, Info, X } from "lucide-react";
import type { Locale } from "@/data/i18n";
import type { HistoricalPeriod } from "@/data/periods";
import { getScriptMeta, resolveAlphabetSystem } from "./scriptHelpers";

interface ScriptInspectorProps {
  locale: Locale;
  periods: HistoricalPeriod[];
  activePeriod: HistoricalPeriod;
  selectedScriptId: string | null;
  onSelectScript: (scriptId: string | null) => void;
  onSelectPeriod: (periodId: string) => void;
}

const RIBBON_TRACKS: {
  id: string;
  era: { tr: string; en: string };
  scriptIds: string[];
  note: { tr: string; en: string };
}[] = [
  {
    id: "oral-proto",
    era: { tr: "Yazı Öncesi", en: "Pre-Literary" },
    scriptIds: [],
    note: {
      tr: "Kuramsal rekonstrüksiyon (sözlü)",
      en: "Theoretical reconstruction (oral)",
    },
  },
  {
    id: "runic-era",
    era: { tr: "6.–10. yy.", en: "6th–10th c." },
    scriptIds: ["gokturk-runic"],
    note: {
      tr: "Taş anıtlar & Irk Bitig",
      en: "Stone stelae & Irk Bitig",
    },
  },
  {
    id: "silk-road-multi",
    era: { tr: "8.–13. yy.", en: "8th–13th c." },
    scriptIds: ["old-uyghur", "brahmi", "manichaean", "syriac"],
    note: {
      tr: "İpek Yolu çok alfabeli çeviri",
      en: "Silk Road multi-script tradition",
    },
  },
  {
    id: "islamic-millennium",
    era: { tr: "11.–20. yy.", en: "11th–20th c." },
    scriptIds: ["arabic"],
    note: {
      tr: "Karahanlı, Harezm, Çağatay, Osmanlı",
      en: "Karakhanid, Khwarazmian, Chagatai, Ottoman",
    },
  },
  {
    id: "kipchak-crossroads",
    era: { tr: "13.–15. yy.", en: "13th–15th c." },
    scriptIds: ["latin-historical", "armenian"],
    note: {
      tr: "Codex Cumanicus & Ermeni Kıpçakçası",
      en: "Codex Cumanicus & Armeno-Kipchak",
    },
  },
  {
    id: "modern-scripts",
    era: { tr: "1928–Günümüz", en: "1928–Present" },
    scriptIds: ["latin-turkish", "cyrillic", "latin-common"],
    note: {
      tr: "1928 Harf Devrimi, Kiril & Ortak Latin",
      en: "1928 Reform, Cyrillic & Common Latin",
    },
  },
];

export function ScriptInspector({
  locale,
  periods,
  activePeriod,
  selectedScriptId,
  onSelectScript,
  onSelectPeriod,
}: ScriptInspectorProps) {
  const inspectedSystem = selectedScriptId
    ? resolveAlphabetSystem(selectedScriptId)
    : undefined;
  const inspectedMeta = selectedScriptId ? getScriptMeta(selectedScriptId) : null;

  const matchingPeriods = selectedScriptId
    ? periods.filter((p) => p.scripts.includes(selectedScriptId))
    : [];

  return (
    <section
      id="script-ribbon"
      aria-labelledby="script-ribbon-heading"
      className="rounded-2xl border border-[#e6dccb] bg-[#f5efe4]/80 p-5 shadow-sm sm:p-7"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#b45309]">
            <ArrowRightLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>
              {locale === "tr"
                ? "Yazı Sistemi & Alfabe Geçiş Şeridi"
                : "Script & Writing System Transition Ribbon"}
            </span>
          </div>
          <h2
            id="script-ribbon-heading"
            className="mt-1 font-serif text-2xl font-semibold tracking-tight text-[#1c1917]"
          >
            {locale === "tr"
              ? "Dil Sabit Kalırken Değişen Yazılar"
              : "One Language Family, Changing Scripts"}
          </h2>
        </div>
        <p className="max-w-md text-xs leading-relaxed text-[#57534e]">
          {locale === "tr"
            ? "Seçili dönemin kullandığı alfabeler toprak rengiyle vurgulanır. Glif ve fonetik ayrıntılar için herhangi bir yazı sistemine tıklayın."
            : "Scripts active in the selected period are highlighted in terracotta. Click any script badge to inspect its glyphs and phonetic notes."}
        </p>
      </div>

      {/* Horizontal Script Ribbon */}
      <div className="chronos-scroll mt-5 flex gap-3 overflow-x-auto pb-3">
        {RIBBON_TRACKS.map((track) => {
          const isTrackActive =
            track.scriptIds.length === 0
              ? activePeriod.scripts.length === 0
              : track.scriptIds.some((id) => activePeriod.scripts.includes(id));

          return (
            <div
              key={track.id}
              className={`flex min-w-[210px] flex-1 flex-col justify-between rounded-xl border p-3.5 transition-all ${
                isTrackActive
                  ? "border-[#b45309]/60 bg-[#faf7f2] shadow-sm ring-1 ring-[#b45309]/20"
                  : "border-[#e6dccb] bg-[#faf7f2]/55 opacity-85 hover:opacity-100"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-medium text-[#78716c]">
                    {track.era[locale]}
                  </span>
                  {isTrackActive && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#b45309]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#b45309]">
                      {locale === "tr" ? "Aktif" : "Active"}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs font-medium text-[#44403c]">
                  {track.note[locale]}
                </p>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {track.scriptIds.length === 0 ? (
                  <span className="inline-flex items-center gap-1 rounded-md border border-dashed border-[#a8a29e] bg-[#f3ede2] px-2 py-1 font-mono text-[11px] text-[#57534e]">
                    <Compass className="h-3 w-3" aria-hidden="true" />
                    {locale === "tr" ? "Yazı Yok (Sözlü)" : "No Script (Oral)"}
                  </span>
                ) : (
                  track.scriptIds.map((sid) => {
                    const meta = getScriptMeta(sid);
                    const inPeriod = activePeriod.scripts.includes(sid);
                    const isSelected = selectedScriptId === sid;
                    return (
                      <button
                        key={sid}
                        type="button"
                        onClick={() =>
                          onSelectScript(isSelected ? null : sid)
                        }
                        className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
                          isSelected
                            ? "border-[#1c1917] bg-[#1c1917] text-[#faf7f2]"
                            : inPeriod
                            ? "border-[#b45309] bg-[#b45309]/10 text-[#92400e] hover:bg-[#b45309]/20"
                            : "border-[#d6cbb8] bg-white/80 text-[#44403c] hover:border-[#b45309]/50 hover:text-[#1c1917]"
                        }`}
                      >
                        <span className="font-mono text-[11px] opacity-80">
                          {meta.glyphSample}
                        </span>
                        <span>{meta.label[locale]}</span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Inline Script Inspector Panel */}
      {selectedScriptId && inspectedMeta && (
        <div className="mt-4 rounded-xl border border-[#d6cbb8] bg-[#faf7f2] p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#e6dccb] pb-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded bg-[#b45309]/10 px-2 py-0.5 font-mono text-xs font-semibold text-[#b45309]">
                  {inspectedMeta.direction[locale]}
                </span>
                {inspectedSystem?.unicodeBlock && (
                  <span className="font-mono text-xs text-[#78716c]">
                    {inspectedSystem.unicodeBlock}
                  </span>
                )}
              </div>
              <h3 className="mt-1.5 font-serif text-xl font-semibold text-[#1c1917]">
                {inspectedSystem
                  ? inspectedSystem.name[locale]
                  : inspectedMeta.label[locale]}
              </h3>
              {inspectedSystem && (
                <p className="text-xs text-[#57534e]">
                  {inspectedSystem.writingSystemType[locale]} •{" "}
                  {inspectedSystem.era[locale]} •{" "}
                  {inspectedSystem.signCount}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => onSelectScript(null)}
              aria-label={locale === "tr" ? "Kapat" : "Close"}
              className="rounded-lg border border-[#e6dccb] p-1.5 text-[#57534e] transition-colors hover:bg-[#efe7d8] hover:text-[#1c1917]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {inspectedSystem ? (
            <div className="mt-4 grid gap-5 lg:grid-cols-12">
              <div className="space-y-3 lg:col-span-5">
                <p className="text-sm leading-relaxed text-[#44403c]">
                  {inspectedSystem.description[locale]}
                </p>
                <div className="rounded-lg border border-[#e6dccb] bg-[#f3ede2]/70 p-3">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#78716c]">
                    {locale === "tr" ? "Örnek Sözcük / İfade" : "Sample Form"}
                  </div>
                  <div className="mt-1 font-serif text-lg font-medium text-[#1c1917]">
                    {inspectedSystem.sampleWord.original}
                  </div>
                  <div className="font-mono text-xs text-[#b45309]">
                    {inspectedSystem.sampleWord.transliteration} —{" "}
                    {inspectedSystem.sampleWord.meaning[locale]}
                  </div>
                </div>
                <div className="flex items-start gap-2 rounded-lg border border-[#b45309]/25 bg-[#b45309]/5 p-3 text-xs leading-relaxed text-[#44403c]">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#b45309]" />
                  <span>{inspectedSystem.scientificNote[locale]}</span>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#78716c]">
                  {locale === "tr"
                    ? "Karakteristik İşaretler & Ses Değerleri"
                    : "Characteristic Signs & Phonetic Values"}
                </div>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {inspectedSystem.glyphs.map((g, idx) => (
                    <div
                      key={`${g.glyph}-${idx}`}
                      className="flex items-start gap-3 rounded-lg border border-[#e6dccb] bg-white/80 p-2.5"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#e6dccb] bg-[#f3ede2] font-serif text-lg text-[#1c1917]">
                        {g.glyph}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[#1c1917]">
                          <span>{g.transliteration}</span>
                          <span className="text-[#b45309]">{g.phonetic}</span>
                        </div>
                        <p className="mt-0.5 text-xs leading-snug text-[#57534e]">
                          {g.note[locale]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-3 text-sm text-[#44403c]">
              {locale === "tr"
                ? `${inspectedMeta.label.tr} yazı geleneği (${inspectedMeta.glyphSample}), dönemin çok dilli ve çok alfabeli belge kültürünün bir parçasıdır.`
                : `${inspectedMeta.label.en} (${inspectedMeta.glyphSample}) is part of the multi-script documentary heritage of this era.`}
            </p>
          )}

          {matchingPeriods.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#e6dccb] pt-3">
              <span className="flex items-center gap-1 text-xs font-medium text-[#78716c]">
                <BookOpen className="h-3.5 w-3.5" />
                {locale === "tr"
                  ? "Bu yazıyı kullanan dönemler:"
                  : "Periods using this script:"}
              </span>
              {matchingPeriods.map((mp) => (
                <button
                  key={mp.id}
                  type="button"
                  onClick={() => onSelectPeriod(mp.id)}
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                    mp.id === activePeriod.id
                      ? "bg-[#b45309] text-[#faf7f2]"
                      : "bg-[#efe7d8] text-[#44403c] hover:bg-[#e6dccb]"
                  }`}
                >
                  {mp.order.toString().padStart(2, "0")}. {mp.title[locale]}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
