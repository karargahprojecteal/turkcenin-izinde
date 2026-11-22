import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://turkcenin-izinde.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-11-22"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
