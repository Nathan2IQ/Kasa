const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./data/kasa.sqlite3");

// Récupérer la dernière propriété créée
db.get(
  `
  SELECT id, title, cover 
  FROM properties 
  ORDER BY rowid DESC 
  LIMIT 1
`,
  (err, property) => {
    if (err) {
      console.error("Erreur:", err);
      db.close();
      return;
    }

    console.log("\n=== DERNIÈRE PROPRIÉTÉ ===");
    console.log("ID:", property.id);
    console.log("Titre:", property.title);
    console.log("Cover:", property.cover);

    // Récupérer les images de cette propriété
    db.all(
      `
    SELECT url 
    FROM property_pictures 
    WHERE property_id = ?
  `,
      [property.id],
      (err, pictures) => {
        if (err) {
          console.error("Erreur:", err);
          db.close();
          return;
        }

        console.log("\n=== IMAGES DU LOGEMENT ===");
        console.log("Nombre d'images:", pictures.length);
        pictures.forEach((pic, index) => {
          console.log(`  ${index + 1}. ${pic.url}`);
        });

        db.close();
      },
    );
  },
);
