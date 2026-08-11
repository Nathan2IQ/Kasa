import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertyGallery from "../PropertyGallery";

describe("PropertyGallery", () => {
  const mockImages = [
    "/uploads/image1.jpg",
    "/uploads/image2.jpg",
    "/uploads/image3.jpg",
    "/uploads/image4.jpg",
    "/uploads/image5.jpg",
  ];
  const mockTitle = "Test Property";
  const mockCoverImage = "/uploads/cover.jpg";

  it("renders the main cover image", () => {
    render(
      <PropertyGallery
        images={mockImages}
        title={mockTitle}
        coverImage={mockCoverImage}
      />,
    );

    const mainImage = screen.getByAltText(mockTitle);
    expect(mainImage).toBeInTheDocument();
  });

  it("displays the first image as the main image", () => {
    const { container } = render(
      <PropertyGallery
        images={mockImages}
        title={mockTitle}
        coverImage={mockCoverImage}
      />,
    );

    const mainImageButton = container.querySelector(
      'button[aria-label="Voir l\'image 1 en grand"]',
    );
    expect(mainImageButton).toBeInTheDocument();
  });

  it("displays up to 4 additional thumbnail images when there are more than 1 image", () => {
    const { container } = render(
      <PropertyGallery
        images={mockImages}
        title={mockTitle}
        coverImage={mockCoverImage}
      />,
    );

    // 1 image principale + 4 miniatures = 5 boutons au total
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBe(5);
  });

  it("opens the carousel when clicking on the main image", () => {
    render(
      <PropertyGallery
        images={mockImages}
        title={mockTitle}
        coverImage={mockCoverImage}
      />,
    );

    const mainImageButton = screen.getByLabelText("Voir l'image 1 en grand");
    fireEvent.click(mainImageButton);

    // Vérifier que le carrousel est ouvert
    expect(screen.getByTestId("carousel-image")).toBeInTheDocument();
  });

  it("opens the carousel at the correct index when clicking a thumbnail", () => {
    const { container } = render(
      <PropertyGallery
        images={mockImages}
        title={mockTitle}
        coverImage={mockCoverImage}
      />,
    );

    const buttons = container.querySelectorAll("button");
    // Cliquer sur la deuxième miniature (index 1)
    fireEvent.click(buttons[1]);

    // Le carrousel devrait s'ouvrir à l'image 2
    expect(screen.getByText("2 / 5")).toBeInTheDocument();
  });

  it("uses cover image when images array is empty", () => {
    const { container } = render(
      <PropertyGallery
        images={[]}
        title={mockTitle}
        coverImage={mockCoverImage}
      />,
    );

    // Devrait afficher seulement l'image de couverture
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBe(1);
  });

  it("displays only the main image when there is only one image", () => {
    const { container } = render(
      <PropertyGallery
        images={[mockImages[0]]}
        title={mockTitle}
        coverImage={mockCoverImage}
      />,
    );

    const gridContainer = container.querySelector(".grid");
    expect(gridContainer).not.toBeInTheDocument();
  });

  it("closes the carousel when clicking the close button", () => {
    render(
      <PropertyGallery
        images={mockImages}
        title={mockTitle}
        coverImage={mockCoverImage}
      />,
    );

    // Ouvrir le carrousel
    const mainImageButton = screen.getByLabelText("Voir l'image 1 en grand");
    fireEvent.click(mainImageButton);

    // Fermer le carrousel
    const closeButton = screen.getByTestId("carousel-close");
    fireEvent.click(closeButton);

    // Le carrousel ne devrait plus être visible
    expect(screen.queryByTestId("carousel-image")).not.toBeInTheDocument();
  });

  it("displays more images indicator when there are more than 5 images", () => {
    const manyImages = [
      ...mockImages,
      "/uploads/image6.jpg",
      "/uploads/image7.jpg",
    ];

    const { container } = render(
      <PropertyGallery
        images={manyImages}
        title={mockTitle}
        coverImage={mockCoverImage}
      />,
    );

    // Devrait afficher "+X" pour indiquer les images supplémentaires
    const plusIndicator = screen.queryByText(/\+\d/);
    expect(plusIndicator).toBeInTheDocument();
  });

  it("applies hover effects to thumbnails", () => {
    const { container } = render(
      <PropertyGallery
        images={mockImages}
        title={mockTitle}
        coverImage={mockCoverImage}
      />,
    );

    const buttons = container.querySelectorAll("button");
    buttons.forEach((button) => {
      expect(button).toHaveClass("hover:opacity-90");
    });
  });

  it("has proper accessibility labels for all image buttons", () => {
    render(
      <PropertyGallery
        images={mockImages}
        title={mockTitle}
        coverImage={mockCoverImage}
      />,
    );

    const mainButton = screen.getByLabelText("Voir l'image 1 en grand");
    expect(mainButton).toBeInTheDocument();
  });
});
