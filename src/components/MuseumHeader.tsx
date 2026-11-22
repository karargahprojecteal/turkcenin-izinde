"use client";

import React, { useEffect } from "react";
import {
  Compass,
  Clock,
  GitBranch,
  Languages,
  Map as MapIcon,
  Landmark,
  BookOpen,
  Search,
  Menu,
  X,
  Globe,
  Crown,
  Feather,
} from "lucide-react";
import { Locale, UI_COPY } from "@/data/i18n";
import { OrkhonEmblemSvg } from "./OrkhonVectorGlyphs";
import { SectionId } from "./types";

interface MuseumHeaderProps {
  locale: Locale;
  onToggleLocale: () => void;
  activeSection: SectionId;
  onSelectSection: (section: SectionId) => void;
  onOpenSearch: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const NAV_ITEMS: {
  id: SectionId;
  labelKey: keyof (typeof UI_COPY)["tr"]["nav"];
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "home", labelKey: "home", icon: Compass },
  { id: "early-states", labelKey: "earlyStates", icon: Crown },
  { id: "timeline", labelKey: "timeline", icon: Clock },
  { id: "tree", labelKey: "tree", icon: GitBranch },
  { id: "alphabets", labelKey: "alphabets", icon: Languages },
  { id: "atlas", labelKey: "atlas", icon: MapIcon },
  { id: "literature", labelKey: "literature", icon: Feather },
  { id: "artifacts", labelKey: "artifacts", icon: Landmark },
  { id: "sources", labelKey: "sources", icon: BookOpen },
];

export function MuseumHeader({
  locale,
  onToggleLocale,
  activeSection,
  onSelectSection,
  onOpenSearch,
  mobileMenuOpen,
  setMobileMenuOpen,
}: MuseumHeaderProps) {
  const copy = UI_COPY[locale];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen, setMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-[#e2dacb] bg-[#f8f6f1]/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          {/* Brand Emblem */}
          <button
            type="button"
            onClick={() => {
              onSelectSection("home");
              setMobileMenuOpen(false);
            }}
            className="focus-museum flex items-center gap-3 rounded-lg text-left transition-opacity hover:opacity-85"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#b45309]/40 bg-[#0f172a] text-[#fbbf24] shadow-sm">
              <OrkhonEmblemSvg className="h-5 w-5" />
            </div>
            <div className="hidden sm:block">
              <div className="font-serif text-sm font-bold tracking-[0.14em] text-[#0f172a]">
                {copy.brandTitle}
              </div>
              <div className="text-[11px] font-medium text-[#0e7490]">
                {copy.brandSubtitle}
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav
            aria-label={locale === "tr" ? "Ana Gezinti" : "Primary Navigation"}
            className="hidden items-center gap-1 xl:flex"
          >
            {NAV_ITEMS.map(({ id, labelKey, icon: Icon }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onSelectSection(id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`focus-museum flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#0f172a] text-[#f8f6f1] shadow-sm"
                      : "text-[#0f172a]/75 hover:bg-[#f1ede4] hover:text-[#0f172a]"
                  }`}
                >
                  <Icon
                    className={`h-3.5 w-3.5 ${
                      isActive ? "text-[#38bdf8]" : "text-[#0e7490]"
                    }`}
                  />
                  <span>{copy.nav[labelKey]}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Search, TR/EN, Mobile Menu */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label={copy.searchPlaceholder}
              className="focus-museum flex items-center gap-2 rounded-lg border border-[#e2dacb] bg-white px-2.5 py-1.5 text-xs font-medium text-[#0f172a]/80 shadow-sm transition-colors hover:border-[#0e7490] hover:text-[#0f172a]"
            >
              <Search className="h-3.5 w-3.5 text-[#0e7490]" />
              <span className="hidden md:inline">
                {locale === "tr" ? "Ara" : "Search"}
              </span>
              <kbd className="hidden rounded border border-[#e2dacb] bg-[#f8f6f1] px-1.5 py-0.5 font-mono text-[10px] text-[#0f172a]/60 xl:inline">
                /
              </kbd>
            </button>

            <button
              type="button"
              onClick={onToggleLocale}
              aria-label={locale === "tr" ? "Switch to English" : "Türkçeye Geç"}
              className="focus-museum flex items-center gap-1.5 rounded-lg border border-[#0e7490]/30 bg-[#0e7490]/10 px-2.5 py-1.5 text-xs font-bold text-[#0e7490] transition-colors hover:bg-[#0e7490] hover:text-white"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{locale === "tr" ? "TR | EN" : "EN | TR"}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-museum-drawer"
              aria-label={locale === "tr" ? "Menüyü aç/kapat" : "Toggle menu"}
              className="focus-museum inline-flex items-center justify-center rounded-lg border border-[#e2dacb] bg-white p-1.5 text-[#0f172a] xl:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-museum-drawer"
          className="border-t border-[#e2dacb] bg-[#f8f6f1] px-4 pb-4 pt-3 shadow-lg xl:hidden"
        >
          <div className="mb-3 border-b border-[#e2dacb] pb-2 sm:hidden">
            <div className="font-serif text-sm font-bold tracking-wider text-[#0f172a]">
              {copy.brandTitle}
            </div>
            <div className="text-xs text-[#0e7490]">{copy.brandSubtitle}</div>
          </div>
          <nav
            aria-label={locale === "tr" ? "Mobil Gezinti" : "Mobile Navigation"}
            className="grid grid-cols-2 gap-2"
          >
            {NAV_ITEMS.map(({ id, labelKey, icon: Icon }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    onSelectSection(id);
                    setMobileMenuOpen(false);
                  }}
                  aria-current={isActive ? "page" : undefined}
                  className={`focus-museum flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#0f172a] text-[#f8f6f1]"
                      : "border border-[#e2dacb] bg-white text-[#0f172a] hover:border-[#0e7490]"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 ${
                      isActive ? "text-[#38bdf8]" : "text-[#0e7490]"
                    }`}
                  />
                  <span>{copy.nav[labelKey]}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
