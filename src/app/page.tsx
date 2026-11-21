"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  BookMarked,
  ChevronLeft,
  ChevronRight,
  Compass,
  Feather,
  Globe,
  Info,
  Landmark,
  Layers,
  MapPin,
  Menu,
  ScrollText,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { UI_COPY, type Locale } from "@/data/i18n";
import {
  HISTORICAL_PERIODS,
  type EpistemicStatus,
  type HistoricalPeriod,
} from "@/data/periods";
import { HISTORICAL_ARTIFACTS, type HistoricalArtifact } from "@/data/artifacts";
import { ACADEMIC_SOURCES, type AcademicSource } from "@/data/bibliography";
import {
  formatYearRange,
  getScriptMeta,
} from "@/components/scriptHelpers";
import { ScriptInspector } from "@/components/ScriptInspector";
import {
  BibliographyDrawer,
  SourceCard,
} from "@/components/BibliographyDrawer";

type EpistemicFilter = "all" | EpistemicStatus;

export default function ChronosPage() {
  const [locale, setLocale] = useState<Locale>("tr");
  const [activePeriodId, setActivePeriodId] = useState<string>(
    HISTORICAL_PERIODS[1]?.id ?? HISTORICAL_PERIODS[0].id
  );
  const [selectedScriptId, setSelectedScriptId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<EpistemicFilter>("all");
  const [isBibDrawerOpen, setIsBibDrawerOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const horizontalTrackRef = useRef<HTMLDivElement | null>(null);
  const periodNodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const copy = UI_COPY[locale];

  const sortedPeriods = useMemo(
    () => [...HISTORICAL_PERIODS].sort((a, b) => a.order - b.order),
    []
  );

  const filteredPeriods = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return sortedPeriods.filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (!q) return true;
      const haystack = [
        p.title[locale],
        p.subtitle[locale],
        p.region[locale],
        p.dateLabel[locale],
        p.summary[locale],
        ...p.keyWorks,
        ...p.scripts.map((sid) => getScriptMeta(sid).label[locale]),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [sortedPeriods, statusFilter, searchQuery, locale]);

  const activePeriod: HistoricalPeriod = useMemo(() => {
    return (
      sortedPeriods.find((p) => p.id === activePeriodId) ?? sortedPeriods[0]
    );
  }, [sortedPeriods, activePeriodId]);

  const activeIndex = sortedPeriods.findIndex((p) => p.id === activePeriod.id);
  const prevPeriod = activeIndex > 0 ? sortedPeriods[activeIndex - 1] : null;
  const nextPeriod =
    activeIndex < sortedPeriods.length - 1
      ? sortedPeriods[activeIndex + 1]
      : null;

  const periodArtifacts: HistoricalArtifact[] = useMemo(
    () => HISTORICAL_ARTIFACTS.filter((a) => a.periodId === activePeriod.id),
    [activePeriod.id]
  );

  const periodSources: AcademicSource[] = useMemo(
    () =>
      ACADEMIC_SOURCES.filter((s) => activePeriod.sourceIds.includes(s.id)),
    [activePeriod.sourceIds]
  );

  const handleSelectPeriod = (periodId: string) => {
    setActivePeriodId(periodId);
    setSelectedScriptId(null);
    const node = periodNodeRefs.current[periodId];
    if (node) {
      node.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  const scrollTimelineBy = (delta: number) => {
    if (!horizontalTrackRef.current) return;
    horizontalTrackRef.current.scrollBy({
      left: delta,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.key === "ArrowLeft" && prevPeriod) {
        handleSelectPeriod(prevPeriod.id);
      } else if (e.key === "ArrowRight" && nextPeriod) {
        handleSelectPeriod(nextPeriod.id);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [prevPeriod, nextPeriod]);

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#1c1917] pb-20 md:pb-12">
      {/* Top Archival Masthead */}
      <header className="sticky top-0 z-40 border-b border-[#e6dccb] bg-[#faf7f2]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#b45309]/40 bg-[#f3ede2] font-serif text-lg font-bold text-[#b45309] shadow-xs">
              𐱅
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold tracking-tight text-[#1c1917] sm:text-xl">
                  {copy.brandTitle}
                </span>
                <span className="rounded-md border border-[#b45309]/35 bg-[#b45309]/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#b45309]">
                  CHRONOS
                </span>
              </div>
              <p className="hidden text-xs text-[#78716c] sm:block">
                {copy.brandSubtitle}
              </p>
            </div>
          </div>

          {/* Desktop Navigation & Actions */}
          <nav
            aria-label={locale === "tr" ? "Ana gezinme" : "Primary navigation"}
            className="hidden items-center gap-5 lg:flex"
          >
            <a
              href="#timeline-section"
              className="text-xs font-semibold uppercase tracking-wider text-[#44403c] transition-colors hover:text-[#b45309]"
            >
              {copy.nav.timeline}
            </a>
            <a
              href="#period-folio"
              className="text-xs font-semibold uppercase tracking-wider text-[#44403c] transition-colors hover:text-[#b45309]"
            >
              {locale === "tr" ? "Dönem Dosyası" : "Period Folio"}
            </a>
            <a
              href="#script-ribbon"
              className="text-xs font-semibold uppercase tracking-wider text-[#44403c] transition-colors hover:text-[#b45309]"
            >
              {copy.nav.alphabets}
            </a>
            <a
              href="#sources-section"
              className="text-xs font-semibold uppercase tracking-wider text-[#44403c] transition-colors hover:text-[#b45309]"
            >
              {copy.nav.sources}
            </a>
          </nav>

          <div className="flex items-center gap-2">
            {/* Bibliography Drawer Button */}
            <button
              type="button"
              onClick={() => setIsBibDrawerOpen(true)}
              className="hidden items-center gap-1.5 rounded-lg border border-[#d6cbb8] bg-[#f3ede2] px-3 py-1.5 text-xs font-semibold text-[#1c1917] transition-colors hover:border-[#b45309] hover:text-[#b45309] sm:inline-flex"
            >
              <BookMarked className="h-3.5 w-3.5 text-[#b45309]" />
              <span>{copy.nav.sources}</span>
              <span className="rounded bg-[#1c1917]/10 px-1.5 py-0.5 font-mono text-[10px]">
                {ACADEMIC_SOURCES.length}
              </span>
            </button>

            {/* TR / EN Language Toggle */}
            <div
              role="group"
              aria-label={locale === "tr" ? "Dil seçimi" : "Language toggle"}
              className="inline-flex rounded-lg border border-[#d6cbb8] bg-[#f3ede2] p-0.5"
            >
              <button
                type="button"
                onClick={() => setLocale("tr")}
                className={`rounded-md px-2.5 py-1 font-mono text-xs font-semibold transition-colors ${
                  locale === "tr"
                    ? "bg-[#1c1917] text-[#faf7f2]"
                    : "text-[#57534e] hover:text-[#1c1917]"
                }`}
              >
                TR
              </button>
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={`rounded-md px-2.5 py-1 font-mono text-xs font-semibold transition-colors ${
                  locale === "en"
                    ? "bg-[#1c1917] text-[#faf7f2]"
                    : "text-[#57534e] hover:text-[#1c1917]"
                }`}
              >
                EN
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label={locale === "tr" ? "Menüyü aç" : "Toggle menu"}
              className="inline-flex items-center justify-center rounded-lg border border-[#d6cbb8] bg-[#f3ede2] p-1.5 text-[#1c1917] lg:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {isMobileMenuOpen && (
          <div className="border-t border-[#e6dccb] bg-[#f3ede2] px-4 py-3 lg:hidden">
            <div className="flex flex-col gap-2">
              <a
                href="#timeline-section"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-[#1c1917] hover:bg-[#e8dfd0]"
              >
                {copy.nav.timeline}
              </a>
              <a
                href="#period-folio"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-[#1c1917] hover:bg-[#e8dfd0]"
              >
                {locale === "tr" ? "Dönem Dosyası" : "Period Folio"}
              </a>
              <a
                href="#script-ribbon"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-[#1c1917] hover:bg-[#e8dfd0]"
              >
                {copy.nav.alphabets}
              </a>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsBibDrawerOpen(true);
                }}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium text-[#1c1917] hover:bg-[#e8dfd0]"
              >
                <span>{copy.nav.sources}</span>
                <span className="font-mono text-xs text-[#b45309]">
                  {ACADEMIC_SOURCES.length}
                </span>
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl space-y-10 px-4 pt-8 sm:px-6 lg:px-8">
        {/* Hero / Archival Introduction */}
        <section className="archival-grid relative overflow-hidden rounded-2xl border border-[#e6dccb] bg-[#f5efe4]/75 p-6 sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#b45309]/30 bg-[#faf7f2] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b45309]">
                <ScrollText className="h-3.5 w-3.5" aria-hidden="true" />
                <span>
                  {locale === "tr"
                    ? "KRONOLOJİK DİL & YAZI ATLASI • 10 DÖNEM"
                    : "CHRONOLOGICAL LANGUAGE & SCRIPT ATLAS • 10 ERAS"}
                </span>
              </div>

              <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-[#1c1917] sm:text-4xl lg:text-5xl">
                {locale === "tr"
                  ? "Bozkır Yazıtlarından Çağdaş Türk Dünyasına"
                  : "From Steppe Inscriptions to the Contemporary Turkic World"}
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#44403c] sm:text-base">
                {locale === "tr"
                  ? "Proto-Türkçe kuramsal rekonstrüksiyonundan 732 Kül Tigin anıtına, İpek Yolu yazmalarından 1928 Harf Devrimi'ne uzanan 3.000 yıllık tarihsel sürekliliği etkileşimli zaman şeridinde keşfedin."
                  : "Explore 3,000 years of linguistic continuity—from theoretical Proto-Turkic reconstruction to the 732 CE Kul Tigin stele, Silk Road manuscripts, and the 1928 Alphabet Reform."}
              </p>
            </div>

            {/* Epistemic Legend Card */}
            <div className="rounded-xl border border-[#d6cbb8] bg-[#faf7f2]/95 p-4 shadow-xs lg:col-span-4">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#78716c]">
                {locale === "tr"
                  ? "Epistemik Kanıt Ayrımı"
                  : "Epistemic Evidence Distinction"}
              </div>
              <div className="mt-3 space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border border-dashed border-[#78716c] bg-[#f3ede2] text-[#57534e]">
                    <Compass className="h-3 w-3" />
                  </span>
                  <div>
                    <div className="text-xs font-semibold text-[#1c1917]">
                      {copy.badges.reconstructed}
                    </div>
                    <p className="text-[11px] text-[#78716c]">
                      {locale === "tr"
                        ? "Doğrudan yazılı belge öncesi; karşılaştırmalı yöntemle kurulur."
                        : "Pre-literary; inferred via comparative-historical linguistics."}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border border-[#b45309] bg-[#b45309]/10 text-[#b45309]">
                    <Feather className="h-3 w-3" />
                  </span>
                  <div>
                    <div className="text-xs font-semibold text-[#1c1917]">
                      {copy.badges.attested}
                    </div>
                    <p className="text-[11px] text-[#78716c]">
                      {locale === "tr"
                        ? "Taş yazıtlar, el yazmaları ve matbu belgelerle kanıtlanır."
                        : "Directly attested by stone stelae, manuscripts, and print."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scientific Distinction Banner */}
          <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-[#b45309]/25 bg-[#faf7f2]/90 px-4 py-3 text-xs leading-relaxed text-[#44403c]">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#b45309]" />
            <span>{copy.distinctionNotice}</span>
          </div>
        </section>

        {/* Timeline Section: Search + Filter + Horizontal (Desktop) / Vertical (Mobile) */}
        <section
          id="timeline-section"
          aria-labelledby="timeline-heading"
          className="space-y-4"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2
                id="timeline-heading"
                className="font-serif text-2xl font-semibold text-[#1c1917]"
              >
                {locale === "tr"
                  ? "Kronolojik Zaman Şeridi (10 Dönem)"
                  : "Chronological Timeline (10 Periods)"}
              </h2>
              <p className="text-xs text-[#78716c]">
                {locale === "tr"
                  ? "Dönemler arasında gezinmek için tıklayın veya klavyede ← / → ok tuşlarını kullanın."
                  : "Click any era node or use ← / → arrow keys to navigate across periods."}
              </p>
            </div>

            {/* Search & Epistemic Filter Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#78716c]" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={copy.searchPlaceholder}
                  className="w-56 rounded-lg border border-[#d6cbb8] bg-white/90 py-1.5 pl-8 pr-3 text-xs text-[#1c1917] placeholder:text-[#a8a29e] focus:border-[#b45309] focus:outline-none sm:w-64"
                />
              </div>

              <div className="inline-flex rounded-lg border border-[#d6cbb8] bg-[#f3ede2] p-0.5 text-xs">
                {(
                  [
                    { id: "all", tr: "Tümü", en: "All" },
                    { id: "reconstructed", tr: "Kuramsal", en: "Reconstructed" },
                    { id: "attested", tr: "Belgeli", en: "Attested" },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setStatusFilter(item.id)}
                    className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                      statusFilter === item.id
                        ? "bg-[#1c1917] text-[#faf7f2]"
                        : "text-[#57534e] hover:text-[#1c1917]"
                    }`}
                  >
                    {item[locale]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* DESKTOP HORIZONTAL TIMELINE (md+) */}
          <div className="hidden md:block">
            <div className="relative rounded-2xl border border-[#e6dccb] bg-[#f5efe4]/60 p-4 shadow-xs">
              {/* Left / Right Scroll Buttons */}
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-[11px] text-[#78716c]">
                  <span>
                    {locale === "tr" ? "MÖ ~1000" : "~1000 BCE"}
                  </span>
                  <span className="h-px w-12 bg-[#d6cbb8]" />
                  <span>
                    {locale === "tr"
                      ? `Gösterilen: ${filteredPeriods.length} / ${sortedPeriods.length}`
                      : `Showing: ${filteredPeriods.length} / ${sortedPeriods.length}`}
                  </span>
                  <span className="h-px w-12 bg-[#d6cbb8]" />
                  <span>{locale === "tr" ? "Günümüz" : "Present"}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => scrollTimelineBy(-340)}
                    aria-label={
                      locale === "tr" ? "Sola kaydır" : "Scroll left"
                    }
                    className="rounded-lg border border-[#d6cbb8] bg-[#faf7f2] p-1.5 text-[#44403c] transition-colors hover:border-[#b45309] hover:text-[#b45309]"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollTimelineBy(340)}
                    aria-label={
                      locale === "tr" ? "Sağa kaydır" : "Scroll right"
                    }
                    className="rounded-lg border border-[#d6cbb8] bg-[#faf7f2] p-1.5 text-[#44403c] transition-colors hover:border-[#b45309] hover:text-[#b45309]"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Horizontal Scrollable Track */}
              <div
                ref={horizontalTrackRef}
                className="chronos-scroll relative flex gap-4 overflow-x-auto pb-4 pt-2"
              >
                {filteredPeriods.length === 0 ? (
                  <div className="w-full py-8 text-center text-sm text-[#78716c]">
                    {locale === "tr"
                      ? "Arama ölçütlerine uyan dönem bulunamadı."
                      : "No periods match your search criteria."}
                  </div>
                ) : (
                  filteredPeriods.map((period) => {
                    const isActive = period.id === activePeriod.id;
                    const isReconstructed = period.status === "reconstructed";

                    return (
                      <button
                        key={period.id}
                        ref={(el) => {
                          periodNodeRefs.current[period.id] = el;
                        }}
                        type="button"
                        onClick={() => handleSelectPeriod(period.id)}
                        className={`group relative flex w-[268px] shrink-0 flex-col justify-between rounded-xl p-4 text-left transition-all ${
                          isReconstructed ? "border-dashed" : "border-solid"
                        } border ${
                          isActive
                            ? isReconstructed
                              ? "border-[#57534e] bg-[#faf7f2] shadow-md ring-2 ring-[#78716c]/30"
                              : "border-[#b45309] bg-[#faf7f2] shadow-md ring-2 ring-[#b45309]/25"
                            : "border-[#d6cbb8] bg-[#faf7f2]/85 hover:border-[#b45309]/60 hover:bg-[#faf7f2]"
                        }`}
                      >
                        {/* Top metadata row */}
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`font-mono text-xs font-bold ${
                                isActive
                                  ? isReconstructed
                                    ? "text-[#57534e]"
                                    : "text-[#b45309]"
                                  : "text-[#78716c]"
                              }`}
                            >
                              {period.order.toString().padStart(2, "0")}
                            </span>
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                isReconstructed
                                  ? "border border-dashed border-[#78716c] bg-[#f3ede2] text-[#57534e]"
                                  : "bg-[#b45309]/10 text-[#92400e]"
                              }`}
                            >
                              {isReconstructed ? (
                                <Compass className="h-2.5 w-2.5" />
                              ) : (
                                <Feather className="h-2.5 w-2.5" />
                              )}
                              {isReconstructed
                                ? locale === "tr"
                                  ? "Kuramsal"
                                  : "Reconstructed"
                                : locale === "tr"
                                ? "Belgeli"
                                : "Attested"}
                            </span>
                          </div>

                          <div className="mt-2 font-mono text-[11px] font-medium text-[#78716c]">
                            {formatYearRange(
                              period.startYear,
                              period.endYear,
                              locale
                            )}
                          </div>

                          <h3 className="mt-1 font-serif text-base font-semibold leading-snug text-[#1c1917] group-hover:text-[#b45309]">
                            {period.title[locale]}
                          </h3>
                        </div>

                        {/* Bottom scripts pill strip */}
                        <div className="mt-3 flex flex-wrap gap-1 border-t border-[#e6dccb]/80 pt-2.5">
                          {period.scripts.length === 0 ? (
                            <span className="font-mono text-[10px] text-[#78716c]">
                              {locale === "tr"
                                ? "Yazı öncesi sözlü ata"
                                : "Pre-literary oral"}
                            </span>
                          ) : (
                            period.scripts.slice(0, 3).map((sid) => (
                              <span
                                key={sid}
                                className="rounded bg-[#f3ede2] px-1.5 py-0.5 font-mono text-[10px] text-[#44403c]"
                              >
                                {getScriptMeta(sid).label[locale]}
                              </span>
                            ))
                          )}
                          {period.scripts.length > 3 && (
                            <span className="rounded bg-[#f3ede2] px-1.5 py-0.5 font-mono text-[10px] text-[#78716c]">
                              +{period.scripts.length - 3}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* MOBILE VERTICAL TIMELINE (<md) */}
          <div className="md:hidden">
            <div className="relative space-y-3 pl-6 before:absolute before:bottom-3 before:left-2.5 before:top-3 before:w-0.5 before:bg-[#d6cbb8]">
              {filteredPeriods.map((period) => {
                const isActive = period.id === activePeriod.id;
                const isReconstructed = period.status === "reconstructed";

                return (
                  <div key={period.id} className="relative">
                    {/* Spine Node */}
                    <span
                      className={`absolute -left-[22px] top-4 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                        isReconstructed
                          ? "border-dashed border-[#78716c] bg-[#f3ede2]"
                          : isActive
                          ? "border-[#b45309] bg-[#b45309]"
                          : "border-[#b45309]/60 bg-[#faf7f2]"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() => handleSelectPeriod(period.id)}
                      className={`w-full rounded-xl p-3.5 text-left transition-all ${
                        isReconstructed ? "border-dashed" : "border-solid"
                      } border ${
                        isActive
                          ? "border-[#b45309] bg-white shadow-sm ring-1 ring-[#b45309]/25"
                          : "border-[#e6dccb] bg-[#faf7f2]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] font-semibold text-[#b45309]">
                          {period.order.toString().padStart(2, "0")} •{" "}
                          {formatYearRange(
                            period.startYear,
                            period.endYear,
                            locale
                          )}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            isReconstructed
                              ? "border border-dashed border-[#78716c] bg-[#f3ede2] text-[#57534e]"
                              : "bg-[#b45309]/10 text-[#92400e]"
                          }`}
                        >
                          {isReconstructed
                            ? locale === "tr"
                              ? "Kuramsal"
                              : "Reconstructed"
                            : locale === "tr"
                            ? "Belgeli"
                            : "Attested"}
                        </span>
                      </div>
                      <h3 className="mt-1 font-serif text-base font-semibold text-[#1c1917]">
                        {period.title[locale]}
                      </h3>
                      <p className="mt-0.5 text-xs text-[#57534e]">
                        {period.region[locale]}
                      </p>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Period Detail View (Archival Folio) */}
        <section
          id="period-folio"
          aria-labelledby="period-folio-title"
          className={`rounded-2xl bg-white/85 p-6 shadow-sm sm:p-8 ${
            activePeriod.status === "reconstructed"
              ? "border-2 border-dashed border-[#a8a29e]"
              : "border border-[#d6cbb8]"
          }`}
        >
          {/* Folio Header */}
          <div className="flex flex-col gap-4 border-b border-[#e6dccb] pb-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-[#1c1917] px-2 py-0.5 font-mono text-xs font-semibold text-[#faf7f2]">
                  {locale === "tr" ? "DÖNEM" : "ERA"}{" "}
                  {activePeriod.order.toString().padStart(2, "0")} / 10
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-semibold ${
                    activePeriod.status === "reconstructed"
                      ? "border border-dashed border-[#78716c] bg-[#f3ede2] text-[#57534e]"
                      : "border border-[#b45309]/30 bg-[#b45309]/10 text-[#92400e]"
                  }`}
                >
                  {activePeriod.status === "reconstructed" ? (
                    <Compass className="h-3.5 w-3.5" />
                  ) : (
                    <Feather className="h-3.5 w-3.5" />
                  )}
                  {activePeriod.status === "reconstructed"
                    ? copy.badges.reconstructed
                    : copy.badges.attested}
                </span>

                <span className="font-mono text-xs text-[#78716c]">
                  {activePeriod.dateLabel[locale]}
                </span>
              </div>

              <h2
                id="period-folio-title"
                className="font-serif text-3xl font-semibold tracking-tight text-[#1c1917] sm:text-4xl"
              >
                {activePeriod.title[locale]}
              </h2>
              <p className="font-serif text-lg italic text-[#57534e]">
                {activePeriod.subtitle[locale]}
              </p>
            </div>

            {/* Region & Coordinates Box */}
            <div className="shrink-0 rounded-xl border border-[#e6dccb] bg-[#f5efe4] px-4 py-3 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-[#1c1917]">
                <MapPin className="h-3.5 w-3.5 text-[#b45309]" />
                <span>{activePeriod.region[locale]}</span>
              </div>
              <div className="mt-1 flex items-center gap-1.5 font-mono text-[11px] text-[#78716c]">
                <Globe className="h-3 w-3" />
                <span>
                  {activePeriod.coordinates.lat.toFixed(2)}° N,{" "}
                  {activePeriod.coordinates.lng.toFixed(2)}° E
                </span>
              </div>
            </div>
          </div>

          {/* Folio Main Body */}
          <div className="mt-6 grid gap-8 lg:grid-cols-12">
            {/* Left Column: Summary, Highlights, Academic Note */}
            <div className="space-y-6 lg:col-span-7">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#78716c]">
                  {locale === "tr" ? "Tarihsel Bağlam" : "Historical Context"}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-[#292524]">
                  {activePeriod.summary[locale]}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#78716c]">
                  {locale === "tr"
                    ? "Dilbilimsel & Yazınsal Öne Çıkanlar"
                    : "Linguistic & Documentary Highlights"}
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {activePeriod.linguisticHighlights[locale].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-[#44403c]"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b45309]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-[#b45309]/25 bg-[#b45309]/5 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#92400e]">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>
                    {locale === "tr" ? "Akademik Not" : "Academic Note"}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-[#44403c]">
                  {activePeriod.academicNote[locale]}
                </p>
              </div>

              {/* Active Scripts in This Period */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#78716c]">
                  {locale === "tr"
                    ? "Bu Dönemde Kullanılan Yazı Sistemleri"
                    : "Scripts Used in This Period"}
                </h3>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {activePeriod.scripts.length === 0 ? (
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-[#78716c] bg-[#f3ede2] px-3 py-1.5 text-xs text-[#57534e]">
                      <Compass className="h-3.5 w-3.5" />
                      {locale === "tr"
                        ? "Doğrudan yazılı alfabe yok (rekonstrüksiyon dönemi)"
                        : "No directly attested script (reconstructed era)"}
                    </span>
                  ) : (
                    activePeriod.scripts.map((sid) => {
                      const meta = getScriptMeta(sid);
                      return (
                        <button
                          key={sid}
                          type="button"
                          onClick={() => {
                            setSelectedScriptId(sid);
                            document
                              .getElementById("script-ribbon")
                              ?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="inline-flex items-center gap-2 rounded-lg border border-[#d6cbb8] bg-[#f5efe4] px-3 py-1.5 text-xs font-medium text-[#1c1917] transition-colors hover:border-[#b45309] hover:text-[#b45309]"
                        >
                          <span className="font-mono text-sm text-[#b45309]">
                            {meta.glyphSample}
                          </span>
                          <span>{meta.label[locale]}</span>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Key Works, Artifacts & Period Sources */}
            <div className="space-y-6 lg:col-span-5">
              {/* Key Works */}
              <div className="rounded-xl border border-[#e6dccb] bg-[#faf7f2] p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#78716c]">
                  <Layers className="h-3.5 w-3.5 text-[#b45309]" />
                  <span>
                    {locale === "tr"
                      ? "Başlıca Eserler & Tanıklıklar"
                      : "Key Works & Monuments"}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {activePeriod.keyWorks.map((work) => (
                    <span
                      key={work}
                      className="rounded-md border border-[#e6dccb] bg-white px-2.5 py-1 text-xs font-medium text-[#1c1917]"
                    >
                      {work}
                    </span>
                  ))}
                </div>
              </div>

              {/* Matching Artifacts from artifacts.ts */}
              {periodArtifacts.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#78716c]">
                    <Landmark className="h-3.5 w-3.5 text-[#b45309]" />
                    <span>
                      {locale === "tr"
                        ? "Döneme Ait Örnek Eserler"
                        : "Featured Archival Artifacts"}
                    </span>
                  </div>

                  {periodArtifacts.map((artifact) => (
                    <article
                      key={artifact.id}
                      className="rounded-xl border border-[#d6cbb8] bg-[#faf7f2] p-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h4 className="font-serif text-lg font-semibold text-[#1c1917]">
                            {artifact.title[locale]}
                          </h4>
                          <p className="font-mono text-[11px] text-[#78716c]">
                            {artifact.date} • {artifact.location[locale]}
                          </p>
                        </div>
                        {artifact.unescoStatus && (
                          <span className="rounded-full bg-[#b45309]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#92400e]">
                            {artifact.unescoStatus[locale]}
                          </span>
                        )}
                      </div>

                      {/* Excerpt box */}
                      <div className="mt-3 rounded-lg border border-[#e6dccb] bg-white p-3">
                        <div className="font-serif text-base font-medium text-[#1c1917]">
                          {artifact.excerptOriginal}
                        </div>
                        <div className="mt-1 font-mono text-xs text-[#b45309]">
                          {artifact.excerptTransliteration}
                        </div>
                        <div className="mt-1 text-xs italic text-[#57534e]">
                          “{artifact.excerptTranslation[locale]}”
                        </div>
                      </div>

                      <p className="mt-2.5 text-xs leading-relaxed text-[#44403c]">
                        {artifact.description[locale]}
                      </p>

                      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 border-t border-[#e6dccb] pt-2 text-[11px] text-[#78716c]">
                        <span>{artifact.material[locale]}</span>
                        <span>{artifact.repository[locale]}</span>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Verified Sources for This Period */}
              <div className="rounded-xl border border-[#e6dccb] bg-[#faf7f2] p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#78716c]">
                    <BookMarked className="h-3.5 w-3.5 text-[#b45309]" />
                    <span>
                      {locale === "tr"
                        ? "Dönem Kaynakları"
                        : "Verified Period Sources"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsBibDrawerOpen(true)}
                    className="text-xs font-semibold text-[#b45309] hover:underline"
                  >
                    {locale === "tr" ? "Tüm Kaynakça →" : "All Sources →"}
                  </button>
                </div>

                <ul className="mt-3 space-y-2">
                  {periodSources.map((src) => (
                    <li
                      key={src.id}
                      className="rounded-lg border border-[#e6dccb] bg-white/90 p-2.5 text-xs"
                    >
                      <div className="font-medium text-[#1c1917]">
                        {src.citation}
                      </div>
                      <div className="mt-1 flex items-center justify-between text-[11px] text-[#78716c]">
                        <span>{src.authorOrInstitution}</span>
                        {src.url && (
                          <a
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-[#b45309] hover:underline"
                          >
                            {locale === "tr" ? "İncele" : "View"} ↗
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Previous / Next Period Controls */}
          <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#e6dccb] pt-5">
            {prevPeriod ? (
              <button
                type="button"
                onClick={() => handleSelectPeriod(prevPeriod.id)}
                className="inline-flex items-center gap-2 rounded-xl border border-[#d6cbb8] bg-[#faf7f2] px-4 py-2 text-left text-xs transition-colors hover:border-[#b45309]"
              >
                <ChevronLeft className="h-4 w-4 text-[#b45309]" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#78716c]">
                    {locale === "tr" ? "Önceki Dönem" : "Previous Era"}
                  </div>
                  <div className="font-serif text-sm font-semibold text-[#1c1917]">
                    {prevPeriod.title[locale]}
                  </div>
                </div>
              </button>
            ) : (
              <div />
            )}

            {nextPeriod ? (
              <button
                type="button"
                onClick={() => handleSelectPeriod(nextPeriod.id)}
                className="inline-flex items-center gap-2 rounded-xl border border-[#d6cbb8] bg-[#faf7f2] px-4 py-2 text-right text-xs transition-colors hover:border-[#b45309]"
              >
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#78716c]">
                    {locale === "tr" ? "Sonraki Dönem" : "Next Era"}
                  </div>
                  <div className="font-serif text-sm font-semibold text-[#1c1917]">
                    {nextPeriod.title[locale]}
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-[#b45309]" />
              </button>
            ) : (
              <div />
            )}
          </div>
        </section>

        {/* Script Transition Ribbon */}
        <ScriptInspector
          locale={locale}
          periods={sortedPeriods}
          activePeriod={activePeriod}
          selectedScriptId={selectedScriptId}
          onSelectScript={setSelectedScriptId}
          onSelectPeriod={handleSelectPeriod}
        />

        {/* Dedicated Verified Sources Section */}
        <section
          id="sources-section"
          aria-labelledby="sources-heading"
          className="space-y-4"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b45309]">
                {locale === "tr"
                  ? "BİLİMSEL DAYANAKLAR"
                  : "SCHOLARLY FOUNDATION"}
              </div>
              <h2
                id="sources-heading"
                className="mt-1 font-serif text-2xl font-semibold text-[#1c1917]"
              >
                {copy.sourcesHeading} ({ACADEMIC_SOURCES.length})
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsBibDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 self-start rounded-lg border border-[#d6cbb8] bg-[#f3ede2] px-3 py-1.5 text-xs font-semibold text-[#1c1917] transition-colors hover:border-[#b45309] hover:text-[#b45309]"
            >
              <BookMarked className="h-3.5 w-3.5 text-[#b45309]" />
              <span>
                {locale === "tr"
                  ? "Kaynakça Çekmecesini Aç"
                  : "Open Bibliography Drawer"}
              </span>
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {ACADEMIC_SOURCES.map((src) => (
              <SourceCard
                key={src.id}
                source={src}
                locale={locale}
                isHighlighted={activePeriod.sourceIds.includes(src.id)}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav
        aria-label={locale === "tr" ? "Mobil alt gezinme" : "Mobile bottom navigation"}
        className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-[#d6cbb8] bg-[#faf7f2]/95 px-2 py-2 backdrop-blur-md md:hidden"
      >
        <a
          href="#timeline-section"
          className="flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] font-semibold text-[#44403c]"
        >
          <ScrollText className="h-4 w-4 text-[#b45309]" />
          <span>{copy.nav.timeline}</span>
        </a>
        <a
          href="#period-folio"
          className="flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] font-semibold text-[#44403c]"
        >
          <Feather className="h-4 w-4 text-[#b45309]" />
          <span>{locale === "tr" ? "Dönem" : "Era"}</span>
        </a>
        <a
          href="#script-ribbon"
          className="flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] font-semibold text-[#44403c]"
        >
          <Layers className="h-4 w-4 text-[#b45309]" />
          <span>{locale === "tr" ? "Yazılar" : "Scripts"}</span>
        </a>
        <button
          type="button"
          onClick={() => setIsBibDrawerOpen(true)}
          className="flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] font-semibold text-[#44403c]"
        >
          <BookMarked className="h-4 w-4 text-[#b45309]" />
          <span>{copy.nav.sources}</span>
        </button>
      </nav>

      {/* Bibliography Slide-Over Drawer */}
      <BibliographyDrawer
        isOpen={isBibDrawerOpen}
        onClose={() => setIsBibDrawerOpen(false)}
        locale={locale}
        sources={ACADEMIC_SOURCES}
        activePeriodSourceIds={activePeriod.sourceIds}
        activePeriodTitle={activePeriod.title[locale]}
      />
    </div>
  );
}
