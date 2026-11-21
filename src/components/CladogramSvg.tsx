"use client";

import React, { useMemo, useState } from "react";
import { TURKIC_BRANCHES, TurkicBranch, TurkicLanguageItem } from "@/data/languageFamily";
import { Locale, UI_COPY } from "@/data/i18n";

export type CladogramSelection =
  | { kind: "root" }
  | { kind: "macro"; macro: "oghur" | "common-turkic" }
  | { kind: "branch"; branchId: string }
  | { kind: "language"; branchId: string; languageId: string };

interface CladogramSvgProps {
  locale: Locale;
  selection: CladogramSelection;
  onSelect: (sel: CladogramSelection) => void;
}

interface PositionedLanguage {
  lang: TurkicLanguageItem;
  branchId: string;
  macroGroup: "oghur" | "common-turkic";
  y: number;
}

interface PositionedBranch {
  branch: TurkicBranch;
  y: number;
  languages: PositionedLanguage[];
}

export function CladogramSvg({ locale, selection, onSelect }: CladogramSvgProps) {
  const [macroFilter, setMacroFilter] = useState<"all" | "oghur" | "common-turkic">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "living">("all");

  const copy = UI_COPY[locale];

  const layout = useMemo(() => {
    const rowH = 38;
    const branchGap = 16;
    const topPad = 28;

    let currentY = topPad;
    const branches: PositionedBranch[] = [];

    for (const branch of TURKIC_BRANCHES) {
      const langs: PositionedLanguage[] = [];
      for (const lang of branch.languages) {
        const y = currentY + rowH / 2;
        langs.push({
          lang,
          branchId: branch.id,
          macroGroup: branch.macroGroup,
          y,
        });
        currentY += rowH;
      }
      const firstY = langs[0].y;
      const lastY = langs[langs.length - 1].y;
      branches.push({
        branch,
        y: (firstY + lastY) / 2,
        languages: langs,
      });
      currentY += branchGap;
    }

    const totalHeight = currentY + 12;
    const oghurBranch = branches.find((b) => b.branch.macroGroup === "oghur")!;
    const commonBranches = branches.filter((b) => b.branch.macroGroup === "common-turkic");

    const oghurMacroY = oghurBranch.y;
    const commonMacroY =
      (commonBranches[0].y + commonBranches[commonBranches.length - 1].y) / 2;
    const rootY = (oghurMacroY + commonMacroY) / 2;

    return {
      totalHeight,
      branches,
      oghurMacroY,
      commonMacroY,
      rootY,
    };
  }, []);

  const isBranchDimmed = (branch: TurkicBranch) => {
    if (macroFilter !== "all" && branch.macroGroup !== macroFilter) return true;
    return false;
  };

  const isLanguageDimmed = (branch: TurkicBranch, lang: TurkicLanguageItem) => {
    if (isBranchDimmed(branch)) return true;
    if (statusFilter === "living" && lang.status !== "living") return true;
    return false;
  };

  // Determine active path highlighting
  const activeMacro: "oghur" | "common-turkic" | null = useMemo(() => {
    if (selection.kind === "macro") return selection.macro;
    if (selection.kind === "branch" || selection.kind === "language") {
      const b = TURKIC_BRANCHES.find((br) => br.id === selection.branchId);
      return b ? b.macroGroup : null;
    }
    return null;
  }, [selection]);

  const activeBranchId: string | null = useMemo(() => {
    if (selection.kind === "branch" || selection.kind === "language") {
      return selection.branchId;
    }
    return null;
  }, [selection]);

  const activeLangId: string | null = useMemo(() => {
    if (selection.kind === "language") return selection.languageId;
    return null;
  }, [selection]);

  // X coordinates for the 4-tier Swiss cladogram
  const X = {
    root: 16,
    rootW: 152,
    macro: 214,
    macroW: 174,
    branch: 434,
    branchW: 204,
    lang: 684,
    langW: 220,
  };

  const getMacroColor = (macro: "oghur" | "common-turkic") =>
    macro === "oghur" ? "#991b1b" : "#1d4ed8";

  return (
    <div className="border border-slate-300 bg-white">
      {/* Cladogram Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-300 bg-slate-100 px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-600">
            {locale === "tr" ? "Makro Grup:" : "Macro-Group:"}
          </span>
          {(
            [
              { id: "all", label: locale === "tr" ? "Tümü (6 Kol)" : "All (6 Branches)" },
              { id: "oghur", label: locale === "tr" ? "Oğur (r/l)" : "Oghur (r/l)" },
              {
                id: "common-turkic",
                label: locale === "tr" ? "Genel Türkçe (z/š)" : "Common Turkic (z/š)",
              },
            ] as const
          ).map((item) => {
            const active = macroFilter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setMacroFilter(item.id)}
                className={`border px-2.5 py-1 text-xs font-medium transition-colors ${
                  active
                    ? item.id === "oghur"
                      ? "border-red-800 bg-red-800 text-white"
                      : item.id === "common-turkic"
                        ? "border-blue-700 bg-blue-700 text-white"
                        : "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:border-slate-500"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-600">
            {locale === "tr" ? "Durum:" : "Status:"}
          </span>
          <button
            type="button"
            onClick={() => setStatusFilter(statusFilter === "all" ? "living" : "all")}
            className={`border px-2.5 py-1 text-xs font-medium transition-colors ${
              statusFilter === "living"
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-300 bg-white text-slate-700 hover:border-slate-500"
            }`}
          >
            {statusFilter === "living"
              ? locale === "tr"
                ? "Yalnızca Yaşayanlar"
                : "Living Only"
              : locale === "tr"
                ? "Yaşayan + Tarihsel"
                : "Living + Historical"}
          </button>
        </div>
      </div>

      {/* Legend Strip */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 border-b border-slate-200 bg-white px-4 py-2 text-xs text-slate-600">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-4 border border-dashed border-slate-900 bg-slate-100" />
          <span className="font-mono text-[11px]">{copy.badges.reconstructed}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 bg-[#991b1b]" />
          <span className="font-mono text-[11px]">
            {locale === "tr" ? "Oğur (r/l Türkçesi)" : "Oghur (r/l Turkic)"}
          </span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 bg-[#1d4ed8]" />
          <span className="font-mono text-[11px]">
            {locale === "tr" ? "Genel Türkçe (z/š)" : "Common Turkic (z/š)"}
          </span>
        </span>
        <span className="ml-auto font-mono text-[11px] text-slate-500">
          {locale === "tr"
            ? "İncelemek için herhangi bir düğüme tıklayın"
            : "Click any node to inspect lineage & sources"}
        </span>
      </div>

      {/* Responsive Horizontal-Scroll SVG Canvas */}
      <div className="cladogram-scroll overflow-x-auto bg-white p-2 sm:p-4">
        <svg
          viewBox={`0 0 920 ${layout.totalHeight}`}
          className="h-auto min-w-[780px] w-full select-none"
          role="img"
          aria-label={
            locale === "tr"
              ? "Türk Dilleri Etkileşimli Soy Ağacı Kladogramı"
              : "Interactive Turkic Language Family Cladogram"
          }
        >
          {/* Tier Column Headers */}
          <text x={X.root} y={14} className="fill-slate-400 font-mono text-[10px] uppercase">
            {locale === "tr" ? "01 / ATA DİL" : "01 / PROTO-ROOT"}
          </text>
          <text x={X.macro} y={14} className="fill-slate-400 font-mono text-[10px] uppercase">
            {locale === "tr" ? "02 / ANA AYRIM" : "02 / MACRO SPLIT"}
          </text>
          <text x={X.branch} y={14} className="fill-slate-400 font-mono text-[10px] uppercase">
            {locale === "tr" ? "03 / 6 ANA KOL" : "03 / 6 BRANCHES"}
          </text>
          <text x={X.lang} y={14} className="fill-slate-400 font-mono text-[10px] uppercase">
            {locale === "tr" ? "04 / DİLLER" : "04 / LANGUAGES"}
          </text>

          {/* CONNECTORS: Root -> Macro Groups */}
          {(["oghur", "common-turkic"] as const).map((macro) => {
            const targetY = macro === "oghur" ? layout.oghurMacroY : layout.commonMacroY;
            const midX = X.root + X.rootW + 23;
            const isActive = activeMacro === macro;
            const dimmed = macroFilter !== "all" && macroFilter !== macro;
            const strokeColor = isActive ? getMacroColor(macro) : "#cbd5e1";

            return (
              <path
                key={`root-${macro}`}
                d={`M ${X.root + X.rootW} ${layout.rootY} H ${midX} V ${targetY} H ${X.macro}`}
                fill="none"
                stroke={strokeColor}
                strokeWidth={isActive ? 2.5 : 1.5}
                strokeDasharray="4 3"
                opacity={dimmed ? 0.25 : 1}
              />
            );
          })}

          {/* CONNECTORS: Macro Groups -> 6 Branches */}
          {layout.branches.map((bNode) => {
            const macro = bNode.branch.macroGroup;
            const startY = macro === "oghur" ? layout.oghurMacroY : layout.commonMacroY;
            const midX = X.macro + X.macroW + 23;
            const isActive = activeBranchId === bNode.branch.id;
            const dimmed = isBranchDimmed(bNode.branch);
            const strokeColor = isActive ? getMacroColor(macro) : "#cbd5e1";

            return (
              <path
                key={`macro-branch-${bNode.branch.id}`}
                d={`M ${X.macro + X.macroW} ${startY} H ${midX} V ${bNode.y} H ${X.branch}`}
                fill="none"
                stroke={strokeColor}
                strokeWidth={isActive ? 2.5 : 1.5}
                opacity={dimmed ? 0.2 : 1}
              />
            );
          })}

          {/* CONNECTORS: Branches -> Languages */}
          {layout.branches.map((bNode) =>
            bNode.languages.map((lNode) => {
              const macro = bNode.branch.macroGroup;
              const midX = X.branch + X.branchW + 23;
              const isActive =
                activeLangId === lNode.lang.id ||
                (selection.kind === "branch" && selection.branchId === bNode.branch.id);
              const dimmed = isLanguageDimmed(bNode.branch, lNode.lang);
              const strokeColor = isActive ? getMacroColor(macro) : "#cbd5e1";

              return (
                <path
                  key={`branch-lang-${lNode.lang.id}`}
                  d={`M ${X.branch + X.branchW} ${bNode.y} H ${midX} V ${lNode.y} H ${X.lang}`}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={isActive ? 2.25 : 1.25}
                  strokeDasharray={lNode.lang.status === "historical" ? "3 2" : undefined}
                  opacity={dimmed ? 0.2 : 1}
                />
              );
            })
          )}

          {/* NODE: Root (Proto-Turkic) */}
          <g
            role="button"
            tabIndex={0}
            aria-label={locale === "tr" ? "Proto-Türkçe (Kuramsal Ata Dil)" : "Proto-Turkic (Reconstructed Root)"}
            onClick={() => onSelect({ kind: "root" })}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect({ kind: "root" });
              }
            }}
            className="cursor-pointer"
          >
            <rect
              x={X.root}
              y={layout.rootY - 26}
              width={X.rootW}
              height={52}
              rx={2}
              fill={selection.kind === "root" ? "#0f172a" : "#f8fafc"}
              stroke="#0f172a"
              strokeWidth={selection.kind === "root" ? 2 : 1.5}
              strokeDasharray="4 3"
            />
            <text
              x={X.root + 10}
              y={layout.rootY - 5}
              className={`text-[12px] font-semibold ${
                selection.kind === "root" ? "fill-white" : "fill-slate-900"
              }`}
            >
              {locale === "tr" ? "Proto-Türkçe" : "Proto-Turkic"}
            </text>
            <text
              x={X.root + 10}
              y={layout.rootY + 13}
              className={`font-mono text-[10px] ${
                selection.kind === "root" ? "fill-slate-300" : "fill-slate-500"
              }`}
            >
              {locale === "tr" ? "Kuramsal Ata Dil" : "Reconstructed Root"}
            </text>
          </g>

          {/* NODES: Macro Groups */}
          {(
            [
              {
                macro: "oghur" as const,
                y: layout.oghurMacroY,
                title: locale === "tr" ? "Oğur Grubu" : "Oghur Branch",
                sub: "r / l  (Rhotacism)",
              },
              {
                macro: "common-turkic" as const,
                y: layout.commonMacroY,
                title: locale === "tr" ? "Genel Türkçe" : "Common Turkic",
                sub: "z / š  (Standard)",
              },
            ] as const
          ).map((m) => {
            const isSelected = selection.kind === "macro" && selection.macro === m.macro;
            const isPathActive = activeMacro === m.macro;
            const dimmed = macroFilter !== "all" && macroFilter !== m.macro;
            const accent = getMacroColor(m.macro);

            return (
              <g
                key={m.macro}
                role="button"
                tabIndex={0}
                aria-label={m.title}
                onClick={() => onSelect({ kind: "macro", macro: m.macro })}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect({ kind: "macro", macro: m.macro });
                  }
                }}
                className="cursor-pointer"
                opacity={dimmed ? 0.25 : 1}
              >
                <rect
                  x={X.macro}
                  y={m.y - 24}
                  width={X.macroW}
                  height={48}
                  rx={2}
                  fill={isSelected ? accent : "#ffffff"}
                  stroke={isPathActive ? accent : "#94a3b8"}
                  strokeWidth={isSelected || isPathActive ? 2 : 1.25}
                />
                <rect
                  x={X.macro}
                  y={m.y - 24}
                  width={4}
                  height={48}
                  fill={accent}
                />
                <text
                  x={X.macro + 12}
                  y={m.y - 4}
                  className={`text-[12px] font-semibold ${
                    isSelected ? "fill-white" : "fill-slate-900"
                  }`}
                >
                  {m.title}
                </text>
                <text
                  x={X.macro + 12}
                  y={m.y + 13}
                  className={`font-mono text-[10px] ${
                    isSelected ? "fill-slate-100" : "fill-slate-500"
                  }`}
                >
                  {m.sub}
                </text>
              </g>
            );
          })}

          {/* NODES: 6 Branches */}
          {layout.branches.map((bNode) => {
            const { branch } = bNode;
            const isSelected = selection.kind === "branch" && selection.branchId === branch.id;
            const isPathActive = activeBranchId === branch.id;
            const dimmed = isBranchDimmed(branch);
            const accent = getMacroColor(branch.macroGroup);

            return (
              <g
                key={branch.id}
                role="button"
                tabIndex={0}
                aria-label={branch.name[locale]}
                onClick={() => onSelect({ kind: "branch", branchId: branch.id })}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect({ kind: "branch", branchId: branch.id });
                  }
                }}
                className="cursor-pointer"
                opacity={dimmed ? 0.2 : 1}
              >
                <rect
                  x={X.branch}
                  y={bNode.y - 18}
                  width={X.branchW}
                  height={36}
                  rx={2}
                  fill={isSelected ? accent : isPathActive ? "#f8fafc" : "#ffffff"}
                  stroke={isPathActive ? accent : "#cbd5e1"}
                  strokeWidth={isPathActive ? 2 : 1.25}
                />
                <rect x={X.branch} y={bNode.y - 18} width={3.5} height={36} fill={accent} />
                <text
                  x={X.branch + 10}
                  y={bNode.y - 1}
                  className={`text-[11.5px] font-semibold ${
                    isSelected ? "fill-white" : "fill-slate-900"
                  }`}
                >
                  {branch.name[locale].length > 26
                    ? branch.name[locale].slice(0, 25) + "…"
                    : branch.name[locale]}
                </text>
                <text
                  x={X.branch + 10}
                  y={bNode.y + 12}
                  className={`font-mono text-[9.5px] ${
                    isSelected ? "fill-slate-100" : "fill-slate-500"
                  }`}
                >
                  {branch.languages.length}{" "}
                  {locale === "tr" ? "üye dil" : branch.languages.length === 1 ? "language" : "languages"}
                </text>
              </g>
            );
          })}

          {/* NODES: 17 Languages */}
          {layout.branches.map((bNode) =>
            bNode.languages.map((lNode) => {
              const { lang } = lNode;
              const isSelected =
                selection.kind === "language" && selection.languageId === lang.id;
              const dimmed = isLanguageDimmed(bNode.branch, lang);
              const accent = getMacroColor(bNode.branch.macroGroup);
              const isHist = lang.status === "historical";

              return (
                <g
                  key={lang.id}
                  role="button"
                  tabIndex={0}
                  aria-label={lang.name[locale]}
                  onClick={() =>
                    onSelect({
                      kind: "language",
                      branchId: bNode.branch.id,
                      languageId: lang.id,
                    })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect({
                        kind: "language",
                        branchId: bNode.branch.id,
                        languageId: lang.id,
                      });
                    }
                  }}
                  className="cursor-pointer"
                  opacity={dimmed ? 0.2 : 1}
                >
                  <rect
                    x={X.lang}
                    y={lNode.y - 14}
                    width={X.langW}
                    height={28}
                    rx={2}
                    fill={isSelected ? accent : "#ffffff"}
                    stroke={isSelected ? accent : "#cbd5e1"}
                    strokeWidth={isSelected ? 1.75 : 1}
                    strokeDasharray={isHist && !isSelected ? "3 2" : undefined}
                  />
                  {/* Status dot */}
                  <circle
                    cx={X.lang + 11}
                    cy={lNode.y}
                    r={3.2}
                    fill={
                      isSelected
                        ? "#ffffff"
                        : isHist
                          ? "#94a3b8"
                          : accent
                    }
                  />
                  <text
                    x={X.lang + 20}
                    y={lNode.y + 3.5}
                    className={`text-[11.5px] font-medium ${
                      isSelected ? "fill-white font-semibold" : "fill-slate-800"
                    }`}
                  >
                    {lang.name[locale]}
                  </text>
                  {isHist && (
                    <text
                      x={X.lang + X.langW - 8}
                      y={lNode.y + 3}
                      textAnchor="end"
                      className={`font-mono text-[9px] uppercase ${
                        isSelected ? "fill-slate-200" : "fill-slate-400"
                      }`}
                    >
                      {locale === "tr" ? "TARİHSEL" : "HIST."}
                    </text>
                  )}
                </g>
              );
            })
          )}
        </svg>
      </div>
    </div>
  );
}
