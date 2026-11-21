"use client";

import React, { useState } from "react";
import { ArrowRight, GitCompare } from "lucide-react";
import { Locale } from "@/data/i18n";
import { CladogramSelection } from "./CladogramSvg";

interface SoundLawComparatorProps {
  locale: Locale;
  onSelectBranch: (sel: CladogramSelection) => void;
}

interface BranchReflex {
  branchId: string;
  macroGroup: "oghur" | "common-turkic";
  branchLabel: { tr: string; en: string };
  languageExample: string;
  form: string;
  ipa: string;
  rule: { tr: string; en: string };
}

interface CognateSet {
  id: string;
  lawId: "rhotacism" | "intervocalic-d" | "final-g";
  protoForm: string;
  meaning: { tr: string; en: string };
  diagnosticNote: { tr: string; en: string };
  reflexes: BranchReflex[];
}

const SOUND_LAW_CATEGORIES = [
  {
    id: "rhotacism" as const,
    code: "LAW 01",
    title: {
      tr: "Rotasizm & Lambdasizm (*r/*l ↔ *z/*š)",
      en: "Rhotacism & Lambdacism (*r/*l ↔ *z/*š)",
    },
    subtitle: {
      tr: "Oğur (Çuvaşça) ile Genel Türkçe arasındaki en temel genetik ayrım ölçütü",
      en: "Primary genetic split criterion between Oghur (Chuvash) and Common Turkic",
    },
  },
  {
    id: "intervocalic-d" as const,
    code: "LAW 02",
    title: {
      tr: "Söz İçi *-d- İzoglosu (adaq / ayaq / adak / azax / hadaq)",
      en: "Intervocalic *-d- Isogloss (adaq / ayaq / adak / azax / hadaq)",
    },
    subtitle: {
      tr: "Eski Türkçe *d ünsüzünün 6 koldaki ses değişimi (Talat Tekin sınıflandırma ölçütü)",
      en: "Evolution of Old Turkic *d across the 6 branches (Talat Tekin classification criterion)",
    },
  },
  {
    id: "final-g" as const,
    code: "LAW 03",
    title: {
      tr: "Hece Sonu *-g ve Söz Başı *t- (*tağ / dağ / taw)",
      en: "Syllable-Final *-g & Initial *t- (*tağ / dağ / taw)",
    },
    subtitle: {
      tr: "Oğuz ötümlüleşmesi ve Kıpçak dudaksıllaşması (*-g > -w / Ø)",
      en: "Oghuz voicing/drop vs Kipchak labialization (*-g > -w / Ø)",
    },
  },
];

const COGNATE_SETS: CognateSet[] = [
  {
    id: "toquz",
    lawId: "rhotacism",
    protoForm: "*toq(q)uz",
    meaning: { tr: "dokuz (9)", en: "nine (9)" },
    diagnosticNote: {
      tr: "Genel Türkçedeki söz sonu -z ünsüzüne karşılık Oğur kolunda -r bulunur (rotasizm).",
      en: "Common Turkic final -z corresponds to Oghur -r (rhotacism).",
    },
    reflexes: [
      {
        branchId: "oghur",
        macroGroup: "oghur",
        branchLabel: { tr: "Oğur Kolu", en: "Oghur" },
        languageExample: "Çuvaşça",
        form: "тӑххӑр (tăhhăr)",
        ipa: "[tʌχːʌr]",
        rule: { tr: "*z > r (Rotasizm)", en: "*z > r (Rhotacism)" },
      },
      {
        branchId: "oghuz",
        macroGroup: "common-turkic",
        branchLabel: { tr: "Oğuz Kolu", en: "Oghuz" },
        languageExample: "Türkçe",
        form: "dokuz",
        ipa: "[doˈkuz]",
        rule: { tr: "t- > d-, *z korunur", en: "t- > d-, *z retained" },
      },
      {
        branchId: "kipchak",
        macroGroup: "common-turkic",
        branchLabel: { tr: "Kıpçak Kolu", en: "Kipchak" },
        languageExample: "Kazakça",
        form: "тоғыз (toğız)",
        ipa: "[toˈʁəz]",
        rule: { tr: "*z korunur", en: "*z retained" },
      },
      {
        branchId: "karluk",
        macroGroup: "common-turkic",
        branchLabel: { tr: "Karluk Kolu", en: "Karluk" },
        languageExample: "Özbekçe",
        form: "toʻqqiz",
        ipa: "[toqˈqɨz]",
        rule: { tr: "*z korunur", en: "*z retained" },
      },
      {
        branchId: "siberian",
        macroGroup: "common-turkic",
        branchLabel: { tr: "Sibirya Kolu", en: "Siberian" },
        languageExample: "Tuvaca",
        form: "тос (tos)",
        ipa: "[tɔs]",
        rule: { tr: "*z > s (ötümsüzleşme)", en: "*z > s (devoicing)" },
      },
      {
        branchId: "arghu",
        macroGroup: "common-turkic",
        branchLabel: { tr: "Arğu Kolu", en: "Arghu" },
        languageExample: "Halaçça",
        form: "toqquz",
        ipa: "[toqˈquz]",
        rule: { tr: "*z korunur", en: "*z retained" },
      },
    ],
  },
  {
    id: "bes",
    lawId: "rhotacism",
    protoForm: "*bēš",
    meaning: { tr: "beş (5)", en: "five (5)" },
    diagnosticNote: {
      tr: "Genel Türkçedeki š (ş) ünsüzüne karşılık Oğur kolunda l bulunur (lambdasizm).",
      en: "Common Turkic š corresponds to Oghur l (lambdacism).",
    },
    reflexes: [
      {
        branchId: "oghur",
        macroGroup: "oghur",
        branchLabel: { tr: "Oğur Kolu", en: "Oghur" },
        languageExample: "Çuvaşça",
        form: "пиллӗк (pillĕk)",
        ipa: "[pilːɘk]",
        rule: { tr: "*š > l (Lambdasizm)", en: "*š > l (Lambdacism)" },
      },
      {
        branchId: "oghuz",
        macroGroup: "common-turkic",
        branchLabel: { tr: "Oğuz Kolu", en: "Oghuz" },
        languageExample: "Türkçe / Türkmence",
        form: "beş / bäş",
        ipa: "[beʃ] / [bæːʃ]",
        rule: { tr: "*š korunur", en: "*š retained" },
      },
      {
        branchId: "kipchak",
        macroGroup: "common-turkic",
        branchLabel: { tr: "Kıpçak Kolu", en: "Kipchak" },
        languageExample: "Kazakça",
        form: "бес (bes)",
        ipa: "[bʲes]",
        rule: { tr: "*š > s (Güney Kıpçak)", en: "*š > s (South Kipchak)" },
      },
      {
        branchId: "karluk",
        macroGroup: "common-turkic",
        branchLabel: { tr: "Karluk Kolu", en: "Karluk" },
        languageExample: "Özbekçe",
        form: "besh",
        ipa: "[beʃ]",
        rule: { tr: "*š korunur", en: "*š retained" },
      },
      {
        branchId: "siberian",
        macroGroup: "common-turkic",
        branchLabel: { tr: "Sibirya Kolu", en: "Siberian" },
        languageExample: "Tuvaca",
        form: "беш (beš)",
        ipa: "[peʃ]",
        rule: { tr: "*š korunur", en: "*š retained" },
      },
      {
        branchId: "arghu",
        macroGroup: "common-turkic",
        branchLabel: { tr: "Arğu Kolu", en: "Arghu" },
        languageExample: "Halaçça",
        form: "bēš",
        ipa: "[beːʃ]",
        rule: { tr: "Uzun ünlü + *š korunur", en: "Long vowel + *š retained" },
      },
    ],
  },
  {
    id: "qiz",
    lawId: "rhotacism",
    protoForm: "*qīz",
    meaning: { tr: "kız / kız evlat", en: "girl / daughter" },
    diagnosticNote: {
      tr: "Oğur kolunda *z > r değişimi yanında ön ünlüleşme ve *q > x sızıcılaşması görülür.",
      en: "In Oghur, *z > r is accompanied by *q > x spirantization.",
    },
    reflexes: [
      {
        branchId: "oghur",
        macroGroup: "oghur",
        branchLabel: { tr: "Oğur Kolu", en: "Oghur" },
        languageExample: "Çuvaşça",
        form: "хӗр (xĕr)",
        ipa: "[χɘr]",
        rule: { tr: "*z > r (Rotasizm)", en: "*z > r (Rhotacism)" },
      },
      {
        branchId: "oghuz",
        macroGroup: "common-turkic",
        branchLabel: { tr: "Oğuz Kolu", en: "Oghuz" },
        languageExample: "Türkçe / Türkmence",
        form: "kız / gyz",
        ipa: "[kɯz] / [ɡɯːz]",
        rule: { tr: "*z korunur", en: "*z retained" },
      },
      {
        branchId: "kipchak",
        macroGroup: "common-turkic",
        branchLabel: { tr: "Kıpçak Kolu", en: "Kipchak" },
        languageExample: "Tatarca / Kazakça",
        form: "кыз (qız)",
        ipa: "[qɯz]",
        rule: { tr: "*z korunur", en: "*z retained" },
      },
      {
        branchId: "karluk",
        macroGroup: "common-turkic",
        branchLabel: { tr: "Karluk Kolu", en: "Karluk" },
        languageExample: "Yeni Uygurca",
        form: "قىز (qiz)",
        ipa: "[qiz]",
        rule: { tr: "*z korunur", en: "*z retained" },
      },
      {
        branchId: "siberian",
        macroGroup: "common-turkic",
        branchLabel: { tr: "Sibirya Kolu", en: "Siberian" },
        languageExample: "Sahaca",
        form: "кыыс (kııs)",
        ipa: "[kɯːs]",
        rule: { tr: "Uzun ünlü, *z > s", en: "Long vowel, *z > s" },
      },
      {
        branchId: "arghu",
        macroGroup: "common-turkic",
        branchLabel: { tr: "Arğu Kolu", en: "Arghu" },
        languageExample: "Halaçça",
        form: "qīz",
        ipa: "[qiːz]",
        rule: { tr: "Uzun ünlü + *z korunur", en: "Long vowel + *z retained" },
      },
    ],
  },
  {
    id: "adaq",
    lawId: "intervocalic-d",
    protoForm: "*hadaq / *adaq",
    meaning: { tr: "ayak", en: "foot" },
    diagnosticNote: {
      tr: "Türk dilleri sınıflandırmasının en ünlü ölçütüdür: Oğuz-Kıpçak-Karluk'ta -y-, Tuvacada -d-, Hakasçada -z-, Halaççada hem söz başı h- hem -d- korunur.",
      en: "The hallmark isogloss of Turkic classification: -y- in Oghuz/Kipchak/Karluk, -d- in Tuvan, -z- in Khakas, and both initial h- and -d- in Khalaj.",
    },
    reflexes: [
      {
        branchId: "oghur",
        macroGroup: "oghur",
        branchLabel: { tr: "Oğur Kolu", en: "Oghur" },
        languageExample: "Çuvaşça",
        form: "ура (ura)",
        ipa: "[ura]",
        rule: { tr: "*d > r (Rotasizm)", en: "*d > r (Rhotacism)" },
      },
      {
        branchId: "oghuz",
        macroGroup: "common-turkic",
        branchLabel: { tr: "Oğuz Kolu", en: "Oghuz" },
        languageExample: "Türkçe",
        form: "ayak",
        ipa: "[aˈjak]",
        rule: { tr: "*-d- > -y-", en: "*-d- > -y-" },
      },
      {
        branchId: "kipchak",
        macroGroup: "common-turkic",
        branchLabel: { tr: "Kıpçak Kolu", en: "Kipchak" },
        languageExample: "Kazakça / Tatarca",
        form: "аяқ (ayaq)",
        ipa: "[aˈjɑq]",
        rule: { tr: "*-d- > -y-", en: "*-d- > -y-" },
      },
      {
        branchId: "karluk",
        macroGroup: "common-turkic",
        branchLabel: { tr: "Karluk Kolu", en: "Karluk" },
        languageExample: "Özbekçe / Uygurca",
        form: "oyoq / ayaq",
        ipa: "[ɔˈjɔq] / [aˈjaq]",
        rule: { tr: "*-d- > -y-", en: "*-d- > -y-" },
      },
      {
        branchId: "siberian",
        macroGroup: "common-turkic",
        branchLabel: { tr: "Sibirya Kolu", en: "Siberian" },
        languageExample: "Tuvaca / Hakasça / Sahaca",
        form: "adak / azax / atax",
        ipa: "[aˈdak] / [aˈzax] / [aˈtax]",
        rule: { tr: "-d- korunur / -z- / -t-", en: "-d- retained / -z- / -t-" },
      },
      {
        branchId: "arghu",
        macroGroup: "common-turkic",
        branchLabel: { tr: "Arğu Kolu", en: "Arghu" },
        languageExample: "Halaçça",
        form: "hadaq",
        ipa: "[haˈdaq]",
        rule: { tr: "*h- ve *-d- korunur", en: "*h- and *-d- retained" },
      },
    ],
  },
  {
    id: "edgu",
    lawId: "intervocalic-d",
    protoForm: "*edgü",
    meaning: { tr: "iyi", en: "good" },
    diagnosticNote: {
      tr: "Orhon Türkçesindeki edgü biçimi Oğuzda eyi > iyi, Kıpçakta izgi/eygi, Sibiryada ise edig/ezik biçimlerine evrilir.",
      en: "Old Turkic edgü develops into iyi in Oghuz, izgi in Kipchak, and edig/ezik in Siberian.",
    },
    reflexes: [
      {
        branchId: "oghur",
        macroGroup: "oghur",
        branchLabel: { tr: "Oğur Kolu", en: "Oghur" },
        languageExample: "Çuvaşça",
        form: "ырӑ (ıră)",
        ipa: "[ɯrɘ]",
        rule: { tr: "*d > r", en: "*d > r" },
      },
      {
        branchId: "oghuz",
        macroGroup: "common-turkic",
        branchLabel: { tr: "Oğuz Kolu", en: "Oghuz" },
        languageExample: "Türkçe",
        form: "iyi (< eyi)",
        ipa: "[iˈji]",
        rule: { tr: "*-d- > -y-, -g düşer", en: "*-d- > -y-, -g drops" },
      },
      {
        branchId: "kipchak",
        macroGroup: "common-turkic",
        branchLabel: { tr: "Kıpçak Kolu", en: "Kipchak" },
        languageExample: "Tatarca",
        form: "изге (izge)",
        ipa: "[izˈɡe]",
        rule: { tr: "*d > z (erken ödünç/kalıntı)", en: "*d > z reflex" },
      },
      {
        branchId: "karluk",
        macroGroup: "common-turkic",
        branchLabel: { tr: "Karluk Kolu", en: "Karluk" },
        languageExample: "Karahanlı > Özbekçe",
        form: "ezgü",
        ipa: "[ezˈɡy]",
        rule: { tr: "*-d- > -z- (klasik)", en: "*-d- > -z- (classical)" },
      },
      {
        branchId: "siberian",
        macroGroup: "common-turkic",
        branchLabel: { tr: "Sibirya Kolu", en: "Siberian" },
        languageExample: "Tuvaca",
        form: "эки (eki)",
        ipa: "[eˈki]",
        rule: { tr: "Söz içi daralma", en: "Internal contraction" },
      },
      {
        branchId: "arghu",
        macroGroup: "common-turkic",
        branchLabel: { tr: "Arğu Kolu", en: "Arghu" },
        languageExample: "Halaçça",
        form: "ädgü / äyü",
        ipa: "[ædˈɡy]",
        rule: { tr: "Arkaik -d- izleri", en: "Archaic -d- traces" },
      },
    ],
  },
  {
    id: "tag",
    lawId: "final-g",
    protoForm: "*tāğ",
    meaning: { tr: "dağ", en: "mountain" },
    diagnosticNote: {
      tr: "Oğuzda söz başı t- > d- ötümlüleşmesi ve hece sonu -g düşmesi; Kıpçakta hece sonu -g > -w dudaksıllaşması görülür.",
      en: "Oghuz shows initial t- > d- voicing and final -g loss; Kipchak shifts final -g > -w.",
    },
    reflexes: [
      {
        branchId: "oghur",
        macroGroup: "oghur",
        branchLabel: { tr: "Oğur Kolu", en: "Oghur" },
        languageExample: "Çuvaşça",
        form: "ту (tu)",
        ipa: "[tu]",
        rule: { tr: "*-ağ > -u", en: "*-ağ > -u" },
      },
      {
        branchId: "oghuz",
        macroGroup: "common-turkic",
        branchLabel: { tr: "Oğuz Kolu", en: "Oghuz" },
        languageExample: "Türkçe / Azerbaycanca",
        form: "dağ",
        ipa: "[daː] / [dɑɣ]",
        rule: { tr: "t- > d-, -g düşer/sızıcılaşır", en: "t- > d-, -g drops/lenites" },
      },
      {
        branchId: "kipchak",
        macroGroup: "common-turkic",
        branchLabel: { tr: "Kıpçak Kolu", en: "Kipchak" },
        languageExample: "Kazakça / Tatarca",
        form: "тау (taw)",
        ipa: "[tɑw]",
        rule: { tr: "t- korunur, *-ğ > -w", en: "t- retained, *-ğ > -w" },
      },
      {
        branchId: "karluk",
        macroGroup: "common-turkic",
        branchLabel: { tr: "Karluk Kolu", en: "Karluk" },
        languageExample: "Özbekçe / Uygurca",
        form: "togʻ / tağ",
        ipa: "[tɔʁ] / [taʁ]",
        rule: { tr: "t- ve -ğ korunur", en: "t- and -ğ retained" },
      },
      {
        branchId: "siberian",
        macroGroup: "common-turkic",
        branchLabel: { tr: "Sibirya Kolu", en: "Siberian" },
        languageExample: "Tuvaca / Sahaca",
        form: "даг (dağ) / тыа (tıa)",
        ipa: "[taɣ] / [tɯa]",
        rule: { tr: "Kuzey/Güney Sibirya ayrımı", en: "North/South Siberian split" },
      },
      {
        branchId: "arghu",
        macroGroup: "common-turkic",
        branchLabel: { tr: "Arğu Kolu", en: "Arghu" },
        languageExample: "Halaçça",
        form: "tāğ",
        ipa: "[tɒːɣ]",
        rule: { tr: "t-, uzun ünlü ve -ğ korunur", en: "t-, long vowel & -ğ retained" },
      },
    ],
  },
];

export function SoundLawComparator({ locale, onSelectBranch }: SoundLawComparatorProps) {
  const [activeLawId, setActiveLawId] = useState<"rhotacism" | "intervocalic-d" | "final-g">(
    "rhotacism"
  );
  const filteredCognates = COGNATE_SETS.filter((c) => c.lawId === activeLawId);
  const [selectedCognateId, setSelectedCognateId] = useState<string>("toquz");

  const activeCognate =
    filteredCognates.find((c) => c.id === selectedCognateId) ?? filteredCognates[0];

  const handleLawChange = (lawId: "rhotacism" | "intervocalic-d" | "final-g") => {
    setActiveLawId(lawId);
    const first = COGNATE_SETS.find((c) => c.lawId === lawId);
    if (first) setSelectedCognateId(first.id);
  };

  return (
    <section
      id="sound-laws"
      className="scroll-mt-20 border-t border-slate-300 bg-slate-100/60 py-14"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-slate-300 pb-5 md:flex-row md:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-blue-700">
              <GitCompare className="h-4 w-4" />
              {locale === "tr"
                ? "KARŞILAŞTIRMALI SESBİLGİSİ LABORATUVARI"
                : "COMPARATIVE PHONOLOGY WORKBENCH"}
            </div>
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {locale === "tr"
                ? "Ses Yasaları Karşılaştırıcısı"
                : "Phonological Sound-Law Comparator"}
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-slate-600">
            {locale === "tr"
              ? "Türk dil ailesinin genetik sınıflandırması coğrafyaya değil, düzenli tarihsel ses denkliklerine (izogloslara) dayanır."
              : "Genetic classification of the Turkic family rests on regular historical sound correspondences (isoglosses) rather than geography."}
          </p>
        </div>

        {/* 3 Law Tabs */}
        <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-3">
          {SOUND_LAW_CATEGORIES.map((law) => {
            const isActive = activeLawId === law.id;
            return (
              <button
                key={law.id}
                type="button"
                onClick={() => handleLawChange(law.id)}
                className={`border p-4 text-left transition-colors ${
                  isActive
                    ? "border-slate-900 bg-white shadow-sm"
                    : "border-slate-300 bg-slate-50 hover:border-slate-400 hover:bg-white"
                }`}
              >
                <div className="mb-1 flex items-center justify-between">
                  <span
                    className={`font-mono text-[10px] font-semibold uppercase tracking-wider ${
                      isActive ? "text-blue-700" : "text-slate-500"
                    }`}
                  >
                    {law.code}
                  </span>
                  {isActive && (
                    <span className="h-2 w-2 bg-blue-700" />
                  )}
                </div>
                <div className="text-sm font-semibold text-slate-900">
                  {law.title[locale]}
                </div>
                <div className="mt-1 text-xs leading-snug text-slate-600">
                  {law.subtitle[locale]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Cognate Selector + Matrix */}
        <div className="border border-slate-300 bg-white">
          {/* Cognate Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-300 bg-slate-50 px-5 py-3.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {locale === "tr" ? "Köken Örneği:" : "Cognate Set:"}
              </span>
              {filteredCognates.map((cog) => {
                const selected = cog.id === activeCognate.id;
                return (
                  <button
                    key={cog.id}
                    type="button"
                    onClick={() => setSelectedCognateId(cog.id)}
                    className={`border px-3 py-1 font-mono text-xs font-medium transition-colors ${
                      selected
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-300 bg-white text-slate-800 hover:border-slate-500"
                    }`}
                  >
                    {cog.protoForm} ({cog.meaning[locale]})
                  </button>
                );
              })}
            </div>

            <div className="font-mono text-xs text-slate-600">
              Proto-Turkic:{" "}
              <span className="font-semibold text-slate-900">
                {activeCognate.protoForm}
              </span>{" "}
              “{activeCognate.meaning[locale]}”
            </div>
          </div>

          {/* Diagnostic Note Banner */}
          <div className="border-b border-slate-200 bg-white px-5 py-3 text-xs leading-relaxed text-slate-700">
            <span className="mr-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-blue-700">
              {locale === "tr" ? "DİLBİLİMSEL NOT:" : "LINGUISTIC NOTE:"}
            </span>
            {activeCognate.diagnosticNote[locale]}
          </div>

          {/* 6-Branch Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-slate-300 bg-slate-100 font-mono text-[10.5px] uppercase tracking-wider text-slate-600">
                  <th className="px-4 py-2.5 font-semibold">
                    {locale === "tr" ? "Ana Grup / Kol" : "Macro / Branch"}
                  </th>
                  <th className="px-4 py-2.5 font-semibold">
                    {locale === "tr" ? "Örnek Dil" : "Representative"}
                  </th>
                  <th className="px-4 py-2.5 font-semibold">
                    {locale === "tr" ? "Biçim" : "Reflex Form"}
                  </th>
                  <th className="px-4 py-2.5 font-semibold">IPA</th>
                  <th className="px-4 py-2.5 font-semibold">
                    {locale === "tr" ? "Ses Değişimi Kuralı" : "Sound-Law Rule"}
                  </th>
                  <th className="px-4 py-2.5 text-right font-semibold">
                    {locale === "tr" ? "Ağaçta Gör" : "Inspect"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {activeCognate.reflexes.map((ref) => {
                  const isOghur = ref.macroGroup === "oghur";
                  return (
                    <tr
                      key={ref.branchId}
                      className={`transition-colors hover:bg-slate-50 ${
                        isOghur ? "bg-red-50/25" : ""
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-block h-2.5 w-2.5 shrink-0 ${
                              isOghur ? "bg-[#991b1b]" : "bg-[#1d4ed8]"
                            }`}
                          />
                          <span className="font-semibold text-slate-900">
                            {ref.branchLabel[locale]}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-700">{ref.languageExample}</td>
                      <td className="px-4 py-3 font-mono text-sm font-semibold text-slate-900">
                        {ref.form}
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-500">{ref.ipa}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block border px-2 py-0.5 font-mono text-[10.5px] font-medium ${
                            isOghur
                              ? "border-red-300 bg-red-50 text-red-900"
                              : "border-blue-200 bg-blue-50 text-blue-900"
                          }`}
                        >
                          {ref.rule[locale]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            onSelectBranch({ kind: "branch", branchId: ref.branchId });
                            document
                              .getElementById("cladogram")
                              ?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="inline-flex items-center gap-1 font-mono text-[10.5px] font-medium text-blue-700 hover:underline"
                        >
                          {locale === "tr" ? "Seç" : "Select"}
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
