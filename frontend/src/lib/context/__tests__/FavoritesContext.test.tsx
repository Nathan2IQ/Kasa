import { renderHook, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FavoritesProvider, useFavorites } from "../FavoritesContext";
import { useAuth } from "@/lib/api/auth";
import {
  addToFavorites,
  removeFromFavorites,
  getUserFavorites,
} from "@/lib/api/favorites";
import type { Property } from "@/types/property";

// Mock des dépendances
jest.mock("@/lib/api/auth");
jest.mock("@/lib/api/favorites");

const mockProperty: Property = {
  id: "property-1",
  title: "Test Property",
  cover: "/cover.jpg",
  pictures: ["/1.jpg"],
  description: "Test description",
  host: { id: 1, name: "Host", picture: "/host.jpg" },
  rating_avg: 4.5,
  location: "Paris",
  equipments: ["WiFi"],
  tags: ["Cozy"],
  price_per_night: 100,
};

const mockFavorites: Property[] = [mockProperty];

describe("FavoritesContext", () => {
  const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
  const mockGetUserFavorites = getUserFavorites as jest.MockedFunction<
    typeof getUserFavorites
  >;
  const mockAddToFavorites = addToFavorites as jest.MockedFunction<
    typeof addToFavorites
  >;
  const mockRemoveFromFavorites = removeFromFavorites as jest.MockedFunction<
    typeof removeFromFavorites
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <FavoritesProvider>{children}</FavoritesProvider>
  );

  describe("useFavorites hook", () => {
    it("throws error when used outside FavoritesProvider", () => {
      // Capturer les erreurs console pour éviter le bruit dans les tests
      const consoleError = jest.spyOn(console, "error").mockImplementation();

      expect(() => {
        renderHook(() => useFavorites());
      }).toThrow("useFavorites must be used within a FavoritesProvider");

      consoleError.mockRestore();
    });

    it("provides favorites context when used inside FavoritesProvider", () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        user: {
          id: "user-1",
          email: "test@test.com",
          firstName: "Test",
          lastName: "User",
        },
        isLoading: false,
        login: jest.fn(),
        register: jest.fn(),
        logout: jest.fn(),
      });

      mockGetUserFavorites.mockResolvedValue([]);

      const { result } = renderHook(() => useFavorites(), { wrapper });

      expect(result.current).toBeDefined();
      expect(result.current.favorites).toBeDefined();
      expect(result.current.isFavorite).toBeDefined();
      expect(result.current.toggleFavorite).toBeDefined();
    });
  });

  describe("Favorites management", () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        user: {
          id: "user-1",
          email: "test@test.com",
          firstName: "Test",
          lastName: "User",
        },
        isLoading: false,
        login: jest.fn(),
        register: jest.fn(),
        logout: jest.fn(),
      });
    });

    it("loads favorites on mount when user is authenticated", async () => {
      mockGetUserFavorites.mockResolvedValue(mockFavorites);

      const { result } = renderHook(() => useFavorites(), { wrapper });

      await waitFor(() => {
        expect(mockGetUserFavorites).toHaveBeenCalledWith("user-1");
      });

      await waitFor(() => {
        expect(result.current.favorites).toEqual(mockFavorites);
      });
    });

    it("does not load favorites when user is not authenticated", async () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        login: jest.fn(),
        register: jest.fn(),
        logout: jest.fn(),
      });

      const { result } = renderHook(() => useFavorites(), { wrapper });

      await waitFor(() => {
        expect(mockGetUserFavorites).not.toHaveBeenCalled();
        expect(result.current.favorites).toEqual([]);
      });
    });

    it("checks if a property is in favorites", async () => {
      mockGetUserFavorites.mockResolvedValue(mockFavorites);

      const { result } = renderHook(() => useFavorites(), { wrapper });

      await waitFor(() => {
        expect(result.current.isFavorite("property-1")).toBe(true);
        expect(result.current.isFavorite("property-2")).toBe(false);
      });
    });

    it("adds a property to favorites", async () => {
      mockGetUserFavorites.mockResolvedValue([]);
      mockAddToFavorites.mockResolvedValue();

      const { result } = renderHook(() => useFavorites(), { wrapper });

      await waitFor(() => {
        expect(result.current.favorites).toEqual([]);
      });

      // Simuler l'ajout
      mockGetUserFavorites.mockResolvedValue(mockFavorites);

      await act(async () => {
        await result.current.toggleFavorite("property-1");
      });

      expect(mockAddToFavorites).toHaveBeenCalledWith("property-1");

      await waitFor(() => {
        expect(result.current.favorites).toEqual(mockFavorites);
      });
    });

    it("removes a property from favorites", async () => {
      mockGetUserFavorites.mockResolvedValue(mockFavorites);
      mockRemoveFromFavorites.mockResolvedValue();

      const { result } = renderHook(() => useFavorites(), { wrapper });

      await waitFor(() => {
        expect(result.current.favorites).toEqual(mockFavorites);
      });

      await act(async () => {
        await result.current.toggleFavorite("property-1");
      });

      expect(mockRemoveFromFavorites).toHaveBeenCalledWith("property-1");

      await waitFor(() => {
        expect(result.current.isFavorite("property-1")).toBe(false);
      });
    });

    it("throws error when toggling favorite while not authenticated", async () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        login: jest.fn(),
        register: jest.fn(),
        logout: jest.fn(),
      });

      const { result } = renderHook(() => useFavorites(), { wrapper });

      await expect(
        act(async () => {
          await result.current.toggleFavorite("property-1");
        }),
      ).rejects.toThrow("Vous devez être connecté pour gérer vos favoris");
    });

    it("refreshes favorites manually", async () => {
      mockGetUserFavorites.mockResolvedValue([]);

      const { result } = renderHook(() => useFavorites(), { wrapper });

      await waitFor(() => {
        expect(result.current.favorites).toEqual([]);
      });

      // Changer les favoris mockés
      mockGetUserFavorites.mockResolvedValue(mockFavorites);

      await act(async () => {
        await result.current.refreshFavorites();
      });

      await waitFor(() => {
        expect(result.current.favorites).toEqual(mockFavorites);
      });
    });

    it("sets loading state while fetching favorites", async () => {
      mockGetUserFavorites.mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve([]), 100)),
      );

      const { result } = renderHook(() => useFavorites(), { wrapper });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it("handles errors when loading favorites", async () => {
      const consoleError = jest.spyOn(console, "error").mockImplementation();
      mockGetUserFavorites.mockRejectedValue(new Error("Network error"));

      const { result } = renderHook(() => useFavorites(), { wrapper });

      await waitFor(() => {
        expect(result.current.favorites).toEqual([]);
      });

      consoleError.mockRestore();
    });
  });
});
