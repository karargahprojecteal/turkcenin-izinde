export interface AcademicSource {
  id: string;
  citation: string;
  authorOrInstitution: string;
  year: string;
  type: "book" | "encyclopedia" | "unesco" | "journal" | "archive";
  url?: string;
  doi?: string;
  accessDate: string;
  supports: {
    tr: string;
    en: string;
  };
}

export const ACADEMIC_SOURCES: AcademicSource[] = [
  {
    id: "johanson-csato-2022",
    citation: "Johanson, L., & Csató, É. Á. (Ed.). (2022). The Turkic Languages (2. baskı). London & New York: Routledge.",
    authorOrInstitution: "Lars Johanson & Éva Á. Csató (Routledge)",
    year: "2022",
    type: "book",
    url: "https://www.routledge.com/Routledge-Language-Family-Series/book-series/SE0091",
    accessDate: "2026-11-21",
    supports: {
      tr: "Türk dil ailesinin çağdaş sınıflandırması, coğrafi dağılımı ve 20 edebî dilin yapısal özellikleri.",
      en: "Modern classification of the Turkic language family, geographic distribution, and structural features of 20 literary languages.",
    },
  },
  {
    id: "erdal-2004",
    citation: "Erdal, M. (2004). A Grammar of Old Turkic. Leiden & Boston: Brill (Handbuch der Orientalistik).",
    authorOrInstitution: "Marcel Erdal (Brill)",
    year: "2004",
    type: "book",
    url: "https://brill.com/display/book/edcoll/9789004471177/BP000001.xml",
    accessDate: "2026-11-21",
    supports: {
      tr: "Eski Türkçe (Orhon, Eski Uygur, Karahanlı) döneminin dilbilgisi, sesbilgisi ve yazı sistemleri.",
      en: "Grammar, phonology, and writing systems of Old Turkic (Orkhon, Old Uyghur, Karakhanid).",
    },
  },
  {
    id: "brill-etlo-classification",
    citation: "Brill. Encyclopedia of Turkic Languages and Linguistics Online (ETLO) — Classification of Turkic Languages.",
    authorOrInstitution: "Brill Reference Works",
    year: "2021–2026",
    type: "encyclopedia",
    url: "https://referenceworks.brill.com/display/entries/ETLO/SIM-031966.xml",
    accessDate: "2026-11-21",
    supports: {
      tr: "Oğur–Genel Türkçe ayrımı, Halaççanın (Arğu) erken ayrılışı ve Doğu/Batı Eski Türkçe ayrımı.",
      en: "Oghur–Common Turkic split, early separation of Khalaj (Arghu), and East/West Old Turkic distinction.",
    },
  },
  {
    id: "brill-etlo-runiform",
    citation: "Brill. Encyclopedia of Turkic Languages and Linguistics Online (ETLO) — Runiform Scripts.",
    authorOrInstitution: "Brill Reference Works",
    year: "2021–2026",
    type: "encyclopedia",
    url: "https://referenceworks.brill.com/display/entries/ETLO/SIM-032267.xml",
    accessDate: "2026-11-21",
    supports: {
      tr: "Irk Bitig, Orhon-Yenisey runiform yazıtları ve Avrasya runik yazı geleneği.",
      en: "Irk Bitig, Orkhon-Yenisei runiform inscriptions, and Eurasian runiform script tradition.",
    },
  },
  {
    id: "tekin-1991-1995",
    citation: "Tekin, T. (1991). A New Classification of the Turkic Languages. Türk Dilleri Araştırmaları, 1, 5–18; Orhon Yazıtları (1995).",
    authorOrInstitution: "Talat Tekin (TDK / Türk Dilleri Araştırmaları)",
    year: "1991 / 1995",
    type: "journal",
    url: "https://tdkbelleten.gov.tr/tam-metin-pdf/893/tur",
    accessDate: "2026-11-21",
    supports: {
      tr: "Türk dillerinin fonolojik ölçütlere dayalı sınıflandırması ve Tonyukuk, Kül Tigin, Bilge Kağan yazıtlarının filolojik yayını.",
      en: "Phonological classification of Turkic languages and philological edition of the Tonyukuk, Kul Tigin, and Bilge Khagan inscriptions.",
    },
  },
  {
    id: "unesco-orkhon-2004",
    citation: "UNESCO World Heritage Centre. (2004). Orkhon Valley Cultural Landscape (Dossier 1081rev).",
    authorOrInstitution: "UNESCO",
    year: "2004",
    type: "unesco",
    url: "https://whc.unesco.org/en/list/1081/",
    accessDate: "2026-11-21",
    supports: {
      tr: "Orhon Vadisi arkeolojik alanı ve 6.–8. yüzyıl bozkır anıtlarının UNESCO Dünya Mirası statüsü.",
      en: "UNESCO World Heritage status of the Orkhon Valley archaeological landscape and 6th–8th century monuments.",
    },
  },
  {
    id: "unesco-diwan-2017",
    citation: "UNESCO Memory of the World Register. (2017). Dīwān Lughāt al-Turk (Compendium of the Turkic Dialects).",
    authorOrInstitution: "UNESCO",
    year: "2017",
    type: "unesco",
    url: "https://www.unesco.org/en/memory-world/diwan-lughat-al-turk-compendium-turkic-dialects",
    accessDate: "2026-11-21",
    supports: {
      tr: "Kaşgarlı Mahmud'un Dîvânu Lugâti't-Türk eserinin 2017'de UNESCO Dünya Belleği Kütüğü'ne kaydı.",
      en: "Inscription of Mahmud al-Kashgari's Diwan Lughat al-Turk in the UNESCO Memory of the World Register in 2017.",
    },
  },
  {
    id: "unesco-kutadgu-2019",
    citation: "UNESCO Türkiye Millî Komisyonu. (2019). Kutadgu Bilig'in Yazılışının 950. Yılı Anma Programı.",
    authorOrInstitution: "UNESCO Türkiye Millî Komisyonu",
    year: "2019",
    type: "unesco",
    url: "https://islamansiklopedisi.org.tr/kutadgu-bilig",
    accessDate: "2026-11-21",
    supports: {
      tr: "Yusuf Has Hacib'in Kutadgu Bilig eserinin 1069/1070 tarihlendirmesi ve UNESCO 950. yıl anması.",
      en: "Dating of Yusuf Khass Hajib's Kutadgu Bilig to 1069/1070 and its 950th anniversary commemoration by UNESCO.",
    },
  },
  {
    id: "raschmann-2024",
    citation: "Raschmann, S.-C. (2024). Old Uyghur Buddhist Scrolls: A Case Study Based on the Säkiz Yükmäk Yaruk Scrolls. Acta Orientalia Hungarica, 77(1), 75–134.",
    authorOrInstitution: "Simone-Christiane Raschmann (Hamburg Univ. / Acta Orientalia)",
    year: "2024",
    type: "journal",
    doi: "10.1556/062.2024.00415",
    url: "https://real.mtak.hu/209571/1/062-article-p75.pdf",
    accessDate: "2026-11-21",
    supports: {
      tr: "Berlin Turfan Koleksiyonu'ndaki yaklaşık 8.000 Eski Uygurca el yazması ve blok baskı fragmanı.",
      en: "Approximately 8,000 Old Uyghur manuscript and block print fragments in the Berlin Turfan Collection.",
    },
  },
  {
    id: "bbaw-turfan",
    citation: "Berlin-Brandenburg Academy of Sciences and Humanities (BBAW). Turfanforschung (Turfan Studies).",
    authorOrInstitution: "BBAW",
    year: "2024",
    type: "archive",
    url: "https://www.bbaw.de/en/research/turfanforschung-turfan-studies",
    accessDate: "2026-11-21",
    supports: {
      tr: "Turfan İpek Yolu yazmalarının dijitalleştirilmesi ve koruma arşivi.",
      en: "Digitization and preservation archive of the Turfan Silk Road manuscripts.",
    },
  },
  {
    id: "tdv-thomsen-2012",
    citation: "Bilgin, A. A. (2012). THOMSEN, Vilhelm. TDV İslâm Ansiklopedisi.",
    authorOrInstitution: "A. Azmi Bilgin (TDV İslâm Ansiklopedisi)",
    year: "2012",
    type: "encyclopedia",
    url: "https://islamansiklopedisi.org.tr/thomsen-vilhelm",
    accessDate: "2026-11-21",
    supports: {
      tr: "Göktürk (Orhon-Yenisey) yazısının 1893'te Vilhelm Thomsen tarafından çözümlenmesi.",
      en: "Decipherment of the Old Turkic (Orkhon-Yenisei) script by Vilhelm Thomsen in 1893.",
    },
  },
  {
    id: "tdv-cagatay-1993",
    citation: "Eraslan, K. (1993). ÇAĞATAY EDEBİYATI. TDV İslâm Ansiklopedisi.",
    authorOrInstitution: "Kemal Eraslan (TDV İslâm Ansiklopedisi)",
    year: "1993",
    type: "encyclopedia",
    url: "https://islamansiklopedisi.org.tr/cagatay-edebiyati",
    accessDate: "2026-11-21",
    supports: {
      tr: "Çağatay Türkçesinin dönemleri, Ali Şîr Nevâî'nin klasikleştirici rolü ve 15.–19. yüzyıl yazı dili geleneği.",
      en: "Periods of Chagatai Turkic, Ali-Shir Nava'i's classical role, and the 15th–19th century literary tradition.",
    },
  },
  {
    id: "yilmaz-2011",
    citation: "Yılmaz, H. (2011). Learning to Read (Again): The Social Experiences of Turkey's 1928 Alphabet Reform. IJMES (Cambridge University Press).",
    authorOrInstitution: "Hale Yılmaz (Cambridge University Press)",
    year: "2011",
    type: "journal",
    url: "https://www.cambridge.org/core/journals/international-journal-of-middle-east-studies/article/learning-to-read-again-the-social-experiences-of-turkeys-1928-alphabet-reform/F313C1942EB18220E9FD9B2B417D5601",
    accessDate: "2026-11-21",
    supports: {
      tr: "1 Kasım 1928 Harf Devrimi ve Millet Mektepleri üzerinden toplumsal okuryazarlık dönüşümü.",
      en: "The November 1, 1928 Turkish Alphabet Reform and social literacy transformation via Nation's Schools.",
    },
  },
  {
    id: "vekam-1928",
    citation: "Koç Üniversitesi VEKAM. Alphabet Reform and Press Regime in Türkiye 1928–1939.",
    authorOrInstitution: "Koç Üniversitesi VEKAM",
    year: "2024",
    type: "archive",
    url: "https://vekam.ku.edu.tr/en/alphabet-and-press-alphabet-reform-and-press-regime-in-turkiye-1928-1939/",
    accessDate: "2026-11-21",
    supports: {
      tr: "1928–1939 döneminde Türkiye'de alfabe reformu ve matbuat uygulamaları.",
      en: "Alphabet reform and press practices in Türkiye during 1928–1939.",
    },
  },
  {
    id: "robbeets-2023",
    citation: "Robbeets, M., et al. (2023). Indo-European loanwords and exchange in Bronze Age Central and East Asia. PMC10432883.",
    authorOrInstitution: "Martine Robbeets et al. (PubMed Central)",
    year: "2023",
    type: "journal",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10432883/",
    accessDate: "2026-11-21",
    supports: {
      tr: "Proto-Türkçenin kuramsal zaman derinliği (~2000 yıl iç rekonstrüksiyon) ve Batı Moğolistan/bozkır temasları.",
      en: "Theoretical time depth of Proto-Turkic (~2,000 years internal reconstruction) and western Mongolia/steppe contacts.",
    },
  },
  {
    id:"savelyev-robbeets-2020",
    citation:"Savelyev, A., & Robbeets, M. (2020). Bayesian phylolinguistics infers the internal structure and the time-depth of the Turkic language family. Journal of Language Evolution, 5(1), 39–53. https://doi.org/10.1093/jole/lzz010.",
    authorOrInstitution:"Alexander Savelyev & Martine Robbeets · Journal of Language Evolution",
    year:"2020", type:"journal", url:"https://academic.oup.com/jole/article/5/1/39/5736268", doi:"10.1093/jole/lzz010", accessDate:"2026-11-22",
    supports:{tr:"Türk dillerinin iç sınıflandırmasındaki uzlaşma alanları, tartışmalı alt gruplar ve Bayesçi filogenetik yöntem.",en:"Areas of consensus and debate in internal Turkic classification, including Bayesian phylogenetic methods."}
  },
  {
    id:"tdk-tekin-2023",
    citation:"Tekin, T. (2023). Makaleler III: Çağdaş Türk Dilleri. Yayıma hazırlayanlar: E. Yılmaz & N. Demir. Ankara: Türk Dil Kurumu Yayınları, 1062. ISBN 978-975-16-2556-4.",
    authorOrInstitution:"Talat Tekin · Türk Dil Kurumu", year:"2023", type:"book",
    url:"https://tdk.gov.tr/wp-content/uploads/2023/03/1062.-Makaleler-III-Cagdas-Turk-Dilleri.pdf", accessDate:"2026-11-22",
    supports:{tr:"Çağdaş Türk dillerinin sınıflandırılması ve Türkoloji ekollerinde dil, lehçe, şive ve ağız terimlerinin farklı kullanımları.",en:"Classification of modern Turkic languages and differing uses of language, dialect, and regional-variety terminology in Turkology."}
  },
  {
    id:"iranica-khalaj-2010",
    citation:"Knüppel, M. (2010; updated 2015). ḴALAJ ii. Ḵalaji Language. Encyclopaedia Iranica, XV(4), 364–365.",
    authorOrInstitution:"Michael Knüppel · Encyclopaedia Iranica", year:"2010 / 2015", type:"encyclopedia",
    url:"https://www.iranicaonline.org/articles/khalaj-ii-language/", accessDate:"2026-11-22",
    supports:{tr:"Halaççanın tarihî araştırmaları, İran'daki coğrafyası, arkaik dil özellikleri ve Türk dilleri içindeki tartışmalı konumu.",en:"Historical research, geography in Iran, archaic features, and debated position of Khalaj within Turkic."}
  },
  {
    id:"doerfer-khalaj-1978",
    citation:"Doerfer, G. (1978). Khalaj and Its Relation to the Other Turkic Languages. Türk Dili Araştırmaları Yıllığı Belleten 1977, 17–33.",
    authorOrInstitution:"Gerhard Doerfer · Türk Dil Kurumu Belleten", year:"1978", type:"journal",
    url:"https://tdkbelleten.gov.tr/eng/full-text-pdf/289/eng", accessDate:"2026-11-22",
    supports:{tr:"Halaççanın bağımsız bir Türk dili kolu olarak değerlendirilmesine ilişkin klasik çalışma.",en:"A classic study arguing for Khalaj as an independent branch within the Turkic language family."}
  },
  {
    id:"iranica-turkic-persia-2006",
    citation:"Windfuhr, G. L. (2006). IRAN vii. NON-IRANIAN LANGUAGES (7) Turkic Languages. Encyclopaedia Iranica, XIII(4), 396–401.",
    authorOrInstitution:"Gernot L. Windfuhr · Encyclopaedia Iranica", year:"2006 / 2016", type:"encyclopedia",
    url:"https://www.iranicaonline.org/articles/iran-vii7-turkic-languages/", accessDate:"2026-11-22",
    supports:{tr:"İran'daki Oğuz Türkçesi çeşitleri; Horasan Türkçesi, Kaşkayca ve Halaççanın farklı konumları.",en:"Oghuz Turkic varieties in Iran, including Khorasan Turkic, Qashqai, and the distinct position of Khalaj."}
  }

  {
    id: "johanson-2020-classification",
    citation: "Johanson, L. (2020). The classification of the Turkic languages. In M. Robbeets & A. Savelyev (Eds.), The Oxford Guide to the Transeurasian Languages (pp. 105–114). Oxford University Press. https://doi.org/10.1093/oso/9780198804628.003.0009.",
    authorOrInstitution: "Lars Johanson · Oxford University Press",
    year: "2020",
    type: "book",
    url: "https://academic.oup.com/book/41762/chapter-abstract/354235382",
    doi: "10.1093/oso/9780198804628.003.0009",
    accessDate: "2026-11-22",
    supports: {
      tr: "Türk dillerinin soy sınıflandırmasında dil/lehçe ayrımı, göç, yakınsama ve temas etkileri.",
      en: "Genealogical classification, language/dialect distinctions, migration, convergence, and contact effects in Turkic.",
    },
  },
  {
    id: "unicode-old-turkic-2024",
    citation: "The Unicode Consortium. (2024). The Unicode Standard, Version 16.0, Chapter 14.8: Old Turkic.",
    authorOrInstitution: "The Unicode Consortium",
    year: "2024",
    type: "archive",
    url: "https://www.unicode.org/versions/Unicode16.0.0/core-spec/chapter-14/",
    accessDate: "2026-11-22",
    supports: {
      tr: "Eski Türk yazısının Unicode kod aralığı, Orhon-Yenisey tanıklıkları ve yazı tarihine ilişkin teknik bilgiler.",
      en: "Unicode encoding, Orkhon-Yenisei attestations, and technical details of the Old Turkic script.",
    },
  },
  {
    id: "iranica-codex-cumanicus-1992",
    citation: "MacKenzie, D. N. (1992; updated 2013). Codex Cumanicus. Encyclopaedia Iranica, V(8), 885–886.",
    authorOrInstitution: "David Neil MacKenzie · Encyclopaedia Iranica",
    year: "1992 / 2013",
    type: "encyclopedia",
    url: "https://www.iranicaonline.org/articles/codex-cumanicus/",
    accessDate: "2026-11-22",
    supports: {
      tr: "Codex Cumanicus'un yazma özellikleri, Kuman-Kıpçak dil malzemesi, Latin yazısı ve tarihsel bağlamı.",
      en: "Manuscript features, Cuman-Kipchak linguistic material, Latin script, and historical context of the Codex Cumanicus.",
    },
  },
  {
    id: "unesco-dede-qorqud-2018",
    citation: "UNESCO. (2018). Heritage of Dede Qorqud/Korkyt Ata/Dede Korkut, Epic Culture, Folk Tales and Music. Representative List of the Intangible Cultural Heritage of Humanity.",
    authorOrInstitution: "UNESCO · Intangible Cultural Heritage",
    year: "2018",
    type: "unesco",
    url: "https://ich.unesco.org/en/RL/heritage-of-dede-qorqud-korkyt-ata-dede-korkut-epic-culture-folk-tales-and-music-01399",
    accessDate: "2026-11-22",
    supports: {
      tr: "Dede Korkut anlatı geleneğinin yaşayan aktarımı, sözlü-yazılı kültür ilişkisi ve 2018 UNESCO kaydı.",
      en: "Living transmission, oral-written culture relationship, and the 2018 UNESCO inscription of the Dede Qorqud tradition.",
    },
  },
  {
    id: "tdk-agiz-arastirmalari-1997",
    citation: "Türk Dil Kurumu. (1997). Ağız Araştırmaları Bilgi Şöleni: Tartışma ve değerlendirmeler.",
    authorOrInstitution: "Türk Dil Kurumu",
    year: "1997",
    type: "archive",
    url: "https://tdk.gov.tr/wp-content/uploads/2024/10/Agiz-Arastirmalari-Bilgi-Soleni-9-Mayis-1997.pdf",
    accessDate: "2026-11-22",
    supports: {
      tr: "Ağız, şive ve lehçe terimlerinin Türkoloji içindeki kullanımlarına dair bilimsel tartışmalar.",
      en: "Scholarly discussion of the terms dialect, regional variety, and speech variety in Turkology.",
    },
  },

];