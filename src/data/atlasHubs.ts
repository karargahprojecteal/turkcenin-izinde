export type MapLayerMode = "historical" | "modern";

export interface AtlasHub {
  id: string;
  name: { tr: string; en: string };
  subtitle: { tr: string; en: string };
  coordinates: { lat: number; lng: number };
  coordLabel: string;
  eraSummary: { tr: string; en: string };
  layerPresence: "both" | "historical" | "modern";
  primaryBranchId: string;
  branchIds: string[];
  periodIds: string[];
  languageIds: string[];
  geographicContext: { tr: string; en: string };
  linguisticSignificance: { tr: string; en: string };
  keyFact: { tr: string; en: string };
  sourceIds: string[];
}

export const MAP_BOUNDS = {
  minLng: 18,
  maxLng: 145,
  minLat: 24,
  maxLat: 72,
  width: 1100,
  height: 580,
  padX: 60,
  padY: 40,
} as const;

export function projectGeo(lat: number, lng: number): { x: number; y: number } {
  const innerW = MAP_BOUNDS.width - MAP_BOUNDS.padX * 2;
  const innerH = MAP_BOUNDS.height - MAP_BOUNDS.padY * 2 - 10;
  const x =
    MAP_BOUNDS.padX +
    ((lng - MAP_BOUNDS.minLng) / (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng)) * innerW;
  const y =
    MAP_BOUNDS.padY +
    ((MAP_BOUNDS.maxLat - lat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) * innerH;
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
}

export const ATLAS_HUBS: AtlasHub[] = [
  {
    id: "orhon",
    name: { tr: "Orhon & Ötüken", en: "Orkhon & Ötüken" },
    subtitle: {
      tr: "Bozkır Epigrafisi ve İlk Yazılı Anıtlar Merkezi",
      en: "Steppe Epigraphy & Earliest Attested Monuments",
    },
    coordinates: { lat: 47.55, lng: 102.84 },
    coordLabel: "47.55°N, 102.84°E",
    eraSummary: { tr: "MÖ ~1. Binyıl – 8. yy.", en: "~1st Mill. BCE – 8th c." },
    layerPresence: "both",
    primaryBranchId: "siberian",
    branchIds: ["siberian"],
    periodIds: ["proto-turkic", "gokturk"],
    languageIds: ["tuvan", "khakas"],
    geographicContext: {
      tr: "Orta Moğolistan'da Orhon Irmağı vadisi ve Hangay Dağları çevresi; erken Türk kağanlıklarının kutsal yönetim merkezi (Ötüken) ve UNESCO Dünya Mirası kültürel peyzajı.",
      en: "The Orkhon River valley and Khangai Mountains in central Mongolia; sacred political heartland (Ötüken) of early Turkic khaganates and a UNESCO World Heritage landscape.",
    },
    linguisticSignificance: {
      tr: "38–40 işaretli Göktürk runiform yazısıyla dikilen Tonyukuk, Kül Tigin ve Bilge Kağan yazıtları Türkçenin doğrudan belgelenmiş ilk yazılı katmanını oluşturur. Söz içi /d/ sesi korunur (adaq 'ayak').",
      en: "The Tonyukuk, Kul Tigin, and Bilge Khagan stelae in the 38-sign Old Turkic runiform script form the earliest attested written layer of Turkic, preserving intervocalic /d/ (adaq 'foot').",
    },
    keyFact: {
      tr: "1893'te Vilhelm Thomsen tarafından çözümlendi; 2004'te UNESCO Dünya Mirası ilan edildi.",
      en: "Deciphered by Vilhelm Thomsen in 1893; inscribed as UNESCO World Heritage in 2004.",
    },
    sourceIds: ["erdal-2004", "tekin-1991-1995", "unesco-orkhon-2004", "tdv-thomsen-2012"],
  },
  {
    id: "turfan",
    name: { tr: "Turfan (Koço)", en: "Turfan (Qocho)" },
    subtitle: {
      tr: "İpek Yolu Çok Alfabeli Yazma ve Çeviri Vahası",
      en: "Silk Road Multi-Script Manuscript & Translation Oasis",
    },
    coordinates: { lat: 42.95, lng: 89.19 },
    coordLabel: "42.95°N, 89.19°E",
    eraSummary: { tr: "8.–13. Yüzyıl / Çağdaş", en: "8th–13th c. / Modern" },
    layerPresence: "both",
    primaryBranchId: "karluk",
    branchIds: ["karluk"],
    periodIds: ["old-uyghur"],
    languageIds: ["uyghur"],
    geographicContext: {
      tr: "Tarım Havzası'nın kuzeydoğusunda, Tanrı Dağları eteklerindeki Turfan Çöküntüsü; İpek Yolu'nun kuzey kolunun başlıca kültür ve çeviri kavşağı.",
      en: "The Turfan Depression at the foothills of the Tian Shan on the northeastern edge of the Tarim Basin; a premier cultural crossroads of the northern Silk Road.",
    },
    linguisticSignificance: {
      tr: "Eski Uygurca burada Soğd-Uygur, Runik, Maniheist, Brahmi ve Süryani alfabeleriyle yazılmıştır. Dil bir, alfabe çoktur; modern Uygurca ise Karahanlı-Çağatay çizgisinin devamıdır.",
      en: "Old Uyghur was written here in Old Uyghur, Runiform, Manichaean, Brahmi, and Syriac scripts. One language across five scripts; Modern Uyghur descends via the Karakhanid–Chagatai line.",
    },
    keyFact: {
      tr: "Berlin Turfan Koleksiyonu'nda yaklaşık 8.000 Eski Uygurca el yazması ve blok baskı fragmanı korunur.",
      en: "Roughly 8,000 Old Uyghur manuscript and woodblock fragments survive in the Berlin Turfan Collection.",
    },
    sourceIds: ["raschmann-2024", "bbaw-turfan", "erdal-2004", "brill-etlo-runiform"],
  },
  {
    id: "kasgar",
    name: { tr: "Kaşgar", en: "Kashgar" },
    subtitle: {
      tr: "İlk İslami Türk Yazı Dili ve Karşılaştırmalı Türkoloji",
      en: "First Islamic Turkic Literary Language & Comparative Turkology",
    },
    coordinates: { lat: 39.47, lng: 75.99 },
    coordLabel: "39.47°N, 75.99°E",
    eraSummary: { tr: "11.–13. Yüzyıl / Çağdaş", en: "11th–13th c. / Modern" },
    layerPresence: "both",
    primaryBranchId: "karluk",
    branchIds: ["karluk"],
    periodIds: ["karakhanid"],
    languageIds: ["uyghur", "uzbek"],
    geographicContext: {
      tr: "Tarım Havzası'nın batı ucunda, Pamir ve Tanrı Dağları'nın birleştiği vaha kenti; Karahanlılar döneminin başlıca ilim ve edebiyat merkezi.",
      en: "Oasis city at the western edge of the Tarim Basin where the Pamir and Tian Shan meet; a major scholarly and literary capital of the Karakhanid era.",
    },
    linguisticSignificance: {
      tr: "Yusuf Has Hacib'in Kutadgu Bilig'i (1069–70) ve Kaşgarlı Mahmud'un Dîvânu Lugâti't-Türk'ü (1072–74) burada doğdu. Türk lehçelerinin ilk karşılaştırmalı sözlüğü ve dairesel dünya haritası bu gelenekte üretildi.",
      en: "Birthplace of Kutadgu Bilig (1069–70) and Mahmud al-Kashgari's Diwan Lughat al-Turk (1072–74), which produced the first comparative dictionary and map of Turkic dialects.",
    },
    keyFact: {
      tr: "Dîvânu Lugâti't-Türk 2017'de UNESCO Dünya Belleği Kütüğü'ne kaydedilmiştir.",
      en: "Diwan Lughat al-Turk was inscribed in the UNESCO Memory of the World Register in 2017.",
    },
    sourceIds: ["unesco-diwan-2017", "unesco-kutadgu-2019", "erdal-2004"],
  },
  {
    id: "harezm",
    name: { tr: "Harezm", en: "Khwarazm" },
    subtitle: {
      tr: "Karahanlıdan Çağataycaya Geçiş Köprüsü",
      en: "Transitional Bridge from Karakhanid to Chagatai",
    },
    coordinates: { lat: 41.55, lng: 60.63 },
    coordLabel: "41.55°N, 60.63°E",
    eraSummary: { tr: "13.–19. Yüzyıl / Çağdaş", en: "13th–19th c. / Modern" },
    layerPresence: "both",
    primaryBranchId: "karluk",
    branchIds: ["karluk", "oghuz"],
    periodIds: ["khwarazmian", "chagatai"],
    languageIds: ["uzbek", "turkmen"],
    geographicContext: {
      tr: "Aşağı Ceyhun (Amu Derya) deltası ve Aral Gölü güneyi; Orta Asya bozkırları ile Mâverâünnehir vaha kentlerini ve Altın Orda'yı birbirine bağlayan stratejik havza.",
      en: "The lower Amu Darya (Oxus) delta south of the Aral Sea; a strategic basin linking Central Asian steppes, Transoxiana oases, and the Golden Horde.",
    },
    linguisticSignificance: {
      tr: "Karahanlı temeli üzerinde Oğuz ve Kıpçak unsurlarını harmanlayan Harezm Türkçesi (13.–14. yy.), Eski Türkçe /ð/ sesinin tamamen /y/ sesine dönüşümünü (adaq > ayaq) tamamlayarak klasik Çağataycaya zemin hazırladı.",
      en: "Khwarazmian Turkic (13th–14th c.) blended Oghuz and Kipchak traits onto a Karakhanid base, completing the Old Turkic /ð/ > /y/ shift (adaq > ayaq) and paving the way for Classical Chagatai.",
    },
    keyFact: {
      tr: "Bugün Özbekçe (Karluk) ve Türkmence (Oğuz) bu tarihsel temas kuşağında yan yana yaşar.",
      en: "Today Uzbek (Karluk) and Turkmen (Oghuz) coexist along this historical contact zone.",
    },
    sourceIds: ["tdv-cagatay-1993", "johanson-csato-2022"],
  },
  {
    id: "kirim",
    name: { tr: "Kırım & Deşt-i Kıpçak", en: "Crimea & Pontic Steppe" },
    subtitle: {
      tr: "Çok Alfabeli Kıpçak Mirası (Latin, Arap, Ermeni)",
      en: "Multi-Script Kipchak Heritage (Latin, Arabic, Armenian)",
    },
    coordinates: { lat: 45.0, lng: 35.0 },
    coordLabel: "45.00°N, 35.00°E",
    eraSummary: { tr: "13.–15. Yüzyıl / Çağdaş", en: "13th–15th c. / Modern" },
    layerPresence: "both",
    primaryBranchId: "kipchak",
    branchIds: ["kipchak"],
    periodIds: ["kipchak"],
    languageIds: ["crimean-tatar", "kazakh"],
    geographicContext: {
      tr: "Karadeniz kuzeyindeki Kırım Yarımadası ve Deşt-i Kıpçak bozkır kuşağı; Ceneviz-Venedik ticaret limanları ile Altın Orda bozkırlarının kesişim noktası.",
      en: "The Crimean Peninsula and Pontic-Caspian steppe belt north of the Black Sea; crossroads of Italian maritime trade ports and Golden Horde steppe routes.",
    },
    linguisticSignificance: {
      tr: "Codex Cumanicus (13.–14. yy.) Latin harfleriyle kaydedilen ilk kapsamlı Kıpçakça sözlüktür. Hece sonu /g/ > /w/ değişimi (tağ > taw) karakteristiktir; Kırım Tatarcası Kıpçak tabanı üzerinde Oğuz kıyı etkisi taşır.",
      en: "Codex Cumanicus (13th–14th c.) is the earliest extensive Latin-script Kipchak lexicon. Syllable-final /g/ > /w/ (tağ > taw) is diagnostic; Crimean Tatar blends a Kipchak base with Oghuz coastal features.",
    },
    keyFact: {
      tr: "Tarihsel Kıpçakça Latin (Codex Cumanicus), Arap (Memlük) ve Ermeni harfleriyle belgelenmiştir.",
      en: "Historical Kipchak is attested across Latin (Codex Cumanicus), Arabic (Mamluk), and Armenian scripts.",
    },
    sourceIds: ["johanson-csato-2022", "brill-etlo-classification"],
  },
  {
    id: "istanbul",
    name: { tr: "İstanbul & Anadolu", en: "Istanbul & Anatolia" },
    subtitle: {
      tr: "Batı Oğuz Yazı Geleneği ve 1928 Harf Devrimi",
      en: "West Oghuz Literary Tradition & 1928 Alphabet Reform",
    },
    coordinates: { lat: 41.01, lng: 28.97 },
    coordLabel: "41.01°N, 28.97°E",
    eraSummary: { tr: "13. Yüzyıl – Günümüz", en: "13th c. – Present" },
    layerPresence: "both",
    primaryBranchId: "oghuz",
    branchIds: ["oghuz"],
    periodIds: ["old-anatolian", "ottoman", "modern-turkish"],
    languageIds: ["turkish", "gagauz", "azerbaijani"],
    geographicContext: {
      tr: "Boğaziçi, Anadolu ve Balkanlar ekseni; Eski Anadolu Türkçesinden Osmanlı devlet arşivlerine ve Cumhuriyet dönemi dil planlamasına uzanan Batı Oğuz merkezi.",
      en: "The Bosphorus, Anatolia, and Balkans axis; West Oghuz heartland spanning Old Anatolian Turkish, Ottoman imperial archives, and Republican language planning.",
    },
    linguisticSignificance: {
      tr: "Oğuz ses özellikleri (söz başı t- > d-, hece sonu -g düşmesi: tağ > dağ) burada standartlaştı. 1 Kasım 1928 Harf Devrimi ile yazı sistemi değişti; dilin genetik Oğuz kimliği ise kesintisiz sürdü.",
      en: "Oghuz phonological traits (initial t- > d-, loss of final -g: tağ > dağ) standardized here. The Nov 1, 1928 Alphabet Reform changed the script while the language's genetic Oghuz lineage continued unbroken.",
    },
    keyFact: {
      tr: "Türkiye Türkçesi bugün 70 milyonu aşkın ana dili konuşuruyla Türk dil ailesinin en büyük edebî dilidir.",
      en: "Modern Turkish is the largest literary Turkic language today with over 70 million native speakers.",
    },
    sourceIds: ["yilmaz-2011", "vekam-1928", "johanson-csato-2022"],
  },
  {
    id: "idil-ural",
    name: { tr: "İdil-Ural", en: "Volga-Ural" },
    subtitle: {
      tr: "Oğur (Çuvaşça) ve Kuzey Kıpçak (Tatarca–Başkurtça) Kuşağı",
      en: "Oghur (Chuvash) & North Kipchak (Tatar–Bashkir) Belt",
    },
    coordinates: { lat: 55.79, lng: 49.12 },
    coordLabel: "55.79°N, 49.12°E",
    eraSummary: { tr: "13. yy. Bulgar Yazıtları – Günümüz", en: "13th c. Bulgar Inscriptions – Present" },
    layerPresence: "both",
    primaryBranchId: "oghur",
    branchIds: ["oghur", "kipchak"],
    periodIds: ["proto-turkic", "kipchak", "modern-turkish"],
    languageIds: ["chuvash", "volga-bulgar", "tatar", "bashkir"],
    geographicContext: {
      tr: "Orta İdil (Volga) ve Ural Dağları arası; Tataristan, Çuvaşistan ve Başkurdistan cumhuriyetlerini kapsayan, Avrasya'nın en kuzeybatıdaki yoğun Türk dili havzası.",
      en: "Middle Volga and Ural Mountains basin encompassing Tatarstan, Chuvashia, and Bashkortostan; the northwesternmost dense Turkic linguistic zone.",
    },
    linguisticSignificance: {
      tr: "Proto-Türkçeden ilk ayrılan Oğur kolunun yaşayan tek temsilcisi Çuvaşça (r/l denkliği: Genel Türkçe z/ş karşılığı r/l) ile Kıpçak kolunun İdil-Ural ünlü kaymalı dilleri (Tatarca, Başkurtça) burada komşudur.",
      en: "Home to Chuvash—the sole living member of the early-splitting Oghur branch (r/l vs. Common Turkic z/š)—alongside North Kipchak languages with Volga-Ural vowel shifts (Tatar, Bashkir).",
    },
    keyFact: {
      tr: "13.–14. yüzyıl İdil Bulgarcası mezar yazıtları Oğur kolunun doğrudan tarihsel kanıtıdır.",
      en: "13th–14th century Volga Bulgar funerary inscriptions provide direct historical evidence for Oghur.",
    },
    sourceIds: ["brill-etlo-classification", "johanson-csato-2022"],
  },
  {
    id: "yakutistan",
    name: { tr: "Yakutistan (Saha)", en: "Yakutia (Sakha)" },
    subtitle: {
      tr: "Kuzeydoğu Sibirya Arkaik Kolu",
      en: "Northeastern Siberian Archaic Branch",
    },
    coordinates: { lat: 62.03, lng: 129.73 },
    coordLabel: "62.03°N, 129.73°E",
    eraSummary: { tr: "Erken Ayrışma – Günümüz", en: "Early Divergence – Present" },
    layerPresence: "modern",
    primaryBranchId: "siberian",
    branchIds: ["siberian"],
    periodIds: ["proto-turkic", "modern-turkish"],
    languageIds: ["sakha"],
    geographicContext: {
      tr: "Lena Nehri havzası ve Kuzeydoğu Sibirya (Saha Cumhuriyeti); Türk dünyasının en kuzeydoğu ucundaki coğrafi yayılım alanı.",
      en: "The Lena River basin in Northeastern Siberia (Sakha Republic); the farthest northeastern geographic extension of the Turkic world.",
    },
    linguisticSignificance: {
      tr: "Sahaca (Yakutça), Genel Türkçeden erken dönemde ayrışmış olup birincil uzun ünlü izlerini korur ve Moğolca ile Tunguzca dilleriyle yoğun sözcüksel-yapısal temas izleri taşır.",
      en: "Sakha (Yakut) diverged early from Common Turkic, retaining primary vowel length traces alongside deep lexical and structural contact with Mongolic and Tungusic languages.",
    },
    keyFact: {
      tr: "Yaklaşık 450 bin konuşuruyla Arktik/Subarktik kuşakta yaşayan başlıca Türk dilidir.",
      en: "Spoken by ~450,000 people across the Subarctic Lena basin.",
    },
    sourceIds: ["johanson-csato-2022", "brill-etlo-classification"],
  },
  {
    id: "orta-iran-halac",
    name: { tr: "Orta İran (Halaç / Arğu)", en: "Central Iran (Khalaj / Arghu)" },
    subtitle: {
      tr: "Proto-Türkçe Söz Başı h- Sesini Koruyan Dil Adası",
      en: "Linguistic Island Preserving Proto-Turkic Initial h-",
    },
    coordinates: { lat: 34.64, lng: 50.88 },
    coordLabel: "34.64°N, 50.88°E",
    eraSummary: { tr: "Erken Ayrışma – Günümüz", en: "Early Divergence – Present" },
    layerPresence: "modern",
    primaryBranchId: "arghu",
    branchIds: ["arghu"],
    periodIds: ["proto-turkic", "modern-turkish"],
    languageIds: ["khalaj"],
    geographicContext: {
      tr: "Orta İran'da Kum ve Erak çevresindeki köyler; Farsça ve Azerbaycan Türkçesi konuşulan bölgeler arasında izole bir dil adası.",
      en: "Villages around Qom and Arak in central Iran; an isolated linguistic island surrounded by Persian and Azerbaijani speakers.",
    },
    linguisticSignificance: {
      tr: "Gerhard Doerfer'in araştırmalarıyla Genel Türkçe içinde erken ayrılmış bağımsız Arğu kolu olarak tanımlanmıştır. Proto-Türkçe söz başı *h- sesini (hadaq 'ayak'), söz içi -d- sesini ve üçlü ünlü uzunluğunu korur.",
      en: "Identified by Gerhard Doerfer as an early-diverged independent Arghu branch within Common Turkic. Preserves Proto-Turkic initial *h- (hadaq 'foot'), intervocalic -d-, and three-way vowel length.",
    },
    keyFact: {
      tr: "Kaşgarlı Mahmud'un 11. yüzyılda andığı 'Arğu' lehçesinin yaşayan mirasçısı olarak kabul edilir.",
      en: "Widely recognized as the living heir to the 'Arghu' dialect recorded by Mahmud al-Kashgari in the 11th century.",
    },
    sourceIds: ["brill-etlo-classification", "johanson-csato-2022"],
  },
];
