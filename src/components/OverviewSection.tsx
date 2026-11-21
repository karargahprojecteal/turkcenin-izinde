"use client";

import React from "react";
import {
  Clock,
  GitBranch,
  Languages,
  Map as MapIcon,
  Landmark,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { Locale, UI_COPY } from "@/data/i18n";
import { HISTORICAL_PERIODS } from "@/data/periods";
import { TURKIC_BRANCHES } from "@/data/languageFamily";
import { ALPHABET_SYSTEMS } from "@/data/alphabets";
import { HISTORICAL_ARTIFACTS } from "@/data/artifacts";
import { ACADEMIC_SOURCES } from "@/data/bibliography";
import { OrkhonTengriTegSvg } from "./OrkhonVectorGlyphs";
import { SectionId } from "./types";

interface OverviewSectionProps {
  locale: Locale;
  onNavigate: (section: SectionId) => void;
}

export function OverviewSection({ locale, onNavigate }: OverviewSectionProps) {
  const copy = UI_COPY[locale];
  const totalLanguages = TURKIC_BRANCHES.reduce(
    (sum, b) => sum + b.languages.length,
    0
  );

  const distinctions =
    locale === "tr"
      ? [
          {
            term: "Dil (Language)",
            example: "Türkçe, Kazakça, Çuvaşça",
            desc: "Kendi sesbilgisi, biçimbilgisi ve tarihsel gelişim çizgisine sahip bağımsız iletişim sistemi. Yazısı değişse de genetik ailesi değişmez.",
            accent: "border-[#0e7490]/30 bg-[#0e7490]/5",
            badge: "bg-[#0e7490] text-white",
          },
          {
            term: "Lehçe / Ağız (Dialect)",
            example: "Oğuz, Kıpçak, Anadolu Ağızları",
            desc: "Aynı dilin veya yakın dalın bölgesel, tarihsel ve sesbilgisel alt çeşitlenmeleri. Karşılıklı anlaşılabilirlik derece derece değişir.",
            accent: "border-[#0f172a]/20 bg-[#f1ede4]/60",
            badge: "bg-[#0f172a] text-white",
          },
          {
            term: "Yazı Sistemi (Writing System)",
            example: "Abjad, Abugida, Alfabe, Runiform",
            desc: "Sözlü dili görsel işaretlere dönüştürme ilkesi (ör. ünsüz ağırlıklı abjad veya hece temelli abugida).",
            accent: "border-[#b45309]/30 bg-[#b45309]/5",
            badge: "bg-[#b45309] text-white",
          },
          {
            term: "Alfabe (Alphabet)",
            example: "Göktürk, Eski Uygur, Arap, Latin, Kiril",
            desc: "Belirli bir yazı sisteminin somut harf ve işaret envanteri. Eski Uygurca aynı anda 5 farklı alfabeyle yazılmıştır.",
            accent: "border-[#0e7490]/30 bg-white",
            badge: "bg-[#0e7490]/15 text-[#0e7490]",
          },
        ]
      : [
          {
            term: "Language",
            example: "Turkish, Kazakh, Chuvash",
            desc: "An autonomous linguistic system with its own phonology, morphosyntax, and lineage. Changing its script never alters its genetic family.",
            accent: "border-[#0e7490]/30 bg-[#0e7490]/5",
            badge: "bg-[#0e7490] text-white",
          },
          {
            term: "Dialect",
            example: "Oghuz, Kipchak, Anatolian varieties",
            desc: "Regional, historical, or social varieties within a language or closely related continuum with varying mutual intelligibility.",
            accent: "border-[#0f172a]/20 bg-[#f1ede4]/60",
            badge: "bg-[#0f172a] text-white",
          },
          {
            term: "Writing System",
            example: "Abjad, Abugida, Alphabet, Runiform",
            desc: "The structural principle by which spoken language is encoded visually (e.g., consonant-heavy abjad vs. phonemic alphabet).",
            accent: "border-[#b45309]/30 bg-[#b45309]/5",
            badge: "bg-[#b45309] text-white",
          },
          {
            term: "Alphabet",
            example: "Orkhon, Old Uyghur, Arabic, Latin, Cyrillic",
            desc: "A specific inventory of graphemes. Old Uyghur, for instance, was written concurrently in five distinct alphabets along the Silk Road.",
            accent: "border-[#0e7490]/30 bg-white",
            badge: "bg-[#0e7490]/15 text-[#0e7490]",
          },
        ];

  const modules: {
    id: SectionId;
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    stat: string;
    desc: string;
  }[] = [
    {
      id: "timeline",
      icon: Clock,
      title: copy.nav.timeline,
      stat: `${HISTORICAL_PERIODS.length} ${locale === "tr" ? "Dönem" : "Periods"}`,
      desc:
        locale === "tr"
          ? "Proto-Türkçeden günümüze kronolojik katmanlar, ses değişimleri ve dönem detayları."
          : "Chronological layers from Proto-Turkic to the present with phonological milestones.",
    },
    {
      id: "tree",
      icon: GitBranch,
      title: copy.nav.tree,
      stat: `${TURKIC_BRANCHES.length} ${locale === "tr" ? "Ana Dal" : "Branches"} · ${totalLanguages} ${locale === "tr" ? "Dil" : "Languages"}`,
      desc:
        locale === "tr"
          ? "Oğur–Genel Türkçe ayrımı, etkileşimli soyağacı ve karşılaştırmalı ses denkliği."
          : "Oghur–Common Turkic split, interactive cladogram, and comparative phonology.",
    },
    {
      id: "alphabets",
      icon: Languages,
      title: copy.nav.alphabets,
      stat: `${ALPHABET_SYSTEMS.length} ${locale === "tr" ? "Yazı Geleneği" : "Script Traditions"}`,
      desc:
        locale === "tr"
          ? "Özgün Unicode glifler, okuma yönü görselleştiricisi ve çevriyazı laboratuvarı."
          : "Authentic Unicode glyphs, reading-direction visualizer, and transliteration lab.",
    },
    {
      id: "atlas",
      icon: MapIcon,
      title: copy.nav.atlas,
      stat: locale === "tr" ? "Tarihsel ↔ Çağdaş" : "Historical ↔ Modern",
      desc:
        locale === "tr"
          ? "Orhon'dan Anadolu'ya tarihsel merkezler ve çağdaş Türk dilleri coğrafyası."
          : "Historical cultural centers from Orkhon to Anatolia vs. modern Turkic distribution.",
    },
    {
      id: "artifacts",
      icon: Landmark,
      title: copy.nav.artifacts,
      stat: `${HISTORICAL_ARTIFACTS.length} ${locale === "tr" ? "Birincil Eser" : "Primary Artifacts"}`,
      desc:
        locale === "tr"
          ? "Yazıtlar, İpek Yolu ruloları, sözlükler ve müze envanter künyeleri."
          : "Monumental stelae, Silk Road scrolls, lexicons, and archival records.",
    },
    {
      id: "sources",
      icon: BookOpen,
      title: copy.nav.sources,
      stat: `${ACADEMIC_SOURCES.length} ${locale === "tr" ? "Akademik Kaynak" : "Scholarly Sources"}`,
      desc:
        locale === "tr"
          ? "Brill ETLO, UNESCO, TDV İslâm Ansiklopedisi ve hakemli yayınlar."
          : "Brill ETLO, UNESCO dossiers, TDV Encyclopedia, and peer-reviewed studies.",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Imperial Museum Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-[#b45309]/30 bg-[#0f172a] px-6 py-10 text-[#f8f6f1] shadow-xl sm:px-10 sm:py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#0e7490]/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-[#b45309]/20 blur-3xl"
        />

        <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="space-y-5 lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#b45309]/50 bg-[#b45309]/15 px-3.5 py-1 text-xs font-semibold tracking-wide text-[#fbbf24]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>
                {locale === "tr"
                  ? "İmparatorluk Müzesi & Modern Akademik Atlas"
                  : "Imperial Museum & Modern Academic Atlas"}
              </span>
            </div>

            <h1 className="font-serif text-3xl font-bold tracking-tight text-[#f8f6f1] sm:text-4xl lg:text-5xl">
              {copy.brandTitle}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-[#cbd5e1] sm:text-lg">
              {locale === "tr"
                ? "Proto-Türkçe kuramsal rekonstrüksiyonundan Orhon yazıtlarına, İpek Yolu'nun çok alfabeli el yazmalarından 1928 Harf Devrimi'ne ve çağdaş 20+ Türk yazı diline uzanan bilimsel tarih atlası."
                : "A scientific atlas tracing Turkic from theoretical Proto-Turkic reconstruction to the Orkhon inscriptions, multi-script Silk Road manuscripts, the 1928 Alphabet Reform, and 20+ living literary languages."}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigate("timeline")}
                className="focus-museum inline-flex items-center gap-2 rounded-xl bg-[#0e7490] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#0891b2]"
              >
                <Clock className="h-4 w-4" />
                <span>
                  {locale === "tr" ? "Tarih Çizelgesini Keşfet" : "Explore Timeline"}
                </span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate("atlas")}
                className="focus-museum inline-flex items-center gap-2 rounded-xl border border-[#f8f6f1]/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-[#f8f6f1] backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <MapIcon className="h-4 w-4 text-[#fbbf24]" />
                <span>
                  {locale === "tr" ? "Coğrafi Atlası Aç" : "Open Geographic Atlas"}
                </span>
              </button>
            </div>
          </div>

          {/* Epigraphic Specimen Card */}
          <div className="rounded-xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm lg:col-span-4">
            <div className="mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-widest text-[#fbbf24]">
              <span>{locale === "tr" ? "Müze Örneği · 732 MS" : "Museum Specimen · 732 CE"}</span>
              <span className="rounded bg-[#0e7490]/30 px-2 py-0.5 text-[#7dd3fc]">
                UNESCO
              </span>
            </div>
            <div className="my-3 rounded-lg border border-[#b45309]/30 bg-[#0f172a]/85 px-3 py-3 text-[#fbbf24]">
              <OrkhonTengriTegSvg className="h-10 w-full" />
            </div>
            <div className="space-y-1 text-xs text-[#cbd5e1]">
              <p className="font-mono text-[#7dd3fc]">Teŋri teg...</p>
              <p>
                {locale === "tr"
                  ? "Kül Tigin Yazıtı — Doğrudan belgelenmiş en erken anıtsal Türkçe hitabelerden biri."
                  : "Kul Tigin Stele — Among the earliest directly attested monumental Turkic texts."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scientific Distinctions */}
      <section aria-labelledby="distinctions-heading" className="space-y-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2
              id="distinctions-heading"
              className="font-serif text-2xl font-bold text-[#0f172a]"
            >
              {locale === "tr"
                ? "Temel Bilimsel Ayrımlar"
                : "Foundational Scientific Distinctions"}
            </h2>
            <p className="mt-1 text-sm text-[#0f172a]/70">
              {locale === "tr"
                ? "Türkoloji ve karşılaştırmalı dilbilimde kavram karmaşasını önleyen dört temel çerçeve."
                : "Four core conceptual boundaries in Turkology and comparative-historical linguistics."}
            </p>
          </div>
        </div>

        {/* Notice Banner */}
        <div className="flex items-start gap-3 rounded-xl border border-[#0e7490]/30 bg-[#0e7490]/10 p-4 text-sm text-[#0f172a]">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#0e7490]" />
          <p className="font-medium leading-relaxed">{copy.distinctionNotice}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {distinctions.map((item) => (
            <div
              key={item.term}
              className={`rounded-xl border p-5 shadow-sm transition-shadow hover:shadow-md ${item.accent}`}
            >
              <span
                className={`inline-block rounded-md px-2.5 py-1 text-xs font-bold ${item.badge}`}
              >
                {item.term}
              </span>
              <p className="mt-3 font-mono text-xs font-semibold text-[#0e7490]">
                {item.example}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#0f172a]/80">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Epistemic Distinction: Reconstructed vs Attested */}
      <section aria-labelledby="epistemic-heading" className="space-y-4">
        <h2
          id="epistemic-heading"
          className="font-serif text-2xl font-bold text-[#0f172a]"
        >
          {locale === "tr"
            ? "Epistemik Ayrım: Kuramsal vs. Kanıtlanmış"
            : "Epistemic Distinction: Reconstructed vs. Attested"}
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border-2 border-dashed border-[#b45309]/50 bg-[#b45309]/5 p-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#b45309] px-3 py-1 text-xs font-bold text-white">
                <Sparkles className="h-3.5 w-3.5" />
                {copy.badges.reconstructed}
              </span>
            </div>
            <h3 className="mt-3 font-serif text-lg font-bold text-[#0f172a]">
              {locale === "tr"
                ? "Proto-Türkçe (*r / *l ve *z / *š)"
                : "Proto-Turkic (*r / *l vs. *z / *š)"}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#0f172a]/80">
              {locale === "tr"
                ? "Doğrudan yazılı belgesi yoktur. Çuvaşça (Oğur) ve Genel Türkçe dillerinin ses ve biçim verilerinin geriye dönük karşılaştırılmasıyla yıldızlı (*) kuramsal biçimler olarak yeniden yapılandırılır."
                : "No direct written records survive. Reconstructed backward as asterisked (*) theoretical forms by comparing Oghur (Chuvash) and Common Turkic evidence."}
            </p>
          </div>

          <div className="rounded-xl border-2 border-[#0e7490]/50 bg-[#0e7490]/5 p-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0e7490] px-3 py-1 text-xs font-bold text-white">
                <ShieldCheck className="h-3.5 w-3.5" />
                {copy.badges.attested}
              </span>
            </div>
            <h3 className="mt-3 font-serif text-lg font-bold text-[#0f172a]">
              {locale === "tr"
                ? "Orhon Yazıtlarından Günümüze (MS 720+)"
                : "From Orkhon Inscriptions to Present (720 CE+)"}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#0f172a]/80">
              {locale === "tr"
                ? "Taş anıtlar, Turfan İpek Yolu rulo ve kodeksleri, Karahanlı sözlükleri, Harezm-Çağatay-Osmanlı yazmaları ve modern matbu belgelerle doğrudan doğrulanabilen dönemler."
                : "Directly verifiable through stone stelae, Silk Road scrolls and codices, Karakhanid lexicons, Khwarazmian-Chagatai-Ottoman manuscripts, and modern print."}
            </p>
          </div>
        </div>
      </section>

      {/* Quick-Jump Modules */}
      <section aria-labelledby="modules-heading" className="space-y-4">
        <h2
          id="modules-heading"
          className="font-serif text-2xl font-bold text-[#0f172a]"
        >
          {locale === "tr" ? "Atlas Modülleri" : "Atlas Modules"}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map(({ id, icon: Icon, title, stat, desc }) => (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              className="focus-museum group flex flex-col justify-between rounded-xl border border-[#e2dacb] bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0e7490] hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f1ede4] text-[#0e7490] transition-colors group-hover:bg-[#0e7490] group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-[#f8f6f1] px-2.5 py-1 font-mono text-[11px] font-semibold text-[#b45309]">
                    {stat}
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-lg font-bold text-[#0f172a] group-hover:text-[#0e7490]">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#0f172a]/75">
                  {desc}
                </p>
              </div>
              <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#0e7490]">
                <span>{locale === "tr" ? "Modülü Aç" : "Open Module"}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
