// Configuration pour FontAwesome avec Next.js
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

// Désactive l'ajout automatique de CSS par FontAwesome
// car Next.js gère déjà le CSS
config.autoAddCss = false;
