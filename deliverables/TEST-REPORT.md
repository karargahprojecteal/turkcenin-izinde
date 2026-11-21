# TEST REPORT — TÜRKÇENİN İZİNDE

**Test Tarihi:** 2026-11-21  
**Test Edilen Branch:** `main` (`d0a08389220cb088cf970017386085a63c5cbd51`) + 5 konsept branch'i (`concept/01`–`05`)

---

## 1. Derleme, Tip ve Statik Analiz Testleri

| Kontrol | Komut | Sonuç | Not |
| :--- | :--- | :---: | :--- |
| TypeScript Kontrolü | `npm run typecheck` (`tsc --noEmit`) | **PASS** | 0 hata (tüm 5 konsept + `main`) |
| ESLint | `npm run lint` (`next lint`) | **PASS** | 0 uyarı, 0 hata (`main` ve `05-hybrid`) |
| Production Build | `npm run build` (`next build`) | **PASS** | 6.2s derleme; `/` 44.9 kB, 4/4 statik sayfa |
| Canlı HTTP Sunucu | `npx next start` | **PASS** | Tüm 5 konsept (port 3101–3105) ve `main` (3106) `HTTP 200` |

## 2. Görsel ve Responsive Testler (Headless Chromium)
- **Masaüstü (`1440×900`):** `01`–`05` ve `main` ekran görüntüleri alındı ve `view_file` ile incelendi. İlk incelemede `03` ve `05`'te görülen Göktürk runik tofu kutuları (`▯`), `main` sürümünde `OrkhonVectorGlyphs.tsx` SVG vektör bileşenleriyle giderildi ve yeniden ekran görüntüsüyle doğrulandı (**PASS**).
- **Mobil (`390×844`):** `main-mobile.png` incelendi; tek sütunlu hero, kompakt üst bar, hamburger menü tetikleyicisi ve taşmasız kart yerleşimi doğrulandı (**PASS**).

## 3. Kaynakça URL Kontrolü (`curl -sIL --max-time 6`)
15 harici URL test edildi:
- **12 / 15 URL → HTTP 200 (PASS):** Routledge, Brill (x3), TDK Belleten, MTA/Real (`062-article-p75.pdf`), BBAW, TDV İslâm Ansiklopedisi (x2), Cambridge IJMES, Koç VEKAM, PubMed Central.
- **3 / 15 URL → HTTP 200 dışı:**
  - `https://whc.unesco.org/en/list/1081/` → **403** (bot/curl koruması)
  - `https://www.unesco.org/fr/memory-world/diwan-lughat-al-turk-compendium` → **404** (UNESCO URL değişimi)
  - `https://www.unesco.org.tr/Home/AnnouncementDetail/369` → **503** (sunucu geçici yanıt vermedi)

## 4. Etkileşimli ve Erişilebilirlik Kontrolleri (Kod İncelemesi + Manuel Doğrulamaya Açık Alanlar)
- **Klavye Navigasyonu & Erişilebilirlik:** `TimelineSection.tsx` sol/sağ ok tuşları, `GlobalSearchModal.tsx` `/` ve `Cmd/Ctrl+K` kısayolları, `Escape` ile modal/çekmece kapatma, `aria-label` ve `role="img"` SVG öznitelikleri kaynak kodda uygulanmıştır.
- **Not:** Otomatik Playwright tıklama/klavye E2E senaryosu koşulmadığı için etkileşimli sekme geçişleri kod incelemesi ve statik derleme ile doğrulanmış olup, tarayıcı içi E2E etkileşim testi **NOT RUN** olarak kaydedilmiştir.
