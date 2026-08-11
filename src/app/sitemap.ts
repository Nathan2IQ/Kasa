import { MetadataRoute } from "next";
import { getProperties } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://kasa.fr"; // À remplacer par votre domaine

  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cgu`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politique-confidentialite`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // Pages dynamiques (propriétés)
  try {
    const properties = await getProperties();
    const propertyPages: MetadataRoute.Sitemap = properties.map((property) => ({
      url: `${baseUrl}/properties/${property.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    }));

    return [...staticPages, ...propertyPages];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return staticPages;
  }
}
