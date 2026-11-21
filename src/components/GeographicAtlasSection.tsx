"use client";

import React, { useMemo, useState } from "react";
import { MapPin, Layers, ArrowRight, Clock, GitBranch } from "lucide-react";
import { Locale, UI_COPY } from "@/data/i18n";
import { HISTORICAL_PERIODS } from "@/data/periods";

interface GeographicAtlasSectionProps {
  locale: Locale;
  onNavigateToPeriod: (periodId: string) => void;
  onNavigateToBranch: (branchId: string) => void;
}

type MapLayer = "both" | "historical" | "modern";

interface ModernRegionPin {
  id: string;
  branchId: string;
  name: { tr: string; en: string };
  languages: { tr: string; en: string };
  lat: number;
  lng: number;
  color: string;
}

const MODERN_PINS: ModernRegionPin[] = [
  {
    id: "mod-turkey",
    branchId: "oghuz",
    name: { tr: "Türkiye & Balkanlar", en: "Türkiye & Balkans" },
    languages: { tr: "Türkiye Türkçesi, Gagavuzca", en: "Turkish, Gagauz" },
    lat: 39.9,
    lng: 32.8,
    color: "#991b1b",
  },
  {
    id: "mod-azerbaijan",
    branchId: "oghuz",
    name: { tr: "Azerbaycan & KB İran", en: "Azerbaijan & NW Iran" },
    languages: { tr: "Azerbaycan Türkçesi", en: "Azerbaijani" },
    lat: 40.4,
    lng: 49.8,
    color: "#991b1b",
  },
  {
    id: "mod-turkmen",
    branchId: "oghuz",
    name: { tr: "Türkmenistan", en: "Turkmenistan" },
    languages: { tr: "Türkmence", en: "Turkmen" },
    lat: 38.0,
    lng: 58.4,
    color: "#991b1b",
  },
  {
    id: "mod-khalaj",
    branchId: "arghu",
    name: { tr: "Orta İran (Kum–Erak)", en: "Central Iran (Qom–Arak)" },
    languages: { tr: "Halaçça (Arğu)", en: "Khalaj (Arghu)" },
    lat: 34.4,
    lng: 50.2,
    color: "#7c2d12",
  },
  {
    id: "mod-volga",
    branchId: "oghur",
    name: { tr: "İdil-Ural Havzası", en: "Volga-Ural Basin" },
    languages: { tr: "Çuvaşça, Tatarca, Başkurtça", en: "Chuvash, Tatar, Bashkir" },
    lat: 55.8,
    lng: 49.1,
    color: "#b45309",
  },
  {
    id: "mod-uzbek",
    branchId: "karluk",
    name: { tr: "Mâverâünnehir (Özbekistan)", en: "Transoxiana (Uzbekistan)" },
    languages: { tr: "Özbekçe", en: "Uzbek" },
    lat: 41.3,
    lng: 69.2,
    color: "#0f766e",
  },
  {
    id: "mod-kazakh",
    branchId: "kipchak",
    name: { tr: "Kazakistan Bozkırı", en: "Kazakh Steppe" },
    languages: { tr: "Kazakça, Kırgızca", en: "Kazakh, Kyrgyz" },
    lat: 48.0,
    lng: 67.0,
    color: "#1e40af",
  },
  {
    id: "mod-uyghur",
    branchId: "karluk",
    name: { tr: "Tarım Havzası (Sincan)", en: "Tarim Basin (Xinjiang)" },
    languages: { tr: "Yeni Uygurca", en: "Modern Uyghur" },
    lat: 41.7,
    lng: 86.1,
    color: "#0f766e",
  },
  {
    id: "mod-south-siberia",
    branchId: "siberian",
    name: { tr: "Güney Sibirya (Tuva / Hakasya)", en: "South Siberia (Tuva / Khakassia)" },
    languages: { tr: "Tuvaca, Hakasça", en: "Tuvan, Khakas" },
    lat: 52.0,
    lng: 94.0,
    color: "#4338ca",
  },
  {
    id: "mod-sakha",
    branchId: "siberian",
    name: { tr: "Saha (Yakutistan)", en: "Sakha Republic (NE Siberia)" },
    languages: { tr: "Sahaca (Yakutça)", en: "Sakha (Yakut)" },
    lat: 62.0,
    lng: 129.7,
    color: "#4338ca",
  },
];

function projectCoords(lat: number, lng: number) {
  const minLng = 20;
  const maxLng = 135;
  const minLat = 25;
  const maxLat = 66;
  const x = ((lng - minLng) / (maxLng - minLng)) * 900 + 50;
  const y = ((maxLat - lat) / (maxLat - minLat)) * 410 + 45;
  return { x, y };
}

export function GeographicAtlasSection({
  locale,
  onNavigateToPeriod,
  onNavigateToBranch,
}: GeographicAtlasSectionProps) {
  const copy = UI_COPY[locale];
  const [layer, setLayer] = useState<MapLayer>("both");
  const [selectedPin, setSelectedPin] = useState<{
    kind: "historical" | "modern";
    id: string;
  }>({ kind: "historical", id: "gokturk" });

  const activeHistorical = useMemo(() => {
    if (selectedPin.kind !== "historical") return null;
    return HISTORICAL_PERIODS.find((p) => p.id === selectedPin.id) || HISTORICAL_PERIODS[1];
  }, [selectedPin]);

  const activeModern = useMemo(() => {
    if (selectedPin.kind !== "modern") return null;
    return MODERN_PINS.find((m) => m.id === selectedPin.id) || MODERN_PINS[0];
  }, [selectedPin]);

  const showHistorical = layer === "both" || layer === "historical";
  const showModern = layer === "both" || layer === "modern";

  // Chronological trajectory polyline across historical periods
  const historicalPath = HISTORICAL_PERIODS.map((p) => {
    const { x, y } = projectCoords(p.coordinates.lat, p.coordinates.lng);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  return (
    <div className="space-y-6">
      {/* Header & Layer Controls */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#e2dacb] pb-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#0f172a] sm:text-3xl">
            {copy.nav.atlas}
          </h2>
          <p className="mt-1 text-sm text-[#0f172a]/70">
            {locale === "tr"
              ? "Avrasya coğrafyasında tarihsel Türk yazı merkezleri ile çağdaş Türk dillerinin dağılımını karşılaştırın."
              : "Compare historical Turkic literary centers with contemporary Turkic language distribution across Eurasia."}
          </p>
        </div>

        <div className="flex items-center gap-1.5 rounded-xl border border-[#e2dacb] bg-white p-1">
          <Layers className="ml-2 h-4 w-4 text-[#0e7490]" />
          {(
            [
              { id: "both", label: locale === "tr" ? "Karşılaştır (Tümü)" : "Overlay (Both)" },
              { id: "historical", label: locale === "tr" ? "Tarihsel (10)" : "Historical (10)" },
              { id: "modern", label: locale === "tr" ? "Çağdaş (10)" : "Modern (10)" },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLayer(item.id)}
              className={`focus-museum rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                layer === item.id
                  ? "bg-[#0f172a] text-white"
                  : "text-[#0f172a]/75 hover:bg-[#f8f6f1]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map & Inspector Grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Interactive SVG Map */}
        <div className="rounded-2xl border border-[#e2dacb] bg-[#0f172a] p-4 shadow-md lg:col-span-8">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#cbd5e1]">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]" />
                {locale === "tr" ? "Tarihsel Merkez" : "Historical Center"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rotate-45 bg-[#38bdf8]" />
                {locale === "tr" ? "Çağdaş Dil Bölgesi" : "Modern Language Region"}
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#94a3b8]">
              20°E – 135°E · 25°N – 66°N
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0b1222]">
            <svg
              viewBox="0 0 1000 500"
              role="img"
              aria-label={
                locale === "tr"
                  ? "Avrasya Türk Dilleri Coğrafi Atlası"
                  : "Eurasian Turkic Geographic Atlas"
              }
              className="h-auto min-w-[640px] w-full"
            >
              {/* Graticule Grid */}
              {[30, 40, 50, 60].map((lat) => {
                const { y } = projectCoords(lat, 20);
                return (
                  <g key={`lat-${lat}`}>
                    <line
                      x1="50"
                      y1={y}
                      x2="950"
                      y2={y}
                      stroke="#1e293b"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                    <text x="16" y={y + 4} fill="#64748b" fontSize="10" fontFamily="monospace">
                      {lat}°N
                    </text>
                  </g>
                );
              })}
              {[30, 50, 70, 90, 110, 130].map((lng) => {
                const { x } = projectCoords(25, lng);
                return (
                  <g key={`lng-${lng}`}>
                    <line
                      x1={x}
                      y1="45"
                      x2={x}
                      y2="455"
                      stroke="#1e293b"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                    <text
                      x={x}
                      y="475"
                      textAnchor="middle"
                      fill="#64748b"
                      fontSize="10"
                      fontFamily="monospace"
                    >
                      {lng}°E
                    </text>
                  </g>
                );
              })}

              {/* Stylized Eurasian Landmass */}
              <path
                d="M 60 280 L 95 250 L 140 245 L 185 265 L 220 295 L 265 305 L 310 340 L 360 365 L 430 375 L 510 365 L 580 390 L 660 370 L 740 345 L 820 330 L 905 300 L 945 215 L 920 120 L 820 85 L 680 75 L 540 70 L 380 85 L 230 95 L 120 125 L 70 190 Z"
                fill="#17253b"
                stroke="#334155"
                strokeWidth="1.5"
              />

              {/* Stylized Inland Seas (Black Sea, Caspian, Aral, Baikal) */}
              {/* Black Sea */}
              <ellipse cx="182" cy="265" rx="34" ry="16" fill="#0e7490" fillOpacity="0.35" stroke="#38bdf8" strokeOpacity="0.3" />
              {/* Caspian Sea */}
              <path
                d="M 275 245 Q 290 275 280 315 Q 268 320 262 285 Q 260 255 275 245 Z"
                fill="#0e7490"
                fillOpacity="0.4"
                stroke="#38bdf8"
                strokeOpacity="0.35"
              />
              {/* Aral Sea */}
              <ellipse cx="362" cy="252" rx="14" ry="12" fill="#0e7490" fillOpacity="0.35" />
              {/* Lake Baikal */}
              <path
                d="M 695 165 Q 715 150 725 170 Q 710 185 695 165 Z"
                fill="#0e7490"
                fillOpacity="0.4"
              />

              {/* Historical Chronological Path */}
              {showHistorical && (
                <polyline
                  points={historicalPath}
                  fill="none"
                  stroke="#b45309"
                  strokeWidth="1.75"
                  strokeDasharray="5 4"
                  strokeOpacity="0.7"
                />
              )}

              {/* Historical Period Pins */}
              {showHistorical &&
                HISTORICAL_PERIODS.map((p) => {
                  const { x, y } = projectCoords(p.coordinates.lat, p.coordinates.lng);
                  const isSelected =
                    selectedPin.kind === "historical" && selectedPin.id === p.id;
                  return (
                    <g
                      key={p.id}
                      transform={`translate(${x}, ${y})`}
                      onClick={() => setSelectedPin({ kind: "historical", id: p.id })}
                      className="cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={p.title[locale]}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedPin({ kind: "historical", id: p.id });
                        }
                      }}
                    >
                      {isSelected && (
                        <circle
                          r="15"
                          fill="#fbbf24"
                          fillOpacity="0.25"
                          stroke="#fbbf24"
                          strokeWidth="1.5"
                        />
                      )}
                      <circle
                        r={isSelected ? "8" : "6"}
                        fill={p.status === "reconstructed" ? "#b45309" : "#fbbf24"}
                        stroke="#0f172a"
                        strokeWidth="2"
                      />
                      <text
                        y="-11"
                        textAnchor="middle"
                        fill={isSelected ? "#fde68a" : "#e2e8f0"}
                        fontSize="10"
                        fontWeight={isSelected ? "700" : "500"}
                      >
                        {p.order}. {p.title[locale].split(" ")[0]}
                      </text>
                    </g>
                  );
                })}

              {/* Modern Language Region Pins */}
              {showModern &&
                MODERN_PINS.map((m) => {
                  const { x, y } = projectCoords(m.lat, m.lng);
                  const isSelected =
                    selectedPin.kind === "modern" && selectedPin.id === m.id;
                  return (
                    <g
                      key={m.id}
                      transform={`translate(${x}, ${y})`}
                      onClick={() => setSelectedPin({ kind: "modern", id: m.id })}
                      className="cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={m.name[locale]}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedPin({ kind: "modern", id: m.id });
                        }
                      }}
                    >
                      {isSelected && (
                        <circle
                          r="15"
                          fill="#38bdf8"
                          fillOpacity="0.25"
                          stroke="#38bdf8"
                          strokeWidth="1.5"
                        />
                      )}
                      <rect
                        x="-5"
                        y="-5"
                        width="10"
                        height="10"
                        transform="rotate(45)"
                        fill="#38bdf8"
                        stroke="#0f172a"
                        strokeWidth="1.5"
                      />
                      <text
                        y="18"
                        textAnchor="middle"
                        fill={isSelected ? "#7dd3fc" : "#94a3b8"}
                        fontSize="9.5"
                        fontWeight={isSelected ? "700" : "500"}
                      >
                        {m.name[locale].split(" ")[0]}
                      </text>
                    </g>
                  );
                })}
            </svg>
          </div>
        </div>

        {/* Right: Geographic Inspector Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#e2dacb] bg-white p-6 shadow-sm lg:col-span-4">
          {activeHistorical && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#b45309]/15 px-3 py-1 text-xs font-bold text-[#b45309]">
                  {locale === "tr" ? "Tarihsel Merkez" : "Historical Center"} · #{activeHistorical.order}
                </span>
                <span className="font-mono text-xs text-[#0f172a]/60">
                  {activeHistorical.coordinates.lat.toFixed(2)}°N,{" "}
                  {activeHistorical.coordinates.lng.toFixed(2)}°E
                </span>
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-[#0f172a]">
                  {activeHistorical.title[locale]}
                </h3>
                <p className="mt-1 text-xs font-semibold text-[#0e7490]">
                  {activeHistorical.dateLabel[locale]}
                </p>
              </div>

              <div className="flex items-start gap-2 rounded-lg bg-[#f8f6f1] p-3 text-xs text-[#0f172a]/85">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0e7490]" />
                <span>{activeHistorical.region[locale]}</span>
              </div>

              <p className="text-sm leading-relaxed text-[#0f172a]/85">
                {activeHistorical.summary[locale]}
              </p>

              <button
                type="button"
                onClick={() => onNavigateToPeriod(activeHistorical.id)}
                className="focus-museum inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0f172a] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#0e7490]"
              >
                <Clock className="h-4 w-4" />
                <span>
                  {locale === "tr" ? "Dönem Detayını Aç" : "Open Period Details"}
                </span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {activeModern && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#0e7490]/15 px-3 py-1 text-xs font-bold text-[#0e7490]">
                  {locale === "tr" ? "Çağdaş Dil Bölgesi" : "Modern Language Region"}
                </span>
                <span className="font-mono text-xs text-[#0f172a]/60">
                  {activeModern.lat.toFixed(1)}°N, {activeModern.lng.toFixed(1)}°E
                </span>
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-[#0f172a]">
                  {activeModern.name[locale]}
                </h3>
                <p className="mt-1 text-sm font-medium text-[#0e7490]">
                  {activeModern.languages[locale]}
                </p>
              </div>

              <p className="text-sm leading-relaxed text-[#0f172a]/80">
                {locale === "tr"
                  ? "Bu coğrafi kuşakta konuşulan çağdaş Türk dilleri, tarihsel Oğuz, Kıpçak, Karluk, Sibirya, Oğur veya Arğu dallarının yaşayan mirasçılarıdır."
                  : "Contemporary Turkic languages spoken in this belt represent living continuations of the Oghuz, Kipchak, Karluk, Siberian, Oghur, or Arghu branches."}
              </p>

              <button
                type="button"
                onClick={() => onNavigateToBranch(activeModern.branchId)}
                className="focus-museum inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0e7490] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#0891b2]"
              >
                <GitBranch className="h-4 w-4" />
                <span>
                  {locale === "tr" ? "Dil Ağacında İncele" : "Inspect in Language Tree"}
                </span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
