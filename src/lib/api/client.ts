/**
 * Configuration du client HTTP pour les appels API
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

/**
 * Client HTTP centralisé avec gestion des erreurs
 */
async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { params, ...fetchOptions } = options;

  // Construction de l'URL avec paramètres de query
  let url = `${API_BASE_URL}${endpoint}`;
  if (params) {
    const queryString = new URLSearchParams(params).toString();
    url += `?${queryString}`;
  }

  // Configuration par défaut
  const config: RequestInit = {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...fetchOptions.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    // Gestion des erreurs HTTP
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: `HTTP error ${response.status}`,
      }));
      throw new Error(errorData.error || `Request failed: ${response.status}`);
    }

    // Retour des données JSON
    return await response.json();
  } catch (error) {
    console.error("API request error:", error);
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
