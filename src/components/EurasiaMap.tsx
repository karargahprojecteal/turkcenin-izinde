"use client";

import React, { useMemo, useState } from "react";
import { Compass, Layers, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import {
  ATLAS_HUBS,
  AtlasHub,
  MAP_BOUNDS,
  MapLayerMode,
  projectGeo,
} from "@/data/atlasHubs";
import { TURKIC_BRANCHES } from "@/data/languageFamily";
import { Locale } from "@/data/i18n";

interface EurasiaMapProps {
  locale: Locale;
  layerMode: MapLayerMode;
  onLayerChange: (mode: MapLayerMode) => void;
  selectedHubId: string | null;
  selectedBranchId: string;
  onSelectHub: (hub: AtlasHub) => void;
}

function toSvgPolygon(coords: [number, number][]): string {
  return coords
    .map(([lat, lng]) => {
      const { x, y } = projectGeo(lat, lng);
      return `${x},${y}`;
    })
    .join(" ");
}

function toSvgPath(coords: [number, number][], close = false): string {
  if (coords.length === 0) return "";
  const pts = coords.map(([lat, lng]) => projectGeo(lat, lng));
  const d = pts
    .map((p, idx) => `${idx === 0 ? "M" : "L"}${p.x},${p.y}`)
    .join(" ");
  return close ? `${d} Z` : d;
}

function curvedRoutePath(
  from: [number, number],
  to: [number, number],
  arcOffset = -28
): string {
  const p1 = projectGeo(from[0], from[1]);
  const p2 = projectGeo(to[0], to[1]);
  const mx = (p1.x + p2.x) / 2;
  const my = (p1.y + p2.y) / 2 + arcOffset;
  return `M${p1.x},${p1.y} Q${mx},${my} ${p2.x},${p2.y}`;
}

// Simplified, geographically projected Eurasia landmass & inland seas
const EURASIA_LANDMASS: [number, number][] = [
  [36, 18],
  [40, 20],
  [41, 26],
  [41, 29],
  [45, 29],
  [46, 33],
  [45, 36],
  [47, 39],
  [43, 41],
  [41, 41],
  [40, 44],
  [37, 45],
  [34, 46],
  [30, 48],
  [26, 56],
  [25, 61],
  [24, 67],
  [24, 74],
  [28, 80],
  [27, 88],
  [24, 94],
  [24, 105],
  [26, 120],
  [31, 122],
  [35, 120],
  [38, 118],
  [40, 124],
  [43, 132],
  [49, 140],
  [55, 138],
  [60, 144],
  [67, 144],
  [71, 135],
  [72, 115],
  [72, 95],
  [70, 72],
  [69, 55],
  [68, 40],
  [65, 28],
  [60, 22],
  [54, 18],
  [48, 18],
  [43, 18],
];

const ANATOLIA_PENINSULA: [number, number][] = [
  [41.2, 26.2],
  [41.5, 29.0],
  [42.0, 35.1],
  [41.2, 41.5],
  [38.5, 44.0],
  [36.8, 40.0],
  [36.2, 36.1],
  [36.5, 32.0],
  [36.7, 27.5],
  [39.5, 26.2],
];

const BLACK_SEA: [number, number][] = [
  [41.4, 28.0],
  [43.2, 28.0],
  [45.8, 30.5],
  [46.2, 33.5],
  [45.1, 36.5],
  [46.8, 38.5],
  [44.2, 39.0],
  [41.6, 41.5],
  [41.2, 36.5],
  [41.7, 32.5],
];

const CASPIAN_SEA: [number, number][] = [
  [46.8, 48.0],
  [47.0, 52.5],
  [44.5, 51.0],
  [41.8, 52.8],
  [39.5, 53.6],
  [36.8, 53.8],
  [36.7, 50.2],
  [38.8, 49.0],
  [41.5, 48.8],
  [44.2, 47.2],
];

const ARAL_SEA: [number, number][] = [
  [46.5, 59.5],
  [46.4, 61.5],
  [44.2, 61.2],
  [43.8, 58.6],
  [45.5, 58.3],
];

const LAKE_BAIKAL: [number, number][] = [
  [55.6, 109.2],
  [54.2, 108.6],
  [52.1, 106.2],
  [51.5, 104.0],
  [53.4, 107.2],
];

// Subtle major river strokes
const VOLGA_RIVER: [number, number][] = [
  [57.5, 36.0],
  [56.3, 44.0],
  [55.8, 49.1],
  [51.5, 46.0],
  [46.4, 48.0],
];

const SYR_DARYA_RIVER: [number, number][] = [
  [41.0, 72.0],
  [41.5, 68.5],
  [44.8, 65.5],
  [46.1, 61.1],
];

const LENA_RIVER: [number, number][] = [
  [54.0, 107.5],
  [59.5, 114.0],
  [62.0, 129.7],
  [68.0, 124.0],
  [72.0, 126.5],
];

const HISTORICAL_ROUTES: Array<{
  id: string;
  from: [number, number];
  to: [number, number];
  arc: number;
  label: { tr: string; en: string };
}> = [
  {
    id: "r-turfan",
    from: [47.55, 102.84],
    to: [42.95, 89.19],
    arc: -24,
    label: { tr: "8. yy. Uygur Göçü", en: "8th c. Uyghur Shift" },
  },
  {
    id: "r-kasgar",
    from: [42.95, 89.19],
    to: [39.47, 75.99],
    arc: -18,
    label: { tr: "Karahanlı Havzası", en: "Karakhanid Basin" },
  },
  {
    id: "r-harezm",
    from: [39.47, 75.99],
    to: [41.55, 60.63],
    arc: -26,
    label: { tr: "Harezm–Çağatay Hattı", en: "Khwarazm–Chagatai" },
  },
  {
    id: "r-istanbul",
    from: [41.55, 60.63],
    to: [41.01, 28.97],
    arc: 38,
    label: { tr: "Oğuz Batı Yayılımı", en: "Westward Oghuz Spread" },
  },
  {
    id: "r-kirim",
    from: [41.55, 60.63],
    to: [45.0, 35.0],
    arc: -32,
    label: { tr: "Deşt-i Kıpçak Hattı", en: "Pontic Kipchak Belt" },
  },
  {
    id: "r-idil",
    from: [47.55, 102.84],
    to: [55.79, 49.12],
    arc: -52,
    label: { tr: "Kuzey Bozkır / Oğur–Kıpçak", en: "Northern Steppe Belt" },
  },
  {
    id: "r-yakut",
    from: [47.55, 102.84],
    to: [62.03, 129.73],
    arc: -28,
    label: { tr: "Erken Sibirya Ayrışması", en: "Early Siberian Divergence" },
  },
  {
    id: "r-halac",
    from: [41.55, 60.63],
    to: [34.64, 50.88],
    arc: 22,
    label: { tr: "Arğu / Halaç İzolasyonu", en: "Arghu / Khalaj Island" },
  },
];

const MODERN_ZONES: Array<{
  branchId: string;
  lat: number;
  lng: number;
  rx: number;
  ry: number;
  rotate?: number;
  label: { tr: string; en: string };
}> = [
  {
    branchId: "oghuz",
    lat: 39.8,
    lng: 39.0,
    rx: 125,
    ry: 42,
    rotate: -6,
    label: { tr: "Oğuz Kuşağı", en: "Oghuz Belt" },
  },
  {
    branchId: "kipchak",
    lat: 49.5,
    lng: 56.0,
    rx: 175,
    ry: 58,
    rotate: -8,
    label: { tr: "Kıpçak Bozkırı", en: "Kipchak Steppe" },
  },
  {
    branchId: "oghur",
    lat: 55.9,
    lng: 47.4,
    rx: 44,
    ry: 28,
    label: { tr: "Oğur (Çuvaş)", en: "Oghur (Chuvash)" },
  },
  {
    branchId: "karluk",
    lat: 40.8,
    lng: 76.5,
    rx: 125,
    ry: 38,
    rotate: 6,
    label: { tr: "Karluk Vahaları", en: "Karluk Oases" },
  },
  {
    branchId: "siberian",
    lat: 57.5,
    lng: 112.0,
    rx: 155,
    ry: 68,
    rotate: -18,
    label: { tr: "Sibirya Kolu", en: "Siberian Branch" },
  },
  {
    branchId: "arghu",
    lat: 34.64,
    lng: 50.88,
    rx: 32,
    ry: 24,
    label: { tr: "Arğu (Halaç)", en: "Arghu (Khalaj)" },
  },
];

export default function EurasiaMap({
  locale,
  layerMode,
  onLayerChange,
  selectedHubId,
  selectedBranchId,
  onSelectHub,
}: EurasiaMapProps) {
  const [hoveredHubId, setHoveredHubId] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1);

  const branchMap = useMemo(() => {
    const map = new Map<string, (typeof TURKIC_BRANCHES)[number]>();
    for (const b of TURKIC_BRANCHES) map.set(b.id, b);
    return map;
  }, []);

  const latLines = [30, 40, 50, 60, 70];
  const lngLines = [30, 45, 60, 75, 90, 105, 120, 135];

  const hoveredHub = useMemo(
    () => ATLAS_HUBS.find((h) => h.id === hoveredHubId) ?? null,
    [hoveredHubId]
  );

  const hubMatchesBranch = (hub: AtlasHub) =>
    selectedBranchId === "all" || hub.branchIds.includes(selectedBranchId);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800/90 bg-[#0b1320] shadow-2xl">
      {/* Top Map Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 bg-[#131e30]/90 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-[#14b8a6]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            {locale === "tr" ? "Harita Katmanı" : "Map Layer"}
          </span>
          <div className="ml-2 inline-flex rounded-lg border border-slate-700/80 bg-[#0b1320] p-0.5">
            <button
              type="button"
              onClick={() => onLayerChange("historical")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                layerMode === "historical"
                  ? "bg-[#f59e0b]/20 text-[#f59e0b] ring-1 ring-[#f59e0b]/50"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {locale === "tr" ? "Tarihsel Yayılım" : "Historical Spread"}
            </button>
            <button
              type="button"
              onClick={() => onLayerChange("modern")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                layerMode === "modern"
                  ? "bg-[#14b8a6]/20 text-[#14b8a6] ring-1 ring-[#14b8a6]/50"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {locale === "tr" ? "Çağdaş Türk Dilleri" : "Modern Distribution"}
            </button>
          </div>
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(1, Number((z - 0.2).toFixed(1))))}
            aria-label={locale === "tr" ? "Uzaklaştır" : "Zoom out"}
            className="rounded-lg border border-slate-700/80 bg-[#0b1320] p-1.5 text-slate-300 transition hover:border-[#14b8a6]/60 hover:text-[#14b8a6]"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="min-w-[3rem] text-center font-mono text-xs text-slate-400">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(1.8, Number((z + 0.2).toFixed(1))))}
            aria-label={locale === "tr" ? "Yakınlaştır" : "Zoom in"}
            className="rounded-lg border border-slate-700/80 bg-[#0b1320] p-1.5 text-slate-300 transition hover:border-[#14b8a6]/60 hover:text-[#14b8a6]"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          {zoom > 1 && (
            <button
              type="button"
              onClick={() => setZoom(1)}
              aria-label={locale === "tr" ? "Sıfırla" : "Reset zoom"}
              className="rounded-lg border border-slate-700/80 bg-[#0b1320] p-1.5 text-slate-300 transition hover:border-[#f59e0b]/60 hover:text-[#f59e0b]"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Interactive SVG Canvas */}
      <div className="relative w-full overflow-x-auto bg-[#09101c]">
        <div
          className="transition-transform duration-300 ease-out"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "center center",
          }}
        >
          <svg
            viewBox={`0 0 ${MAP_BOUNDS.width} ${MAP_BOUNDS.height}`}
            className="h-auto w-full min-w-[680px] select-none"
            role="img"
            aria-label={
              locale === "tr"
                ? "Avrasya Türk Dilleri Etkileşimli Haritası"
                : "Interactive Eurasia Turkic Languages Map"
            }
          >
            <defs>
              <radialGradient id="oceanGlow" cx="50%" cy="45%" r="65%">
                <stop offset="0%" stopColor="#101d33" />
                <stop offset="100%" stopColor="#070d17" />
              </radialGradient>
              <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#16243a" />
                <stop offset="100%" stopColor="#111b2d" />
              </linearGradient>
              <marker
                id="arrowGold"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f59e0b" opacity="0.85" />
              </marker>
            </defs>

            {/* Ocean Base */}
            <rect
              x="0"
              y="0"
              width={MAP_BOUNDS.width}
              height={MAP_BOUNDS.height}
              fill="url(#oceanGlow)"
            />

            {/* Graticule (Lat / Lng Grid) */}
            <g stroke="#1e293b" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.7">
              {latLines.map((lat) => {
                const pStart = projectGeo(lat, MAP_BOUNDS.minLng);
                const pEnd = projectGeo(lat, MAP_BOUNDS.maxLng);
                return (
                  <g key={`lat-${lat}`}>
                    <line x1={pStart.x} y1={pStart.y} x2={pEnd.x} y2={pEnd.y} />
                    <text
                      x={16}
                      y={pStart.y + 3}
                      fill="#475569"
                      fontSize="9"
                      fontFamily="monospace"
                      stroke="none"
                    >
                      {lat}°N
                    </text>
                  </g>
                );
              })}
              {lngLines.map((lng) => {
                const pTop = projectGeo(MAP_BOUNDS.maxLat, lng);
                const pBot = projectGeo(MAP_BOUNDS.minLat, lng);
                return (
                  <g key={`lng-${lng}`}>
                    <line x1={pTop.x} y1={pTop.y} x2={pBot.x} y2={pBot.y} />
                    <text
                      x={pBot.x - 12}
                      y={MAP_BOUNDS.height - 12}
                      fill="#475569"
                      fontSize="9"
                      fontFamily="monospace"
                      stroke="none"
                    >
                      {lng}°E
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Eurasia Landmass */}
            <polygon
              points={toSvgPolygon(EURASIA_LANDMASS)}
              fill="url(#landGrad)"
              stroke="#24344f"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <polygon
              points={toSvgPolygon(ANATOLIA_PENINSULA)}
              fill="#17263d"
              stroke="#293c5a"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />

            {/* Inland Seas & Lakes */}
            <polygon
              points={toSvgPolygon(BLACK_SEA)}
              fill="#091322"
              stroke="#1e3a5f"
              strokeWidth="1"
            />
            <polygon
              points={toSvgPolygon(CASPIAN_SEA)}
              fill="#091322"
              stroke="#1e3a5f"
              strokeWidth="1"
            />
            <polygon
              points={toSvgPolygon(ARAL_SEA)}
              fill="#0a1628"
              stroke="#1e3a5f"
              strokeWidth="0.9"
            />
            <polygon
              points={toSvgPolygon(LAKE_BAIKAL)}
              fill="#0a1628"
              stroke="#14b8a6"
              strokeOpacity="0.45"
              strokeWidth="1"
            />

            {/* Major Rivers */}
            <g fill="none" stroke="#1e3a5f" strokeWidth="1.2" opacity="0.75">
              <path d={toSvgPath(VOLGA_RIVER)} />
              <path d={toSvgPath(SYR_DARYA_RIVER)} />
              <path d={toSvgPath(LENA_RIVER)} />
            </g>

            {/* Subtle Regional Sea / Plateau Labels */}
            <g
              fill="#3b5274"
              fontSize="9.5"
              fontFamily="serif"
              fontStyle="italic"
              letterSpacing="1.5"
            >
              <text
                x={projectGeo(43.3, 33.8).x}
                y={projectGeo(43.3, 33.8).y}
                textAnchor="middle"
              >
                {locale === "tr" ? "KARADENİZ" : "BLACK SEA"}
              </text>
              <text
                x={projectGeo(41.8, 50.8).x}
                y={projectGeo(41.8, 50.8).y}
                textAnchor="middle"
              >
                {locale === "tr" ? "HAZAR" : "CASPIAN"}
              </text>
              <text
                x={projectGeo(53.5, 108.5).x + 14}
                y={projectGeo(53.5, 108.5).y}
              >
                {locale === "tr" ? "Baykal" : "Baikal"}
              </text>
            </g>

            {/* LAYER 2: Modern Distribution Shaded Zones */}
            {layerMode === "modern" && (
              <g>
                {MODERN_ZONES.map((zone) => {
                  const center = projectGeo(zone.lat, zone.lng);
                  const branch = branchMap.get(zone.branchId);
                  const color = branch?.colorToken ?? "#14b8a6";
                  const isDimmed =
                    selectedBranchId !== "all" &&
                    selectedBranchId !== zone.branchId;
                  return (
                    <g
                      key={zone.branchId}
                      opacity={isDimmed ? 0.14 : 0.85}
                      className="transition-opacity duration-300"
                    >
                      <ellipse
                        cx={center.x}
                        cy={center.y}
                        rx={zone.rx}
                        ry={zone.ry}
                        transform={
                          zone.rotate
                            ? `rotate(${zone.rotate} ${center.x} ${center.y})`
                            : undefined
                        }
                        fill={color}
                        fillOpacity={0.2}
                        stroke={color}
                        strokeWidth="1.5"
                        strokeDasharray="4 3"
                      />
                      <text
                        x={center.x}
                        y={center.y - zone.ry + 15}
                        textAnchor="middle"
                        fill="#e2e8f0"
                        fontSize="10"
                        fontWeight="600"
                        opacity={0.8}
                      >
                        {zone.label[locale]}
                      </text>
                    </g>
                  );
                })}
              </g>
            )}

            {/* LAYER 1: Historical Spread Vectors */}
            {layerMode === "historical" && (
              <g>
                {HISTORICAL_ROUTES.map((route) => {
                  const d = curvedRoutePath(route.from, route.to, route.arc);
                  return (
                    <path
                      key={route.id}
                      d={d}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="1.75"
                      strokeDasharray="6 4"
                      strokeOpacity="0.65"
                      markerEnd="url(#arrowGold)"
                    />
                  );
                })}
              </g>
            )}

            {/* Clickable Regional Hubs */}
            <g>
              {ATLAS_HUBS.map((hub) => {
                const { x, y } = projectGeo(
                  hub.coordinates.lat,
                  hub.coordinates.lng
                );
                const isSelected = selectedHubId === hub.id;
                const isHovered = hoveredHubId === hub.id;
                const activeMatch = hubMatchesBranch(hub);
                const branch = branchMap.get(hub.primaryBranchId);

                const accentColor =
                  layerMode === "historical"
                    ? "#f59e0b"
                    : branch?.colorToken ?? "#14b8a6";

                const markerFill = isSelected
                  ? "#14b8a6"
                  : layerMode === "historical"
                  ? "#f59e0b"
                  : "#14b8a6";

                return (
                  <g
                    key={hub.id}
                    transform={`translate(${x}, ${y})`}
                    onClick={() => onSelectHub(hub)}
                    onMouseEnter={() => setHoveredHubId(hub.id)}
                    onMouseLeave={() => setHoveredHubId(null)}
                    className="cursor-pointer transition-opacity duration-200"
                    opacity={activeMatch ? 1 : 0.25}
                    role="button"
                    tabIndex={0}
                    aria-label={hub.name[locale]}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onSelectHub(hub);
                      }
                    }}
                  >
                    {/* Pulse ring for selected hub */}
                    {isSelected && (
                      <circle
                        r="16"
                        fill="none"
                        stroke="#14b8a6"
                        strokeWidth="2"
                        className="hub-pulse"
                      />
                    )}

                    {/* Outer halo */}
                    <circle
                      r={isSelected || isHovered ? 12 : 9}
                      fill={accentColor}
                      fillOpacity={isSelected ? 0.28 : 0.16}
                      stroke={markerFill}
                      strokeWidth={isSelected ? 2 : 1.2}
                    />

                    {/* Inner core */}
                    <circle
                      r={isSelected ? 5.5 : 4.2}
                      fill={markerFill}
                      stroke="#0b1320"
                      strokeWidth="1.4"
                    />

                    {/* Hub Label Pill */}
                    <g
                      transform={`translate(0, ${
                        hub.id === "yakutistan" ? 18 : -16
                      })`}
                    >
                      <rect
                        x="-54"
                        y="-10"
                        width="108"
                        height="17"
                        rx="4"
                        fill={isSelected ? "#14b8a6" : "#0b1320"}
                        fillOpacity={isSelected ? 0.95 : 0.85}
                        stroke={isSelected ? "#5eead4" : "#334155"}
                        strokeWidth="0.9"
                      />
                      <text
                        y="2"
                        textAnchor="middle"
                        fill={isSelected ? "#0b1320" : "#f1f5f9"}
                        fontSize="9.5"
                        fontWeight={isSelected ? "700" : "600"}
                      >
                        {hub.name[locale]}
                      </text>
                    </g>
                  </g>
                );
              })}
            </g>

            {/* Cartographic Compass & Legend */}
            <g transform="translate(26, 512)">
              <rect
                x="0"
                y="0"
                width="215"
                height="48"
                rx="8"
                fill="#0b1320"
                fillOpacity="0.88"
                stroke="#1e293b"
              />
              <circle
                cx="22"
                cy="24"
                r="13"
                fill="#131e30"
                stroke="#14b8a6"
                strokeOpacity="0.5"
              />
              <text
                x="22"
                y="18"
                textAnchor="middle"
                fill="#f59e0b"
                fontSize="7"
                fontWeight="700"
              >
                N
              </text>
              <path d="M22,20 L25,28 L22,26 L19,28 Z" fill="#14b8a6" />
              <text x="44" y="20" fill="#cbd5e1" fontSize="10" fontWeight="600">
                {layerMode === "historical"
                  ? locale === "tr"
                    ? "Tarihsel Göç & Yazı Merkezleri"
                    : "Historical Spread & Script Hubs"
                  : locale === "tr"
                  ? "Çağdaş Dil Kolları Dağılımı"
                  : "Modern Branch Distribution"}
              </text>
              <text x="44" y="36" fill="#64748b" fontSize="9" fontFamily="monospace">
                18°E – 145°E · 24°N – 72°N
              </text>
            </g>
          </svg>
        </div>

        {/* Floating Hover Tooltip */}
        {hoveredHub && (
          <div className="pointer-events-none absolute right-4 top-4 z-20 hidden max-w-xs rounded-xl border border-[#14b8a6]/40 bg-[#131e30]/95 p-3 shadow-xl backdrop-blur sm:block">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-[#14b8a6]">
                {hoveredHub.name[locale]}
              </span>
              <span className="font-mono text-[10px] text-[#f59e0b]">
                {hoveredHub.coordLabel}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-300">
              {hoveredHub.subtitle[locale]}
            </p>
            <p className="mt-1.5 text-[11px] text-slate-400">
              {locale === "tr"
                ? "Ayrıntılı dilbilimsel panel için tıklayın"
                : "Click to open linguistic & source panel"}
            </p>
          </div>
        )}
      </div>

      {/* Quick Hub Selector Strip (Mobile & Keyboard Friendly) */}
      <div className="flex flex-wrap items-center gap-1.5 border-t border-slate-800/80 bg-[#131e30]/70 px-4 py-2.5">
        <span className="mr-1 flex items-center gap-1 text-[11px] font-medium text-slate-400">
          <Compass className="h-3.5 w-3.5 text-[#14b8a6]" />
          {locale === "tr" ? "Merkezler:" : "Hubs:"}
        </span>
        {ATLAS_HUBS.map((hub) => {
          const isSelected = selectedHubId === hub.id;
          const activeMatch = hubMatchesBranch(hub);
          return (
            <button
              key={hub.id}
              type="button"
              onClick={() => onSelectHub(hub)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                isSelected
                  ? "bg-[#14b8a6] text-[#0b1320] font-semibold"
                  : activeMatch
                  ? "bg-[#0b1320] text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/70"
                  : "bg-[#0b1320]/50 text-slate-600 border border-slate-800/50"
              }`}
            >
              {hub.name[locale]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
