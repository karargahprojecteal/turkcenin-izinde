"use client";

import React, { useEffect, useState } from "react";
import { Locale, UI_COPY } from "@/data/i18n";
import { MuseumHeader } from "@/components/MuseumHeader";
import { OverviewSection } from "@/components/OverviewSection";
import { TimelineSection } from "@/components/TimelineSection";
import { LanguageTreeSection } from "@/components/LanguageTreeSection";
import { ScriptLabSection } from "@/components/ScriptLabSection";
import { GeographicAtlasSection } from "@/components/GeographicAtlasSection";
import { ArtifactGallerySection } from "@/components/ArtifactGallerySection";
import { BibliographySection } from "@/components/BibliographySection";
import { EarlyHistoryStatesSection } from "@/components/EarlyHistoryStatesSection";
import { LiteratureSection } from "@/components/LiteratureSection";
import { GlobalSearchModal } from "@/components/GlobalSearchModal";
import { SectionId } from "@/components/types";

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>("tr");
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [selectedPeriodId, setSelectedPeriodId] = useState<string>("gokturk");
  const [selectedBranchId, setSelectedBranchId] = useState<string>("oghuz");
  const [selectedScriptId, setSelectedScriptId] = useState<string>("gokturk-runic");
  const [selectedArtifactId, setSelectedArtifactId] = useState<string | null>(null);
  const [highlightedSourceId, setHighlightedSourceId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const copy = UI_COPY[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !isTyping)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  const navigateToSection = (section: SectionId) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToPeriod = (periodId: string) => {
    setSelectedPeriodId(periodId);
    navigateToSection("timeline");
  };

  const navigateToBranch = (branchId: string) => {
    setSelectedBranchId(branchId);
    navigateToSection("tree");
  };

  const navigateToScript = (scriptId: string) => {
    setSelectedScriptId(scriptId);
    navigateToSection("alphabets");
  };

  const navigateToSource = (sourceId: string) => {
    setHighlightedSourceId(sourceId);
    navigateToSection("sources");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f6f1] text-[#0f172a]">
      <MuseumHeader
        locale={locale}
        onToggleLocale={() => setLocale((prev) => (prev === "tr" ? "en" : "tr"))}
        activeSection={activeSection}
        onSelectSection={navigateToSection}
        onOpenSearch={() => setSearchOpen(true)}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {activeSection === "home" && (
          <OverviewSection locale={locale} onNavigate={navigateToSection} onNavigateToPeriod={navigateToPeriod} />
        )}

        {activeSection === "early-states" && (
          <EarlyHistoryStatesSection
            locale={locale}
            onNavigateToSource={navigateToSource}
          />
        )}

        {activeSection === "timeline" && (
          <TimelineSection
            locale={locale}
            selectedPeriodId={selectedPeriodId}
            onSelectPeriod={setSelectedPeriodId}
            onNavigateToScript={navigateToScript}
            onNavigateToSource={navigateToSource}
          />
        )}

        {activeSection === "tree" && (
          <LanguageTreeSection
            locale={locale}
            selectedBranchId={selectedBranchId}
            onSelectBranch={setSelectedBranchId}
            onNavigateToSource={navigateToSource}
          />
        )}

        {activeSection === "alphabets" && (
          <ScriptLabSection
            locale={locale}
            selectedScriptId={selectedScriptId}
            onSelectScript={setSelectedScriptId}
            onNavigateToSource={navigateToSource}
          />
        )}

        {activeSection === "atlas" && (
          <GeographicAtlasSection
            locale={locale}
            onNavigateToPeriod={navigateToPeriod}
            onNavigateToBranch={navigateToBranch}
          />
        )}

        {activeSection === "literature" && (
          <LiteratureSection
            locale={locale}
            onNavigateToSource={navigateToSource}
          />
        )}

        {activeSection === "artifacts" && (
          <ArtifactGallerySection
            locale={locale}
            selectedArtifactId={selectedArtifactId}
            onSelectArtifact={setSelectedArtifactId}
            onNavigateToPeriod={navigateToPeriod}
            onNavigateToScript={navigateToScript}
            onNavigateToSource={navigateToSource}
          />
        )}

        {activeSection === "sources" && (
          <BibliographySection
            locale={locale}
            highlightedSourceId={highlightedSourceId}
          />
        )}
      </main>

      <footer className="border-t border-[#e2dacb] bg-[#f1ede4]/70 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-4 text-xs text-[#0f172a]/75 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div className="max-w-xl space-y-1">
            <div className="font-serif text-sm font-bold text-[#0f172a]">
              {copy.brandTitle} — {copy.brandSubtitle}
            </div>
            <p>{copy.distinctionNotice}</p>
          </div>
          <div className="flex flex-wrap gap-3 font-semibold text-[#0e7490]">
            {(["home", "timeline", "tree", "alphabets", "atlas", "artifacts", "sources"] as const).map(
              (sec) => (
                <button
                  key={sec}
                  type="button"
                  onClick={() => navigateToSection(sec)}
                  className="focus-museum hover:underline"
                >
                  {copy.nav[sec]}
                </button>
              )
            )}
          </div>
        </div>
      </footer>

      <GlobalSearchModal
        locale={locale}
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigateResult={(section, itemId, category) => {
          if (category === "period") navigateToPeriod(itemId);
          else if (category === "language") navigateToBranch(itemId);
          else if (category === "script") navigateToScript(itemId);
          else if (category === "artifact") {
            setSelectedArtifactId(itemId);
            navigateToSection("artifacts");
          } else if (category === "source") {
            navigateToSource(itemId);
          } else {
            navigateToSection(section);
          }
        }}
      />
    </div>
  );
}
