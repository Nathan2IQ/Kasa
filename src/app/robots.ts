import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/messages/"],
    },
    sitemap: "https://kasa.fr/sitemap.xml", // À remplacer par votre domaine
  };
}
