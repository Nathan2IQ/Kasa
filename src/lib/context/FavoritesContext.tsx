"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import {
  addToFavorites as apiAddToFavorites,
  removeFromFavorites as apiRemoveFromFavorites,
  getUserFavorites,
} from "@/lib/api/favorites";
import { useAuth } from "@/lib/api/auth";
import type { Property } from "@/types/property";

interface FavoritesContextType {
  favorites: Property[];
  isLoading: boolean;
  isFavorite: (propertyId: string) => boolean;
  toggleFavorite: (propertyId: string) => Promise<void>;
  refreshFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

interface FavoritesProviderProps {
  children: ReactNode;
}

/**
 * Provider de gestion des favoris
 * Gère l'état global des favoris et les opérations d'ajout/suppression
 */
export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const { user, isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Charge les favoris de l'utilisateur
   */
  const refreshFavorites = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setFavorites([]);
      return;
    }

    setIsLoading(true);
    try {
      const userFavorites = await getUserFavorites(user.id);
      setFavorites(userFavorites);
    } catch (error) {
      console.error("Erreur lors du chargement des favoris:", error);
      setFavorites([]);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  /**
   * Charge les favoris au montage et quand l'utilisateur change
   */
  useEffect(() => {
    refreshFavorites();
  }, [refreshFavorites]);

  /**
   * Vérifie si un logement est dans les favoris
   */
  const isFavorite = useCallback(
    (propertyId: string): boolean => {
      return favorites.some((fav) => fav.id === propertyId);
    },
    [favorites],
  );

  /**
   * Ajoute ou retire un logement des favoris
   */
  const toggleFavorite = async (propertyId: string): Promise<void> => {
    if (!isAuthenticated) {
      throw new Error("Vous devez être connecté pour gérer vos favoris");
    }

    try {
      const isCurrentlyFavorite = isFavorite(propertyId);

      if (isCurrentlyFavorite) {
        // Retirer des favoris
        await apiRemoveFromFavorites(propertyId);
        setFavorites((prev) => prev.filter((fav) => fav.id !== propertyId));
      } else {
        // Ajouter aux favoris
        await apiAddToFavorites(propertyId);
        // Recharger la liste complète pour avoir toutes les données
        await refreshFavorites();
      }
    } catch (error) {
      console.error("Erreur lors de la modification des favoris:", error);
      throw error;
    }
  };

  const value: FavoritesContextType = {
    favorites,
    isLoading,
    isFavorite,
    toggleFavorite,
    refreshFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

/**
 * Hook personnalisé pour accéder au contexte des favoris
 * @throws {Error} Si utilisé en dehors d'un FavoritesProvider
 */
export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext);

  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }

  return context;
}
