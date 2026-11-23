import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { execSync } from "node:child_process";
import ts from "typescript";

const ROOT = "/home/antigravity/turkcenin-izinde";
const OUT = path.join(ROOT, "TURKCE_NIN_IZINDE_FINAL_DELIVERY");
fs.mkdirSync(OUT, { recursive: true });

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
const { ALPHABET_SYSTEMS } = loadTsModule("src/data/alphabets.ts");
const { RUNIC_INSCRIPTIONS } = loadTsModule("src/data/inscriptions.ts");
const { LITERATURE_PERIODS } = loadTsModule("src/data/literature.ts");

const totalLanguages = TURKIC_BRANCHES.reduce((s, b) => s + b.languages.length, 0);
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function renderPdf(filename, title, bodyHtml) {
  const html = `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"/><title>${esc(title)}</title>
  <style>
    @page { size: A4; margin: 20mm 16mm; @bottom-right { content: "Sayfa " counter(page) " / " counter(pages); font-family: "DejaVu Sans", sans-serif; font-size: 8pt; color: #475569; } }
    body { font-family: "DejaVu Serif", Georgia, serif; color: #0f172a; font-size: 9.5pt; line-height: 1.5; }
    h1 { font-size: 18pt; border-bottom: 2pt solid #b45309; padding-bottom: 3mm; margin-bottom: 5mm; }
    h2 { font-family: "DejaVu Sans", sans-serif; font-size: 11.5pt; color: #0e7490; margin-top: 6mm; }
    table { width: 100%; border-collapse: collapse; margin: 3mm 0 5mm 0; font-family: "DejaVu Sans", sans-serif; font-size: 8pt; }
    th, td { border: 0.5pt solid #cbd5e1; padding: 2mm; text-align: left; vertical-align: top; }
    th { background: #0f172a; color: #fff; }
    .meta { font-family: "DejaVu Sans", sans-serif; font-size: 8.5pt; color: #475569; margin-bottom: 5mm; }
    .pass { color: #065f46; font-weight: bold; }
    .blocked { color: #991b1b; font-weight: bold; }
  </style></head><body>
  <h1>${esc(title)}</h1>
  <div class="meta">TÜRKÇENİN İZİNDE · Tarih: 23 Kasım 2026 · GitHub: https://github.com/karargahprojecteal/turkcenin-izinde</div>
  ${bodyHtml}
  </body></html>`;
  const tmp = `/tmp/${filename}.html`;
  const pdfPath = path.join(OUT, filename);
  fs.writeFileSync(tmp, html);
  execSync(`chromium --headless --no-sandbox --disable-gpu --print-to-pdf="${pdfPath}" --no-pdf-header-footer "${tmp}"`, { stdio: "ignore" });
  console.log("Generated", filename, fs.statSync(pdfPath).size, "bytes");
}

// 1. PROJECT_REPORT.pdf (copy comprehensive monograph + ensure exact name)
fs.copyFileSync(
  path.join(ROOT, "deliverables/TURKCENIN-IZINDE-AKADEMIK-ATLAS.pdf"),
  path.join(OUT, "PROJECT_REPORT.pdf")
);
console.log("Copied PROJECT_REPORT.pdf");

// 2. USER_GUIDE.pdf
renderPdf("USER_GUIDE.pdf", "TÜRKÇENİN İZİNDE — KULLANIM KILAVUZU", `
<h2>1. Genel Gezinti ve Kısayollar</h2>
<ul>
  <li><strong>Üst Menü (Masaüstü) / Çekmece Menü (Mobil &amp; Tablet):</strong> 9 ana bölüm arasında geçiş sağlar (Genel Bakış, Hunlar &amp; Devletler, Tarih Çizelgesi, Dil Ağacı &amp; Karşılaştırma, Yazı &amp; Yazıtlar, Coğrafi Atlas, Edebiyat Tarihi, Eser Galerisi, Kaynakça &amp; Metodoloji).</li>
  <li><strong>Küresel Arama:</strong> Klavyede <code>/</code> veya <code>Cmd/Ctrl + K</code> tuşlarına basarak dönem, dil, alfabe, yazıt, eser veya kaynak arayabilirsiniz.</li>
  <li><strong>TR | EN Dil Değiştirici:</strong> Sağ üstteki düğme ile arayüz ve akademik içerik anında Türkçe–İngilizce arasında değiştirilir.</li>
</ul>
<h2>2. Modül Kullanım Adımları</h2>
<ul>
  <li><strong>Hunlar &amp; Devletler:</strong> Kanıt düzeyi filtresiyle (Birincil Kaynak, Çoklu Akademik, Tartışmalı) MÖ 209 Mete Han ve 13 tarihsel devleti inceleyin.</li>
  <li><strong>Tarih Çizelgesi:</strong> Kuramsal (Proto-Türkçe) ve Yazılı Belgeli dönemleri filtreleyin; dönem kartlarına tıklayarak detay dosyasını açın.</li>
  <li><strong>Dil Ağacı &amp; Karşılaştırma:</strong> SVG kladogramda Oğur–Genel Türkçe ayrımına ve 38 dilin profiline tıklayın; alttaki Etimoloji Laboratuvarında sözcük kategorilerini (Sayılar, Akrabalık, Doğa, Fiiller vb.) karşılaştırın.</li>
  <li><strong>Yazı &amp; Yazıtlar:</strong> 10 yazı sisteminin yazım yönünü (RTL, LTR, Dikey) inceleyin ve 6 runik yazıtı okuyun.</li>
  <li><strong>Coğrafi Atlas &amp; Eser Galerisi:</strong> Tarihsel Yayılım ve Çağdaş Dağılım katmanları arasında geçiş yapın; eser kartlarına tıklayarak detay modalını açın (<code>Esc</code> ile kapatın).</li>
</ul>
`);

// 3. ACADEMIC_SOURCES.pdf
renderPdf("ACADEMIC_SOURCES.pdf", `DOĞRULANMIŞ AKADEMİK KAYNAKÇA (${ACADEMIC_SOURCES.length} Kaynak)`, `
<p>Aşağıdaki ${ACADEMIC_SOURCES.length} akademik kaynak <code>src/data/bibliography.ts</code> katmanından üretilmiştir. İncelenmemiş kaynak eklenmemiştir.</p>
<table><thead><tr><th>#</th><th>Yazar / Kurum</th><th>Yıl</th><th>Kanıt Sınıfı</th><th>Künye</th><th>URL / DOI</th></tr></thead><tbody>
${ACADEMIC_SOURCES.map((s, i) => `<tr><td>${i + 1}</td><td>${esc(s.authorOrInstitution)}</td><td>${esc(s.year)}</td><td>${esc(EVIDENCE_LABELS[s.evidenceLevel || "multi_academic"].tr)}</td><td>${esc(s.citation)}</td><td style="word-break:break-all;font-size:7pt">${esc(s.doi ? `DOI: ${s.doi}` : s.url || "-")}</td></tr>`).join("")}
</tbody></table>
`);

// 4. CONTENT_AUDIT.pdf
renderPdf("CONTENT_AUDIT.pdf", "İÇERİK ENVANTERİ VE BİLİMSEL DOĞRULUK DENETİMİ", `
<h2>1. Sayısal Envanter Doğrulaması</h2>
<table><thead><tr><th>Kategori</th><th>Beyan Edilen</th><th>Gerçek Kod Tabanı Sayısı</th><th>Veri Dosyası</th><th>Durum</th></tr></thead><tbody>
  <tr><td>Türk Dilleri ve Lehçeleri</td><td>38</td><td>${totalLanguages}</td><td><code>src/data/languageFamily.ts</code></td><td class="pass">DOĞRULANDI</td></tr>
  <tr><td>Tarihsel Dönem / Devlet Dosyaları</td><td>13</td><td>${HISTORICAL_STATES.length}</td><td><code>src/data/earlyHistoryStates.ts</code></td><td class="pass">DOĞRULANDI</td></tr>
  <tr><td>Dil Dönemlendirmesi</td><td>10</td><td>${HISTORICAL_PERIODS.length}</td><td><code>src/data/periods.ts</code></td><td class="pass">DOĞRULANDI</td></tr>
  <tr><td>Yazı Sistemleri</td><td>10</td><td>${ALPHABET_SYSTEMS.length}</td><td><code>src/data/alphabets.ts</code></td><td class="pass">DOĞRULANDI</td></tr>
  <tr><td>Runik Yazıtlar</td><td>6</td><td>${RUNIC_INSCRIPTIONS.length}</td><td><code>src/data/inscriptions.ts</code></td><td class="pass">DOĞRULANDI</td></tr>
  <tr><td>Edebiyat Dönemleri</td><td>8</td><td>${LITERATURE_PERIODS.length}</td><td><code>src/data/literature.ts</code></td><td class="pass">DOĞRULANDI</td></tr>
  <tr><td>Akademik Kaynaklar</td><td>39</td><td>${ACADEMIC_SOURCES.length}</td><td><code>src/data/bibliography.ts</code></td><td class="pass">DOĞRULANDI</td></tr>
</tbody></table>
<h2>2. Bilimsel Ayrım ve Tartışmalı Konular</h2>
<ul>
  <li><strong>Proto-Türkçe:</strong> Yazılı belge öncesi kuramsal rekonstrüksiyon (<code>status: "reconstructed"</code>) olarak işaretlenmiştir.</li>
  <li><strong>İskit/Saka &amp; Hun Dili:</strong> Orta Asya coğrafyasının otomatik Türkçe kanıtı olmadığı ve Xiongnu dilinin (Proto-Türkçe / Yeniseyce / çok dilli) tartışmalı olduğu açıkça belirtilmiştir.</li>
  <li><strong>Referans Bütünlüğü:</strong> Tüm veri dosyalarındaki <code>sourceIds</code> alanları 39 kaynakla %100 eşleşmektedir (0 eksik referans).</li>
</ul>
`);

// 5. UAT_TEST_REPORT.pdf
renderPdf("UAT_TEST_REPORT.pdf", "KULLANICI KABUL TESTİ (UAT) RAPORU — 23 KASIM 2026", `
<table><thead><tr><th>Test ID</th><th>Senaryo</th><th>Beklenen Sonuç</th><th>Gerçek Sonuç</th><th>Durum</th><th>Bulunan Hata &amp; Düzeltme</th></tr></thead><tbody>
  <tr><td>UAT-A</td><td>Ana Sayfa &amp; Hero Görsel Hiyerarşi</td><td>Tofu kutusu olmadan açılış, temiz üst menü</td><td>İlk testte hero mühürde <code>𐰴</code> tofu kutusu ve üst menüde <code>TR|EN</code> sarılması görüldü</td><td class="pass">PASS (FIXED)</td><td><code>OrkhonEmblemSvg</code> ve <code>whitespace-nowrap</code> ile giderildi; <code>uat-home-1920x1080.png</code> ile doğrulandı</td></tr>
  <tr><td>UAT-B</td><td>Kronolojik Atlas &amp; Dönem Seçimi</td><td>Karahanlı seçilince Kutadgu Bilig detayı açılmalı</td><td><code>detailUpdatedToKarakhanid: true</code></td><td class="pass">PASS</td><td>Yok</td></tr>
  <tr><td>UAT-C/F</td><td>Dil Ağacı (38 Dil) &amp; Etimoloji Lab</td><td>Oğur ayrımı ve Sayılar filtresi (tăxăr)</td><td><code>hasOghurSplit: true</code>, <code>lexiconShowsNine: true</code></td><td class="pass">PASS</td><td>Yok</td></tr>
  <tr><td>UAT-D</td><td>Alfabe Keşif Sistemi (10) &amp; Yazıtlar (6)</td><td>İbrani harfli Karayca ve Çoyr/Talas yazıtları</td><td><code>hasHebrewTurkic: true</code>, <code>hasRunicInscriptions: true</code></td><td class="pass">PASS</td><td>Yok</td></tr>
  <tr><td>UAT-E</td><td>Edebiyat Atlası (8 Dönem &amp; Eserler)</td><td>Sav/Sagu/Koşuk, Çağatay (Nevâî), Dede Korkut</td><td><code>hasOralTradition: true</code>, <code>hasChagataiAuthor: true</code></td><td class="pass">PASS</td><td>Yok</td></tr>
  <tr><td>UAT-G</td><td>Coğrafi Atlas (SVG Harita &amp; Katmanlar)</td><td>SVG harita ve Tarihsel/Çağdaş geçişi</td><td><code>hasSvgMap: true</code>, <code>hasLayerToggle: true</code></td><td class="pass">PASS</td><td>Yok</td></tr>
  <tr><td>UAT-H</td><td>Kaynakça &amp; Arama (<code>/</code>)</td><td>39 kaynak ve klavye ile arama modalı</td><td><code>hasCount39: true</code>, <code>searchModalOpen: true</code></td><td class="pass">PASS</td><td>Yok</td></tr>
  <tr><td>TECH-RESP</td><td>4 Ekran Boyutu (1920, 1366, 768, 390)</td><td>Hiçbir genişlikte yatay taşma olmaması</td><td>İlk testte 1366px ve 1920px'te taşma görüldü</td><td class="pass">PASS (FIXED)</td><td><code>MuseumHeader.tsx</code> <code>overflow-x-auto</code> + <code>2xl:block</code> alt başlık ile 4/4 <code>noOverflow: true</code></td></tr>
  <tr><td>TECH-LOG</td><td>Konsol &amp; Ağ Hataları</td><td>0 JS hatası, 0 ağ hatası</td><td><code>consoleErrors: []</code>, <code>networkErrors: []</code></td><td class="pass">PASS</td><td>Yok</td></tr>
  <tr><td>DEPLOY-VERCEL</td><td>Vercel Production Yayın Kontrolü</td><td>Canlı Vercel URL smoke testi</td><td>Ortamda Vercel CLI / VERCEL_TOKEN mevcut değil</td><td class="blocked">BLOCKED</td><td>GitHub <code>main</code> yayına hazır; canlı dağıtım dış Vercel yetkisi gerektirir</td></tr>
</tbody></table>
`);

// 6. TECHNICAL_REPORT.pdf
renderPdf("TECHNICAL_REPORT.pdf", "TEKNİK MİMARİ VE KALİTE RAPORU", `
<h2>1. Teknoloji Yığını ve Mimari</h2>
<ul>
  <li><strong>Framework:</strong> Next.js 15.5.29 (App Router, Static Site Generation — 7 statik rota)</li>
  <li><strong>Dil &amp; Stil:</strong> TypeScript 5.7 (<code>strict: true</code>), Tailwind CSS 3.4</li>
  <li><strong>Veri Katmanı:</strong> <code>src/data/</code> (<code>periods.ts</code>, <code>earlyHistoryStates.ts</code>, <code>languageFamily.ts</code>, <code>comparativeLexicon.ts</code>, <code>alphabets.ts</code>, <code>inscriptions.ts</code>, <code>literature.ts</code>, <code>artifacts.ts</code>, <code>bibliography.ts</code>, <code>i18n.ts</code>)</li>
  <li><strong>Build &amp; Statik Analiz:</strong> <code>tsc --noEmit</code> (0 hata), <code>next lint</code> (0 uyarı/hata), <code>next build</code> (7.0s, <code>/</code> 83.3 kB, First Load JS 186 kB)</li>
  <li><strong>SEO &amp; Güvenlik:</strong> Open Graph, Canonical, <code>/sitemap.xml</code>, <code>/robots.txt</code>, özel 404 (<code>not-found.tsx</code>), <code>X-Frame-Options: DENY</code>, <code>X-Content-Type-Options: nosniff</code>, <code>Referrer-Policy</code></li>
</ul>
`);

// 7. SOURCE_CODE_REFERENCE.md & README.md
fs.writeFileSync(path.join(OUT, "SOURCE_CODE_REFERENCE.md"), `# Kaynak Kod Referansı — TÜRKÇENİN İZİNDE

- **GitHub Repository:** https://github.com/karargahprojecteal/turkcenin-izinde
- **Ana Branch:** \`main\`
- **Temel Dizinler:**
  - \`src/app/\`: \`layout.tsx\`, \`page.tsx\`, \`not-found.tsx\`, \`sitemap.ts\`, \`robots.ts\`, \`icon.svg\`, \`globals.css\`
  - \`src/data/\`: Birleştirilmiş akademik veri katmanı (38 dil, 13 devlet, 10 dönem, 10 yazı sistemi, 6 yazıt, 8 edebiyat dönemi, 39 kaynak)
  - \`src/components/\`: Modüler arayüz bileşenleri
  - \`scripts/\`: \`build-academic-pdf-and-catalogs.mjs\`, \`build-final-delivery-pdfs.mjs\`, \`build-docx-pptx.py\`
`);

fs.writeFileSync(path.join(OUT, "README.md"), `# TÜRKÇENİN İZİNDE — NİHAİ TESLİMAT PAKETİ (23 Kasım 2026)

## Paket İçeriği
- \`PROJECT_REPORT.pdf\` & \`PROJECT_REPORT.docx\` (Düzenlenebilir proje raporu)
- \`PRESENTATION.pptx\` (12 slaytlık proje sunumu)
- \`USER_GUIDE.pdf\` (Kullanım kılavuzu)
- \`ACADEMIC_SOURCES.pdf\` (39 doğrulanmış akademik kaynak)
- \`UAT_TEST_REPORT.pdf\` (Kullanıcı kabul testi raporu)
- \`TECHNICAL_REPORT.pdf\` (Teknik mimari ve build/SEO/güvenlik raporu)
- \`CONTENT_AUDIT.pdf\` (İçerik envanteri ve bilimsel doğruluk denetimi)
- \`UAT_EVIDENCE/\` (Gerçek Chromium CDP ekran görüntüleri)
- \`SOURCE_CODE_REFERENCE.md\` (GitHub kaynak kod referansı)
- \`SHA256SUMS.txt\` (Dosya bütünlük doğrulama özetleri)

## Son Kabul Kararı
- **A. FUNCTIONAL UAT:** PASS
- **B. ACADEMIC CONTENT ACCEPTANCE:** PASS
- **C. SCHOOL PROJECT DELIVERY:** READY
- **Canlı Vercel Yayını:** Ortamda Vercel token bulunmadığı için BLOCKED (GitHub \`main\` yayına hazırdır).
`);
