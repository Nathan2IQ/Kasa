/**
 * Configuration du client HTTP pour les appels API
 */

import { getAuthToken, removeAuthToken } from "./auth";
import { logger } from "@/lib/utils/logger";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
  skipAuth?: boolean; // Option pour désactiver l'injection du token
}

/**
 * Classe d'erreur HTTP personnalisée avec status code
 */
export class HTTPError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "HTTPError";
  }
}

/**
 * Client HTTP centralisé avec gestion des erreurs et authentification automatique
 */
async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { params, skipAuth = false, ...fetchOptions } = options;

  // Construction de l'URL avec paramètres de query
  let url = `${API_BASE_URL}${endpoint}`;
  if (params) {
    const queryString = new URLSearchParams(params).toString();
    url += `?${queryString}`;
  }

  logger.log("API Request URL:", url);

  // Injection automatique du token d'authentification
  const token = getAuthToken();
  const authHeaders =
    !skipAuth && token ? { Authorization: `Bearer ${token}` } : {};

  // Configuration par défaut
  const config: RequestInit = {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
      ...(fetchOptions.headers || {}),
    } as HeadersInit,
  };

  try {
    const response = await fetch(url, config);

    // Gestion des erreurs HTTP
    if (!response.ok) {
      // Si erreur 401, l'utilisateur n'est plus authentifié
      if (response.status === 401) {
        removeAuthToken();

        // Redirection vers login si on est côté client
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }

      const errorData = await response.json().catch(() => ({
        error: `HTTP error ${response.status}`,
      }));
      throw new HTTPError(
        errorData.error || `Request failed: ${response.status}`,
        response.status,
      );
    }

    // Retour des données JSON (sauf si 204 No Content)
    if (response.status === 204) {
      return undefined as T;
    }

    return await response.json();
  } catch (error) {
    logger.error("API request error:", error);
    throw error;
  }
}

/**
 * Méthodes HTTP
 */
export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    }),

  patch: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),
};
