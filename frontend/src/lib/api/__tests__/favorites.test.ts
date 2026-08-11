import {
  addToFavorites,
  removeFromFavorites,
  getUserFavorites,
  isFavorite,
} from "../favorites";
import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";
import type { Property } from "@/types/property";

// Mock du client API
jest.mock("../client", () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("Favorites API", () => {
  const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("addToFavorites", () => {
    it("calls the correct API endpoint to add a favorite", async () => {
      const propertyId = "property-123";
      mockApiClient.post.mockResolvedValue(undefined);

      await addToFavorites(propertyId);

      expect(mockApiClient.post).toHaveBeenCalledWith(
        ENDPOINTS.PROPERTIES.FAVORITE(propertyId),
      );
    });

    it("throws error when API call fails", async () => {
      const propertyId = "property-123";
      const error = new Error("Network error");
      mockApiClient.post.mockRejectedValue(error);

      await expect(addToFavorites(propertyId)).rejects.toThrow("Network error");
    });
  });

  describe("removeFromFavorites", () => {
    it("calls the correct API endpoint to remove a favorite", async () => {
      const propertyId = "property-123";
      mockApiClient.delete.mockResolvedValue(undefined);

      await removeFromFavorites(propertyId);

      expect(mockApiClient.delete).toHaveBeenCalledWith(
        ENDPOINTS.PROPERTIES.FAVORITE(propertyId),
      );
    });

    it("throws error when API call fails", async () => {
      const propertyId = "property-123";
      const error = new Error("Not found");
      mockApiClient.delete.mockRejectedValue(error);

      await expect(removeFromFavorites(propertyId)).rejects.toThrow(
        "Not found",
      );
    });
  });

  describe("getUserFavorites", () => {
    it("fetches user favorites from the API", async () => {
      const userId = "user-123";
      const mockFavorites: Property[] = [
        {
          id: "1",
          title: "Property 1",
          cover: "/cover1.jpg",
          pictures: ["/1.jpg"],
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
          title: "Property 2",
          cover: "/cover2.jpg",
          pictures: ["/2.jpg"],
          description: "Description 2",
          host: { id: 2, name: "Host 2", picture: "/host2.jpg" },
          rating_avg: 5,
          location: "Lyon",
          equipments: ["Parking"],
          tags: ["Modern"],
          price_per_night: 150,
        },
      ];

      mockApiClient.get.mockResolvedValue(mockFavorites);

      const result = await getUserFavorites(userId);

      expect(mockApiClient.get).toHaveBeenCalledWith(
        ENDPOINTS.USERS.FAVORITES(userId),
      );
      expect(result).toEqual(mockFavorites);
    });

    it("returns empty array when user has no favorites", async () => {
      const userId = "user-123";
      mockApiClient.get.mockResolvedValue([]);

      const result = await getUserFavorites(userId);

      expect(result).toEqual([]);
    });

    it("throws error when API call fails", async () => {
      const userId = "user-123";
      const error = new Error("Unauthorized");
      mockApiClient.get.mockRejectedValue(error);

      await expect(getUserFavorites(userId)).rejects.toThrow("Unauthorized");
    });
  });

  describe("isFavorite", () => {
    const mockFavorites: Property[] = [
      {
        id: "property-1",
        title: "Property 1",
        cover: "/cover1.jpg",
        pictures: ["/1.jpg"],
        description: "Description 1",
        host: { id: 1, name: "Host 1", picture: "/host1.jpg" },
        rating_avg: 4,
        location: "Paris",
        equipments: ["WiFi"],
        tags: ["Cozy"],
        price_per_night: 100,
      },
      {
        id: "property-2",
        title: "Property 2",
        cover: "/cover2.jpg",
        pictures: ["/2.jpg"],
        description: "Description 2",
        host: { id: 2, name: "Host 2", picture: "/host2.jpg" },
        rating_avg: 5,
        location: "Lyon",
        equipments: ["Parking"],
        tags: ["Modern"],
        price_per_night: 150,
      },
    ];

    it("returns true when property is in favorites", () => {
      expect(isFavorite("property-1", mockFavorites)).toBe(true);
      expect(isFavorite("property-2", mockFavorites)).toBe(true);
    });

    it("returns false when property is not in favorites", () => {
      expect(isFavorite("property-3", mockFavorites)).toBe(false);
      expect(isFavorite("non-existent", mockFavorites)).toBe(false);
    });

    it("returns false when favorites array is empty", () => {
      expect(isFavorite("property-1", [])).toBe(false);
    });

    it("handles case-sensitive property IDs", () => {
      expect(isFavorite("PROPERTY-1", mockFavorites)).toBe(false);
      expect(isFavorite("property-1", mockFavorites)).toBe(true);
    });
  });
});
