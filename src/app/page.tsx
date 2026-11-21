"use client";

import React, { useMemo, useState } from "react";
import {
  BookOpen,
  Compass,
  ExternalLink,
  Filter,
  Globe2,
  History,
  Info,
  Languages,
  Map as MapIcon,
  Menu,
  Search,
  X,
} from "lucide-react";
import EurasiaMap from "@/components/EurasiaMap";
import AtlasDetailPanel from "@/components/AtlasDetailPanel";
import { ATLAS_HUBS, AtlasHub, MapLayerMode } from "@/data/atlasHubs";
import { HISTORICAL_PERIODS } from "@/data/periods";
import { TURKIC_BRANCHES, TurkicBranch } from "@/data/languageFamily";
import { ACADEMIC_SOURCES, AcademicSource } from "@/data/bibliography";
import { Locale, UI_COPY } from "@/data/i18n";

const PERIOD_TO_HUB_MAP: Record<string, string> = {
  "proto-turkic": "orhon",
  gokturk: "orhon",
  "old-uyghur": "turfan",
  karakhanid: "kasgar",
  khwarazmian: "harezm",
  kipchak: "kirim",
  chagatai: "harezm",
  "old-anatolian": "istanbul",
  ottoman: "istanbul",
  "modern-turkish": "istanbul",
};

export default function TurkicAtlasPage() {
  const [locale, setLocale] = useState<Locale>("tr");
  const [layerMode, setLayerMode] = useState<MapLayerMode>("historical");
  const [selectedHubId, setSelectedHubId] = useState<string | null>("orhon");
  const [selectedBranchId, setSelectedBranchId] = useState<string>("all");
  const [drawerSelection, setDrawerSelection] = useState<"hub" | "branch">(
    "hub"
  );
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Bibliography filter state
  const [sourceTypeFilter, setSourceTypeFilter] = useState<
    "all" | AcademicSource["type"]
  >("all");
  const [sourceSearch, setSourceSearch] = useState<string>("");

  const copy = UI_COPY[locale];

  const selectedHub = useMemo(
    () =>
      drawerSelection === "hub"
        ? ATLAS_HUBS.find((h) => h.id === selectedHubId) ?? null
        : null,
    [drawerSelection, selectedHubId]
  );

  const selectedBranch = useMemo(
    () =>
      drawerSelection === "branch" && selectedBranchId !== "all"
        ? TURKIC_BRANCHES.find((b) => b.id === selectedBranchId) ?? null
        : null,
    [drawerSelection, selectedBranchId]
  );

  const handleSelectHub = (hub: AtlasHub) => {
    setSelectedHubId(hub.id);
    setDrawerSelection("hub");
    setMobileDrawerOpen(true);
  };

  const handleSelectBranchFilter = (branchId: string) => {
    setSelectedBranchId(branchId);
    if (branchId === "all") {
      setDrawerSelection("hub");
      if (!selectedHubId) setSelectedHubId("orhon");
    } else {
      setDrawerSelection("branch");
      // Also highlight a matching hub on the map
      const matchingHub = ATLAS_HUBS.find((h) =>
        h.branchIds.includes(branchId)
      );
      if (matchingHub) setSelectedHubId(matchingHub.id);
    }
  };

  const handleInspectBranchCard = (branch: TurkicBranch) => {
    setSelectedBranchId(branch.id);
    setLayerMode("modern");
    setDrawerSelection("branch");
    const matchingHub = ATLAS_HUBS.find((h) => h.branchIds.includes(branch.id));
    if (matchingHub) setSelectedHubId(matchingHub.id);
    setMobileDrawerOpen(true);
    document
      .getElementById("map-explorer")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectPeriod = (periodId: string) => {
    const hubId = PERIOD_TO_HUB_MAP[periodId] ?? "orhon";
    setLayerMode("historical");
    setSelectedBranchId("all");
    setSelectedHubId(hubId);
    setDrawerSelection("hub");
    setMobileDrawerOpen(true);
    document
      .getElementById("map-explorer")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredSources = useMemo(() => {
    const q = sourceSearch.trim().toLowerCase();
    return ACADEMIC_SOURCES.filter((src) => {
      if (sourceTypeFilter !== "all" && src.type !== sourceTypeFilter) {
        return false;
      }
      if (!q) return true;
      return (
        src.citation.toLowerCase().includes(q) ||
        src.authorOrInstitution.toLowerCase().includes(q) ||
        src.supports[locale].toLowerCase().includes(q)
      );
    });
  }, [sourceTypeFilter, sourceSearch, locale]);

  return (
    <div className="min-h-screen bg-[#0b1320] text-slate-100 cartographic-grid pb-20 md:pb-0">
      {/* Top Sticky Navigation */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#0b1320]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Brand Lockup */}
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#14b8a6]/40 bg-[#131e30] text-[#14b8a6] shadow-inner">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-base font-bold tracking-wide text-white sm:text-lg">
                  {copy.brandTitle}
                </span>
                <span className="hidden rounded-md border border-[#f59e0b]/40 bg-[#f59e0b]/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#f59e0b] sm:inline-block">
                  {copy.nav.atlas}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {copy.brandSubtitle}
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-6 text-xs font-medium text-slate-300 md:flex">
            <a
              href="#map-explorer"
              className="transition hover:text-[#14b8a6]"
            >
              {copy.nav.atlas}
            </a>
            <a href="#branches" className="transition hover:text-[#14b8a6]">
              {copy.nav.tree}
            </a>
            <a href="#timeline" className="transition hover:text-[#14b8a6]">
              {copy.nav.timeline}
            </a>
            <a
              href="#bibliography"
              className="transition hover:text-[#14b8a6]"
            >
              {copy.nav.sources}
            </a>
          </nav>

          {/* Right Controls: TR/EN Toggle + Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <div
              className="inline-flex items-center rounded-lg border border-slate-700/80 bg-[#131e30] p-0.5"
              role="group"
              aria-label="Language switch"
            >
              <button
                type="button"
                onClick={() => setLocale("tr")}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                  locale === "tr"
                    ? "bg-[#14b8a6] text-[#0b1320]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                TR
              </button>
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                  locale === "en"
                    ? "bg-[#14b8a6] text-[#0b1320]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={locale === "tr" ? "Menüyü aç" : "Toggle menu"}
              className="rounded-lg border border-slate-700/80 bg-[#131e30] p-2 text-slate-300 hover:text-white md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <nav className="border-t border-slate-800 bg-[#131e30] px-4 py-3 md:hidden">
            <div className="flex flex-col gap-2 text-sm font-medium text-slate-200">
              <a
                href="#map-explorer"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 hover:bg-[#0b1320] hover:text-[#14b8a6]"
              >
                {copy.nav.atlas}
              </a>
              <a
                href="#branches"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 hover:bg-[#0b1320] hover:text-[#14b8a6]"
              >
                {copy.nav.tree}
              </a>
              <a
                href="#timeline"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 hover:bg-[#0b1320] hover:text-[#14b8a6]"
              >
                {copy.nav.timeline}
              </a>
              <a
                href="#bibliography"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 hover:bg-[#0b1320] hover:text-[#14b8a6]"
              >
                {copy.nav.sources}
              </a>
            </div>
          </nav>
        )}
      </header>

      <main className="mx-auto max-w-7xl space-y-10 px-4 py-6 sm:px-6 sm:py-8">
        {/* Hero / Atlas Header */}
        <section className="rounded-2xl border border-slate-800/90 bg-gradient-to-br from-[#131e30] via-[#101a2b] to-[#0b1320] p-6 shadow-xl sm:p-8">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#14b8a6]/30 bg-[#14b8a6]/10 px-3 py-1 text-xs font-medium text-[#14b8a6]">
                <Globe2 className="h-3.5 w-3.5" />
                {locale === "tr"
                  ? "Avrasya Kartografik Dil Atlası · Konsept 02"
                  : "Eurasia Cartographic Linguistic Atlas · Concept 02"}
              </div>
              <h1 className="mt-3 font-serif text-2xl font-bold tracking-tight text-white sm:text-4xl">
                {locale === "tr"
                  ? "Orhon'dan İstanbul'a, Yakutistan'dan Orta İran'a Türkçenin Coğrafi İzleri"
                  : "Geographic Traces of Turkic: From Orkhon to Istanbul, Yakutia to Central Iran"}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">
                {locale === "tr"
                  ? "Tarihsel yayılım hatlarını ve çağdaş Türk dil kollarının Avrasya coğrafyasındaki dağılımını etkileşimli harita üzerinde inceleyin. Her bölge merkezi, ilişkili dönemleri, sesbilimsel ölçütleri ve akademik kaynaklarıyla belgelenmiştir."
                  : "Explore historical diffusion vectors and the contemporary distribution of Turkic language branches across Eurasia. Every regional hub links to attested periods, phonological diagnostics, and verified scholarship."}
              </p>

              {/* Scientific Distinction Notice */}
              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-3.5 py-2.5 text-xs text-amber-100">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#f59e0b]" />
                <span>{copy.distinctionNotice}</span>
              </div>
            </div>

            {/* Quick Atlas Metrics */}
            <div className="grid grid-cols-2 gap-3 lg:col-span-4">
              <div className="rounded-xl border border-slate-800 bg-[#0b1320]/80 p-3.5">
                <div className="font-mono text-2xl font-bold text-[#f59e0b]">
                  {HISTORICAL_PERIODS.length}
                </div>
                <div className="mt-0.5 text-xs text-slate-400">
                  {locale === "tr" ? "Tarihsel Dönem" : "Historical Periods"}
                </div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-[#0b1320]/80 p-3.5">
                <div className="font-mono text-2xl font-bold text-[#14b8a6]">
                  {TURKIC_BRANCHES.length}
                </div>
                <div className="mt-0.5 text-xs text-slate-400">
                  {locale === "tr" ? "Ana Dil Kolu" : "Major Branches"}
                </div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-[#0b1320]/80 p-3.5">
                <div className="font-mono text-2xl font-bold text-white">
                  {ATLAS_HUBS.length}
                </div>
                <div className="mt-0.5 text-xs text-slate-400">
                  {locale === "tr" ? "Bölgesel Merkez" : "Regional Hubs"}
                </div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-[#0b1320]/80 p-3.5">
                <div className="font-mono text-2xl font-bold text-[#14b8a6]">
                  {ACADEMIC_SOURCES.length}
                </div>
                <div className="mt-0.5 text-xs text-slate-400">
                  {locale === "tr" ? "Akademik Kaynak" : "Verified Sources"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Map Explorer + Regional Branch Filter + Detail Drawer */}
        <section id="map-explorer" className="scroll-mt-20 space-y-4">
          {/* Regional Branch Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800/90 bg-[#131e30] px-4 py-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Filter className="h-4 w-4 text-[#14b8a6]" />
              <span>
                {locale === "tr"
                  ? "Dil Kolu Filtresi:"
                  : "Regional Branch Filter:"}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => handleSelectBranchFilter("all")}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  selectedBranchId === "all"
                    ? "bg-[#14b8a6] text-[#0b1320] font-semibold"
                    : "bg-[#0b1320] text-slate-300 border border-slate-700/80 hover:border-[#14b8a6]/50"
                }`}
              >
                {locale === "tr" ? "Tümü" : "All Branches"}
              </button>
              {TURKIC_BRANCHES.map((branch) => {
                const active = selectedBranchId === branch.id;
                return (
                  <button
                    key={branch.id}
                    type="button"
                    onClick={() => handleSelectBranchFilter(branch.id)}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                      active
                        ? "bg-[#14b8a6]/20 text-[#14b8a6] ring-1 ring-[#14b8a6]"
                        : "bg-[#0b1320] text-slate-300 border border-slate-700/80 hover:border-slate-500"
                    }`}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: branch.colorToken }}
                    />
                    {branch.name[locale]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 12-Col Map + Detail Panel */}
          <div className="grid gap-5 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <EurasiaMap
                locale={locale}
                layerMode={layerMode}
                onLayerChange={setLayerMode}
                selectedHubId={selectedHubId}
                selectedBranchId={selectedBranchId}
                onSelectHub={handleSelectHub}
              />
            </div>

            {/* Desktop Side Detail Panel */}
            <div className="hidden lg:col-span-4 lg:block lg:max-h-[680px]">
              <AtlasDetailPanel
                locale={locale}
                selectedHub={selectedHub}
                selectedBranch={selectedBranch}
              />
            </div>
          </div>

          {/* Mobile / Tablet Inline Detail Panel & Optional Modal Drawer */}
          <div className="lg:hidden">
            <AtlasDetailPanel
              locale={locale}
              selectedHub={selectedHub}
              selectedBranch={selectedBranch}
            />
          </div>
        </section>

        {/* Mobile Slide-Over Drawer when user taps a hub on small screens */}
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 flex items-end bg-black/70 backdrop-blur-sm lg:hidden">
            <div className="max-h-[85vh] w-full overflow-y-auto rounded-t-2xl border-t border-slate-700 bg-[#131e30]">
              <AtlasDetailPanel
                locale={locale}
                selectedHub={selectedHub}
                selectedBranch={selectedBranch}
                onCloseMobile={() => setMobileDrawerOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Regional Branches Grid */}
        <section id="branches" className="scroll-mt-20 space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-white sm:text-2xl">
                <Languages className="h-5 w-5 text-[#14b8a6]" />
                {locale === "tr"
                  ? "Türk Dil Ailesinin Ana Kolları"
                  : "Major Branches of the Turkic Language Family"}
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                {locale === "tr"
                  ? "Haritada vurgulamak ve dillerini incelemek için herhangi bir kola tıklayın."
                  : "Click any branch to highlight its geographic zone on the map and inspect its languages."}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TURKIC_BRANCHES.map((branch) => {
              const isSelected = selectedBranchId === branch.id;
              return (
                <div
                  key={branch.id}
                  className={`flex flex-col justify-between rounded-2xl border p-5 transition ${
                    isSelected
                      ? "border-[#14b8a6] bg-[#16243a] shadow-lg shadow-[#14b8a6]/10"
                      : "border-slate-800/90 bg-[#131e30] hover:border-slate-700"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white"
                        style={{ backgroundColor: `${branch.colorToken}cc` }}
                      >
                        {branch.macroGroup === "oghur"
                          ? "Oğur (r-Türkçesi)"
                          : locale === "tr"
                          ? "Genel Türkçe"
                          : "Common Turkic"}
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">
                        {branch.languages.length}{" "}
                        {locale === "tr" ? "dil" : "langs"}
                      </span>
                    </div>

                    <h3 className="mt-3 font-serif text-lg font-bold text-white">
                      {branch.name[locale]}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                      {branch.description[locale]}
                    </p>

                    <div className="mt-3 rounded-xl border border-slate-800 bg-[#0b1320]/70 p-2.5 text-[11px] text-amber-200/90">
                      <span className="font-semibold text-[#f59e0b]">
                        {locale === "tr" ? "Tanı Ölçütü: " : "Diagnostic: "}
                      </span>
                      {branch.diagnosticFeature[locale]}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {branch.languages.map((lang) => (
                        <span
                          key={lang.id}
                          className="rounded-md border border-slate-700/80 bg-[#0b1320] px-2 py-0.5 text-[11px] text-slate-300"
                        >
                          {lang.name[locale]}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleInspectBranchCard(branch)}
                    className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#14b8a6]/40 bg-[#14b8a6]/10 px-3 py-2 text-xs font-semibold text-[#14b8a6] transition hover:bg-[#14b8a6] hover:text-[#0b1320]"
                  >
                    <MapIcon className="h-3.5 w-3.5" />
                    {locale === "tr"
                      ? "Haritada Göster & İncele"
                      : "Show on Map & Inspect"}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Historical Periods Quick-Jump Strip */}
        <section id="timeline" className="scroll-mt-20 space-y-4">
          <div>
            <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-white sm:text-2xl">
              <History className="h-5 w-5 text-[#f59e0b]" />
              {locale === "tr"
                ? "Tarihsel Dönemlere Göre Harita Gezgini"
                : "Map Explorer by Historical Period"}
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              {locale === "tr"
                ? "Bir döneme tıklayarak ilgili coğrafi merkezi haritada açın."
                : "Select a historical period to jump to its corresponding geographic hub on the map."}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {HISTORICAL_PERIODS.map((period) => (
              <button
                key={period.id}
                type="button"
                onClick={() => handleSelectPeriod(period.id)}
                className="group flex flex-col justify-between rounded-xl border border-slate-800/90 bg-[#131e30] p-3.5 text-left transition hover:border-[#f59e0b]/60 hover:bg-[#18263d]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] font-semibold text-[#f59e0b]">
                      {String(period.order).padStart(2, "0")}
                    </span>
                    <span
                      className={`h-2 w-2 rounded-full ${
                        period.status === "attested"
                          ? "bg-[#14b8a6]"
                          : "bg-[#f59e0b]"
                      }`}
                      title={
                        period.status === "attested"
                          ? copy.badges.attested
                          : copy.badges.reconstructed
                      }
                    />
                  </div>
                  <h3 className="mt-1.5 text-sm font-semibold text-white group-hover:text-[#f59e0b]">
                    {period.title[locale]}
                  </h3>
                  <p className="mt-0.5 font-mono text-[11px] text-slate-400">
                    {period.dateLabel[locale]}
                  </p>
                </div>
                <p className="mt-2 text-[11px] text-slate-400">
                  {period.region[locale]}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Verified Academic Bibliography */}
        <section id="bibliography" className="scroll-mt-20 space-y-4">
          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800/90 bg-[#131e30] p-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-white sm:text-2xl">
                <BookOpen className="h-5 w-5 text-[#14b8a6]" />
                {copy.sourcesHeading}
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                {locale === "tr"
                  ? "Atlas verileri hakemli yayınlar, UNESCO kayıtları ve kurumsal arşivlere dayanmaktadır."
                  : "All atlas entries are grounded in peer-reviewed scholarship, UNESCO registers, and institutional archives."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  value={sourceSearch}
                  onChange={(e) => setSourceSearch(e.target.value)}
                  placeholder={
                    locale === "tr" ? "Kaynak ara..." : "Search sources..."
                  }
                  className="rounded-lg border border-slate-700 bg-[#0b1320] py-1.5 pl-8 pr-3 text-xs text-slate-200 placeholder:text-slate-500 focus:border-[#14b8a6] focus:outline-none"
                />
              </div>
              <select
                value={sourceTypeFilter}
                onChange={(e) =>
                  setSourceTypeFilter(
                    e.target.value as "all" | AcademicSource["type"]
                  )
                }
                aria-label={locale === "tr" ? "Kaynak türü" : "Source type"}
                className="rounded-lg border border-slate-700 bg-[#0b1320] px-2.5 py-1.5 text-xs text-slate-200 focus:border-[#14b8a6] focus:outline-none"
              >
                <option value="all">
                  {locale === "tr" ? "Tüm Türler" : "All Types"}
                </option>
                <option value="book">Book</option>
                <option value="encyclopedia">Encyclopedia</option>
                <option value="unesco">UNESCO</option>
                <option value="journal">Journal</option>
                <option value="archive">Archive</option>
              </select>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {filteredSources.map((src) => (
              <div
                key={src.id}
                className="flex flex-col justify-between rounded-xl border border-slate-800/90 bg-[#131e30] p-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded bg-[#0b1320] px-2 py-0.5 font-mono text-[10px] uppercase text-[#14b8a6]">
                      {src.type}
                    </span>
                    <span className="font-mono text-[11px] text-[#f59e0b]">
                      {src.year}
                    </span>
                  </div>
                  <p className="mt-2 text-xs font-medium leading-relaxed text-slate-100">
                    {src.citation}
                  </p>
                  <p className="mt-1.5 text-xs text-slate-400">
                    {src.supports[locale]}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-slate-800/80 pt-2.5 text-[11px] text-slate-500">
                  <span>{src.authorOrInstitution}</span>
                  {src.url && (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-[#14b8a6] hover:text-teal-300"
                    >
                      {locale === "tr" ? "Bağlantı" : "Link"}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#0b1320] py-8 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4">
          <p className="font-serif text-sm font-semibold text-slate-300">
            TÜRKÇENİN İZİNDE — COĞRAFİ ATLAS
          </p>
          <p className="mt-1">{copy.distinctionNotice}</p>
        </div>
      </footer>

      {/* Mobile Bottom Quick Navigation */}
      <nav
        aria-label="Mobile quick navigation"
        className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-slate-800 bg-[#0b1320]/95 py-2 backdrop-blur md:hidden"
      >
        <a
          href="#map-explorer"
          className="flex flex-col items-center gap-0.5 text-[10px] font-medium text-slate-300 hover:text-[#14b8a6]"
        >
          <MapIcon className="h-4 w-4 text-[#14b8a6]" />
          <span>{copy.nav.atlas}</span>
        </a>
        <a
          href="#branches"
          className="flex flex-col items-center gap-0.5 text-[10px] font-medium text-slate-300 hover:text-[#14b8a6]"
        >
          <Languages className="h-4 w-4 text-[#14b8a6]" />
          <span>{copy.nav.tree}</span>
        </a>
        <a
          href="#timeline"
          className="flex flex-col items-center gap-0.5 text-[10px] font-medium text-slate-300 hover:text-[#f59e0b]"
        >
          <History className="h-4 w-4 text-[#f59e0b]" />
          <span>{copy.nav.timeline}</span>
        </a>
        <a
          href="#bibliography"
          className="flex flex-col items-center gap-0.5 text-[10px] font-medium text-slate-300 hover:text-[#14b8a6]"
        >
          <BookOpen className="h-4 w-4 text-[#14b8a6]" />
          <span>{copy.nav.sources}</span>
        </a>
      </nav>
    </div>
  );
}
