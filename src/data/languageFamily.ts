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
      { id:"khorasan-turkish", name:{tr:"Horasan Türkçesi",en:"Khorasan Turkic"}, nativeName:"Türkī / ترکی", status:"living", currentScripts:["Arap (yaygın tarihsel kullanım)"], region:{tr:"Kuzeydoğu İran · Horasan",en:"Northeastern Iran · Khorasan"}, keyFeature:{tr:"Oğuz temelli; bölgesel çeşitleri ve Farsça temas özellikleri bulunur.",en:"Oghuz-based, with regional varieties and Persian contact features."} },
      { id:"qashqai", name:{tr:"Kaşkayca",en:"Qashqai"}, nativeName:"Qaşqay türkcəsi", status:"living", currentScripts:["Arap (değişken yazım)"], region:{tr:"Güney İran · Fars ve çevresi",en:"Southern Iran · Fars and surrounding areas"}, keyFeature:{tr:"Güney Oğuz çeşitleri içinde değerlendirilir; yazı standardı sınırlıdır.",en:"Classified among Southern Oghuz varieties; standardization is limited."} }
    ],
    sourceIds: ["johanson-csato-2022", "tekin-1991-1995", "iranica-turkic-persia-2006"],
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
      { id:"karakalpak", name:{tr:"Karakalpakça",en:"Karakalpak"}, nativeName:"Qaraqalpaq tili", status:"living", currentScripts:["Kiril","Latin (geçiş / kullanım alanına göre)"], region:{tr:"Karakalpakistan · Özbekistan",en:"Karakalpakstan · Uzbekistan"}, keyFeature:{tr:"Kazakça ve Nogaycayla yakın Güney Kıpçak özellikleri taşır.",en:"Shares South Kipchak features and close ties with Kazakh and Nogai."} },
      { id:"nogai", name:{tr:"Nogayca",en:"Nogai"}, nativeName:"Ногай тили", status:"living", currentScripts:["Kiril"], region:{tr:"Kuzey Kafkasya · Aşağı Volga",en:"North Caucasus · Lower Volga"}, keyFeature:{tr:"Kazakça ve Karakalpakçayla tarihsel ve yapısal yakınlık gösterir.",en:"Historically and structurally close to Kazakh and Karakalpak."} },
      { id:"kumyk", name:{tr:"Kumukça",en:"Kumyk"}, nativeName:"Къумукъ тил", status:"living", currentScripts:["Kiril"], region:{tr:"Dağıstan · Kuzeydoğu Kafkasya",en:"Dagestan · Northeastern Caucasus"}, keyFeature:{tr:"Kuzey Kafkasya'nın tarihî yazı dillerinden biridir.",en:"One of the historical literary languages of the North Caucasus."} },
      { id:"karachay-balkar", name:{tr:"Karaçay-Balkarca",en:"Karachay-Balkar"}, nativeName:"Къарачай-малкъар тил", status:"living", currentScripts:["Kiril"], region:{tr:"Karaçay-Çerkesya ve Kabardey-Balkarya · Kuzey Kafkasya",en:"Karachay-Cherkessia and Kabardino-Balkaria · North Caucasus"}, keyFeature:{tr:"Kuzeybatı Kıpçak özellikleri taşır.",en:"Shows Northwestern Kipchak features."} },
      { id:"karaim", name:{tr:"Karaimce",en:"Karaim"}, nativeName:"Карай тили", status:"living", currentScripts:["Latin","Kiril (tarihsel / bölgesel)"], region:{tr:"Litvanya, Polonya ve Kırım toplulukları",en:"Communities in Lithuania, Poland, and Crimea"}, keyFeature:{tr:"Küçük konuşur topluluklarına sahip, ciddi tehlike altındaki Kıpçak dili.",en:"A severely endangered Kipchak language with small speaker communities."} }
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
      tr: "Sahaca ve Dolganca gibi Kuzey Sibirya dilleriyle Tuvaca, Hakasça, Şorca ve Tofalarca gibi Güney Sibirya dillerini kapsayan geniş bir alandır. Bu grubun tek bir soy dalı olup olmadığı ve alt grupların ilişkileri tartışmalıdır.",
      en: "A broad area including North Siberian languages such as Sakha and Dolgan, and South Siberian languages such as Tuvan, Khakas, Shor, and Tofa. Its status as a single genealogical branch and the relations among its subgroups remain debated.",
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
      { id:"altai", name:{tr:"Altayca",en:"Altai"}, nativeName:"Алтай тил", status:"living", currentScripts:["Kiril"], region:{tr:"Altay Cumhuriyeti ve çevresi · Güney Sibirya",en:"Altai Republic and surroundings · South Siberia"}, keyFeature:{tr:"Kuzey ve Güney Altay çeşitleri iç sınıflandırmada ayrılır.",en:"Northern and Southern Altai varieties are distinguished in internal classifications."} },
      { id:"shor", name:{tr:"Şorca",en:"Shor"}, nativeName:"Шор тили", status:"living", currentScripts:["Kiril"], region:{tr:"Kemerovo · Güney Sibirya",en:"Kemerovo · South Siberia"}, keyFeature:{tr:"Hakas ve diğer Güney Sibirya Türk dilleriyle temas ve ortaklıklar taşır.",en:"Shares features and contact history with Khakas and other South Siberian Turkic languages."} },
      { id:"dolgan", name:{tr:"Dolganca",en:"Dolgan"}, nativeName:"Долган тыла", status:"living", currentScripts:["Kiril"], region:{tr:"Taymır Yarımadası · Kuzey Sibirya",en:"Taymyr Peninsula · North Siberia"}, keyFeature:{tr:"Sahaca ile yakın ilişkili Kuzey Sibirya Türk dilidir.",en:"A North Siberian Turkic language closely related to Sakha."} },
      { id:"tofalar", name:{tr:"Tofalarca",en:"Tofa"}, nativeName:"Тоъфа дыл", status:"living", currentScripts:["Kiril"], region:{tr:"İrkutsk Oblastı · Sayan bölgesi",en:"Irkutsk Oblast · Sayan region"}, keyFeature:{tr:"Tuvaca ile birlikte Sayan Türk dilleri içinde değerlendirilir.",en:"Grouped with Tuvan among Sayan Turkic languages."} },
      { id:"chulym", name:{tr:"Çulımca",en:"Chulym"}, nativeName:"Чулым тили", status:"living", currentScripts:["Kiril (sınırlı yazılı kullanım)"], region:{tr:"Çulım Nehri havzası · Batı Sibirya",en:"Chulym River basin · Western Siberia"}, keyFeature:{tr:"Çok az sayıda konuşurla yaşayan, ciddi tehlike altındaki dildir.",en:"A severely endangered language with a very small speaker community."} }
    ],
    sourceIds: ["johanson-csato-2022", "brill-etlo-classification"],
  },
  {
    id: "arghu",
    name: { tr: "Arğu (Halaçça) Kolu", en: "Arghu (Khalaj) Branch" },
    macroGroup: "common-turkic",
    diagnosticFeature: {
      tr: "Halaççada söz başı h- biçimi ve Eski Türkçe d sesinin korunumu (hadaq 'ayak'); tarihî açıklaması ayrıca tartışılır.",
      en: "Halaç initial h- and Old Turkic intervocalic d (hadaq 'foot'); its historical interpretation remains debated.",
    },
    description: {
      tr: "Orta İran'da yaşayan Halaçça, Gerhard Doerfer'in araştırmalarıyla arkaik özellikleri belgelenmiş özel bir Türk dili olarak tanımlanmıştır. Genel Türkçe içindeki yeri ve tarihî Arğu bağlantısının nasıl modellenmesi gerektiği sınıflandırma literatüründe ihtiyatla ele alınmalıdır.",
      en: "Spoken in central Iran, Khalaj has archaic features documented by Gerhard Doerfer. Its exact position within Common Turkic and the historical Arghu connection should be treated cautiously in classification models.",
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
        keyFeature: { tr: "Halaççada söz başı h- (hadaq) ve Eski Türkçe /d/ sesinin korunumu; ünlü uzunluğu hakkındaki tarihsel yorumlar ihtiyatla ele alınmalıdır.", en: "Initial h- (hadaq) and retention of Old Turkic /d/; historical claims about vowel quantity require caution." },
      },
    ],
    sourceIds: ["brill-etlo-classification", "johanson-csato-2022", "iranica-khalaj-2010", "doerfer-khalaj-1978"],
  },
];
