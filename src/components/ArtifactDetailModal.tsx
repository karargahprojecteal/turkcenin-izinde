"use client";

import React, { useEffect } from "react";
import {
  Award,
  BookOpen,
  Calendar,
  ExternalLink,
  Layers,
  MapPin,
  Sparkles,
  Building2,
  X,
} from "lucide-react";
import { ALPHABET_SYSTEMS } from "@/data/alphabets";
import type { HistoricalArtifact } from "@/data/artifacts";
import { ACADEMIC_SOURCES } from "@/data/bibliography";
import type { Locale } from "@/data/i18n";

interface ArtifactDetailModalProps {
  artifact: HistoricalArtifact | null;
  locale: Locale;
  onClose: () => void;
  onInspectScript: (scriptId: string) => void;
}

export function ArtifactDetailModal({
  artifact,
  locale,
  onClose,
  onInspectScript,
}: ArtifactDetailModalProps) {
  useEffect(() => {
    if (!artifact) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [artifact, onClose]);

  if (!artifact) return null;

  const script = ALPHABET_SYSTEMS.find((s) => s.id === artifact.scriptId);
  const sources = artifact.sourceIds
    .map((id) => ACADEMIC_SOURCES.find((src) => src.id === id))
    .filter((src): src is NonNullable<typeof src> => Boolean(src));

  const isVertical = script?.direction === "ttb-ltr";
  const isRtl = script?.direction === "rtl";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="artifact-modal-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#d97706]/40 bg-[#111113] p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#f5f0e6]/15 bg-[#1a1a1f] text-[#a8a29e] transition-colors hover:border-[#d97706] hover:text-[#f5f0e6]"
          aria-label={locale === "tr" ? "Kapat" : "Close"}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 pr-10">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-[#d97706]/40 bg-[#d97706]/15 px-2.5 py-1 font-mono text-xs text-[#d97706]">
            <Calendar className="h-3.5 w-3.5" />
            {artifact.date}
          </span>
          {script && (
            <a
              href="#script-lab"
              onClick={() => {
                onInspectScript(script.id);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#f5f0e6]/15 bg-[#1a1a1f] px-2.5 py-1 font-mono text-xs text-[#f5f0e6] transition-colors hover:border-[#d97706] hover:text-[#d97706]"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#d97706]" />
              {script.name[locale]}
            </a>
          )}
          {artifact.unescoStatus && (
            <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/35 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs text-emerald-300">
              <Award className="h-3.5 w-3.5" />
              {artifact.unescoStatus[locale]}
            </span>
          )}
        </div>

        {/* Title */}
        <h2
          id="artifact-modal-title"
          className="mt-4 font-serif text-3xl font-semibold text-[#f5f0e6] sm:text-4xl"
        >
          {artifact.title[locale]}
        </h2>

        {/* Illuminated Epigraphy Box */}
        <div className="mt-6 rounded-xl border border-[#d97706]/30 bg-[#1a1a1f] p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#d97706]">
            {locale === "tr" ? "ÖZGÜN METİN KESİTİ" : "PRIMARY EPIGRAPHIC EXCERPT"}
          </p>

          <div className="my-4 flex min-h-[88px] items-center justify-center rounded-lg border border-[#f5f0e6]/10 bg-[#111113] p-4">
            {isVertical ? (
              <p
                className="font-epigraphy script-vertical-ttb max-h-40 text-2xl tracking-widest text-[#f5f0e6] sm:text-3xl"
                lang="oui"
              >
                {artifact.excerptOriginal}
              </p>
            ) : (
              <p
                dir={isRtl ? "rtl" : "ltr"}
                className="font-epigraphy text-center text-2xl leading-relaxed tracking-wide text-[#f5f0e6] sm:text-3xl"
              >
                {artifact.excerptOriginal}
              </p>
            )}
          </div>

          <div className="space-y-1.5 border-t border-[#f5f0e6]/10 pt-3 text-sm">
            <p>
              <span className="font-mono text-xs text-[#a8a29e]">
                {locale === "tr" ? "Çevriyazı: " : "Transliteration: "}
              </span>
              <span className="font-mono text-[#f5f0e6]">
                {artifact.excerptTransliteration}
              </span>
            </p>
            <p>
              <span className="font-mono text-xs text-[#a8a29e]">
                {locale === "tr" ? "Çeviri: " : "Translation: "}
              </span>
              <span className="italic text-[#d97706]">
                &ldquo;{artifact.excerptTranslation[locale]}&rdquo;
              </span>
            </p>
          </div>
        </div>

        {/* Museum Placard Metadata */}
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-[#f5f0e6]/10 bg-[#1a1a1f] p-3.5">
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#a8a29e]">
              <MapPin className="h-3.5 w-3.5 text-[#d97706]" />
              <span>{locale === "tr" ? "Köken / Konum" : "Provenance"}</span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-[#f5f0e6]">
              {artifact.location[locale]}
            </p>
          </div>

          <div className="rounded-xl border border-[#f5f0e6]/10 bg-[#1a1a1f] p-3.5">
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#a8a29e]">
              <Building2 className="h-3.5 w-3.5 text-[#d97706]" />
              <span>{locale === "tr" ? "Korunduğu Yer" : "Repository"}</span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-[#f5f0e6]">
              {artifact.repository[locale]}
            </p>
          </div>

          <div className="rounded-xl border border-[#f5f0e6]/10 bg-[#1a1a1f] p-3.5">
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#a8a29e]">
              <Layers className="h-3.5 w-3.5 text-[#d97706]" />
              <span>{locale === "tr" ? "Materyal" : "Medium"}</span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-[#f5f0e6]">
              {artifact.material[locale]}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-5">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[#d97706]">
            {locale === "tr" ? "Küratöryel Açıklama" : "Curatorial Notes"}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#f5f0e6]/90">
            {artifact.description[locale]}
          </p>
        </div>

        {/* Verified Academic Sources */}
        <div className="mt-6 border-t border-[#f5f0e6]/10 pt-5">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-[#d97706]" />
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#f5f0e6]">
              {locale === "tr" ? "Doğrulanmış Akademik Kaynaklar" : "Verified Academic Sources"}
            </h3>
          </div>
          <ul className="mt-3 space-y-2.5">
            {sources.map((src) => (
              <li
                key={src.id}
                className="rounded-xl border border-[#f5f0e6]/10 bg-[#1a1a1f] p-3.5 text-xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-medium leading-relaxed text-[#f5f0e6]">
                    {src.citation}
                  </p>
                  {src.url && (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-1 rounded border border-[#d97706]/40 bg-[#d97706]/10 px-2 py-1 font-mono text-[10px] text-[#d97706] transition-colors hover:bg-[#d97706]/25"
                    >
                      <span>{locale === "tr" ? "Bağlantı" : "Link"}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
                <p className="mt-1.5 text-[#a8a29e]">{src.supports[locale]}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
