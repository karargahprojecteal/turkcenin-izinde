export type Locale = "tr" | "en";

export const UI_COPY = {
  tr: {
    brandTitle: "TÜRKÇENİN İZİNDE",
    brandSubtitle: "Türk Dilleri ve Yazı Kültürleri Tarih Atlası",
    nav: {
      home: "Genel Bakış",
      timeline: "Tarih Çizelgesi",
      tree: "Dil Ağacı",
      alphabets: "Alfabe Laboratuvarı",
      atlas: "Coğrafi Atlas",
      artifacts: "Eser Galerisi",
      sources: "Kaynakça",
    },
    badges: {
      reconstructed: "Yeniden Yapılandırılmış (Kuramsal)",
      attested: "Yazılı Belgeyle Kanıtlanmış",
      living: "Yaşayan Dil",
      historical: "Tarihsel Dil",
    },
    distinctionNotice:
      "Bilimsel Ayrım: Dil, lehçe, yazı sistemi ve alfabe aynı kavramlar değildir. Alfabenin değişmesi dilin genetik ailesini değiştirmez.",
    searchPlaceholder: "Dönem, dil, alfabe veya eser ara...",
    sourcesHeading: "Akademik Kaynaklar",
  },
  en: {
    brandTitle: "TRACING TURKIC",
    brandSubtitle: "Interactive Turkic Linguistic & Script History Atlas",
    nav: {
      home: "Overview",
      timeline: "Timeline",
      tree: "Language Tree",
      alphabets: "Script Lab",
      atlas: "Geographic Atlas",
      artifacts: "Artifacts",
      sources: "Bibliography",
    },
    badges: {
      reconstructed: "Reconstructed (Theoretical)",
      attested: "Attested by Written Records",
      living: "Living Language",
      historical: "Historical Language",
    },
    distinctionNotice:
      "Scientific Distinction: Language, dialect, writing system, and alphabet are distinct concepts. Changing an alphabet does not change a language's genetic family.",
    searchPlaceholder: "Search periods, languages, scripts, or artifacts...",
    sourcesHeading: "Academic Sources",
  },
} as const;
