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
    id: "sogdian",
    name: { tr: "Soğd Alfabesi", en: "Sogdian Script" },
    writingSystemType: { tr: "Arami Kökenli Ünsüz Ağırlıklı Alfabe", en: "Aramaic-derived abjad" },
    era: { tr: "MS 2.–10. Yüzyıl; Türkçe uyarlamaları 8. yüzyıldan itibaren", en: "2nd–10th c. CE; Turkic adaptations from the 8th c." },
    direction: "rtl",
    directionLabel: { tr: "Sağdan sola yatay", en: "Right-to-left horizontal" },
    region: { tr: "Soğdiana, Semerkant, Turfan ve İpek Yolu", en: "Sogdiana, Samarkand, Turfan and the Silk Road" },
    signCount: "22 temel harf (tarihsel varyantlarla)",
    unicodeBlock: "U+10F30–U+10F6F (Sogdian)",
    sampleWord: { original: "𐼰𐼰𐼴𐼵", transliteration: "sγwδ (Sogd)", meaning: { tr: "Soğd", en: "Sogd" } },
    glyphs: [
      { glyph: "𐼀", transliteration: "aleph", phonetic: "/ʾ/", note: { tr: "Arami yazı geleneğinden gelen harf", en: "Letter inherited from the Aramaic tradition" } },
      { glyph: "𐼄", transliteration: "gimel", phonetic: "/g/", note: { tr: "Ünsüz işareti", en: "Consonant sign" } },
      { glyph: "𐼇", transliteration: "daleth", phonetic: "/d/", note: { tr: "Ünsüz işareti", en: "Consonant sign" } },
      { glyph: "𐼽", transliteration: "yodh", phonetic: "/y, i/", note: { tr: "Ünsüz ve ünlü taşıyıcısı", en: "Consonant and vowel carrier" } },
    ],
    description: {
      tr: "İpek Yolu'nun önemli yazı geleneklerinden biridir. Eski Uygur yazısı, Soğd yazısının kursiv biçiminden uyarlanmıştır; bu nedenle dil tarihi ile yazı aktarımını birbirinden ayırarak incelemek gerekir.",
      en: "A major Silk Road writing tradition. Old Uyghur script was adapted from a cursive form of Sogdian, so linguistic descent and script transmission must be studied separately.",
    },
    scientificNote: {
      tr: "Soğdca bir İranî dildir; Soğd alfabesiyle yazılmış Türkçe metinler, Soğdcanın Türk dili olduğu anlamına gelmez.",
      en: "Sogdian is an Iranian language; Turkic texts written in Sogdian script do not make Sogdian a Turkic language.",
    },
    sourceIds: ["bbaw-turfan", "erdal-2004"],
  },
  {
    id: "manichaean",
    name: { tr: "Maniheist Alfabesi", en: "Manichaean Script" },
    writingSystemType: { tr: "Arami Kökenli Ünsüz Yazısı", en: "Aramaic-derived abjad" },
    era: { tr: "8.–11. Yüzyıl Türkçe yazmaları", en: "8th–11th century Turkic manuscripts" },
    direction: "rtl",
    directionLabel: { tr: "Sağdan sola yatay", en: "Right-to-left horizontal" },
    region: { tr: "Turfan, Koço ve Tarım Havzası", en: "Turfan, Qocho and the Tarim Basin" },
    signCount: "Maniheist yazı geleneğine özgü harf dizisi",
    unicodeBlock: "U+10AC0–U+10AFF (Manichaean)",
    sampleWord: { original: "𐫀𐫗𐫁", transliteration: "ʾ-n-y (örnek harf dizisi)", meaning: { tr: "Yazı örneği", en: "Script sample" } },
    glyphs: [
      { glyph: "𐫀", transliteration: "a / aleph", phonetic: "/ʾ, a/", note: { tr: "Alef biçimi", en: "Aleph form" } },
      { glyph: "𐫗", transliteration: "n / nun", phonetic: "/n/", note: { tr: "Nun biçimi", en: "Nun form" } },
      { glyph: "𐫁", transliteration: "b / beth", phonetic: "/b/", note: { tr: "Beth biçimi", en: "Beth form" } },
    ],
    description: {
      tr: "Maniheist toplulukların dinî metinlerinde kullanılan yazı sistemi, Eski Uygurca dâhil farklı dillerde metinlerin kaydedilmesini sağlamıştır. Yazı tercihi çoğu kez metnin dinî ve kültürel çevresiyle ilişkilidir.",
      en: "Used by Manichaean communities for religious texts, this script recorded works in several languages, including Old Uyghur. Script choice often reflects a text's religious and cultural milieu.",
    },
    scientificNote: {
      tr: "Maniheist yazısı ile Eski Uygur yazısı aynı alfabe değildir; bunlar farklı köken ve biçimlere sahip ayrı yazı gelenekleridir.",
      en: "Manichaean and Old Uyghur are not the same alphabet; they are distinct writing traditions with different histories and forms.",
    },
    sourceIds: ["bbaw-turfan", "erdal-2004"],
  },
  {
    id: "brahmi",
    name: { tr: "Brahmi Yazısı", en: "Brahmi Script" },
    writingSystemType: { tr: "Abugida (Hece Temelli Alfabe)", en: "Abugida" },
    era: { tr: "Eski Uygurca metinlerde yaklaşık 9.–11. Yüzyıl", en: "Approximately 9th–11th c. in Old Uyghur texts" },
    direction: "ltr",
    directionLabel: { tr: "Soldan sağa yatay", en: "Left-to-right horizontal" },
    region: { tr: "Turfan ve İç Asya", en: "Turfan and Inner Asia" },
    signCount: "Dil ve tarihsel varyanta göre değişir",
    unicodeBlock: "U+11000–U+1107F (Brahmi)",
    sampleWord: { original: "𑀓𑀸", transliteration: "kā", meaning: { tr: "Brahmi hece örneği", en: "Brahmi syllable sample" } },
    glyphs: [
      { glyph: "𑀓", transliteration: "ka", phonetic: "/ka/", note: { tr: "Temel ünsüz + varsayılan a ünlüsü", en: "Base consonant with inherent a" } },
      { glyph: "𑀓𑀺", transliteration: "ki", phonetic: "/ki/", note: { tr: "Ünlü işaretinin ünsüze eklenmesi", en: "Vowel sign modifies the consonant" } },
      { glyph: "𑀓𑀸", transliteration: "kā", phonetic: "/kaː/", note: { tr: "Uzun a ünlüsü işareti", en: "Long-a vowel sign" } },
    ],
    description: {
      tr: "Hint yazı ailesinin abugida türündeki bu sistemi, Orta Asya'daki Budist metin çevrelerinde Türkçe dâhil çeşitli dillerin yazımında kullanılmıştır.",
      en: "This Indic abugida was used in Buddhist manuscript environments in Central Asia to write several languages, including Turkic.",
    },
    scientificNote: {
      tr: "Brahmi bir alfabe ailesi/yazı geleneğidir; belirli bir Türk dilini veya etnik topluluğu tek başına tanımlamaz.",
      en: "Brahmi is a script tradition, not a marker of a particular Turkic language or ethnic community.",
    },
    sourceIds: ["bbaw-turfan", "erdal-2004"],
  },
  {
    id: "syriac",
    name: { tr: "Süryani (Serto / Estrangelo) Yazısı", en: "Syriac Script (Serto / Estrangela)" },
    writingSystemType: { tr: "Arami Kökenli Abjad", en: "Aramaic-derived abjad" },
    era: { tr: "Orta Çağ; sınırlı Türkçe tanıklıklar", en: "Medieval period; limited Turkic attestations" },
    direction: "rtl",
    directionLabel: { tr: "Sağdan sola yatay", en: "Right-to-left horizontal" },
    region: { tr: "Mezopotamya ve İç Asya", en: "Mesopotamia and Inner Asia" },
    signCount: "22 temel harf",
    unicodeBlock: "U+0700–U+074F (Syriac)",
    sampleWord: { original: "ܐܒܓ", transliteration: "ʾ-b-g", meaning: { tr: "Harf dizisi örneği", en: "Letter sequence sample" } },
    glyphs: [
      { glyph: "ܐ", transliteration: "ʾālap", phonetic: "/ʾ/", note: { tr: "Alef", en: "Aleph" } },
      { glyph: "ܒ", transliteration: "bēṯ", phonetic: "/b/", note: { tr: "Beth", en: "Beth" } },
      { glyph: "ܓ", transliteration: "gāmal", phonetic: "/g/", note: { tr: "Gamal", en: "Gamal" } },
    ],
    description: {
      tr: "Süryani yazısı, Orta Asya'nın çok dilli Hristiyan çevrelerinde kullanılan Arami kökenli yazı geleneğidir. Türkçe ile ilişkisi, yaygın bir edebî alfabe olmasından çok sınırlı tarihî tanıklıklar ve temas bağlamında ele alınmalıdır.",
      en: "Syriac is an Aramaic-derived script used in multilingual Christian communities of Central Asia. Its relevance to Turkic is best treated through limited attestations and contact contexts, not as a widespread literary alphabet.",
    },
    scientificNote: {
      tr: "Süryani harfli Türkçe malzemenin kapsamı sınırlıdır; bu nedenle Eski Uygurcanın temel yazı sistemlerinden biri gibi sunulmamalıdır.",
      en: "The corpus of Syriac-script Turkic material is limited; it should not be presented as one of the principal Old Uyghur writing systems.",
    },
    sourceIds: ["bbaw-turfan", "erdal-2004"],
  },

  {
    id: "latin-medieval",
    name: { tr: "Orta Çağ Latin Harfli Çevriyazı", en: "Medieval Latin Transcription" },
    writingSystemType: { tr: "Latin Harfli Çok Dilli Yazım", en: "Latin-based multilingual orthography" },
    era: { tr: "13.–14. Yüzyıl Kuman-Kıpçak metinleri", en: "13th–14th century Cuman-Kipchak texts" },
    direction: "ltr",
    directionLabel: { tr: "Soldan sağa yatay", en: "Left-to-right horizontal" },
    region: { tr: "Karadeniz'in kuzeyi, Kırım ve Venedik yazma geleneği", en: "Northern Black Sea, Crimea and Venetian manuscript tradition" },
    signCount: "Tek bir standart alfabe değildir; yazıcıya göre değişir",
    unicodeBlock: "Latin script (Unicode Basic Latin and extensions)",
    sampleWord: { original: "tatar til", transliteration: "tatar til", meaning: { tr: "Tatar/Kıpçak dili", en: "Tatar/Kipchak language" } },
    glyphs: [
      { glyph: "c", transliteration: "c (bağlama göre)", phonetic: "Değişken", note: { tr: "Orta Çağ Latin yazımında değerler yazıcıya göre değişebilir.", en: "Values vary by scribe in medieval Latin orthography." } },
      { glyph: "ch", transliteration: "ç / č (bağlama göre)", phonetic: "/tʃ/ (yaklaşık)", note: { tr: "Kuman seslerinin Latin harfleriyle yaklaşık gösterimi.", en: "Approximate Latin representation of Cuman sounds." } },
      { glyph: "y", transliteration: "y / ı / i (bağlama göre)", phonetic: "Değişken", note: { tr: "Tek bir ses-değer eşleşmesi varsayılmamalıdır.", en: "No single sound-value mapping should be assumed." } },
    ],
    description: {
      tr: "Codex Cumanicus, Kuman-Kıpçak söz varlığını ve metinlerini Orta Çağ Latin yazı alışkanlıklarıyla kaydeder. Bu yazım, 1928 Türkiye Türkçesi Latin alfabesiyle aynı standart sistem değildir.",
      en: "The Codex Cumanicus records Cuman-Kipchak vocabulary and texts using medieval Latin writing conventions. This is not the same standardized system as the 1928 Turkish Latin alphabet.",
    },
    scientificNote: {
      tr: "Orta Çağ Latin çevriyazısı değişken ve yazıcıya bağlıdır; modern Türk alfabesinin fonemik kuralları geriye dönük uygulanmamalıdır.",
      en: "Medieval Latin transcription is variable and scribe-dependent; modern Turkish phonemic rules must not be projected backwards.",
    },
    sourceIds: ["iranica-codex-cumanicus-1992", "brill-etlo-classification"],
  },

];