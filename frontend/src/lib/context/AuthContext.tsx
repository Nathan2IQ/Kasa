"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  getCurrentUser,
  User,
  LoginCredentials,
  RegisterData,
} from "@/lib/api/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provider d'authentification
 * Gère l'état de l'utilisateur connecté et les opérations d'authentification
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Vérification de l'utilisateur connecté au chargement
  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Erreur lors du chargement de l'utilisateur:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  /**
   * Connexion de l'utilisateur
   */
  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await apiLogin(credentials);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  /**
   * Inscription de l'utilisateur
   */
  const register = async (data: RegisterData) => {
    try {
      const response = await apiRegister(data);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  /**
   * Déconnexion de l'utilisateur
   */
  const logout = async () => {
    try {
      await apiLogout();
      setUser(null);
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      // On déconnecte quand même l'utilisateur côté client
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: user !== null,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook personnalisé pour accéder au contexte d'authentification
 * @throws {Error} Si utilisé en dehors d'un AuthProvider
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
