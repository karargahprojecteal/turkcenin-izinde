# Beş Konseptin Karşılaştırmalı Değerlendirmesi

**Değerlendirme Tarihi:** 2026-11-21  
**Değerlendirme Yöntemi:** Her konseptin kendi Git branch/worktree ortamında `tsc --noEmit` + `next build` derlemesi, `next start` ile canlı HTTP 200 doğrulaması ve Headless Chromium üzerinden masaüstü (`1440×900`) ile mobil (`390×844`) ekran görüntülerinin görsel incelemesi.

---

## 1. Puanlama Tablosu (100 Puan Üzerinden)

| Kriter | Ağırlık | 01 Chronos | 02 Turkic Atlas | 03 Script Museum | 04 Language Tree | 05 Hybrid |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Akademik Doğruluk** | 25 | 24 | 23 | 23 | 24 | **24** |
| **Görsel Tasarım** | 20 | 18 | 18 | 17 | 18 | **19** |
| **Kullanıcı Deneyimi** | 20 | 17 | 17 | 17 | 17 | **19** |
| **İçerik Derinliği** | 15 | 11 | 11 | 12 | 12 | **15** |
| **Teknik Kalite** | 10 | 9 | 9 | 9 | 9 | **10** |
| **Mobil Deneyim** | 10 | 9 | 8 | 9 | 8 | **9** |
| **TOPLAM** | **100** | **88** | **86** | **87** | **88** | **96** |

---

## 2. Konsept Bazlı İnceleme ve Gerekçeler

### Konsept 01 — `concept/01-chronos` (88/100)
- **Güçlü Yönler:** Sıcak parşömen (`#faf7f2`) ve mürekkep tipografisi çok okunaklı; *Kuramsal (Proto-Türkçe)* vs *Yazılı Belgeli* dönem ayrımı zaman şeridinde net; masaüstü yatay, mobil dikey çizelge uyumlu.
- **Zayıf Yönler:** Coğrafi harita ve tam Türk dilleri sınıflandırma ağacı (6 dal) birincil modül olarak yer almıyor.

### Konsept 02 — `concept/02-turkic-atlas` (86/100)
- **Güçlü Yönler:** Koyu kartografik tema üzerinde SVG Avrasya haritası, *Tarihsel Yayılım* ve *Çağdaş Türk Dilleri* katman ayrımı, 9 bölgesel merkezin koordinatlı incelenmesi güçlü.
- **Zayıf Yönler:** Eser galerisi ve ayrıntılı alfabe/yazı yönü laboratuvarı sınırlı; küçük ekranlarda harita etiketleri yoğunlaşabiliyor.

### Konsept 03 — `concept/03-script-museum` (87/100)
- **Güçlü Yönler:** Karanlık müze galerisi estetiği, 6 yazı geleneği, yazım yönü görselleştiricisi (RTL / LTR / Dikey) ve 9 tarihsel eser modalı çok etkileyici.
- **Zayıf Yönler:** Headless Chromium ekran görüntüsünde sistem fontu olmayan `U+10C00` (Göktürk) karakterleri tofu kutusu (`▯`) olarak göründü; harita ve dil ağacı modülleri ikincil.

### Konsept 04 — `concept/04-language-tree` (88/100)
- **Güçlü Yönler:** İsviçre dilbilim editoryali estetiği, 4 katmanlı etkileşimli SVG kladogram, *r/l* vs *z/š* ve *adaq/ayaq/adak/azax/hadaq* ses yasası karşılaştırıcısı akademik açıdan çok güçlü.
- **Zayıf Yönler:** Eser galerisi ve coğrafi harita modülleri yer almıyor.

### Konsept 05 — `concept/05-hybrid` (96/100 — KAZANAN)
- **Güçlü Yönler:**
  - Zorunlu 10 fonksiyonun tamamını (Tarih Çizelgesi, Dil Ağacı, Alfabe Laboratuvarı, Coğrafi Atlas, Eser Galerisi, Dönem Detayları, Küresel Arama (`/` & `Cmd+K`), Kaynakça Merkezi, TR/EN Dil Altyapısı, Mobil Çekmece) tek bir tutarlı **İmparatorluk Müzesi & Modern Akademik Atlas** tasarımında birleştiriyor.
  - Modüler bileşen mimarisi (`src/components/*`), `tsc --noEmit`, `next lint` ve `next build` sıfır hatayla geçti.
- **Tespit Edilen Eksiklik (Üretim Sürümünde Giderilecek):**
  - Masaüstü ve mobil ekran görüntülerinde marka logosundaki ve müze vitrinindeki Göktürk runik karakterleri (`𐱅𐰭𐰼𐰃`, `𐰀`), yerel sistemde `Noto Sans Old Turkic` fontu bulunmadığı için tofu kutusu (`▯`) olarak render edildi. Üretim sürümünde bu alanlara **özel SVG vektör glif çizimleri** ve `Noto Sans Old Turkic` webfont desteği eklenecektir.

---

## 3. Karar

**Kazanan Konsept:** `concept/05-hybrid`  
**Gerekçe:** Hem akademik kapsam derinliği hem de tüm etkileşimli görselleştirmeleri (SVG kladogram, SVG harita, yatay zaman çizelgesi, yazı yönü laboratuvarı, eser müzesi) tek bir erişilebilir mimaride sunması nedeniyle üretim sürümüne (`main`) taşınmak üzere seçilmiştir.
