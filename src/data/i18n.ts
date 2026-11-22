export type Locale = "tr" | "en";

export const UI_COPY = {
  tr: {
    brandTitle: "TÜRKÇENİN İZİNDE",
    brandSubtitle: "Türk Dilleri, Tarihi ve Edebiyat Atlası",
    nav: {
      home: "Genel Bakış",
      earlyStates: "Hunlar & Devletler",
      timeline: "Tarih Çizelgesi",
      tree: "Dil Ağacı & Karşılaştırma",
      alphabets: "Yazı & Yazıtlar",
      atlas: "Coğrafi Atlas",
      literature: "Edebiyat Tarihi",
      artifacts: "Eser Galerisi",
      sources: "Kaynakça & Metodoloji",
    },
    badges: {
      reconstructed: "Yeniden Yapılandırılmış (Kuramsal)",
      attested: "Yazılı Belgeyle Kanıtlanmış",
      living: "Yaşayan Dil",
      historical: "Tarihsel Dil",
      endangered: "Tehlike Altında",
    },
    distinctionNotice:
      "Bilimsel Ayrım: Dil, lehçe, yazı sistemi ve alfabe aynı kavramlar değildir. Alfabenin değişmesi dilin genetik ailesini değiştirmez; bir topluluğun Orta Asya'da yaşamış olması dilinin kesinlikle Türkçe olduğunu kanıtlamaz.",
    searchPlaceholder: "Dönem, devlet, dil, alfabe, yazıt veya eser ara...",
    sourcesHeading: "Akademik Kaynaklar & Kanıt Standardı",
  },
  en: {
    brandTitle: "TRACING TURKIC",
    brandSubtitle: "Turkic Linguistic, Historical & Literary Atlas",
    nav: {
      home: "Overview",
      earlyStates: "Xiongnu & States",
      timeline: "Timeline",
      tree: "Tree & Lexicon",
      alphabets: "Scripts & Epigraphy",
      atlas: "Geographic Atlas",
      literature: "Literature",
      artifacts: "Artifacts",
      sources: "Sources & Method",
    },
    badges: {
      reconstructed: "Reconstructed (Theoretical)",
      attested: "Attested by Written Records",
      living: "Living Language",
      historical: "Historical Language",
      endangered: "Endangered",
    },
    distinctionNotice:
      "Scientific Distinction: Language, dialect, writing system, and alphabet are distinct concepts. Presence in Central Asia alone does not prove Turkic linguistic identity.",
    searchPlaceholder: "Search periods, states, languages, scripts, or works...",
    sourcesHeading: "Academic Sources & Evidence Standard",
  },
} as const;
