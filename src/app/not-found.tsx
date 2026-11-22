import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f8f6f1] px-4 text-center text-[#0f172a]">
      <div className="max-w-md rounded-2xl border border-[#e2dacb] bg-white p-8 shadow-sm">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#b45309]">
          404 · Sayfa Bulunamadı
        </span>
        <h1 className="mt-2 font-serif text-3xl font-bold text-[#0f172a]">
          Aradığınız Kayıt Bulunamadı
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#0f172a]/75">
          Bu bağlantı taşınmış veya mevcut olmayabilir. Türkçenin İzinde dijital
          akademik atlasının ana sayfasına dönebilirsiniz.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#0f172a] px-5 py-2.5 text-sm font-semibold text-[#f8f6f1] transition-colors hover:bg-[#0e7490]"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </main>
  );
}
