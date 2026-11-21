"use client";

import React, { useState } from "react";
import { Compass, Menu, X, Languages, Landmark } from "lucide-react";
import type { Locale } from "@/data/i18n";

interface MuseumHeaderProps {
  locale: Locale;
  onToggleLocale: (next: Locale) => void;
}

export function MuseumHeader({ locale, onToggleLocale }: MuseumHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    {
      href: "#overview",
      label: locale === "tr" ? "Müze Girişi" : "Exhibition Hall",
    },
    {
      href: "#script-lab",
      label: locale === "tr" ? "Yazı Laboratuvarı" : "Script Specimen Lab",
    },
    {
      href: "#gallery",
      label: locale === "tr" ? "Eser Galerisi" : "Artifact Gallery",
    },
    {
      href: "#bibliography",
      label: locale === "tr" ? "Kaynakça" : "Bibliography",
    },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[#f5f0e6]/10 bg-[#111113]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand */}
        <a
          href="#overview"
          className="group flex items-center gap-3 focus:outline-none"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#d97706]/40 bg-[#1a1a1f] text-[#d97706] transition-colors group-hover:border-[#d97706] group-hover:bg-[#d97706]/10">
            <Landmark className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-base font-semibold tracking-wider text-[#f5f0e6] sm:text-lg">
                {locale === "tr" ? "YAZININ HAFIZASI" : "MEMORY OF SCRIPT"}
              </span>
              <span className="hidden rounded border border-[#d97706]/30 bg-[#d97706]/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[#d97706] sm:inline-block">
                {locale === "tr" ? "Dijital Müze" : "Digital Museum"}
              </span>
            </div>
            <p className="font-mono text-[11px] tracking-wide text-[#a8a29e]">
              {locale === "tr"
                ? "TÜRKÇENİN İZİNDE · EPİGRAFİ & YAZMA GALERİSİ"
                : "TRACING TURKIC · EPIGRAPHY & MANUSCRIPT GALLERY"}
            </p>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-[#f5f0e6]/80 transition-colors hover:bg-[#1a1a1f] hover:text-[#d97706]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Controls: Locale Toggle + Mobile Menu Button */}
        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center rounded-lg border border-[#f5f0e6]/15 bg-[#1a1a1f] p-0.5"
            role="group"
            aria-label={locale === "tr" ? "Dil Seçimi" : "Language Switcher"}
          >
            <span className="hidden pl-2 pr-1 text-[#a8a29e] sm:inline-flex">
              <Languages className="h-3.5 w-3.5" />
            </span>
            <button
              type="button"
              onClick={() => onToggleLocale("tr")}
              className={`rounded-md px-2.5 py-1 font-mono text-xs font-medium transition-all ${
                locale === "tr"
                  ? "bg-[#d97706] text-[#111113] shadow-sm"
                  : "text-[#a8a29e] hover:text-[#f5f0e6]"
              }`}
              aria-pressed={locale === "tr"}
            >
              TR
            </button>
            <button
              type="button"
              onClick={() => onToggleLocale("en")}
              className={`rounded-md px-2.5 py-1 font-mono text-xs font-medium transition-all ${
                locale === "en"
                  ? "bg-[#d97706] text-[#111113] shadow-sm"
                  : "text-[#a8a29e] hover:text-[#f5f0e6]"
              }`}
              aria-pressed={locale === "en"}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#f5f0e6]/15 bg-[#1a1a1f] text-[#f5f0e6] transition-colors hover:border-[#d97706]/50 hover:text-[#d97706] md:hidden"
            aria-expanded={mobileOpen}
            aria-label={locale === "tr" ? "Menüyü aç" : "Toggle menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-[#f5f0e6]/10 bg-[#1a1a1f] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-[#f5f0e6]/90 transition-colors hover:bg-[#111113] hover:text-[#d97706]"
              >
                <Compass className="h-4 w-4 text-[#d97706]" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
