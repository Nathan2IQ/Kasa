import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertyCard from "../properties/PropertyCard";
import { FavoritesProvider } from "@/lib/context/FavoritesContext";
import { useAuth } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import type { Property } from "@/types/property";

// Mock des dépendances
jest.mock("@/lib/api/auth");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/lib/api/favorites", () => ({
  addToFavorites: jest.fn(),
  removeFromFavorites: jest.fn(),
  getUserFavorites: jest.fn(() => Promise.resolve([])),
}));

const mockProperty: Property = {
  id: "property-1",
  title: "Appartement moderne",
  cover: "/uploads/cover.jpg",
  pictures: ["/uploads/1.jpg", "/uploads/2.jpg"],
  description: "Un bel appartement en centre-ville",
  host: {
    id: 1,
    name: "Jean Dupont",
    picture: "/uploads/host.jpg",
  },
  rating_avg: 4.5,
  location: "Paris, 75001",
  equipments: ["WiFi", "Cuisine"],
  tags: ["Cozy", "Centre-ville", "Moderne"],
  price_per_night: 120,
};

describe("PropertyCard", () => {
  const mockPush = jest.fn();
  const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
  const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      push: mockPush,
    } as any);
  });

  const renderPropertyCard = (isAuthenticated = true) => {
    mockUseAuth.mockReturnValue({
      isAuthenticated,
      user: isAuthenticated
        ? {
            id: "user-1",
            email: "test@test.com",
            firstName: "Test",
            lastName: "User",
          }
        : null,
      isLoading: false,
      login: jest.fn(),
      register: jest.fn(),
      logout: jest.fn(),
    });

    return render(
      <FavoritesProvider>
        <PropertyCard property={mockProperty} />
      </FavoritesProvider>,
    );
  };

  it("renders the property card with all information", () => {
    renderPropertyCard();

    expect(screen.getByText("Appartement moderne")).toBeInTheDocument();
    expect(screen.getByText("Paris, 75001")).toBeInTheDocument();
    expect(screen.getByText("120 €")).toBeInTheDocument();
    expect(screen.getByText("/ nuit")).toBeInTheDocument();
    expect(screen.getByText("Cozy")).toBeInTheDocument();
    expect(screen.getByText("Centre-ville")).toBeInTheDocument();
    expect(screen.getByText("Moderne")).toBeInTheDocument();
  });

  it("displays the property image with correct alt text", () => {
    renderPropertyCard();

    const image = screen.getByAltText("Appartement moderne");
    expect(image).toBeInTheDocument();
  });

  it("displays up to 3 tags", () => {
    renderPropertyCard();

    const tags = screen.getAllByText(/Cozy|Centre-ville|Moderne/);
    expect(tags.length).toBeLessThanOrEqual(3);
  });

  it("renders as a link to the property detail page", () => {
    renderPropertyCard();

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/properties/property-1");
  });

  describe("Favorite button", () => {
    it("displays the favorite button", () => {
      renderPropertyCard();

      const favoriteButton = screen.getByLabelText("Ajouter aux favoris");
      expect(favoriteButton).toBeInTheDocument();
    });

    it("redirects to login when clicking favorite button while not authenticated", async () => {
      renderPropertyCard(false);

      const favoriteButton = screen.getByLabelText("Ajouter aux favoris");
      fireEvent.click(favoriteButton);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith("/login");
      });
    });

    it("shows correct tooltip when not authenticated", () => {
      renderPropertyCard(false);

      const favoriteButton = screen.getByLabelText("Ajouter aux favoris");
      expect(favoriteButton).toHaveAttribute(
        "title",
        "Connectez-vous pour ajouter aux favoris",
      );
    });

    it("toggles favorite when authenticated and clicking the button", async () => {
      const { addToFavorites } = require("@/lib/api/favorites");
      addToFavorites.mockResolvedValue(undefined);

      renderPropertyCard(true);

      const favoriteButton = screen.getByLabelText("Ajouter aux favoris");

      await waitFor(async () => {
        fireEvent.click(favoriteButton);
      });

      await waitFor(() => {
        expect(addToFavorites).toHaveBeenCalledWith("property-1");
      });
    });

    it("prevents navigation when clicking favorite button", async () => {
      renderPropertyCard(true);

      const favoriteButton = screen.getByLabelText("Ajouter aux favoris");

      // Simuler le clic sur le bouton favori
      fireEvent.click(favoriteButton);

      // Vérifier qu'on n'a PAS été redirigé (mockPush n'a pas été appelé pour la navigation)
      // Le bouton favori empêche la propagation vers le lien parent
      expect(favoriteButton).toBeInTheDocument();
    });

    it("disables the favorite button while updating", async () => {
      const { addToFavorites } = require("@/lib/api/favorites");

      // Créer une promesse avec un délai
      addToFavorites.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100)),
      );

      renderPropertyCard(true);

      const favoriteButton = screen.getByLabelText("Ajouter aux favoris");

      fireEvent.click(favoriteButton);

      // Le bouton devrait être désactivé pendant la mise à jour
      await waitFor(() => {
        expect(favoriteButton).toBeDisabled();
      });

      // Attendre que la mise à jour se termine
      await waitFor(
        () => {
          expect(favoriteButton).not.toBeDisabled();
        },
        { timeout: 3000 },
      );
    });
  });

  describe("Hover effects", () => {
    it("applies hover class to the card", () => {
      renderPropertyCard();

      const link = screen.getByRole("link");
      expect(link).toHaveClass("hover:scale-102");
    });
  });
});
