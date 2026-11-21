# DEPLOYMENT REPORT — TÜRKÇENİN İZİNDE

**Tarih:** 2026-11-21

---

## 1. Git Deposu ve Branch Durumu
- **Yerel Repo Yolu:** `/home/antigravity/turkcenin-izinde`
- **Ana Branch:** `main`
- **Konsept Branch'leri:**
  - `concept/01-chronos` (`c103f74`)
  - `concept/02-turkic-atlas` (`005dafe`)
  - `concept/03-script-museum` (`78b6e2a`)
  - `concept/04-language-tree` (`c7e116d`)
  - `concept/05-hybrid` (`21be4a8`)

## 2. Vercel Deployment Durumu
- **Durum:** **BLOKE / GERÇEKLEŞTİRİLEMEDİ (Araç ve Yetkilendirme Eksikliği)**
- **Teknik Neden:** Çalışma sanal makinesinde (`antigravity` Linux sandbox) `vercel` CLI kurulu değildir ve ortam değişkenlerinde `VERCEL_TOKEN` veya bağlı bir Vercel projesi bulunmamaktadır.
- **Dürüstlük İlkesi Gereği:** Sahte Vercel Preview veya Production URL'si üretilmemiştir.
- **Yerel Doğrulama:** Üretim derlemesi (`npm run build`) ve üretim sunucusu (`npx next start -p 3106`) yerel ortamda `HTTP 200` ile doğrulanmıştır.

## 3. Kullanıcı Ortamında Vercel'e Yayınlama Adımları
1. Projeyi GitHub hesabınıza (`git remote add origin ...` ve `git push -u origin --all`) gönderin.
2. Vercel Dashboard üzerinden `turkcenin-izinde` reposunu içe aktarın (Framework Preset: **Next.js**).
3. `concept/01`–`05` branch'leri otomatik olarak Preview Deployment; `main` branch'i ise Production Deployment olarak yayınlanacaktır.
