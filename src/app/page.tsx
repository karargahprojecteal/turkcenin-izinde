"use client";

import React, { useState } from "react";
import { ArrowDown, GitFork, Menu, X } from "lucide-react";
import { Locale, UI_COPY } from "@/data/i18n";
import { TURKIC_BRANCHES } from "@/data/languageFamily";
import { HISTORICAL_PERIODS } from "@/data/periods";
import { ACADEMIC_SOURCES } from "@/data/bibliography";
import { CladogramSelection, CladogramSvg } from "@/components/CladogramSvg";
import { DetailPanel } from "@/components/DetailPanel";
import { SoundLawComparator } from "@/components/SoundLawComparator";
import { PeriodsAndBibliography } from "@/components/PeriodsAndBibliography";

export default function LanguageTreePage() {
  const [locale, setLocale] = useState<Locale>("tr");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selection, setSelection] = useState<CladogramSelection>({
    kind: "branch",
    branchId: "oghur",
  });

  const copy = UI_COPY[locale];

  const totalLanguages = TURKIC_BRANCHES.reduce(
    (sum, branch) => sum + branch.languages.length,
    0
  );

  const navLinks = [
    { href: "#overview", label: copy.nav.home },
    { href: "#cladogram", label: copy.nav.tree },
    {
      href: "#sound-laws",
      label: locale === "tr" ? "Ses Yasaları" : "Sound Laws",
    },
    { href: "#periods", label: copy.nav.timeline },
    { href: "#sources", label: copy.nav.sources },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Top Swiss Editorial Navigation */}
      <header className="sticky top-0 z-40 border-b border-slate-300 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          {/* Brand */}
          <a href="#overview" className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center border border-slate-900 bg-slate-900 text-white">
              <GitFork className="h-4 w-4" />
            </span>
            <div>
              <div className="font-mono text-xs font-bold tracking-widest text-slate-900">
                {copy.brandTitle}
              </div>
              <div className="text-[11px] font-medium text-slate-500">
                {locale === "tr" ? "04 / DİL AĞACI KLADOGRAMI" : "04 / LINGUISTIC CLADOGRAM"}
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-6 md:flex"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-medium text-slate-600 transition-colors hover:text-slate-950"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Controls: TR/EN Toggle + Mobile Hamburger */}
          <div className="flex items-center gap-2">
            <div
              role="group"
              aria-label="Language switch"
              className="flex border border-slate-300 bg-slate-100 p-0.5 font-mono text-[11px]"
            >
              <button
                type="button"
                onClick={() => setLocale("tr")}
                className={`px-2 py-1 font-semibold transition-colors ${
                  locale === "tr"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                TR
              </button>
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={`px-2 py-1 font-semibold transition-colors ${
                  locale === "en"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                EN
              </button>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={locale === "tr" ? "Menüyü aç/kapat" : "Toggle menu"}
              aria-expanded={mobileMenuOpen}
              className="flex h-8 w-8 items-center justify-center border border-slate-300 bg-white text-slate-800 md:hidden"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile"
            className="border-t border-slate-200 bg-slate-50 px-4 py-3 md:hidden"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-slate-200 pb-2 text-xs font-semibold text-slate-800 last:border-b-0 last:pb-0"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main>
        {/* Overview / Hero Band */}
        <section
          id="overview"
          className="scroll-mt-20 border-b border-slate-300 bg-white py-10 sm:py-14"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                  <span>{copy.brandSubtitle}</span>
                  <span className="text-slate-300">/</span>
                  <span className="text-[#991b1b]">r-L (OGHUR)</span>
                  <span className="text-slate-300">vs</span>
                  <span className="text-[#1d4ed8]">z-Š (COMMON TURKIC)</span>
                </div>

                <h1 className="font-serif text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                  {locale === "tr"
                    ? "Türk Dil Ailesi: Kladogram ve Karşılaştırmalı Sesbilgisi"
                    : "The Turkic Language Family: Cladogram & Comparative Phonology"}
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                  {locale === "tr"
                    ? "Proto-Türkçeden Oğur ve Genel Türkçe ayrımına, altı ana kola ve yaşayan/tarihsel dillere uzanan genetik sınıflandırma atlası. Etkileşimli soy ağacında düğümleri seçin ve ses yasalarını karşılaştırın."
                    : "A genetic classification atlas tracing Proto-Turkic through the Oghur–Common Turkic split into six major branches and their living and historical members. Select nodes in the cladogram and compare phonological sound laws."}
                </p>

                {/* Scientific Distinction Callout */}
                <div className="mt-6 border-l-2 border-slate-900 bg-slate-100 px-4 py-3 text-xs leading-relaxed text-slate-700">
                  {copy.distinctionNotice}
                </div>
              </div>

              {/* Swiss Taxonomic Metrics Grid */}
              <div className="lg:col-span-4">
                <div className="grid grid-cols-2 gap-px border border-slate-300 bg-slate-300">
                  <div className="bg-white p-4">
                    <div className="font-mono text-2xl font-bold text-slate-900">2</div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                      {locale === "tr" ? "Ana Makro Grup" : "Macro-Groups"}
                    </div>
                  </div>
                  <div className="bg-white p-4">
                    <div className="font-mono text-2xl font-bold text-slate-900">
                      {TURKIC_BRANCHES.length}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                      {locale === "tr" ? "Genetik Kol" : "Genetic Branches"}
                    </div>
                  </div>
                  <div className="bg-white p-4">
                    <div className="font-mono text-2xl font-bold text-slate-900">
                      {totalLanguages}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                      {locale === "tr" ? "Temsili Dil" : "Cataloged Languages"}
                    </div>
                  </div>
                  <div className="bg-white p-4">
                    <div className="font-mono text-2xl font-bold text-slate-900">
                      {HISTORICAL_PERIODS.length}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                      {locale === "tr" ? "Tarihsel Dönem" : "Historical Periods"}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href="#cladogram"
                    className="inline-flex flex-1 items-center justify-center gap-1.5 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800"
                  >
                    {locale === "tr" ? "Dil Ağacına İn" : "Explore Cladogram"}
                    <ArrowDown className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href="#sound-laws"
                    className="inline-flex flex-1 items-center justify-center border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-800 transition-colors hover:border-slate-900"
                  >
                    {locale === "tr" ? "Ses Yasaları" : "Sound Laws"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive SVG Cladogram + Detail Panel */}
        <section id="cladogram" className="scroll-mt-20 bg-white py-12 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col justify-between gap-3 border-b border-slate-300 pb-4 sm:flex-row sm:items-end">
              <div>
                <div className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-700">
                  {locale === "tr"
                    ? "01 / ETKİLEŞİMLİ KLADOGRAM"
                    : "01 / INTERACTIVE CLADOGRAM"}
                </div>
                <h2 className="mt-1 font-serif text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                  {locale === "tr"
                    ? "Türk Dilleri Soy Ağacı"
                    : "Turkic Language Family Tree"}
                </h2>
              </div>

              {/* Quick Node Presets */}
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelection({ kind: "root" })}
                  className={`border px-2.5 py-1 font-mono text-[11px] transition-colors ${
                    selection.kind === "root"
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-300 bg-slate-50 text-slate-700 hover:border-slate-500"
                  }`}
                >
                  Proto-Türkçe
                </button>
                <button
                  type="button"
                  onClick={() => setSelection({ kind: "branch", branchId: "oghur" })}
                  className={`border px-2.5 py-1 font-mono text-[11px] transition-colors ${
                    selection.kind === "branch" && selection.branchId === "oghur"
                      ? "border-[#991b1b] bg-[#991b1b] text-white"
                      : "border-red-200 bg-red-50/60 text-red-900 hover:border-[#991b1b]"
                  }`}
                >
                  Oğur (Çuvaşça)
                </button>
                <button
                  type="button"
                  onClick={() => setSelection({ kind: "branch", branchId: "arghu" })}
                  className={`border px-2.5 py-1 font-mono text-[11px] transition-colors ${
                    selection.kind === "branch" && selection.branchId === "arghu"
                      ? "border-[#1d4ed8] bg-[#1d4ed8] text-white"
                      : "border-blue-200 bg-blue-50/60 text-blue-900 hover:border-[#1d4ed8]"
                  }`}
                >
                  Arğu (Halaçça)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-8">
                <CladogramSvg
                  locale={locale}
                  selection={selection}
                  onSelect={setSelection}
                />
              </div>
              <div className="lg:col-span-4 lg:sticky lg:top-20">
                <DetailPanel
                  locale={locale}
                  selection={selection}
                  onSelect={setSelection}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Phonological Sound-Law Comparator */}
        <SoundLawComparator
          locale={locale}
          onSelectBranch={(sel) => setSelection(sel)}
        />

        {/* Historical Periods & Academic Bibliography */}
        <PeriodsAndBibliography locale={locale} />
      </main>

      {/* Editorial Footer */}
      <footer className="border-t border-slate-300 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <span className="font-mono font-semibold text-slate-900">
              {copy.brandTitle}
            </span>{" "}
            —{" "}
            {locale === "tr"
              ? "Dil Ağacı & Karşılaştırmalı Sesbilgisi Kladogramı"
              : "Linguistic Cladogram & Comparative Phonology"}
          </div>
          <div className="font-mono text-[11px]">
            {ACADEMIC_SOURCES.length}{" "}
            {locale === "tr" ? "doğrulanmış kaynak" : "verified academic sources"}
          </div>
        </div>
      </footer>
    </div>
  );
}
