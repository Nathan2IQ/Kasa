import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertyList from "../properties/PropertyList";
import { FavoritesProvider } from "@/lib/context/FavoritesContext";
import { useAuth } from "@/lib/api/auth";
import type { Property } from "@/types/property";

// Mock des dépendances
jest.mock("@/lib/api/auth");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock("@/lib/api/favorites", () => ({
  addToFavorites: jest.fn(),
  removeFromFavorites: jest.fn(),
  getUserFavorites: jest.fn(() => Promise.resolve([])),
}));

const mockProperties: Property[] = [
  {
    id: "1",
    title: "Appartement 1",
    cover: "/uploads/1.jpg",
    pictures: ["/uploads/1.jpg"],
    description: "Description 1",
    host: { id: 1, name: "Host 1", picture: "/host1.jpg" },
    rating_avg: 4,
    location: "Paris",
    equipments: ["WiFi"],
    tags: ["Cozy"],
    price_per_night: 100,
  },
  {
    id: "2",
    title: "Appartement 2",
    cover: "/uploads/2.jpg",
    pictures: ["/uploads/2.jpg"],
    description: "Description 2",
    host: { id: 2, name: "Host 2", picture: "/host2.jpg" },
    rating_avg: 5,
    location: "Lyon",
    equipments: ["Parking"],
    tags: ["Modern"],
    price_per_night: 150,
  },
  {
    id: "3",
    title: "Appartement 3",
    cover: "/uploads/3.jpg",
    pictures: ["/uploads/3.jpg"],
    description: "Description 3",
    host: { id: 3, name: "Host 3", picture: "/host3.jpg" },
    rating_avg: 3.5,
    location: "Marseille",
    equipments: ["Pool"],
    tags: ["Beach"],
    price_per_night: 200,
  },
];

describe("PropertyList", () => {
  const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

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

  const renderPropertyList = (properties: Property[] = mockProperties) => {
    return render(
      <FavoritesProvider>
        <PropertyList properties={properties} />
      </FavoritesProvider>,
    );
  };

  it("renders all properties in a grid", () => {
    renderPropertyList();

    expect(screen.getByText("Appartement 1")).toBeInTheDocument();
    expect(screen.getByText("Appartement 2")).toBeInTheDocument();
    expect(screen.getByText("Appartement 3")).toBeInTheDocument();
  });

  it("displays an empty state when there are no properties", () => {
    renderPropertyList([]);

    expect(screen.getByText("Aucun logement disponible")).toBeInTheDocument();
  });

  it("renders the correct number of property cards", () => {
    renderPropertyList();

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
  });

  it("uses grid layout for responsive display", () => {
    const { container } = renderPropertyList();

    const grid = container.querySelector("section");
    expect(grid).toHaveClass("grid");
    expect(grid).toHaveClass("grid-cols-1");
    expect(grid).toHaveClass("md:grid-cols-2");
    expect(grid).toHaveClass("lg:grid-cols-3");
  });

  it("renders empty state with proper styling", () => {
    const { container } = renderPropertyList([]);

    const emptyState = container.querySelector(".min-h-100");
    expect(emptyState).toBeInTheDocument();
  });

  it("displays each property's location", () => {
    renderPropertyList();

    expect(screen.getByText("Paris")).toBeInTheDocument();
    expect(screen.getByText("Lyon")).toBeInTheDocument();
    expect(screen.getByText("Marseille")).toBeInTheDocument();
  });

  it("displays each property's price", () => {
    renderPropertyList();

    expect(screen.getByText("100 €")).toBeInTheDocument();
    expect(screen.getByText("150 €")).toBeInTheDocument();
    expect(screen.getByText("200 €")).toBeInTheDocument();
  });

  it("renders property cards with unique keys", () => {
    const { container } = renderPropertyList();

    const cards = container.querySelectorAll("a");
    const hrefs = Array.from(cards).map((card) => card.getAttribute("href"));

    expect(hrefs).toContain("/properties/1");
    expect(hrefs).toContain("/properties/2");
    expect(hrefs).toContain("/properties/3");
  });
});
