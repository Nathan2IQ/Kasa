/**
 * Utilitaires d'authentification
 * Gestion du token, connexion, déconnexion et vérification de l'utilisateur
 */

import { ENDPOINTS } from "./endpoints";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const TOKEN_KEY = "auth_token";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

/**
 * Stocke le token d'authentification
 */
export function setAuthToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

/**
 * Récupère le token d'authentification
 */
export function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
}

/**
 * Supprime le token d'authentification
 */
export function removeAuthToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
}

/**
 * Vérifie si l'utilisateur est connecté
 */
export function isAuthenticated(): boolean {
  return getAuthToken() !== null;
}

/**
 * Connexion de l'utilisateur
 */
export async function login(
  credentials: LoginCredentials,
): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.AUTH.LOGIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: "Erreur de connexion",
      }));
      throw new Error(errorData.error || "Email ou mot de passe incorrect");
    }

    const data: AuthResponse = await response.json();
    setAuthToken(data.token);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Une erreur est survenue lors de la connexion");
  }
}

/**
 * Inscription de l'utilisateur
 */
export async function register(data: RegisterData): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.AUTH.REGISTER}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: "Erreur d'inscription",
      }));
      throw new Error(errorData.error || "Impossible de créer le compte");
    }

    const responseData: AuthResponse = await response.json();
    setAuthToken(responseData.token);
    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Une erreur est survenue lors de l'inscription");
  }
}

/**
 * Déconnexion de l'utilisateur
 */
export async function logout(): Promise<void> {
  const token = getAuthToken();

  if (token) {
    try {
      await fetch(`${API_BASE_URL}${ENDPOINTS.AUTH.LOGOUT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  }

  removeAuthToken();
}

/**
 * Récupère les informations de l'utilisateur connecté
 */
export async function getCurrentUser(): Promise<User | null> {
  const token = getAuthToken();

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.AUTH.ME}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      removeAuthToken();
      return null;
    }

    const data: User = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    removeAuthToken();
    return null;
  }
}

/**
 * Crée les headers avec authentification pour les appels API
 */
export function getAuthHeaders(): HeadersInit {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}
