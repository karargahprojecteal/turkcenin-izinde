export interface ScriptGlyphSample {
  glyph: string;
  transliteration: string;
  phonetic: string;
  note: { tr: string; en: string };
}

export interface AlphabetSystem {
  id: string;
  name: { tr: string; en: string };
  writingSystemType: { tr: string; en: string };
  era: { tr: string; en: string };
  direction: "rtl" | "ltr" | "ttb-ltr";
  directionLabel: { tr: string; en: string };
  region: { tr: string; en: string };
  signCount: string;
  unicodeBlock?: string;
  sampleWord: {
    original: string;
    transliteration: string;
    meaning: { tr: string; en: string };
    hasFontNote?: boolean;
  };
  glyphs: ScriptGlyphSample[];
  description: { tr: string; en: string };
  scientificNote: { tr: string; en: string };
  sourceIds: string[];
}

export const ALPHABET_SYSTEMS: AlphabetSystem[] = [
  {
    id: "gokturk-runic",
    name: { tr: "Göktürk (Orhun-Yenisey) Alfabesi", en: "Old Turkic (Orkhon-Yenisei) Script" },
    writingSystemType: { tr: "Özgün Runiform Karma Alfabe", en: "Indigenous Runiform Hybrid Alphabet" },
    era: { tr: "8.–10. Yüzyıl", en: "8th–10th Century" },
    direction: "rtl",
    directionLabel: { tr: "Sağdan sola yatay (bazı taşlarda dikey)", en: "Right-to-left horizontal (vertical on some stelae)" },
    region: { tr: "Moğolistan (Orhon), Güney Sibirya (Yenisey), Talas", en: "Mongolia (Orkhon), South Siberia (Yenisei), Talas" },
    signCount: "38–40 işaret",
    unicodeBlock: "U+10C00–U+10C4F (Old Turkic)",
    sampleWord: {
      original: "𐱅𐰭𐰼𐰃",
      transliteration: "t²ŋr²i (Teŋri)",
      meaning: { tr: "Gök / Tanrı", en: "Sky / Tengri" },
    },
    glyphs: [
      { glyph: "𐰀", transliteration: "a / e", phonetic: "/a, e/", note: { tr: "Ünlü işareti (söz başında çoğunlukla yazılmaz)", en: "Vowel sign (often omitted word-initially)" } },
      { glyph: "𐱅", transliteration: "t²", phonetic: "/t/ (ince)", note: { tr: "İnce ünlülerle kullanılan t", en: "Front-vocalic /t/" } },
      { glyph: "𐱃", transliteration: "t¹", phonetic: "/t/ (kalın)", note: { tr: "Kalın ünlülerle kullanılan t", en: "Back-vocalic /t/" } },
      { glyph: "𐰭", transliteration: "ŋ", phonetic: "/ŋ/", note: { tr: "Genizsil n (ng)", en: "Velar nasal /ŋ/" } },
      { glyph: "𐰼", transliteration: "r²", phonetic: "/r/ (ince)", note: { tr: "İnce ünlülerle kullanılan r", en: "Front-vocalic /r/" } },
      { glyph: "𐰃", transliteration: "ı / i", phonetic: "/ɯ, i/", note: { tr: "Düz dar ünlü", en: "Unrounded high vowel" } },
    ],
    description: {
      tr: "Ünlü uyumuna göre kalın ve ince sıradan çift ünsüz işaretleri barındıran, Türk dilinin yapısına son derece uyumlu epigrafik ve el yazması yazısıdır. 1893'te Vilhelm Thomsen tarafından çözümlenmiştir.",
      en: "An epigraphic and manuscript script featuring dual consonant signs harmonized for back vs. front vowels. Deciphered in 1893 by Vilhelm Thomsen.",
    },
    scientificNote: {
      tr: "Modern Latin harfleriyle yapılan transkripsiyon (ör. Teŋri), özgün runik karakterlerin yerini tutmaz; akademik çevriyazıdır.",
      en: "Latin transcription (e.g., Teŋri) is a scholarly representation, not the historical script itself.",
    },
    sourceIds: ["tdv-thomsen-2012", "brill-etlo-runiform", "erdal-2004"],
  },
  {
    id: "old-uyghur",
    name: { tr: "Eski Uygur Alfabesi", en: "Old Uyghur Alphabet" },
    writingSystemType: { tr: "Soğd Kökenli Kursiv Alfabe", en: "Sogdian-Derived Cursive Alphabet" },
    era: { tr: "8.–15. Yüzyıl", en: "8th–15th Century" },
    direction: "ttb-ltr",
    directionLabel: { tr: "Yukarıdan aşağıya dikey; sütunlar soldan sağa", en: "Top-to-bottom vertical; columns left-to-right" },
    region: { tr: "Turfan, Dunhuang, Orta Asya, Altın Orda", en: "Turfan, Dunhuang, Central Asia, Golden Horde" },
    signCount: "14–18 temel işaret",
    unicodeBlock: "U+10F70–U+10FAF (Old Uyghur, Unicode 14.0)",
    sampleWord: {
      original: "𐽰𐽰𐾁𐾀𐽳𐽺",
      transliteration: "ʾʾltwn (altun)",
      meaning: { tr: "Altın", en: "Gold" },
      hasFontNote: true,
    },
    glyphs: [
      { glyph: "𐽰", transliteration: "ʾ (alef)", phonetic: "/a, e/", note: { tr: "Söz başı ünlü taşıyıcısı", en: "Initial vowel carrier" } },
      { glyph: "𐽲", transliteration: "q / ɣ", phonetic: "/q, ʁ/", note: { tr: "Kalın artdamak ünsüzü", en: "Back velar/uvular" } },
      { glyph: "𐽶", transliteration: "y", phonetic: "/j, i, e/", note: { tr: "Yarım ünlü ve i/e işaretleyicisi", en: "Glide and i/e marker" } },
      { glyph: "𐽳", transliteration: "w", phonetic: "/o, ö, u, ü/", note: { tr: "Yuvarlak ünlü işaretleyicisi", en: "Rounded vowel marker" } },
      { glyph: "𐾀", transliteration: "t / d", phonetic: "/t, d/", note: { tr: "Diş ünsüzü", en: "Dental stop" } },
      { glyph: "𐽺", transliteration: "n", phonetic: "/n/", note: { tr: "Geniz ünsüzü", en: "Nasal" } },
    ],
    description: {
      tr: "Arami–Soğd çizgisinden uyarlanan ve İpek Yolu'nda Budist, Maniheist ve idari metinlerde kullanılan bitişik (kursiv) yazı sistemidir. Moğol ve Mançu alfabelerinin doğrudan atasıdır.",
      en: "A cursive script adapted from Sogdian, widely used along the Silk Road for Buddhist, Manichaean, and administrative texts. Direct ancestor of the Mongolian and Manchu scripts.",
    },
    scientificNote: {
      tr: "Unicode 14.0 (U+10F70) desteği olmayan tarayıcılarda glifler sistem fontuna bağlı olarak kutu görünebilir; bu nedenle transkripsiyon ve SVG yönelim şeması eşzamanlı sunulur.",
      en: "In browsers lacking Unicode 14.0 Old Uyghur fonts, glyphs may fall back; scholarly transliteration and SVG orientation diagrams are provided alongside.",
    },
    sourceIds: ["raschmann-2024", "bbaw-turfan", "erdal-2004"],
  },
  {
    id: "arabic",
    name: { tr: "Arap Temelli Türk Alfabeleri (Karahanlı–Osmanlı–Çağatay)", en: "Arabic-Based Turkic Scripts" },
    writingSystemType: { tr: "Uyarlanmış Abjad (Ünsüz Ağırlıklı)", en: "Adapted Abjad" },
    era: { tr: "11. Yüzyıl – 1928 (ve günümüzde Sincan/İran)", en: "11th Century – 1928 (and today in Xinjiang/Iran)" },
    direction: "rtl",
    directionLabel: { tr: "Sağdan sola yatay", en: "Right-to-left horizontal" },
    region: { tr: "Kaşgar, Herat, İstanbul, Kahire, Kazan", en: "Kashgar, Herat, Istanbul, Cairo, Kazan" },
    signCount: "28 + 4–5 ek harf (پ چ ژ گ ڭ)",
    unicodeBlock: "U+0600–U+06FF (Arabic)",
    sampleWord: {
      original: "توركجه / ديوان لغات الترك",
      transliteration: "Türkçe / Dîvânu Lugâti't-Türk",
      meaning: { tr: "Türkçe / Türk Lehçeleri Sözlüğü", en: "Turkish / Compendium of Turkic Dialects" },
    },
    glyphs: [
      { glyph: "پ", transliteration: "p", phonetic: "/p/", note: { tr: "Farsça üzerinden eklenen üç noktalı b", en: "Added /p/ sign" } },
      { glyph: "چ", transliteration: "ç", phonetic: "/tʃ/", note: { tr: "Üç noktalı cim", en: "Added /tʃ/ sign" } },
      { glyph: "گ", transliteration: "g", phonetic: "/ɡ/", note: { tr: "Kalın ve ince g / ğ değerleri", en: "Velar/palatal /g/" } },
      { glyph: "ڭ", transliteration: "ñ (sağır kef)", phonetic: "/ŋ/", note: { tr: "Türkçeye özgü genizsil n (örn. deñiz, baña)", en: "Turkic-specific velar nasal /ŋ/" } },
      { glyph: "و", transliteration: "v / o / ö / u / ü", phonetic: "/v, o, ø, u, y/", note: { tr: "Okutucu (hurûf-ı imlâ) olarak yuvarlak ünlüler", en: "Mater lectionis for rounded vowels" } },
      { glyph: "ى", transliteration: "y / ı / i", phonetic: "/j, ɯ, i/", note: { tr: "Okutucu olarak düz dar ünlüler", en: "Mater lectionis for unrounded high vowels" } },
    ],
    description: {
      tr: "Yaklaşık bin yıl boyunca Karahanlı, Harezm, Çağatay, Memlük Kıpçak ve Osmanlı sahalarının ana yazı sistemi olmuştur. Arapçadaki 3 uzun ünlüye karşılık Türkçenin 8–9 ünlüsünü göstermek için okutucu harfler ve ek işaretler geliştirilmiştir.",
      en: "Served for nearly a millennium across Karakhanid, Khwarazmian, Chagatai, Mamluk Kipchak, and Ottoman domains, adapted with vowel letters (huruf-i imla) and extra consonants.",
    },
    scientificNote: {
      tr: "Aynı Arap yazısı, Osmanlı imlasında tarihsel-etimolojik yazımı korurken, 20. yy. Yeni Uygur (Kona Yéziq) imlasında tam sesçil yapıya kavuşmuştur.",
      en: "While Ottoman orthography retained historical-etymological spellings, modern Uyghur Arabic orthography became fully vocalized.",
    },
    sourceIds: ["unesco-diwan-2017", "tdv-cagatay-1993", "yilmaz-2011"],
  },
  {
    id: "latin-turkish",
    name: { tr: "1928 Türk Latin Alfabesi (ve Yañalif / Ortak Latin)", en: "1928 Turkish Latin Alphabet (& Yañalif)" },
    writingSystemType: { tr: "Tam Sesçil (Fonemik) Alfabe", en: "Phonemic Alphabet" },
    era: { tr: "1926 (Yañalif) / 1928 (Türkiye) – Günümüz", en: "1926 (Yañalif) / 1928 (Türkiye) – Present" },
    direction: "ltr",
    directionLabel: { tr: "Soldan sağa yatay", en: "Left-to-right horizontal" },
    region: { tr: "Türkiye, Azerbaycan, Türkmenistan, Özbekistan", en: "Türkiye, Azerbaijan, Turkmenistan, Uzbekistan" },
    signCount: "29 harf (Türkiye Türkçesi)",
    unicodeBlock: "Basic Latin + Latin-1 / Extended-A",
    sampleWord: {
      original: "Ç, Ğ, I, İ, Ö, Ş, Ü",
      transliteration: "Ses–Harf Birebir Uyumu",
      meaning: { tr: "8 ünlü, 21 ünsüz tam fonemik sistem", en: "8 vowels, 21 consonants phonemic system" },
    },
    glyphs: [
      { glyph: "Ç ç", transliteration: "ç", phonetic: "/tʃ/", note: { tr: "Ötümsüz ön damak-dişeti patlamalı sızıcısı", en: "Voiceless postalveolar affricate" } },
      { glyph: "Ğ ğ", transliteration: "ğ (yumuşak g)", phonetic: "/ː ~ ɰ/", note: { tr: "Ünlü uzatması / artdamak sürtünmelisi", en: "Vowel lengthening / velar approximant" } },
      { glyph: "I ı", transliteration: "ı", phonetic: "/ɯ/", note: { tr: "Noktasız kalın düz dar ünlü", en: "Close back unrounded vowel" } },
      { glyph: "İ i", transliteration: "i", phonetic: "/i/", note: { tr: "Noktalı ince düz dar ünlü (büyük İ korunur)", en: "Close front unrounded vowel" } },
      { glyph: "Ö ö", transliteration: "ö", phonetic: "/ø/", note: { tr: "İnce yuvarlak geniş ünlü", en: "Mid front rounded vowel" } },
      { glyph: "Ş ş", transliteration: "ş", phonetic: "/ʃ/", note: { tr: "Ötümsüz ön damak sızıcısı", en: "Voiceless postalveolar fricative" } },
    ],
    description: {
      tr: "1 Kasım 1928'de kabul edilen Türk Alfabesi, Türkçenin 8 ünlüsünü ayrı ayrı karşılayan yüksek ses-harf uyumuyla tasarlanmıştır. Aynı yıllarda SSCB'deki Türk halkları da 1926–1939 arasında Yañalif Latin alfabesini kullanmıştır.",
      en: "Adopted on November 1, 1928, the Turkish Latin alphabet was engineered for near one-to-one phonemic correspondence for all 8 Turkish vowels. Parallel Soviet Turkic Latinization (Yañalif) ran from 1926 to 1939.",
    },
    scientificNote: {
      tr: "1928 Reformu dili değil yazı sistemini değiştirmiştir; Türkçe o tarihten önce de vardı ve devam etmektedir.",
      en: "The 1928 Reform changed the writing system, not the language's genetic identity.",
    },
    sourceIds: ["yilmaz-2011", "vekam-1928", "johanson-csato-2022"],
  },
  {
    id: "cyrillic",
    name: { tr: "Kiril Temelli Türk Alfabeleri", en: "Cyrillic-Based Turkic Alphabets" },
    writingSystemType: { tr: "Uyarlanmış Tam Alfabe", en: "Adapted Full Alphabet" },
    era: { tr: "19. yy. (İlminskiy) / 1937–1940 – Günümüz", en: "19th c. / 1937–1940 – Present" },
    direction: "ltr",
    directionLabel: { tr: "Soldan sağa yatay", en: "Left-to-right horizontal" },
    region: { tr: "Kazakistan, Kırgızistan, Tataristan, Başkurdistan, Çuvaşistan, Saha", en: "Kazakhstan, Kyrgyzstan, Tatarstan, Bashkortostan, Chuvashia, Sakha" },
    signCount: "35–42 harf (dile göre değişir)",
    unicodeBlock: "U+0400–U+04FF (Cyrillic)",
    sampleWord: {
      original: "Түркі / Қазақ / Саха",
      transliteration: "Türki / Qazaq / Saxa",
      meaning: { tr: "Türkî / Kazak / Saha", en: "Turkic / Kazakh / Sakha" },
    },
    glyphs: [
      { glyph: "Ә ә", transliteration: "ä / ə", phonetic: "/æ/", note: { tr: "Açık ince e (Kazakça, Tatarca, Başkurtça)", en: "Open front unrounded vowel" } },
      { glyph: "Ө ө", transliteration: "ö", phonetic: "/ø/", note: { tr: "İnce yuvarlak ünlü", en: "Front rounded vowel" } },
      { glyph: "Ү ү", transliteration: "ü", phonetic: "/y/", note: { tr: "Dar ince yuvarlak ünlü", en: "Close front rounded vowel" } },
      { glyph: "Қ қ", transliteration: "q", phonetic: "/q/", note: { tr: "Kalın artdamak patlamalısı (Kazakça)", en: "Uvular stop (Kazakh)" } },
      { glyph: "Ғ ғ", transliteration: "ğ", phonetic: "/ʁ/", note: { tr: "Kalın artdamak sürtünmelisi", en: "Voiced uvular fricative" } },
      { glyph: "Ң ң", transliteration: "ŋ", phonetic: "/ŋ/", note: { tr: "Genizsil n", en: "Velar nasal" } },
    ],
    description: {
      tr: "1937–1940 yıllarında Sovyetler Birliği'ndeki Türk cumhuriyetlerinin Yañalif'ten Kiril alfabesine geçirilmesiyle standartlaşmış; her Türk dilinin ses özelliklerine göre ek harfler türetilmiştir.",
      en: "Standardized across Soviet Turkic republics in 1937–1940 replacing Yañalif, augmented with specialized letters for Turkic front vowels and uvular/nasal consonants.",
    },
    scientificNote: {
      tr: "1991 sonrası Azerbaycan, Türkmenistan ve Özbekistan Latin'e geçmiş; Kazakistan aşamalı geçiş planlamıştır.",
      en: "Post-1991, Azerbaijan, Turkmenistan, and Uzbekistan shifted to Latin, while Kazakhstan initiated a phased transition.",
    },
    sourceIds: ["johanson-csato-2022", "brill-etlo-classification"],
  },
  {
    id: "brahmi-manichaean",
    name: { tr: "Brahmi, Maniheist ve Süryani Yazıları (İpek Yolu)", en: "Brahmi, Manichaean & Syriac Scripts (Silk Road)" },
    writingSystemType: { tr: "Abugida (Brahmi) & Abjad (Maniheist/Süryani)", en: "Abugida (Brahmi) & Abjad (Manichaean/Syriac)" },
    era: { tr: "8.–14. Yüzyıl", en: "8th–14th Century" },
    direction: "ltr",
    directionLabel: { tr: "Brahmi: Soldan sağa | Maniheist/Süryani: Sağdan sola", en: "Brahmi: LTR | Manichaean/Syriac: RTL" },
    region: { tr: "Turfan, Tarım Havzası, Yedisu", en: "Turfan, Tarim Basin, Semirechye" },
    signCount: "Yazı sistemine göre değişir",
    sampleWord: {
      original: "Brahmi & Maniheist Turfan Fragmanları",
      transliteration: "Sesbilgisel Tanıklık",
      meaning: { tr: "Ünlü uzunluğu ve ince/kalın ayrımlarının doğrudan kaydı", en: "Direct record of vowel qualities and lengths" },
    },
    glyphs: [
      { glyph: "𐫀", transliteration: "ā / a (Maniheist)", phonetic: "/a/", note: { tr: "Maniheist alef", en: "Manichaean aleph" } },
      { glyph: "𐫗", transliteration: "n (Maniheist)", phonetic: "/n/", note: { tr: "Maniheist nun", en: "Manichaean nun" } },
      { glyph: "क", transliteration: "ka (Brahmi)", phonetic: "/ka/", note: { tr: "Brahmi hece temelli ünlü gösterimi", en: "Brahmi syllabic vowel marking" } },
      { glyph: "ܐ", transliteration: "ālap (Süryani)", phonetic: "/a/", note: { tr: "Nasturi Türk mezar taşları", en: "Nestorian Turkic gravestones" } },
    ],
    description: {
      tr: "Eski Uygurcanın çok dinli İpek Yolu ortamında farklı yazı gelenekleriyle kaydedildiğini gösterir. Özellikle Hint kökenli Brahmi abugidası, Eski Türkçenin ünlü sistemini aydınlatmada eşsizdir.",
      en: "Demonstrates Old Uyghur's multi-religious Silk Road milieu. The Indic Brahmi abugida in particular provides crucial phonological evidence for Old Turkic vowels.",
    },
    scientificNote: {
      tr: "Aynı dönem ve aynı dilin farklı dinî topluluklarca farklı yazılarla yazılması (allografi) dil–alfabe ayrımının en güçlü kanıtıdır.",
      en: "Allography—writing the same language in different scripts by religious communities—proves language and script are distinct.",
    },
    sourceIds: ["erdal-2004", "bbaw-turfan", "raschmann-2024"],
  },
  {
    id: "yenisei-runic",
    name: { tr: "Yenisey Runik Yazısı", en: "Yenisei Runiform Script" },
    writingSystemType: { tr: "Bölgesel Runiform Alfabe Varyantı", en: "Regional Runiform Variant" },
    era: { tr: "8.–10. Yüzyıl", en: "8th–10th Century" },
    direction: "rtl",
    directionLabel: { tr: "Sağdan sola (bazen aşağıdan yukarıya / değişken)", en: "Right-to-left (variable on stelae)" },
    region: { tr: "Yukarı Yenisey (Hakasya–Tuva)", en: "Upper Yenisei (Khakassia–Tuva)" },
    signCount: "38–42 işaret (ek bölgesel harfler)",
    unicodeBlock: "U+10C00–U+10C4F (Old Turkic)",
    sampleWord: {
      original: "𐰀𐰼 𐰀𐰼𐰓𐰀𐰢𐰃𐰢",
      transliteration: "er erdemim...",
      meaning: { tr: "Erkeklik / yiğitlik erdemim...", en: "My manly valor..." },
    },
    glyphs: [
      { glyph: "𐰀", transliteration: "a / e", phonetic: "/a, e/", note: { tr: "Ortak runik ünlü", en: "Shared runiform vowel" } },
      { glyph: "𐰼", transliteration: "r²", phonetic: "/r/", note: { tr: "İnce r", en: "Front /r/" } },
    ],
    description: {
      tr: "Orhon yazıtlarıyla aynı runiform aileden olmakla birlikte kapalı /ė/ ve bazı özel ünsüz işaretleri bakımından yerel epigrafik farklılıklar gösterir.",
      en: "Shares the Orkhon runiform core while exhibiting distinct regional signs for closed /ė/ and local consonantal distinctions.",
    },
    scientificNote: {
      tr: "Yenisey mezar taşları kronolojik açıdan uzun süre tartışılmış; günümüzde ağırlıklı olarak 8.–10. yüzyıllara tarihlenmektedir.",
      en: "Yenisei stelae are dated primarily to the 8th–10th centuries.",
    },
    sourceIds: ["brill-etlo-runiform", "erdal-2004"],
  },
  {
    id: "hebrew-karaim",
    name: { tr: "İbrani Harfli Türk Yazısı (Karayca & Kırımçakça)", en: "Hebrew-Script Turkic (Karaim & Krymchak)" },
    writingSystemType: { tr: "Uyarlanmış Abjad (Noktalama/Hareke ile)", en: "Adapted Abjad (with Niqqud)" },
    era: { tr: "14.–20. Yüzyıl", en: "14th–20th Century" },
    direction: "rtl",
    directionLabel: { tr: "Sağdan sola yatay", en: "Right-to-left horizontal" },
    region: { tr: "Kırım, Litvanya (Trakai), Galiçya", en: "Crimea, Lithuania (Trakai), Galicia" },
    signCount: "22 temel harf + ünlü noktalamaları",
    unicodeBlock: "U+0590–U+05FF (Hebrew)",
    sampleWord: {
      original: "טנגרי / קאראי",
      transliteration: "Teñri / Qaray",
      meaning: { tr: "Tanrı / Karay", en: "God / Karaim" },
    },
    glyphs: [
      { glyph: "א", transliteration: "a / e", phonetic: "/a, e/", note: { tr: "Ünlü taşıyıcısı", en: "Vowel carrier" } },
      { glyph: "ק", transliteration: "q", phonetic: "/q/", note: { tr: "Kalın k", en: "Uvular /q/" } },
    ],
    description: {
      tr: "Doğu Avrupa ve Kırım'daki Musevi Türk topluluklarının (Karaylar ve Kırımçaklar) Tevrat çevirileri, dua kitapları ve edebiyatları için kullandıkları yazı sistemidir.",
      en: "Used by Turkic-speaking Jewish communities (Karaims and Krymchaks) for biblical translations, liturgy, and literature.",
    },
    scientificNote: {
      tr: "Dinî kimlik alfabe seçimini belirlemiş, ancak konuşulan dil Kıpçak Türkçesi olarak kalmıştır.",
      en: "Religious identity shaped script choice while the spoken language remained Kipchak Turkic.",
    },
    sourceIds: ["johanson-csato-2022"],
  },
  {
    id: "sogdian-source",
    name: { tr: "Soğd Yazısı (Köken & Etkileşim Yazısı)", en: "Sogdian Script (Source & Contact Script)" },
    writingSystemType: { tr: "Arami Kökenli Abjad (Kaynak Yazı)", en: "Aramaic-Derived Abjad (Source Script)" },
    era: { tr: "6.–9. Yüzyıl (Göktürk – Erken Uygur teması)", en: "6th–9th Century (Contact & Transmission)" },
    direction: "rtl",
    directionLabel: { tr: "Başlangıçta sağdan sola; geç dönemde dikey", en: "Initially RTL; later vertical" },
    region: { tr: "Soğdiana (Semerkant), Orhon (Bugut Yazıtı), Turfan", en: "Sogdiana, Orkhon (Bugut), Turfan" },
    signCount: "17–22 harf",
    unicodeBlock: "U+10F30–U+10F6F (Sogdian)",
    sampleWord: {
      original: "Bugut (581) & Karabalgasun Yazıtları",
      transliteration: "Soğdca resmi kayıtlar",
      meaning: { tr: "Birinci Türk Kağanlığı'nın ilk resmî yazıt dili/yazısı", en: "First official inscription script of the First Khaganate" },
    },
    glyphs: [
      { glyph: "𐼰", transliteration: "ʾ (alef)", phonetic: "/a/", note: { tr: "Soğd alef", en: "Sogdian aleph" } },
      { glyph: "𐼲", transliteration: "γ / x", phonetic: "/ɣ, x/", note: { tr: "Artdamak sürtünmelisi", en: "Velar fricative" } },
    ],
    description: {
      tr: "Birinci Türk Kağanlığı döneminde Bugut Yazıtı (581) Soğd dili ve yazısıyla yazılmıştır. Daha sonra Soğd kursiv yazısı doğrudan Eski Uygur alfabesine uyarlanmıştır.",
      en: "Used for the 581 Bugut Inscription in the First Turkic Khaganate; later directly adapted into the Old Uyghur alphabet.",
    },
    scientificNote: {
      tr: "Ayrım: Soğdça bir İrani dildir; ancak Soğd yazısı Eski Uygur alfabesinin doğrudan yapısal kaynağıdır.",
      en: "Distinction: Sogdian is an Iranian language, but its script served as the structural source for the Old Uyghur alphabet.",
    },
    sourceIds: ["erdal-2004", "bbaw-turfan"],
  },
  {
    id: "tibetan-contact",
    name: { tr: "Tibet Yazısı (İpek Yolu Etkileşim & Çeviri Yazısı)", en: "Tibetan Script (Silk Road Contact Script)" },
    writingSystemType: { tr: "Brahmi Kökenli Abugida", en: "Brahmi-Derived Abugida" },
    era: { tr: "8.–11. Yüzyıl (Dunhuang / Kansu)", en: "8th–11th Century (Dunhuang / Gansu)" },
    direction: "ltr",
    directionLabel: { tr: "Soldan sağa yatay", en: "Left-to-right horizontal" },
    region: { tr: "Dunhuang, Hexi Koridoru", en: "Dunhuang, Hexi Corridor" },
    signCount: "30 ünsüz + 4 ünlü işareti",
    unicodeBlock: "U+0F00–U+0FFF (Tibetan)",
    sampleWord: {
      original: "Dunhuang Çift Dilli Budist Fragmanları",
      transliteration: "Eski Uygur–Tibet temasları",
      meaning: { tr: "İpek Yolu'nda çeviri ve fonetik transkripsiyon teması", en: "Translation and phonetic transcription contact" },
    },
    glyphs: [
      { glyph: "ཀ", transliteration: "ka", phonetic: "/ka/", note: { tr: "Tibet abugida örneği", en: "Tibetan abugida example" } },
    ],
    description: {
      tr: "Dunhuang ve Kansu çevresinde Eski Uygurca Budist topluluklarla Tibetli Budist merkezler arasındaki yoğun çeviri ve transkripsiyon temaslarında kullanılmıştır.",
      en: "Used in Dunhuang and Gansu in bilingual Buddhist translation and phonetic transcription contexts alongside Old Uyghur.",
    },
    scientificNote: {
      tr: "Ayrım: Tibet yazısı Türklerin yaygın ana alfabesi değil, Dunhuang çok kültürlü ortamındaki bölgesel temas/transkripsiyon yazısıdır.",
      en: "Distinction: Not a mainstream Turkic alphabet, but a regional Silk Road contact and transcription script.",
    },
    sourceIds: ["bbaw-turfan", "raschmann-2024"],
  },
];
