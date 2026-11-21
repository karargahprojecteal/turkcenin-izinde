import { ALPHABET_SYSTEMS, type AlphabetSystem } from "@/data/alphabets";
import type { Locale } from "@/data/i18n";

export interface ScriptBadgeMeta {
  id: string;
  label: { tr: string; en: string };
  glyphSample: string;
  direction: { tr: string; en: string };
  alphabetSystemId?: string;
}

export const SCRIPT_META_MAP: Record<string, ScriptBadgeMeta> = {
  "gokturk-runic": {
    id: "gokturk-runic",
    label: { tr: "Göktürk (Runiform)", en: "Old Turkic Runiform" },
    glyphSample: "𐱅𐰭𐰼𐰃",
    direction: { tr: "Sağdan sola", en: "RTL" },
    alphabetSystemId: "gokturk-runic",
  },
  "old-uyghur": {
    id: "old-uyghur",
    label: { tr: "Eski Uygur", en: "Old Uyghur" },
    glyphSample: "𐽰𐽰𐾁𐾀𐽳𐽺",
    direction: { tr: "Dikey (yukarıdan aşağı)", en: "Vertical (TTB-LTR)" },
    alphabetSystemId: "old-uyghur",
  },
  brahmi: {
    id: "brahmi",
    label: { tr: "Brahmi Abugidası", en: "Brahmi Abugida" },
    glyphSample: "क",
    direction: { tr: "Soldan sağa", en: "LTR" },
    alphabetSystemId: "brahmi-manichaean",
  },
  manichaean: {
    id: "manichaean",
    label: { tr: "Maniheist", en: "Manichaean" },
    glyphSample: "𐫀𐫗",
    direction: { tr: "Sağdan sola", en: "RTL" },
    alphabetSystemId: "brahmi-manichaean",
  },
  syriac: {
    id: "syriac",
    label: { tr: "Süryani (Nasturi)", en: "Syriac (Nestorian)" },
    glyphSample: "ܐ",
    direction: { tr: "Sağdan sola", en: "RTL" },
    alphabetSystemId: "brahmi-manichaean",
  },
  arabic: {
    id: "arabic",
    label: { tr: "Arap Temelli", en: "Arabic-Based" },
    glyphSample: "توركجه",
    direction: { tr: "Sağdan sola", en: "RTL" },
    alphabetSystemId: "arabic",
  },
  "latin-historical": {
    id: "latin-historical",
    label: { tr: "Tarihsel Latin (Codex)", en: "Historical Latin" },
    glyphSample: "Aa Bb",
    direction: { tr: "Soldan sağa", en: "LTR" },
  },
  armenian: {
    id: "armenian",
    label: { tr: "Ermeni Harfli Kıpçakça", en: "Armeno-Kipchak" },
    glyphSample: "Ա Բ",
    direction: { tr: "Soldan sağa", en: "LTR" },
  },
  "latin-turkish": {
    id: "latin-turkish",
    label: { tr: "1928 Türk Latin", en: "1928 Turkish Latin" },
    glyphSample: "Ç Ğ İ Ö Ş Ü",
    direction: { tr: "Soldan sağa", en: "LTR" },
    alphabetSystemId: "latin-turkish",
  },
  cyrillic: {
    id: "cyrillic",
    label: { tr: "Kiril Temelli", en: "Cyrillic-Based" },
    glyphSample: "Ә Ө Ү Қ Ң",
    direction: { tr: "Soldan sağa", en: "LTR" },
    alphabetSystemId: "cyrillic",
  },
  "latin-common": {
    id: "latin-common",
    label: { tr: "Çağdaş Ortak Latin", en: "Contemporary Latin" },
    glyphSample: "Ä Ö Ü Ş Ç",
    direction: { tr: "Soldan sağa", en: "LTR" },
    alphabetSystemId: "latin-turkish",
  },
};

export function getScriptMeta(scriptId: string): ScriptBadgeMeta {
  return (
    SCRIPT_META_MAP[scriptId] ?? {
      id: scriptId,
      label: { tr: scriptId, en: scriptId },
      glyphSample: "—",
      direction: { tr: "—", en: "—" },
    }
  );
}

export function resolveAlphabetSystem(scriptId: string): AlphabetSystem | undefined {
  const meta = SCRIPT_META_MAP[scriptId];
  const targetId = meta?.alphabetSystemId ?? scriptId;
  return ALPHABET_SYSTEMS.find((a) => a.id === targetId);
}

export function formatYearRange(
  startYear: number,
  endYear: number | null,
  locale: Locale
): string {
  const fmt = (y: number): string => {
    if (y < 0) {
      return locale === "tr" ? `MÖ ${Math.abs(y)}` : `${Math.abs(y)} BCE`;
    }
    return `${y}`;
  };
  if (endYear === null) {
    return `${fmt(startYear)}–${locale === "tr" ? "Günümüz" : "Present"}`;
  }
  return `${fmt(startYear)}–${fmt(endYear)}`;
}
