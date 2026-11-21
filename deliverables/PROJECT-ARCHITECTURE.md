# PROJECT ARCHITECTURE — TÜRKÇENİN İZİNDE

## 1. Teknoloji Yığını
- **Framework:** Next.js 15.5 (App Router, Static Site Generation)
- **Dil:** TypeScript 5.7 (`strict: true`)
- **Stil:** Tailwind CSS 3.4 + özel müze renk değişkenleri (`globals.css`)
- **Görselleştirme:** Özel SVG kladogram, SVG Avrasya haritası ve SVG Orhon epigrafi vektör glifleri
- **İkonlar:** `lucide-react`

## 2. Dizin Yapısı
```text
turkcenin-izinde/
├── research/                     # 8 akademik araştırma dosyası + concept-evaluation.md
├── deliverables/                 # 6 final teslimat raporu
└── src/
    ├── data/                     # Bileşenlerden ayrıştırılmış veri katmanı
    │   ├── periods.ts            # 10 tarihsel dönem (reconstructed vs attested)
    │   ├── languageFamily.ts     # Oğur vs Genel Türkçe, 6 ana dal, 17 dil
    │   ├── alphabets.ts          # 6 yazı geleneği ve glif örnekleri
    │   ├── artifacts.ts          # 9 birincil epigrafik/yazma eser
    │   ├── bibliography.ts       # 15 doğrulanmış akademik kaynak
    │   └── i18n.ts               # TR/EN arayüz metinleri
    ├── components/
    │   ├── MuseumHeader.tsx      # Masaüstü/mobil navigasyon, TR/EN, arama tetikleyicisi
    │   ├── OverviewSection.tsx   # Ana sayfa, 4 temel kavramsal ayrım, modül kartları
    │   ├── TimelineSection.tsx   # Yatay tarih çizelgesi ve dönem detay paneli
    │   ├── LanguageTreeSection.tsx # SVG Türk dilleri kladogramı ve ses yasası matrisi
    │   ├── ScriptLabSection.tsx  # Alfabe laboratuvarı ve okuma yönü görselleştiricisi
    │   ├── OrkhonVectorGlyphs.tsx # SVG Orhon runik vektör glifleri
    │   ├── GeographicAtlasSection.tsx # SVG Avrasya haritası (Tarihsel vs Modern)
    │   ├── ArtifactGallerySection.tsx # Eser galerisi ve erişilebilir detay modalı
    │   ├── GlobalSearchModal.tsx # `/` ve `Cmd/Ctrl+K` küresel arama
    │   └── BibliographySection.tsx # Filtrelenebilir akademik kaynakça merkezi
    └── app/
        ├── globals.css
        ├── layout.tsx
        └── page.tsx
```
