# 🏠 Kasa Frontend - Application de Location Immobilière

Application web moderne de location immobilière construite avec Next.js, TypeScript et Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4-cyan)
![Tests](https://img.shields.io/badge/Tests-Jest-red)

---

## 📚 Documentation complète

### 📖 Guides principaux

- **[DOCUMENTATION.md](./DOCUMENTATION.md)** - Documentation complète du projet
  - Architecture et structure
  - Guide de démarrage
  - Technologies utilisées
  - API et hooks
  - Tests et déploiement

- **[COMPONENTS.md](./COMPONENTS.md)** - Référence des composants
  - Documentation détaillée de tous les composants React
  - Props, exemples d'utilisation et hooks associés
  - Guide des types TypeScript

---

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+
- Backend API en cours d'exécution sur `http://localhost:3000`

### Installation

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

L'application sera accessible sur **http://localhost:3001**

### Scripts disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm start            # Serveur de production
npm test             # Tests Jest
npm run test:watch   # Tests en mode watch
npm run test:coverage # Tests avec couverture
npm run lint         # Linter ESLint
npm run analyze      # Analyse du bundle
```

---

## ✨ Fonctionnalités

- 🏠 **Catalogue de propriétés** avec recherche et filtres
- 🔐 **Authentification JWT** sécurisée
- ❤️ **Système de favoris** persistant
- 🖼️ **Galerie d'images** interactive avec carrousel
- 📱 **Design responsive** mobile-first
- ⚡ **Performances optimisées** (React Compiler, lazy loading)
- ♿ **Accessibilité** WCAG 2.1 AA
- 🧪 **Tests** unitaires et d'intégration

---

## 🏗️ Architecture

```
frontend/
├── src/
│   ├── app/              # App Router Next.js
│   │   ├── (main)/      # Routes publiques
│   │   └── (auth)/      # Routes d'authentification
│   ├── components/      # Composants React
│   │   ├── layout/      # Header, Footer
│   │   ├── properties/  # PropertyCard, PropertyList
│   │   └── auth/        # ProtectedRoute
│   ├── lib/            # API, contextes, utils
│   └── types/          # Types TypeScript
├── public/             # Assets statiques
├── coverage/           # Rapports de tests
└── COMPONENTS.md       # Documentation composants
```

---

## 🛠️ Stack technique

### Core

- **Next.js 16** - Framework React avec App Router
- **React 19** - Bibliothèque UI
- **TypeScript 5** - Typage statique
- **Tailwind CSS 4** - Framework CSS utility-first

### Bibliothèques

- **Axios** - Client HTTP
- **FontAwesome** - Icônes
- **Jest & Testing Library** - Tests

### Optimisations

- ✅ React Compiler (mémoïsation automatique)
- ✅ Image Optimization (AVIF, WebP)
- ✅ Code Splitting
- ✅ Lazy Loading
- ✅ Compression Gzip

---

## 📦 Composants principaux

### Layout

- **Header** - Navigation avec menu responsive
- **Footer** - Pied de page avec auth

### Propriétés

- **PropertyCard** - Carte de bien immobilier
- **PropertyList** - Grille responsive de cartes
- **EditPropertyButton** - Bouton d'édition

### Galerie

- **ImageCarousel** - Carrousel plein écran
- **PropertyGallery** - Grille de miniatures

### Auth

- **ProtectedRoute** - Protection de routes

> **Voir [COMPONENTS.md](./COMPONENTS.md) pour la documentation complète**

---

## 🧪 Tests

```bash
# Lancer tous les tests
npm test

# Mode watch
npm run test:watch

# Avec couverture
npm run test:coverage
```

Voir le rapport de couverture dans `coverage/lcov-report/index.html`

---

## 🎨 Design System

### Couleurs Kasa

```css
--primary: #ff6060; /* Rouge principal */
--primary-hover: #eb0000; /* Rouge foncé */
--secondary: #99331a; /* Marron */
```

### Responsive

- 📱 Mobile : `< 768px` - 1 colonne
- 📱 Tablette : `768-1024px` - 2 colonnes
- 💻 Desktop : `> 1024px` - 3 colonnes

---

## 🔐 Authentification

- **Login** : `POST /api/auth/login`
- **Token JWT** stocké dans `localStorage`
- **Routes protégées** avec `<ProtectedRoute>`

```tsx
<ProtectedRoute>
  <MyPrivatePage />
</ProtectedRoute>
```

---

## 📝 Conventions de code

### Nommage

- Composants : `PascalCase` (`PropertyCard.tsx`)
- Hooks : `camelCase` avec `use` (`useAuth.ts`)
- Constantes : `UPPER_SNAKE_CASE`

### Structure de composant

```tsx
"use client";

import { useState } from "react";

interface Props {
  title: string;
}

export default function MyComponent({ title }: Props) {
  const [state, setState] = useState();

  return <div>{title}</div>;
}
```

---

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/ma-feature`)
3. Commit (`git commit -m 'Ajoute ma feature'`)
4. Push (`git push origin feature/ma-feature`)
5. Ouvrir une Pull Request

---

## 🔗 Liens utiles

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Documentation complète du projet](./DOCUMENTATION.md)
- [Référence des composants](./COMPONENTS.md)

---

## 📄 Licence

MIT

---

**Version** : 1.0.0  
**Dernière mise à jour** : 11 août 2026
