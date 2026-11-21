# TEST REPORT — TÜRKÇENİN İZİNDE

**Test Tarihi:** 2026-11-21  
**Test Edilen Branch:** `main` (güncel doğrulama sonrası commit ile senkronize)

---

## 1. Derleme, Tip, Lint ve Güvenlik Kontrolleri

| Kontrol | Komut | Sonuç | Kanıt |
| :--- | :--- | :---: | :--- |
| TypeScript | `npm run typecheck` (`tsc --noEmit`) | **PASS** | 0 hata |
| ESLint | `npm run lint` (`next lint`) | **PASS** | `✔ No ESLint warnings or errors` |
| Production Build | `npm run build` (`next build`) | **PASS** | 3.5s derleme; 5/5 statik sayfa (`/`, `/_not-found`, `/icon.svg`), `/` 44.9 kB |
| Bağımlılık Güvenlik Denetimi | `npm audit --omit=dev` | **WARN (Kritik açık yok)** | 2 geçişli bulgu (`next@15.5.29` → `postcss <=8.5.22`, derleme zamanı CSS aracı; çalışma zamanı kullanıcı girdisi yok) |

## 2. Otomatik Tarayıcı E2E, Konsol ve Responsive QA (Chromium CDP)

Canlı üretim sunucusu (`npx next start -p 3107`) üzerinde Headless Chromium CDP (`/tmp/e2e-qa.mjs`) ile çalıştırılmıştır:
- **Masaüstü (`1440×900`) Yatay Taşma Kontrolü:** `desktopNoOverflow: true` (**PASS**)
- **Mobil (`390×844`) Yatay Taşma Kontrolü:** `mobileNoOverflow: true` (**PASS**)
- **Sekme Navigasyon Testi:** `Tarih Çizelgesi`, `Dil Ağacı`, `Alfabe Laboratuvarı`, `Coğrafi Atlas`, `Eser Galerisi`, `Kaynakça` → tamamı `clicked: true, hasContent: true` (**PASS**)
- **Küresel Arama Modalı:** `searchOpened: true, searchModalVisible: true` (**PASS**)
- **TR/EN Dil Değiştirici:** `enToggleWorked: true` (`TRACING TURKIC` doğrulandı) (**PASS**)
- **404 Rota Kontrolü:** `/non-existent-route-check` → `404` (**PASS**)
- **Konsol ve Ağ Hataları:** `consoleErrors: []`, `networkErrors: []` (`src/app/icon.svg` eklendikten sonra 0 ağ hatası) (**PASS**)

## 3. Kaynakça URL Kontrolü (`curl -sIL --max-time 6`)
15 harici URL test edildi:
- **14 / 15 URL → HTTP 200 (PASS):** `unesco.org/en/memory-world/diwan-lughat-al-turk-compendium-turkic-dialects` (düzeltildi), `islamansiklopedisi.org.tr/kutadgu-bilig` (güncellendi), Routledge, Brill (x3), TDK Belleten, MTA/Real, BBAW, TDV İslâm Ansiklopedisi (x2), Cambridge IJMES, Koç VEKAM, PubMed Central.
- **1 / 15 URL → HTTP 403:** `https://whc.unesco.org/en/list/1081/` (UNESCO WHC bot/curl koruması; kaynak Phase 2 arama indeksiyle doğrulanmıştır).
