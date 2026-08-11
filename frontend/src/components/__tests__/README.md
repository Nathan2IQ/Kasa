# Tests Unitaires - Frontend KASA

## Vue d'ensemble

Ce dossier contient tous les tests unitaires pour l'application KASA. Les tests couvrent les composants principaux, la gestion des favoris, et les fonctionnalités d'authentification.

## Structure des Tests

```
src/
├── components/
│   └── __tests__/
│       ├── ImageCarousel.test.tsx       # Tests du carrousel d'images
│       ├── PropertyCard.test.tsx        # Tests de la carte de propriété
│       ├── PropertyList.test.tsx        # Tests de la liste de propriétés
│       ├── PropertyGallery.test.tsx     # Tests de la galerie d'images
│       └── ProtectedRoute.test.tsx      # Tests des routes protégées
└── lib/
    ├── api/
    │   └── __tests__/
    │       └── favorites.test.ts        # Tests de l'API des favoris
    └── context/
        └── __tests__/
            └── FavoritesContext.test.tsx # Tests du contexte des favoris
```

## Tests Implémentés

### 1. ImageCarousel.test.tsx ✅

Tests du composant carrousel d'images :

- ✅ Affichage de l'image initiale
- ✅ Compteur d'images
- ✅ Navigation suivante/précédente
- ✅ Navigation circulaire (boucle)
- ✅ Fermeture du carrousel
- ✅ Navigation au clavier

### 2. PropertyCard.test.tsx ✅

Tests de la carte de propriété avec gestion des favoris :

- ✅ Affichage des informations de la propriété
- ✅ Affichage de l'image et des tags
- ✅ Lien vers la page de détail
- ✅ Bouton favoris (ajout/retrait)
- ✅ Redirection vers login si non authentifié
- ✅ Tooltips appropriés selon l'état d'authentification
- ✅ Prévention de la propagation des événements
- ✅ État désactivé pendant la mise à jour

### 3. PropertyList.test.tsx ✅

Tests de la liste de propriétés :

- ✅ Affichage de toutes les propriétés
- ✅ État vide (aucun logement)
- ✅ Nombre correct de cartes
- ✅ Layout responsive (grid)
- ✅ Affichage des informations (localisation, prix)
- ✅ Clés uniques pour chaque carte

### 4. PropertyGallery.test.tsx ✅

Tests de la galerie d'images :

- ✅ Affichage de l'image principale
- ✅ Miniatures (jusqu'à 4)
- ✅ Ouverture du carrousel au clic
- ✅ Index correct lors du clic sur une miniature
- ✅ Gestion du cas d'une seule image
- ✅ Indicateur "+X" pour images supplémentaires
- ✅ Fermeture du carrousel
- ✅ Effets hover
- ✅ Labels d'accessibilité

### 5. ProtectedRoute.test.tsx ✅

Tests du composant de protection des routes :

- ✅ État de chargement
- ✅ Affichage du contenu si authentifié
- ✅ Redirection vers login si non authentifié
- ✅ Chemin de redirection personnalisé
- ✅ Style du spinner de chargement
- ✅ Pas de redirection pendant le chargement
- ✅ Re-vérification lors du changement d'état

### 6. favorites.test.ts ✅

Tests de l'API de gestion des favoris :

- ✅ Ajout d'un favori
- ✅ Retrait d'un favori
- ✅ Récupération des favoris utilisateur
- ✅ Vérification si une propriété est favorite
- ✅ Gestion des erreurs API
- ✅ Gestion des tableaux vides
- ✅ Sensibilité à la casse des IDs

### 7. FavoritesContext.test.tsx ✅

Tests du contexte de gestion des favoris :

- ✅ Erreur si utilisé hors Provider
- ✅ Fourniture du contexte correctement
- ✅ Chargement des favoris au montage
- ✅ Pas de chargement si non authentifié
- ✅ Vérification d'un favori
- ✅ Ajout d'un favori
- ✅ Retrait d'un favori
- ✅ Erreur si toggle sans authentification
- ✅ Rafraîchissement manuel
- ✅ État de chargement
- ✅ Gestion des erreurs

## Commandes

### Exécuter tous les tests

```bash
npm test
```

### Exécuter les tests en mode watch

```bash
npm run test:watch
```

### Générer un rapport de couverture

```bash
npm run test:coverage
```

### Exécuter les tests d'un fichier spécifique

```bash
npm test PropertyCard.test.tsx
```

## Configuration

Les tests utilisent :

- **Jest** : Framework de test
- **React Testing Library** : Pour tester les composants React
- **@testing-library/jest-dom** : Matchers personnalisés pour Jest

Configuration dans `jest.config.ts` :

- Environment : jsdom (simulation navigateur)
- Setup : `jest.setup.ts`
- Alias : `@/` → `src/`
- Coverage : v8

## Bonnes Pratiques

### 1. Utilisation de `waitFor`

```typescript
await waitFor(() => {
  expect(mockFunction).toHaveBeenCalled();
});
```

### 2. Mocking des dépendances

```typescript
jest.mock("@/lib/api/auth");
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
```

### 3. Nettoyage entre les tests

```typescript
beforeEach(() => {
  jest.clearAllMocks();
});
```

### 4. Tests d'accessibilité

```typescript
const button = screen.getByLabelText("Ajouter aux favoris");
expect(button).toHaveAttribute("aria-label", "...");
```

### 5. Tests d'événements asynchrones

```typescript
fireEvent.click(button);
await waitFor(() => {
  expect(apiFunction).toHaveBeenCalled();
});
```

## Couverture de Code

Objectif : **80%+ de couverture**

Zones couvertes :

- ✅ Composants UI principaux
- ✅ Gestion des favoris
- ✅ Protection des routes
- ✅ API de favoris
- ✅ Contexte React

Zones non couvertes (exclues) :

- Types TypeScript (\*.d.ts)
- Stories Storybook (\*.stories.tsx)
- Fichiers de test eux-mêmes

## Dépannage

### Problème : Avertissements "act(...)"

**Solution** : Utiliser `waitFor` pour les opérations asynchrones

```typescript
await waitFor(() => {
  // assertions
});
```

### Problème : Mock ne fonctionne pas

**Solution** : Vérifier l'ordre des imports et utiliser `jest.mock` avant les imports

```typescript
jest.mock("@/lib/api/auth");
import { useAuth } from "@/lib/api/auth";
```

### Problème : Tests flaky (instables)

**Solution** : Utiliser `waitFor` pour les assertions asynchrones et augmenter le timeout si nécessaire

## Ressources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Contribution

Lors de l'ajout de nouvelles fonctionnalités :

1. Créer les tests unitaires correspondants
2. Maintenir la couverture > 80%
3. Suivre les conventions de nommage (`*.test.tsx` ou `*.test.ts`)
4. Documenter les cas de test complexes
