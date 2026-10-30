import type { MetadataRoute } from "next";
import { config } from "@/lib/config";
import { basePath, localePath } from "@/lib/i18n";
import { ROUTES } from "@/lib/routes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => {
    const base = basePath(path);
    return {
      url: `${config.siteUrl}${path}`,
      alternates: { languages: { en: `${config.siteUrl}${base}`, ko: `${config.siteUrl}${localePath("ko", base)}` } },
    };
  });
}
