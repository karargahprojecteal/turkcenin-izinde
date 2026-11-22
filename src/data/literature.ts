export interface LiteraturePeriod {
  id: string;
  order: number;
  name: { tr: string; en: string };
  era: string;
  languageAndScript: { tr: string; en: string };
  keyGenres: { tr: string; en: string };
  summary: { tr: string; en: string };
  majorAuthorsAndWorks: string[];
  sourceIds: string[];
}

export interface LiteraryMasterwork {
  id: string;
  title: string;
  author: string;
  period: { tr: string; en: string };
  date: string;
  language: { tr: string; en: string };
  script: { tr: string; en: string };
  manuscriptInfo: { tr: string; en: string };
  significance: { tr: string; en: string };
  sourceIds: string[];
}

export const ORAL_TRADITION_PILLARS = [
  {
    term: { tr: "Ozan / Baksı / Kam Geleneği", en: "Ozan, Bakhshi & Kam Tradition" },
    desc: {
      tr: "Yazılı dönem öncesinde ve sonrasında sözlü hafızayı, kopuz/dombra eşliğinde destanları ve töre anlatılarını taşıyan sanatçı-bilge tipi.",
      en: "Oral poet-singers preserving epics and collective memory with stringed instruments (qopuz/dombra).",
    },
  },
  {
    term: { tr: "Sav, Sagu ve Koşuk", en: "Sav, Sagu & Koshuk" },
    desc: {
      tr: "Dîvânu Lugâti't-Türk sayesinde günümüze ulaşan en erken sözlü edebiyat türleri: Sav (atasözü), Sagu (ağıt, örn. Alp Er Tunga sagusu), Koşuk (lirik/kahramanlık şiiri).",
      en: "Earliest attested Turkic oral genres preserved in Diwan Lughat al-Turk: proverbs (sav), elegies (sagu), and lyric songs (koshuk).",
    },
  },
  {
    term: { tr: "Destan Geleneği & Tarihsel Ayrım", en: "Epic Tradition & Historical Method" },
    desc: {
      tr: "Oğuz Kağan, Ergenekon, Manas, Alpamış ve Köroğlu destanları ortak kültürel motifler taşır; ancak mitolojik anlatı ile birincil tarihsel belge birbirinden ayrılmalıdır.",
      en: "Epics like Oghuz Khagan, Manas, and Alpamysh preserve cultural memory, but myth must be distinguished from primary historical records.",
    },
  },
];

export const LITERATURE_PERIODS: LiteraturePeriod[] = [
  {
    id: "pre-islamic-oral",
    order: 1,
    name: { tr: "İslamiyet Öncesi Sözlü & Göktürk Edebiyatı", en: "Pre-Islamic Oral & Göktürk Literature" },
    era: "Yazı Öncesi – 8. yy.",
    languageAndScript: { tr: "Eski Türkçe (Sözlü + Göktürk Runik)", en: "Old Turkic (Oral + Runiform)" },
    keyGenres: { tr: "Sav, sagu, koşuk, destan, anıtsal siyasal hitabet", en: "Proverbs, elegies, epics, monumental oratory" },
    summary: {
      tr: "Sözlü destan ve kopuz geleneğinin yanı sıra Orhon Yazıtları ile yazılı hitabetin doğuşu.",
      en: "Oral epic tradition culminating in the monumental political oratory of the Orkhon inscriptions.",
    },
    majorAuthorsAndWorks: ["Yollug Tigin (Kül Tigin & Bilge Kağan)", "Tonyukuk", "Alp Er Tunga Sagusu"],
    sourceIds: ["tekin-1991-1995", "unesco-diwan-2017"],
  },
  {
    id: "old-uyghur-lit",
    order: 2,
    name: { tr: "Eski Uygur Edebiyatı", en: "Old Uyghur Literature" },
    era: "8.–13. yy.",
    languageAndScript: { tr: "Eski Uygurca (Uygur, Runik, Mani, Brahmi)", en: "Old Uyghur (Multi-script)" },
    keyGenres: { tr: "Budist/Maniheist çeviriler, fal kitabı, hikâye, ilahi, tiyatro nüvesi", en: "Translations, omen codex, narratives, hymns" },
    summary: {
      tr: "Türk edebiyatında çeviri kuramının ve kitap/rulo kültürünün ilk büyük atılımı.",
      en: "First major Turkic translation movement and manuscript book culture along the Silk Road.",
    },
    majorAuthorsAndWorks: ["Irk Bitig", "Altun Yaruk (Şıŋko Şeli Tutung)", "Kalyanamkara ve Papamkara", "Aprın Çor Tigin"],
    sourceIds: ["erdal-2004", "raschmann-2024", "bbaw-turfan"],
  },
  {
    id: "karakhanid-lit",
    order: 3,
    name: { tr: "Karahanlı Edebiyatı", en: "Karakhanid Literature" },
    era: "11.–12. yy.",
    languageAndScript: { tr: "Karahanlı Türkçesi (Arap ve Uygur)", en: "Karakhanid Turkic (Arabic & Uyghur)" },
    keyGenres: { tr: "Siyasetname mesnevisi, ansiklopedik sözlük, ahlak/tasavvuf hikmeti", en: "Didactic masnavi, lexicography, wisdom verse" },
    summary: {
      tr: "İslami Türk edebiyatının kurucu eserleri: Kutadgu Bilig, Dîvânu Lugâti't-Türk, Atabetü'l-Hakayık ve Dîvân-ı Hikmet.",
      en: "Foundational monuments of Islamic Turkic literature and comparative Turkology.",
    },
    majorAuthorsAndWorks: ["Yusuf Has Hacib", "Kaşgarlı Mahmud", "Edib Ahmed Yüknekî", "Ahmed Yesevî"],
    sourceIds: ["tdv-kutadgu-2002", "unesco-diwan-2017", "tdv-karahanlilar-2001"],
  },
  {
    id: "khwarazm-kipchak-lit",
    order: 4,
    name: { tr: "Harezm ve Kıpçak Edebiyatı", en: "Khwarazmian & Kipchak Literature" },
    era: "13.–15. yy.",
    languageAndScript: { tr: "Harezm & Kıpçak Türkçesi (Arap, Latin, Ermeni)", en: "Khwarazmian & Kipchak (Arabic, Latin, Armenian)" },
    keyGenres: { tr: "Kısas-ı enbiya, mesnevi, sözlük-gramer, bilmece, dinî/hukuki metinler", en: "Prophet stories, romance, glossaries, riddles" },
    summary: {
      tr: "Altın Orda ve Memlük sahalarında çok merkezli Türkçe yazı üretimi.",
      en: "Multicentric Turkic literary production across the Golden Horde and Mamluk Sultanate.",
    },
    majorAuthorsAndWorks: ["Rabgûzî (Kısasü'l-Enbiya)", "Kutb (Hüsrev ü Şîrîn)", "Harezmî (Muhabbetnâme)", "Codex Cumanicus"],
    sourceIds: ["tdv-cagatay-1993", "johanson-csato-2022"],
  },
  {
    id: "chagatai-lit",
    order: 5,
    name: { tr: "Çağatay Edebiyatı", en: "Chagatai Literature" },
    era: "15.–19. yy.",
    languageAndScript: { tr: "Çağatay Türkçesi (Arap / nadiren Uygur)", en: "Chagatai Turkic (Arabic)" },
    keyGenres: { tr: "Hamse, divan, tezkire, hatırat (Babürnâme), dil karşılaştırması", en: "Khamsa, divan, tazkira, memoir, linguistics" },
    summary: {
      tr: "Ali Şîr Nevâî ile klasikleşen Orta Asya ortak yüksek edebiyatı.",
      en: "Classical Central Asian literature canonized by Ali-Shir Nava'i.",
    },
    majorAuthorsAndWorks: ["Ali Şîr Nevâî", "Babür Şah (Babürnâme)", "Lutfî", "Ebu'l-Gazi Bahadır Han"],
    sourceIds: ["tdv-cagatay-1993"],
  },
  {
    id: "anatolian-divan-folk",
    order: 6,
    name: { tr: "Anadolu Sahası: Divan, Halk ve Âşık Edebiyatı", en: "Anatolian Divan, Folk & Ashik Literature" },
    era: "13.–19. yy.",
    languageAndScript: { tr: "Eski Anadolu & Osmanlı Türkçesi (Arap)", en: "Old Anatolian & Ottoman Turkish (Arabic)" },
    keyGenres: { tr: "Tasavvuf şiiri, Dede Korkut hikâyeleri, gazel/kaside, seyahatname, koşma/türkü", en: "Mystical verse, Dede Korkut, ghazal, travelogue, ashik poetry" },
    summary: {
      tr: "Yunus Emre ve Dede Korkut ile kurulan Anadolu Türkçesi; Fuzûlî, Bâkî ve Evliya Çelebi ile zirveye ulaşan klasik ve halk kolları.",
      en: "Parallel flourishing of classical Divan, mystical, and oral Ashik/Folk traditions.",
    },
    majorAuthorsAndWorks: ["Yunus Emre", "Dede Korkut Kitabı", "Fuzûlî", "Bâkî", "Evliya Çelebi", "Karacaoğlan"],
    sourceIds: ["tdv-fuzuli-1996", "johanson-csato-2022"],
  },
  {
    id: "tanzimat-milliedebiyat",
    order: 7,
    name: { tr: "Tanzimat, Servetifünun, Fecriati & Millî Edebiyat", en: "Tanzimat to National Literature Era" },
    era: "1860 – 1923",
    languageAndScript: { tr: "Geç Osmanlı & Yeni Lisan Türkçesi (Arap)", en: "Late Ottoman Turkish (Arabic)" },
    keyGenres: { tr: "Gazete, roman, modern tiyatro, eleştiri, sade Türkçe hikâye", en: "Journalism, novel, modern drama, short story" },
    summary: {
      tr: "Batılı türlerin girişi, matbuatın doğuşu ve 1911 Genç Kalemler hareketiyle konuşma dilinin yazı diline esas alınması.",
      en: "Introduction of modern novel/press genres and the 1911 'New Language' simplification movement.",
    },
    majorAuthorsAndWorks: ["Şinasi", "Namık Kemal", "Halit Ziya Uşaklıgil", "Ömer Seyfettin", "Ziya Gökalp"],
    sourceIds: ["yilmaz-2011", "vekam-1928"],
  },
  {
    id: "republic-contemporary-world",
    order: 8,
    name: { tr: "Cumhuriyet Dönemi & Çağdaş Türk Dünyası Edebiyatları", en: "Republican Era & Contemporary Turkic World Literatures" },
    era: "1923 – Günümüz",
    languageAndScript: { tr: "Türkiye Türkçesi (1928 Latin) & Çağdaş Türk Dilleri (Latin/Kiril/Arap)", en: "Modern Turkish & Contemporary Turkic Languages" },
    keyGenres: { tr: "Modern roman, toplumcu/bireysel şiir, deneme, çağdaş Türk dünyası romanı", en: "Modernist/social novel, contemporary poetry, Turkic world fiction" },
    summary: {
      tr: "1928 Harf Devrimi sonrası Türkiye edebiyatı ile eşzamanlı olarak Kırgız, Kazak, Özbek ve Azerbaycan edebiyatlarının evrensel başarıları.",
      en: "Post-1928 Turkish literature alongside global literary achievements across Azerbaijan, Central Asia, and Tatarstan.",
    },
    majorAuthorsAndWorks: ["Nâzım Hikmet", "Ahmet Hamdi Tanpınar", "Yaşar Kemal", "Orhan Pamuk", "Cengiz Aytmatov", "Bahtiyar Vahabzade"],
    sourceIds: ["yilmaz-2011", "johanson-csato-2022"],
  },
];

export const LITERARY_MASTERWORKS: LiteraryMasterwork[] = [
  {
    id: "atabetul-hakayik",
    title: "Atabetü'l-Hakayık",
    author: "Edib Ahmed Yüknekî",
    period: { tr: "Karahanlı", en: "Karakhanid" },
    date: "12. Yüzyıl",
    language: { tr: "Karahanlı Türkçesi", en: "Karakhanid Turkic" },
    script: { tr: "Uygur ve Arap harfli nüshalar", en: "Uyghur & Arabic scripts" },
    manuscriptInfo: { tr: "Ayasofya, Topkapı ve Semerkant nüshaları", en: "Ayasofya, Topkapı, Samarkand MSS" },
    significance: {
      tr: "Bilgi, cömertlik ve tevazu temalı didaktik manzum eser; İslami Türk ahlak edebiyatının temel taşlarından.",
      en: "Didactic ethical verse emphasizing knowledge and humility in early Islamic Turkic literature.",
    },
    sourceIds: ["tdv-karahanlilar-2001"],
  },
  {
    id: "dede-korkut",
    title: "Kitâb-ı Dede Korkut",
    author: "Anonim Oğuz Sözlü Geleneği",
    period: { tr: "Eski Anadolu / Oğuz", en: "Old Anatolian / Oghuz" },
    date: "Yazıya geçiriliş: 15.–16. yy.",
    language: { tr: "Eski Oğuz (Anadolu-Azerbaycan) Türkçesi", en: "Old Oghuz Turkic" },
    script: { tr: "Harekeli Arap Yazısı", en: "Vocalized Arabic Script" },
    manuscriptInfo: { tr: "Dresden (12 boy), Vatikan (6 boy) ve Günbed nüshaları", en: "Dresden, Vatican, and Gonbad MSS" },
    significance: {
      tr: "Destandan halk hikâyeciliğine geçişin başyapıtı; Oğuz boylarının sözlü kültür hafızası.",
      en: "Masterpiece bridging heroic epic and folk narrative in the Oghuz world.",
    },
    sourceIds: ["johanson-csato-2022"],
  },
  {
    id: "yunus-emre-divan",
    title: "Risâletü'n-Nushiyye ve Divan",
    author: "Yunus Emre (~1240–1320)",
    period: { tr: "Eski Anadolu Türkçesi", en: "Old Anatolian Turkish" },
    date: "13.–14. Yüzyıl",
    language: { tr: "Eski Anadolu Türkçesi", en: "Old Anatolian Turkish" },
    script: { tr: "Arap Yazısı", en: "Arabic Script" },
    manuscriptInfo: { tr: "Fatih, Karaman ve Yahya Efendi yazmaları", en: "Fatih, Karaman, and Istanbul MSS" },
    significance: {
      tr: "Anadolu Türkçesini duru ve lirik bir tasavvuf ve insan sevgisi diline dönüştüren kurucu şair.",
      en: "Foundational poet who forged Anatolian Turkish into a luminous mystical literary medium.",
    },
    sourceIds: ["johanson-csato-2022"],
  },
  {
    id: "fuzuli-leyla",
    title: "Leylâ vü Mecnûn ve Türkçe Divan",
    author: "Fuzûlî (~1483–1556)",
    period: { tr: "Klasik Divan / Azerî-Osmanlı", en: "Classical Divan" },
    date: "16. Yüzyıl (1535)",
    language: { tr: "Batı Oğuz (Azerî–Osmanlı) Türkçesi", en: "West Oghuz (Azerbaijani–Ottoman)" },
    script: { tr: "Arap Yazısı", en: "Arabic Script" },
    manuscriptInfo: { tr: "İstanbul, Bakü, Londra ve Tahran kütüphanelerinde yüzlerce yazma", en: "Hundreds of MSS in Istanbul, Baku, London" },
    significance: {
      tr: "Türkçe, Farsça ve Arapça divan sahibi Fuzûlî, klasik Türk şiirinin lirizm zirvesidir.",
      en: "Master of trilingual poetry and lyrical pinnacle of classical Turkic literature.",
    },
    sourceIds: ["tdv-fuzuli-1996"],
  },
  {
    id: "evliya-seyahatname",
    title: "Seyahatnâme (10 Cilt)",
    author: "Evliya Çelebi (1611–1682)",
    period: { tr: "Osmanlı Klasik Nesri", en: "Ottoman Classical Prose" },
    date: "17. Yüzyıl",
    language: { tr: "Osmanlı Türkçesi (yerel ağız örnekleriyle)", en: "Ottoman Turkish (with dialectal samples)" },
    script: { tr: "Arap Yazısı", en: "Arabic Script" },
    manuscriptInfo: { tr: "Topkapı Sarayı Bağdat Köşkü & Süleymaniye yazmaları", en: "Topkapı Palace & Süleymaniye MSS" },
    significance: {
      tr: "Anadolu, Balkanlar, Kafkasya, Kırım ve Orta Doğu dilleri, ağızları ve kültürleri için eşsiz tarihsel tanıklık.",
      en: "Unparalleled 17th-century linguistic, dialectological, and cultural travelogue.",
    },
    sourceIds: ["johanson-csato-2022"],
  },
  {
    id: "aytmatov-gun-olur",
    title: "Gün Olur Asra Bedel / Cengiz Aytmatov Külliyatı",
    author: "Cengiz Aytmatov (1928–2008)",
    period: { tr: "Çağdaş Türk Dünyası", en: "Contemporary Turkic World" },
    date: "1980",
    language: { tr: "Kırgızca / Rusça (çift dilli üretim)", en: "Kyrgyz / Russian" },
    script: { tr: "Kiril", en: "Cyrillic" },
    manuscriptInfo: { tr: "Basılı uluslararası külliyat", en: "International print editions" },
    significance: {
      tr: "Bozkır sözlü hafızasını ('mankurt' metaforu) modern dünya edebiyatına taşıyan çağdaş Türk dünyası klasiği.",
      en: "Contemporary Turkic classic bringing steppe memory into world literature.",
    },
    sourceIds: ["johanson-csato-2022"],
  },
];
