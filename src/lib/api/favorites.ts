/**
 * API de gestion des favoris
 */

import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import type { Property } from "@/types/property";

/**
 * Ajoute un logement aux favoris
 */
export async function addToFavorites(propertyId: string): Promise<void> {
  await apiClient.post(ENDPOINTS.PROPERTIES.FAVORITE(propertyId));
}

/**
 * Retire un logement des favoris
 */
export async function removeFromFavorites(propertyId: string): Promise<void> {
  await apiClient.delete(ENDPOINTS.PROPERTIES.FAVORITE(propertyId));
}

/**
 * Récupère la liste des favoris d'un utilisateur
 */
export async function getUserFavorites(userId: string): Promise<Property[]> {
  return await apiClient.get<Property[]>(ENDPOINTS.USERS.FAVORITES(userId));
}

/**
 * Vérifie si un logement est dans les favoris
 */
export async function isFavorite(
  propertyId: string,
  favorites: Property[],
): boolean {
  return favorites.some((fav) => fav.id === propertyId);
}
