/**
 * Constantes des endpoints API
 * Toutes les URLs sont centralisées ici
 */

export const ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },

  // Properties
  PROPERTIES: {
    LIST: "/api/properties",
    BY_ID: (id: string) => `/api/properties/${id}`,
    CREATE: "/api/properties",
    UPDATE: (id: string) => `/api/properties/${id}`,
    DELETE: (id: string) => `/api/properties/${id}`,
    RATINGS: (id: string) => `/api/properties/${id}/ratings`,
    FAVORITE: (id: string) => `/api/properties/${id}/favorite`,
  },

  // Users
  USERS: {
    LIST: "/api/users",
    BY_ID: (id: string) => `/api/users/${id}`,
    CREATE: "/api/users",
    UPDATE: (id: string) => `/api/users/${id}`,
    FAVORITES: (id: string) => `/api/users/${id}/favorites`,
  },

  // Uploads
  UPLOADS: {
    IMAGE: "/api/uploads/image",
    DELETE_IMAGES: "/api/uploads/images",
  },
} as const;
