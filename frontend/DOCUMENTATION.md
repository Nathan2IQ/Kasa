# 📚 Documentation Frontend - Application Kasa

Documentation complète du frontend Next.js de l'application Kasa.

---

## 📑 Table des matières

1. [Introduction](#introduction)
2. [Architecture](#architecture)
3. [Documentation détaillée](#documentation-détaillée)
4. [Démarrage rapide](#démarrage-rapide)
5. [Technologies](#technologies)

---

## 🎯 Introduction

Application web de location immobilière construite avec **Next.js 16**, **TypeScript** et **Tailwind CSS**.

### Fonctionnalités principales

- 🏠 **Catalogue de biens** immobiliers
- 🔐 **Authentification** (JWT)
- ❤️ **Système de favoris**
- 🖼️ **Galerie d'images** interactive
- 📱 **Design responsive** (mobile-first)
- ⚡ **Performance optimisée** (React Compiler, lazy loading)

---

## 🏗️ Architecture

### Structure du projet

```
frontend/
├── src/
│   ├── app/                    # App Router (Next.js 14+)
│   │   ├── (main)/            # Routes publiques
│   │   │   ├── page.tsx       # Page d'accueil
│   │   │   ├── properties/    # Pages propriétés
│   │   │   ├── favorites/     # Page favoris
│   │   │   └── about/         # Page à propos
│   │   ├── (auth)/            # Routes d'authentification
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── layout.tsx         # Layout racine
│   │   ├── globals.css        # Styles globaux
│   │   └── not-found.tsx      # Page 404
│   │
│   ├── components/            # Composants React
│   │   ├── layout/           # Header, Footer
│   │   ├── properties/       # PropertyCard, PropertyList
│   │   ├── auth/             # ProtectedRoute
│   │   └── __tests__/        # Tests Jest
│   │
│   ├── lib/                  # Bibliothèques et utilitaires
│   │   ├── api/             # Clients API
│   │   ├── context/         # Contextes React
│   │   └── utils/           # Fonctions utilitaires
│   │
│   └── types/               # Types TypeScript
│       ├── property.ts
│       └── api.ts
│
├── public/                  # Assets statiques
│   ├── logoKasa.png
│   └── hero.png
│
├── coverage/               # Rapports de couverture de tests
├── COMPONENTS.md          # Documentation des composants
└── README.md             # Ce fichier
```

### Architecture en couches

```
┌─────────────────────────────────┐
│       Pages (App Router)        │
│    app/(main)/*/page.tsx        │
├─────────────────────────────────┤
│       Composants React          │
│    components/**/*.tsx           │
├─────────────────────────────────┤
│    Contextes & Hooks            │
│  lib/context/ + lib/api/        │
├─────────────────────────────────┤
│       Client API                │
│    lib/api/client.ts            │
├─────────────────────────────────┤
│       Backend API               │
│   http://localhost:3000/api    │
└─────────────────────────────────┘
```

---

## 📖 Documentation détaillée

### 🧩 Composants

Documentation complète de tous les composants React disponibles dans **[COMPONENTS.md](./COMPONENTS.md)** :

- Layout (Header, Footer)
- Propriétés (PropertyCard, PropertyList, EditPropertyButton)
- Galerie (ImageCarousel, PropertyGallery)
- Authentification (ProtectedRoute)

### 🔌 API Client

**Fichier** : `src/lib/api/client.ts`

Client HTTP configuré avec Axios et gestion automatique :

- Injection du token JWT dans les headers
- Gestion des erreurs centralisée
- Intercepteurs de requêtes/réponses

**Exemple** :

```typescript
import { apiClient } from "@/lib/api/client";

// GET avec authentification automatique
const data = await apiClient.get("/properties");

// POST
await apiClient.post("/properties", propertyData);
```

### 🪝 Hooks personnalisés

#### `useAuth()`

**Fichier** : `src/lib/api/auth.ts`

Gestion de l'authentification :

```typescript
const {
  isAuthenticated, // boolean
  user, // User | null
  login, // (credentials) => Promise<void>
  logout, // () => Promise<void>
  register, // (userData) => Promise<void>
} = useAuth();
```

**Exemple** :

```tsx
import { useAuth } from "@/lib/api/auth";

function MyComponent() {
  const { isAuthenticated, user, logout } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div>
      <p>Bonjour {user.firstName}</p>
      <button onClick={logout}>Déconnexion</button>
    </div>
  );
}
```

#### `useFavorites()`

**Fichier** : `src/lib/context/FavoritesContext.tsx`

Gestion des favoris :

```typescript
const {
  favorites, // string[] - IDs des favoris
  toggleFavorite, // (id: string) => void
  isFavorite, // (id: string) => boolean
} = useFavorites();
```

**Exemple** :

```tsx
import { useFavorites } from "@/lib/context/FavoritesContext";

function PropertyCard({ property }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <button onClick={() => toggleFavorite(property.id)}>
      {isFavorite(property.id) ? "❤️" : "🤍"}
    </button>
  );
}
```

### 📘 Types TypeScript

#### `Property`

**Fichier** : `src/types/property.ts`

```typescript
export type Property = {
  id: string;
  title: string;
  location: string;
  description: string;
  cover: string; // URL image de couverture
  pictures: string[]; // URLs images supplémentaires
  equipments: string[]; // ["WiFi", "Parking", ...]
  tags: string[]; // ["Appartement", "Centre-ville"]
  rating: number; // 0-5
  bedrooms: number;
  surface: number; // m²
  price: number; // € par nuit
  host: {
    id: number;
    name: string;
    picture: string;
  };
};
```

#### `User`

**Fichier** : `src/lib/api/auth.ts`

```typescript
export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: "user" | "owner" | "admin";
};
```

---

## 🚀 Démarrage rapide

### Prérequis

- **Node.js** 18+
- **npm** ou **pnpm**
- **Backend** API en cours d'exécution sur `http://localhost:3000`

### Installation

```bash
# Cloner le repo
cd frontend

# Installer les dépendances
npm install

# Démarrer en développement
npm run dev
```

L'application est accessible sur **http://localhost:3001**

### Scripts disponibles

```bash
npm run dev          # Démarre le serveur de développement
npm run build        # Build de production
npm start            # Démarre le serveur de production
npm test             # Lance les tests Jest
npm run test:watch   # Tests en mode watch
npm run test:coverage # Tests avec couverture
npm run lint         # Vérifie le code avec ESLint
npm run analyze      # Analyse le bundle
```

---

## 🛠️ Technologies

### Core

- **[Next.js 16](https://nextjs.org/)** - Framework React avec App Router
- **[React 19](https://react.dev/)** - Bibliothèque UI
- **[TypeScript 5](https://www.typescriptlang.org/)** - Typage statique
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utility-first

### Bibliothèques

- **[Axios](https://axios-http.com/)** - Client HTTP
- **[FontAwesome](https://fontawesome.com/)** - Icônes
- **[React Context API](https://react.dev/reference/react/useContext)** - Gestion d'état

### Outils de développement

- **[Jest](https://jestjs.io/)** - Framework de tests
- **[Testing Library](https://testing-library.com/)** - Tests de composants
- **[ESLint](https://eslint.org/)** - Linter JavaScript/TypeScript
- **[React Compiler](https://react.dev/learn/react-compiler)** - Optimisation automatique

### Optimisations

✅ **React Compiler** - Mémoïsation automatique  
✅ **Image Optimization** - Next.js Image avec formats modernes (AVIF, WebP)  
✅ **Code Splitting** - Découpage automatique du bundle  
✅ **Lazy Loading** - Chargement différé des composants  
✅ **Compression Gzip** - Réduction de la taille des fichiers

---

## 🎨 Design System

### Couleurs

```css
/* Palette Kasa */
--primary: #ff6060; /* Rouge principal */
--primary-hover: #eb0000; /* Rouge foncé */
--secondary: #99331a; /* Marron */
--gray-light: #f6f6f6; /* Fond clair */
--gray-medium: #e5e5e5; /* Bordures */
--gray-dark: #484848; /* Texte */
```

### Typographie

- **Police** : System font stack (optimisé performance)
- **Tailles** :
  - H1 : `text-4xl` (36px)
  - H2 : `text-3xl` (30px)
  - Body : `text-base` (16px)
  - Small : `text-sm` (14px)

### Breakpoints

```css
sm:  640px   /* Mobile large */
md:  768px   /* Tablette */
lg:  1024px  /* Desktop */
xl:  1280px  /* Large desktop */
2xl: 1536px  /* Extra large */
```

---

## 🧪 Tests

### Lancer les tests

```bash
# Tous les tests
npm test

# Mode watch (rechargement automatique)
npm run test:watch

# Avec couverture
npm run test:coverage
```

### Structure des tests

```
src/components/__tests__/
├── ImageCarousel.test.tsx
└── ... (autres tests)
```

### Exemple de test

```tsx
import { render, screen } from "@testing-library/react";
import PropertyCard from "@/components/properties/PropertyCard";

test("affiche le titre de la propriété", () => {
  render(<PropertyCard property={mockProperty} />);
  expect(screen.getByText("Appartement Paris")).toBeInTheDocument();
});
```

### Couverture actuelle

Voir le rapport détaillé dans **`coverage/lcov-report/index.html`** après `npm run test:coverage`.

---

## 📦 Build et déploiement

### Build de production

```bash
npm run build
```

Génère un build optimisé dans `.next/`

### Analyse du bundle

```bash
npm run analyze
```

Ouvre une visualisation interactive de la taille du bundle.

### Variables d'environnement

Créer un fichier `.env.local` :

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

---

## 🔐 Authentification

### Flux d'authentification

1. **Login** : `POST /api/auth/login`
   - Reçoit un token JWT
   - Stocké dans `localStorage`
2. **Requêtes API** : Header `Authorization: Bearer {token}`

3. **Logout** :
   - Supprime le token
   - Redirige vers `/login`

### Routes protégées

Utiliser le composant `<ProtectedRoute>` :

```tsx
<ProtectedRoute>
  <MyPrivatePage />
</ProtectedRoute>
```

---

## 🐛 Debugging

### React DevTools

Installer l'extension Chrome/Firefox pour inspecter les composants et le state.

### Logs

```typescript
import { logger } from "@/lib/utils/logger";

logger.info("Message informatif");
logger.error("Erreur", error);
```

---

## 📝 Conventions de code

### Nommage

- **Composants** : `PascalCase` (`PropertyCard.tsx`)
- **Hooks** : `camelCase` avec préfixe `use` (`useAuth.ts`)
- **Constantes** : `UPPER_SNAKE_CASE` (`API_BASE_URL`)
- **Fonctions** : `camelCase` (`fetchProperties`)

### Structure de composant

```tsx
"use client"; // Si nécessaire

// 1. Imports
import { useState } from "react";

// 2. Types
interface MyComponentProps {
  title: string;
}

// 3. Composant
export default function MyComponent({ title }: MyComponentProps) {
  // Hooks
  const [state, setState] = useState();

  // Handlers
  const handleClick = () => {};

  // Rendu
  return <div onClick={handleClick}>{title}</div>;
}
```

---

## 🤝 Contribution

### Ajouter un composant

1. Créer le fichier dans `src/components/`
2. Ajouter les types TypeScript
3. Documenter avec JSDoc
4. Créer les tests
5. Mettre à jour `COMPONENTS.md`

### Pull Request

1. Fork le projet
2. Créer une branche (`git checkout -b feature/ma-feature`)
3. Commit (`git commit -m 'Ajoute ma feature'`)
4. Push (`git push origin feature/ma-feature`)
5. Ouvrir une Pull Request

---

## 📄 Licence

Ce projet est sous licence **MIT**.

---

## 👥 Auteurs

- **Équipe Kasa** - Application web de location immobilière

---

## 🔗 Liens utiles

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

**Dernière mise à jour** : 11 août 2026  
**Version** : 1.0.0
