import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kasa - Location d'appartements et maisons",
    short_name: "Kasa",
    description:
      "Trouvez votre logement idéal parmi des milliers d'appartements et maisons",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#FF6060",
    icons: [
      {
        src: "/logoKasa.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
