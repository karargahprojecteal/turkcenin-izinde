"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  X,
  Clock,
  GitBranch,
  Languages,
  Landmark,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { Locale, UI_COPY } from "@/data/i18n";
import { HISTORICAL_PERIODS } from "@/data/periods";
import { TURKIC_BRANCHES } from "@/data/languageFamily";
import { ALPHABET_SYSTEMS } from "@/data/alphabets";
import { HISTORICAL_ARTIFACTS } from "@/data/artifacts";
import { ACADEMIC_SOURCES } from "@/data/bibliography";
import { SectionId } from "./types";

type SearchCategory = "all" | "period" | "language" | "script" | "artifact" | "source";

interface SearchResultItem {
  id: string;
  category: Exclude<SearchCategory, "all">;
  title: string;
  subtitle: string;
  targetSection: SectionId;
  targetId: string;
}

interface GlobalSearchModalProps {
  locale: Locale;
  isOpen: boolean;
  onClose: () => void;
  onNavigateResult: (section: SectionId, itemId: string, category: Exclude<SearchCategory, "all">) => void;
}

export function GlobalSearchModal({
  locale,
  isOpen,
  onClose,
  onNavigateResult,
}: GlobalSearchModalProps) {
  const copy = UI_COPY[locale];
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<SearchCategory>("all");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const allItems: SearchResultItem[] = useMemo(() => {
    const items: SearchResultItem[] = [];

    for (const p of HISTORICAL_PERIODS) {
      items.push({
        id: `period-${p.id}`,
        category: "period",
        title: p.title[locale],
        subtitle: `${p.dateLabel[locale]} · ${p.region[locale]}`,
        targetSection: "timeline",
        targetId: p.id,
      });
    }

    for (const b of TURKIC_BRANCHES) {
      items.push({
        id: `branch-${b.id}`,
        category: "language",
        title: b.name[locale],
        subtitle: b.diagnosticFeature[locale],
        targetSection: "tree",
        targetId: b.id,
      });
      for (const l of b.languages) {
        items.push({
          id: `lang-${l.id}`,
          category: "language",
          title: `${l.name[locale]} (${l.nativeName})`,
          subtitle: `${b.name[locale]} · ${l.region[locale]}`,
          targetSection: "tree",
          targetId: b.id,
        });
      }
    }

    for (const s of ALPHABET_SYSTEMS) {
      items.push({
        id: `script-${s.id}`,
        category: "script",
        title: s.name[locale],
        subtitle: `${s.era[locale]} · ${s.writingSystemType[locale]}`,
        targetSection: "alphabets",
        targetId: s.id,
      });
    }

    for (const a of HISTORICAL_ARTIFACTS) {
      items.push({
        id: `artifact-${a.id}`,
        category: "artifact",
        title: a.title[locale],
        subtitle: `${a.date} · ${a.location[locale]}`,
        targetSection: "artifacts",
        targetId: a.id,
      });
    }

    for (const src of ACADEMIC_SOURCES) {
      items.push({
        id: `source-${src.id}`,
        category: "source",
        title: `${src.authorOrInstitution} (${src.year})`,
        subtitle: src.supports[locale],
        targetSection: "sources",
        targetId: src.id,
      });
    }

    return items;
  }, [locale]);

  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allItems
      .filter((item) => {
        const matchesCat = category === "all" || item.category === category;
        const matchesQ =
          !q ||
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q);
        return matchesCat && matchesQ;
      })
      .slice(0, 24);
  }, [allItems, category, query]);

  if (!isOpen) return null;

  const categoryIcon = (cat: Exclude<SearchCategory, "all">) => {
    switch (cat) {
      case "period":
        return Clock;
      case "language":
        return GitBranch;
      case "script":
        return Languages;
      case "artifact":
        return Landmark;
      case "source":
        return BookOpen;
    }
  };

  const categoryLabels: Record<SearchCategory, { tr: string; en: string }> = {
    all: { tr: "Tümü", en: "All" },
    period: { tr: "Dönemler", en: "Periods" },
    language: { tr: "Diller", en: "Languages" },
    script: { tr: "Alfabeler", en: "Scripts" },
    artifact: { tr: "Eserler", en: "Artifacts" },
    source: { tr: "Kaynakça", en: "Sources" },
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={copy.searchPlaceholder}
      className="fixed inset-0 z-50 flex items-start justify-center bg-[#0f172a]/70 p-4 pt-12 backdrop-blur-sm sm:pt-20"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-[#e2dacb] bg-[#f8f6f1] shadow-2xl">
        {/* Search Input Header */}
        <div className="flex items-center gap-3 border-b border-[#e2dacb] bg-white px-4 py-3">
          <Search className="h-5 w-5 shrink-0 text-[#0e7490]" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={copy.searchPlaceholder}
            aria-label={copy.searchPlaceholder}
            className="w-full bg-transparent text-sm text-[#0f172a] outline-none placeholder:text-[#0f172a]/45"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={locale === "tr" ? "Aramayı kapat" : "Close search"}
            className="focus-museum rounded-lg border border-[#e2dacb] p-1.5 text-[#0f172a]/70 hover:text-[#0f172a]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 border-b border-[#e2dacb] bg-[#f1ede4]/60 px-4 py-2.5">
          {(["all", "period", "language", "script", "artifact", "source"] as const).map(
            (cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`focus-museum rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                  category === cat
                    ? "bg-[#0f172a] text-white"
                    : "bg-white text-[#0f172a]/75 hover:text-[#0e7490]"
                }`}
              >
                {categoryLabels[cat][locale]}
              </button>
            )
          )}
        </div>

        {/* Results */}
        <div className="max-h-[58vh] divide-y divide-[#e2dacb] overflow-y-auto bg-white">
          {filteredResults.map((item) => {
            const Icon = categoryIcon(item.category);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onNavigateResult(item.targetSection, item.targetId, item.category);
                  onClose();
                }}
                className="focus-museum flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-[#f8f6f1]"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f1ede4] text-[#0e7490]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-serif text-sm font-bold text-[#0f172a]">
                      {item.title}
                    </div>
                    <div className="truncate text-xs text-[#0f172a]/65">
                      {item.subtitle}
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-[#0e7490]" />
              </button>
            );
          })}

          {filteredResults.length === 0 && (
            <div className="p-8 text-center text-sm text-[#0f172a]/60">
              {locale === "tr"
                ? "Aramanızla eşleşen kayıt bulunamadı."
                : "No records matched your search."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
