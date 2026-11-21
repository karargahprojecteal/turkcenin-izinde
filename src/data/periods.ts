export type EpistemicStatus = "reconstructed" | "attested";

export interface HistoricalPeriod {
  id: string;
  slug: string;
  order: number;
  status: EpistemicStatus;
  startYear: number;
  endYear: number | null; // null means present
  dateLabel: { tr: string; en: string };
  title: { tr: string; en: string };
  subtitle: { tr: string; en: string };
  region: { tr: string; en: string };
  coordinates: { lat: number; lng: number };
  scripts: string[]; // alphabet ids
  keyWorks: string[];
  linguisticHighlights: { tr: string[]; en: string[] };
  summary: { tr: string; en: string };
  academicNote: { tr: string; en: string };
  sourceIds: string[];
}

export const HISTORICAL_PERIODS: HistoricalPeriod[] = [
  {
    id: "proto-turkic",
    slug: "proto-turkce",
    order: 1,
    status: "reconstructed",
    startYear: -1000,
    endYear: 500,
    dateLabel: { tr: "MÖ ~1. Binyıl – MS ilk yüzyıllar (Kuramsal)", en: "~1st Millennium BCE – Early CE (Theoretical)" },
    title: { tr: "Proto-Türkçe (Ana Türkçe)", en: "Proto-Turkic" },
    subtitle: { tr: "Yazılı Belge Öncesi Yeniden Yapılandırılmış Ata Dil", en: "Reconstructed Pre-Literary Ancestor Language" },
    region: { tr: "Batı Moğolistan – Güney Sibirya Bozkır Kuşağı", en: "Western Mongolia – South Siberian Steppe" },
    coordinates: { lat: 48.0, lng: 92.0 },
    scripts: [],
    keyWorks: ["Karşılaştırmalı Rekonstrüksiyon (Oğur–Genel Türkçe Verileri)"],
    linguisticHighlights: {
      tr: [
        "Doğrudan yazılı belgesi yoktur; karşılaştırmalı tarihsel dilbilimle yeniden yapılandırılır.",
        "Oğur (*r / *l) ve Genel Türkçe (*z / *š) ses denkliğinin başlangıç noktası.",
        "Ünlü uyumu ve sondan eklemeli (agglutinative) biçimbilgisi temelinin oluşumu.",
      ],
      en: [
        "No direct written records; reconstructed via comparative-historical linguistics.",
        "Origin of the Oghur (*r / *l) vs. Common Turkic (*z / *š) phonological correspondence.",
        "Formation of vowel harmony and agglutinative morphology.",
      ],
    },
    summary: {
      tr: "Proto-Türkçe, yaşayan ve tarihsel tüm Türk dillerinin ortak kuramsal atasıdır. Doğrudan yazılı belgelerle kanıtlanmış dönemlerden farklı olarak, Çuvaşça (Oğur) ve Genel Türkçe verilerinin geriye dönük karşılaştırılmasıyla bilimsel olarak yeniden kurulur.",
      en: "Proto-Turkic is the theoretical common ancestor of all attested and living Turkic languages. Unlike attested historical periods, it is scientifically reconstructed by comparing Oghur (Chuvash) and Common Turkic evidence.",
    },
    academicNote: {
      tr: "Bilimsel ayrım: Proto-Türkçe doğrudan belgelenmiş bir yazı dili değil, iç ve dış rekonstrüksiyon modelidir.",
      en: "Scientific distinction: Proto-Turkic is not a directly attested literary language, but an internal/external reconstruction model.",
    },
    sourceIds: ["brill-etlo-classification", "robbeets-2023", "johanson-csato-2022"],
  },
  {
    id: "gokturk",
    slug: "gokturk-donemi",
    order: 2,
    status: "attested",
    startYear: 552,
    endYear: 745,
    dateLabel: { tr: "6.–8. Yüzyıl (Yazıtlar: ~720–735)", en: "6th–8th Century (Inscriptions: ~720–735)" },
    title: { tr: "Göktürk (Orhon) Türkçesi", en: "Göktürk (Orkhon) Turkic" },
    subtitle: { tr: "Yazılı Belgelerle Kanıtlanan İlk Türk Edebiyat Dili", en: "Earliest Attested Turkic Literary Language" },
    region: { tr: "Orhon Vadisi & Ötüken (Moğolistan)", en: "Orkhon Valley & Ötüken (Mongolia)" },
    coordinates: { lat: 47.55, lng: 102.84 },
    scripts: ["gokturk-runic"],
    keyWorks: ["Tonyukuk Yazıtı (~720–726)", "Kül Tigin Yazıtı (732)", "Bilge Kağan Yazıtı (735)"],
    linguisticHighlights: {
      tr: [
        "38 harfli Göktürk runiform yazısıyla taşa kazınmış anıtsal devlet hitabeleri.",
        "Söz içi ve sonu /d/ sesinin korunumu (ör. adaq 'ayak', edgü 'iyi').",
        "1893'te Vilhelm Thomsen tarafından çözümlenmiştir.",
      ],
      en: [
        "Monumental state inscriptions carved in the 38-sign Old Turkic runiform script.",
        "Preservation of intervocalic and final /d/ (e.g., adaq 'foot', edgü 'good').",
        "Deciphered by Vilhelm Thomsen in 1893.",
      ],
    },
    summary: {
      tr: "İkinci Türk Kağanlığı döneminde Orhon Vadisi'nde dikilen anıtlarla Türkçenin doğrudan belgelenmiş yazılı tarihi başlar. Gelişmiş hitabet üslubu, bu dilin yazıya geçmeden önce de köklü bir sözlü ve idari geleneğe sahip olduğunu gösterir.",
      en: "The directly attested written history of Turkic begins with the monuments erected in the Orkhon Valley during the Second Turkic Khaganate. Their refined rhetorical style reflects a mature pre-existing administrative tradition.",
    },
    academicNote: {
      tr: "Orhon Vadisi Kültürel Peyzajı 2004'te UNESCO Dünya Mirası Listesi'ne kaydedilmiştir.",
      en: "The Orkhon Valley Cultural Landscape was inscribed on the UNESCO World Heritage List in 2004.",
    },
    sourceIds: ["erdal-2004", "tekin-1991-1995", "unesco-orkhon-2004", "tdv-thomsen-2012"],
  },
  {
    id: "old-uyghur",
    slug: "eski-uygurca",
    order: 3,
    status: "attested",
    startYear: 745,
    endYear: 1300,
    dateLabel: { tr: "8.–13. Yüzyıl", en: "8th–13th Century" },
    title: { tr: "Eski Uygur Türkçesi", en: "Old Uyghur Turkic" },
    subtitle: { tr: "İpek Yolu Çok Alfabeli Yazma ve Çeviri Geleneği", en: "Silk Road Multi-Script Manuscript & Translation Tradition" },
    region: { tr: "Ötüken, Turfan (Koço), Dunhuang, Kansu", en: "Ötüken, Turfan (Qocho), Dunhuang, Gansu" },
    coordinates: { lat: 42.95, lng: 89.19 },
    scripts: ["old-uyghur", "gokturk-runic", "brahmi", "manichaean", "syriac"],
    keyWorks: ["Irk Bitig (10. yy.)", "Altun Yaruk", "Säkiz Yükmäk Yaruk", "Kalyanamkara ve Papamkara"],
    linguisticHighlights: {
      tr: [
        "Budizm, Maniheizm ve Nasturi Hristiyanlık metinleriyle zenginleşen terim hazinesi.",
        "Aynı dilin Soğd-Uygur, Runik, Maniheist, Brahmi ve Süryani alfabeleriyle yazılması.",
        "Berlin Turfan Koleksiyonu'nda yaklaşık 8.000 fragman korunmaktadır.",
      ],
      en: [
        "Rich terminology developed through Buddhist, Manichaean, and Nestorian Christian translations.",
        "Same language recorded across Old Uyghur, Runiform, Manichaean, Brahmi, and Syriac scripts.",
        "Roughly 8,000 fragments preserved in the Berlin Turfan Collection.",
      ],
    },
    summary: {
      tr: "Eski Uygurca, göçebe bozkır epigrafisinden İpek Yolu vaha kentlerindeki yerleşik kitap, rulo ve tahta blok baskı kültürüne geçişi temsil eder. Modern Uygurca doğrudan Eski Uygurcanın değil, Karahanlı–Çağatay çizgisinin devamıdır.",
      en: "Old Uyghur marks the transition from steppe epigraphy to settled Silk Road codex, scroll, and woodblock print culture. Modern Uyghur descends from the Karakhanid–Chagatai line rather than directly from Old Uyghur.",
    },
    academicNote: {
      tr: "Bilimsel ayrım: Dil bir, alfabe çoktur; Eski Uygurca tek bir yazıya indirgenemez.",
      en: "Scientific distinction: One language written in multiple scripts; Old Uyghur cannot be reduced to a single script.",
    },
    sourceIds: ["erdal-2004", "raschmann-2024", "bbaw-turfan", "brill-etlo-runiform"],
  },
  {
    id: "karakhanid",
    slug: "karahanli-turkcesi",
    order: 4,
    status: "attested",
    startYear: 1000,
    endYear: 1250,
    dateLabel: { tr: "11.–13. Yüzyıl", en: "11th–13th Century" },
    title: { tr: "Karahanlı Türkçesi (Hakaniye)", en: "Karakhanid Turkic (Khakani)" },
    subtitle: { tr: "İlk İslami Türk Yazı Dili ve İlk Türkolog Eseri", en: "First Islamic Turkic Literary Language & Lexicography" },
    region: { tr: "Kaşgar, Balasagun, Semerkant", en: "Kashgar, Balasagun, Samarkand" },
    coordinates: { lat: 39.47, lng: 75.99 },
    scripts: ["arabic", "old-uyghur"],
    keyWorks: ["Kutadgu Bilig (1069–1070)", "Dîvânu Lugâti't-Türk (1072–1074)", "Atabetü'l-Hakayık"],
    linguisticHighlights: {
      tr: [
        "Arap yazısının Türk dilinin ses yapısına uyarlanmaya başlanması (hurûf-ı imlâ).",
        "Kaşgarlı Mahmud tarafından Türk lehçelerinin ilk karşılaştırmalı sözlüğü ve haritasının hazırlanması.",
        "Eski Türkçe /d/ sesinin yer yer /ð/ (peltek z) üzerinden /y/ yönüne geçiş evresi.",
      ],
      en: [
        "Early adaptation of the Arabic script to Turkic phonology (huruf-i imla).",
        "First comparative dictionary and map of Turkic dialects by Mahmud al-Kashgari.",
        "Transitional stage of Old Turkic /d/ > /ð/ toward /y/.",
      ],
    },
    summary: {
      tr: "Karahanlılar döneminde Türkçe, İslam medeniyetiyle kurduğu derin temas sonucunda yeni bir edebî ve bilimsel atılım gerçekleştirdi. Kutadgu Bilig siyaset ve ahlak felsefesini, Dîvânu Lugâti't-Türk ise karşılaştırmalı Türkoloji'yi başlattı.",
      en: "Under the Karakhanids, Turkic achieved a major literary and scholarly synthesis with Islamic civilization. Kutadgu Bilig inaugurated Turkic political philosophy, while Diwan Lughat al-Turk founded comparative Turkology.",
    },
    academicNote: {
      tr: "Dîvânu Lugâti't-Türk 2017'de UNESCO Dünya Belleği Kütüğü'ne alınmıştır.",
      en: "Diwan Lughat al-Turk was inscribed in the UNESCO Memory of the World Register in 2017.",
    },
    sourceIds: ["unesco-diwan-2017", "unesco-kutadgu-2019", "erdal-2004"],
  },
  {
    id: "khwarazmian",
    slug: "harezm-turkcesi",
    order: 5,
    status: "attested",
    startYear: 1250,
    endYear: 1400,
    dateLabel: { tr: "13.–14. Yüzyıl", en: "13th–14th Century" },
    title: { tr: "Harezm Türkçesi", en: "Khwarazmian Turkic" },
    subtitle: { tr: "Karahanlıdan Çağataycaya Geçiş Köprüsü", en: "Transitional Bridge from Karakhanid to Chagatai" },
    region: { tr: "Harezm, Aşağı Seyhun, Altın Orda Doğusu", en: "Khwarazm, Lower Syr Darya, Eastern Golden Horde" },
    coordinates: { lat: 41.55, lng: 60.63 },
    scripts: ["arabic", "old-uyghur"],
    keyWorks: ["Kısasü'l-Enbiya (Rabgûzî, 1310)", "Muhabbetnâme (Harezmî, 1353)", "Nehcü'l-Ferâdis"],
    linguisticHighlights: {
      tr: [
        "Karahanlı temeli üzerinde Oğuz ve Kıpçak unsurlarının harmanlanması.",
        "Eski Türkçe /ð/ sesinin tamamen /y/ sesine dönüşümü (adaq > ayaq).",
        "Altın Orda'nın doğu ve batı kültür merkezlerini birbirine bağlaması.",
      ],
      en: [
        "Blending of Oghuz and Kipchak elements on a Karakhanid foundation.",
        "Complete shift of Old Turkic /ð/ to /y/ (adaq > ayaq).",
        "Connected eastern and western cultural centers of the Golden Horde.",
      ],
    },
    summary: {
      tr: "Moğol istilası sonrası Harezm ve Seyhun boylarında gelişen Harezm Türkçesi, Orta Asya'da klasik Çağatay yazı dilinin doğuşuna zemin hazırlayan kritik geçiş dönemidir.",
      en: "Emerging in Khwarazm and along the Syr Darya after the Mongol conquests, Khwarazmian Turkic served as the pivotal transitional literary language leading to Classical Chagatai.",
    },
    academicNote: {
      tr: "TDV İslâm Ansiklopedisi Çağatay Edebiyatı maddesinde 13.–14. yy. geçiş dönemi olarak ele alınır.",
      en: "Treated in TDV Islam Ansiklopedisi as the 13th–14th century transitional phase toward Chagatai.",
    },
    sourceIds: ["tdv-cagatay-1993", "johanson-csato-2022"],
  },
  {
    id: "kipchak",
    slug: "kipcak-turkcesi",
    order: 6,
    status: "attested",
    startYear: 1250,
    endYear: 1500,
    dateLabel: { tr: "13.–15. Yüzyıl", en: "13th–15th Century" },
    title: { tr: "Tarihsel Kıpçak Türkçesi", en: "Historical Kipchak Turkic" },
    subtitle: { tr: "Deşt-i Kıpçak, Memlük Mısır ve Doğu Avrupa Belgeleri", en: "Dasht-i Qipchaq, Mamluk Egypt & Eastern Europe" },
    region: { tr: "Karadeniz Kuzeyi (Kırım), Altın Orda, Mısır-Suriye", en: "Pontic Steppe (Crimea), Golden Horde, Egypt-Syria" },
    coordinates: { lat: 45.0, lng: 35.0 },
    scripts: ["latin-historical", "arabic", "armenian"],
    keyWorks: ["Codex Cumanicus (13.–14. yy.)", "Kitâbü'l-İdrâk", "Et-Tuhfetü'z-Zekiyye"],
    linguisticHighlights: {
      tr: [
        "Hece sonu /g/ sesinin /w/ veya /y/ yönünde erimesi (tağ > taw).",
        "Latin harfli Codex Cumanicus ile Avrupa'da belgelenen ilk kapsamlı Kıpçakça sözlük.",
        "Memlük sahasında Arap gramer geleneğiyle yazılmış Türkçe sözlükler ve Ermeni harfli Kıpçakça hukuk belgeleri.",
      ],
      en: [
        "Lenition of syllable-final /g/ to /w/ or /y/ (tağ > taw).",
        "Codex Cumanicus: the earliest extensive European Latin-script record of Kipchak.",
        "Mamluk Arabic-script grammars and Armeno-Kipchak legal/religious documents.",
      ],
    },
    summary: {
      tr: "Kıpçak Türkçesi, Avrasya bozkırlarından Mısır'daki Memlük Sultanlığı'na ve Lehistan-Ukrayna Ermeni diasporasına kadar uzanan olağanüstü bir coğrafyada üç farklı yazı sistemiyle (Latin, Arap, Ermeni) belgelenmiştir.",
      en: "Kipchak Turkic is attested across an extraordinary geographic span from the Pontic steppe to Mamluk Egypt and Eastern Europe in three distinct scripts: Latin, Arabic, and Armenian.",
    },
    academicNote: {
      tr: "Çağdaş Kazakça, Tatarca, Başkurtça, Kırgızca ve Kırım Tatarcası Kuzeybatı (Kıpçak) dalının mirasçılarıdır.",
      en: "Modern Kazakh, Tatar, Bashkir, Kyrgyz, and Crimean Tatar belong to the Northwestern (Kipchak) branch.",
    },
    sourceIds: ["johanson-csato-2022", "brill-etlo-classification"],
  },
  {
    id: "chagatai",
    slug: "cagatay-turkcesi",
    order: 7,
    status: "attested",
    startYear: 1400,
    endYear: 1900,
    dateLabel: { tr: "15.–19. Yüzyıl", en: "15th–19th Century" },
    title: { tr: "Çağatay Türkçesi", en: "Chagatai Turkic" },
    subtitle: { tr: "Orta Asya'nın Klasik Ortak Yazı Dili", en: "Classical Transregional Literary Language of Central Asia" },
    region: { tr: "Herat, Semerkant, Buhara, Doğu Türkistan", en: "Herat, Samarkand, Bukhara, East Turkestan" },
    coordinates: { lat: 34.35, lng: 62.2 },
    scripts: ["arabic", "old-uyghur"],
    keyWorks: ["Muhâkemetü'l-Lugateyn (Ali Şîr Nevâî, 1499)", "Hamse", "Babürnâme (16. yy.)"],
    linguisticHighlights: {
      tr: [
        "Ali Şîr Nevâî ile klasikleşen ve Orta Asya'dan Hindistan'a (Babürlüler) uzanan yüksek edebiyat dili.",
        "Nevâî'nin Muhâkemetü'l-Lugateyn'de Türkçenin Farsça karşısındaki anlatım gücünü savunması.",
        "Modern Özbekçe ve Yeni Uygurcanın doğrudan edebî öncülüdür.",
      ],
      en: [
        "Canonized by Ali-Shir Nava'i; served as a high literary language from Central Asia to Mughal India.",
        "Nava'i's Muhakamat al-Lughatayn systematically compared Turkic and Persian expressive capacities.",
        "Direct literary predecessor of Modern Uzbek and Modern Uyghur.",
      ],
    },
    summary: {
      tr: "Timurlu rönesansının Herat ve Semerkant merkezli kültür ortamında doğan Çağatayca, beş yüzyıl boyunca Orta Asya Türk dünyasının ortak yazılı iletişim ve edebiyat dili olmuştur.",
      en: "Born in the Timurid cultural centers of Herat and Samarkand, Chagatai served for five centuries as the shared literary and administrative language of Central Asian Turkic peoples.",
    },
    academicNote: {
      tr: "Kemal Eraslan'ın TDV İslâm Ansiklopedisi maddesi Çağataycanın dönemlendirmesini ayrıntılandırır.",
      en: "Kemal Eraslan's TDV Islam Ansiklopedisi entry details the periodization of Chagatai literature.",
    },
    sourceIds: ["tdv-cagatay-1993", "johanson-csato-2022"],
  },
  {
    id: "old-anatolian",
    slug: "eski-anadolu-turkcesi",
    order: 8,
    status: "attested",
    startYear: 1200,
    endYear: 1500,
    dateLabel: { tr: "13.–15. Yüzyıl", en: "13th–15th Century" },
    title: { tr: "Eski Anadolu Türkçesi (Eski Oğuzca)", en: "Old Anatolian Turkish (Old Oghuz)" },
    subtitle: { tr: "Oğuz Türkçesinin Anadolu'da Yazı Diline Dönüşümü", en: "Rise of Oghuz Turkic as a Literary Language in Anatolia" },
    region: { tr: "Anadolu ve Azerbaycan Sahası", en: "Anatolia and Azerbaijan" },
    coordinates: { lat: 37.87, lng: 32.48 },
    scripts: ["arabic"],
    keyWorks: ["Yunus Emre Divanı", "Garibnâme (Âşık Paşa, 1330)", "Dede Korkut Kitabı"],
    linguisticHighlights: {
      tr: [
        "Oğuzca ses özelliklerinin (söz başı t- > d-, söz içi -g- düşmesi) yazıya yerleşmesi.",
        "Anadolu Beylikleri döneminde Türkçenin bilim, tasavvuf ve devlet dili olarak bilinçli savunusu.",
        "Harekeli Arap yazısıyla Türkçe ünlülerin belirginleştirildiği metinler.",
      ],
      en: [
        "Consolidation of Oghuz phonological traits (initial t- > d-, loss of medial -g-).",
        "Conscious patronage of Turkish in Anatolian Beyliks for science, poetry, and administration.",
        "Frequent use of Arabic vowel diacritics (harakat) to mark Turkish vowels.",
      ],
    },
    summary: {
      tr: "Selçuklu sonu ve Anadolu Beylikleri döneminde Oğuz lehçeleri ilk kez bağımsız ve duru bir yazı dili kimliği kazandı. Yunus Emre'nin şiirleri ve Âşık Paşa'nın Garibnâme'si bu dönemin zirveleridir.",
      en: "During the late Seljuk and Anatolian Beylik eras, Oghuz dialects crystallized into an independent literary language, exemplified by Yunus Emre's poetry and Aşık Pasha's Garibname.",
    },
    academicNote: {
      tr: "Osmanlı Türkçesi ve modern Türkiye Türkçesi ile Azerbaycan Türkçesi bu ortak Oğuz yazı dili zemininden doğmuştur.",
      en: "Ottoman Turkish, Modern Turkish, and Azerbaijani all stem from this shared Old Oghuz literary foundation.",
    },
    sourceIds: ["johanson-csato-2022", "brill-etlo-classification"],
  },
  {
    id: "ottoman",
    slug: "osmanli-turkcesi",
    order: 9,
    status: "attested",
    startYear: 1500,
    endYear: 1928,
    dateLabel: { tr: "16.–20. Yüzyıl Başı (1928'e dek)", en: "16th–Early 20th Century (until 1928)" },
    title: { tr: "Osmanlı Türkçesi", en: "Ottoman Turkish" },
    subtitle: { tr: "İmparatorluk Yönetim, Arşiv ve Klasik Edebiyat Dili", en: "Imperial Administrative, Archival & Classical Literary Language" },
    region: { tr: "İstanbul, Balkanlar, Anadolu, Doğu Akdeniz", en: "Istanbul, Balkans, Anatolia, Eastern Mediterranean" },
    coordinates: { lat: 41.01, lng: 28.97 },
    scripts: ["arabic"],
    keyWorks: ["Fuzûlî & Bâkî Divanları", "Seyahatnâme (Evliya Çelebi)", "Cihânnümâ (Kâtip Çelebi)"],
    linguisticHighlights: {
      tr: [
        "Dilbilgisi ve çekim yapısı Türkçe kalmakla birlikte Arapça ve Farsçadan yoğun sözcük ve tamlama alıntısı.",
        "19. yüzyıl Tanzimat basınıyla başlayan sadeleşme ve imla reformu tartışmaları.",
        "Divanî, rık'a, nesih ve talik hatlarıyla milyonlarca arşiv belgesi üretilmesi.",
      ],
      en: [
        "Core Turkic morphosyntax combined with extensive Arabic and Persian lexical and izafet borrowings.",
        "19th-century Tanzimat journalism and debates on language simplification and orthography.",
        "Millions of archival documents produced in Diwani, Riq'a, Naskh, and Ta'liq calligraphic styles.",
      ],
    },
    summary: {
      tr: "Osmanlı Türkçesi, üç kıtaya yayılan bir imparatorluğun bürokrasi, hukuk, bilim ve divan edebiyatı diliydi. 19. yüzyıldan itibaren matbuatın gelişimiyle halk diline yaklaşma ve imla tartışmaları hız kazandı.",
      en: "Ottoman Turkish served as the administrative, legal, scientific, and high literary language of a tri-continental empire, undergoing gradual simplification with 19th-century print culture.",
    },
    academicNote: {
      tr: "1928 Harf Devrimi ile yazı sistemi değişmiş; dilin kendisi ise Türkiye Türkçesi olarak devam etmiştir.",
      en: "The 1928 Reform changed the writing system, while the language itself continued as Modern Turkish.",
    },
    sourceIds: ["yilmaz-2011", "vekam-1928", "johanson-csato-2022"],
  },
  {
    id: "modern-turkish",
    slug: "turkiye-turkcesi",
    order: 10,
    status: "attested",
    startYear: 1928,
    endYear: null,
    dateLabel: { tr: "1928 – Günümüz", en: "1928 – Present" },
    title: { tr: "Türkiye Türkçesi ve Çağdaş Dönem", en: "Modern Turkish & Contemporary Era" },
    subtitle: { tr: "Harf Devrimi, Dil Planlaması ve Küresel Türk Dilleri", en: "Alphabet Reform, Language Planning & Global Turkic" },
    region: { tr: "Türkiye ve Çağdaş Türk Dünyası", en: "Türkiye and the Contemporary Turkic World" },
    coordinates: { lat: 39.93, lng: 32.85 },
    scripts: ["latin-turkish", "cyrillic", "latin-common"],
    keyWorks: ["1928 Türk Harfleri Kanunu", "TDK Türkçe Sözlük", "Çağdaş Türk Dilleri Yazı Gelenekleri"],
    linguisticHighlights: {
      tr: [
        "1 Kasım 1928 Harf Devrimi ile 29 harfli yüksek ses-harf uyumlu Latin alfabesine geçiş.",
        "1932'de Türk Dil Kurumunun (TDK) kuruluşu ve bilimsel terim üretimi.",
        "Aynı dönemde SSCB'de Yañalif (1926–1939) ve Kirilleştirme (1937–1940), 1991 sonrası yeniden Latinizasyon.",
      ],
      en: [
        "November 1, 1928 Alphabet Reform adopting a 29-letter phonemic Latin alphabet.",
        "Founding of the Turkish Language Association (TDK) in 1932 for scientific terminology.",
        "Parallel Soviet Yañalif (1926–1939), Cyrillicization (1937–1940), and post-1991 Latinization.",
      ],
    },
    summary: {
      tr: "20. yüzyıl, Türk dilleri tarihinde hem Türkiye'de Harf ve Dil Devrimi hem de Avrasya'daki diğer Türk cumhuriyetlerinde alfabe dönüşümleriyle şekillendi. Bugün Türk dilleri 20'yi aşkın edebî dille yaşamaktadır.",
      en: "The 20th century reshaped the Turkic world through Türkiye's 1928 Alphabet Reform and parallel script transitions across Eurasia. Today, over 20 literary Turkic languages thrive.",
    },
    academicNote: {
      tr: "Günümüzde Türkiye Türkçesi 70 milyonu aşkın ana dili konuşuruyla ailenin en büyük edebî dilidir.",
      en: "Modern Turkish is today the largest literary language in the family with over 70 million native speakers.",
    },
    sourceIds: ["yilmaz-2011", "vekam-1928", "johanson-csato-2022"],
  },
];
