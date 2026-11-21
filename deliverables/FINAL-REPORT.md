# FINAL REPORT — TÜRKÇENİN İZİNDE (TRACING TURKIC)

**Tarih:** 2026-11-21  
**Ana Branch:** `main` (`d0a08389220cb088cf970017386085a63c5cbd51`)  
**Üretim Konsepti:** `concept/05-hybrid` (kontrollü `--no-ff` merge + SVG glif iyileştirmesi)

---

## 1. Araştırmanın Kapsamı
`research/` klasöründe 8 akademik belge üretilmiştir:
- `research-overview.md`: Dil, lehçe, yazı sistemi ve alfabe ayrımları; kuramsal rekonstrüksiyon vs. yazılı belgeli dönem ayrımı.
- `historical-periods.md`: Proto-Türkçeden (kuramsal) Göktürk, Eski Uygur, Karahanlı, Harezm, Kıpçak, Çağatay, Eski Anadolu, Osmanlı ve Türkiye Türkçesine 10 dönem.
- `turkic-language-family.md`: Oğur (*r/l*) – Genel Türkçe (*z/š*) ayrımı ve 6 ana dal (Oğur, Oğuz, Kıpçak, Karluk, Sibirya, Arğu/Halaçça).
- `alphabet-history.md` & `writing-systems.md`: Göktürk runiform, Eski Uygur (Soğd-kursiv), Arap temelli (Karahanlı–Osmanlı–Yeni Uygur), Kiril, Latin (1928 & Yañalif), Brahmi, Maniheist ve Süryani yazı sistemleri.
- `historical-artifacts.md`: Kül Tigin, Tonyukuk, Irk Bitig, Säkiz Yükmäk Yaruk, Dîvânu Lugâti't-Türk, Kutadgu Bilig, Codex Cumanicus, Muhâkemetü'l-Lugateyn ve 1928 Harf Devrimi belgeleri.
- `bibliography.md` & `fact-check-register.md`: 15 doğrulanmış birincil/ikincil akademik kaynak.

## 2. Kaynak Sayısı ve Türleri
Toplam **15 doğrulanmış akademik kaynak** (`src/data/bibliography.ts`):
- Akademik kitaplar: 2 (Routledge *The Turkic Languages* 2022, Brill *A Grammar of Old Turkic* 2004)
- Akademik ansiklopediler: 4 (Brill ETLO x2, TDV İslâm Ansiklopedisi x2)
- UNESCO kayıtları: 3 (Orhon Vadisi WHC 1081, *Dîvânu Lugâti't-Türk* Memory of the World, *Kutadgu Bilig* 950. yıl)
- Hakemli dergi makaleleri: 4 (Tekin TDK/TDA, Raschmann *Acta Orientalia* DOI `10.1556/062.2024.00415`, Yılmaz *IJMES* Cambridge, Robbeets *PMC10432883*)
- Kurumsal dijital arşivler: 2 (BBAW Turfanforschung, Koç Üniv. VEKAM)

## 3. Beş Konseptin Karşılaştırması ve Seçilen Konsept
| Konsept Branch | Yaklaşım | Puan (/100) | Durum |
| :--- | :--- | :---: | :--- |
| `concept/01-chronos` | Kronolojik zaman şeridi | 88 | Arşivlendi |
| `concept/02-turkic-atlas` | Coğrafi SVG Avrasya atlası | 86 | Arşivlendi |
| `concept/03-script-museum` | Dijital epigrafi & yazı müzesi | 87 | Arşivlendi |
| `concept/04-language-tree` | Dilbilimsel kladogram & ses yasaları | 88 | Arşivlendi |
| `concept/05-hybrid` | Birleşik kapsamlı müze & atlas | **96** | **Kazanan → `main`** |

## 4. Uygulanan Özellikler (Üretim Sürümü)
1. İnteraktif yatay tarih çizelgesi ve dönem detay panelleri (`TimelineSection.tsx`)
2. Etkileşimli SVG Türk dilleri sınıflandırma ağacı ve ses denkliği matrisi (`LanguageTreeSection.tsx`)
3. Alfabe ve yazı sistemi laboratuvarı + okuma yönü görselleştiricisi (`ScriptLabSection.tsx`, `OrkhonVectorGlyphs.tsx`)
4. Tarihsel eser galerisi ve detay modalı (`ArtifactGallerySection.tsx`)
5. İnteraktif SVG Avrasya coğrafi atlası (`GeographicAtlasSection.tsx`)
6. Küresel arama (`/` ve `Cmd/Ctrl+K`) ve filtreleme (`GlobalSearchModal.tsx`)
7. Doğrulanmış kaynakça merkezi (`BibliographySection.tsx`)
8. Mobil navigasyon çekmecesi (`MuseumHeader.tsx`)
9. Birincil Türkçe içerik ve tam TR/EN çift dilli altyapı (`src/data/i18n.ts`)

## 5. Test Sonuçları Özeti
- `tsc --noEmit`: PASS (0 hata)
- `next lint`: PASS (0 uyarı/hata)
- `next build`: PASS (`/` 44.9 kB, First Load JS 148 kB)
- Canlı `next start` HTTP 200 doğrulaması ve Headless Chromium masaüstü (`1440×900`) / mobil (`390×844`) görsel kontrolü: PASS (Tofu kutusu sorunu `OrkhonVectorGlyphs.tsx` ile giderildi).
- Ayrıntılar: `deliverables/TEST-REPORT.md`.

## 6. Git Branch Bilgileri ve Commit Hash'leri
- `main`: `d0a08389220cb088cf970017386085a63c5cbd51` (Üretim sürümü — bu raporların commit'i ile güncellenecektir)
- `concept/01-chronos`: `c103f7465fa563b46f456a1624f6788eb03ff41c`
- `concept/02-turkic-atlas`: `005dafe27bca70acda9516aacb1a924c139cddc9`
- `concept/03-script-museum`: `78b6e2a9d5095d0aa490b10f0d2febf876717e70`
- `concept/04-language-tree`: `c7e116da823aad5ee28db13eee210295d67a4c54`
- `concept/05-hybrid`: `21be4a86805895c83882dee81ca8e80c8f33e257`

## 7. Vercel Deployment Durumu ve Bilinen Eksiklikler
- **Vercel Deployment:** Çalışma ortamında Vercel CLI (`vercel`) ve `VERCEL_TOKEN` bulunmadığı için canlı Vercel Preview/Production URL'si **üretilememiştir** (ayrıntılar `DEPLOYMENT-REPORT.md`).
- **Bilinen Eksiklikler:**
  1. `ScriptLabSection.tsx` içindeki bazı Eski Uygur (`U+10F70`) Unicode glifleri, işletim sisteminde Unicode 14.0 Eski Uygur fontu bulunmayan cihazlarda fallback gösterebilir; bu durum arayüzde açıkça belirtilmiştir ve akademik çevriyazı eşlik etmektedir.
  2. Kaynakça URL kontrolünde `unesco.org/fr/memory-world/diwan-lughat-al-turk-compendium` bağlantısı HTTP 404 döndürmüştür (UNESCO site yeniden yapılandırması); `whc.unesco.org` (403 bot koruması) ve `unesco.org.tr` (503 geçici) dışındaki 12 akademik URL HTTP 200 döndürmüştür.
