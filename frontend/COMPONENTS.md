# 📚 Documentation des Composants Frontend - Kasa

Documentation complète de tous les composants React de l'application Kasa.

---

## 🎯 Table des matières

- [Layout](#layout) - Header, Footer
- [Propriétés](#propriétés) - PropertyCard, PropertyList, EditPropertyButton
- [Galerie](#galerie) - ImageCarousel, PropertyGallery
- [Authentification](#authentification) - ProtectedRoute

---

## 📐 Layout

### `Header`

**Fichier** : `src/components/layout/Header.tsx`

**Description** : En-tête principal de l'application avec navigation responsive.

**État d'affichage selon authentification** :

- **Non connecté** : Liens "Accueil" et "À propos"
- **Utilisateur connecté** : + Icônes Favoris ❤️ et Messages 💬
- **Propriétaire/Admin** : + Bouton "➕ Ajouter un logement"
- **Mobile** : Menu hamburger 🍔

**Props** : Aucune (utilise `useAuth()`)

**Exemple** :

```tsx
import { Header } from "@/components/layout/Header";

<Header />;
```

**Hooks utilisés** :

- `useAuth()` - Récupère l'état d'authentification
- `useState()` - Gère l'ouverture/fermeture du menu mobile

---

### `Footer`

**Fichier** : `src/components/layout/Footer.tsx`

**Description** : Pied de page avec informations d'authentification et copyright.

**État d'affichage** :

- **Non connecté** :
  - Logo Kasa
  - Liens "Connexion | Inscription"
  - Copyright © 2025
- **Connecté** :
  - Logo Kasa
  - "Connecté en tant que **[Prénom Nom]**" (en rouge #EB0000)
  - Lien "Déconnexion"
  - Copyright © 2025

**Props** : Aucune (utilise `useAuth()`)

**Exemple** :

```tsx
import { Footer } from "@/components/layout/Footer";

<Footer />;
```

**Responsive** :

- Desktop : Flex row (horizontal)
- Mobile : Flex column (vertical)

---

## 🏠 Propriétés

### `PropertyCard`

**Fichier** : `src/components/properties/PropertyCard.tsx`

**Description** : Carte d'affichage d'un bien immobilier avec image, infos et bouton favoris.

**Props** :

```typescript
interface PropertyCardProps {
  property: Property; // Objet complet du bien
}
```

**Type Property** :

```typescript
type Property = {
  id: string;
  title: string;
  location: string;
  price: number; // Prix par nuit
  bedrooms: number;
  surface: number; // En m²
  cover: string; // URL image
  rating: number; // 0-5
  // ... autres champs
};
```

**Fonctionnalités** :

- ✅ Lien vers la page détaillée (`/properties/{id}`)
- ❤️ Toggle favoris (coeur rouge/gris)
- 🖼️ Image de couverture responsive
- 💰 Affichage du prix par nuit
- 🛏️ Nombre de chambres et surface

**Exemple** :

```tsx
<PropertyCard
  property={{
    id: "1",
    title: "Appartement Moderne Paris",
    location: "Paris 15ème",
    price: 120,
    bedrooms: 2,
    surface: 65,
    cover: "/uploads/cover.jpg",
    rating: 4.5,
  }}
/>
```

**Hooks utilisés** :

- `useFavorites()` - Gestion des favoris
- `useAuth()` - Vérification si l'utilisateur peut modifier
- `useRouter()` - Navigation

---

### `PropertyList`

**Fichier** : `src/components/properties/PropertyList.tsx`

**Description** : Grille responsive de cartes de propriétés.

**Props** :

```typescript
interface PropertyListProps {
  properties: Property[]; // Tableau de biens
}
```

**Layout Responsive** :

- 📱 Mobile (< 768px) : **1 colonne**
- 📱 Tablette (768-1024px) : **2 colonnes**
- 💻 Desktop (> 1024px) : **3 colonnes**

**Gestion du vide** :
Affiche automatiquement "Aucun logement disponible" si `properties.length === 0`

**Exemple** :

```tsx
// Liste avec propriétés
<PropertyList properties={propertiesArray} />

// Liste vide (affiche le message)
<PropertyList properties={[]} />
```

---

### `EditPropertyButton`

**Fichier** : `src/components/properties/EditPropertyButton.tsx`

**Description** : Bouton d'édition de bien immobilier (icône crayon).

**Props** :

```typescript
interface EditPropertyButtonProps {
  propertyId: string; // ID du bien à éditer
  hostId?: number; // ID du propriétaire (optionnel)
}
```

**Visibilité** :

- ✅ Propriétaire du bien
- ✅ Administrateurs
- ❌ Autres utilisateurs (le bouton n'apparaît pas)

**Redirection** :
Redirige vers `/properties/${propertyId}/edit`

**Exemple** :

```tsx
// Bouton basique
<EditPropertyButton propertyId="property-123" />;

// Avec vérification du propriétaire
{
  isOwner && (
    <EditPropertyButton propertyId={property.id} hostId={property.hostId} />
  );
}
```

**Style** :

- Icône : 📝 `faPenToSquare`
- Couleur au survol : `#FF6060` (rouge Kasa)
- Transition fluide : `300ms`

---

## 🖼️ Galerie

### `ImageCarousel`

**Fichier** : `src/components/ImageCarousel.tsx`

**Description** : Carrousel d'images en plein écran avec navigation.

**Props** :

```typescript
interface ImageCarouselProps {
  images: string[]; // URLs des images
  title: string; // Titre du bien
  initialIndex?: number; // Image de départ (défaut: 0)
  onClose: () => void; // Callback à la fermeture
}
```

**Fonctionnalités** :

- ⬅️➡️ Navigation précédent/suivant
- 🔄 Navigation circulaire (retour au début)
- ❌ Fermeture par bouton X ou clic sur fond
- 📊 Compteur "X / Y" images
- 👁️ Mode plein écran

**Comportement** :

- Si **1 seule image** : Cache les boutons de navigation
- Si **2+ images** : Affiche les flèches gauche/droite
- Clic sur fond sombre : Ferme le carrousel

**Exemple** :

```tsx
<ImageCarousel
  images={[
    "https://example.com/img1.jpg",
    "https://example.com/img2.jpg",
    "https://example.com/img3.jpg",
  ]}
  title="Appartement Paris"
  initialIndex={0}
  onClose={() => setIsOpen(false)}
/>
```

**Touches clavier** : Non implémenté (amélioration possible)

---

### `PropertyGallery`

**Fichier** : `src/components/PropertyGallery.tsx`

**Description** : Grille de miniatures qui ouvre le carrousel au clic.

**Props** :

```typescript
interface PropertyGalleryProps {
  images: string[]; // Toutes les images
  title: string; // Titre du bien
  coverImage: string; // Image principale
}
```

**Affichage** :

- **1-4 images** : Affiche toutes les miniatures
- **5+ images** : Affiche 3 miniatures + badge "+X autres"

**Interaction** :

- Clic sur miniature → Ouvre carrousel à cette image
- Carrousel démarre à l'index de l'image cliquée

**Exemple** :

```tsx
<PropertyGallery
  images={[
    "/uploads/img1.jpg",
    "/uploads/img2.jpg",
    "/uploads/img3.jpg",
    "/uploads/img4.jpg",
    "/uploads/img5.jpg",
  ]}
  title="Villa Moderne"
  coverImage="/uploads/cover.jpg"
/>
// Affiche : [img1] [img2] [img3] [+2 autres]
```

**Layout** :

```
┌─────┬─────┐
│ 1   │ 2   │
├─────┼─────┤
│ 3   │ +X  │
└─────┴─────┘
```

---

## 🔐 Authentification

### `ProtectedRoute`

**Fichier** : `src/components/auth/ProtectedRoute.tsx`

**Description** : Wrapper qui protège les routes nécessitant une authentification.

**Props** :

```typescript
interface ProtectedRouteProps {
  children: React.ReactNode; // Contenu à protéger
  redirectTo?: string; // URL de redirection (défaut: /login)
}
```

**Comportement** :

1. Vérifie si l'utilisateur est authentifié via `useAuth()`
2. Si **non connecté** → Redirige vers `/login` (ou `redirectTo`)
3. Si **connecté** → Affiche les `children`

**Exemple** :

```tsx
// Page réservée aux utilisateurs connectés
<ProtectedRoute>
  <MyPrivatePage />
</ProtectedRoute>

// Avec redirection personnalisée
<ProtectedRoute redirectTo="/register">
  <OwnerDashboard />
</ProtectedRoute>
```

**Usage typique** :

```tsx
// Dans app/(main)/favorites/page.tsx
export default function FavoritesPage() {
  return (
    <ProtectedRoute>
      <FavoritesList />
    </ProtectedRoute>
  );
}
```

---

## 🎨 Hooks personnalisés

### `useAuth()`

**Fichier** : `src/lib/api/auth.ts`

**Retour** :

```typescript
{
  isAuthenticated: boolean;
  user: User | null;
  login: (credentials) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData) => Promise<void>;
}
```

**Exemple** :

```tsx
const { isAuthenticated, user, logout } = useAuth();

if (isAuthenticated) {
  console.log(`Bonjour ${user.firstName}`);
}
```

---

### `useFavorites()`

**Fichier** : `src/lib/context/FavoritesContext.tsx`

**Retour** :

```typescript
{
  favorites: string[];              // IDs des favoris
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}
```

**Exemple** :

```tsx
const { isFavorite, toggleFavorite } = useFavorites();

<button onClick={() => toggleFavorite(propertyId)}>
  {isFavorite(propertyId) ? "❤️" : "🤍"}
</button>;
```

---

## 🎯 Types principaux

### `Property`

**Fichier** : `src/types/property.ts`

```typescript
export type Property = {
  id: string;
  title: string;
  location: string;
  description: string;
  cover: string;
  pictures: string[];
  equipments: string[];
  tags: string[];
  rating: number;
  bedrooms: number;
  surface: number;
  price: number;
  host: {
    id: number;
    name: string;
    picture: string;
  };
};
```

---

## 🚀 Guide d'utilisation

### Structure type d'une page

```tsx
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import PropertyList from "@/components/properties/PropertyList";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <PropertyList properties={properties} />
      </main>
      <Footer />
    </>
  );
}
```

### Page avec protection

```tsx
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PropertyForm from "@/components/properties/PropertyForm";

export default function NewPropertyPage() {
  return (
    <ProtectedRoute>
      <PropertyForm />
    </ProtectedRoute>
  );
}
```

---

## 📝 Conventions de code

### Composants

- ✅ Utiliser `"use client"` pour les composants interactifs
- ✅ Export `default function` pour les composants principaux
- ✅ Export nommé `export function` pour les composants réutilisables (Header, Footer)
- ✅ Interface TypeScript pour toutes les props

### Nommage

- **Composants** : PascalCase (`PropertyCard`, `ImageCarousel`)
- **Fichiers** : PascalCase (`PropertyCard.tsx`)
- **Hooks** : camelCase avec préfixe `use` (`useAuth`, `useFavorites`)
- **Types** : PascalCase (`Property`, `User`)

### Structure de fichier

```tsx
"use client"; // Si nécessaire

// 1. Imports externes
import { useState } from "react";
import Image from "next/image";

// 2. Imports internes
import { useAuth } from "@/lib/api/auth";
import type { Property } from "@/types/property";

// 3. Types/Interfaces
interface MyComponentProps {
  // ...
}

// 4. Composant
export default function MyComponent({ prop }: MyComponentProps) {
  // Hooks
  const [state, setState] = useState();

  // Logique
  const handleClick = () => {};

  // Rendu
  return <div>...</div>;
}
```

---

## 🎨 Styles et Design System

### Couleurs Kasa

```css
--primary: #ff6060; /* Rouge principal */
--primary-hover: #eb0000; /* Rouge foncé au survol */
--gray-light: #f6f6f6; /* Fond gris clair */
--gray-text: #484848; /* Texte gris */
```

### Classes Tailwind communes

```tsx
// Carte
className = "rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow";

// Bouton primaire
className = "bg-[#FF6060] text-white px-6 py-3 rounded-lg hover:bg-[#EB0000]";

// Container responsive
className = "container mx-auto px-4 sm:px-6 lg:px-8";

// Grille responsive
className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
```

---

## 📊 Arborescence des composants

```
src/components/
├── layout/
│   ├── Header.tsx          # En-tête avec navigation
│   └── Footer.tsx          # Pied de page
├── properties/
│   ├── PropertyCard.tsx    # Carte d'un bien
│   ├── PropertyList.tsx    # Liste de biens
│   └── EditPropertyButton.tsx # Bouton édition
├── auth/
│   └── ProtectedRoute.tsx  # Protection de routes
├── ImageCarousel.tsx       # Carrousel plein écran
└── PropertyGallery.tsx     # Grille de miniatures
```

---

## 🔗 Liens utiles

- **Types** : `src/types/`
- **API Client** : `src/lib/api/`
- **Contextes** : `src/lib/context/`
- **Tests** : `src/components/__tests__/`

---

## 📅 Dernière mise à jour

**Date** : 11 août 2026  
**Version** : 1.0.0

---

## 👨‍💻 Contribution

Pour ajouter un nouveau composant :

1. Créer le fichier dans le bon dossier
2. Ajouter les types TypeScript
3. Documenter avec des commentaires JSDoc
4. Créer les tests dans `__tests__/`
5. Mettre à jour cette documentation

---

**Fin de la documentation** 📚
