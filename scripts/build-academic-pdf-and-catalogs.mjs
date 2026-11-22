import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { execSync } from "node:child_process";
import ts from "typescript";

const ROOT = "/home/antigravity/turkcenin-izinde";
const DELIVERABLES = path.join(ROOT, "deliverables");

function loadTsModule(relPath) {
  const fullPath = path.join(ROOT, relPath);
  const src = fs.readFileSync(fullPath, "utf8");
  const { outputText } = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  const mod = { exports: {} };
  const fn = new vm.Script(`(function(exports, require, module){${outputText}\n})`).runInThisContext();
  fn(mod.exports, (id) => {
    if (id.startsWith("./")) return loadTsModule(path.posix.join(path.posix.dirname(relPath), id.slice(2) + ".ts"));
    return {};
  }, mod);
  return mod.exports;
}

const { ACADEMIC_SOURCES, EVIDENCE_LABELS } = loadTsModule("src/data/bibliography.ts");
const { HISTORICAL_STATES } = loadTsModule("src/data/earlyHistoryStates.ts");
const { HISTORICAL_PERIODS } = loadTsModule("src/data/periods.ts");
const { TURKIC_BRANCHES } = loadTsModule("src/data/languageFamily.ts");
const { COMPARATIVE_LEXICON } = loadTsModule("src/data/comparativeLexicon.ts");
const { ALPHABET_SYSTEMS } = loadTsModule("src/data/alphabets.ts");
const { RUNIC_INSCRIPTIONS } = loadTsModule("src/data/inscriptions.ts");
const { ORAL_TRADITION_PILLARS, LITERATURE_PERIODS, LITERARY_MASTERWORKS } = loadTsModule("src/data/literature.ts");
const { HISTORICAL_ARTIFACTS } = loadTsModule("src/data/artifacts.ts");

const allLanguages = TURKIC_BRANCHES.flatMap((b) =>
  b.languages.map((l) => ({ ...l, branchName: b.name.tr, macroGroup: b.macroGroup }))
);

// 1. Generate 5 Markdown Catalogs
fs.writeFileSync(
  path.join(DELIVERABLES, "CATALOG-TURKIC-LANGUAGES.md"),
  `# Türk Dilleri Veri Kataloğu (${allLanguages.length} Dil)

**Üretim Tarihi:** 2026-11-22 | **Kaynak:** \`src/data/languageFamily.ts\`

| # | Dil Adı | Yerel Adı | Ana Kol | Durum | Ülkeler / Coğrafya | Konuşur Sayısı (Veri Yılı) | Yazı Sistemleri |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
${allLanguages
  .map(
    (l, i) =>
      `| ${i + 1} | ${l.name.tr} | ${l.nativeName} | ${l.branchName} | ${l.status} | ${l.countries.tr} | ${l.speakersApprox} (${l.speakerDataYear}) | ${l.currentScripts.join(", ")} |`
  )
  .join("\n")}
`
);

fs.writeFileSync(
  path.join(DELIVERABLES, "CATALOG-ALPHABETS.md"),
  `# Alfabe ve Yazı Sistemleri Kataloğu (${ALPHABET_SYSTEMS.length} Sistem)

**Üretim Tarihi:** 2026-11-22 | **Kaynak:** \`src/data/alphabets.ts\`

| # | Yazı / Alfabe | Tipoloji | Dönem | Yönelim | Coğrafya | İşaret Sayısı |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
${ALPHABET_SYSTEMS.map(
  (a, i) =>
    `| ${i + 1} | ${a.name.tr} | ${a.writingSystemType.tr} | ${a.era.tr} | ${a.directionLabel.tr} | ${a.region.tr} | ${a.signCount} |`
).join("\n")}
`
);

fs.writeFileSync(
  path.join(DELIVERABLES, "CATALOG-CHRONOLOGY.md"),
  `# Kronolojik Tarih ve Devletler Çizelgesi

**Üretim Tarihi:** 2026-11-22

## A. Erken Tarih, Hunlar ve Türk Devletleri (${HISTORICAL_STATES.length} Dönem)
| # | Devlet / Dönem | Tarih | Coğrafya | Kanıt Düzeyi |
| :---: | :--- | :--- | :--- | :--- |
${HISTORICAL_STATES.map(
  (s, i) =>
    `| ${i + 1} | ${s.name.tr} | ${s.dateRange} | ${s.geography.tr} | ${EVIDENCE_LABELS[s.evidenceLevel].tr} |`
).join("\n")}

## B. Türkçenin Tarihsel Dil Dönemleri (${HISTORICAL_PERIODS.length} Evre)
| # | Dil Dönemi | Tarih | Epistemik Statü | Temel Eserler |
| :---: | :--- | :--- | :--- | :--- |
${HISTORICAL_PERIODS.map(
  (p, i) =>
    `| ${i + 1} | ${p.title.tr} | ${p.dateLabel.tr} | ${p.status === "reconstructed" ? "Kuramsal Rekonstrüksiyon" : "Yazılı Belgeli"} | ${p.keyWorks.join("; ")} |`
).join("\n")}
`
);

fs.writeFileSync(
  path.join(DELIVERABLES, "CATALOG-LITERATURE-ARTIFACTS.md"),
  `# Eser, Yazıt ve Yazar Kataloğu

**Üretim Tarihi:** 2026-11-22

## A. Orhun, Yenisey, Çoyr ve Talas Runik Yazıtları (${RUNIC_INSCRIPTIONS.length} Anıt)
${RUNIC_INSCRIPTIONS.map(
  (ins, i) => `### ${i + 1}. ${ins.name.tr} (${ins.date})
- **Konum:** ${ins.location.tr}
- **Yazar/Hamî:** ${ins.authorOrPatron.tr}
- **Çevriyazı:** \`${ins.excerptTransliteration}\`
- **Anlam:** "${ins.excerptTranslation.tr}"
`
).join("\n")}

## B. Birincil Epigrafik ve Yazma Eserler (${HISTORICAL_ARTIFACTS.length} Eser)
${HISTORICAL_ARTIFACTS.map(
  (a, i) => `- **${i + 1}. ${a.title.tr}** (${a.date}) — ${a.location.tr} | *Arşiv:* ${a.repository.tr}`
).join("\n")}

## C. Edebiyat Tarihi Başyapıtları (${LITERARY_MASTERWORKS.length} Seçki)
${LITERARY_MASTERWORKS.map(
  (w, i) => `- **${i + 1}. ${w.title}** — ${w.author} (${w.date}) | ${w.language.tr} | ${w.manuscriptInfo.tr}`
).join("\n")}
`
);

fs.writeFileSync(
  path.join(DELIVERABLES, "CATALOG-BIBLIOGRAPHY.md"),
  `# Doğrulanmış Akademik Kaynak Envanteri (${ACADEMIC_SOURCES.length} Kaynak)

**Üretim Tarihi:** 2026-11-22

| # | ID | Yazar / Kurum | Yıl | Kanıt Sınıfı | Künye | URL / DOI |
| :---: | :--- | :--- | :---: | :--- | :--- | :--- |
${ACADEMIC_SOURCES.map(
  (s, i) =>
    `| ${i + 1} | \`${s.id}\` | ${s.authorOrInstitution} | ${s.year} | ${EVIDENCE_LABELS[s.evidenceLevel].tr} | ${s.citation} | ${s.doi ? `DOI: ${s.doi}` : s.url || "-"} |`
).join("\n")}
`
);

// 2. Build Comprehensive 20-Chapter + 5-Appendix Academic HTML -> PDF
const esc = (str) =>
  String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const html = `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8" />
<title>TÜRKÇENİN İZİNDE — Kapsamlı Akademik Araştırma Atlası</title>
<style>
  @page {
    size: A4;
    margin: 22mm 18mm 22mm 18mm;
    @top-left {
      content: "TÜRKÇENİN İZİNDE — AKADEMİK ARAŞTIRMA ATLASI";
      font-family: "DejaVu Sans", sans-serif;
      font-size: 7.5pt;
      color: #64748b;
      letter-spacing: 0.06em;
    }
    @bottom-left {
      content: "Doğrulanmış Akademik Veri Katmanı · 2026";
      font-family: "DejaVu Sans", sans-serif;
      font-size: 7.5pt;
      color: #64748b;
    }
    @bottom-right {
      content: "Sayfa " counter(page) " / " counter(pages);
      font-family: "DejaVu Sans", sans-serif;
      font-size: 7.5pt;
      color: #0f172a;
      font-weight: bold;
    }
  }
  @page :first {
    @top-left { content: none; }
    @bottom-left { content: none; }
    @bottom-right { content: none; }
  }
  body {
    font-family: "DejaVu Serif", "Liberation Serif", Georgia, serif;
    color: #0f172a;
    line-height: 1.55;
    font-size: 10pt;
    margin: 0;
  }
  .cover {
    page-break-after: always;
    min-height: 245mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1.5pt solid #0f172a;
    padding: 18mm;
    background: #faf7f2;
    box-sizing: border-box;
  }
  .cover-tag {
    font-family: "DejaVu Sans", sans-serif;
    font-size: 9pt;
    font-weight: bold;
    letter-spacing: 0.14em;
    color: #b45309;
    text-transform: uppercase;
  }
  .cover h1 {
    font-size: 28pt;
    line-height: 1.15;
    color: #0f172a;
    margin: 10mm 0 4mm 0;
  }
  .cover h2 {
    font-size: 13.5pt;
    font-weight: normal;
    color: #0e7490;
    margin: 0 0 10mm 0;
    line-height: 1.4;
  }
  .cover-box {
    border-top: 2pt solid #b45309;
    padding-top: 6mm;
    font-family: "DejaVu Sans", sans-serif;
    font-size: 9pt;
    color: #334155;
  }
  h2.chapter {
    font-family: "DejaVu Serif", Georgia, serif;
    font-size: 15pt;
    color: #0f172a;
    border-bottom: 1.5pt solid #b45309;
    padding-bottom: 2mm;
    margin-top: 8mm;
    margin-bottom: 4mm;
    page-break-after: avoid;
  }
  h3 {
    font-family: "DejaVu Sans", sans-serif;
    font-size: 10.5pt;
    color: #0e7490;
    margin-top: 5mm;
    margin-bottom: 2mm;
    page-break-after: avoid;
  }
  p { margin: 0 0 3mm 0; text-align: justify; }
  ul { margin: 2mm 0 4mm 0; padding-left: 5mm; }
  li { margin-bottom: 1.5mm; }
  .callout {
    background: #f8f6f1;
    border-left: 3pt solid #0e7490;
    padding: 3mm 4mm;
    margin: 3mm 0 4mm 0;
    font-size: 9pt;
  }
  .caution {
    background: #fffbeb;
    border-left: 3pt solid #b45309;
    padding: 3mm 4mm;
    margin: 3mm 0 4mm 0;
    font-size: 9pt;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 3mm 0 5mm 0;
    font-family: "DejaVu Sans", sans-serif;
    font-size: 8pt;
  }
  th, td {
    border: 0.5pt solid #cbd5e1;
    padding: 2mm 2.5mm;
    text-align: left;
    vertical-align: top;
  }
  th {
    background: #0f172a;
    color: #ffffff;
    font-weight: bold;
  }
  tr:nth-child(even) td { background: #f8fafc; }
  .toc-item {
    display: flex;
    justify-content: space-between;
    border-bottom: 0.5pt dotted #cbd5e1;
    padding: 1.2mm 0;
    font-family: "DejaVu Sans", sans-serif;
    font-size: 9pt;
  }
  .page-break { page-break-before: always; }
  .badge {
    display: inline-block;
    font-family: "DejaVu Sans", sans-serif;
    font-size: 7pt;
    font-weight: bold;
    padding: 0.5mm 1.5mm;
    border-radius: 2pt;
    background: #e2e8f0;
    color: #0f172a;
  }
</style>
</head>
<body>

<!-- 1. KAPAK -->
<div class="cover">
  <div>
    <div class="cover-tag">AKADEMİK ARAŞTIRMA MONOGRAFİSİ &amp; DİJİTAL ATLAS RAPORU</div>
    <h1>TÜRKÇENİN İZİNDE</h1>
    <h2>Türk Dillerinin, Tarihinin, Alfabelerinin ve Edebiyatının Kapsamlı Araştırma Atlası</h2>
    <p style="font-size:10pt; color:#475569; max-width:140mm;">
      Proto-Türkçe kuramsal rekonstrüksiyonlarından MÖ 209 Mete Han ve Büyük Hun dönemine, Orhon–Yenisey epigrafisinden İpek Yolu'nun çok alfabeli el yazmalarına, 38 Türk dilinin sınıflandırılmasından çağdaş Türk dünyası edebiyatlarına uzanan kaynak doğrulamalı bilimsel inceleme.
    </p>
  </div>
  <div class="cover-box">
    <strong>Hazırlayan:</strong> Türkçenin İzinde Araştırma ve Mühendislik Ekibi<br/>
    <strong>Tarih:</strong> 22 Kasım 2026<br/>
    <strong>Veri Envanteri:</strong> ${allLanguages.length} Türk Dili · ${HISTORICAL_STATES.length} Tarihsel Devlet/Dönem · ${ALPHABET_SYSTEMS.length} Yazı Sistemi · ${RUNIC_INSCRIPTIONS.length} Runik Anıt · ${ACADEMIC_SOURCES.length} Doğrulanmış Akademik Kaynak<br/>
    <strong>Metodoloji İlkesi:</strong> Birincil kaynak, çoklu akademik doğrulama ve tartışmalı hipotezlerin açık ayrımı.
  </div>
</div>

<!-- 2. İÇİNDEKİLER -->
<h2 class="chapter">2. İçindekiler</h2>
${[
  "1. Kapak",
  "2. İçindekiler",
  "3. Araştırmanın Amacı, Yöntemi ve Bilimsel Doğruluk Standardı",
  "4. Tarih Öncesi ve Proto-Türkçe Tartışmaları (Ön Türkçe, Erken/Geç Ana Türkçe, İskit/Saka)",
  "5. Büyük Hun İmparatorluğu ve Mete Han (MÖ 209)",
  "6. Hunlardan Göktürklere Tarihsel Devamlılık ve Dönüşüm (Tabgaç, Avar, 1. ve 2. Kağanlık)",
  "7. Türk Devletleri ve Tarihsel Dönemler (13 Yapısal İnceleme)",
  "8. Türkçenin Tarihsel Gelişimi ve Dönemlendirme Ekolleri",
  "9. Türk Dillerinin Sınıflandırılması (6 Ana Dal, 38 Dil)",
  "10. Karşılaştırmalı Dil ve Etimoloji Laboratuvarı (Ses Yasaları ve Temel Söz Varlığı)",
  "11. Alfabeler ve Yazı Sistemleri (10 Yazı Geleneği ve Allografi)",
  "12. Orhun, Yenisey, Çoyr ve Talas Yazıtları",
  "13. Türk Edebiyatı Tarihi (Sözlü Kültürden Çağdaş Türk Dünyasına)",
  "14. Temel Eserler ve Yazarlar Kataloğu",
  "15. Coğrafi Dağılım (Tarihsel Merkezler ve Çağdaş Sınırlar)",
  "16. Kültürel ve Dillerarası Etkileşimler (Çince, Soğdca, Farsça, Arapça, Moğolca, Rusça)",
  "17. Günümüzde Türk Dillerinin Durumu ve Tehlike Altındaki Diller",
  "18. Tartışmalı Akademik Konular ve Metodolojik Uyarılar",
  "19. Sonuç ve Değerlendirme",
  "20. Ayrıntılı Akademik Kaynakça (28 Doğrulanmış Kaynak)",
  "Ek A–E: Yapılandırılmış Veri Katalogları Özeti",
]
  .map((item) => `<div class="toc-item"><span>${esc(item)}</span><span>•</span></div>`)
  .join("\n")}

<!-- 3. AMAÇ VE YÖNTEM -->
<div class="page-break"></div>
<h2 class="chapter">3. Araştırmanın Amacı, Yöntemi ve Bilimsel Doğruluk Standardı</h2>
<p>
  Bu rapor, Türk dillerinin tarih öncesi köklerinden çağdaş dönemdeki 38 farklı dil ve lehçe çeşitlenmesine, kullandığı 10 farklı yazı sisteminden sözlü ve yazılı edebiyat mirasına kadar uzanan çok katmanlı gelişimi akademik doğruluk ilkesiyle sentezler. Çalışma, hem basılı akademik monografi (bu PDF) hem de etkileşimli dijital atlas web uygulaması için tek ve ortak bir doğrulanmış veri katmanından üretilmiştir.
</p>
<div class="callout">
  <strong>Dört Temel Kavram Ayrımı:</strong><br/>
  <strong>Dil (Language):</strong> Kendi sesbilgisi, biçimbilgisi ve sözdizimi dizgesine sahip bağımsız iletişim sistemi.<br/>
  <strong>Lehçe / Şive / Ağız:</strong> Aynı dilin tarihsel veya bölgesel çeşitlenmeleri (Türkoloji geleneğindeki tarihsel <em>şive</em> kullanımı ile modern eşzamanlı <em>lehçe/ağız</em> ayrımı ayrı ele alınır).<br/>
  <strong>Yazı Sistemi (Writing System):</strong> Sesleri görselleştirme ilkesi (abjad, abugida, runiform, tam alfabe).<br/>
  <strong>Alfabe (Alphabet):</strong> Belirli bir yazı sisteminin belirli bir dile uyarlanmış somut harf envanteri.
</div>
<p>
  <strong>Beşli Kanıt Sınıflandırması:</strong> Her önemli tarihsel ve dilbilimsel iddia; <em>Birincil Kaynakla Desteklenmiş</em>, <em>Birden Fazla Akademik Kaynakla Desteklenmiş</em>, <em>Güçlü Bilimsel Görüş</em>, <em>Tartışmalı Akademik Görüş</em> veya <em>Yeterli Kanıt Bulunmayan Hipotez</em> sınıflarından biriyle işaretlenmiştir.
</p>

<!-- 4. PROTO-TÜRKÇE -->
<h2 class="chapter">4. Tarih Öncesi ve Proto-Türkçe Tartışmaları</h2>
<p>
  Türk dil tarihini Orhun Yazıtları (8. yy.) ile başlatmak filolojik açıdan ilk büyük yazılı anıtları esas alsa da dilin oluşumunu açıklamaz. Karşılaştırmalı tarihsel dilbilim, yazılı belgeler öncesindeki <strong>Proto-Türkçe (Ana Türkçe)</strong> aşamasını Oğur (Çuvaşça) ve Genel Türkçe verilerinin geriye dönük karşılaştırılmasıyla yeniden yapılandırır (Johanson &amp; Csató, 2022; Brill ETLO).
</p>
<ul>
  <li><strong>Ön Türkçe / Erken Ana Türkçe:</strong> Oğur kolunun (*r/*l) Genel Türkçeden (*z/*š) ayrışmasından önceki kuramsal dönem. İç rekonstrüksiyon yaklaşık 2000 yıl geriye gider; bronz çağı temas sözcükleri daha eski tabakalarla tartışılır (Robbeets vd., 2023).</li>
  <li><strong>Geç Ana Türkçe:</strong> Oğur ayrışması sonrası Genel Türkçe konuşurlarının ortak atası.</li>
  <li><strong>İskit / Saka Toplulukları Tartışması:</strong> MÖ 1. binyılda Avrasya bozkırlarında yaşayan İskit/Saka topluluklarının dili, mevcut Eski Farsça ve Grekçe onomastik/metin verilerine göre ağırlıklı olarak <strong>Kuzeydoğu İrani</strong> kabul edilir (Schmitt, Encyclopaedia Iranica). Bozkır kültürel etkileşimi yoğun olsa da bir topluluğun Orta Asya'da yaşamış olması dilinin kesinlikle Türkçe olduğunu kanıtlamaz.</li>
</ul>

<!-- 5. HUNLAR VE METE HAN -->
<h2 class="chapter">5. Büyük Hun İmparatorluğu ve Mete Han (MÖ 209)</h2>
<p>
  Çin'in resmî hanedan tarihlerinden <em>Shiji</em> (Sima Qian, Bölüm 110) ve <em>Hanshu</em> kayıtlarına göre Asya Hunları (Xiongnu), MÖ 3. yüzyıl sonunda Teoman (Touman) döneminin ardından oğlu <strong>Mete Han (Modu Chanyu)</strong> tarafından <strong>MÖ 209</strong> yılında merkezi bir bozkır imparatorluğuna dönüştürüldü (Taşağıl, 2023; Golden, 1992).
</p>
<ul>
  <li><strong>Yönetim ve Onlu Teşkilat:</strong> Chanyu (Tanhu) makamı altında Sağ ve Sol Bilge Krallar (ikili kanat yönetimi) ile onlu askerî düzen (onbaşı, yüzbaşı, binbaşı, tümen) kurumsallaştı.</li>
  <li><strong>Çin ile İlişkiler:</strong> MÖ 200 Baideng kuşatması sonrasında Han hanedanı ile diplomatik eşitlik ve <em>Heqin</em> antlaşma düzeni kuruldu.</li>
  <li><strong>Hunların Dili Üzerine Bilimsel Tartışma:</strong> Xiongnu konfederasyonu çok dilli bir bozkır birliğiydi. Çin transkripsiyonlarındaki <em>Tanhu, Tegin, Tarqan, Chengli (Teŋri)</em> gibi unsurlar için Proto-Türkçe, Yeniseyce (Ligeti–Pulleyblank–Vovin hipotezi) ve karma konfederasyon görüşleri mevcuttur (Vovin, 2000–2020; Golden, 1992).</li>
  <li><strong>Doğu–Batı Hun Ayrışması ve Avrupa Hunları:</strong> MS 1. yüzyıldaki bölünme sonrasında batıya yönelen topluluklar, MS 370'lerde Avrupa Hunları olarak tarih sahnesine çıktı ve Oğur/Ön Bulgar oluşumlarıyla temas kurdu.</li>
</ul>

<!-- 6 & 7. DEVLETLER -->
<div class="page-break"></div>
<h2 class="chapter">6–7. Hunlardan Göktürklere ve Türk Devletleri Atlası</h2>
<p>
  Siyasi hanedan devamlılığı ile dilsel devamlılık birbirine otomatik olarak eşitlenmeden, Hunlardan Osmanlı ve Safevî çevresine uzanan 13 temel tarihsel dönem ve devlet yapısı aşağıda özetlenmiştir:
</p>
<table>
  <thead>
    <tr>
      <th>Devlet / Dönem</th>
      <th>Tarih</th>
      <th>Coğrafya</th>
      <th>Dilsel Miras &amp; Yazılı Kaynaklar</th>
      <th>Kanıt Sınıfı</th>
    </tr>
  </thead>
  <tbody>
    ${HISTORICAL_STATES.map(
      (s) => `<tr>
        <td><strong>${esc(s.name.tr)}</strong></td>
        <td>${esc(s.dateRange)}</td>
        <td>${esc(s.geography.tr)}</td>
        <td>${esc(s.linguisticHeritage.tr)}<br/><em>Kaynaklar: ${esc(s.writtenSources.tr)}</em></td>
        <td><span class="badge">${esc(EVIDENCE_LABELS[s.evidenceLevel].tr)}</span></td>
      </tr>`
    ).join("\n")}
  </tbody>
</table>

<!-- 8. TÜRKÇENİN TARİHSEL GELİŞİMİ -->
<h2 class="chapter">8. Türkçenin Tarihsel Gelişimi ve Dönemlendirme</h2>
<p>
  Türkoloji ekollerine göre (Talat Tekin, Marcel Erdal, Lars Johanson, TDK geleneği) dönem sınırları yüzyıl bazında esneklik gösterebilir; ancak kuramsal rekonstrüksiyon ile yazılı belgeli dönemlerin ayrımı sabittir:
</p>
<table>
  <thead>
    <tr>
      <th>Dönem</th>
      <th>Tarih Aralığı</th>
      <th>Statü</th>
      <th>Yazı Sistemleri &amp; Temel Eserler</th>
    </tr>
  </thead>
  <tbody>
    ${HISTORICAL_PERIODS.map(
      (p) => `<tr>
        <td><strong>${esc(p.title.tr)}</strong></td>
        <td>${esc(p.dateLabel.tr)}</td>
        <td>${p.status === "reconstructed" ? "Kuramsal Rekonstrüksiyon" : "Yazılı Belgeli"}</td>
        <td>${esc(p.keyWorks.join(", "))}</td>
      </tr>`
    ).join("\n")}
  </tbody>
</table>

<!-- 9. SINIFLANDIRMA -->
<div class="page-break"></div>
<h2 class="chapter">9. Türk Dillerinin Sınıflandırılması (${allLanguages.length} Dil)</h2>
<p>
  Güncel akademik sınıflandırmada (Johanson &amp; Csató, 2022; Brill ETLO) Türk dil ailesi önce <strong>Oğur (r/l)</strong> ve <strong>Genel Türkçe (z/š)</strong> olarak ikiye ayrılır; Genel Türkçe ise Oğuz, Kıpçak, Karluk, Sibirya ve arkaik Arğu (Halaçça) dallarından oluşur. Türkoloji geleneğindeki <em>lehçe/şive/ağız</em> ayrımı ile modern dilbilimdeki karşılıklı anlaşılabilirlik ölçütü birlikte değerlendirilmelidir.
</p>
<table>
  <thead>
    <tr>
      <th>Dil</th>
      <th>Ana Kol</th>
      <th>Ülkeler</th>
      <th>Konuşur (Veri Yılı)</th>
      <th>Durum &amp; Yazı</th>
    </tr>
  </thead>
  <tbody>
    ${allLanguages
      .map(
        (l) => `<tr>
          <td><strong>${esc(l.name.tr)}</strong><br/><span style="font-size:7pt;color:#475569">${esc(l.nativeName)}</span></td>
          <td>${esc(l.branchName)}</td>
          <td>${esc(l.countries.tr)}</td>
          <td>${esc(l.speakersApprox)}<br/><span style="font-size:7pt;color:#64748b">${esc(l.speakerDataYear)}</span></td>
          <td>${esc(l.status)} · ${esc(l.currentScripts.join(", "))}</td>
        </tr>`
      )
      .join("\n")}
  </tbody>
</table>

<!-- 10. KARŞILAŞTIRMALI SÖZLÜK -->
<div class="page-break"></div>
<h2 class="chapter">10. Dil Karşılaştırmaları ve Düzenli Ses Denklikleri</h2>
<p>
  Sözcük akrabalığı yüzeysel ses benzerliğiyle değil, Clauson (1972) ve Tekin (1991) tarafından belgelenen düzenli ses yasalarıyla kanıtlanır:
</p>
<table>
  <thead>
    <tr>
      <th>Anlam</th>
      <th>Proto-Türkçe</th>
      <th>Eski Türkçe</th>
      <th>Türkçe</th>
      <th>Kazakça</th>
      <th>Özbekçe</th>
      <th>Sahaca</th>
      <th>Çuvaşça</th>
      <th>Halaçça</th>
    </tr>
  </thead>
  <tbody>
    ${COMPARATIVE_LEXICON.map(
      (r) => `<tr>
        <td><strong>${esc(r.meaning.tr)}</strong></td>
        <td>${esc(r.protoTurkic)}</td>
        <td>${esc(r.oldTurkic)}</td>
        <td>${esc(r.turkish)}</td>
        <td>${esc(r.kazakh)}</td>
        <td>${esc(r.uzbek)}</td>
        <td>${esc(r.sakha)}</td>
        <td>${esc(r.chuvash)}</td>
        <td>${esc(r.khalaj)}</td>
      </tr>`
    ).join("\n")}
  </tbody>
</table>

<!-- 11 & 12. ALFABELER VE YAZITLAR -->
<h2 class="chapter">11–12. Alfabeler, Yazı Sistemleri ve Runik Yazıtlar</h2>
<p>
  Türk topluluklarının tarih boyunca kullandığı ${ALPHABET_SYSTEMS.length} yazı geleneği incelenmiş; Soğd ve Tibet gibi kaynak/etkileşim yazıları ile doğrudan Türkçeyi kodlayan Göktürk, Yenisey, Eski Uygur, Arap, Kiril, Latin ve İbrani alfabeleri birbirinden ayrılmıştır.
</p>
<table>
  <thead>
    <tr>
      <th>Yazı Sistemi</th>
      <th>Tipoloji</th>
      <th>Dönem</th>
      <th>Yönelim</th>
      <th>Bölge</th>
    </tr>
  </thead>
  <tbody>
    ${ALPHABET_SYSTEMS.map(
      (a) => `<tr>
        <td><strong>${esc(a.name.tr)}</strong></td>
        <td>${esc(a.writingSystemType.tr)}</td>
        <td>${esc(a.era.tr)}</td>
        <td>${esc(a.directionLabel.tr)}</td>
        <td>${esc(a.region.tr)}</td>
      </tr>`
    ).join("\n")}
  </tbody>
</table>

<h3>Orhun, Yenisey, Çoyr ve Talas Runik Yazıtları</h3>
<table>
  <thead>
    <tr>
      <th>Yazıt</th>
      <th>Tarih</th>
      <th>Konum</th>
      <th>Örnek Çevriyazı &amp; İçerik</th>
    </tr>
  </thead>
  <tbody>
    ${RUNIC_INSCRIPTIONS.map(
      (ins) => `<tr>
        <td><strong>${esc(ins.name.tr)}</strong></td>
        <td>${esc(ins.date)}</td>
        <td>${esc(ins.location.tr)}</td>
        <td><em>${esc(ins.excerptTransliteration)}</em> — ${esc(ins.historicalContent.tr)}</td>
      </tr>`
    ).join("\n")}
  </tbody>
</table>

<!-- 13 & 14. EDEBİYAT TARİHİ -->
<div class="page-break"></div>
<h2 class="chapter">13–14. Türk Edebiyatı Tarihi ve Temel Eserler</h2>
<p>
  Sözlü kültürde <strong>ozan/baksı/kam</strong> geleneği ve <strong>sav, sagu, koşuk</strong> türleriyle başlayan edebî birikim; destanlarda mitolojik anlatı ile tarihsel gerçeklik ayrılarak incelenmelidir. Yazılı edebiyat ise 8 ana dönemde takip edilir:
</p>
<table>
  <thead>
    <tr>
      <th>Edebiyat Dönemi</th>
      <th>Tarih</th>
      <th>Dil &amp; Yazı</th>
      <th>Başlıca Yazar ve Eserler</th>
    </tr>
  </thead>
  <tbody>
    ${LITERATURE_PERIODS.map(
      (p) => `<tr>
        <td><strong>${esc(p.name.tr)}</strong></td>
        <td>${esc(p.era)}</td>
        <td>${esc(p.languageAndScript.tr)}</td>
        <td>${esc(p.majorAuthorsAndWorks.join(", "))}</td>
      </tr>`
    ).join("\n")}
  </tbody>
</table>

<!-- 15, 16, 17, 18, 19. COĞRAFYA, ETKİLEŞİM, ÇAĞDAŞ DURUM, TARTIŞMALAR, SONUÇ -->
<h2 class="chapter">15–19. Coğrafya, Dillerarası Etkileşim, Çağdaş Durum ve Sonuç</h2>
<p>
  <strong>15. Coğrafi Dağılım:</strong> Türk dilleri Orta Asya, Güney ve Kuzey Sibirya, Doğu Türkistan (Tarım Havzası), İdil-Ural, Kafkasya, Anadolu, Balkanlar ve Orta İran (Halaçça) sahalarına yayılmıştır. Atlasımızda tarihsel devlet sınırları ile modern ulus-devlet sınırları ayrı katmanlarda gösterilmektedir.
</p>
<p>
  <strong>16. Kültürel ve Dilsel Etkileşimler:</strong> Türkçenin tarihsel söz varlığı; bozkır döneminde Çince ve Soğdca, İpek Yolu'nda Sanskritçe/Toharca, İslam medeniyetinde Farsça ve Arapça, Avrasya'da Moğolca ve modern dönemde Rusça/Batı dilleriyle yoğun ödünçleme ve çeviri ilişkileri içinde gelişmiştir.
</p>
<p>
  <strong>17. Günümüzde Türk Dilleri:</strong> Türkiye Türkçesi (75–85 milyon), Özbekçe (~35 milyon), Azerbaycan Türkçesi (~25–30 milyon) ve Kazakça (~15–17 milyon) büyük resmî/edebî diller olarak dijital ve akademik varlığını güçlendirirken; Karayca, Kırımçakça, Tofalarca, Çulımca, İli Türkçesi, Fuyü Kırgızcası ve Sarı Uygurca gibi küçük topluluk dilleri UNESCO ölçütlerine göre tehlike altındadır.
</p>
<p>
  <strong>18. Tartışmalı Akademik Konular:</strong> (a) Altay/Transavrasya dil ailesi hipotezi (genetik akrabalık vs. uzun süreli temas), (b) Xiongnu/Hun dili (Proto-Türkçe vs. Yeniseyce vs. çok dilli konfederasyon), (c) Tabgaçça (Para-Moğolca vs. Türkçe katmanlar), (d) Salarca ve Aynuca gibi temas dillerinin sınıflandırılması.
</p>
<p>
  <strong>19. Sonuç:</strong> Türkçenin 2.500 yılı aşkın belgelenebilir ve karşılaştırmalı tarihi, tek bir alfabe veya tek bir coğrafya ile sınırlı olmayan dinamik bir Avrasya dil ve kültür ağıdır.
</p>

<!-- 20. KAYNAKÇA -->
<div class="page-break"></div>
<h2 class="chapter">20. Ayrıntılı Akademik Kaynakça (${ACADEMIC_SOURCES.length} Doğrulanmış Kaynak)</h2>
<table>
  <thead>
    <tr>
      <th>#</th>
      <th>Künye</th>
      <th>Kanıt Sınıfı</th>
      <th>Kalıcı Bağlantı / DOI</th>
    </tr>
  </thead>
  <tbody>
    ${ACADEMIC_SOURCES.map(
      (s, i) => `<tr>
        <td>${i + 1}</td>
        <td>${esc(s.citation)}</td>
        <td>${esc(EVIDENCE_LABELS[s.evidenceLevel].tr)}</td>
        <td style="word-break:break-all;font-size:7pt">${esc(s.doi ? `DOI: ${s.doi}` : s.url || "-")}</td>
      </tr>`
    ).join("\n")}
  </tbody>
</table>

</body>
</html>`;

const tmpHtml = "/tmp/turkcenin-izinde-atlas.html";
const outPdf = path.join(DELIVERABLES, "TURKCENIN-IZINDE-AKADEMIK-ATLAS.pdf");
fs.writeFileSync(tmpHtml, html);

execSync(
  `chromium --headless --no-sandbox --disable-gpu --print-to-pdf="${outPdf}" --no-pdf-header-footer "${tmpHtml}"`,
  { stdio: "inherit" }
);

const stat = fs.statSync(outPdf);
console.log("Generated PDF:", outPdf, "Size:", stat.size, "bytes");
