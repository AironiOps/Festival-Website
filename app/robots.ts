import type { MetadataRoute } from "next";
import { config } from "@/lib/config";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (!config.isProduction) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${config.siteUrl}/sitemap.xml` };
}
