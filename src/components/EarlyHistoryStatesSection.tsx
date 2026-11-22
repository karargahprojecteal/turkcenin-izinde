"use client";

import React, { useState } from "react";
import { Shield, AlertTriangle, BookOpen, MapPin, Crown, Layers } from "lucide-react";
import { Locale } from "@/data/i18n";
import { HISTORICAL_STATES } from "@/data/earlyHistoryStates";
import { ACADEMIC_SOURCES, EVIDENCE_LABELS, type EvidenceLevel } from "@/data/bibliography";

interface EarlyHistoryStatesSectionProps {
  locale: Locale;
  onNavigateToSource: (sourceId: string) => void;
}

const EVIDENCE_BADGE_STYLES: Record<EvidenceLevel, string> = {
  primary_supported: "bg-emerald-50 text-emerald-800 border-emerald-200",
  multi_academic: "bg-[#0e7490]/10 text-[#0e7490] border-[#0e7490]/30",
  strong_consensus: "bg-[#0f172a]/10 text-[#0f172a] border-[#0f172a]/25",
  debated: "bg-amber-50 text-amber-800 border-amber-300",
  hypothesis: "bg-rose-50 text-rose-800 border-rose-200",
};

export function EarlyHistoryStatesSection({
  locale,
  onNavigateToSource,
}: EarlyHistoryStatesSectionProps) {
  const [selectedId, setSelectedId] = useState<string>(HISTORICAL_STATES[1].id); // Default: Mete Han & Xiongnu
  const [filterLevel, setFilterLevel] = useState<EvidenceLevel | "all">("all");

  const filteredStates =
    filterLevel === "all"
      ? HISTORICAL_STATES
      : HISTORICAL_STATES.filter((s) => s.evidenceLevel === filterLevel);

  const activeState =
    filteredStates.find((s) => s.id === selectedId) ||
    filteredStates[0] ||
    HISTORICAL_STATES[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#e2dacb] pb-6 md:flex-row md:items-end">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#b45309]">
            {locale === "tr"
              ? "MÖ 3. Yüzyıl Öncesi · Hunlar · Türk Devletleri"
              : "Pre-3rd Century BCE · Xiongnu · Turkic States"}
          </span>
          <h2 className="mt-1 font-serif text-3xl font-bold text-[#0f172a]">
            {locale === "tr"
              ? "Erken Tarih, Mete Han ve Türk Devletleri Atlası"
              : "Early History, Modu Chanyu & Atlas of Turkic States"}
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-[#0f172a]/75">
            {locale === "tr"
              ? "Tarihsel araştırma Orhun Yazıtları ile başlamaz: Proto-Türkçe tartışmalarından İskit/Saka çevresine, MÖ 209 Mete Han (Büyük Hun) devletleşmesinden Tabgaç, Göktürk, Uygur, Karahanlı, Selçuklu, Altın Orda, Çağatay ve Osmanlı dönemlerine uzanan süreklilik ve ayrışmalar."
              : "From Proto-Turkic debates and Scythian/Saka contacts to Modu Chanyu (209 BCE), Tabgač, Göktürk, Uyghur, Karakhanid, Seljuk, Golden Horde, Chagatai, and Ottoman formations."}
          </p>
        </div>
      </div>

      {/* Special Spotlight: Mete Han & Proto-Turkic Distinction */}
      <div className="grid gap-5 lg:grid-cols-12">
        <div className="rounded-2xl border border-[#b45309]/30 bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-6 text-[#f8f6f1] shadow-md lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#b45309]/25 px-3 py-1 text-xs font-semibold text-[#fbbf24]">
              <Crown className="h-3.5 w-3.5" />
              {locale === "tr" ? "Özel Araştırma: MÖ 209" : "Special Dossier: 209 BCE"}
            </span>
            <span className="rounded border border-white/20 px-2 py-0.5 font-mono text-[11px] text-[#7dd3fc]">
              Shiji (Bölüm 110) · Sima Qian
            </span>
          </div>
          <h3 className="mt-3 font-serif text-2xl font-bold">
            {locale === "tr"
              ? "Mete Han (Modu Chanyu) ve Büyük Hun İmparatorluğu"
              : "Modu Chanyu (Mete Han) & the Xiongnu Empire"}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#cbd5e1]">
            {locale === "tr"
              ? "Teoman'ın ardından MÖ 209 yılında tahta çıkan Mete Han, dağınık bozkır boylarını tek bir siyasal birlik altında topladı. Çin yıllıklarında belgelenen Sağ–Sol Kanat ikili yönetimi, Onlu Askerî Teşkilat (onbaşı, yüzbaşı, binbaşı, tümen) ve Heqin antlaşmaları, sonraki Göktürk ve Uygur kağanlıklarına kurumsal model oluşturdu."
              : "Ascending in 209 BCE after Touman, Modu Chanyu unified the steppe tribes into a centralized empire. Its dual Left/Right wing administration and decimal military structure recorded in Sima Qian's Shiji provided the institutional template for later Turkic khaganates."}
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-white/5 p-3">
              <div className="text-[11px] font-bold uppercase text-[#fbbf24]">
                {locale === "tr" ? "Kuruluş Tarihi" : "Accession"}
              </div>
              <div className="mt-1 font-mono text-sm font-bold">MÖ 209 – 174</div>
            </div>
            <div className="rounded-xl bg-white/5 p-3">
              <div className="text-[11px] font-bold uppercase text-[#7dd3fc]">
                {locale === "tr" ? "Devlet Yapısı" : "Statecraft"}
              </div>
              <div className="mt-1 text-xs text-[#e2e8f0]">
                {locale === "tr" ? "Chanyu + İkili Kanat + Onlu Sistem" : "Chanyu + Dual Wing + Decimal"}
              </div>
            </div>
            <div className="rounded-xl bg-white/5 p-3">
              <div className="text-[11px] font-bold uppercase text-amber-300">
                {locale === "tr" ? "Dil Tartışması" : "Language Debate"}
              </div>
              <div className="mt-1 text-xs text-[#e2e8f0]">
                {locale === "tr" ? "Proto-Türkçe / Yeniseyce / Çok Dilli" : "Proto-Turkic / Yeniseian / Multilingual"}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-[#e2dacb] bg-white p-6 shadow-sm lg:col-span-5">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0e7490]">
              <AlertTriangle className="h-4 w-4 text-[#b45309]" />
              <span>
                {locale === "tr"
                  ? "Bilimsel Metodoloji & Ayrım İlkeleri"
                  : "Scientific Method & Distinction Rules"}
              </span>
            </div>
            <ul className="space-y-2.5 text-xs leading-relaxed text-[#0f172a]/85">
              <li className="rounded-lg bg-[#f8f6f1] p-2.5">
                <strong>{locale === "tr" ? "Coğrafya ≠ Dil:" : "Geography ≠ Language:"}</strong>{" "}
                {locale === "tr"
                  ? "Bir topluluğun Orta Asya'da yaşamış olması dilinin kesinlikle Türkçe olduğunu kanıtlamaz (örn. İskit/Saka ağırlıklı olarak Doğu İrani kabul edilir)."
                  : "Presence in Central Asia does not automatically prove Turkic speech (e.g., Scythian/Saka is classified primarily as Eastern Iranian)."}
              </li>
              <li className="rounded-lg bg-[#f8f6f1] p-2.5">
                <strong>{locale === "tr" ? "Hanedan ≠ Halk Dili:" : "Dynasty ≠ Chancery:"}</strong>{" "}
                {locale === "tr"
                  ? "Gazneli ve Büyük Selçuklu gibi Türk hanedanlarında resmî saray yazışmaları Farsça/Arapça yürütülürken Oğuzca konuşma dili olarak yayılmıştır."
                  : "Turkic dynasties such as the Ghaznavids and Great Seljuks used Persian/Arabic in chanceries while Oghuz Turkic spread vernacularly."}
              </li>
              <li className="rounded-lg bg-[#f8f6f1] p-2.5">
                <strong>{locale === "tr" ? "Proto-Türkçe Katmanları:" : "Proto-Turkic Strata:"}</strong>{" "}
                {locale === "tr"
                  ? "Ön Türkçe, Erken Ana Türkçe (Oğur ayrışması öncesi) ve Geç Ana Türkçe ayrımı karşılaştırmalı rekonstrüksiyona dayanır."
                  : "Pre-Proto-Turkic, Early Common Turkic, and Late Common Turkic are comparative linguistic reconstructions."}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Filter by Evidence Level */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0f172a]/70">
          <Layers className="h-3.5 w-3.5 text-[#0e7490]" />
          {locale === "tr" ? "Kanıt Düzeyi Filtresi:" : "Evidence Filter:"}
        </span>
        <button
          type="button"
          onClick={() => setFilterLevel("all")}
          className={`focus-museum rounded-lg border px-3 py-1 text-xs font-semibold ${
            filterLevel === "all"
              ? "border-[#0f172a] bg-[#0f172a] text-white"
              : "border-[#e2dacb] bg-white text-[#0f172a]"
          }`}
        >
          {locale === "tr" ? `Tümü (${HISTORICAL_STATES.length})` : `All (${HISTORICAL_STATES.length})`}
        </button>
        {(["primary_supported", "multi_academic", "debated"] as EvidenceLevel[]).map((lvl) => (
          <button
            key={lvl}
            type="button"
            onClick={() => setFilterLevel(lvl)}
            className={`focus-museum rounded-lg border px-3 py-1 text-xs font-semibold ${
              filterLevel === lvl
                ? "border-[#0e7490] bg-[#0e7490] text-white"
                : "border-[#e2dacb] bg-white text-[#0f172a]"
            }`}
          >
            {EVIDENCE_LABELS[lvl][locale]}
          </button>
        ))}
      </div>

      {/* State Selector + Detail Grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-2 lg:col-span-5">
          {filteredStates.map((st) => {
            const isActive = st.id === activeState.id;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => setSelectedId(st.id)}
                className={`focus-museum w-full rounded-xl border p-3.5 text-left transition-all ${
                  isActive
                    ? "border-[#0e7490] bg-[#0f172a] text-white shadow-md"
                    : "border-[#e2dacb] bg-white text-[#0f172a] hover:border-[#0e7490]/50"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-bold opacity-80">
                    {String(st.order).padStart(2, "0")} · {st.dateRange}
                  </span>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                      isActive
                        ? "border-white/25 bg-white/10 text-[#fbbf24]"
                        : EVIDENCE_BADGE_STYLES[st.evidenceLevel]
                    }`}
                  >
                    {EVIDENCE_LABELS[st.evidenceLevel][locale]}
                  </span>
                </div>
                <div className="mt-1 font-serif text-base font-bold">{st.name[locale]}</div>
              </button>
            );
          })}
        </div>

        {/* Active State Detail */}
        <div className="rounded-2xl border border-[#e2dacb] bg-white p-6 shadow-sm lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e2dacb] pb-4">
            <div>
              <span className="font-mono text-xs font-bold text-[#b45309]">
                {activeState.dateRange}
              </span>
              <h3 className="mt-1 font-serif text-2xl font-bold text-[#0f172a]">
                {activeState.name[locale]}
              </h3>
            </div>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                EVIDENCE_BADGE_STYLES[activeState.evidenceLevel]
              }`}
            >
              {EVIDENCE_LABELS[activeState.evidenceLevel][locale]}
            </span>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-[#f8f6f1] p-4">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#0e7490]">
                <MapPin className="h-3.5 w-3.5" />
                <span>{locale === "tr" ? "Coğrafya" : "Geography"}</span>
              </div>
              <p className="mt-1.5 text-sm text-[#0f172a]/85">{activeState.geography[locale]}</p>
            </div>
            <div className="rounded-xl bg-[#f8f6f1] p-4">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#0e7490]">
                <Shield className="h-3.5 w-3.5" />
                <span>{locale === "tr" ? "Yönetim & Siyasi Yapı" : "Governance"}</span>
              </div>
              <p className="mt-1.5 text-sm text-[#0f172a]/85">{activeState.governance[locale]}</p>
            </div>
          </div>

          <div className="mt-4 space-y-3 text-sm">
            <div className="rounded-xl border border-[#e2dacb] p-4">
              <div className="text-xs font-bold uppercase text-[#b45309]">
                {locale === "tr" ? "Dilsel Miras" : "Linguistic Heritage"}
              </div>
              <p className="mt-1 leading-relaxed text-[#0f172a]/85">
                {activeState.linguisticHeritage[locale]}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[#e2dacb] p-4">
                <div className="text-xs font-bold uppercase text-[#0f172a]/70">
                  {locale === "tr" ? "Yazılı Kaynaklar" : "Written Sources"}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-[#0f172a]/85">
                  {activeState.writtenSources[locale]}
                </p>
              </div>
              <div className="rounded-xl border border-[#e2dacb] p-4">
                <div className="text-xs font-bold uppercase text-[#0f172a]/70">
                  {locale === "tr" ? "Edebî Üretim" : "Literary Output"}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-[#0f172a]/85">
                  {activeState.literaryOutput[locale]}
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[#e2dacb] p-4">
                <div className="text-xs font-bold uppercase text-[#0f172a]/70">
                  {locale === "tr" ? "Kültürel Etkileşim" : "Cultural Interaction"}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-[#0f172a]/85">
                  {activeState.culturalInteraction[locale]}
                </p>
              </div>
              <div className="rounded-xl border border-[#e2dacb] p-4">
                <div className="text-xs font-bold uppercase text-[#0f172a]/70">
                  {locale === "tr" ? "Sonraki Dönemlere Etkisi" : "Later Impact"}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-[#0f172a]/85">
                  {activeState.laterImpact[locale]}
                </p>
              </div>
            </div>
          </div>

          {activeState.cautionNote && (
            <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-3.5 text-xs text-amber-900">
              <strong>{locale === "tr" ? "Akademik Uyarı: " : "Scholarly Caution: "}</strong>
              {activeState.cautionNote[locale]}
            </div>
          )}

          {/* Sources */}
          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-[#e2dacb] pt-4">
            <BookOpen className="h-3.5 w-3.5 text-[#b45309]" />
            {activeState.sourceIds.map((srcId) => {
              const src = ACADEMIC_SOURCES.find((s) => s.id === srcId);
              if (!src) return null;
              return (
                <button
                  key={src.id}
                  type="button"
                  onClick={() => onNavigateToSource(src.id)}
                  className="focus-museum rounded-lg border border-[#e2dacb] bg-[#f8f6f1] px-2.5 py-1 text-[11px] font-medium text-[#0f172a] hover:border-[#0e7490] hover:text-[#0e7490]"
                >
                  {src.authorOrInstitution}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
