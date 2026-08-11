/**
 * API Routes pour les logements
 */

import { apiClient, HTTPError } from "./client";
import { ENDPOINTS } from "./endpoints";
import type { Property } from "@/types/property";

/**
 * Récupère la liste de tous les logements
 */
export async function getProperties(): Promise<Property[]> {
  return apiClient.get<Property[]>(ENDPOINTS.PROPERTIES.LIST);
}

/**
 * Récupère les détails d'un logement par son ID
 */
export async function getPropertyById(id: string): Promise<Property | null> {
  try {
    return await apiClient.get<Property>(ENDPOINTS.PROPERTIES.BY_ID(id));
  } catch (error) {
    // Si l'erreur est une 404, retourner null pour déclencher la page not-found
    if (error instanceof HTTPError && error.status === 404) {
      return null;
    }
    // Pour les autres erreurs, les laisser se propager
    throw error;
  }
}

/**
 * Crée un nouveau logement
 */
export async function createProperty(
  data: Partial<Property>,
): Promise<Property> {
  return apiClient.post<Property>(ENDPOINTS.PROPERTIES.CREATE, data);
}

/**
 * Met à jour un logement existant
 */
export async function updateProperty(
  id: string,
  data: Partial<Property>,
): Promise<Property> {
  return apiClient.patch<Property>(ENDPOINTS.PROPERTIES.UPDATE(id), data);
}

/**
 * Supprime un logement
 */
export async function deleteProperty(id: string): Promise<void> {
  return apiClient.delete<void>(ENDPOINTS.PROPERTIES.DELETE(id));
}

/**
 * Récupère les notes d'un logement
 */
export async function getPropertyRatings(id: string): Promise<undefined[]> {
  return apiClient.get<undefined[]>(ENDPOINTS.PROPERTIES.RATINGS(id));
}

/**
 * Ajoute un logement aux favoris
 */
export async function addPropertyToFavorites(id: string): Promise<void> {
  return apiClient.post<void>(ENDPOINTS.PROPERTIES.FAVORITE(id));
}

/**
 * Retire un logement des favoris
 */
export async function removePropertyFromFavorites(id: string): Promise<void> {
  return apiClient.delete<void>(ENDPOINTS.PROPERTIES.FAVORITE(id));
}

/**
 * Récupère la liste de tous les équipements disponibles
 */
export async function getAvailableEquipments(): Promise<string[]> {
  return apiClient.get<string[]>("/api/properties/equipments");
}

/**
 * Récupère la liste de tous les tags/catégories disponibles
 */
export async function getAvailableTags(): Promise<string[]> {
  return apiClient.get<string[]>("/api/properties/tags");
}
