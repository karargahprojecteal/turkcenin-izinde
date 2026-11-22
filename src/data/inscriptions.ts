export interface RunicInscription {
  id: string;
  name: { tr: string; en: string };
  date: string;
  discoveryAndDecipherment: { tr: string; en: string };
  location: { tr: string; en: string };
  scriptVariant: { tr: string; en: string };
  authorOrPatron: { tr: string; en: string };
  grammarNotes: { tr: string; en: string };
  historicalContent: { tr: string; en: string };
  excerptOriginal: string;
  excerptTransliteration: string;
  excerptTranslation: { tr: string; en: string };
  sourceIds: string[];
}

export const RUNIC_INSCRIPTIONS: RunicInscription[] = [
  {
    id: "coyr",
    name: { tr: "Çoyr (Choyr) Yazıtı", en: "Choyr Inscription" },
    date: "682 – 691",
    discoveryAndDecipherment: {
      tr: "Moğolistan Dornogovi/Çoyr bölgesinde bulunmuş; Osman Fikri Sertkaya (1996/1998) ve diğer Türkologlarca İkinci Kağanlık kuruluş yıllarına tarihlenmiştir.",
      en: "Found in Dornogovi, Mongolia; dated to the founding decade of the Second Khaganate (Sertkaya 1998).",
    },
    location: { tr: "Çoyr, Moğolistan (Ulan Batur Müzesi)", en: "Choyr, Mongolia (Ulaanbaatar Museum)" },
    scriptVariant: { tr: "Erken Orhon Runik (6 satır)", en: "Early Orkhon Runiform (6 lines)" },
    authorOrPatron: { tr: "Toluk (yazıcı / hazırlatan)", en: "Toluk (scribe/patron)" },
    grammarNotes: {
      tr: "Bilinen en eski tarihli Göktürk harfli taş yazıtlardan biri olup erken runik imla özelliklerini taşır.",
      en: "Among the earliest dated Old Turkic runiform stone inscriptions.",
    },
    historicalContent: {
      tr: "İlteriş Kağan dönemindeki kutlu katılım ve esenlik dileklerini içerir.",
      en: "Records allegiance during Ilterish Khagan's reign and well-wishing formulas.",
    },
    excerptOriginal: "𐱃𐰆𐰞𐰆𐰴 𐰉𐰃𐱅𐰃𐰓𐰃𐰢",
    excerptTransliteration: "Toluk bitidim... qutluğ bolzun!",
    excerptTranslation: { tr: "Ben Toluk yazdım... kutlu olsun!", en: "I, Toluk, wrote it... may it be blessed!" },
    sourceIds: ["sertkaya-coyr-1998", "erdal-2004"],
  },
  {
    id: "tonyukuk",
    name: { tr: "Tonyukuk Yazıtı (I–II)", en: "Tonyukuk Inscription (I–II)" },
    date: "~720 – 726",
    discoveryAndDecipherment: {
      tr: "1897'de Klements tarafından Bayn Tsokto'da keşfedildi; W. Radloff ve V. Thomsen tarafından yayımlandı, Talat Tekin (1994) tarafından kapsamlı neşri yapıldı.",
      en: "Discovered in 1897 at Bain Tsokto; critically edited by Talat Tekin (1994).",
    },
    location: { tr: "Bayn Tsokto, Tula Vadisi (Moğolistan)", en: "Bain Tsokto, Tuul Valley (Mongolia)" },
    scriptVariant: { tr: "Orhon Runiform (iki dikilitaş, 62 satır)", en: "Orkhon Runiform (twin stelae, 62 lines)" },
    authorOrPatron: { tr: "Bilge Tonyukuk (bizzat kendi ağzından)", en: "Bilge Tonyukuk (first-person)" },
    grammarNotes: {
      tr: "Birinci tekil şahıs anlatımı, -sAr şart kipi, atasözü kalıpları ('yuyqa erikli topulğalı uçuz...') bakımından zengindir.",
      en: "Notable for first-person memoir style, conditional clauses, and proverbs.",
    },
    historicalContent: {
      tr: "İkinci Türk Kağanlığı'nın kuruluş stratejisi, Çin, Kırgız, Türgiş ve Oğuz seferlerini anlatır.",
      en: "Narrates the restoration of the Second Khaganate and campaigns against Tang, Kyrgyz, and Türgesh.",
    },
    excerptOriginal: "𐰋𐰃𐰠𐰏𐰀 𐱃𐰆𐰪𐰸𐰸 𐰋𐰀𐰤 𐰇𐰔𐰇𐰢",
    excerptTransliteration: "Bilge Tuñuquq ben özüm Tabğaç eliŋe qılıntım.",
    excerptTranslation: {
      tr: "Bilge Tonyukuk'um ben kendim; Çin (Tabgaç) ülkesinde doğdum/yetiştim.",
      en: "I myself am Bilge Tonyukuk; I was raised in the realm of Tabgač (China).",
    },
    sourceIds: ["tekin-1991-1995", "erdal-2004"],
  },
  {
    id: "kul-tigin",
    name: { tr: "Kül Tigin Yazıtı", en: "Kul Tigin Inscription" },
    date: "732",
    discoveryAndDecipherment: {
      tr: "1889'da N. Yadrintsev tarafından Orhon Vadisi'nde bulundu; 15 Aralık 1893'te Vilhelm Thomsen tarafından çözümlendi.",
      en: "Found in 1889 by N. Yadrintsev; deciphered on Dec 15, 1893 by Vilhelm Thomsen.",
    },
    location: { tr: "Koşo Çaydam, Orhon Vadisi (Moğolistan)", en: "Khöshöö Tsaidam, Orkhon Valley (Mongolia)" },
    scriptVariant: { tr: "Klasik Orhon Runiform (3,75 m kireçtaşı)", en: "Classical Orkhon Runiform (3.75 m limestone)" },
    authorOrPatron: { tr: "Bilge Kağan (emreden) / Yollug Tigin (yazan)", en: "Bilge Khagan (patron) / Yollug Tigin (author)" },
    grammarNotes: {
      tr: "Klasik Orhon ses ve biçim ölçütü; kalın/ince ünsüz çiftlerinin eksiksiz kullanımı.",
      en: "Standard reference for Classical Old Turkic phonology and dual consonant orthography.",
    },
    historicalContent: {
      tr: "Türk milletinin yükselişi, Çin esareti yılları, bağımsızlık uyarısı ve Kül Tigin'in kahramanlıkları.",
      en: "Rise of the Türks, decades of Tang domination, warnings against assimilation, and Kul Tigin's deeds.",
    },
    excerptOriginal: "𐱅𐰭𐰼𐰃 𐱅𐰀𐰏 𐱅𐰭𐰼𐰃𐰓𐰀 𐰉𐰆𐰞𐰢𐱁 𐱅𐰇𐰼𐰰 𐰋𐰃𐰠𐰏𐰀 𐰴𐰍𐰣",
    excerptTransliteration: "Üze kök teŋri asra yağız yer qılıntuqda ekin ara kişi oğlı qılınmış.",
    excerptTranslation: {
      tr: "Üstte mavi gök, altta yağız yer yaratıldığında, ikisi arasında insanoğlu yaratılmış.",
      en: "When blue sky above and dark earth below were created, humankind was created between them.",
    },
    sourceIds: ["tdv-thomsen-2012", "unesco-orkhon-2004", "tekin-1991-1995"],
  },
  {
    id: "bilge-kagan",
    name: { tr: "Bilge Kağan Yazıtı", en: "Bilge Khagan Inscription" },
    date: "735",
    discoveryAndDecipherment: {
      tr: "1889'da Kül Tigin anıtıyla birlikte keşfedildi ve 1893'te Thomsen tarafından çözümlendi.",
      en: "Discovered in 1889 alongside Kul Tigin; deciphered by Thomsen in 1893.",
    },
    location: { tr: "Koşo Çaydam, Orhon Vadisi (Moğolistan)", en: "Khöshöö Tsaidam, Orkhon Valley (Mongolia)" },
    scriptVariant: { tr: "Klasik Orhon Runiform", en: "Classical Orkhon Runiform" },
    authorOrPatron: { tr: "Yollug Tigin (Bilge Kağan'ın oğlu/yeğeni)", en: "Yollug Tigin" },
    grammarNotes: {
      tr: "Kül Tigin metniyle paralel bölümlerin yanı sıra 731–734 arası olayları ve devlet bilançosunu içerir.",
      en: "Parallels Kul Tigin while extending the narrative through 734 CE.",
    },
    historicalContent: {
      tr: "Bilge Kağan'ın son yılları, halkı doyurma ve birleştirme siyaseti ('açığı tok kıldım, azı çok kıldım').",
      en: "Bilge Khagan's welfare and statecraft ethos ('I made the hungry full, the few many').",
    },
    excerptOriginal: "𐰉𐰆𐰑𐰣𐰍 𐰃𐰏𐰃𐱅𐰃𐰢",
    excerptTransliteration: "Ölümde ozupan tirgürtüm, yalıŋ bodunuğ tonlığ, çıgañ bodunuğ bay qıltım.",
    excerptTranslation: {
      tr: "Ölümden kurtarıp dirilttim; çıplak milleti giyimli, yoksul milleti zengin kıldım.",
      en: "I revived the dying nation; I clothed the naked and enriched the poor.",
    },
    sourceIds: ["tekin-1991-1995", "unesco-orkhon-2004"],
  },
  {
    id: "yenisei-inscriptions",
    name: { tr: "Yenisey Yazıtları (Elegeş, Uyuk-Tarlak, Altın-Köl vb.)", en: "Yenisei Inscriptions" },
    date: "8.–10. Yüzyıl",
    discoveryAndDecipherment: {
      tr: "18. yüzyılda Strahlenberg ve Messerschmidt tarafından belgelenen ilk runik taşlar; 150'yi aşkın mezar steli.",
      en: "First documented in the 18th century by Strahlenberg & Messerschmidt; >150 funerary stelae.",
    },
    location: { tr: "Hakasya ve Tuva (Yukarı Yenisey Havzası)", en: "Khakassia & Tuva (Upper Yenisei)" },
    scriptVariant: { tr: "Yenisey Runiform Varyantı (ek yerel işaretler içerir)", en: "Yenisei Runiform Variant" },
    authorOrPatron: { tr: "Yenisey Kırgız beyleri ve boy ileri gelenleri", en: "Yenisei Kyrgyz nobles" },
    grammarNotes: {
      tr: "Orhon yazıtlarına göre daha kısa, ağıt (sagu) üslubunda ('er erdemim üçün... sizime bökmedim').",
      en: "Concise elegiac style lamenting separation from family and homeland.",
    },
    historicalContent: {
      tr: "Bireysel kahramanlık, yaş, aile ve yurdundan ayrılış acısını işleyen mezar kitabeleri.",
      en: "Funerary epitaphs recording personal valor, age, and farewells.",
    },
    excerptOriginal: "𐰀𐰼 𐰀𐰼𐰓𐰀𐰢𐰃𐰢",
    excerptTransliteration: "Er erdemim üçün... künimke ayımka adırıltım.",
    excerptTranslation: {
      tr: "Erkeklik erdemim için... günümden, ayımdan (sevdiklerimden) ayrıldım.",
      en: "For my valor... I parted from my sun and my moon.",
    },
    sourceIds: ["brill-etlo-runiform", "erdal-2004"],
  },
  {
    id: "talas-inscriptions",
    name: { tr: "Talas ve Yedisu Runik Yazıtları", en: "Talas & Semirechye Runic Inscriptions" },
    date: "8.–10. Yüzyıl",
    discoveryAndDecipherment: {
      tr: "Kırgızistan Talas Vadisi'nde 19.–20. yüzyıllarda bulunan taş ve ağaç çubuk yazıtları.",
      en: "Discovered in the Talas Valley (Kyrgyzstan) on river boulders and wooden sticks.",
    },
    location: { tr: "Talas Vadisi (Kırgızistan) – Güney Kazakistan", en: "Talas Valley (Kyrgyzstan)" },
    scriptVariant: { tr: "Talas Runiform Varyantı", en: "Talas Runiform Variant" },
    authorOrPatron: { tr: "Türgiş / Karluk çevresi yerel topluluklar", en: "Türgesh / Karluk local communities" },
    grammarNotes: {
      tr: "Batı Türkistan'daki runik yazı kullanımının en önemli epigrafik kanıtıdır.",
      en: "Key epigraphic proof of runiform literacy in Western Turkestan.",
    },
    historicalContent: {
      tr: "Kısa mülkiyet, anma ve günlük yaşam kayıtları.",
      en: "Short commemorative, ownership, and everyday inscriptions.",
    },
    excerptOriginal: "𐱃𐰀𐰞𐰀𐰽",
    excerptTransliteration: "Talas runik kaya/ağaç yazıtı örnekleri",
    excerptTranslation: {
      tr: "Batı Türkistan runiform yazı geleneği tanıklığı.",
      en: "Attestation of Western Turkestan runiform script culture.",
    },
    sourceIds: ["brill-etlo-runiform", "tdv-thomsen-2012"],
  },
];
