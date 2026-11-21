export interface HistoricalArtifact {
  id: string;
  title: { tr: string; en: string };
  periodId: string;
  scriptId: string;
  date: string;
  location: { tr: string; en: string };
  repository: { tr: string; en: string };
  material: { tr: string; en: string };
  unescoStatus?: { tr: string; en: string };
  excerptOriginal: string;
  excerptTransliteration: string;
  excerptTranslation: { tr: string; en: string };
  description: { tr: string; en: string };
  sourceIds: string[];
}

export const HISTORICAL_ARTIFACTS: HistoricalArtifact[] = [
  {
    id: "kul-tigin",
    title: { tr: "Kül Tigin Yazıtı", en: "Kul Tigin Inscription" },
    periodId: "gokturk",
    scriptId: "gokturk-runic",
    date: "732",
    location: { tr: "Koşo Çaydam, Orhon Vadisi (Moğolistan)", en: "Khöshöö Tsaidam, Orkhon Valley (Mongolia)" },
    repository: { tr: "Orhon Vadisi Müzesi / Yerinde Koruma", en: "Orkhon Valley Museum / In Situ" },
    material: { tr: "Kireçtaşı Dikilitaş (3,75 m)", en: "Limestone Stele (3.75 m)" },
    unescoStatus: { tr: "UNESCO Dünya Mirası (2004)", en: "UNESCO World Heritage (2004)" },
    excerptOriginal: "𐱅𐰭𐰼𐰃 𐱅𐰀𐰏 𐱅𐰭𐰼𐰃𐰓𐰀 𐰉𐰆𐰞𐰢𐱁 𐱅𐰇𐰼𐰰 𐰋𐰃𐰠𐰏𐰀 𐰴𐰍𐰣",
    excerptTransliteration: "Teŋri teg teŋride bolmış Türk Bilge Kağan...",
    excerptTranslation: {
      tr: "Göğe benzer, gökte olmuş Türk Bilge Kağan...",
      en: "Heaven-like, heaven-conceived Turkic Bilge Khagan...",
    },
    description: {
      tr: "Bilge Kağan tarafından kardeşi Kül Tigin anısına diktirilen ve Yollug Tigin tarafından kaleme alınan anıt. Türkçenin doğrudan belgelenmiş en erken büyük hitabet metinlerindendir.",
      en: "Erected by Bilge Khagan in memory of his brother Kul Tigin and composed by Yollug Tigin; among the earliest monumental works of Turkic rhetoric.",
    },
    sourceIds: ["unesco-orkhon-2004", "tekin-1991-1995", "erdal-2004"],
  },
  {
    id: "tonyukuk",
    title: { tr: "Tonyukuk Yazıtı", en: "Tonyukuk Inscription" },
    periodId: "gokturk",
    scriptId: "gokturk-runic",
    date: "~720–726",
    location: { tr: "Bayn Tsokto (Moğolistan)", en: "Bain Tsokto (Mongolia)" },
    repository: { tr: "Yerinde Anıt Alanı", en: "In Situ Monument Complex" },
    material: { tr: "İki Taş Dikilitaş", en: "Twin Stone Stelae" },
    excerptOriginal: "𐰋𐰃𐰠𐰏𐰀 𐱃𐰆𐰪𐰸𐰸 𐰋𐰀𐰤 𐰇𐰔𐰇𐰢",
    excerptTransliteration: "Bilge Tuñuquq ben özüm...",
    excerptTranslation: {
      tr: "Bilge Tonyukuk'um ben kendim...",
      en: "I myself am Bilge Tonyukuk...",
    },
    description: {
      tr: "İkinci Türk Kağanlığı'nın başveziri ve stratejisti Tonyukuk'un kendi ağzından anlattığı hatırat ve devlet yönetimi öğütlerini içerir.",
      en: "First-person political memoir and strategic counsel composed by Tonyukuk, chief advisor of the Second Turkic Khaganate.",
    },
    sourceIds: ["tekin-1991-1995", "erdal-2004"],
  },
  {
    id: "irk-bitig",
    title: { tr: "Irk Bitig (Fal Kitabı)", en: "Irk Bitig (Book of Omens)" },
    periodId: "old-uyghur",
    scriptId: "gokturk-runic",
    date: "9.–10. Yüzyıl",
    location: { tr: "Dunhuang, Bin Buda Mağaraları", en: "Dunhuang, Caves of the Thousand Buddhas" },
    repository: { tr: "British Library (Or. 8212/161)", en: "British Library (Or. 8212/161)" },
    material: { tr: "Kağıt Kodeks (Kitapçık)", en: "Paper Codex Booklet" },
    excerptOriginal: "𐰀𐰞𐰀 𐰀𐱃𐰞𐰍 𐰖𐰆𐰞 𐱅𐰀𐰭𐰼𐰃 𐰢𐰀𐰤",
    excerptTransliteration: "Ala atlıġ yol teŋri men...",
    excerptTranslation: {
      tr: "Alaca atlı yol tanrısıyım ben...",
      en: "I am the road god on a dappled horse...",
    },
    description: {
      tr: "Göktürk runik harfleriyle taş yerine kağıt kitapçık üzerine yazılmış tek kapsamlı eserdir; 65 fal bölümünden oluşur.",
      en: "The only surviving complete paper codex written in the Old Turkic runiform script, containing 65 omen sections.",
    },
    sourceIds: ["brill-etlo-runiform", "erdal-2004"],
  },
  {
    id: "sakiz-yukmak",
    title: { tr: "Säkiz Yükmäk Yaruk (Sekiz Yığın Nurlu Sutra)", en: "Säkiz Yükmäk Yaruk Scroll" },
    periodId: "old-uyghur",
    scriptId: "old-uyghur",
    date: "9.–11. Yüzyıl",
    location: { tr: "Turfan (Koço), Doğu Türkistan", en: "Turfan (Qocho)" },
    repository: { tr: "Berlin-Brandenburg Bilimler Akademisi (BBAW)", en: "Berlin-Brandenburg Academy of Sciences (BBAW)" },
    material: { tr: "Kağıt Rulo ve Blok Baskı Fragmanları", en: "Paper Scroll & Woodblock Fragments" },
    excerptOriginal: "𐽰𐽶𐽷𐽶 𐽶𐽳𐽷𐽹𐽰𐽷 𐽶𐽰𐽾𐽳𐽲",
    excerptTransliteration: "Säkiz yükmäk yaruk nom bitig...",
    excerptTranslation: {
      tr: "Sekiz yığın nurlu öğreti kitabı...",
      en: "The Sutra of the Eightfold Heap of Light...",
    },
    description: {
      tr: "Eski Uygurca Budist yazma kültürünün en yaygın eserlerinden biridir; Berlin Turfan Koleksiyonu'nda çok sayıda fragmanı korunmaktadır.",
      en: "One of the most widely copied Old Uyghur Buddhist texts, preserved in numerous fragments in the Berlin Turfan Collection.",
    },
    sourceIds: ["raschmann-2024", "bbaw-turfan"],
  },
  {
    id: "diwan-lughat",
    title: { tr: "Dîvânu Lugâti't-Türk", en: "Dīwān Lughāt al-Turk" },
    periodId: "karakhanid",
    scriptId: "arabic",
    date: "1072–1074",
    location: { tr: "Bağdat (Kaşgarlı Mahmud)", en: "Baghdad (Mahmud al-Kashgari)" },
    repository: { tr: "Millet Yazma Eser Kütüphanesi (İstanbul)", en: "Millet Manuscript Library (Istanbul)" },
    material: { tr: "El Yazması Kodeks (Tek Nüsha, 1266 istinsahı)", en: "Manuscript Codex (Unique Copy, 1266)" },
    unescoStatus: { tr: "UNESCO Dünya Belleği Kütüğü (2017)", en: "UNESCO Memory of the World (2017)" },
    excerptOriginal: "كتاب ديوان لغات الترك",
    excerptTransliteration: "Kitâbu Dîvâni Lugâti't-Türk",
    excerptTranslation: {
      tr: "Türk Lehçeleri Sözlüğü Kitabı — yaklaşık 7.500 Türkçe sözcük ve ilk Türk dünyası haritası.",
      en: "Compendium of the Turkic Dialects — ~7,500 Turkic entries and the earliest map of the Turkic world.",
    },
    description: {
      tr: "Karşılaştırmalı Türk dilbiliminin kurucu eseri. Oğuz, Kıpçak, Çigil, Yağma ve Uygur ağızları arasındaki ses ve biçim farklarını sistematik biçimde belgeler.",
      en: "Foundational work of comparative Turkology, systematically documenting phonological and morphological differences across Turkic dialects.",
    },
    sourceIds: ["unesco-diwan-2017", "erdal-2004"],
  },
  {
    id: "kutadgu-bilig",
    title: { tr: "Kutadgu Bilig", en: "Kutadgu Bilig" },
    periodId: "karakhanid",
    scriptId: "arabic",
    date: "1069–1070",
    location: { tr: "Balasagun – Kaşgar (Yusuf Has Hacib)", en: "Balasagun – Kashgar (Yusuf Khass Hajib)" },
    repository: { tr: "Viyana (Uygur harfli), Kahire, Fergana Nüshaları", en: "Vienna (Uyghur script), Cairo, Fergana MSS" },
    material: { tr: "El Yazması Mesnevi (6.645 beyit)", en: "Manuscript Masnavi (6,645 couplets)" },
    unescoStatus: { tr: "UNESCO 950. Yıl Anma Programı (2019)", en: "UNESCO 950th Anniversary (2019)" },
    excerptOriginal: "قوتادغو بيليگ",
    excerptTransliteration: "Bilik birle alım bolur, bilig birle uluğ bolur.",
    excerptTranslation: {
      tr: "Bilgi ile devlet/mutluluk olur, bilgi ile ululuk olur.",
      en: "Through knowledge comes fortune; through knowledge comes greatness.",
    },
    description: {
      tr: "İslami dönem Türk edebiyatının ilk büyük eseri; hem Uygur hem Arap harfli nüshalarının bulunması dönemin çift yazılı kültürünü kanıtlar.",
      en: "First major literary monument of Islamic Turkic literature; surviving in both Old Uyghur and Arabic scripts.",
    },
    sourceIds: ["unesco-kutadgu-2019", "erdal-2004"],
  },
  {
    id: "codex-cumanicus",
    title: { tr: "Codex Cumanicus", en: "Codex Cumanicus" },
    periodId: "kipchak",
    scriptId: "latin-turkish",
    date: "13.–14. Yüzyıl",
    location: { tr: "Kırım / Deşt-i Kıpçak", en: "Crimea / Pontic Steppe" },
    repository: { tr: "Biblioteca Nazionale Marciana (Venedik)", en: "Biblioteca Marciana (Venice)" },
    material: { tr: "Parşömen El Yazması (82 yaprak)", en: "Parchment Manuscript (82 folios)" },
    excerptOriginal: "Atamız kim kökte sen, alğışlı bolsun senin atıñ",
    excerptTransliteration: "Atamız kim kökte sen...",
    excerptTranslation: {
      tr: "Göklerdeki Babamız, adın kutsal kılınsın...",
      en: "Our Father who art in heaven, hallowed be thy name...",
    },
    description: {
      tr: "İtalyan tüccarlar ve Fransisken misyonerlerce derlenen Latin harfli Kıpçak-Kuman sözlüğü, gramer notları ve bilmeceleri.",
      en: "Latin-script Kipchak-Cuman glossary, grammatical notes, and riddles compiled by Italian merchants and Franciscan friars.",
    },
    sourceIds: ["johanson-csato-2022", "brill-etlo-classification"],
  },
  {
    id: "muhakemetul-lugateyn",
    title: { tr: "Muhâkemetü'l-Lugateyn", en: "Muhakamat al-Lughatayn" },
    periodId: "chagatai",
    scriptId: "arabic",
    date: "1499",
    location: { tr: "Herat (Ali Şîr Nevâî)", en: "Herat (Ali-Shir Nava'i)" },
    repository: { tr: "Süleymaniye / Topkapı / Tahran Nüshaları", en: "Istanbul & Tehran Manuscript Collections" },
    material: { tr: "El Yazması Dilbilim Risalesi", en: "Manuscript Linguistic Treatise" },
    excerptOriginal: "محاكمة اللغتين",
    excerptTransliteration: "Türk tili Fârsîdin artuqraq turur...",
    excerptTranslation: {
      tr: "Türk dili söz varlığı ve incelikleri bakımından Farsçadan geri değildir, bilakis üstün yönleri vardır.",
      en: "The Turkic language surpasses Persian in lexical precision and expressive nuance.",
    },
    description: {
      tr: "Ali Şîr Nevâî'nin Çağatay Türkçesini Farsça ile karşılaştırarak Türkçenin edebî yetkinliğini savunduğu klasik dilbilim eseri.",
      en: "Ali-Shir Nava'i's classic treatise defending the literary sophistication of Chagatai Turkic in comparison with Persian.",
    },
    sourceIds: ["tdv-cagatay-1993", "johanson-csato-2022"],
  },
  {
    id: "harf-devrimi-1928",
    title: { tr: "1928 Türk Harfleri Kanunu ve Millet Mektepleri", en: "1928 Turkish Alphabet Law & Nation's Schools" },
    periodId: "modern-turkish",
    scriptId: "latin-turkish",
    date: "1 Kasım 1928",
    location: { tr: "Ankara / Türkiye Cumhuriyeti", en: "Ankara / Republic of Türkiye" },
    repository: { tr: "TBMM Arşivi / VEKAM Koleksiyonu", en: "Grand National Assembly Archive / VEKAM" },
    material: { tr: "1353 Sayılı Kanun ve İlk Basılı Alfabe Levhaları", en: "Law No. 1353 & Early Printed Alphabet Charts" },
    excerptOriginal: "A B C Ç D E F G Ğ H I İ J K L M N O Ö P R S Ş T U Ü V Y Z",
    excerptTransliteration: "29 Harfli Yeni Türk Alfabesi",
    excerptTranslation: {
      tr: "Ses ile harf arasında birebir uyum hedefleyen modern alfabe reformu.",
      en: "Modern alphabet reform establishing near one-to-one phonemic correspondence.",
    },
    description: {
      tr: "Türkiye'de okuryazarlığı yaygınlaştırmak ve Türkçenin ünlü sistemini eksiksiz karşılamak amacıyla yürürlüğe konan tarihi yazı reformu.",
      en: "Historic script reform enacted to achieve mass literacy and represent Turkish's 8-vowel system accurately.",
    },
    sourceIds: ["yilmaz-2011", "vekam-1928"],
  },
];
