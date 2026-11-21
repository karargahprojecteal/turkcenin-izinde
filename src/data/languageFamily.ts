export interface TurkicLanguageItem {
  id: string;
  name: { tr: string; en: string };
  nativeName: string;
  status: "living" | "historical";
  currentScripts: string[];
  region: { tr: string; en: string };
  speakersApprox?: string;
  keyFeature: { tr: string; en: string };
}

export interface TurkicBranch {
  id: string;
  name: { tr: string; en: string };
  macroGroup: "oghur" | "common-turkic";
  diagnosticFeature: { tr: string; en: string };
  description: { tr: string; en: string };
  colorToken: string;
  languages: TurkicLanguageItem[];
  sourceIds: string[];
}

export const TURKIC_BRANCHES: TurkicBranch[] = [
  {
    id: "oghur",
    name: { tr: "Oğur (Bulgar / r-Türkçesi) Kolu", en: "Oghur (Bulgar / r-Turkic) Branch" },
    macroGroup: "oghur",
    diagnosticFeature: {
      tr: "Genel Türkçedeki z/ş seslerine karşılık r/l sesleri (rotasizm ve lambdasizm).",
      en: "Corresponds with r/l to Common Turkic z/š (rhotacism and lambdacism).",
    },
    description: {
      tr: "Proto-Türkçeden ilk ayrılan ana koldur. Tarihsel olarak İdil Bulgarcası ve Tuna Bulgarcasıyla temsil edilir; günümüzde yaşayan tek üyesi Çuvaşçadır.",
      en: "The earliest branch to split from Proto-Turkic. Historically represented by Volga and Danube Bulgar; Chuvash is its sole living member.",
    },
    colorToken: "#b45309",
    languages: [
      {
        id: "chuvash",
        name: { tr: "Çuvaşça", en: "Chuvash" },
        nativeName: "Чӑвашла",
        status: "living",
        currentScripts: ["Kiril (uyarlanmış)"],
        region: { tr: "Çuvaşistan / İdil-Ural", en: "Chuvashia / Volga-Ural" },
        speakersApprox: "~1 milyon",
        keyFeature: { tr: "Oğur kolunun yaşayan tek dili; r/l denkliği.", en: "Sole surviving Oghur language; r/l correspondence." },
      },
      {
        id: "volga-bulgar",
        name: { tr: "İdil Bulgarcası (Tarihsel)", en: "Volga Bulgar (Historical)" },
        nativeName: "Tarihsel Mezar Yazıtları",
        status: "historical",
        currentScripts: ["Arap (13.–14. yy. mezar taşları)"],
        region: { tr: "Orta İdil Havzası", en: "Middle Volga Basin" },
        keyFeature: { tr: "13.–14. yüzyıl mezar kitabelerinde belgelenmiştir.", en: "Attested in 13th–14th century funerary inscriptions." },
      },
    ],
    sourceIds: ["brill-etlo-classification", "johanson-csato-2022"],
  },
  {
    id: "oghuz",
    name: { tr: "Güneybatı (Oğuz) Kolu", en: "Southwestern (Oghuz) Branch" },
    macroGroup: "common-turkic",
    diagnosticFeature: {
      tr: "Söz başı t- > d- ötümlüleşmesi (kısmen) ve hece sonu -g düşmesi (tağ > dağ).",
      en: "Partial initial t- > d- voicing and loss of syllable-final -g (tağ > dağ).",
    },
    description: {
      tr: "Orta Asya'dan Horasan, İran, Kafkasya, Anadolu ve Balkanlar'a yayılan en kalabalık Türk dil koludur.",
      en: "The largest Turkic branch by speaker population, spanning Central Asia, Iran, the Caucasus, Anatolia, and the Balkans.",
    },
    colorToken: "#991b1b",
    languages: [
      {
        id: "turkish",
        name: { tr: "Türkiye Türkçesi", en: "Turkish" },
        nativeName: "Türkçe",
        status: "living",
        currentScripts: ["Latin (1928)"],
        region: { tr: "Türkiye, Kıbrıs, Balkanlar", en: "Türkiye, Cyprus, Balkans" },
        speakersApprox: "70+ milyon",
        keyFeature: { tr: "1928 sesçil Latin alfabesi ve Batı Oğuz yazı geleneği.", en: "1928 phonemic Latin alphabet and West Oghuz literary tradition." },
      },
      {
        id: "azerbaijani",
        name: { tr: "Azerbaycan Türkçesi", en: "Azerbaijani" },
        nativeName: "Azərbaycan dili / آذربایجان دیلی",
        status: "living",
        currentScripts: ["Latin (Kuzey)", "Arap (Güney)"],
        region: { tr: "Azerbaycan, Kuzeybatı İran", en: "Azerbaijan, NW Iran" },
        speakersApprox: "~25–30 milyon",
        keyFeature: { tr: "Kuzeyde Latin, İran'da Arap alfabesiyle yazılır.", en: "Written in Latin in the north and Arabic script in Iran." },
      },
      {
        id: "turkmen",
        name: { tr: "Türkmence", en: "Turkmen" },
        nativeName: "Türkmençe",
        status: "living",
        currentScripts: ["Latin (1993)"],
        region: { tr: "Türkmenistan, Horasan", en: "Turkmenistan, Khorasan" },
        speakersApprox: "~7 milyon",
        keyFeature: { tr: "Proto-Türkçe birincil uzun ünlüleri sistemli biçimde korur.", en: "Systematically preserves Proto-Turkic primary long vowels." },
      },
      {
        id: "gagauz",
        name: { tr: "Gagavuzca", en: "Gagauz" },
        nativeName: "Gagauz dili",
        status: "living",
        currentScripts: ["Latin"],
        region: { tr: "Moldova (Gagavuzya), Balkanlar", en: "Moldova (Gagauzia), Balkans" },
        speakersApprox: "~150 bin",
        keyFeature: { tr: "Slav ve Balkan dilleriyle sözdizimsel temas izleri taşır.", en: "Shows syntactic contact features with Slavic and Balkan languages." },
      },
    ],
    sourceIds: ["johanson-csato-2022", "tekin-1991-1995"],
  },
  {
    id: "kipchak",
    name: { tr: "Kuzeybatı (Kıpçak) Kolu", en: "Northwestern (Kipchak) Branch" },
    macroGroup: "common-turkic",
    diagnosticFeature: {
      tr: "Hece sonu -g > -w / -y değişimi (örn. tağ > taw, suğ > suw).",
      en: "Shift of syllable-final -g > -w / -y (e.g., tağ > taw, suğ > suw).",
    },
    description: {
      tr: "İdil-Ural, Kırım-Kafkasya ve Kazakistan bozkırlarından Tanrı Dağları'na uzanan geniş kuzeybatı kuşağını kapsar.",
      en: "Spans the northwestern belt from Volga-Ural and Crimea-Caucasus to the Kazakh steppe and Tian Shan.",
    },
    colorToken: "#1e40af",
    languages: [
      {
        id: "kazakh",
        name: { tr: "Kazakça", en: "Kazakh" },
        nativeName: "Қазақ тілі / Qazaq tili",
        status: "living",
        currentScripts: ["Kiril", "Latin (geçiş süreci)"],
        region: { tr: "Kazakistan, Batı Çin, Moğolistan", en: "Kazakhstan, Western China, Mongolia" },
        speakersApprox: "~15 milyon",
        keyFeature: { tr: "Genel Türkçe ş > s ve ç > ş ses değişimi (Güney Kıpçak).", en: "Common Turkic š > s and č > š sound shifts (South Kipchak)." },
      },
      {
        id: "tatar",
        name: { tr: "Tatarca (Kazan)", en: "Tatar" },
        nativeName: "Татар теле",
        status: "living",
        currentScripts: ["Kiril"],
        region: { tr: "Tataristan / İdil-Ural", en: "Tatarstan / Volga-Ural" },
        speakersApprox: "~5 milyon",
        keyFeature: { tr: "İdil-Ural ünlü kaymaları (o > u, ö > ü, e > i).", en: "Volga-Ural vowel shifts (o > u, ö > ü, e > i)." },
      },
      {
        id: "kyrgyz",
        name: { tr: "Kırgızca", en: "Kyrgyz" },
        nativeName: "Кыргыз тили",
        status: "living",
        currentScripts: ["Kiril"],
        region: { tr: "Kırgızistan, Pamir", en: "Kyrgyzstan, Pamir" },
        speakersApprox: "~5 milyon",
        keyFeature: { tr: "Güney Sibirya kökenli olup Kıpçak grubuyla bütünleşmiştir.", en: "South Siberian origin with deep Kipchak integration." },
      },
      {
        id: "bashkir",
        name: { tr: "Başkurtça", en: "Bashkir" },
        nativeName: "Башҡорт теле",
        status: "living",
        currentScripts: ["Kiril"],
        region: { tr: "Başkurdistan / İdil-Ural", en: "Bashkortostan / Volga-Ural" },
        speakersApprox: "~1.2 milyon",
        keyFeature: { tr: "Söz başı s- > h- ve z/d > ź/ð peltek ünsüz özellikleri.", en: "Initial s- > h- and interdental fricative developments." },
      },
      {
        id: "crimean-tatar",
        name: { tr: "Kırım Tatarcası", en: "Crimean Tatar" },
        nativeName: "Qırımtatar tili",
        status: "living",
        currentScripts: ["Latin", "Kiril"],
        region: { tr: "Kırım ve Diaspora", en: "Crimea and Diaspora" },
        speakersApprox: "~500 bin",
        keyFeature: { tr: "Kıpçak tabanı üzerinde Oğuz etkili karma lehçe yapısı.", en: "Kipchak foundation with strong Oghuz coastal influence." },
      },
    ],
    sourceIds: ["johanson-csato-2022", "tekin-1991-1995"],
  },
  {
    id: "karluk",
    name: { tr: "Güneydoğu (Karluk) Kolu", en: "Southeastern (Karluk) Branch" },
    macroGroup: "common-turkic",
    diagnosticFeature: {
      tr: "Karahanlı–Harezm–Çağatay klasik yazı dili geleneğinin doğrudan devamı.",
      en: "Direct continuation of the Karakhanid–Khwarazmian–Chagatai literary tradition.",
    },
    description: {
      tr: "Mâverâünnehir ve Tarım Havzası'ndaki kadim şehir ve vaha kültürlerinin taşıyıcısı olan Özbekçe ve Yeni Uygurcayı içerir.",
      en: "Comprises Uzbek and Modern Uyghur, heirs to the oasis and urban literary cultures of Transoxiana and the Tarim Basin.",
    },
    colorToken: "#0f766e",
    languages: [
      {
        id: "uzbek",
        name: { tr: "Özbekçe", en: "Uzbek" },
        nativeName: "Oʻzbek tili / Ўзбек тили",
        status: "living",
        currentScripts: ["Latin (1993)", "Kiril"],
        region: { tr: "Özbekistan, Orta Asya", en: "Uzbekistan, Central Asia" },
        speakersApprox: "~35 milyon",
        keyFeature: { tr: "Standart dilde Farsça etkisiyle ünlü uyumunda kısmi daralma.", en: "Standard dialect shows reduced vowel harmony due to Persian contact." },
      },
      {
        id: "uyghur",
        name: { tr: "Yeni Uygurca", en: "Modern Uyghur" },
        nativeName: "ئۇيغۇر تىلى",
        status: "living",
        currentScripts: ["Arap (Kona Yéziq)", "Kiril / Latin"],
        region: { tr: "Sincan (Doğu Türkistan), Kazakistan", en: "Xinjiang, Kazakhstan" },
        speakersApprox: "~12 milyon",
        keyFeature: { tr: "Arap yazısının tüm ünlüleri gösteren tam fonetik uyarlaması.", en: "Uses a fully vocalized Arabic-based alphabet." },
      },
    ],
    sourceIds: ["johanson-csato-2022", "tdv-cagatay-1993"],
  },
  {
    id: "siberian",
    name: { tr: "Kuzeydoğu (Sibirya) Kolu", en: "Northeastern (Siberian) Branch" },
    macroGroup: "common-turkic",
    diagnosticFeature: {
      tr: "Arkaik söz varlığı; Kuzey Sibirya'da (Sahaca) erken ayrışma, Güney Sibirya'da Eski Türkçe d/t izleri.",
      en: "Archaic lexicon; early divergence in North Siberia (Sakha) and d/t retentions in South Siberia.",
    },
    description: {
      tr: "Türk dillerinin erken dönem ses ve söz varlığı katmanlarını koruyan Güney ve Kuzey Sibirya dillerini kapsar.",
      en: "Encompasses North and South Siberian Turkic languages preserving early phonological and lexical layers.",
    },
    colorToken: "#4338ca",
    languages: [
      {
        id: "sakha",
        name: { tr: "Sahaca (Yakutça)", en: "Sakha (Yakut)" },
        nativeName: "Саха тыла",
        status: "living",
        currentScripts: ["Kiril"],
        region: { tr: "Saha (Yakutistan) / Kuzeydoğu Sibirya", en: "Sakha Republic / NE Siberia" },
        speakersApprox: "~450 bin",
        keyFeature: { tr: "Genel Türkçeden erken ayrışmış; Moğolca ve Tunguzca temas izleri güçlüdür.", en: "Early divergence from Common Turkic; strong Mongolic/Tungusic contact." },
      },
      {
        id: "tuvan",
        name: { tr: "Tuvaca", en: "Tuvan" },
        nativeName: "Тыва дыл",
        status: "living",
        currentScripts: ["Kiril"],
        region: { tr: "Tuva / Güney Sibirya", en: "Tuva / South Siberia" },
        speakersApprox: "~280 bin",
        keyFeature: { tr: "Söz içi d sesini korur (adak 'ayak'); faringeal ünlü özelliği.", en: "Preserves intervocalic d (adak 'foot'); pharyngealized vowels." },
      },
      {
        id: "khakas",
        name: { tr: "Hakasça", en: "Khakas" },
        nativeName: "Хакас тілі",
        status: "living",
        currentScripts: ["Kiril"],
        region: { tr: "Hakasya / Güney Sibirya", en: "Khakassia / South Siberia" },
        speakersApprox: "~50 bin",
        keyFeature: { tr: "Yenisey havzası; Eski Türkçe d > z değişimi (azax).", en: "Yenisei basin; Old Turkic d > z shift (azax)." },
      },
    ],
    sourceIds: ["johanson-csato-2022", "brill-etlo-classification"],
  },
  {
    id: "arghu",
    name: { tr: "Arğu (Halaçça) Kolu", en: "Arghu (Khalaj) Branch" },
    macroGroup: "common-turkic",
    diagnosticFeature: {
      tr: "Proto-Türkçe söz başı h- sesinin ve Eski Türkçe d sesinin korunumu (hadaq 'ayak').",
      en: "Preservation of Proto-Turkic initial h- and Old Turkic intervocalic d (hadaq 'foot').",
    },
    description: {
      tr: "Orta İran'da bir dil adası olarak yaşayan Halaçça, Gerhard Doerfer'in araştırmalarıyla Genel Türkçe içinde erken ayrılmış özgün bir kol olarak tanımlanmıştır.",
      en: "Spoken as a linguistic island in central Iran, Khalaj was shown by Gerhard Doerfer to be an early-diverged archaic branch of Common Turkic.",
    },
    colorToken: "#7c2d12",
    languages: [
      {
        id: "khalaj",
        name: { tr: "Halaçça", en: "Khalaj" },
        nativeName: "Qalaj / خلج",
        status: "living",
        currentScripts: ["Arap / Uluslararası Fonetik"],
        region: { tr: "Orta İran (Kum–Erak çevresi)", en: "Central Iran (Qom–Arak)" },
        speakersApprox: "~20–40 bin",
        keyFeature: { tr: "Söz başı h- (hadaq) ve üçlü ünlü uzunluğu ayrımı.", en: "Initial h- (hadaq) and three-way vowel length distinctions." },
      },
    ],
    sourceIds: ["brill-etlo-classification", "johanson-csato-2022"],
  },
];
