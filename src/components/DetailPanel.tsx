"use client";

import React from "react";
import { BookOpen, ExternalLink, Globe2, Languages, Layers, Users } from "lucide-react";
import { TURKIC_BRANCHES } from "@/data/languageFamily";
import { HISTORICAL_PERIODS } from "@/data/periods";
import { ACADEMIC_SOURCES, AcademicSource } from "@/data/bibliography";
import { Locale, UI_COPY } from "@/data/i18n";
import { CladogramSelection } from "./CladogramSvg";

interface DetailPanelProps {
  locale: Locale;
  selection: CladogramSelection;
  onSelect: (sel: CladogramSelection) => void;
}

function getSourcesByIds(ids: string[]): AcademicSource[] {
  return ids
    .map((id) => ACADEMIC_SOURCES.find((s) => s.id === id))
    .filter((s): s is AcademicSource => Boolean(s));
}

export function DetailPanel({ locale, selection, onSelect }: DetailPanelProps) {
  const copy = UI_COPY[locale];

  // 1. Root: Proto-Turkic
  if (selection.kind === "root") {
    const proto = HISTORICAL_PERIODS[0];
    const sources = getSourcesByIds(proto.sourceIds);

    return (
      <aside className="flex flex-col border border-slate-300 bg-white">
        <div className="border-b border-slate-300 bg-slate-100 px-5 py-4">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="border border-dashed border-slate-800 bg-white px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-900">
              {copy.badges.reconstructed}
            </span>
            <span className="font-mono text-[11px] text-slate-500">
              {proto.dateLabel[locale]}
            </span>
          </div>
          <h3 className="font-serif text-xl font-semibold text-slate-900">
            {proto.title[locale]}
          </h3>
          <p className="mt-1 text-xs font-medium text-slate-600">{proto.subtitle[locale]}</p>
        </div>

        <div className="space-y-5 p-5">
          <p className="text-sm leading-relaxed text-slate-700">{proto.summary[locale]}</p>

          <div className="border border-slate-200 bg-slate-50 p-3.5">
            <div className="mb-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              {locale === "tr" ? "Bilimsel Metodoloji" : "Scientific Methodology"}
            </div>
            <p className="text-xs leading-relaxed text-slate-700">
              {proto.academicNote[locale]}
            </p>
          </div>

          <div>
            <h4 className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              {locale === "tr" ? "Temel Dilbilimsel Özellikler" : "Key Linguistic Highlights"}
            </h4>
            <ul className="space-y-1.5 text-xs leading-relaxed text-slate-700">
              {proto.linguisticHighlights[locale].map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="font-mono text-slate-400">0{idx + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              {locale === "tr" ? "İlk Dallanma (Makro Ayrım)" : "Primary Split (Macro-Groups)"}
            </h4>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => onSelect({ kind: "macro", macro: "oghur" })}
                className="border border-red-200 bg-red-50/50 p-2.5 text-left transition-colors hover:border-red-700"
              >
                <div className="font-mono text-[10px] font-semibold uppercase text-red-800">
                  r / l
                </div>
                <div className="text-xs font-semibold text-slate-900">
                  {locale === "tr" ? "Oğur Grubu" : "Oghur Branch"}
                </div>
              </button>
              <button
                type="button"
                onClick={() => onSelect({ kind: "macro", macro: "common-turkic" })}
                className="border border-blue-200 bg-blue-50/50 p-2.5 text-left transition-colors hover:border-blue-700"
              >
                <div className="font-mono text-[10px] font-semibold uppercase text-blue-700">
                  z / š
                </div>
                <div className="text-xs font-semibold text-slate-900">
                  {locale === "tr" ? "Genel Türkçe" : "Common Turkic"}
                </div>
              </button>
            </div>
          </div>

          <VerifiedSourcesBlock locale={locale} sources={sources} />
        </div>
      </aside>
    );
  }

  // 2. Macro-Group: Oghur vs Common Turkic
  if (selection.kind === "macro") {
    const isOghur = selection.macro === "oghur";
    const branches = TURKIC_BRANCHES.filter((b) => b.macroGroup === selection.macro);
    const sources = getSourcesByIds(["brill-etlo-classification", "johanson-csato-2022", "tekin-1991-1995"]);

    return (
      <aside className="flex flex-col border border-slate-300 bg-white">
        <div
          className={`border-b border-slate-300 px-5 py-4 ${
            isOghur ? "bg-red-50/60" : "bg-blue-50/60"
          }`}
        >
          <div className="mb-2 flex items-center gap-2">
            <span
              className={`px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white ${
                isOghur ? "bg-[#991b1b]" : "bg-[#1d4ed8]"
              }`}
            >
              {isOghur ? "r / l  •  OGHUR" : "z / š  •  COMMON TURKIC"}
            </span>
          </div>
          <h3 className="font-serif text-xl font-semibold text-slate-900">
            {isOghur
              ? locale === "tr"
                ? "Oğur (Bulgar / r-Türkçesi) Ana Grubu"
                : "Oghur (Bulgar / r-Turkic) Macro-Group"
              : locale === "tr"
                ? "Genel Türkçe (z/ş-Türkçesi) Ana Grubu"
                : "Common Turkic (z/š-Turkic) Macro-Group"}
          </h3>
        </div>

        <div className="space-y-5 p-5">
          <p className="text-sm leading-relaxed text-slate-700">
            {isOghur
              ? locale === "tr"
                ? "Proto-Türkçeden ilk ayrılan ana koldur. Genel Türkçedeki /z/ ve /š/ seslerine karşılık /r/ (rotasizm) ve /l/ (lambdasizm) seslerini bulundurmasıyla ayırt edilir."
                : "The earliest branch to diverge from Proto-Turkic, diagnostically marked by /r/ (rhotacism) and /l/ (lambdacism) corresponding to Common Turkic /z/ and /š/."
              : locale === "tr"
                ? "Yaşayan Türk dillerinin büyük çoğunluğunu (Oğuz, Kıpçak, Karluk, Sibirya ve Arğu/Halaçça) kapsayan ana gruptur. Sesbilgisel olarak *z ve *š seslerini korumasıyla Oğur grubundan ayrılır."
                : "Encompasses five major branches (Oghuz, Kipchak, Karluk, Siberian, and Arghu/Khalaj), distinguished from Oghur by the retention of Common Turkic *z and *š."}
          </p>

          <div>
            <h4 className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              {locale === "tr"
                ? `Bağlı Kollar (${branches.length})`
                : `Member Branches (${branches.length})`}
            </h4>
            <div className="space-y-1.5">
              {branches.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => onSelect({ kind: "branch", branchId: b.id })}
                  className="flex w-full items-center justify-between border border-slate-200 bg-slate-50 px-3 py-2 text-left transition-colors hover:border-slate-400 hover:bg-white"
                >
                  <span className="text-xs font-semibold text-slate-900">
                    {b.name[locale]}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">
                    {b.languages.length} {locale === "tr" ? "dil" : "lang."} →
                  </span>
                </button>
              ))}
            </div>
          </div>

          <VerifiedSourcesBlock locale={locale} sources={sources} />
        </div>
      </aside>
    );
  }

  // 3. Branch Selection
  if (selection.kind === "branch") {
    const branch = TURKIC_BRANCHES.find((b) => b.id === selection.branchId);
    if (!branch) return null;
    const isOghur = branch.macroGroup === "oghur";
    const sources = getSourcesByIds(branch.sourceIds);

    return (
      <aside className="flex flex-col border border-slate-300 bg-white">
        <div className="border-b border-slate-300 bg-slate-100 px-5 py-4">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onSelect({ kind: "macro", macro: branch.macroGroup })}
              className={`px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white ${
                isOghur ? "bg-[#991b1b]" : "bg-[#1d4ed8]"
              }`}
            >
              {isOghur
                ? locale === "tr"
                  ? "OĞUR GRUBU"
                  : "OGHUR"
                : locale === "tr"
                  ? "GENEL TÜRKÇE"
                  : "COMMON TURKIC"}
            </button>
            <span className="font-mono text-[10px] uppercase text-slate-500">
              {branch.languages.length}{" "}
              {locale === "tr" ? "Üye Dil" : "Member Languages"}
            </span>
          </div>
          <h3 className="font-serif text-xl font-semibold text-slate-900">
            {branch.name[locale]}
          </h3>
        </div>

        <div className="space-y-5 p-5">
          <p className="text-sm leading-relaxed text-slate-700">
            {branch.description[locale]}
          </p>

          <div
            className={`border-l-2 bg-slate-50 p-3.5 ${
              isOghur ? "border-[#991b1b]" : "border-[#1d4ed8]"
            }`}
          >
            <div className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              {locale === "tr" ? "Ayırt Edici Sesbilgisi Ölçütü" : "Diagnostic Phonological Criterion"}
            </div>
            <p className="text-xs font-medium leading-relaxed text-slate-800">
              {branch.diagnosticFeature[locale]}
            </p>
          </div>

          <div>
            <h4 className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              {locale === "tr" ? "Bu Koldaki Diller" : "Languages in this Branch"}
            </h4>
            <div className="divide-y divide-slate-200 border border-slate-200">
              {branch.languages.map((lang) => (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() =>
                    onSelect({
                      kind: "language",
                      branchId: branch.id,
                      languageId: lang.id,
                    })
                  }
                  className="flex w-full items-center justify-between gap-2 bg-white px-3 py-2.5 text-left transition-colors hover:bg-slate-50"
                >
                  <div>
                    <div className="text-xs font-semibold text-slate-900">
                      {lang.name[locale]}
                    </div>
                    <div className="font-mono text-[10px] text-slate-500">
                      {lang.nativeName}
                    </div>
                  </div>
                  <span
                    className={`shrink-0 border px-1.5 py-0.5 font-mono text-[9.5px] uppercase ${
                      lang.status === "living"
                        ? "border-emerald-700/30 bg-emerald-50 text-emerald-800"
                        : "border-slate-300 bg-slate-100 text-slate-600"
                    }`}
                  >
                    {lang.status === "living"
                      ? copy.badges.living
                      : copy.badges.historical}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <VerifiedSourcesBlock locale={locale} sources={sources} />
        </div>
      </aside>
    );
  }

  // 4. Language Selection
  const branch = TURKIC_BRANCHES.find((b) => b.id === selection.branchId);
  const lang = branch?.languages.find((l) => l.id === selection.languageId);
  if (!branch || !lang) return null;

  const isOghur = branch.macroGroup === "oghur";
  const sources = getSourcesByIds(branch.sourceIds);

  return (
    <aside className="flex flex-col border border-slate-300 bg-white">
      <div className="border-b border-slate-300 bg-slate-100 px-5 py-4">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onSelect({ kind: "branch", branchId: branch.id })}
            className={`px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white ${
              isOghur ? "bg-[#991b1b]" : "bg-[#1d4ed8]"
            }`}
          >
            {branch.name[locale]}
          </button>
          <span
            className={`border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase ${
              lang.status === "living"
                ? "border-emerald-700/40 bg-emerald-50 text-emerald-900"
                : "border-slate-400 bg-white text-slate-700"
            }`}
          >
            {lang.status === "living" ? copy.badges.living : copy.badges.historical}
          </span>
        </div>

        <h3 className="font-serif text-xl font-semibold text-slate-900">
          {lang.name[locale]}
        </h3>
        <p className="mt-1 font-mono text-xs text-slate-600">{lang.nativeName}</p>
      </div>

      <div className="space-y-5 p-5">
        {/* Swiss Metadata Grid */}
        <div className="grid grid-cols-1 divide-y divide-slate-200 border border-slate-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <div className="p-3">
            <div className="mb-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-slate-500">
              <Globe2 className="h-3.5 w-3.5" />
              {locale === "tr" ? "Coğrafi Bölge" : "Region"}
            </div>
            <div className="text-xs font-medium text-slate-900">
              {lang.region[locale]}
            </div>
          </div>
          <div className="p-3">
            <div className="mb-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-slate-500">
              <Users className="h-3.5 w-3.5" />
              {locale === "tr" ? "Konuşur Sayısı" : "Approx. Speakers"}
            </div>
            <div className="text-xs font-medium text-slate-900">
              {lang.speakersApprox ??
                (locale === "tr" ? "Tarihsel / Belgelenmiş" : "Historical / Attested")}
            </div>
          </div>
        </div>

        {/* Scripts Used */}
        <div>
          <div className="mb-2 flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            <Languages className="h-3.5 w-3.5" />
            {locale === "tr" ? "Kullanılan Yazı Sistemleri / Alfabeler" : "Scripts Used"}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {lang.currentScripts.map((script) => (
              <span
                key={script}
                className="border border-slate-300 bg-slate-50 px-2.5 py-1 font-mono text-[11px] font-medium text-slate-800"
              >
                {script}
              </span>
            ))}
          </div>
        </div>

        {/* Key Feature */}
        <div
          className={`border-l-2 bg-slate-50 p-3.5 ${
            isOghur ? "border-[#991b1b]" : "border-[#1d4ed8]"
          }`}
        >
          <div className="mb-1 flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            <Layers className="h-3.5 w-3.5" />
            {locale === "tr" ? "Öne Çıkan Dilbilimsel Özellik" : "Key Linguistic Feature"}
          </div>
          <p className="text-xs leading-relaxed text-slate-800">
            {lang.keyFeature[locale]}
          </p>
        </div>

        {/* Branch Diagnostic Context */}
        <div className="border border-slate-200 p-3">
          <div className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            {locale === "tr" ? "Bağlı Olduğu Kol Özelliği" : "Parent Branch Diagnostic"}
          </div>
          <p className="text-xs leading-relaxed text-slate-600">
            {branch.diagnosticFeature[locale]}
          </p>
        </div>

        <VerifiedSourcesBlock locale={locale} sources={sources} />
      </div>
    </aside>
  );
}

function VerifiedSourcesBlock({
  locale,
  sources,
}: {
  locale: Locale;
  sources: AcademicSource[];
}) {
  return (
    <div className="border-t border-slate-200 pt-4">
      <div className="mb-2.5 flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        <BookOpen className="h-3.5 w-3.5" />
        {locale === "tr" ? "Doğrulanmış Akademik Kaynaklar" : "Verified Academic Sources"}
      </div>
      <div className="space-y-2">
        {sources.map((src) => (
          <div
            key={src.id}
            className="border border-slate-200 bg-slate-50/70 p-2.5 text-xs"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-semibold text-slate-900">
                {src.authorOrInstitution} ({src.year})
              </span>
              {src.url && (
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1 font-mono text-[10px] font-medium text-blue-700 hover:underline"
                >
                  {locale === "tr" ? "Kaynak" : "Link"}
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
            <p className="mt-1 text-[11px] leading-snug text-slate-600">
              {src.supports[locale]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
