"use client";

import React, { useMemo, useState } from "react";
import { GitBranch, Users, MapPin, Volume2, BookOpen } from "lucide-react";
import { Locale, UI_COPY } from "@/data/i18n";
import { TURKIC_BRANCHES, TurkicBranch, TurkicLanguageItem } from "@/data/languageFamily";
import { COMPARATIVE_LEXICON, type ComparativeWordRow } from "@/data/comparativeLexicon";
import { ACADEMIC_SOURCES } from "@/data/bibliography";

interface LanguageTreeSectionProps {
  locale: Locale;
  selectedBranchId: string;
  onSelectBranch: (id: string) => void;
  onNavigateToSource: (sourceId: string) => void;
}

const PHONOLOGY_MATRIX = [
  {
    feature: { tr: "Proto *r/*l vs. *z/*š", en: "Proto *r/*l vs. *z/*š" },
    proto: "*kïr / *tül",
    oghur: "xĕr / tĕl (Çuvaşça)",
    oghuz: "kız / düş (Türkçe)",
    kipchak: "qız / tüs (Kazakça)",
    karluk: "qiz / tush (Özbekçe)",
    siberian: "kıs / düj (Tuvaca)",
    arghu: "qız / tüş (Halaçça)",
  },
  {
    feature: { tr: "Söz içi *d gelişimi ('ayak')", en: "Intervocalic *d ('foot')" },
    proto: "*hadaq",
    oghur: "ura (Çuvaşça)",
    oghuz: "ayak (Türkçe)",
    kipchak: "ayaq (Kazakça)",
    karluk: "oyoq / ayaq (Özbekçe)",
    siberian: "adak (Tuva) / azax (Hakas)",
    arghu: "hadaq (Halaçça · h- + -d-)",
  },
  {
    feature: { tr: "Hece sonu -g ('dağ')", en: "Syllable-final -g ('mountain')" },
    proto: "*tāg",
    oghur: "tu (Çuvaşça)",
    oghuz: "dağ (Türkçe · -g erimesi)",
    kipchak: "taw (Kazakça · -g > -w)",
    karluk: "togʻ / tağ (Özbekçe)",
    siberian: "dağ / tağ (Tuvaca)",
    arghu: "tāğ (Halaçça · uzun ünlü)",
  },
  {
    feature: { tr: "Söz başı t- ötümlüleşmesi", en: "Initial t- voicing" },
    proto: "*tāš ('taş')",
    oghur: "čul (Çuvaşça)",
    oghuz: "taş / daş (Azerbaycan)",
    kipchak: "tas (Kazakça)",
    karluk: "tosh (Özbekçe)",
    siberian: "taş (Tuvaca)",
    arghu: "tāš (Halaçça)",
  },
];

export function LanguageTreeSection({
  locale,
  selectedBranchId,
  onSelectBranch,
  onNavigateToSource,
}: LanguageTreeSectionProps) {
  const copy = UI_COPY[locale];
  const [selectedLangId, setSelectedLangId] = useState<string | null>(null);

  const activeBranch: TurkicBranch = useMemo(() => {
    return (
      TURKIC_BRANCHES.find((b) => b.id === selectedBranchId) || TURKIC_BRANCHES[1]
    );
  }, [selectedBranchId]);

  const activeLanguage: TurkicLanguageItem = useMemo(() => {
    if (selectedLangId) {
      const found = activeBranch.languages.find((l) => l.id === selectedLangId);
      if (found) return found;
    }
    return activeBranch.languages[0];
  }, [activeBranch, selectedLangId]);

  const handleSelectBranch = (branchId: string) => {
    onSelectBranch(branchId);
    const branch = TURKIC_BRANCHES.find((b) => b.id === branchId);
    if (branch && branch.languages[0]) {
      setSelectedLangId(branch.languages[0].id);
    }
  };

  // Coordinates for the 6 branches on the interactive SVG cladogram
  const branchNodes: { id: string; x: number; y: number; shortLabel: string }[] = [
    { id: "oghur", x: 130, y: 295, shortLabel: locale === "tr" ? "Oğur (r/l)" : "Oghur (r/l)" },
    { id: "oghuz", x: 310, y: 295, shortLabel: locale === "tr" ? "Oğuz (GB)" : "Oghuz (SW)" },
    { id: "kipchak", x: 455, y: 295, shortLabel: locale === "tr" ? "Kıpçak (KB)" : "Kipchak (NW)" },
    { id: "karluk", x: 600, y: 295, shortLabel: locale === "tr" ? "Karluk (GD)" : "Karluk (SE)" },
    { id: "siberian", x: 745, y: 295, shortLabel: locale === "tr" ? "Sibirya (KD)" : "Siberian (NE)" },
    { id: "arghu", x: 875, y: 295, shortLabel: locale === "tr" ? "Arğu (Halaç)" : "Arghu (Khalaj)" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#e2dacb] pb-4">
        <h2 className="font-serif text-2xl font-bold text-[#0f172a] sm:text-3xl">
          {copy.nav.tree}
        </h2>
        <p className="mt-1 text-sm text-[#0f172a]/70">
          {locale === "tr"
            ? "Proto-Türkçeden Oğur ve Genel Türkçe dallarına ayrılan 6 ana kol. İncelemek istediğiniz dalı veya dili seçin."
            : "6 major branches splitting from Proto-Turkic into Oghur and Common Turkic. Select any branch or language node to inspect."}
        </p>
      </div>

      {/* Interactive SVG Cladogram */}
      <div className="rounded-2xl border border-[#e2dacb] bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0e7490]">
            {locale === "tr"
              ? "Etkileşimli Türk Dil Ailesi Şeması"
              : "Interactive Turkic Phylogenetic Tree"}
          </span>
          <span className="text-xs text-[#0f172a]/60">
            {locale === "tr"
              ? "Düğüm üzerine tıklayarak dal ayrıntılarını açın"
              : "Click a branch node to inspect its languages"}
          </span>
        </div>

        <div className="overflow-x-auto">
          <svg
            viewBox="0 0 960 360"
            role="img"
            aria-label={
              locale === "tr"
                ? "Türk Dilleri Soyağacı Şeması"
                : "Turkic Language Family Cladogram"
            }
            className="h-auto min-w-[700px] w-full"
          >
            {/* Root: Proto-Turkic */}
            <path
              d="M 480 65 L 480 105 L 130 145 M 480 105 L 590 145"
              fill="none"
              stroke="#b45309"
              strokeWidth="2.5"
              strokeDasharray="6 4"
            />

            {/* Common Turkic sub-branches */}
            <path
              d="M 590 185 L 590 220 L 310 220 L 310 265 M 590 220 L 455 220 L 455 265 M 590 220 L 600 265 M 590 220 L 745 220 L 745 265 M 590 220 L 875 220 L 875 265"
              fill="none"
              stroke="#0e7490"
              strokeWidth="2.5"
            />

            {/* Oghur direct line */}
            <path
              d="M 130 185 L 130 265"
              fill="none"
              stroke="#b45309"
              strokeWidth="2.5"
            />

            {/* Root Box */}
            <g transform="translate(365, 16)">
              <rect
                width="230"
                height="48"
                rx="10"
                fill="#0f172a"
                stroke="#b45309"
                strokeWidth="2"
                strokeDasharray="5 3"
              />
              <text
                x="115"
                y="22"
                textAnchor="middle"
                fill="#fbbf24"
                fontSize="13"
                fontWeight="700"
              >
                {locale === "tr" ? "PROTO-TÜRKÇE" : "PROTO-TURKIC"}
              </text>
              <text
                x="115"
                y="38"
                textAnchor="middle"
                fill="#cbd5e1"
                fontSize="10.5"
              >
                {locale === "tr"
                  ? "Kuramsal Ata Dil (*r/*l vs *z/*š)"
                  : "Reconstructed Ancestor (*r/*l vs *z/*š)"}
              </text>
            </g>

            {/* Macro-group: Oghur */}
            <g transform="translate(45, 145)">
              <rect
                width="170"
                height="40"
                rx="8"
                fill="#fef3c7"
                stroke="#b45309"
                strokeWidth="1.5"
              />
              <text
                x="85"
                y="25"
                textAnchor="middle"
                fill="#92400e"
                fontSize="12"
                fontWeight="700"
              >
                {locale === "tr" ? "Oğur (r-Türkçesi)" : "Oghur (r-Turkic)"}
              </text>
            </g>

            {/* Macro-group: Common Turkic */}
            <g transform="translate(475, 145)">
              <rect
                width="230"
                height="40"
                rx="8"
                fill="#ecfeff"
                stroke="#0e7490"
                strokeWidth="1.5"
              />
              <text
                x="115"
                y="25"
                textAnchor="middle"
                fill="#0e7490"
                fontSize="12"
                fontWeight="700"
              >
                {locale === "tr" ? "Genel Türkçe (z-Türkçesi)" : "Common Turkic (z-Turkic)"}
              </text>
            </g>

            {/* 6 Interactive Branch Nodes */}
            {branchNodes.map((node) => {
              const branch = TURKIC_BRANCHES.find((b) => b.id === node.id)!;
              const isSelected = branch.id === activeBranch.id;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x - 62}, 265)`}
                  onClick={() => handleSelectBranch(branch.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSelectBranch(branch.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  className="cursor-pointer outline-none"
                >
                  <rect
                    width="124"
                    height="68"
                    rx="10"
                    fill={isSelected ? "#0f172a" : "#f8f6f1"}
                    stroke={isSelected ? "#0e7490" : branch.colorToken}
                    strokeWidth={isSelected ? "3" : "1.75"}
                  />
                  <circle
                    cx="62"
                    cy="16"
                    r="5"
                    fill={isSelected ? "#38bdf8" : branch.colorToken}
                  />
                  <text
                    x="62"
                    y="38"
                    textAnchor="middle"
                    fill={isSelected ? "#f8f6f1" : "#0f172a"}
                    fontSize="12"
                    fontWeight="700"
                  >
                    {node.shortLabel}
                  </text>
                  <text
                    x="62"
                    y="55"
                    textAnchor="middle"
                    fill={isSelected ? "#94a3b8" : "#64748b"}
                    fontSize="10.5"
                  >
                    {branch.languages.length}{" "}
                    {locale === "tr" ? "dil" : "lang."}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Selected Branch & Language Detail */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Branch Overview + Language List */}
        <div className="space-y-4 rounded-2xl border border-[#e2dacb] bg-white p-6 shadow-sm lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white"
              style={{ backgroundColor: activeBranch.colorToken }}
            >
              <GitBranch className="h-3.5 w-3.5" />
              {activeBranch.macroGroup === "oghur"
                ? locale === "tr"
                  ? "Oğur Ana Kolu"
                  : "Oghur Macro-Group"
                : locale === "tr"
                ? "Genel Türkçe Ana Kolu"
                : "Common Turkic Macro-Group"}
            </span>
          </div>

          <h3 className="font-serif text-2xl font-bold text-[#0f172a]">
            {activeBranch.name[locale]}
          </h3>
          <p className="text-sm leading-relaxed text-[#0f172a]/85">
            {activeBranch.description[locale]}
          </p>

          <div className="rounded-xl border border-[#0e7490]/25 bg-[#0e7490]/5 p-3.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#0e7490]">
              {locale === "tr" ? "Ayırt Edici Ses Özelliği" : "Diagnostic Phonological Feature"}
            </div>
            <p className="mt-1 text-sm font-medium text-[#0f172a]">
              {activeBranch.diagnosticFeature[locale]}
            </p>
          </div>

          <div>
            <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-[#0f172a]/60">
              {locale === "tr" ? "Bu Koldaki Diller" : "Languages in this Branch"}
            </h4>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {activeBranch.languages.map((lang) => {
                const isLangActive = lang.id === activeLanguage.id;
                return (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => setSelectedLangId(lang.id)}
                    aria-pressed={isLangActive}
                    className={`focus-museum rounded-xl border p-3.5 text-left transition-all ${
                      isLangActive
                        ? "border-[#0e7490] bg-[#0f172a] text-white shadow-sm"
                        : "border-[#e2dacb] bg-[#f8f6f1] text-[#0f172a] hover:border-[#0e7490]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-serif text-sm font-bold">
                        {lang.name[locale]}
                      </span>
                      <span
                        className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                          lang.status === "living"
                            ? isLangActive
                              ? "bg-[#0e7490] text-white"
                              : "bg-[#0e7490]/15 text-[#0e7490]"
                            : "bg-[#b45309]/20 text-[#b45309]"
                        }`}
                      >
                        {lang.status === "living"
                          ? copy.badges.living
                          : copy.badges.historical}
                      </span>
                    </div>
                    <div
                      className={`mt-1 text-xs ${
                        isLangActive ? "text-[#cbd5e1]" : "text-[#0f172a]/65"
                      }`}
                    >
                      {lang.nativeName}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Language Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#e2dacb] bg-[#0f172a] p-6 text-[#f8f6f1] shadow-sm lg:col-span-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-[#7dd3fc]">
                {locale === "tr" ? "Seçili Dil Künyesi" : "Language Profile"}
              </span>
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#fbbf24]">
                {activeLanguage.status === "living"
                  ? copy.badges.living
                  : activeLanguage.status === "endangered"
                  ? copy.badges.endangered
                  : copy.badges.historical}
              </span>
            </div>

            <div>
              <h4 className="font-serif text-2xl font-bold">
                {activeLanguage.name[locale]}
              </h4>
              <p className="mt-1 font-mono text-sm text-[#7dd3fc]">
                {activeLanguage.nativeName}
              </p>
            </div>

            <div className="space-y-2.5 border-t border-white/15 pt-4 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#fbbf24]" />
                <div>
                  <span className="text-xs text-[#94a3b8]">
                    {locale === "tr" ? "Ülkeler / Coğrafya: " : "Countries / Region: "}
                  </span>
                  <span>{activeLanguage.countries[locale]} ({activeLanguage.region[locale]})</span>
                </div>
              </div>
              {activeLanguage.speakersApprox && (
                <div className="flex items-start gap-2.5">
                  <Users className="mt-0.5 h-4 w-4 shrink-0 text-[#7dd3fc]" />
                  <div>
                    <span className="text-xs text-[#94a3b8]">
                      {locale === "tr" ? "Konuşur Sayısı: " : "Approx. Speakers: "}
                    </span>
                    <span>{activeLanguage.speakersApprox}</span>
                    <span className="ml-1.5 text-[11px] text-[#94a3b8]">
                      ({activeLanguage.speakerDataYear})
                    </span>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-2.5">
                <Volume2 className="mt-0.5 h-4 w-4 shrink-0 text-[#38bdf8]" />
                <div>
                  <span className="text-xs text-[#94a3b8]">
                    {locale === "tr" ? "Ses & Gramer: " : "Phonology & Grammar: "}
                  </span>
                  <span>{activeLanguage.keyFeature[locale]} — {activeLanguage.grammarFeature[locale]}</span>
                </div>
              </div>
            </div>

            {activeLanguage.sampleWords.length > 0 && (
              <div>
                <div className="mb-1.5 text-xs font-semibold text-[#94a3b8]">
                  {locale === "tr" ? "Örnek Kelimeler" : "Sample Words"}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeLanguage.sampleWords.map((sw, i) => (
                    <span
                      key={i}
                      className="rounded-md border border-[#fbbf24]/30 bg-[#fbbf24]/10 px-2.5 py-1 font-mono text-xs text-[#fde68a]"
                    >
                      {sw.word} <span className="text-white/70">({sw.gloss[locale]})</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="mb-1.5 text-xs font-semibold text-[#94a3b8]">
                {locale === "tr" ? "Kullanılan Yazı Sistemleri" : "Current / Historical Scripts"}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeLanguage.currentScripts.map((sc) => (
                  <span
                    key={sc}
                    className="rounded-md border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-medium text-white"
                  >
                    {sc}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-white/15 pt-4">
            <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[#cbd5e1]">
              <BookOpen className="h-3.5 w-3.5 text-[#fbbf24]" />
              <span>{copy.sourcesHeading}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {activeBranch.sourceIds.map((srcId) => {
                const src = ACADEMIC_SOURCES.find((s) => s.id === srcId);
                if (!src) return null;
                return (
                  <button
                    key={src.id}
                    type="button"
                    onClick={() => onNavigateToSource(src.id)}
                    className="focus-museum rounded bg-white/10 px-2 py-1 text-[11px] text-[#7dd3fc] hover:bg-white/20"
                  >
                    {src.authorOrInstitution} ({src.year})
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Phonological Comparison Matrix */}
      <section className="rounded-2xl border border-[#e2dacb] bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h3 className="font-serif text-xl font-bold text-[#0f172a]">
            {locale === "tr"
              ? "Karşılaştırmalı Sesbilgisi Matrisi"
              : "Comparative Phonological Matrix"}
          </h3>
          <p className="mt-1 text-xs text-[#0f172a]/70">
            {locale === "tr"
              ? "Türk dillerinin sınıflandırılmasında kullanılan temel tanısal ses denklikleri."
              : "Diagnostic phonological correspondences used to classify Turkic branches."}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-[#e2dacb] bg-[#f8f6f1] text-[#0f172a]">
                <th className="p-3 font-bold">
                  {locale === "tr" ? "Ses Ölçütü" : "Diagnostic Criterion"}
                </th>
                <th className="p-3 font-mono font-bold text-[#b45309]">Proto-Turkic</th>
                <th className="p-3 font-bold">Oghur</th>
                <th className="p-3 font-bold">Oghuz</th>
                <th className="p-3 font-bold">Kipchak</th>
                <th className="p-3 font-bold">Karluk</th>
                <th className="p-3 font-bold">Siberian</th>
                <th className="p-3 font-bold">Arghu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2dacb]">
              {PHONOLOGY_MATRIX.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#f8f6f1]/70">
                  <td className="p-3 font-semibold text-[#0f172a]">
                    {row.feature[locale]}
                  </td>
                  <td className="p-3 font-mono font-semibold text-[#b45309]">
                    {row.proto}
                  </td>
                  <td className="p-3 font-mono text-[#0f172a]/85">{row.oghur}</td>
                  <td className="p-3 font-mono text-[#0f172a]/85">{row.oghuz}</td>
                  <td className="p-3 font-mono text-[#0f172a]/85">{row.kipchak}</td>
                  <td className="p-3 font-mono text-[#0f172a]/85">{row.karluk}</td>
                  <td className="p-3 font-mono text-[#0f172a]/85">{row.siberian}</td>
                  <td className="p-3 font-mono text-[#0f172a]/85">{row.arghu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Comparative Word & Etymology Laboratory */}
      <ComparativeLexiconLab locale={locale} />
    </div>
  );
}

function ComparativeLexiconLab({ locale }: { locale: Locale }) {
  const [cat, setCat] = useState<ComparativeWordRow["category"] | "all">("all");
  const rows =
    cat === "all"
      ? COMPARATIVE_LEXICON
      : COMPARATIVE_LEXICON.filter((r) => r.category === cat);

  const cats: { id: ComparativeWordRow["category"] | "all"; label: { tr: string; en: string } }[] = [
    { id: "all", label: { tr: "Tümü", en: "All" } },
    { id: "numeral", label: { tr: "Sayılar", en: "Numerals" } },
    { id: "kinship", label: { tr: "Akrabalık", en: "Kinship" } },
    { id: "nature", label: { tr: "Doğa", en: "Nature" } },
    { id: "daily", label: { tr: "Günlük Yaşam", en: "Daily" } },
    { id: "verb", label: { tr: "Fiiller", en: "Verbs" } },
    { id: "pronoun", label: { tr: "Zamirler", en: "Pronouns" } },
  ];

  return (
    <section className="rounded-2xl border border-[#e2dacb] bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h3 className="font-serif text-xl font-bold text-[#0f172a]">
            {locale === "tr"
              ? "Kelime ve Etimoloji Karşılaştırma Laboratuvarı"
              : "Comparative Lexicon & Etymology Lab"}
          </h3>
          <p className="mt-1 text-xs text-[#0f172a]/70">
            {locale === "tr"
              ? "Clauson (1972) ve Tekin (1991) etimolojik doğrulamasıyla temel sözcüklerin kollar arası düzenli ses değişimleri."
              : "Regular cross-branch sound correspondences verified against Clauson (1972) and Tekin (1991)."}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {cats.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCat(c.id)}
              className={`focus-museum rounded-lg border px-2.5 py-1 text-xs font-semibold ${
                cat === c.id
                  ? "border-[#0e7490] bg-[#0e7490] text-white"
                  : "border-[#e2dacb] bg-[#f8f6f1] text-[#0f172a]"
              }`}
            >
              {c.label[locale]}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-[#e2dacb] bg-[#f8f6f1] text-[#0f172a]">
              <th className="p-2.5 font-bold">{locale === "tr" ? "Anlam" : "Gloss"}</th>
              <th className="p-2.5 font-mono font-bold text-[#b45309]">Proto-Türkçe</th>
              <th className="p-2.5 font-mono font-bold">Eski Türkçe</th>
              <th className="p-2.5 font-bold">Türkçe</th>
              <th className="p-2.5 font-bold">Azerbaycan</th>
              <th className="p-2.5 font-bold">Kazakça</th>
              <th className="p-2.5 font-bold">Özbekçe</th>
              <th className="p-2.5 font-bold">Sahaca</th>
              <th className="p-2.5 font-bold">Çuvaşça</th>
              <th className="p-2.5 font-bold">Halaçça</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2dacb]">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-[#f8f6f1]/70">
                <td className="p-2.5 font-semibold text-[#0f172a]">{r.meaning[locale]}</td>
                <td className="p-2.5 font-mono font-semibold text-[#b45309]">{r.protoTurkic}</td>
                <td className="p-2.5 font-mono text-[#0f172a]/85">{r.oldTurkic}</td>
                <td className="p-2.5 font-mono text-[#0f172a]">{r.turkish}</td>
                <td className="p-2.5 font-mono text-[#0f172a]/85">{r.azerbaijani}</td>
                <td className="p-2.5 font-mono text-[#0f172a]/85">{r.kazakh}</td>
                <td className="p-2.5 font-mono text-[#0f172a]/85">{r.uzbek}</td>
                <td className="p-2.5 font-mono text-[#0f172a]/85">{r.sakha}</td>
                <td className="p-2.5 font-mono font-semibold text-[#991b1b]">{r.chuvash}</td>
                <td className="p-2.5 font-mono text-[#0e7490]">{r.khalaj}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
