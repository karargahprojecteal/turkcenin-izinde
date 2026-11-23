import os
from docx import Document
from docx.shared import Pt, Inches, RGBColor
from pptx import Presentation
from pptx.util import Inches as PptInches, Pt as PptPt
from pptx.dml.color import RGBColor as PptRGB

OUT_DIR = "/home/antigravity/turkcenin-izinde/TURKCE_NIN_IZINDE_FINAL_DELIVERY"
os.makedirs(OUT_DIR, exist_ok=True)

# 1. Generate Editable PROJECT_REPORT.docx
doc = Document()
style = doc.styles["Normal"]
style.font.name = "Calibri"
style.font.size = Pt(11)

title = doc.add_heading("TÜRKÇENİN İZİNDE — PROJE RAPORU", level=0)
doc.add_paragraph("İnteraktif Dijital Türk Dili, Tarihi, Alfabeleri ve Edebiyatı Atlası")
doc.add_paragraph("Tarih: 23 Kasım 2026 | Depo: https://github.com/karargahprojecteal/turkcenin-izinde")
doc.add_paragraph("Not: Bu belge düzenlenebilir teslimat sürümüdür. Kurum/öğretmen/imza alanları boş bırakılmıştır.")

sections = [
    ("1. Projenin Amacı ve Önemi",
     "Türkçenin İzinde, Türk dillerinin tarih öncesi rekonstrüksiyon dönemlerinden çağdaş 38 dil ve lehçeye, "
     "MÖ 209 Mete Han ve Büyük Hun döneminden Orhon–Yenisey yazıtlarına, 10 farklı yazı sisteminden sözlü ve yazılı "
     "edebiyat tarihine uzanan birikimi tek bir akademik ve etkileşimli dijital atlasta birleştirmeyi amaçlar."),
    ("2. Problem Tanımı",
     "Türk dili ve tarihi hakkındaki dijital içerikler çoğunlukla statik listelerden oluşmakta; dil, lehçe, yazı sistemi "
     "ve alfabe kavramları birbirine karıştırılmakta, Proto-Türkçe gibi kuramsal dönemler ile yazılı belgeli dönemler "
     "aynı kesinlikte sunulmaktadır."),
    ("3. Araştırma Yöntemi ve Bilimsel Doğruluk",
     "Projede karşılaştırmalı tarihsel dilbilim ve birincil kaynak doğrulaması esas alınmıştır. Tüm iddialar 5'li kanıt "
     "sınıflandırmasına (Birincil Kaynak, Çoklu Akademik, Güçlü Görüş, Tartışmalı, Hipotez) ayrılmıştır. "
     "39 akademik kaynak (Johanson & Csató, Clauson, Erdal, Golden, Tekin, Taşağıl, Sertkaya, Vovin, Schmitt, UNESCO, BBAW, TDV) doğrulanmıştır."),
    ("4. Tarihsel Gelişim Çizelgesi ve Türk Devletleri",
     "13 devlet/dönem dosyası (Hun öncesi bozkır & İskit/Saka tartışmaları, MÖ 209 Mete Han ve Büyük Hunlar, Avrupa Hunları, "
     "Tabgaç/Avarlar, 1. ve 2. Göktürk Kağanlığı, Uygur Kağanlığı, Kırgız Kağanlığı, Karahanlılar, Gazneliler & Büyük Selçuklular, "
     "Harezmşahlar & Altın Orda, Çağatay & Timur dönemi, Osmanlı & Safevî çevresi) ve 10 dil dönemi yapılandırılmıştır."),
    ("5. Türk Dilleri Sınıflandırması (38 Dil)",
     "Türk dil ailesi Oğur (Çuvaşça, İdil Bulgarcası) ve Genel Türkçe (Oğuz: 8, Kıpçak: 13, Karluk: 4, Sibirya: 10, Arğu/Halaçça: 1) "
     "olmak üzere 6 ana dalda toplam 38 dille belgelenmiştir."),
    ("6. Alfabe ve Yazı Sistemleri Kataloğu (10 Sistem) & Runik Yazıtlar (6 Anıt)",
     "Göktürk, Yenisey, Eski Uygur, Arap, 1928 Latin/Yañalif, Kiril, İbrani (Karayca/Kırımçakça), Brahmi/Mani/Süryani "
     "sistemleri ile Soğd ve Tibet etkileşim yazıları ayrıştırılmıştır. Çoyr, Tonyukuk, Kül Tigin, Bilge Kağan, Yenisey ve Talas yazıtları arşivlenmiştir."),
    ("7. Edebiyat Dönemleri Kataloğu (8 Dönem)",
     "Sözlü gelenek (ozan/baksı/kam, sav, sagu, koşuk) ile İslamiyet Öncesinden Çağdaş Türk Dünyasına 8 edebiyat dönemi ve temel eserler incelenmiştir."),
    ("8. Teknik Mimari",
     "Next.js 15 (App Router), TypeScript 5.7 (strict), Tailwind CSS 3.4, özel SVG görselleştirmeler (kladogram, Avrasya haritası, Orhon vektör glifleri) "
     "ve bileşenlerden ayrıştırılmış ortak src/data/ katmanı kullanılmıştır."),
    ("9. Kullanıcı Kabul Testi (UAT) Özeti",
     "TypeScript, ESLint, Production Build (7/7 statik sayfa), 4 ekran boyutu (1920x1080, 1366x768, 768x1024, 390x844), "
     "8 modül etkileşimi, SEO (/robots.txt, /sitemap.xml) ve güvenlik başlıkları Chromium CDP ile sıfır konsol/ağ hatasıyla doğrulanmıştır."),
    ("10. Sonuç ve Değerlendirme",
     "Akademik içerik ve teknik uygulama eksiksiz olarak GitHub main branch'ine teslim edilmiştir. Canlı Vercel dağıtımı ortamda "
     "Vercel CLI/token bulunmadığı için dış yetki beklemektedir."),
]

for heading, body in sections:
    doc.add_heading(heading, level=1)
    doc.add_paragraph(body)

doc.save(os.path.join(OUT_DIR, "PROJECT_REPORT.docx"))
print("Generated PROJECT_REPORT.docx")

# 2. Generate PRESENTATION.pptx (12 Slides)
prs = Presentation()
prs.slide_width = PptInches(13.333)
prs.slide_height = PptInches(7.5)

SLIDES = [
    ("TÜRKÇENİN İZİNDE", "İnteraktif Dijital Türk Dili, Tarihi, Alfabeleri ve Edebiyatı Atlası\n23 Kasım 2026"),
    ("1. Projenin Amacı ve Problem Tanımı",
     "• Statik listeler yerine akademik kaynaklı, etkileşimli bir dijital tarih atlası.\n"
     "• Dil ≠ Lehçe ≠ Yazı Sistemi ≠ Alfabe bilimsel ayrımı.\n"
     "• Kuramsal rekonstrüksiyon (Proto-Türkçe) ile yazılı belgeli dönemlerin ayrıştırılması."),
    ("2. Araştırma Kapsamı ve Kanıt Standardı",
     "• 39 Doğrulanmış Akademik Kaynak (Johanson, Clauson, Erdal, Golden, Tekin, Taşağıl, UNESCO, BBAW, TDV).\n"
     "• 5'li Kanıt Sınıfı: Birincil Kaynak, Çoklu Akademik, Güçlü Görüş, Tartışmalı, Hipotez.\n"
     "• İskit/Saka (Doğu İrani) ve Xiongnu/Hun dili tartışmalarında nesnel yaklaşım."),
    ("3. Erken Tarih: Mete Han (MÖ 209) ve Devletler",
     "• MÖ 209: Teoman sonrası Mete Han (Modu Chanyu) ile merkezi bozkır imparatorluğu (Shiji).\n"
     "• İkili kanat yönetimi ve onlu askerî teşkilatın sonraki kağanlıklara etkisi.\n"
     "• Hunlar → Tabgaç/Avar → 1./2. Göktürk → Uygur → Karahanlı → Selçuklu → Osmanlı/Çağatay (13 dosya)."),
    ("4. Türk Dilleri Sınıflandırması (38 Dil)",
     "• Ana Ayrım: Oğur (r/l: Çuvaşça, İdil Bulgarcası) vs. Genel Türkçe (z/š).\n"
     "• 6 Ana Dal: Oğur (2), Oğuz (8), Kıpçak (13), Karluk (4), Sibirya (10), Arğu/Halaçça (1).\n"
     "• Her dil için ülkeler, konuşur sayısı + veri yılı, yazı sistemi ve örnek kelimeler."),
    ("5. Karşılaştırmalı Sözlük ve Ses Yasaları",
     "• Düzenli ses denklikleri (Clauson 1972; Tekin 1991).\n"
     "• Örnek: Proto *hadaq → Halaçça hadaq, Eski Türkçe adaq, Türkçe ayak, Sahaca atax, Çuvaşça ura.\n"
     "• Sayılar, akrabalık, doğa, günlük yaşam, fiiller ve zamirler."),
    ("6. Yazı Sistemleri (10) ve Runik Yazıtlar (6)",
     "• Göktürk, Yenisey, Eski Uygur, Arap, 1928 Latin/Yañalif, Kiril, İbrani, Brahmi/Mani/Süryani.\n"
     "• Soğd ve Tibet yazılarının köken/etkileşim yazısı olarak ayrılması.\n"
     "• Çoyr (682–691), Tonyukuk (~720), Kül Tigin (732), Bilge Kağan (735), Yenisey, Talas."),
    ("7. Türk Edebiyatı Tarihi (8 Dönem)",
     "• Sözlü Kültür: Ozan/Baksı/Kam, Sav, Sagu, Koşuk, Destanlar (mit vs. tarih ayrımı).\n"
     "• İslamiyet Öncesi → Eski Uygur → Karahanlı → Harezm/Kıpçak → Çağatay → Divan/Halk → Tanzimat → Cumhuriyet & Çağdaş Türk Dünyası."),
    ("8. Teknik Mimari",
     "• Next.js 15 App Router + TypeScript 5.7 (strict) + Tailwind CSS 3.4.\n"
     "• Özel SVG Kladogram, SVG Avrasya Haritası ve SVG Orhon Vektör Glifleri.\n"
     "• Ortak src/data/ veri katmanı → Hem web sitesi hem akademik PDF aynı kaynaktan üretilir."),
    ("9. UAT ve Kalite Güvencesi Sonuçları",
     "• TypeScript, ESLint, Production Build (7/7 statik sayfa): PASS.\n"
     "• 4 Ekran Boyutu (1920x1080, 1366x768, 768x1024, 390x844): Taşma Yok (PASS).\n"
     "• 8 Etkileşimli Modül, SEO (/robots.txt, /sitemap.xml) ve Güvenlik Başlıkları: PASS."),
    ("10. Tespit Edilen ve Giderilen Hatalar",
     "• Hero bölümündeki ham Unicode tofu kutusu → OrkhonEmblemSvg ile giderildi.\n"
     "• Üst menüde 1366px/1920px taşması ve TR|EN kırılması → whitespace-nowrap + overflow-x-auto ile giderildi.\n"
     "• 3 DOI sonundaki nokta ve eksik SEO/404 sayfaları düzeltildi."),
    ("11. Sonuç ve Teslimat Durumu",
     "• FUNCTIONAL UAT: PASS | ACADEMIC CONTENT: PASS | SCHOOL DELIVERY: READY.\n"
     "• GitHub (main): https://github.com/karargahprojecteal/turkcenin-izinde\n"
     "• Vercel Canlı Yayın: Ortamda Vercel token bulunmadığından dış yetki beklemektedir."),
]

for idx, (heading, content) in enumerate(SLIDES):
    layout = prs.slide_layouts[0 if idx == 0 else 1]
    slide = prs.slides.add_slide(layout)
    slide.shapes.title.text = heading
    slide.placeholders[1].text = content

prs.save(os.path.join(OUT_DIR, "PRESENTATION.pptx"))
print("Generated PRESENTATION.pptx")
